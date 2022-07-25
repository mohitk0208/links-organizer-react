import { host, imageScrapperHost } from "./constants"

const endpointInitial = `${host}api/v1`

const endpoints = {
  // authentication
  LOGIN_USER: `${endpointInitial}/accounts/login`,
  SIGNUP_USER: `${endpointInitial}/accounts/users`,
  VERIFY_TOKEN: `${endpointInitial}/accounts/login/verify`,
  REFRESH_TOKEN: `${endpointInitial}/accounts/login/refresh`,
  CHECK_EXISTS: `${endpointInitial}/accounts/user/exists`,
  OBTAIN_RESET_TOKEN: `${endpointInitial}/accounts/password/reset`,
  VALIDATE_RESET_TOKEN: (uidb64: string, token: string) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,
  RESET_NEW_PASSWORD: (uidb64: string, token: string) => `${endpointInitial}/accounts/password/reset/${uidb64}/${token}`,

  //user
  USER_PROFILE: `${endpointInitial}/accounts/user/profile`,

  // categories
  GET_POST_CATEGORIES: `${endpointInitial}/categories`,
  SINGLE_CATEGORY: (id: string | number) => `${endpointInitial}/categories/${id}`,

  //links
  GET_POST_LINKS: `${endpointInitial}/links`,
  SINGLE_LINK: (id: number | string) => `${endpointInitial}/links/${id}`,

  //tags
  GET_POST_TAGS: `${endpointInitial}/tags`,
  SINGLE_TAG: (id: number | string) => `${endpointInitial}/tags/${id}`,

  //images from yahoo
  GET_IMAGES: (query: string) => `${imageScrapperHost}api/images/yahoo/${query}`,

  // category invitations
  GET_INVITATIONS: `${endpointInitial}/category_invitations/`,
  SEND_INVITATION: `${endpointInitial}/category_invitations/`,
  GET_SENT_INVITATIONS: `${endpointInitial}/category_invitations/sent_invitations/`,
  DELETE_SENT_INVITATION: (invitationId: number | string) => `${endpointInitial}/category_invitations/${invitationId}/`,
  ACCEPT_RECEIVED_INVITATION: (invitationId: number | string) => `${endpointInitial}/category_invitations/${invitationId}/accept/`,
  REJECT_RECEIVED_INVITATION: (invitationId: number | string) => `${endpointInitial}/category_invitations/${invitationId}/reject/`,

} as const


export default endpoints