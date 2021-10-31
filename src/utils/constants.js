export const host = "http://127.0.0.1:8000/"
const endpointInitial = `${host}api/v1`

export const endpoints = {
  // authentication
  LOGIN_USER: `${endpointInitial}/accounts/login`,
  SIGNUP_USER: `${endpointInitial}/accounts/users`,
  VERIFY_TOKEN: `${endpointInitial}/accounts/login/verify`,
  REFRESH_TOKEN: `${endpointInitial}/accounts/login/refresh`,
  CHECK_EXISTS: `${endpointInitial}/accounts/user/exists`,
  OBTAIN_RESET_TOKEN: `${endpointInitial}/accounts/password/reset`,
  VALIDATE_RESET_TOKEN: (uidb64, token) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,
  RESET_NEW_PASSWORD: (uidb64, token) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,

  //user
  USER_PROFILE: `${endpointInitial}/accounts/user/profile`,

}


export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)'
}

export const timeInMilliseconds = {
  MINUTE: 60 * 1000,
  DAY: 24 * 60 * 60 * 1000
}