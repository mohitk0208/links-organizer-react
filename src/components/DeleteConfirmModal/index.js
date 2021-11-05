import React from 'react'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"

function DeleteConfirmModal({ show, text, onClose, onDelete }) {
  return (
    <Modal
      show={show}
      onCancel={onClose}
    >
      <p>
        {text}
      </p>

      <div>
        <Button variant="outline-danger" >
          Cancel
        </Button>
        <Button variant="danger" >
          Confirm
        </Button>
      </div>

    </Modal>
  )
}

export default DeleteConfirmModal
