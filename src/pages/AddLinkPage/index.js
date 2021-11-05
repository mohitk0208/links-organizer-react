import React, { useState } from 'react'
import ContentContainer from '../../components/utilComponents/ContentContainer'
import NewsContainer from '../../components/utilComponents/NewsContainer'
import { Form, Formik } from 'formik'
import { InputField, TextAreaField } from '../../components/formComponents/Input'
import * as Yup from 'yup'
import SelectCategory from './SelectCategory'
import Button from '../../components/utilComponents/Button'

const validationSchema = Yup.object().shape({
  url: Yup.string().url("The string must be a URL.").required("URL is required.").max(200, "URL must be less than 200 characters."),
  description: Yup.string().max(300, "Description must be less than 300 characters."),
})

function AddLinkPage() {

  const [category, setCategory] = useState(null)

  const initialState = {
    url: '',
    description: '',
  }

  return (
    <div className="flex divide-x divide-gray-50/40  overflow-hidden pt-2" >
      <ContentContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white min-h-screen ">

        <h1 className="px-2 text-xl font-bold mt-2 mb-4 pb-2 border-b " > Add Link </h1>

        <Formik
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values)
          }}
          validateOnChange

        >
          <Form >

            <InputField label="url" name="url" labelClassName="block mb-3" className="w-full mt-1 p-2 text-sm" placeholder="Enter URL" />

            <TextAreaField label="description" name="description" labelClassName="block" className="w-full resize-none" labelSpanClassName="" placeholder="Brief description about the URL..." rows="4" />

            <h2>Tags</h2>
            {/* TODO make component to attach tags to the link */}


            <p className="text-xs text-gray-400">  Attach tags, they help us search better.</p>

            <div className="flex space-x-2 mt-4 justify-end" >
              <Button variant="outline-danger" type="reset" >Reset</Button>
              <Button variant="secondary" type="submit" >Add </Button>
            </div>

          </Form>
        </Formik>

      </ContentContainer>


      <NewsContainer className="flex flex-col overflow-y-auto keep-scrolling py-5 mx-2 bg-white min-h-screen " >
        <h1 className="px-2 text-lg font-bold mt-2 mb-4 pb-2 border-b " > Select Category </h1>

        <SelectCategory selectedCategory={category} setSelectedCategory={setCategory} />
      </NewsContainer>
    </div>
  )
}

export default AddLinkPage
