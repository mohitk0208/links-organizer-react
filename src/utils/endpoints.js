import {host} from "./constants"

const endpointInitial = `${host}api/v1`

const endpoints = {
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

  // categories
  GET_POST_CATEGORIES: `${endpointInitial}/categories`,
  SINGLE_CATEGORY: (id) => `${endpointInitial}/categories/${id}`,

  //links
  GET_POST_LINKS: `${endpointInitial}/links`,
  SINGLE_LINK: (id) => `${endpointInitial}/links/${id}`,

  //tags
  GET_POST_TAGS: `${endpointInitial}/tags`,
  SINGLE_TAG: (id) => `${endpointInitial}/tags/${id}`,
}


export default endpoints