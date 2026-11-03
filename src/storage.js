// localStorage를 쓸 수 없는 환경(시크릿 모드 등)에서도 오류 없이 동작하도록 감싼 함수

export function load(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? fallback : JSON.parse(value)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 저장 실패는 무시
  }
}
