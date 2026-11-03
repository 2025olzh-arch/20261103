import { load, save } from './storage.js'

export function initSidebar() {
  // 오늘의 기분: 선택한 값을 기억
  const mood = document.getElementById('mood-select')
  if (mood) {
    const saved = load('mood', null)
    if (saved && [...mood.options].some((o) => o.value === saved)) mood.value = saved
    mood.addEventListener('change', () => save('mood', mood.value))
  }
}
