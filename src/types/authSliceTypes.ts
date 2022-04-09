export interface authSliceType {
  isLoggedIn: boolean,
  loading: boolean,
  errors: {
    loginError: string,
    signupError: string
  }
}

export interface loginAsyncData {
  username: string,
  password: string
}

export interface signupAsyncData {
  first_name: string,
  last_name: string,
  email: string,
  username: string,
  password: string
}