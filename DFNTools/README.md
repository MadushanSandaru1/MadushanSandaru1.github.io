# DFN Tools

DFN Tools is a lightweight Bootstrap 5-based utility web application built to simplify common DirectFN and integration-related tasks. It provides quick, browser-based generators and helpers for notification templates, OAuth gateway configuration, and support requests.

## Features

- Notification Template Generator
- ALKB Notification Template Generator
- ESBPLG OAuth 2.0 Gateway Config Generator
- Support page with EmailJS integration
- Responsive Bootstrap 5 UI
- Reusable shared styling and common JavaScript
- Offcanvas quick-links navigation
- Copy-to-clipboard, modal previews, and toast notifications

## Available Tools

### 1. Notification Template Generator
Generate:
- English SMS templates
- Arabic SMS templates
- English email subjects
- Arabic email subjects
- English email templates
- Arabic email templates
- Insert / Update / Insert & Update SQL queries

### 2. ALKB Notification Template Generator
Generate ALKB-branded:
- English and Arabic SMS templates
- English and Arabic email subjects
- English and Arabic email titles
- Styled HTML email templates
- SQL queries for insert/update operations
- Email preview with branded header and footer

### 3. ESBPLG OAuth 2.0 Gateway Config Generator
Generate JSON configuration for OAuth gateway plugins including:
- Producer and consumer endpoint mappings
- Rate limiter plugin configuration
- Basic auth plugin configuration
- Exposed endpoint structure
- Downloadable and copyable formatted JSON output

### 4. Support Page
Users can:
- Submit feedback
- Share ideas
- Send support requests

This page uses EmailJS for client-side email delivery.

---

## Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5
- Bootstrap Icons
- AOS (Animate On Scroll)
- EmailJS

---

## Project Structure

```bash
DFN-Tools/
│
├── index.html
├── support.html
│
├── tools/
│   ├── notification-template.html
│   ├── alkb-notification-template.html
│   └── esbplg-oauth-configuration.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   └── support-form.js
│   │
│   ├── img/
│   │   └── ...
│   │
│   └── vendor/
│       └── ...
│
└── README.md