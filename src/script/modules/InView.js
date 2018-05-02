/**
 * InView :
 *   要素が画面に入ったらクラスつける
 */

import IntersectionObserverPoryfill from '../libs/intersection-observer-poryfill';

class InView {

  constructor() {
    this.$inView = document.querySelectorAll('.js-inView');

    IntersectionObserverPoryfill();
    this.observer = new IntersectionObserver((observes) => {
      this.observeTarget(observes)
    }, {
      threshold: [0.5]
    });
  }

  init() {
    this.attachEvent();
  }

  attachEvent() {
    [...this.$inView].forEach((elem) => {
      this.observer.observe(elem);
    });
  }

  observeTarget(observes) {
    observes.forEach((observe) => {
      if (observe.isIntersecting) {
        observe.target.classList.add('is-inView');
        // this.observer.unobserve(observe.target)
      } else {
        observe.target.classList.remove('is-inView');
      }
    });
  }
}

export default InView;
