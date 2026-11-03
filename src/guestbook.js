import { load, save } from './storage.js'

const STORAGE_KEY = 'guestbook'

// 미리 남겨진 방명록 (항상 표시되며 삭제할 수 없음, 최신 글이 위)
const SAMPLE_ENTRIES = [
  {
    name: '김카와',
    message: '재연쌤 미니홈피 너무 귀엽다 ㅋㅋ 다음 프로젝트도 같이 해요! 일촌 신청합니다~ ^^',
    time: new Date('2026-11-02T22:17').getTime(),
  },
  {
    name: '김치이',
    message: '오랜만에 파도타기 하다 들렀어~ 대학원 생활 화이팅!! ♡',
    time: new Date('2026-10-27T21:05').getTime(),
  },
]

function formatDate(time) {
  const d = new Date(time)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function initGuestbook() {
  const form = document.querySelector('.guest-form')
  const list = document.querySelector('.guest-list')
  if (!form || !list) return

  let entries = load(STORAGE_KEY, [])
  if (!Array.isArray(entries)) entries = []

  function render() {
    list.replaceChildren()

    // 방문자가 쓴 글(삭제 가능) 아래에 미리 남겨진 글을 이어서 표시
    const all = [
      ...entries.map((entry, index) => ({ ...entry, index })),
      ...SAMPLE_ENTRIES,
    ]

    all.forEach((entry, position) => {
      const item = document.createElement('li')
      item.className = 'guest-item'

      const head = document.createElement('div')
      head.className = 'guest-head'

      const meta = document.createElement('span')
      meta.textContent = `No.${all.length - position} ${entry.name}`

      const right = document.createElement('span')
      right.className = 'guest-head-right'
      const date = document.createElement('time')
      date.textContent = formatDate(entry.time)
      right.append(date)

      if (entry.index !== undefined) {
        const del = document.createElement('button')
        del.type = 'button'
        del.className = 'guest-delete'
        del.textContent = '삭제'
        del.setAttribute('aria-label', `${entry.name}님의 방명록 삭제`)
        del.addEventListener('click', () => {
          entries.splice(entry.index, 1)
          save(STORAGE_KEY, entries)
          render()
        })
        right.append(del)
      }

      head.append(meta, right)

      const body = document.createElement('p')
      body.className = 'guest-body'
      body.textContent = entry.message

      item.append(head, body)
      list.append(item)
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const name = form.elements.name.value.trim()
    const message = form.elements.message.value.trim()
    if (!name || !message) return

    entries.unshift({ name, message, time: Date.now() })
    save(STORAGE_KEY, entries)
    form.reset()
    render()
  })

  render()
}
