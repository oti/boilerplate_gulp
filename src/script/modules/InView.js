/**
 * InView :
 *   要素が画面に入ったらクラスつける
 */

export default class InView {
  constructor() {
    this.activeName = "-shown";
    this.targetName = "[data-inview]";
    this.targetElement = document.querySelectorAll(this.targetName);
    this.observer = new IntersectionObserver(
      (observes) => {
        this.observeTarget(observes);
      },
      {
        // 0だと1pxでも画面に入った瞬間に、1だと全て画面に入ったら isInteresting = true になる
        threshold: [0.5],
      },
    );
  }

  init() {
    if (!this.targetElement.length) return;
    this.attachEvent();
  }

  attachEvent() {
    this.targetElement.forEach((elem) => {
      this.observer.observe(elem);
    });
  }

  observeTarget(observes) {
    observes.forEach((observe) => {
      if (observe.isIntersecting) {
        observe.target.classList.add(this.activeName);
        // 監視をやめる
        // this.observer.unobserve(observe.target);
      } else {
        observe.target.classList.remove(this.activeName);
      }
    });
  }

  detachEvent() {
    this.targetElement.forEach((elem) => {
      this.observer.unobserve(elem);
    });
  }
}
