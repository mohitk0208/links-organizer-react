import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { CategoryType, postCategoryAsyncData } from "../types/categoriesSliceTypes";
import { CategorySliceType } from "../types/categorySliceTypes";
import endpoints from "../utils/endpoints";
import { fetchWrapper } from "../utils/fetchWrapper";
import { manageLoginAsync } from "./authSlice";
import { enqueueNotification } from "./globalNotificationSlice";

const initialState: CategorySliceType = {
  loading: false,
  id: -1,
  name: "",
  description: "",
  background_url: "",
  owner: -1,
  owner_avatar: "",
  owner_username: "",
  parent_category: null,
  created_at: "",
  updated_at: ""
}


const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },

    setCategoryValues: (state, action: PayloadAction<CategoryType>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.description = action.payload.description
      state.background_url = action.payload.background_url
      state.owner = action.payload.owner
      state.owner_avatar = action.payload.owner_avatar
      state.owner_username = action.payload.owner_username
      state.parent_category = action.payload.parent_category
      state.created_at = action.payload.created_at
      state.updated_at = action.payload.updated_at
    },

    updateCategory: (state, action: PayloadAction<CategoryType>) => {
      state.name = action.payload.name
      state.description = action.payload.description
      state.background_url = action.payload.background_url
      state.updated_at = action.payload.updated_at
    }

  }
})


const { setLoading, setCategoryValues, updateCategory } = categorySlice.actions


export const getSingleCategoryAsync = (id: number): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true))
  try {

    await dispatch(manageLoginAsync())
    const res = await fetchWrapper.get(`${endpoints.SINGLE_CATEGORY(id)}`, true)

    if (res.ok) {
      const resData = await res.json()
      dispatch(setCategoryValues(resData))
    }



  }
  catch (err) {
    console.log(err)
    dispatch(enqueueNotification({
      msg: "Could not fetch Category Details.",
      type: "error",
      duration: 3000
    }))
  }
  finally {
    dispatch(setLoading(false))
  }

}


export const updateCategoryAsync = (id: number, data: postCategoryAsyncData): AppThunk => async dispatch => {

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



export const selectLoading = (state: RootState) => state.category.loading
export const selectCategory = (state: RootState) => {
  const { id, name, description, background_url, created_at, updated_at } = state.category

  return {
    id,
    name,
    description,
    background_url,
    created_at,
    updated_at
  }

}

export default categorySlice.reducer