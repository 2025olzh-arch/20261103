import { load, save } from './storage.js'

const STORAGE_KEY = 'guestbook'

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

    if (entries.length === 0) {
      const empty = document.createElement('li')
      empty.className = 'guest-empty'
      empty.textContent = '아직 방명록이 없어요. 첫 글을 남겨 주세요!'
      list.append(empty)
      return
    }

    entries.forEach((entry, index) => {
      const item = document.createElement('li')
      item.className = 'guest-item'

      const head = document.createElement('div')
      head.className = 'guest-head'

      const meta = document.createElement('span')
      meta.textContent = `No.${entries.length - index} ${entry.name}`

      const right = document.createElement('span')
      right.className = 'guest-head-right'
      const date = document.createElement('time')
      date.textContent = formatDate(entry.time)
      const del = document.createElement('button')
      del.type = 'button'
      del.className = 'guest-delete'
      del.textContent = '삭제'
      del.setAttribute('aria-label', `${entry.name}님의 방명록 삭제`)
      del.addEventListener('click', () => {
        entries.splice(index, 1)
        save(STORAGE_KEY, entries)
        render()
      })
      right.append(date, del)

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
