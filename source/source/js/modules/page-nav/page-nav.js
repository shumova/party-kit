import {toggleOff} from '../toggle/init-toggle';

class PageNav {
  constructor() {
    this.container = document.querySelector('[data-page-nav="container"]');
    this.content = this.container && document.querySelector('[data-page-nav="content"]');
    this.nav = this.container && this.container.querySelector('[data-page-nav="list"]');
    this.toggle = this.container && this.container.querySelector('[data-page-nav="toggle"]');

    this.breakpoint = {
      tablet: window.matchMedia('(max-width: 1023px)'),
      mobile: window.matchMedia('(max-width: 767px)'),
    };

    this.isOpen = false;

    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._documentKeydownHandler = this._documentKeydownHandler.bind(this);

    this._toggleMouseoverHandler = this._toggleMouseoverHandler.bind(this);
    this._toggleMouseoutHandler = this._toggleMouseoutHandler.bind(this);

    this._windowResizeHandler = this._windowResizeHandler.bind(this);

    this._init();
  }

  _init() {
    if (!this.container || !this.toggle) {
      return;
    }

    this._addListeners();
  }

  _addListeners() {
    document.addEventListener('click', this._documentClickHandler);
    document.addEventListener('keydown', this._documentKeydownHandler);

    this.toggle.addEventListener('mouseover', this._toggleMouseoverHandler);
    this.toggle.addEventListener('mouseout', this._toggleMouseoutHandler);

    this.container.addEventListener('transitionend', this._containerTransitionendHandler);

    window.addEventListener('resize', this._windowResizeHandler);
  }

  _disableToggleEvents() {
    this.toggle.style.setProperty('pointer-events', 'none');

    setTimeout(() => this.toggle.style.removeProperty('pointer-events'), 400);
  }

  _documentClickHandler(evt) {
    const target = evt.target;

    const isOnToggleClick = target.closest('[data-page-nav="toggle"]');
    const isOnPageNavClick = target.closest('[data-page-nav="content"]');

    if (isOnToggleClick) {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    } else if (!isOnPageNavClick && this.isOpen) {
      evt.preventDefault();

      this.close();
      toggleOff(this.toggle);
    }
  }

  _documentKeydownHandler(evt) {
    if (this.isOpen && evt.key === 'Escape') {
      evt.preventDefault();

      this.close();
      toggleOff(this.toggle);
    }
  }

  _toggleMouseoverHandler() {
    this.container.classList.add('is-ajar');
  }

  _toggleMouseoutHandler() {
    this.container.classList.remove('is-ajar');
  }

  _windowResizeHandler() {
    this.content.classList.add('no-transition');

    setTimeout(() => this.content.classList.remove('no-transition'), 400);

    if (!this.breakpoint.tablet.matches) {
      if (this.container.classList.contains('is-open')) {
        this.container.classList.remove('is-open');
      }

      if (this.toggle.classList.contains('is-active')) {
        this.toggle.classList.remove('is-active');
      }
    }
  }

  open() {
    this.isOpen = true;
    this.container.classList.add('is-open');

    this._disableToggleEvents();
  }

  close() {
    this.isOpen = false;
    this.container.classList.remove('is-open');

    this._disableToggleEvents();
  }
}


const initPageNav = () => {
  return new PageNav();
};

export {initPageNav};
