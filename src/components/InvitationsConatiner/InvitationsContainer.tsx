import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/store"
import { getCategoryInvitationsAsync, selectCategoryInvitations, selectLoading } from "../../slices/invitationsSlice"
import InvitationCard from "./InvitationCard"

const InvitationsContainer = () => {
  const categoryInvitations = useAppSelector(selectCategoryInvitations)
  const isLoading = useAppSelector(selectLoading)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategoryInvitationsAsync())
  }, [dispatch])


  return (
    <div className="" >
      {categoryInvitations.map(invitation => {
        return (
          <InvitationCard key={invitation.id} invitation={invitation} />
        )
      })}
    </div>
  )

}

export default InvitationsContainer