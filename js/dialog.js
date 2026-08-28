(function (window, document) {
  let active = null;
  let previous = null;
  let background = [];
  const selector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex="0"]';
  function close() {
    if (!active) return;
    active.hidden = true;
    background.forEach(([element, inert]) => { element.inert = inert; });
    document.body.classList.remove('modal-open');
    active = null;
    if (previous && previous.isConnected) previous.focus();
  }
  function open(modal, initialFocus, returnFocus) {
    if (active === modal) return;
    if (active) close();
    previous = returnFocus || document.activeElement;
    active = modal;
    background = Array.from(document.body.children).filter((element) => element !== modal).map((element) => [element, element.inert]);
    background.forEach(([element]) => { element.inert = true; });
    modal.hidden = false;
    document.body.classList.add('modal-open');
    (initialFocus || modal.querySelector(selector)).focus();
  }
  document.addEventListener('keydown', function (event) {
    if (!active) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key !== 'Tab') return;
    const controls = Array.from(active.querySelectorAll(selector)).filter((element) => element.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  window.PortfolioDialog = { open, close };
})(window, document);
