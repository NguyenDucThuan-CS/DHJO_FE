export const setCookie = (day: number, value?: string, key?: string, domain?: string) => {
  const now = new Date()
  const time = now.getTime()
  const expireTime = time + day * 86400 * 1000
  now.setTime(expireTime)

  let domainString
  if (domain) {
    domainString = `;domain=${domain}`
  } else {
    domainString = ''
  }
  document.cookie = `${key}=${value};expires=${now.toUTCString()}${domainString};path=/`
}

export const deteletAllCookie = (domain?: string) => {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) setCookie(1, '', cookies[i].split('=')[0], domain)
}

export const readCookie = (name: string) => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return ''
}

