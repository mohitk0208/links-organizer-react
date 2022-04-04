import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { routes } from '../../utils/routeStrings'
import * as Yup from "yup"
import { AvailabilityCheckInput, InputField } from '../../components/formComponents/Input'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoading, selectSignupError, setSignupError, signupAsync } from '../../slices/authSlice'
import Alert from '../../components/utilComponents/Alert'
import Button from '../../components/utilComponents/Button'

const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  confirm_password: ""
}

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required."),
  last_name: Yup.string(),
  email: Yup.string().required("email field is required.").email("not a valid email format."),
  username: Yup.string()
    .required("username field is required.")
    .min(4, "must have at least 4 characters.")
    .max(15, "cannot contain more than 15 characters")
    .matches(/^[a-z0-9_]+$/, "should contain only lowercase characters.")
    .matches(/^[^_].*$/, "should not start with underscore _.")
    .matches(/^.*[^_]$/, "should not end with underscore _.")
    .matches(/^[a-z0-9]*_?[^_][a-z0-9]*$/, "should not contain consecutive underscore _.")
  ,
  password: Yup.string()
    .required("This field is required."),
  confirm_password: Yup.string().required("This field is required.").test({
    name: "confirm",
    exclusive: false,
    params: {},
    message: "Passwords must match.",
    test: function (value) {
      return this.parent.password === value
    }
  })
})

function Signup() {

  const SignupError = useSelector(selectSignupError)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()


  return (
    <div className="w-full min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 grid-rows-1 dark:text-white">

      <div className="min-h-[100vh] flex-grow flex items-center justify-center dark:bg-gray-800 py-10">

        <Alert message={SignupError} onClose={() => dispatch(setSignupError(""))} />

        <div className="w-10/12 md:w-8/12" >
          <h2 className="text-4xl mb-7" >
            SignUp
          </h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (values.password === values.confirm_password) {
                const { confirm_password, ...toSend } = values
                dispatch(signupAsync(toSend))
              }
            }}
            validateOnChange={true}
          >
            <Form>
              <div className="flex justify-between flex-wrap" >

                <InputField label="first name" name="first_name" type="text" labelClassName="inline-block mb-2 w-full md:w-[49%]" className="block mt-1 w-full" placeholder="First Name" />

                <InputField label="last name" name="last_name" type="text" labelClassName="inline-block mb-2 w-full md:w-[49%]" className="block mt-1 w-full" placeholder="Last Name" />

              </div>

              <AvailabilityCheckInput label="email" name="email" type="email" labelClassName="block mb-2 w-full" className="block" placeholder="Enter Email address" />

              <AvailabilityCheckInput label="username" name="username" type="text" labelClassName="block mb-2 w-full" className="block" placeholder="Enter a unique username" />

              <InputField label="password" name="password" type="password" labelClassName="block mb-2  w-full" className="block mt-1 w-full" placeholder="Enter Password" />

              <InputField label="Confirm password" name="confirm_password" type="password" labelClassName="block mb-6 w-full" className="block mt-1 w-full" placeholder="Confirm Password" />

              <Button className="w-full py-3 text-lg" variant="secondary" disabled={loading} loading={loading} type="submit" >SignUp</Button>

            </Form>
          </Formik>

          <p className="w-full mt-7 text-sm text-center" >Already have an account ? <Link to={routes.LOGIN} className="text-purple-500 hover:text-purple-400" >Login</Link> </p>

        </div>

      </div>
      <div className="min-h-[100vh] flex-grow hidden lg:block bg-purple-200 dark:bg-purple-900" ></div>

      <ThemeChangeFAB />

    </div>
  )
}

export default Signup