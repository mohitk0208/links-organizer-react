import { useEffect, useState } from "react";

export default function useIsOnScreen(options) {

  const [ref, setRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {

      const [entry] = entries

      setIsVisible(entry.isIntersecting)

    }, options)

    if(ref) observer.observe(ref)

    return () => {
      if(ref) observer.unobserve(ref)
      console.log("code ran");
    }

  }, [ref, options])

  return { setRef, isVisible }

}