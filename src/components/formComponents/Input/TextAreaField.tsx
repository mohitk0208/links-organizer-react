import { useField } from "formik"
import React from "react"
import TextError from "../TextError/TextError"
import { classes } from "./index"

interface TextAreaFieldProps extends React.HTMLProps<HTMLTextAreaElement> {
  label: string,
  labelClassName?: string,
  labelSpanClassName?: string,
  name: string,
}

export default function TextAreaField({ label, labelClassName, labelSpanClassName, className, ...props }: TextAreaFieldProps) {

  const [field, meta] = useField(props)

  return (
    <label htmlFor={props.name} className={labelClassName} >
      <span className={`capitalize ${labelSpanClassName}`} > {label} </span>
      <textarea {...field} {...props} className={`${classes.INPUT(meta.error, meta.touched)} rounded-md ${className}`} />
      <TextError touched={meta.touched} error={meta.error} />
    </label>
  )
}