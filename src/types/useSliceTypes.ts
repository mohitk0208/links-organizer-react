export interface userSliceType {
  isEditMode: boolean,
  loading: boolean,
  id: number | null,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  avatar: string,
}

export interface setUserStateAction {
  payload: {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
  },
  type: string
}


export interface updateUserAsyncData {
  first_name: string,
  last_name: string,
  email: string,
  avatar: string
}