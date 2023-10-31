class Details {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('[data-details="content"]');

    this._animation = null;
    this._isClosing = false;
    this._isExpanding = false;

    this._summaryClickHandler = this._summaryClickHandler.bind(this);

    this._init();
  }

  _init() {
    if (!this.el || !this.summary || !this.content) {
      return;
    }

    this._addListeners();
  }

  _addListeners() {
    this.summary.addEventListener('click', this._summaryClickHandler);
  }

  _summaryClickHandler(evt) {
    evt.preventDefault();

    this.el.style.overflow = 'hidden';

    if (this._isClosing || !this.el.open) {
      this.open();
    } else if (this._isExpanding || this.el.open) {
      this.close();
    }
  }

  _expand() {
    this._isExpanding = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this.el.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease',
    });

    this._animation.onfinish = () => this._animationFinishHandler(true);
    this._animation.oncancel = () => {
      this._isExpanding = false;
    };
  }

  _animationFinishHandler(open) {
    this.el.open = open;
    this._animation = null;
    this._isClosing = false;
    this._isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }

  close() {
    this._isClosing = true;

    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;

    if (this._animation) {
      this._animation.cancel();
    }

    this._animation = this.el.animate({
      height: [startHeight, endHeight],
    }, {
      duration: 400,
      easing: 'ease-out',
    });

    this._animation.onfinish = () => this._animationFinishHandler(false);
    this._animation.oncancel = () => {
      this._isClosing = false;
    };
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this._expand());
  }
}


const initDetails = () => document.querySelectorAll('[data-details="details"]').forEach((el) => new Details(el));

export {initDetails};
