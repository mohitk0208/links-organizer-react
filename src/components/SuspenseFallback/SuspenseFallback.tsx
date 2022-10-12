import LoadingSpinner from "../utilComponents/LoadingSpinner";

function SuspenseFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <LoadingSpinner className="h-6 w-6" />
    </div>
  )
}

export default SuspenseFallback