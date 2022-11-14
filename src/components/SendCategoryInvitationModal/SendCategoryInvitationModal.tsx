import React, { useState } from "react"
import { publicUserType } from "../../types/userSliceTypes"
import AsyncSearchUser from "../utilComponents/AsyncSearchUser"
import Modal from "../utilComponents/Modal"
import Select, { Options } from "react-select"
import { useAppDispatch } from "../../app/store"
import { fetchWrapper } from "../../utils/fetchWrapper"
import endpoints from "../../utils/endpoints"
import { enqueueNotification } from "../../slices/globalNotificationSlice"


type SendCategoryInvitationModalProps = {
  categoryId: string | number,
  isOpen: boolean,
  onClose: () => void
}

type AccessLevelOptionType = {
  label: string,
  value: number
}

const accessLevelOptions: Options<AccessLevelOptionType> = [
  {
    label: "read_only",
    value: 300
  },
  {
    label: "read_write",
    value: 200
  },
  {
    label: "Admin",
    value: 100
  }
]

export default function SendCategoryInvitationModal({ categoryId, isOpen, onClose }: SendCategoryInvitationModalProps) {

  const [receiver, setReceiver] = useState<publicUserType | null>(null)
  const [invitationNote, setInvitationNote] = useState("")
  const [accessLevel, setAccessLevel] = useState(accessLevelOptions[0])

  const dispatch = useAppDispatch()

  const handleSendInvitation = async () => {
    try {

      const res = await fetchWrapper.post(endpoints.GET_POST_SENDER_CATEGORY_INVITATIONS, {
        category: categoryId,
        receiver: receiver?.id,
        note: invitationNote,
        accessLevel
      }, true)

      if (res.ok) {
        dispatch(enqueueNotification({
          msg: "Invitation Sent Successfully.",
          type: "success",
          duration: 3000
        }))
      }
      else {
        const resData = await res.json()

        console.log(resData)

        dispatch(enqueueNotification({
          msg: "Invitation Not Sent",
          type: "error",
          duration: 3000
        }))
      }

    }
    catch (error) {
      console.log(error);

    }
    finally {

    }
  }

  const resetForm = () => {
    setReceiver(null)
    setInvitationNote("")
    setAccessLevel(accessLevelOptions[0])
  }


  return (
    <Modal
      show={isOpen}
      onCancel={() => {
        resetForm()
        onClose()
      }}
      headline="Send Category Invitation"
      onSubmit={handleSendInvitation}
      btn="Send Invitation"
      size="lg"
      className=" overflow-visible"
    >

      <div className="flex flex-col gap-1 pb-3" >
        <p className="">
          Receiver
        </p>
        <AsyncSearchUser selectedUser={receiver} onChange={(newValue) => setReceiver(newValue)} />
      </div>

      <div className="flex flex-col gap-1 pb-3" >
        <p className="">
          Invitation Note
        </p>
        <textarea
          className="rounded-sm outline-none border border-gray-300"
          rows={3}
          value={invitationNote}
          onChange={(e) => setInvitationNote(e.target.value)}
          placeholder="Invitation Note..."
        ></textarea>
      </div>

      <div className="flex flex-col gap-1 pb-3" >
        <p className="">
          Access Level
        </p>
        <Select
          options={accessLevelOptions}
          value={accessLevel}
          onChange={(newLevel) => setAccessLevel(newLevel as AccessLevelOptionType)}
        />
      </div>

    </Modal>
  )
}
