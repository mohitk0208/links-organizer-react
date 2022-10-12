import { lazy, Suspense } from "react";
import { SelectCategoryProps } from ".";
const AddLinkSelectCategory = lazy(() => import("./AddLinkSelectCategory"));
const EditLinkSelectCategory = lazy(() => import("./EditLinkSelectCategory"));

function SelectCategory(props: SelectCategoryProps) {


  return (
    <Suspense fallback={<div>Loading...</div>} >
      {props.initiallySelected ? (
        <EditLinkSelectCategory {...props} />
      ) : (
        <AddLinkSelectCategory {...props} />
      )}

    </Suspense>
  )
}

export default SelectCategory