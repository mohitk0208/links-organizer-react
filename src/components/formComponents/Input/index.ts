import TextAreaField from "./TextAreaField"
import AvailabilityCheckInput from "./AvailabilityCheckInput"
import InputField from "./InputField"

export { TextAreaField, AvailabilityCheckInput, InputField }

export const classes = {
  INPUT: (error: string | undefined, touched: boolean) => {
    const common = "block shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:focus:bg-gray-600"

    if (error && touched) {
      return `border-2 border-red-500/50 ${common} `
    }
    else {
      return `${common} border-2 border-gray-300 dark:border-gray-600/80 `
    }
  }
} as const;

