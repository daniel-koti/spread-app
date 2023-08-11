import { parseCookies } from 'nookies'

export async function fetchAPI<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
) {
  const { '@spread.token': token } = parseCookies()

  const response = await fetch(`http://localhost:3333/${input}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
    ...init,
  })

  const data = await response.json()
  return data as T
}
