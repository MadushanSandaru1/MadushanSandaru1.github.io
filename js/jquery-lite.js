(function (window, document) {
  if (window.jQuery) return;

  function Lite(input) {
    if (typeof input === 'function') {
      if (document.readyState !== 'loading') input();
      else document.addEventListener('DOMContentLoaded', input);
      return new Collection([]);
    }
    if (typeof input === 'string') return new Collection(Array.from(document.querySelectorAll(input)));
    if (input === window || input === document || input instanceof Element) return new Collection([input]);
    if (Array.isArray(input)) return new Collection(input);
    if (typeof input === 'object') return new Collection([input]);
    return new Collection([]);
  }

  function Collection(items) {
    this.items = items;
    this.length = items.length;
  }

  Collection.prototype.each = function (callback) {
    this.items.forEach(function (item, index) { callback.call(item, index, item); });
    return this;
  };

  Collection.prototype.html = function (value) {
    if (value === undefined) return this.items[0] && this.items[0].innerHTML;
    return this.each(function () { this.innerHTML = value; });
  };

  Collection.prototype.text = function (value) {
    if (value === undefined) return this.items[0] && this.items[0].textContent;
    return this.each(function () { this.textContent = value; });
  };

  Collection.prototype.attr = function (name, value) {
    if (value === undefined) return this.items[0] && this.items[0].getAttribute(name);
    return this.each(function () { this.setAttribute(name, value); });
  };

  Collection.prototype.append = function (value) {
    return this.each(function () { this.insertAdjacentHTML('beforeend', value); });
  };

  Collection.prototype.on = function (event, handler) {
    return this.each(function () { this.addEventListener(event, handler); });
  };

  Collection.prototype.addClass = function (name) {
    return this.each(function () { this.classList && this.classList.add(name); });
  };

  Collection.prototype.removeClass = function (name) {
    return this.each(function () { this.classList && this.classList.remove(name); });
  };

  Collection.prototype.toggleClass = function (name, force) {
    return this.each(function () { this.classList && this.classList.toggle(name, force); });
  };

  Collection.prototype.toggle = function (show) {
    return this.each(function () { this.style.display = show ? '' : 'none'; });
  };

  Collection.prototype.remove = function () {
    return this.each(function () { this.remove(); });
  };

  Collection.prototype.data = function (name) {
    const item = this.items[0];
    const key = name.replace(/-([a-z])/g, function (_, letter) { return letter.toUpperCase(); });
    return item && item.dataset ? item.dataset[key] : undefined;
  };

  Collection.prototype.offset = function () {
    const rect = this.items[0].getBoundingClientRect();
    return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
  };

  Collection.prototype.animate = function (props, options) {
    if (this.items.includes(document.documentElement) || this.items.includes(document.body)) {
      window.scrollTo({ top: props.scrollTop || 0, behavior: 'smooth' });
      return this;
    }
    const item = this.items[0];
    if (!item || typeof item !== 'object') return this;
    const start = item.value || 0;
    const end = props.value || 0;
    const duration = options.duration || 400;
    const startTime = performance.now();
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      item.value = start + (end - start) * progress;
      if (options.step) options.step(item.value);
      if (progress < 1) requestAnimationFrame(tick);
      else if (options.complete) options.complete();
    }
    requestAnimationFrame(tick);
    return this;
  };

  Lite.getJSON = function (path) {
    return fetch(path).then(function (response) {
      if (!response.ok) throw new Error('Unable to load ' + path);
      return response.json();
    });
  };

  window.$ = window.jQuery = Lite;
})(window, document);
