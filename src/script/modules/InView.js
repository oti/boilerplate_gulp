/**
 * InView :
 *   要素が画面に入ったらクラスつける
 */

class InView {

  constructor() {
    this.inView = document.querySelectorAll('.-inView')
    this.showName = '-show'
    this.observer = new IntersectionObserver((observes) => {
      this.observeTarget(observes)
    }, {
      // 0だと1pxでも画面に入った瞬間に、1だと全て画面に入ったら isInteresting = true になる
      threshold: [0]
    })
  }

  init() {
    if (!this.inView.length) return
    this.attachEvent()
  }

  attachEvent() {
    Array.from(this.inView).forEach(elem => {
      this.observer.observe(elem)
    })
  }

  observeTarget(observes) {
    observes.forEach((observe) => {
      if (observe.isIntersecting) {
        observe.target.classList.add(this.showName)
        // 監視をやめる
        this.observer.unobserve(observe.target)
        // } else {
        //   observe.target.classList.remove('is-show')
      }
    })
  }

  detachEvent() {
    Array.from(this.inView).forEach(elem => {
      this.observer.unobserve(elem)
    })
  }
}

export default InView
