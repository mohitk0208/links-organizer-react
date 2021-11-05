import React from 'react'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"

function DeleteConfirmModal({ show, text, onClose, onDelete, loading }) {
  return (
    <Modal
      show={show}
      headline="Delete Confirmation"
      onCancel={onClose}
      className="py-2 "
    >
      <p className="p-2 my-1">
        {text}
      </p>

      <div className="flex justify-end gap-2" >
        <Button variant="outline-danger" type="button" onClick={onClose} >
          Cancel
        </Button>
        <Button variant="danger" type="button" onClick={onDelete} loading={loading} disabled={loading} >
          Confirm
        </Button>
      </div>

    </Modal>
  )
}

export default DeleteConfirmModal
