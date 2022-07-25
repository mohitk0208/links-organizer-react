export interface CategoryInvitationType {
  id: number,
  category: number,
  category_name: string,
  category_description: string,
  sender: number,
  sender_username: string,
  receiver: number,
  receiver_username: string,
  is_accepted: boolean,
  created_at: string,
  updated_at: string
}

export interface invitationsSliceType {
  loading: boolean,
  totalCount: number,
  value: Array<CategoryInvitationType>
}

