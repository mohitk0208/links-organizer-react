import { lazy, Suspense } from "react";
import { SelectCategoryProps } from ".";
import SuspenseFallback from "../../SuspenseFallback";
const AddLinkSelectCategory = lazy(() => import("./AddLinkSelectCategory"));
const EditLinkSelectCategory = lazy(() => import("./EditLinkSelectCategory"));

function SelectCategory(props: SelectCategoryProps) {


  return (
    <Suspense fallback={<SuspenseFallback />} >
      {props.initiallySelected ? (
        <EditLinkSelectCategory {...props} />
      ) : (
        <AddLinkSelectCategory {...props} />
      )}

    </Suspense>
  )
}

export default SelectCategory