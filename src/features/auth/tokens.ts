import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const setToken = (tokenName: string, newToken: string | null) => {
  if (newToken) {
    const decoded = jwtDecode(newToken)
    Cookies.set(tokenName, newToken, {
      expires: decoded.exp,
    })
    return
  }
  Cookies.remove(tokenName)
}

export const getToken = (tokenName: string) => Cookies.get(tokenName)

export const isTokenExpired = (tokenName: string) => {
  const token = getToken(tokenName)
  if (!token) return true
  const decoded = jwtDecode(token)
  const timeLeft = (decoded.exp ?? 0) - Date.now() / 1000
  return timeLeft < 15
}
