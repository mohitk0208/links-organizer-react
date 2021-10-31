import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import ThemeChangeFAB from '../../components/ThemeChangeFAB'
import { useDispatch, useSelector } from 'react-redux'
import { loginAsync, selectLoading, selectLoginError, setLoginError } from "../../slices/authSlice"
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { InputField } from '../../components/formComponents/Input'
import Alert from '../../components/utilComponents/Alert'
import Button from '../../components/utilComponents/Button'


const validationSchema = Yup.object().shape({
  username: Yup.string().required("This field is required."),
  password: Yup.string().required("This field is required.")
})


function Login() {

  const loginError = useSelector(selectLoginError)
  const loading = useSelector(selectLoading)
  const dispatch = useDispatch()

  return (
    <div className="w-full min-h-[100vh] grid grid-cols-1 lg:grid-cols-2 grid-rows-1 dark:text-white">

      <div className="min-h-[100vh] flex-grow hidden lg:block bg-green-300 dark:bg-green-600" />
      <div className="min-h-[100vh] flex-grow flex items-center justify-center dark:bg-gray-800 py-10" >

        <div className="w-10/12 md:w-8/12" >

        <Alert message={loginError} onClose={() => dispatch(setLoginError(""))} />

          <h2 className="text-4xl mb-10" >
            Login
          </h2>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values) => dispatch(loginAsync(values))}
            validationSchema={validationSchema}
          >
            <Form>

              <InputField label="username" name="username" type="text" labelClassName="block mb-3" className="w-full mt-1" placeholder="Enter email / username" />

              <InputField label="password" name="password" type="password" labelClassName="block mb-3" className="w-full mt-1" placeholder="Enter password" />

              <p className="w-full mb-2 text-sm text-center" ><Link to={routes.SEND_RESET_TOKEN} className="text-green-600 hover:text-green-500" >Forgot Password ? </Link> </p>

              <Button className="w-full py-3 text-lg" disabled={loading} loading={loading} type="submit" >Login</Button>

              <p className="w-full mt-7 text-sm text-center" >Don't have an account ? <Link to={routes.SIGNUP} className="text-green-600 hover:text-green-500" >SignUp</Link> </p>
            </Form>

          </Formik>

        </div>

        <ThemeChangeFAB />

      </div>
    </div>
  )

}

export default Login