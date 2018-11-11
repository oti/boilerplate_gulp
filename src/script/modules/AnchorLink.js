/**
 * AnchorLink :
 *   アンカーリンクのスムーススクロール
 */

import SmoothScroll from "smooth-scroll"


class AnchorLink {

  constructor() {
    this.body = document.querySelector('body')
    this.selector = 'a[href^="#"]'
    this.anchorLink = document.querySelectorAll(this.selector)
    this.breakpoint = '(max-width: 767px)'
    this.smp = window.matchMedia(this.breakpoint).matches
    // fixedしているヘッダー分、スクロールを戻す（fixeｄやめろ）
    this.offset = this.smp ? 0 : 0;
    this.hash = location.hash
    this.initTimer = null
  }

  init() {
    if (!this.anchorLink) return
    this.attachEvent()
    if (this.hash && this.hash !== '') this.scrollToAnchor()
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addListener(event => {
      this.smp = event.matches
      this.offset = this.smp ? 0 : 0
    })
    this.scroll = new SmoothScroll(this.selector, {offset: this.offset});
  }

  scrollToAnchor() {
    // いったんスクロールを戻す
    window.scrollTo(0,0)

    // 少し遅れてスムーススクロール
    this.initTimer = setTimeout(() => {
      clearTimeout(this.initTimer)
      this.scroll.animateScroll(document.querySelector(this.hash))
    }, 10)
  }
}

export default AnchorLink
