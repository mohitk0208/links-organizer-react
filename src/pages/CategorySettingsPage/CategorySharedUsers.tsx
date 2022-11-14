import React, { useState } from "react"
import SendCategoryInvitationModal from "../../components/SendCategoryInvitationModal"
import Button from "../../components/utilComponents/Button"
import { CategoryType } from "../../types/categoriesSliceTypes"


type CategorySharedUsersProps = {
  category: CategoryType
}



export default function CategorySharedUsers({ category }: CategorySharedUsersProps) {

  const [isSendInvitationModalOpen, setIsSendInvitationModalOpen] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mt-2 mb-4 pb-2 border-b px-2" >
        <h1 className="text-xl font-bold  " > Shared Users </h1>
        <Button variant="outline-primary" className="" onClick={() => setIsSendInvitationModalOpen(true)} >Add User </Button>
      </div>
      <div className="grid grid-cols-2 px-2"  >

        <p className="font-bold text-lg">
          User
        </p>
        <p className="font-bold text-lg">
          Permission
        </p>

        <p className="flex items-center gap-1">
          <img src={category.owner_avatar} className="w-8 rounded-full" alt="" />
          <span>
            {category.owner_username}
          </span>
        </p>
        <p>some permission</p>
      </div>

      <SendCategoryInvitationModal
        categoryId={category.id}
        isOpen={isSendInvitationModalOpen}
        onClose={() => setIsSendInvitationModalOpen(false)} />
    </>

  )
}