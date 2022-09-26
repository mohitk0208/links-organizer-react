import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { CategoryInvitationType, invitationsSliceType } from "../types/invitationsSliceTypes";
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState: invitationsSliceType = {
  loading: false,
  totalCount: 0,
  value: []
}


const categoryInvitations = createSlice({
  name: "categoryInvitations",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setCategoryInvitations: (state, action: PayloadAction<CategoryInvitationType[]>) => {
      state.value = action.payload
    },
    acceptCategoryInvitation: (state, action: PayloadAction<number>) => {

      state.value = state.value.map(invitation => {
        if (invitation.id === action.payload) {
          return { ...invitation, is_accepted: true }
        }
        return invitation
      })
    },
    rejectCategoryInvitation: (state, action: PayloadAction<number>) => {
      state.value = state.value.map(invitation => {
        if (invitation.id === action.payload) {
          return { ...invitation, is_accepted: false }
        }
        return invitation
      })
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    logoutResetCategoryInvitations: (state) => {
      state.loading = false
      state.totalCount = 0
      state.value = []
    }

  }
})


export const { setLoading, setCategoryInvitations, logoutResetCategoryInvitations, setTotalCount, acceptCategoryInvitation
  , rejectCategoryInvitation } = categoryInvitations.actions

export const getCategoryInvitationsAsync = (): AppThunk => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`ordering=${0}`)
  queryParams.push('ordering=-updated_at')
  queryParams.push(`limit=${15}`)

  await dispatch(logoutResetCategoryInvitations())

  dispatch(setLoading(true))
  try {
    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_INVITATIONS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setCategoryInvitations(resData?.results))
      dispatch(setTotalCount(resData?.count))
    }
  }
  catch (err) {
    dispatch(enqueueNotification({
      msg: " Failed to fetch Category Invitations",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}



export const acceptCategoryInvitationAsync = (categoryInvitationId: number): AppThunk => async (dispatch, getState) => {

  try {
    await dispatch(manageLoginAsync())

    const res = await fetchWrapper.post(endpoints.ACCEPT_RECEIVED_INVITATION(categoryInvitationId), {}, true)


    if (res.ok) {
      dispatch(acceptCategoryInvitation(categoryInvitationId))
    }

  } catch (err) {
    dispatch(enqueueNotification({
      msg: "Responding to invitation Failed ",
      type: "error",
      duration: 2000
    }))
  }
}



export const rejectCategoryInvitationAsync = (categoryInvitationId: number): AppThunk => async (dispatch, getState) => {

  try {
    await dispatch(manageLoginAsync())

    const res = await fetchWrapper.post(endpoints.REJECT_RECEIVED_INVITATION(categoryInvitationId), {}, true)


    if (res.ok) {
      dispatch(rejectCategoryInvitation(categoryInvitationId))
    }

  } catch (err) {
    dispatch(enqueueNotification({
      msg: "Responding to invitation Failed ",
      type: "error",
      duration: 2000
    }))
  }
}




export const selectCategoryInvitations = (state: RootState) => state.categoryInvitations.value
export const selectLoading = (state: RootState) => state.categoryInvitations.loading

export default categoryInvitations.reducer