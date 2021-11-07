import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
import { InputField } from '../../components/formComponents/Input'
import Button from '../../components/utilComponents/Button'
import endpoints from '../../utils/endpoints'
import { fetchWrapper } from '../../utils/fetchWrapper'
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { enqueueNotification } from "../../slices/globalNotificationSlice"
import LoadingSpinner from '../../components/utilComponents/LoadingSpinner'

const validationSchema = Yup.object().shape({
  password: Yup.string().required("This field is Required."),

  confirmPassword: Yup.string().required("This field is Required").test({
    name: "confirm",
    exclusive: false,
    params: {},
    message: "Passwords must match.",
    test: function (value) {
      return this.parent.password === value
    }

  })
})

function ResetPassword() {

  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const uidb64 = params.get('uidb64')
  const token = params.get('token')
  const dispatch = useDispatch()

  // const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState(null)


  useEffect(() => {

    async function getUsername() {

      setLoading(true)

      if (!uidb64 || !token) return

      try {
        const res = await fetchWrapper.get(endpoints.VALIDATE_RESET_TOKEN(uidb64,token))

        const resData = await res.json()

        if (res.ok) {
          setUsername(resData?.username)
          // setEmail(resData?.email)
        }

      } catch (err) {
        console.log(err);
      }
      finally {
        setLoading(false)
      }


    }

    getUsername()

  }, [token, uidb64])




  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gray-100 " >
      {uidb64 && token && (
        <div className="bg-white border p-5 rounded-md shadow-lg ">

          {!username && loading && (
            <div className="text-center p-5" >

              <LoadingSpinner className="w-8 h-8 text-blue-400" />
              <p className="mt-2" >verifying, please wait...</p>


            </div>
          )}

          {username && (

            <Formik
              initialValues={{
                password: "",
                confirmPassword: ""
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setLoading(true)
                try {

                  const resetPasswordData = {
                    password: values.password
                  }

                  const res = await fetchWrapper.post(endpoints.RESET_NEW_PASSWORD(uidb64, token), resetPasswordData)
                  // const resData = await res.json()

                  if (res.ok) {
                    // either set the access and refresh token and redirect to home
                    // or redirect to login page

                    dispatch(enqueueNotification({
                      msg: "Password Reset Successful.",
                      type: "success",
                      duration: 3000
                    }))

                  }

                } catch (err) {
                  console.log(err)
                }
                finally {
                  setLoading(false)
                }

              }}
              validateOnChange

            >

              <Form>
                <p className="p-1 border-b mb-2  " >Rest password of <strong>{username}</strong></p>

                <InputField label="Password" name="password" type="password" labelClassName=" block mb-3" className="w-full p-1 mt-1" />

                <InputField label="Confirm Password" name="confirmPassword" type="password" labelClassName="block mb-3" className="w-full p-1 mt-1" />

                <Button className="" onClick={() => null} type="submit" >Submit</Button>

              </Form>

            </Formik>

          )}

        </div>
      )}

      {(!uidb64 || !token) && (
        <div className="w-full h-full flex flex-col items-center justify-center" >
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5  font-bold" >
            BAHUT TEZ HO RHE HO, Hnnn....
          </h1>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
