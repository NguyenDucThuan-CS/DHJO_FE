import http from './../utils/http'

const url = 'api/auth'

export const register = (
  { email, password, username }: { email: string; password: string; username: string },
  type: string
) =>
  http.post<{ email: string; password: string; username: string }>(`${url}/signup/${type}`, {
    email: email,
    password: password,
    username: username
  })

export const login = ({ usernameOrEmail, password }: { usernameOrEmail: string; password: string }) => {
  http.post<{ usernameOrEmail: string; password: string }>(`${url}/login`, {
    usernameOrEmail: usernameOrEmail,
    password: password
  })
}
