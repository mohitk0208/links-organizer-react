interface tokenObjectType {
  exp: number,
  jti: string,
  token_type: string,
  user_id: number
}

export function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const tokenStates = {
  VALID: "valid",       // when both token are valid
  INVALID: "invalid",   // when any one of the token is not found
  PARTIAL: "partial",   // when access is expired but refresh is active
  EXPIRED: "expired",   // when refresh is expired
}


export const checkTokenState = () => {

  const access = localStorage.getItem('access_token')
  const refresh = localStorage.getItem('refresh_token')

  //
  if (typeof access === "undefined" || access === null) return tokenStates.INVALID;

  if (typeof refresh === "undefined" || refresh === null) return tokenStates.INVALID;

  const accessTokenDetails = getTokenDetails(access)
  const refreshTokenDetails = getTokenDetails(refresh)


  const isAccessExpired = isTokenExpired(accessTokenDetails);
  const isRefreshExpired = isTokenExpired(refreshTokenDetails);

  if (!isAccessExpired && !isRefreshExpired) return tokenStates.VALID;

  if (isAccessExpired && !isRefreshExpired) return tokenStates.PARTIAL;

  return tokenStates.EXPIRED

}

function isTokenExpired(tokenObject: tokenObjectType) {
  return tokenObject.exp < getCurrentTimeInSeconds()
}

/**
 *
 * @param {string} token a base64 encoded jwt token
 * @returns {{exp:number,jti:string,token_type:string,user_id:number}}
 */
export function getTokenDetails(token: string): tokenObjectType {

  const detailsPart = token.split(".")[1]

  return JSON.parse(atob(detailsPart))
}

export function getCurrentTimeInSeconds() {
  return Math.ceil(new Date().getTime() / 1000)
}