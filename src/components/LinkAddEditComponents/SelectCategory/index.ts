import SelectCategory from "./SelectCategory";


export type AddLinkSelectCategoryProps = {
  initiallySelected?: false
  selectedCategory: number | null,
  onChange: (newCategoryId: number) => void,
  error: string
}

export type EditLinkSelectCategoryProps = {
  initiallySelected: true,
  selectedCategory: number,
  onChange: (newCategoryId: number) => void,
  error: string
}

export type SelectCategoryProps = AddLinkSelectCategoryProps | EditLinkSelectCategoryProps


export default SelectCategory