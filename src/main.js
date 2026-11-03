import './fonts.css'
import './style.css'

import { initTabs } from './tabs.js'
import { initVisitor } from './visitor.js'
import { initSkin } from './skin.js'
import { initSidebar } from './sidebar.js'
import { initGuestbook } from './guestbook.js'

initTabs()
initVisitor()
initSkin()
initSidebar()
initGuestbook()

document.querySelectorAll('.current-year').forEach((el) => {
  el.textContent = new Date().getFullYear()
})
