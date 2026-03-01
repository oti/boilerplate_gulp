import uac from "./libs/user-agent-checker";
uac();

import Disclosure from "./modules/Disclosure";
import Drawer from "./modules/Drawer";
import InView from "./modules/InView";
import Tab from "./modules/Tab";

document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll(".p-footerNav__icon").forEach((button) => {
    const target = document.querySelector(
      "#" + button.getAttribute("aria-controls"),
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
});
