import React, { useEffect, useRef } from 'react'

function useUpdateEffect(callback: () => void, dependencies: React.DependencyList = []) {

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
