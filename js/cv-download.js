(function (window, document) {

  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'cv-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'cv-modal-title');
    modal.setAttribute('hidden', '');
    modal.innerHTML = `
      <div class="cv-modal__backdrop" data-cv-cancel></div>
      <div class="cv-modal__panel" role="document">
        <button class="cv-modal__close" type="button" data-cv-cancel aria-label="Close confirmation">&times;</button>
        <p class="kicker">Resume download</p>
        <h3 id="cv-modal-title">Download Madhushan Sandaruwan's CV?</h3>
        <p>This will download the latest PDF resume to your device.</p>
        <div class="cv-modal__actions">
          <button class="button button-secondary" type="button" data-cv-cancel>Cancel</button>
          <button class="button button-primary" type="button" data-cv-confirm>Download CV</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function downloadFile(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function init() {
    const modal = createModal();
    const confirmButton = modal.querySelector('[data-cv-confirm]');
    let downloadUrl = '';

    function open(trigger) {
      downloadUrl = trigger.dataset.cvUrl || '';
      const label = trigger.dataset.cvLabel || 'Download CV';
      confirmButton.textContent = label;
      PortfolioDialog.open(modal, confirmButton);
    }

    function close() {
      PortfolioDialog.close();
    }

    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('[data-cv-download]');
      if (trigger) {
        event.preventDefault();
        open(trigger);
        return;
      }
      if (event.target.closest('[data-cv-cancel]')) close();
    });

    confirmButton.addEventListener('click', function () {
      if (downloadUrl) downloadFile(downloadUrl);
      close();
    });
  }

  window.PortfolioCvDownload = { init };
})(window, document);
