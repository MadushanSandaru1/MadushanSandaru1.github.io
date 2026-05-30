# Data-Driven Senior Engineer Portfolio

A modern, responsive, static portfolio website for a Senior Software Engineer and Integration Engineer. The site is built with HTML, CSS/SCSS, JavaScript, and jQuery, and is ready for GitHub Pages deployment.

## Project Structure

```txt
/
  index.html
  README.md
  assets/
    images/
      profile/
      projects/
      certificates/
      sessions/
      testimonials/
      backgrounds/
      awards/
      blog/
    icons/
    docs/
  data/
    site-config.json
    profile.json
    professional-experience.json
    projects.json
    technical-skills.json
    personal-skills.json
    education.json
    certificate-courses.json
    publications.json
    volunteer-experience.json
    awards-competitions.json
    testimonials.json
    interests.json
    languages.json
    community-sessions.json
    blog.json
    social-links.json
    emailjs-config.json
  scss/
  css/
  js/
```

## Customizing Content

All portfolio content is managed from JSON files in `/data`.

- Update your name, title, email, profile image, resume link, summary, focus areas, and stats in `data/profile.json`.
- Turn sections on or off in `data/site-config.json`.
- Update jobs in `data/professional-experience.json`.
- Update project cards and filters in `data/projects.json`.
- Update skills, education, certificates, publications, volunteer work, community sessions, awards, testimonials, languages, interests, blog articles, and social links in their matching JSON files.
- Update EmailJS contact form settings in `data/emailjs-config.json`.

The HTML contains only the base layout containers. Do not edit `index.html` for portfolio content unless you are changing the site structure.

## Replacing Images

Place real images in the matching folders under `assets/images`.

Example:

```json
"profileImage": {
  "src": "assets/images/profile/madhushan-sandaruwan-profile.webp",
  "alt": "Professional profile photo of Your Name",
  "fallback": "assets/images/profile/default-avatar.svg"
}
```

All image paths are read from JSON, including project screenshots, certificate badges, session images, testimonials, awards, and blog covers.

## Updating Your Resume

Your current CV is stored at:

```txt
assets/docs/Madhushan-Sandaruwan-Senior-Software-Engineer.pdf
```

Replace that file when you update your CV, or update `data/profile.json` if the file name changes.

## EmailJS Contact Form

The contact form uses EmailJS when configured. Edit `data/emailjs-config.json`:

```json
{
  "enabled": true,
  "publicKey": "your_public_key",
  "serviceId": "your_service_id",
  "templateId": "your_template_id",
  "fallbackEmail": "your-email@example.com",
  "options": {
    "blockHeadless": true,
    "limitRate": {
      "id": "portfolio-contact-form",
      "throttle": 10000
    },
    "blockList": {
      "list": [],
      "watchVariable": "reply_to"
    }
  }
}
```

In your EmailJS template, use these variables by default:

```txt
from_name
reply_to
subject
message
to_email
```

If your EmailJS template uses different variable names, update the `templateParams` mapping in `data/emailjs-config.json`. If EmailJS is disabled or not configured, the form falls back to opening the visitor's email app with a prefilled message.

The implementation follows the EmailJS browser SDK `send` method:

```js
emailjs.send(serviceID, templateID, templateParams, options)
```

The `options` object is also passed to `emailjs.init()` before sending, as recommended by the EmailJS SDK docs. EmailJS allows about one request per second, and this project additionally throttles the contact form to one request per 10 seconds by default.

## Local Development

Because the site loads JSON files with JavaScript, opening `index.html` directly may be blocked by browser file/CORS restrictions. Run a local static server instead:

```bash
python -m http.server 5500
```

Then open:

```txt
http://localhost:5500
```

VS Code Live Server also works well.

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open repository Settings.
3. Go to Pages.
4. Select the branch that contains this site, usually `main`.
5. Select `/root` as the publishing folder.
6. Save and wait for GitHub Pages to publish the site.

Update `data/site-config.json` with your real canonical GitHub Pages URL.

## Theme and Mobile Navigation

The portfolio supports dark and light themes with CSS variables. It detects the system theme by default, includes a manual toggle, and stores the selected theme in `localStorage`.

Desktop uses a sticky top navigation bar. Mobile uses a fixed bottom navigation bar with active section highlighting and thumb-friendly tap targets.

## SCSS and CSS

Source SCSS files are in `/scss`. The deployed stylesheet is `css/main.css`. If you edit SCSS, recompile or manually sync the generated CSS before deploying.
