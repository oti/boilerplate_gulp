/**
 * Disclosure :
 *   ディスクロージャー
 */

export default class Disclosure {
  constructor(button, target) {
    this.button = button;
    this.target = target;
    this.expanded = false;
    this.breakpoint = "(max-width: 767px)";
    this.smp = window.matchMedia(this.breakpoint).matches;
  }

  init() {
    if (!this.button) return;
    this.attachEvent();
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addEventListener(
      "change",
      (event) => {
        this.smp = event.matches;
        // PC幅になったら全部展開、SP幅になったら全部収納する
        this.changeState(!this.smp);
      },
      false
    );

    this.button.addEventListener(
      "click",
      () => {
        this.changeState(!this.expanded);
      },
      false
    );
  }

  // stateは変更後の真偽値
  changeAria(state) {
    this.button.setAttribute("aria-expanded", state ? "true" : "false");
    this.target.setAttribute("aria-hidden", state ? "false" : "true");
  }

  // stateは変更後の真偽値
  changeState(state) {
    if (state === this.expanded) {
      // 2回以上連続で同じ状態に変更しようとした
      return;
    }
    this.changeAria(state);
    this.changeHeight(state);
    this.expanded = state;
  }

  changeHeight() {
    this.expanded ? this.shrink() : this.expand();
  }

  expand() {
    this.target.style.height = parseInt(this.target.scrollHeight, 10) + "px";
  }

  shrink() {
    this.target.style.height = 0;
  }
}
