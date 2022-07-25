import React from "react"
import { CategoryInvitationType } from "../../types/invitationsSliceTypes"
import Button from "../utilComponents/Button"

interface InvitationCardProps {
  invitation: CategoryInvitationType
}

const InvitationCard = ({ invitation }: InvitationCardProps) => {

  const { id, sender_username, is_accepted, category_name } = invitation


  function acceptInvitationHandler() {

  }

  function rejectInvitationHanlder() {

  }


  return (
    <div className={
      `${is_accepted !== null ? "opacity-60" : "bg-white shadow-md"} ${is_accepted === true && " bg-success-green-200/50"}
       ${is_accepted === false && "bg-red-200/50"} mt-1 border p-2 rounded-md mb-2`}>
      <p className="mb-2">
        <span className="font-bold" >
          {sender_username}
        </span>
        {" invited you to join the category "}
        <span className="font-bold" >
          {category_name}
        </span>
      </p>

      <div className="flex gap-2 px-2 py-1 " >
        {is_accepted === null ? (
          <>
            <Button className="">
              Accept
            </Button>
            <Button variant="danger">
              Reject
            </Button>
          </>
        ) : (
          <>
            <p className={`font-bold `} >
              {is_accepted ? "Accepted" : "Rejected"}
            </p>
          </>
        )}

      </div>
    </div>
  )
}

export default InvitationCard