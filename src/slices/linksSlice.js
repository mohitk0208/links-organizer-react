import { createSlice } from "@reduxjs/toolkit"
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const linksSlice = createSlice({
  name: 'links',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setLinks: (state, action) => {
      state.value = action.payload
    },

    addToLinks: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    logoutResetLinks: (state, action) => {
      state.loading = false
      state.totalCount = 0
      state.value = []
    }

  }
})

export const { setLoading, addToLinks, logoutResetMyIdeas, setLinks, setTotalCount } = linksSlice.actions

export const getLinksAsync = (category) => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${10}`)
  if (category) queryParams.push(`category=${category}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_LINKS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setLinks(resData?.results))
      dispatch(setTotalCount(resData?.count))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch Links",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const getNextLinksAsync = (category) => async (dispatch, getState) => {

  const { value, totalCount } = getState().categories

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${10}`)
  if (category) queryParams.push(`category=${category}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_LINKS}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addToLinks(resData?.results))

    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch links",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectLinks = state => state.links.value
export const selectLoading = state => state.links.loading

export default linksSlice.reducer