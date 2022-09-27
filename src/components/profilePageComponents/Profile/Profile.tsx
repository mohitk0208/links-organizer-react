import React, { useState } from 'react'
import { PencilIcon } from "@heroicons/react/solid"
import { selectIsEditMode, setIsEditMode, selectUser, updateUserAsync, selectLoading } from '../../../slices/userSlice'
import { Form, Formik } from 'formik'
import * as Yup from "yup"
import { AvailabilityCheckInput, InputField } from '../../formComponents/Input'
import { joinClassNames } from "../../../utils/functions"
import useUpdateEffect from '../../../hooks/useUpdateEffect'
import ProfilePicture from '../ProfilePicture'
import Button from '../../utilComponents/Button'
import { useAppDispatch, useAppSelector } from '../../../app/store'



const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("This field is required"),
  last_name: Yup.string(),
  email: Yup.string().required("This field is required.").email("not a valid email format."),
})



function Profile() {

  const isEditMode = useAppSelector(selectIsEditMode)
  const user = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch()

  const [avatar, setAvatar] = useState(user.avatar)


  useUpdateEffect(() => {
    setAvatar(user.avatar)
  }, [user.avatar])


  const initialValues = {
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
  }



  return (
    <div className="w-full snap-mt-2 p-2 border snap-start" >
      <div className={joinClassNames(
        isEditMode ? "hidden" : "",
        "w-full py-2 px-10 flex flex-row-reverse cursor-pointer"
      )} onClick={() => dispatch(setIsEditMode(true))} >
        <PencilIcon className="w-6 h-6 text-blue-600  " />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(updateUserAsync({ ...values, avatar }))
        }}
        validateOnChange={true}
        onReset={(values) => {
          dispatch(setIsEditMode(false))
          setAvatar(user.avatar)
        }}
        enableReinitialize

      >
        <Form>


          <div className="flex" >
            <div className="flex flex-col items-center flex-1 p-2 " >

              <ProfilePicture avatar={avatar} setAvatar={setAvatar} />

              <p className="text-xl font-bold mt-3" >{user.username}</p>

            </div>

            <div className="flex flex-col flex-1 justify-center p-2 text-black/70" >

              <div className="flex gap-2" >
                <InputField
                  label="first name"
                  name="first_name"
                  type="text"
                  labelClassName=""
                  labelSpanClassName=""
                  className={joinClassNames(
                    isEditMode ? "" : "",
                    "p-1 w-full"
                  )}
                  disabled={!isEditMode}
                  placeholder="First Name" />

                <InputField
                  label="last name"
                  name="last_name"
                  type="text"
                  labelClassName=" "
                  labelSpanClassName=""
                  className="p-1 w-full"
                  disabled={!isEditMode}
                />

              </div>

              <AvailabilityCheckInput
                label="email"
                name="email"
                type="email"
                labelClassName=""
                labelSpanClassName=""
                className="p-1"
                disabled={!isEditMode}
                placeholder="email"
              />

            </div>

          </div>

          <div className={joinClassNames(isEditMode ? "" : "hidden", "flex justify-end px-3")} >
            <Button variant="outline-danger" type="reset" className="my-1" >Cancel</Button>
            <Button variant="primary" type="submit" className="my-1 ml-3" loading={isLoading} disabled={isLoading} >Save</Button>
          </div>


        </Form>
      </Formik>
    </div>
  )
}

export default Profile
