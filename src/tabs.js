export function initTabs() {
  const tabs = [...document.querySelectorAll('[role="tab"]')]
  if (tabs.length === 0) return

  function select(tab, { focus = false, updateHash = true } = {}) {
    tabs.forEach((t) => {
      const selected = t === tab
      t.setAttribute('aria-selected', String(selected))
      t.tabIndex = selected ? 0 : -1
      document.getElementById(t.getAttribute('aria-controls')).hidden = !selected
    })
    if (focus) tab.focus()
    if (updateHash) history.replaceState(null, '', `#${tab.dataset.hash}`)

    // 새 탭 내용을 맨 위부터 보여주기
    const main = document.getElementById('content')
    if (main) {
      main.scrollTop = 0
      // 모바일처럼 본문이 화면 밖에 있으면 본문 위치로 이동
      if (main.getBoundingClientRect().top < 0) main.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  function findByHash(hash) {
    return tabs.find((t) => t.dataset.hash === hash.replace('#', ''))
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => select(tab))
  })

  // 방향키, Home, End로 탭 이동
  tabs[0].parentElement.addEventListener('keydown', (event) => {
    const index = tabs.indexOf(document.activeElement)
    if (index === -1) return

    let next = null
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length]
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length]
    if (event.key === 'Home') next = tabs[0]
    if (event.key === 'End') next = tabs[tabs.length - 1]

    if (next) {
      event.preventDefault()
      select(next, { focus: true })
    }
  })

  // 본문 안의 #photo 같은 링크를 누르면 해당 탭 열기
  window.addEventListener('hashchange', () => {
    const tab = findByHash(location.hash)
    if (tab) select(tab, { updateHash: false })
  })

  const initial = findByHash(location.hash)
  if (initial) select(initial, { updateHash: false })
}
