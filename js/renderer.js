(function (window) {
  const navItems = [
    ['hero', 'Home', 'home'], ['about', 'About', 'user'], ['professional-experience', 'Experience', 'briefcase'],
    ['projects', 'Projects', 'code'], ['technical-skills', 'Skills', 'layers'], ['contact', 'Contact', 'mail']
  ];

  const Icons = {
    home: '<path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H4.5A1.5 1.5 0 0 1 3 19.5z"/>',
    user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
    briefcase: '<path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1"/><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 12h18"/>',
    code: '<path d="m9 18-6-6 6-6"/><path d="m15 6 6 6-6 6"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8z"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    external: '<path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>',
    github: '<path d="M15 22v-4a4 4 0 0 0-1-3c3 0 6-2 6-6a4.5 4.5 0 0 0-1.2-3.1A4.2 4.2 0 0 0 18.7 3s-1 0-3 1.2a10.3 10.3 0 0 0-5.4 0C8.3 3 7.3 3 7.3 3a4.2 4.2 0 0 0-.1 2.9A4.5 4.5 0 0 0 6 9c0 4 3 6 6 6a4 4 0 0 0-1 3v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    medium: '<path d="M4 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9z"/><path d="M13.5 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/><path d="M20.5 8.5c.8 0 1.5 1.6 1.5 3.5s-.7 3.5-1.5 3.5-1.5-1.6-1.5-3.5.7-3.5 1.5-3.5z"/>',
    stackoverflow: '<path d="M8 21h10v-6"/><path d="M6 15v6h14v-6"/><path d="m9 16 7 .9"/><path d="m9.6 12.8 6.7 2"/><path d="m11 9.7 6 3.6"/><path d="m13.5 6.9 4.8 5"/><path d="m16.8 4.5 3.2 6.2"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.2 19.2 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9z"/>',
    up: '<path d="m18 15-6-6-6 6"/>'
  };

  function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + (Icons[name] || Icons.external) + '</svg>'; }
  function esc(value) { return String(value || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[c])); }
  function hasValue(value) { return Array.isArray(value) ? value.filter(hasValue).length > 0 : value !== undefined && value !== null && String(value).trim() !== ''; }
  function cleanArray(items) { return (items || []).filter(hasValue); }
  function meta(items) { const values = cleanArray(items); return values.length ? `<div class="card-meta">${values.map(esc).join(' - ')}</div>` : ''; }
  function sectionIntro(title, kicker, text) { return `<div class="section-heading reveal"><p class="kicker">${esc(kicker)}</p><h2>${esc(title)}</h2>${hasValue(text) ? `<p>${esc(text)}</p>` : ''}</div>`; }
  function list(items) { const values = cleanArray(items); return values.length ? `<ul>${values.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>` : ''; }
  function tags(items) { const values = cleanArray(items); return values.length ? `<div class="tag-list">${values.map((item) => `<span>${esc(item)}</span>`).join('')}</div>` : ''; }
  function imageTag(image, className) {
    if (!image || !hasValue(image.src)) return '';
    const srcset = hasValue(image.srcset) ? ` srcset="${esc(image.srcset)}"` : '';
    const sizes = hasValue(image.sizes) ? ` sizes="${esc(image.sizes)}"` : '';
    return `<img class="${className || ''}" src="${esc(image.src)}"${srcset}${sizes} alt="${esc(image.alt || '')}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${esc(image.fallback || 'assets/images/profile/default-avatar.svg')}';">`;
  }
  function renderProjectMedia(item) {
    const images = Array.isArray(item.images) ? item.images.filter((image) => hasValue(image?.src)) : [];
    if (!images.length) return '';
    const first = images[0];
    const controls = images.length > 1
      ? `<div class="project-gallery-controls" aria-label="${esc(item.name)} screenshots">${images.map((image, index) => `<button class="project-gallery-dot ${index === 0 ? 'active' : ''}" type="button" data-gallery-index="${index}" data-gallery-src="${esc(image.gallerySrc || image.src)}" data-gallery-alt="${esc(image.alt || `${item.name} screenshot ${index + 1}`)}" aria-label="Show screenshot ${index + 1}" aria-pressed="${index === 0 ? 'true' : 'false'}"></button>`).join('')}</div>`
      : '';
    return `<div class="project-media">${imageTag(first, 'project-image')} ${images.length > 1 ? `<span class="project-image-count">${images.length} images</span>` : ''}${controls}</div>`;
  }
  function initProjectGalleries() {
    document.querySelectorAll('.project-gallery-controls').forEach(function (controls) {
      controls.addEventListener('click', function (event) {
        const button = event.target.closest('.project-gallery-dot');
        if (!button) return;
        const media = button.closest('.project-media');
        const image = media?.querySelector('.project-image');
        if (!image) return;
        image.src = button.dataset.gallerySrc;
        image.alt = button.dataset.galleryAlt || image.alt;
        controls.querySelectorAll('.project-gallery-dot').forEach(function (dot) {
          const active = dot === button;
          dot.classList.toggle('active', active);
          dot.setAttribute('aria-pressed', String(active));
        });
      });
    });
  }
  function popover(label, content) { return hasValue(content) ? `<div class="detail-popover-wrap"><button class="detail-trigger" type="button" aria-expanded="false">${esc(label)} <span>+</span></button><div class="detail-popover" role="region">${content}</div></div>` : ''; }
  function shouldShow(config, key, data) {
    if (config.sections && config.sections[key] === false) return false;
    if (config.emptyState && config.emptyState.showEmptySections) return true;
    if (key === 'hero' || key === 'about' || key === 'contact') return true;
    return hasValue(data);
  }
  function parseMonthYear(value) {
    if (!hasValue(value)) return null;
    if (String(value).toLowerCase() === 'present') { const now = new Date(); return { year: now.getFullYear(), month: now.getMonth() }; }
    const match = String(value).trim().match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
    if (!match) return null;
    const month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'].indexOf(match[1].slice(0, 3).toLowerCase());
    return month < 0 ? null : { month, year: Number(match[2]) };
  }
  function durationLabel(startDate, endDate) {
    const start = parseMonthYear(startDate), end = parseMonthYear(endDate || 'Present');
    if (!start || !end) return '';
    const total = Math.max(1, (end.year - start.year) * 12 + (end.month - start.month) + 1);
    const years = Math.floor(total / 12), months = total % 12, parts = [];
    if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
    if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
    return parts.join(' ');
  }
  function fullYearsSince(startDate) {
    const start = parseMonthYear(startDate), now = new Date();
    if (!start) return 0;
    const years = now.getFullYear() - start.year;
    return Math.max(0, years - (now.getMonth() < start.month ? 1 : 0));
  }
  function resolveStatValue(profile, stat) {
    if (stat.value === 'autoExperienceYears') return fullYearsSince(profile.experienceStartDate || 'Jun 2022');
    return stat.value;
  }

  function renderMeta(data) {
    const site = data.siteConfig?.site || {}, profile = data.profile || {};
    document.title = site.title || profile.name || document.title;
    $('meta[name="description"]').attr('content', site.description || profile.shortSummary || '');
    $('meta[name="keywords"]').attr('content', (site.keywords || []).join(', '));
    $('[property="og:title"], [name="twitter:title"]').attr('content', site.title || profile.name || '');
    $('[property="og:description"], [name="twitter:description"]').attr('content', site.description || profile.shortSummary || '');
    $('[property="og:image"], [name="twitter:image"]').attr('content', profile.profileImage?.src || '');
    $('link[rel="canonical"]').attr('href', site.canonicalUrl || 'https://madushansandaru1.github.io');
    $('[property="og:url"]').attr('content', site.canonicalUrl || 'https://madushansandaru1.github.io');
    $('[data-brand]').html(`<img class="brand-logo" src="assets/images/brand/ms-logo.svg" alt="" aria-hidden="true"><span>${esc(profile.name || 'Portfolio')}</span>`);
    const schema = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: profile.title, image: profile.profileImage?.src, url: site.canonicalUrl, address: { '@type': 'PostalAddress', addressCountry: profile.location || 'Sri Lanka' }, sameAs: (data.socialLinks || []).filter((item) => hasValue(item.url) && !item.url.startsWith('mailto:')).map((item) => item.url) };
    $('head').append(`<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`);
  }

  function renderNav() {
    $('[data-desktop-nav]').html(navItems.map(([id, label]) => `<a href="#${id}" data-nav-link="${id}">${label}</a>`).join(''));
    $('[data-mobile-nav]').html(navItems.filter((_, i) => [0, 1, 3, 4, 5].includes(i)).map(([id, label, iconName]) => `<a href="#${id}" data-nav-link="${id}">${icon(iconName)}<span>${label}</span></a>`).join(''));
    $('[data-back-to-top]').html(icon('up'));
  }
  function renderSocialLinks(items) { return (items || []).filter((item) => hasValue(item.url)).map((item) => `<a class="social-link" href="${esc(item.url)}" target="${item.url.startsWith('mailto:') ? '_self' : '_blank'}" rel="noreferrer" aria-label="${esc(item.label || item.platform)}">${icon(item.icon)}<span>${esc(item.platform)}</span></a>`).join(''); }
  function renderHero(profile, socialLinks) {
    const stats = profile.stats || [], heroSocialLinks = (socialLinks || []).filter((item) => item.platform !== 'Website');
    $('#hero').html(`<div class="container hero-grid"><div class="hero-copy reveal"><h1>${esc(profile.name)}</h1><p class="hero-title">${esc(profile.title)}</p><p class="hero-tagline">${esc(profile.tagline)}</p><p class="hero-summary">${esc(profile.shortSummary)}</p><div class="hero-actions"><a class="button button-primary" href="#projects">View Projects ${icon('arrow')}</a><button class="button button-secondary" type="button" data-cv-download data-cv-url="${esc(profile.resume?.downloadUrl)}" data-cv-label="${esc(profile.resume?.label || 'Download CV')}">${icon('download')} ${esc(profile.resume?.label || 'Download CV')}</button><a class="button button-ghost" href="#contact">Contact Me</a></div><div class="social-row">${renderSocialLinks(heroSocialLinks)}</div></div><div class="hero-visual reveal"><div class="profile-frame">${imageTag(profile.profileImage, 'profile-image')}</div><div class="signal-card"><span>Integration focus</span><strong>APIs - Middleware - Fintech</strong></div></div><div class="stats-strip reveal">${stats.map((stat) => `<div><strong data-counter="${esc(resolveStatValue(profile, stat))}">0</strong><span>${esc(stat.label)}</span></div>`).join('')}</div></div>`);
  }
  function renderAbout(profile) { $('#about').html(`<div class="container">${sectionIntro('About Me', 'Profile', profile.about)}<div class="about-panel reveal">${(profile.focusAreas || []).map((item) => `<article><strong>${esc(item.title)}</strong><p>${esc(item.description)}</p></article>`).join('')}</div></div>`); }
  function renderExperience(items) {
    $('#professional-experience').html(`<div class="container">${sectionIntro('Professional Experience', 'Career timeline', 'Senior engineering work across backend systems, enterprise integrations, and production platforms.')}<div class="timeline">${items.map((item) => `<article class="timeline-item reveal"><div class="timeline-marker"></div><div class="card experience-card"><div class="experience-head"><div><h3>${esc(item.jobTitle)}</h3>${hasValue(item.company) ? `<p class="company">${esc(item.company)}</p>` : ''}${meta([item.location, item.employmentType])}</div><div class="experience-date">${hasValue(item.startDate) ? `<strong>${esc(item.startDate)} - ${esc(item.endDate || 'Present')}</strong>` : ''}${hasValue(durationLabel(item.startDate, item.endDate)) ? `<span>${esc(durationLabel(item.startDate, item.endDate))}</span>` : ''}</div></div>${hasValue(item.summary) ? `<p>${esc(item.summary)}</p>` : ''}<h4>Responsibilities</h4>${list(item.responsibilities)}<h4>Key achievements</h4>${list(item.achievements)}${tags(item.technologies)}</div></article>`).join('')}</div></div>`);
  }
  function renderProjects(items) {
    const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))];
    $('#projects').html(`<div class="container">${sectionIntro('Projects', 'Selected work', 'Featured engineering, integration, cloud, and community projects.')}<div class="filter-bar reveal">${categories.map((cat, i) => `<button class="filter-chip ${i === 0 ? 'active' : ''}" type="button" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}</div><div class="project-grid">${items.map((item) => `<article class="project-card card reveal" data-project-category="${esc(item.category)}">${renderProjectMedia(item)}<div class="project-body">${meta([item.type, item.category])}<h3>${esc(item.name)}</h3>${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${popover('Engineering detail', `${hasValue(item.problemSolved) ? `<p><strong>Problem solved:</strong> ${esc(item.problemSolved)}</p>` : ''}${list(item.keyFeatures)}${tags(item.techStack)}`)}<div class="card-actions">${hasValue(item.githubUrl) ? `<a href="${esc(item.githubUrl)}" target="_blank" rel="noreferrer">${icon('github')} GitHub</a>` : ''}${hasValue(item.demoUrl) ? `<a href="${esc(item.demoUrl)}" target="_blank" rel="noreferrer">${icon('external')} Demo</a>` : ''}</div></div></article>`).join('')}</div></div>`);
    initProjectGalleries();
  }
  function renderSkills(items, selector, title, kicker) { $(selector).html(`<div class="container">${sectionIntro(title, kicker, '')}<div class="skill-grid">${items.map((group) => `<article class="skill-panel reveal"><h3>${esc(group.category)}</h3>${tags(group.skills)}</article>`).join('')}</div></div>`); }
  function renderEducation(items) { $('#education').html(`<div class="container">${sectionIntro('Education', 'Academic foundation', '')}<div class="credential-list">${items.map((item) => `<article class="credential-item reveal">${meta([item.period, item.location])}<h3>${esc(item.degree)}</h3>${hasValue(item.institute) ? `<p class="company">${esc(item.institute)}</p>` : ''}${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${hasValue(item.grade) ? `<p><strong>${esc(item.grade)}</strong></p>` : ''}${tags(item.coursework)}</article>`).join('')}</div></div>`); }
  function renderCertificates(items) {
    $('#certificate-courses').html(`<div class="container">${sectionIntro('Certificate Courses', 'Continuous learning', '')}<div class="certificate-grid">${items.map((item) => {
      const skills = cleanArray(item.skillsCovered);
      const credentials = Array.isArray(item.credentials) ? item.credentials.filter((credential) => hasValue(credential.url)) : [];
      const credentialButtons = credentials.length
        ? credentials.map((credential) => `<a class="credential-action" href="${esc(credential.url)}" target="_blank" rel="noreferrer" aria-label="Open ${esc(credential.label || 'credential')} for ${esc(item.name)}">${icon('external')}<span>${esc(credential.label || 'Credential')}</span></a>`).join('')
        : (hasValue(item.credentialUrl) ? `<a class="credential-action" href="${esc(item.credentialUrl)}" target="_blank" rel="noreferrer" aria-label="Open credential for ${esc(item.name)}">${icon('external')}<span>Credential</span></a>` : '');
      const actions = `${skills.length ? popover('Skills covered', tags(skills)) : ''}${credentialButtons}`;
      return `<article class="certificate-item reveal">${meta([item.completedDate, item.issuer])}<h3>${esc(item.name)}</h3>${actions ? `<div class="certificate-actions">${actions}</div>` : ''}</article>`;
    }).join('')}</div></div>`);
  }
  function renderPublications(items) { $('#publications').html(`<div class="container">${sectionIntro('Publications', 'Writing and research', '')}<div class="publication-list">${items.map((item) => `<article class="publication-item reveal">${meta([item.date, item.publisher])}<h3>${esc(item.title)}</h3>${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${hasValue(item.authors) ? `<p>${esc(cleanArray(item.authors).join(', '))}</p>` : ''}${tags(item.tags)}${hasValue(item.link) ? `<div class="publication-actions"><a class="credential-action" href="${esc(item.link)}" target="_blank" rel="noreferrer" aria-label="Read publication ${esc(item.title)}">${icon('external')}<span>Read</span></a></div>` : ''}</article>`).join('')}</div></div>`); }
  function renderVolunteer(items) { $('#volunteer-experience').html(`<div class="container">${sectionIntro('Volunteer Experience', 'Community leadership', '')}<div class="volunteer-grid">${items.map((item) => { const credentialActions = credentialButtons(item.credentials, [hasValue(item.credentialUrl) ? { label: 'Credential', url: item.credentialUrl } : null, hasValue(item.serviceLetterUrl) ? { label: 'Service letter', url: item.serviceLetterUrl } : null]); const linkActions = hasValue(item.links) ? cleanArray(item.links).map((link) => `<a class="credential-action" href="${esc(link)}" target="_blank" rel="noreferrer">${icon('external')}<span>Link</span></a>`).join('') : ''; const actions = `${credentialActions}${linkActions}`; return `<article class="volunteer-item reveal">${meta([item.period])}<h3>${esc(item.role)}</h3>${hasValue(item.organization) ? `<p class="company">${esc(item.organization)}</p>` : ''}${hasValue(item.membershipId) ? `<p class="membership-id">Membership ID: <strong>${esc(item.membershipId)}</strong></p>` : ''}${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${popover('Impact', `${list(item.responsibilities)}${hasValue(item.impact) ? `<p>${esc(item.impact)}</p>` : ''}`)}${actions ? `<div class="volunteer-actions">${actions}</div>` : ''}</article>`; }).join('')}</div></div>`); }
  function credentialButtons(items, fallbackItems) {
    const values = Array.isArray(items) ? items.filter((item) => hasValue(item.url)) : [];
    const buttons = values.map((item) => `<a class="credential-action" href="${esc(item.url)}" target="_blank" rel="noreferrer">${icon('external')}<span>${esc(item.label || 'Credential')}</span></a>`).join('');
    if (buttons) return buttons;
    return cleanArray(fallbackItems || []).map((item) => `<a class="credential-action" href="${esc(item.url)}" target="_blank" rel="noreferrer">${icon('external')}<span>${esc(item.label)}</span></a>`).join('');
  }
  function renderAwards(items) {
    $('#awards-competitions').html(`<div class="container">${sectionIntro('Awards & Competitions', 'Recognition', '')}<div class="award-grid">${items.map((item) => {
      const actions = credentialButtons(item.credentials, [
        hasValue(item.credentialUrl) ? { label: 'Credential', url: item.credentialUrl } : null,
        hasValue(item.certificateUrl) ? { label: 'Certificate', url: item.certificateUrl } : null,
        hasValue(item.link) ? { label: 'Link', url: item.link } : null
      ]);
      return `<article class="award-item reveal">${meta([item.date, item.organizer])}<h3>${esc(item.name)}</h3>${hasValue(item.result) ? `<p class="company">${esc(item.result)}</p>` : ''}${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${tags([item.teamName, item.relatedProject])}${actions ? `<div class="award-actions">${actions}</div>` : ''}</article>`;
    }).join('')}</div></div>`);
  }
  function initTestimonialText() {
    requestAnimationFrame(function () {
      document.querySelectorAll('.testimonial-copy').forEach(function (text) {
        const button = text.parentElement.querySelector('.testimonial-more');
        if (!button) return;
        const overflowing = text.scrollHeight > text.clientHeight + 2;
        button.hidden = !overflowing;
        button.onclick = function () {
          const expanded = text.classList.toggle('is-expanded');
          button.textContent = expanded ? 'less' : 'more';
          button.setAttribute('aria-expanded', String(expanded));
        };
      });
    });
  }
  function renderTestimonials(items) {
    $('#testimonials').html(`<div class="container">${sectionIntro('Testimonials', 'Recommendations', '')}<div class="testimonial-list">${items.map((item) => `<article class="testimonial-item reveal">${imageTag(item.image, 'avatar-image')}<div>${meta([item.role, item.organization])}<h3>${esc(item.personName)}</h3>${hasValue(item.message) ? `<div class="testimonial-copy-wrap"><p class="testimonial-copy">${esc(item.message)}</p><button class="testimonial-more" type="button" aria-expanded="false" hidden>more</button></div>` : ''}</div></article>`).join('')}</div></div>`);
    initTestimonialText();
  }
  function renderInterests(items) { $('#interests').html(`<div class="container">${sectionIntro('Interests', 'What I follow', '')}<div class="interest-cloud reveal">${cleanArray(items).map((item) => `<span>${esc(item)}</span>`).join('')}</div></div>`); }
  function renderContact(profile, socialLinks) {
    const contactSocialLinks = (socialLinks || []).filter((item) => item.platform !== 'Website');
    $('#contact').html(`<div class="container contact-grid"><div class="reveal">${sectionIntro('Contact', "Let's build", 'Open to senior engineering roles, integration work, technical leadership, and community collaboration.')}<div class="contact-list">${hasValue(profile.email) ? `<a href="mailto:${esc(profile.email)}">${icon('mail')} ${esc(profile.email)}</a>` : ''}${hasValue(profile.phone) ? `<a href="tel:${esc(profile.phone)}">${icon('phone')} ${esc(profile.phone)}</a>` : ''}${hasValue(profile.location) ? `<span>${icon('home')} ${esc(profile.location)}</span>` : ''}</div><div class="social-row">${renderSocialLinks(contactSocialLinks)}</div></div><form class="contact-form reveal" data-contact-form data-fallback-email="${esc(profile.email)}"><label>Name<input name="name" required autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label><label>Subject<input name="subject" autocomplete="off" value="Portfolio contact message"></label><label>Message<textarea name="message" rows="4" required></textarea></label><p class="form-status" data-contact-status role="status" aria-live="polite"></p><button class="button button-primary" type="submit">Send Message ${icon('arrow')}</button></form></div>`);
  }
  function renderSimpleCards(selector, title, kicker, items, mapper) { $(selector).html(`<div class="container">${sectionIntro(title, kicker, '')}<div class="card-grid">${items.map((item) => mapper(item)).join('')}</div></div>`); }
  function renderFooter(profile, socialLinks) {
    const footerSocialLinks = (socialLinks || []).filter((item) => item.platform !== 'Website');
    $('[data-footer]').html(`<div class="container footer-grid"><p><strong>${esc(profile.name)}</strong><br>${esc(profile.title)}</p><div class="social-row">${renderSocialLinks(footerSocialLinks)}</div><p>&copy; ${new Date().getFullYear()} ${esc(profile.name)}. Built as a static, data-driven portfolio.</p></div>`);
  }

  function render(data) {
    const config = data.siteConfig || { sections: {}, emptyState: { showEmptySections: false } }, profile = data.profile || {};
    renderMeta(data); renderNav();
    shouldShow(config, 'hero', profile) ? renderHero(profile, data.socialLinks || []) : $('#hero').remove();
    shouldShow(config, 'about', profile) ? renderAbout(profile) : $('#about').remove();
    const renderers = {
      professionalExperience: () => renderExperience(data.professionalExperience || []),
      projects: () => renderProjects(data.projects || []),
      technicalSkills: () => renderSkills(data.technicalSkills || [], '#technical-skills', 'Technical Skills', 'Engineering toolkit'),
      personalSkills: () => renderSkills(data.personalSkills || [], '#personal-skills', 'Personal Skills', 'Leadership strengths'),
      education: () => renderEducation(data.education || []),
      certificateCourses: () => renderCertificates(data.certificateCourses || []),
      publications: () => renderPublications(data.publications || []),
      volunteerExperience: () => renderVolunteer(data.volunteerExperience || []),
      communitySessions: () => renderSimpleCards('#community-sessions', 'Community Sessions', 'Talks and workshops', data.communitySessions || [], (item) => `<article class="card media-card reveal">${imageTag(item.image, 'session-image')}<div>${meta([item.date, item.mode, item.audience])}<h3>${esc(item.title)}</h3>${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${tags([item.topic, item.organizedBy])}<div class="card-actions">${hasValue(item.slidesUrl) ? `<a href="${esc(item.slidesUrl)}">${icon('external')} Slides</a>` : ''}${hasValue(item.recordingUrl) ? `<a href="${esc(item.recordingUrl)}">${icon('external')} Recording</a>` : ''}</div></div></article>`),
      awardsCompetitions: () => renderAwards(data.awardsCompetitions || []),
      testimonials: () => renderTestimonials(data.testimonials || []),
      interests: () => renderInterests(data.interests || []),
      languages: () => $('#languages').html(`<div class="container">${sectionIntro('Languages', 'Communication', '')}<div class="language-list">${(data.languages || []).map((item) => `<article class="language-item reveal"><div><h3>${esc(item.language)}</h3>${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}</div>${hasValue(item.proficiency) ? `<strong>${esc(item.proficiency)}</strong>` : ''}</article>`).join('')}</div></div>`),
      blog: () => $('#blog').html(`<div class="container">${sectionIntro('Blog & Articles', 'Technical writing', '')}<div class="blog-grid">${(data.blog || []).map((item) => `<article class="blog-card card reveal">${imageTag(item.coverImage, 'project-image')}<div class="project-body">${meta([item.date])}<h3>${esc(item.title)}</h3>${hasValue(item.description) ? `<p>${esc(item.description)}</p>` : ''}${tags(item.tags)}${hasValue(item.link) ? `<div class="card-actions"><a class="button button-secondary button-small" href="${esc(item.link)}" target="_blank" rel="noreferrer">${icon('external')} Read article</a></div>` : ''}</div></article>`).join('')}</div></div>`),
      contact: () => renderContact(profile, data.socialLinks || [])
    };
    Object.entries(renderers).forEach(([key, renderer]) => shouldShow(config, key, data[key]) ? renderer() : $(`[data-section="${key}"]`).remove());
    renderFooter(profile, data.socialLinks || []);
  }

  window.PortfolioIcons = { icon };
  window.PortfolioRenderer = { render };
})(window);
