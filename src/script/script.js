import uac from "./libs/user-agent-checker";
import "what-input";

uac();

import AnchorLink from "./modules/AnchorLink";
import Disclosure from "./modules/Disclosure";
import Drawer from "./modules/Drawer";
import InView from "./modules/InView";
import Tab from "./modules/Tab";
import ViewportFit from "./modules/ViewportFit";

document.addEventListener("DOMContentLoaded", (event) => {
  const anchorLink = new AnchorLink();
  anchorLink.init();

  document.querySelectorAll(".p-footerNav__icon").forEach((button) => {
    const target = document.querySelector(
      "#" + button.getAttribute("aria-controls")
    );
    const disclosure = new Disclosure(button, target);
    disclosure.init();
  });

  const drawer = new Drawer();
  drawer.init();

  const inView = new InView();
  inView.init();

  const tab = new Tab();
  tab.init();

  const viewportFit = new ViewportFit();
  viewportFit.init();
});
