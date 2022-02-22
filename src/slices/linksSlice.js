import { createSlice } from "@reduxjs/toolkit"
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  totalCount: 0,
  value: [],
  currentLink: {}
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

    addNewLink: (state, action) => {
      state.value = [action.payload, ...state.value]
      state.totalCount += 1
    },

    removeLink: (state, action) => {
      state.value = state.value.filter(link => link.id !== action.payload)
      state.totalCount -= 1
    },

    setCurrentLink: (state, action) => {
      state.currentLink = action.payload
    },

    updateLink: (state, action) => {
      state.value = state.value.map(link => {
        if (link.id === action.payload.id) {
          return action.payload
        }
        return link
      })

      if (state.currentLink && state.currentLink.id === action.payload.id) {
        state.currentLink = action.payload
      }
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

export const {
  setLoading,
  addToLinks,
  logoutResetLinks,
  setLinks,
  setTotalCount,
  addNewLink,
  removeLink,
  setCurrentLink,
  updateLink
} = linksSlice.actions

export const getLinksAsync = (searchQuery, category) => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push('ordering=-updated_at')
  queryParams.push(`limit=${10}`)
  if (category) queryParams.push(`category=${category}`)
  if(searchQuery) queryParams.push(`search=${searchQuery}`)

  await dispatch(logoutResetLinks())

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

  const { value, totalCount } = getState().links

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push('ordering=-updated_at')
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

export const postLinkAsync = (data) => async (dispatch, getState) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(endpoints.GET_POST_LINKS, data, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addNewLink(resData))
      dispatch(enqueueNotification({
        msg: "Link added successfully",
        type: "success",
        duration: 3000
      }))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to add link",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}

export const deleteLinkAsync = (id) => async (dispatch, getState) => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(`${endpoints.SINGLE_LINK(id)}`, true)

    if (res.ok) {
      dispatch(removeLink(id))
      dispatch(enqueueNotification({
        msg: "Link deleted successfully",
        type: "success",
        duration: 3000
      }))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to delete link",
      type: "error",
      duration: 3000
    }))
  }
}

export const getSingleLinkAsync = (id) => async (dispatch, getState) => {

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.SINGLE_LINK(id)}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setCurrentLink(resData))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch link",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}

export const updateSingleLinkAsync = (id, data) => async (dispatch, getState) => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.put(`${endpoints.SINGLE_LINK(id)}`, data, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(updateLink(resData))
      dispatch(enqueueNotification({
        msg: "Link updated successfully",
        type: "success",
        duration: 3000
      }))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to update link",
      type: "error",
      duration: 3000
    }))
  }
}

export const selectLinks = state => state.links.value
export const selectLoading = state => state.links.loading
export const selectCurrentLink = state => state.links.currentLink

export default linksSlice.reducer