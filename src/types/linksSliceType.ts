import { tag } from "./tag"

export interface LinkType {
  id: number,
  url: string,
  description: string,
  category: number,
  category_background_url: string,
  owner: number,
  owner_username: string,
  owner_avatar: string,
  tags: tag[],
  created_at: string,
  updated_at: string
}

export interface linksSliceType {
  loading: boolean,
  totalCount: number,
  value: LinkType[],
  currentLink: LinkType | null
}

export type link = Omit<LinkType, "tags" | "">

export interface postLinkAsyncData {
  url: string,
  category: number,
  description: string,
  tags: number[]
}