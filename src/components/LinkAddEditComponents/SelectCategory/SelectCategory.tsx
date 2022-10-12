import { SelectCategoryProps } from ".";
import AddLinkSelectCategory from "./AddLinkSelectCategory";
import EditLinkSelectCategory from "./EditLinkSelectCategory.";

function SelectCategory(props: SelectCategoryProps) {
  if (props.initiallySelected) {
    return <EditLinkSelectCategory {...props} />
  }

  return <AddLinkSelectCategory {...props} />
}

export default SelectCategory