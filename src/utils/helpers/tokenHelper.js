const jwtPayloadKey = {
  id: 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
  role: 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
  exp: 'exp',
}

class TokenHelper {
  constructor(token) {
    this.jwtPayload = token ? JSON.parse(atob(token.split('.')[1])) : null
  }

  getPayload() {
    return this.jwtPayload
      ? {
          id: this.jwtPayload[jwtPayloadKey.id],
          role: this.jwtPayload[jwtPayloadKey.role],
          exp: this.jwtPayload[jwtPayloadKey.exp] * 1000,
        }
      : null
  }
}

export default TokenHelper
