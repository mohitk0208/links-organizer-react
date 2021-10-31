import { useEffect, useRef } from 'react'

function useUpdateEffect(callback, dependencies) {

  const firstRenderRef = useRef(true)


/* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false
      return
    }

    return callback()

  }, dependencies)

}

export default useUpdateEffect
