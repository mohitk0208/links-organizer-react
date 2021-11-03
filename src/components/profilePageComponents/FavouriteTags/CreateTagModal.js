import React, { useState } from 'react'
import Modal from "../../utilComponents/Modal"
import Button from '../../utilComponents/Button'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField, TextAreaField } from '../../formComponents/Input'
import { fetchWrapper } from '../../../utils/fetchWrapper'
import endpoints from '../../../utils/endpoints'

const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .required("name is required")
    .min(1)
    .max(50)
    .matches(/^[a-z0-9-]+$/, "should contain lowercase alphabets, numbers and hyphens")
    .matches(/^[^-]/, "should not start or end with - ")
    .matches(/[^-]$/, "should not end with - "),
  description: Yup.string().max(300)
})



function CreateTagModal({ show, onClose }) {

  const [loading,setLoading] = useState(false)

  const handleSubmit = async (values) => {

    setLoading(true)

    try {
      const res = await fetchWrapper.post(endpoints.FAVOURITE_TAGS, values, true)

      const resData = await res.json()

      if (res.ok) {
        console.log("tag created successfully")
        console.log(resData);
      }

      onClose()

    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false)
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
          name: "",
          description: ""
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
            className="block w-full"
            placeholder="Enter Name" s
          />

          <TextAreaField
            label="description"
            name="description"
            labelClassName="block w-full"
            className="block w-full"
            rows={4}
            placeholder="Enter description ..."

          />
          <div className="flex justify-end items-center gap-3">
            <Button variant="outline-danger" type="button" onClick={onClose} >Cancel</Button>
            <Button type="submit" disabled={loading} loading={loading}  >Create</Button>
          </div>


        </Form>

      </Formik>

    </Modal>
  )
}

export default CreateTagModal
