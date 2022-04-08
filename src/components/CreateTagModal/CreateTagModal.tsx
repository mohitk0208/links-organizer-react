import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField, TextAreaField } from '../formComponents/Input'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"
import * as Yup from 'yup'
import { fetchWrapper } from '../../utils/fetchWrapper'
import endpoints from '../../utils/endpoints'
import { useDispatch } from 'react-redux'
import { enqueueNotification } from '../../slices/globalNotificationSlice'

interface initialValueType {
  name: string,
  description: string
}

const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("name is required")
    .min(1)
    .max(50)
    .matches(/^[a-z0-9-]+$/, "should contain lowercase alphabets, numbers and hyphens")
    .matches(/^[^-]/, "should not start or end with - ")
    .matches(/[^-]$/, "should not end with - "),
  description: Yup.string()
})


interface CreateTagModalProps {
  show: boolean,
  onClose: () => void,
}

function CreateTagModal({ show, onClose }: CreateTagModalProps) {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (values: initialValueType) => {

    setIsLoading(true)

    try {

      const res = await fetchWrapper.post(endpoints.GET_POST_TAGS, values, true)
      // const resData = await res.json()

      if (res.ok) {
        await dispatch(enqueueNotification({
          msg: "Tag Created Successfully.",
          type: "success",
          duration: 3000
        }))
        onClose()
        return
      }

      dispatch(enqueueNotification({
        msg: "Tag Creation Failed",
        type: "error",
        duration: 3000
      }))

    } catch (err) {
      console.log(err)
      dispatch(enqueueNotification({
        msg: "Tag Creation Failed",
        type: "error",
        duration: 3000
      }))
    }
    finally {
      setIsLoading(false)
    }

  }


  return (
    <Modal
      show={show}
      onCancel={onClose}
      headline="Create Tag"
      onSubmit={() => null}
    >

      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange
      >

        <Form>

          <InputField
            label="name"
            name="name"
            type="text"
            labelClassName="block mb-2 w-full"
            className="block w-full text-sm"
            placeholder="Tag Name"
          />

          <TextAreaField
            label="description"
            name="description"
            labelClassName="block"
            className="w-full resize-none"
            labelSpanClassName=""
            placeholder="Brief description about the Tag..."
            rows={4}
          />



          <div className="flex justify-end items-center gap-3" >
            <Button variant="outline-danger" type="button" onClick={onClose} >
              Cancel
            </Button>
            <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading} >
              Create
            </Button>
          </div>

        </Form>

      </Formik>

    </Modal>
  )
}

export default CreateTagModal
