import { createSlice } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../app/store";
import { setUserStateAction, updateUserAsyncData, userSliceType } from "../types/useSliceTypes";
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState: userSliceType = {
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
    setUserState: (state, action: setUserStateAction) => {
      const { id, username, email, first_name, last_name, avatar } = action.payload;

      state.id = id
      state.username = username
      state.email = email
      state.firstName = first_name
      state.lastName = last_name
      state.avatar = avatar
    },

    setIsEditMode: (state, action: { payload: boolean, type: string }) => {
      state.isEditMode = action.payload;
    },

    setLoading: (state, action: { payload: boolean, type: string }) => {
      state.loading = action.payload
    },

    logoutResetUser: (state) => {
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



export const { setUserState, setLoading, setIsEditMode, logoutResetUser } = userSlice.actions




export const getUserAsync = (): AppThunk => async (dispatch) => {

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


export const updateUserAsync = (profile: updateUserAsyncData): AppThunk => async dispatch => {

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


export const selectIsEditMode = (state: RootState) => state.user.isEditMode
export const selectLoading = (state: RootState) => state.user.loading
export const selectUserId = (state: RootState) => state.user.id
export const selectUserName = (state: RootState) => state.user.username
export const selectFirstName = (state: RootState) => state.user.firstName
export const selectLastName = (state: RootState) => state.user.lastName
export const selectFullName = (state: RootState) => `${state.user.firstName} ${state.user.lastName}`
export const selectEmail = (state: RootState) => state.user.email
export const selectAvatar = (state: RootState) => state.user.avatar
export const selectUser = (state: RootState) => {
  const { loading, ...u } = state.user

  return u
}


export default userSlice.reducer