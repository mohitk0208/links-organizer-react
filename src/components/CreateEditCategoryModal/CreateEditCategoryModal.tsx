import React from "react"
import { Formik, Form } from 'formik'
import { useState } from 'react'
import { InputField, TextAreaField } from '../formComponents/Input'
import Button from '../utilComponents/Button'
import Modal from "../utilComponents/Modal"
import * as Yup from 'yup'
import { postCategoryAsync, updateCategoryAsync } from '../../slices/categoriesSlice'
import SearchImageModal from '../SearchImageModal'
import { CategoryType } from "../../types/categoriesSliceTypes"
import { useAppDispatch } from "../../app/store"


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category Name is required'),
  description: Yup.string(),
  background_url: Yup.string().url('Invalid URL')
})

interface InitialValuesType {
  name: string,
  description: string,
  background_url: string
}

interface CreateEditCategoryModalProps {
  show: boolean,
  onClose: () => void,
  isEdit: boolean,
  category?: CategoryType
  onSubmit?: (values: InitialValuesType) => void
}

function CreateEditCategoryModal({ show, onClose, isEdit, category, onSubmit }: CreateEditCategoryModalProps) {

  const [isLoading, setIsLoading] = useState(false)
  const [isSearchImageModalOpen, setIsSearchImageModalOpen] = useState(false)
  const dispatch = useAppDispatch()

  const initialValues: InitialValuesType = {
    name: category?.name ? category.name : "",
    description: category?.description ? category.description : '',
    background_url: category?.background_url ? category.background_url : ''
  }

  return (
    <Modal
      show={show}
      onCancel={onClose}
      headline={isEdit ? 'Edit Category' : 'Create Category'}
      onSubmit={() => null}
      size="xl"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setIsLoading(true)

          if (onSubmit !== undefined) {
            await onSubmit(values)
          }
          else {
            if (isEdit && category) {
              await dispatch(updateCategoryAsync(category.id, values))
            } else {
              await dispatch(postCategoryAsync(values))
            }
          }

          setIsLoading(false)
          onClose()
        }}
        validateOnChange
      >
        {({ setFieldValue }) => (
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
              rows={4}
            />

            <div className='flex items-center gap-1 ' >
              <InputField
                label="background URL"
                name="background_url"
                type="text"
                labelClassName="block mb-2 w-full"
                className="block w-full text-sm"
                placeholder="https://picsum.photos/400"
              />
              <p className='mb-2' >OR</p>
              <Button variant='secondary' type="button" className="block mb-2" onClick={() => setIsSearchImageModalOpen(true)} >
                Search
              </Button>
            </div>




            <div className="flex justify-end items-center gap-3" >
              <Button variant="outline-danger" type="button" onClick={onClose} >
                Cancel
              </Button>
              <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading} >
                {isEdit ? 'Update' : 'Create'}
              </Button>
            </div>

            <SearchImageModal isOpen={isSearchImageModalOpen} onClose={() => setIsSearchImageModalOpen(false)} onSubmit={(url) => {
              setFieldValue('background_url', url)
            }} />
          </Form>
        )}



      </Formik>


    </Modal >

  )
}

export default CreateEditCategoryModal
