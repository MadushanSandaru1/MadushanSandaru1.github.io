(function (window, document) {
  function hasValue(value) {
    return value !== undefined && value !== null && String(value).trim() !== '';
  }

  function isConfigured(config) {
    if (!config || config.enabled !== true) return false;
    return ['publicKey', 'serviceId', 'templateId'].every(function (key) {
      return hasValue(config[key]) && !String(config[key]).startsWith('YOUR_EMAILJS_');
    });
  }

  function setStatus(form, message, state) {
    const status = form.querySelector('[data-contact-status]');
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state || 'idle';
  }

  function setLoading(form, loading) {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = loading;
    button.dataset.originalText = button.dataset.originalText || button.innerHTML;
    button.innerHTML = loading ? 'Sending...' : button.dataset.originalText;
  }

  function openMailto(config, fields) {
    const to = config.fallbackEmail || fields.toEmail || '';
    const subject = encodeURIComponent(fields.subject || 'Portfolio contact message');
    const body = encodeURIComponent(`Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  function getFields(form, config) {
    const data = new FormData(form);
    const fallbackEmail = config.fallbackEmail || form.dataset.fallbackEmail || '';
    return {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      subject: String(data.get('subject') || 'Portfolio contact message').trim(),
      toEmail: fallbackEmail
    };
  }

  function toTemplateParams(config, fields) {
    const map = config.templateParams || {};
    const params = {};
    params[map.name || 'from_name'] = fields.name;
    params[map.email || 'reply_to'] = fields.email;
    params[map.message || 'message'] = fields.message;
    params[map.subject || 'subject'] = fields.subject;
    params[map.toEmail || 'to_email'] = fields.toEmail;
    return params;
  }

  function getEmailJsOptions(config) {
    const options = Object.assign({}, config.options || {});
    options.publicKey = config.publicKey;
    if (options.limitRate && !Number(options.limitRate.throttle)) delete options.limitRate;
    if (options.blockList && (!Array.isArray(options.blockList.list) || !options.blockList.watchVariable)) delete options.blockList;
    return options;
  }

  function init(config) {
    const form = document.querySelector('[data-contact-form]');
    if (!form) return;
    const emailConfig = config || {};
    const canSendWithEmailJs = isConfigured(emailConfig) && window.emailjs;

    if (canSendWithEmailJs) {
      window.emailjs.init(getEmailJsOptions(emailConfig));
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const fields = getFields(form, emailConfig);

      if (!fields.name || !fields.email || !fields.message) {
        setStatus(form, 'Please complete all required fields.', 'error');
        return;
      }

      if (!canSendWithEmailJs) {
        setStatus(form, 'EmailJS is not configured yet. Opening your email app instead.', 'info');
        openMailto(emailConfig, fields);
        return;
      }

      setLoading(form, true);
      setStatus(form, 'Sending your message...', 'loading');

      window.emailjs.send(emailConfig.serviceId, emailConfig.templateId, toTemplateParams(emailConfig, fields), getEmailJsOptions(emailConfig))
        .then(function (response) {
          form.reset();
          const sent = response && response.status ? `Message sent successfully (${response.status}).` : 'Message sent successfully.';
          setStatus(form, `${sent} Thank you for reaching out.`, 'success');
        })
        .catch(function (error) {
          const detail = error && error.text ? ` ${error.text}` : '';
          setStatus(form, `Message could not be sent.${detail} Please try again or email me directly.`, 'error');
        })
        .finally(function () {
          setLoading(form, false);
        });
    });
  }

  window.PortfolioContact = { init };
})(window, document);
