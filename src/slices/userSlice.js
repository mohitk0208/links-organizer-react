import { createSlice } from "@reduxjs/toolkit"
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  isEditMode: false,
  loading: false,
  id: null,
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: "",
}



export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserState: (state, action) => {
      const { id, username, email, first_name, last_name, avatar } = action.payload;

      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.avatar = avatar
    },

    setIsEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    logoutResetUser: (state, action) => {
      state.isEditMode = false
      state.loading = false
      state.id = null
      state.username = ""
      state.email = ""
      state.firstName = ""
      state.lastName = ""
      state.avatar = ""
    }
  }
})



export const { setUserState, setLoading, setIsEditMode,logoutResetUser } = userSlice.actions




export const getUserAsync = () => async dispatch => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(endpoints.USER_PROFILE, true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(setUserState(resData))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(setLoading(false))
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const updateUserAsync = (profile) => async dispatch => {

  dispatch(setLoading(true))
  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.patch(endpoints.USER_PROFILE, profile, true)
    const resData = await res.json()

    if (res.ok) {
      dispatch(setUserState(resData))
      dispatch(enqueueNotification({
        msg: "Profile updated Successfully",
        type: "success",
        duration: 3000
      }))
    }

  } catch (error) {
    console.log(error)
    dispatch(setLoading(false))
    dispatch(enqueueNotification({
      msg: "Profile update Failed.",
      type: "error",
      duration: 1500
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectIsEditMode = state => state.user.isEditMode
export const selectLoading = state => state.user.loading
export const selectUserId = state => state.user.id
export const selectUserName = state => state.user.username
export const selectFirstName = state => state.user.firstName
export const selectLastName = state => state.user.lastName
export const selectFullName = state => `${state.user.firstName} ${state.user.lastName}`
export const selectEmail = state => state.user.email
export const selectAvatar = state => state.user.avatar
export const selectUser = state => {
  const { loading, ...u } = state.user

  return u
}


export default userSlice.reducer