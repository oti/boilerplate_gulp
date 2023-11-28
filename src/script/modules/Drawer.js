/**
 * Drawer :
 *   SP用ドロワーメニュー
 */

import noScroll from "no-scroll";
import * as focusTrap from "focus-trap";

export default class Drawer {
  constructor() {
    this.body = document.querySelector("body");
    this.focusContainer = document.querySelector("#header");
    this.button = document.querySelector("#drawerToggler");
    this.drawer = document.querySelector("#drawer");
    this.expanded = false;
    this.stateName = "-drawerOpened";
    this.breakpoint = "(max-width: 767px)";
    this.smp = window.matchMedia(this.breakpoint).matches;
    this.trap = null;
  }

  init() {
    if (!this.button || !this.drawer) return;
    this.attachEvent();
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addEventListener(
      "change",
      (event) => {
        this.smp = event.matches;
        // ブレークポイントが変わったら必ずメニューを閉じる
        this.changeState(false);
      },
      false,
    );

    this.trap = focusTrap.createFocusTrap("#header", {
      onActivate: () => {
        this.focusContainer.classList.add("-active");
      },
      onDeactivate: () => {
        this.focusContainer.classList.remove("-active");
        this.changeState(false);
      },
    });

    this.button.addEventListener(
      "click",
      () => {
        this.changeState(!this.expanded);
      },
      false,
    );

    window.addEventListener("keydown", this.onKeydownEsc, false);
  }

  // stateは変更後の真偽値
  changeAria(state) {
    this.button.setAttribute("aria-expanded", state ? "true" : "false");
    this.drawer.setAttribute("aria-hidden", state ? "false" : "true");
  }

  // stateは変更後の真偽値
  changeState(state) {
    if (state === this.expanded) {
      // 2回以上連続で同じ状態に変更しようとした
      return;
    }
    if (state) {
      this.trap.activate();
    } else {
      this.trap.deactivate();
    }
    this.changeAria(state);
    this.changeBodyClass(state);
    this.changeBodyScrollability(state);
    this.expanded = state;
  }

  changeBodyClass(state) {
    if (state) {
      this.body.classList.add(this.stateName);
    } else {
      this.body.classList.remove(this.stateName);
    }
  }

  changeBodyScrollability(state) {
    if (state) {
      noScroll.on();
    } else {
      noScroll.off();
    }
  }

  onKeydownEsc(event) {
    if (!this.expanded || event.key !== "Escape" || !this.smp) {
      return;
    }
    event.preventDefault();
    this.changeState(false);
  }
}
