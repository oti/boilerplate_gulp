/**
 * Drawer :
 *   SP用ドロワーメニュー
 */

import NoScroll from 'no-scroll'
import FocusTrap from 'focus-trap'

class Drawer {

  constructor() {
    this.body = document.querySelector('body')
    this.focusContainer = document.querySelector('#header')
    this.button = document.querySelector('#drawerToggler')
    this.drawer = document.querySelector('#drawer')
    this.expanded = false
    this.stateName = '-drawerOpened'
    this.breakpoint = '(max-width: 767px)'
    this.smp = window.matchMedia(this.breakpoint).matches
    this.focusTrap = null
  }

  init() {
    if (!this.button) return
    this.attachEvent()
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addListener(event => {
      this.smp = event.matches
      // ブレークポイントが変わったら必ずメニューを閉じる
      this.changeState(false)
    })

    this.focusTrap = FocusTrap('#header', {
      onActivate: () => {
        this.focusContainer.classList.add('-active')
      },
      onDeactivate: () => {
        this.focusContainer.classList.remove('-active')
        this.changeState(false);
      }
    })

    this.button.addEventListener('click', ()=>{
      this.changeState(!this.expanded)
    }, false)

    window.addEventListener('keydown', this.onKeydownEsc, false);
  }

  // stateは変更後の真偽値
  changeAria(state) {
    this.button.setAttribute('aria-expanded', state ? 'true' : 'false')
    this.drawer.setAttribute('aria-hidden', state ? 'false' : 'true')
  }

  // stateは変更後の真偽値
  changeState(state) {
    if(state === this.expanded) {
      // 2回以上連続で同じ状態に変更しようとした
      return
    }
    if (state) {
      this.focusTrap.activate()
    } else {
      this.focusTrap.deactivate()
    }
    this.changeAria(state)
    this.changeBodyClass(state)
    this.changeBodyScrollability(state)
    this.expanded = state
  }

  changeBodyClass(state) {
    if (state) {
      this.body.classList.add(this.stateName)
    } else {
      this.body.classList.remove(this.stateName)
    }
  }

  changeBodyScrollability(state) {
    if (state) {
      NoScroll.on()
    } else {
      NoScroll.off()
    }
  }

  onKeydownEsc(event) {
    if(!this.expanded || event.key !== 'Escape' || !this.smp) {
      return;
    }
    event.preventDefault();
    this.changeState(false);
  }
}

export default Drawer
