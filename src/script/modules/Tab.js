/**
 * Tab :
 *   タブ
 */

class Tab {

  constructor() {
    this.wrap = document.querySelector('#tabPanelWrap')
    this.button1 = document.querySelector('#tabButton1')
    this.button2 = document.querySelector('#tabButton2')
    this.target1 = document.querySelector('#tabPannel1')
    this.target2 = document.querySelector('#tabPannel2')
    this.selected = 'target1'
    this.breakpoint = '(max-width: 767px)'
    this.smp = window.matchMedia(this.breakpoint).matches
    this.innerWidth = window.innerWidth
    this.innerWidthCache = window.innerWidth
    this.hash = location.hash
  }

  init() {
    if (!this.button1 || !this.button2 || !this.target1 || !this.target2) return
    // tabpanelはabsoluteなので初めに高さ確保
    this.changeHeight()
    this.attachEvent()
    if (this.hash && this.hash !== '') this.autoOpenTab()
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addListener(event => {
      this.smp = event.matches
    })

    window.addEventListener('resize', event => {
      this.innerWidth = window.innerWidth
      if (this.innerWidth !== this.innerWidthCache) {
        this.innerWidthCache = this.innerWidth
        this.changeHeight()
      }
    }, false)

    //タブのボタン
    this.button1.addEventListener('click', event => {
      event.preventDefault()
      if (event.target.getAttribute('aria-selected')) return
      this.openTab1()
    }, false)

    //タブのボタン
    this.button2.addEventListener('click', event => {
      event.preventDefault()
      if (event.target.getAttribute('aria-selected')) return
      this.openTab2()
    }, false)
  }

  openTab1() {
    this.selected = 'target1'
    this.changeState(this.button1, this.target1, true)
    this.changeState(this.button2, this.target2, false)
    this.changeHeight()
  }

  openTab2() {
    this.selected = 'target2'
    this.changeState(this.button1, this.target1, false)
    this.changeState(this.button2, this.target2, true)
    this.changeHeight()
  }

  // stateは変更後の真偽値
  changeAria(button, target, state) {
    button.setAttribute('aria-selected', state)
    target.setAttribute('aria-hidden', !state)
  }

  // stateは変更後の真偽値
  changeState(button, target, state) {
    this.changeAria(button, target, state)
  }

  changeHeight(target = this.selected) {
    this.wrap.style.height = this[this.selected].clientHeight + 'px'
  }

  autoOpenTab() {
    if (/target1/.test(this.hash)) {
      this.selected = 'target1'
      this.openTab1()
    }
    if (/target2/.test(this.hash)) {
      this.selected = 'target2'
      this.openTab2()
    }
  }
}

export default Tab
