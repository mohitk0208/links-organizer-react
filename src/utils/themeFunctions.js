export function applyTheme() {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function chooseDarkMode() {

  localStorage.theme = 'dark'
  applyTheme()
}

export function chooseLightMode() {
  localStorage.theme = 'light'
  applyTheme()

}

export function chooseSystemMode() {
  localStorage.removeItem('theme')
  applyTheme()
}

export function getCurrentTheme() {
  return localStorage.theme ? localStorage.theme : 'system'
}