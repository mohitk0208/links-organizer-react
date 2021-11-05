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

    addNewCategory: (state, action) => {
      state.value = [action.payload, ...state.value]
      state.totalCount += 1
    },

    removeCategory: (state, action) => {
      state.value = state.value.filter(category => category.id !== action.payload)
      state.totalCount -= 1
    },

    updateCategory: (state, action) => {

      state.value = state.value.map(category => {
        if (category.id === action.payload.id) {
          return action.payload
        }
        return category
      })

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

export const { setLoading, addToCategories, logoutResetCategories, setCategories, setTotalCount, addNewCategory, removeCategory, updateCategory } = categoriesSlice.actions

export const getCategoriesAsync = (query = "", parentCategory = null) => async (dispatch, getState) => {

  const queryParams = []
  queryParams.push(`offset=${0}`)
  queryParams.push('ordering=-updated_at')
  queryParams.push(`limit=${10}`)
  queryParams.push(`parent_category=${parentCategory}`)
  if (query) queryParams.push(`search=${query}`)

  await dispatch(logoutResetCategories())

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

export const getNextCategoriesAsync = (query = "", parentCategory = null) => async (dispatch, getState) => {

  const { value, totalCount } = getState().categories

  if (value.length === totalCount) return

  const queryParams = []
  queryParams.push(`offset=${value.length}`)
  queryParams.push('ordering=-updated_at')
  queryParams.push(`limit=${10}`)
  queryParams.push(`parent_category=${parentCategory}`)
  if (query) queryParams.push(`search=${query}`)

  await dispatch(logoutResetCategories())

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

export const postCategoryAsync = (data) => async dispatch => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.post(`${endpoints.GET_POST_CATEGORIES}`, data, true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(addNewCategory(resData))

    }
  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Could not create category",
      type: "error",
      duration: 3000
    }))
  }


}

export const deleteCategoryAsync = (id) => async dispatch => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper._delete(`${endpoints.SINGLE_CATEGORY(id)}`, true)

    if (res.ok) {
      dispatch(removeCategory(id))
      dispatch(enqueueNotification({
        msg: "Category deleted",
        type: "success",
        duration: 3000
      }))
    }
  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Could not delete category",
      type: "error",
      duration: 3000
    }))
  }

}

export const updateCategoryAsync = (id, data) => async dispatch => {

  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.put(`${endpoints.SINGLE_CATEGORY(id)}`, data, true)

    const resData = await res.json()

    if (res.ok) {
      dispatch(updateCategory(resData))
      dispatch(enqueueNotification({
        msg: "Category updated",
        type: "success",
        duration: 3000
      }))
    }
  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Could not update category",
      type: "error",
      duration: 3000
    }))
  }

}

export const selectCategories = state => state.categories.value
export const selectLoading = state => state.categories.loading

export default categoriesSlice.reducer