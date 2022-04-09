import { useField } from "formik"
import React from "react"
import TextError from "../TextError/TextError"
import { classes } from "./index"

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string,
  labelClassName?: string,
  labelSpanClassName?: string,
  className?: string,
  name: string
}

export default function InputField({ label, labelClassName, labelSpanClassName, className, ...props }: InputFieldProps) {

  const [field, meta] = useField<string>(props.name)

  return (
    <label htmlFor={props.name} className={labelClassName} >
      <span className={`capitalize ${labelSpanClassName}`}>{label}</span>
      <input {...field}  {...props} className={`${classes.INPUT(meta.error, meta.touched)} rounded-md ${className}`} />
      <TextError touched={meta.touched} error={meta.error} />
    </label>
  )
}
