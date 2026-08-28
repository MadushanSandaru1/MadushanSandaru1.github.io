import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const data = Object.fromEntries(readdirSync(new URL('../data/', import.meta.url)).map((file) => [file, JSON.parse(read('data/' + file))]));

test('all referenced local assets exist and JavaScript parses', () => {
  function inspect(value) {
    if (typeof value === 'string' && value.startsWith('assets/')) assert.ok(existsSync(new URL('../' + value, import.meta.url)), value);
    else if (value && typeof value === 'object') Object.values(value).forEach(inspect);
  }
  inspect(data);
  for (const file of readdirSync(new URL('../js/', import.meta.url))) new vm.Script(read('js/' + file));
});

test('generated HTML and CSS stay synchronized', () => {
  execFileSync(process.execPath, ['scripts/build.mjs', '--check'], { cwd: new URL('../', import.meta.url) });
  const html = read('index.html');
  assert.ok(html.includes('<h1>' + data['profile.json'].name + '</h1>'));
  assert.ok(html.includes('href="' + data['profile.json'].resume.downloadUrl + '" download'));
  assert.match(html, /property="og:image" content="https:\/\//);
});

function loader(failures = [], overrides = {}) {
  const requested = [];
  const context = {window:{}, AbortController, setTimeout, clearTimeout, console:{warn(){}}, fetch:async (path) => {
    requested.push(path);
    if (failures.includes(path)) throw new Error('Simulated failure');
    return {ok:true,json:async () => overrides[path] ?? data[path.replace('data/','')]};
  }};
  vm.runInNewContext(read('js/data-loader.js'), context);
  return {load:context.window.PortfolioDataLoader.loadPortfolioData, requested};
}

test('disabled sections are not requested', async () => {
  const {load, requested} = loader();
  const result = await load();
  assert.equal(requested.includes('data/community-sessions.json'), false);
  assert.equal(result.projects.length, 21);
});

test('optional fetch failures preserve the profile and record recovery state', async () => {
  const {load} = loader(['data/projects.json']);
  const result = await load();
  assert.equal(result.profile.name, data['profile.json'].name);
  assert.equal(result.projects.length, 0);
  assert.ok(result.failedSections.includes('projects'));
});

test('required profile failures reject instead of rendering an empty identity', async () => {
  await assert.rejects(loader(['data/profile.json']).load());
});

test('malformed optional section data is isolated', async () => {
  const result = await loader([], {'data/projects.json':{bad:true}}).load();
  assert.equal(result.projects.length, 0);
  assert.ok(result.failedSections.includes('projects'));
});

test('theme remains functional when browser storage throws', () => {
  const handlers = {}, attrs = {};
  const context = {window:{PortfolioIcons:{icon:()=>''},matchMedia:()=>({matches:false,addEventListener(){}})},
    document:{documentElement:{setAttribute:(key,value)=>{attrs[key]=value;},getAttribute:(key)=>attrs[key]}},
    localStorage:{getItem(){throw new Error('blocked');},setItem(){throw new Error('blocked');}},
    $:()=>({html(){},attr(){},on:(event,handler)=>{handlers[event]=handler;}})};
  vm.runInNewContext(read('js/theme.js'),context);
  context.window.PortfolioTheme.initTheme();
  assert.equal(attrs['data-theme'],'dark');
  handlers.click();
  assert.equal(attrs['data-theme'],'light');
});

test('project filters expose featured, all, and category selections with accessible state', () => {
  function element(dataset) {
    return {dataset, hidden:false, attrs:{}, classList:{toggle(){}}, setAttribute(key,value){this.attrs[key]=value;}, addEventListener(event,callback){this[event]=callback;}};
  }
  const cards = data['projects.json'].map((item) => element({featured:String(Boolean(item.featured)),projectCategory:item.category}));
  const buttons = ['Featured','All','Integration'].map((filter) => element({filter}));
  const status = {};
  const context = {window:{},document:{querySelectorAll:(selector)=>selector === '.filter-chip' ? buttons : cards,querySelector:()=>status}};
  vm.runInNewContext(read('js/filters.js'), context);
  context.window.PortfolioFilters.init();
  assert.equal(cards.filter((card)=>!card.hidden).length,3);
  assert.equal(buttons[0].attrs['aria-pressed'],'true');
  buttons[1].click();
  assert.equal(cards.filter((card)=>!card.hidden).length,21);
  assert.equal(buttons[0].attrs['aria-pressed'],'false');
  buttons[2].click();
  assert.equal(cards.filter((card)=>!card.hidden).length,1);
  assert.match(status.textContent,/1 project/);
});

test('dialog traps focus and restores previous inert and focus state', () => {
  const handlers = {};
  const document = {body:{children:[],classList:{add(){},remove(){}}},addEventListener:(event,fn)=>{handlers[event]=fn;}};
  const control = () => ({isConnected:true,focus(){document.activeElement=this;},getClientRects(){return [1];}});
  const trigger=control(), first=control(), last=control();
  const background={inert:false}, alreadyInert={inert:true};
  const modal={hidden:true,querySelector:()=>first,querySelectorAll:()=>[first,last]};
  document.body.children=[background,alreadyInert,modal];
  document.activeElement=trigger;
  const context={window:{},document};
  vm.runInNewContext(read('js/dialog.js'),context);
  context.window.PortfolioDialog.open(modal,last);
  assert.equal(background.inert,true);
  handlers.keydown({key:'Tab',preventDefault(){}});
  assert.equal(document.activeElement,first);
  handlers.keydown({key:'Tab',shiftKey:true,preventDefault(){}});
  assert.equal(document.activeElement,last);
  handlers.keydown({key:'Escape',preventDefault(){}});
  assert.equal(modal.hidden,true);
  assert.equal(background.inert,false);
  assert.equal(alreadyInert.inert,true);
  assert.equal(document.activeElement,trigger);
});

test('file previews load the full embedded portfolio without fetching local JSON', async () => {
  const html = read('index.html');
  const snapshot = html.match(/<script id="portfolio-local-data" type="application\/json">([\s\S]*?)<\/script>/)[1];
  let fetches = 0;
  const context = {window:{location:{protocol:'file:'}},document:{getElementById:()=>({textContent:snapshot})},console:{warn(){}},fetch(){fetches++;throw new Error('Local JSON fetch blocked');}};
  vm.runInNewContext(read('js/data-loader.js'),context);
  const result = await context.window.PortfolioDataLoader.loadPortfolioData();
  assert.equal(fetches,0);
  assert.equal(result.profile.name,data['profile.json'].name);
  assert.equal(result.projects.length,21);
  assert.equal(result.certificateCourses.length,37);
  assert.equal(result.professionalExperience.length,3);
  assert.equal(result.failedSections.length,0);
  assert.equal(result.communitySessions,undefined);
});

test('desktop and mobile scroll strips include every rendered section, including supporting topics', () => {
  const html = read('index.html');
  const config = data['site-config.json'];
  const sections = Array.from(html.matchAll(/<section id="([^"]+)"[^>]*data-section="([^"]+)"/g))
    .filter(([, , key]) => config.sections[key] !== false)
    .map(([, id]) => ({id,querySelector:()=>({textContent:id === 'certificate-courses' ? 'Certificate Courses' : id})}));
  const output = {};
  const context = {window:{},document:{querySelectorAll:()=>sections},$:(selector)=>({html:(value)=>{output[selector]=value;}})};
  vm.runInNewContext(read('js/renderer.js'),context);
  context.window.PortfolioRenderer.renderNav();
  for (const selector of ['[data-desktop-nav]','[data-mobile-nav]']) {
    for (const section of sections) assert.ok(output[selector].includes(`href="#${section.id}"`), `${selector}: ${section.id}`);
    assert.equal(output[selector].includes('href="#community-sessions"'),false);
    assert.ok(output[selector].includes('Certificate Courses'));
    assert.ok(output[selector].includes('data-nav-track'));
    assert.ok(output[selector].includes('Scroll sections right'));
    assert.equal(output[selector].includes('<details'),false);
  }
});

test('active navigation follows section boundaries down and up, including long sections and page end', () => {
  const context = {window:{}};
  vm.runInNewContext(read('js/navigation.js'),context);
  const sections = [0,800,9000].map((top,index)=>({id:String(index),getBoundingClientRect:()=>({top})}));
  const pick = context.window.PortfolioNavigation.sectionAtViewport;
  assert.equal(pick(sections,300,false).id,'0');
  assert.equal(pick(sections,850,false).id,'1');
  assert.equal(pick(sections,8000,false).id,'1');
  assert.equal(pick(sections,9200,false).id,'2');
  assert.equal(pick(sections,850,false).id,'1');
  assert.equal(pick(sections,300,false).id,'0');
  assert.equal(pick(sections,300,true).id,'2');
});

test('active link scrolls its horizontal track in either direction, with reduced-motion support', () => {
  let reduced = false;
  const calls = [];
  const context = {window:{matchMedia:()=>({matches:reduced})}};
  vm.runInNewContext(read('js/navigation.js'),context);
  const track = {clientWidth:300,scrollWidth:1200,scrollLeft:100,getBoundingClientRect:()=>({left:10,right:310}),scrollTo:(options)=>calls.push(options)};
  let rect = {left:400,right:500,width:100};
  const link = {closest:()=>track,getBoundingClientRect:()=>rect};
  const reveal = context.window.PortfolioNavigation.revealActiveLink;
  reveal(link);
  assert.equal(calls[0].left,390);
  assert.equal(calls[0].behavior,'smooth');
  rect = {left:-40,right:60,width:100};
  reduced = true;
  reveal(link);
  assert.equal(calls[1].left,0);
  assert.equal(calls[1].behavior,'instant');
  rect = {left:50,right:150,width:100};
  reveal(link);
  assert.equal(calls.length,2,'visible links should not interrupt manual navbar scrolling');
  track.clientWidth=0;
  reveal(link);
  assert.equal(calls.length,2,'hidden desktop/mobile tracks should not scroll');
});
