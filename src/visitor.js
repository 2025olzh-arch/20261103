import { load, save } from './storage.js'

// 방문자 수: 서버 없이 이 브라우저의 방문 횟수만 셉니다 (탭을 새로 열 때마다 1회).
export function initVisitor() {
  const todayEl = document.querySelector('.count-today')
  const totalEl = document.querySelector('.count-total')
  if (!todayEl || !totalEl) return

  const today = new Date().toISOString().slice(0, 10)
  const data = load('visitor', { date: today, today: 0, total: 0 })

  if (data.date !== today) {
    data.date = today
    data.today = 0
  }

  let counted = false
  try {
    counted = sessionStorage.getItem('visited') === '1'
    sessionStorage.setItem('visited', '1')
  } catch {
    // sessionStorage를 쓸 수 없으면 매번 셈
  }

  if (!counted) {
    data.today += 1
    data.total += 1
    save('visitor', data)
  }

  todayEl.textContent = data.today
  totalEl.textContent = data.total
}
