import { Formik, Form } from 'formik'
import React, { useState } from 'react'
import { InputField, TextAreaField } from '../formComponents/Input'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { postCategoryAsync } from '../../slices/categoriesSlice'


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category Name is required'),
  description: Yup.string()
})

function CreateCategoryModal({ show, onClose, }) {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  return (
    <Modal
      show={show}
      onCancel={onClose}
      headline="Create Category"
      onSubmit={() => null}
    >

      <Formik
        initialValues={{
          name: '',
          description: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values)
          setIsLoading(true)
          await dispatch(postCategoryAsync(values))
          setIsLoading(false)
          onClose()
        }}
        validateOnChange
      >

        <Form>

          <InputField
            label="name"
            name="name"
            type="text"
            labelClassName="block mb-2 w-full"
            className="block w-full text-sm"
            placeholder="Category Name"
          />

          <TextAreaField
            label="description"
            name="description"
            labelClassName="block"
            className="w-full resize-none"
            labelSpanClassName=""
            placeholder="Brief description about the URL..."
            rows="4"
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

export default CreateCategoryModal
