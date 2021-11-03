import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import { InputField } from "../../components/formComponents/Input"
import Button from "../../components/utilComponents/Button"
import * as Yup from "yup"
import { joinClassNames } from '../../utils/functions'
import { fetchWrapper } from '../../utils/fetchWrapper'
import endpoints from '../../utils/endpoints'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email()
})

function SendResetToken() {

  const [msg, setMsg] = useState("")
  const [isSuccessfullySent, SetIsSuccessfullySent] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gray-100">

      <div className="border rounded-lg p-5 shadow-xl bg-white max-w-sm "  >
        {msg && (
          <p className={joinClassNames(
            "w-full text-center border-2 py-1 px-2 text-sm rounded-xl",
            isSuccessfullySent ? "border-success-400 bg-success-green-500/10 text-success-green-700 " : "border-red-400 bg-red-400/10 text-red-700"
          )} >
            {msg}
          </p>
        )}
        {!isSuccessfullySent && (
          <Formik
            initialValues={{
              email: ""
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              console.log(values)

              setLoading(true)
              try {

                const res = await fetchWrapper.post(endpoints.OBTAIN_RESET_TOKEN, values, false)

                // const resData = await res.json()

                if (res.ok) {
                  setMsg("Password reset link has been sent to your registered email.Please check your inbox for further steps. ")
                  SetIsSuccessfullySent(true)
                  return
                }

                setMsg("Something went wrong, please retry.")



              } catch (err) {
                console.log(err)
              } finally {
                setLoading(false)
              }

            }}
            validateOnChange
          >
            <Form>
              <p className="text-center text-gray-500">
                Enter your registered Email address to get further instructions on how to reset password.
              </p>
              <InputField label="email" name="email" type="email" labelClassName=" block mt-3 mb-1" className="w-full mt-1" placeholder="Enter Registered Email" />

              <Button variant="primary" className="" type="submit" >Submit</Button>

            </Form>
          </Formik>
        )}

      </div>

    </div>
  )
}

export default SendResetToken
