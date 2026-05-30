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

  function loadJson(path) {
    return $.getJSON(path).catch(function () {
      console.warn('Unable to load ' + path);
      return Array.isArray(path) ? [] : null;
    });
  }

  function loadPortfolioData() {
    const entries = Object.entries(DATA_FILES);
    return Promise.all(entries.map(([key, path]) => loadJson(path).then((value) => [key, value]))).then(Object.fromEntries);
  }

  window.PortfolioDataLoader = { loadPortfolioData };
})(window);
