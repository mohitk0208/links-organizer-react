import React, { lazy, Suspense, useEffect, useState } from 'react'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { Form, Formik } from 'formik'
import { InputField, TextAreaField } from '../../components/formComponents/Input'
import * as Yup from 'yup'
import SelectCategory from '../../components/LinkAddEditComponents/SelectCategory'
import Button from '../../components/utilComponents/Button'
import { postLinkAsync, selectLoading } from '../../slices/linksSlice'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import SelectCreateTags, { SelectCreateOptionType } from '../../components/SelectCreateTags'
import SuspenseFallback from '../../components/SuspenseFallback'

const CreateEditCategoryModal = lazy(() => import('../../components/CreateEditCategoryModal'))

const validationSchema = Yup.object().shape({
  url: Yup.string().url("The string must be a URL.").required("URL is required.").max(200, "URL must be less than 200 characters."),
  description: Yup.string().max(300, "Description must be less than 300 characters."),
})

interface initialStateType {
  url: string,
  description: string,
}


function AddLinkPage() {

  const [category, setCategory] = useState<number | null>(null)
  const [categoryError, setCategoryError] = useState("")
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false)
  const [tags, setTags] = useState<SelectCreateOptionType[]>([])

  const isLoading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    setCategoryError("")
  }, [category])


  const initialState: initialStateType = {
    url: '',
    description: '',
  }

  console.log(tags)

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white min-h-screen ">

        <h1 className="px-2 text-xl font-bold mt-2 mb-4 pb-2 border-b " > Add Link </h1>

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            if (!category) {
              setCategoryError("Category is required.")
              return
            }
            const data = {
              ...values,
              category: category,
              tags: tags.map(o => o.value.id)
            }
            console.log(data)
            const isSuccess = await dispatch(postLinkAsync(data)) as unknown as boolean
            if (isSuccess) {
              navigate(routes.HOME)
            }


          }}
          onReset={() => {
            setCategoryError("")
            setCategory(null)
          }}

          validateOnChange
        >
          <Form >

            <InputField label="url" name="url" labelClassName="block mb-3" className="w-full mt-1 p-2 text-sm" placeholder="Enter URL" />

            <TextAreaField label="description" name="description" labelClassName="block" className="w-full resize-none" labelSpanClassName="" placeholder="Brief description about the URL..." rows={4} />

            {/* <SelectTags tags={tags} setTags={setTags} /> */}
            <SelectCreateTags tags={tags} onChange={(newValue) => setTags(newValue)} setTags={setTags} />


            <p className="text-xs text-gray-400">  Attach tags, they help us search better.</p>

            <div className="flex space-x-2 mt-4 justify-end" >
              <Button variant="outline-danger" type="reset" >Reset</Button>
              <Button variant="secondary" type="submit" loading={isLoading} disabled={isLoading} >Add </Button>
            </div>

          </Form>
        </Formik>

      </ContentContainer>


      <NewsContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mr-2 bg-white min-h-screen " >
        <div className="flex justify-between mt-2 mb-4 pb-2 px-2 border-b">
          <h1 className="text-lg font-bold " > Select Category </h1>
          <Button variant="outline-primary" type="button" onClick={() => setIsCreateCategoryModalOpen(true)}  >Create</Button>
        </div>

        <SelectCategory selectedCategory={category} onChange={(newCategoryId) => setCategory(newCategoryId)} error={categoryError} />
      </NewsContainer>

      <Suspense fallback={<SuspenseFallback />}>

        <CreateEditCategoryModal
          show={isCreateCategoryModalOpen}
          onClose={() => setIsCreateCategoryModalOpen(false)}
          isEdit={false}
        />
      </Suspense>

    </div>
  )
}

export default AddLinkPage
