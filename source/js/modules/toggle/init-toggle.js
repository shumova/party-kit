const toggleOn = (toggle) => {
  const name = toggle.dataset.toggleTarget;

  toggle.setAttribute('aria-pressed', 'true');
  toggle.setAttribute('aria-label', `Close ${name ? name : 'menu'}`);
  toggle.classList.add('is-active');
};

const toggleOff = (toggle) => {
  const name = toggle.dataset.toggleTarget;

  toggle.setAttribute('aria-pressed', 'false');
  toggle.setAttribute('aria-label', `Open ${name ? name : 'menu'}`);
  toggle.classList.remove('is-active');
};

const documentClickHandler = (evt) => {
  const target = evt.target;

  if (target.closest('[data-toggle]')) {
    const toggle = evt.target.closest('[data-toggle]');

    if (toggle.getAttribute('aria-pressed') === 'true') {
      toggleOff(toggle);
    } else {
      toggleOn(toggle);
    }
  }
};

const toggles = document.querySelectorAll('[data-toggle]');

const initToggles = () => {
  if (toggles.length) {
    document.addEventListener('click', documentClickHandler);
  }
};

window.initToggleBtns = initToggles;

export {initToggles};
