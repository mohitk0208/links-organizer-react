import { createSlice } from "@reduxjs/toolkit"
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { getTokenDetails } from "../utils/functions";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState = {
  loading: false,
  totalCount: 0,
  value: []
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setCategories: (state, action) => {
      state.value = action.payload
    },

    addToCategories: (state, action) => {
      state.value = [...state.value, ...action.payload]
    },

    setTotalCount: (state, action) => {
      state.totalCount = action.payload
    },

    logoutResetCategories: (state, action) => {
      state.loading = false
      state.totalCount = 0
      state.value = []
    }

  }
})

export const { setLoading, addToCategories, logoutResetMyIdeas, setCategories,setTotalCount } = categoriesSlice.actions

export const getCategoriesAsync = (parentCategory=null) => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${10}`)
  queryParams.push(`parent_category=${parentCategory}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_CATEGORIES}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(setCategories(resData?.results))
      dispatch(setTotalCount(resData?.count))
    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch categories",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}

export const getNextCategoriesAsync = (parentCategory) => async (dispatch,getState) => {

  const {value,totalCount} = getState().categories

  if(value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push('ordering=-created_at')
  queryParams.push(`limit=${10}`)
  queryParams.push(`parent_category=${parentCategory}`)

  dispatch(setLoading(true));

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.GET_POST_CATEGORIES}?${queryParams.join("&")}`, true)

    if (res.ok) {
      const resData = await res.json()

      dispatch(addToCategories(resData?.results))

    }

  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Failed to fetch categories",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }
}


export const selectCategories = state => state.categories.value
export const selectLoading = state => state.categories.loading

export default categoriesSlice.reducer