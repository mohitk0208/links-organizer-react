export interface CategoryType {
  id: number,
  name: string,
  description: string,
  background_url: string,
  owner: number,
  owner_avatar: string,
  owner_username: string,
  parent_category: string | null,
  created_at: string,
  updated_at: string
}

export interface categoriesSliceType {
  loading: boolean,
  totalCount: number,
  value: Array<CategoryType>
}


export interface postCategoryAsyncData {
  name: string,
  description: string,
  background_url: string,
}