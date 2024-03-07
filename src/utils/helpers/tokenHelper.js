const jwtPayloadKey = {
  id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  exp: 'exp'
}

class TokenHelper {
  constructor(accessToken) {
    this.jwtPayload = accessToken ? JSON.parse(atob(accessToken.split('.')[1])) : null
  }

  getPayload() {
    return this.jwtPayload
      ? {
          id: this.jwtPayload[jwtPayloadKey.id],
          role: this.jwtPayload[jwtPayloadKey.role],
          exp: this.jwtPayload[jwtPayloadKey.exp]
        }
      : null
  }
}

function getAuthTokens() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export default TokenHelper
export { getAuthTokens, getAccessToken }
