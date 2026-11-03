import { load, save } from './storage.js'

const SKINS = ['blue', 'pink', 'green']

export function initSkin() {
  const button = document.querySelector('.skin-toggle')
  let skin = load('skin', SKINS[0])
  if (!SKINS.includes(skin)) skin = SKINS[0]

  document.documentElement.dataset.skin = skin
  if (!button) return

  button.addEventListener('click', () => {
    skin = SKINS[(SKINS.indexOf(skin) + 1) % SKINS.length]
    document.documentElement.dataset.skin = skin
    save('skin', skin)
  })
}
