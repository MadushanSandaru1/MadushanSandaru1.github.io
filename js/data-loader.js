(function (window) {
  const DATA_FILES = {
    siteConfig: 'data/site-config.json',
    profile: 'data/profile.json',
    professionalExperience: 'data/professional-experience.json',
    projects: 'data/projects.json',
    technicalSkills: 'data/technical-skills.json',
    personalSkills: 'data/personal-skills.json',
    education: 'data/education.json',
    certificateCourses: 'data/certificate-courses.json',
    publications: 'data/publications.json',
    volunteerExperience: 'data/volunteer-experience.json',
    awardsCompetitions: 'data/awards-competitions.json',
    testimonials: 'data/testimonials.json',
    interests: 'data/interests.json',
    languages: 'data/languages.json',
    communitySessions: 'data/community-sessions.json',
    blog: 'data/blog.json',
    socialLinks: 'data/social-links.json',
    emailjsConfig: 'data/emailjs-config.json'
  };

  let localData;
  async function loadJson(path) {
    if (window.location?.protocol === 'file:') {
      if (!localData) {
        const snapshot = document.getElementById('portfolio-local-data');
        if (!snapshot) throw new Error('Local preview data is missing. Run node scripts/build.mjs.');
        localData = JSON.parse(snapshot.textContent);
      }
      if (!Object.prototype.hasOwnProperty.call(localData, path)) throw new Error('Missing local preview data: ' + path);
      return localData[path];
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(path, { signal: controller.signal });
      if (!response.ok) throw new Error('Unable to load ' + path);
      return await response.json();
    } finally { clearTimeout(timeout); }
  }

  async function loadPortfolioData() {
    const failedSections = [];
    const siteConfig = await loadJson(DATA_FILES.siteConfig).then((config) => {
      if (!config || typeof config !== 'object' || Array.isArray(config)) throw new Error('Invalid site configuration');
      return config;
    }).catch(() => {
      failedSections.push('siteConfig');
      return { sections: {} };
    });
    const entries = Object.entries(DATA_FILES).filter(([key]) => key !== 'siteConfig' && siteConfig.sections?.[key] !== false);
    const values = await Promise.all(entries.map(async ([key, path]) => {
      try {
        const value = await loadJson(path);
        const objectKeys = ['profile', 'emailjsConfig'];
        if (objectKeys.includes(key) ? !value || typeof value !== 'object' || Array.isArray(value) : !Array.isArray(value)) throw new Error('Invalid data: ' + key);
        if (key === 'profile' && !value.name) throw new Error('Missing profile name');
        return [key, value];
      } catch (error) {
        if (key === 'profile') throw error;
        failedSections.push(key);
        console.warn('Unable to load ' + path);
        return [key, key === 'emailjsConfig' ? {} : []];
      }
    }));
    return Object.assign(Object.fromEntries(values), { siteConfig, failedSections });
  }
  window.PortfolioDataLoader = { loadPortfolioData };
})(window);
