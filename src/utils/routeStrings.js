export const routes = {
  LANDING_PAGE: '/landing-page',
  LOGIN: '/login',
  SIGNUP: '/signup',
  SEND_RESET_TOKEN: "/send-reset-token",
  RESET_PASSWORD: "/reset-password",
  HOME: '/',
  PROFILE: '/profile',
  CATEGORY: (categoryId) => `/category/${categoryId ? categoryId : ":categoryId" }`,
  ALL_LINKS: '/links',
  LINKS_BY_CATEGORY: (categoryId) => `/links/${categoryId ? categoryId : ":categoryId" }`,
  ADD_LINK: '/link/add',
  EDIT_LINK: (linkId) => `/link/${linkId ? linkId : ":linkId" }/edit`,
}