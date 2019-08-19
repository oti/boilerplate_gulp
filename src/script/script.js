import arrayFrom from './libs/array-from'
import isoPoryfill from './libs/intersection-observer-poryfill'
import uac from './libs/user-agent-checker'
import whatInput from 'what-input'

arrayFrom();
isoPoryfill()
uac();

import AnchorLink from './modules/AnchorLink'
import Disclosure from './modules/Disclosure'
import Drawer from './modules/Drawer'
import InView from './modules/InView'
import Tab from './modules/Tab'

document.addEventListener('DOMContentLoaded', (event) => {
  const anchorLink = new AnchorLink()
  anchorLink.init()

  Array.from(document.querySelectorAll('.p-footerNav__icon')).forEach(button => {
    const target = document.querySelector('#' + button.getAttribute('aria-controls'))
    const disclosure = new Disclosure(button, target)
    disclosure.init()
  })

  const drawer = new Drawer()
  drawer.init()

  const modal = new Modal()
  modal.init()

  const tab = new Tab()
  tab.init()

  const inView = new InView()
  inView.init()
})
