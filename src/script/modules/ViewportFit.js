/**
 * ViewportFit :
 *   360px 未満の viewport では 360px 相対に固定する
 */

export default class ViewportFit {
  constructor() {
    this.viewport = document.querySelector("meta[name='viewport']");
    this.breakpoint = "not all and (min-width: 360px)"; // 360px を含まないそれ未満を示す
    this.valueOfMoreThan = "width=device-width";
    this.valueOfOrLess = "width=360";
  }

  init() {
    if (!this.viewport) return;
    this.attachEvent();
    this.toggleViewport(window.matchMedia(this.breakpoint).matches);
  }

  attachEvent() {
    window.matchMedia(this.breakpoint).addEventListener(
      "change",
      (event) => {
        this.toggleViewport(event.matches);
      },
      false
    );
  }

  toggleViewport(isFit) {
    const value = isFit ? this.valueOfOrLess : this.valueOfMoreThan;

    this.viewport.getAttribute("content") !== value &&
      this.viewport.setAttribute("content", value);
  }
}
