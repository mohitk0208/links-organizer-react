import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../app/store";
import { CategoryType } from "../types/categoriesSliceTypes";
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
      state.created_at = action.payload.created_at
      state.updated_at = action.payload.updated_at
    }
  }
})


const { setLoading, setCategoryValues } = categorySlice.actions


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