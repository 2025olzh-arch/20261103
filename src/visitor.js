import { load, save } from './storage.js'

// TOTAL 방문자 수는 고정값으로 표시합니다.
const TOTAL_VISITORS = 1004

// TODAY 방문자 수: 서버 없이 이 브라우저의 오늘 방문 횟수만 셉니다 (탭을 새로 열 때마다 1회).
export function initVisitor() {
  const todayEl = document.querySelector('.count-today')
  const totalEl = document.querySelector('.count-total')
  if (!todayEl || !totalEl) return

  const today = new Date().toISOString().slice(0, 10)
  const data = load('visitor', { date: today, today: 0 })

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
    save('visitor', { date: data.date, today: data.today })
  }

  todayEl.textContent = data.today
  totalEl.textContent = TOTAL_VISITORS.toLocaleString('ko-KR')
}
