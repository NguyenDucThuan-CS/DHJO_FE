import http from './../utils/http'

const url = 'api/auth'

export const register = ({ email, password }: { email: string; password: string }, type: string) =>
  http.post<{ email: string; password: string }>(`${url}/signup/${type}`, {
    email: email,
    password: password,
    username: ''
  })

export const login = ({ usernameOrEmail, password }: { usernameOrEmail: string; password: string }) => {
  http.post<{ usernameOrEmail: string; password: string }>(`${url}/login`, {
    usernameOrEmail: usernameOrEmail,
    password: password
  })
}
