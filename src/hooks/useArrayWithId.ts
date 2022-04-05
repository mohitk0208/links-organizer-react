import { useCallback, useState } from "react"
import { v4 as uuidv4 } from "uuid"


export default function useArrayWithId<T>(initialValue: T[] = []) {

  const [arr, setArr] = useState(initialValue.map(v => ({ id: uuidv4(), value: v })) || [])


  const handleChange = useCallback((newValue: T, id: string) => {

    setArr(prev => {

      return [...prev].map(v => {
        if (v.id === id) {
          return { ...v, value: newValue }
        }
        return v
      })
    })
  }, [])


  const push = useCallback((value: T) => {
    setArr(prev => ([...prev, { id: uuidv4(), value: value }]))
  }, [])

  const filter = useCallback((callback: () => void) => {
    setArr(prev => ([...prev].filter(callback)))
  }, [])


  const set = useCallback((values: T[]) => {
    setArr(values.map(v => ({ id: uuidv4(), value: v })))
  }, [])


  const remove = useCallback((id) => {
    setArr(prev => ([...prev].filter(v => v.id !== id)))
  }, [])

  const removeByIndex = useCallback((index) => {
    setArr(prev => [...prev].filter((v, i) => i !== index))
  }, [])

  const insert = useCallback((index: number, value: T) => {
    setArr(prev => {
      const n = [...prev]
      n.splice(index, 0, { id: uuidv4(), value: value })
      return n
    })
  }, [])


  const handlePositionChange = useCallback((sourceIndex: number, destinationIndex: number) => {
    setArr(prev => {

      prev.splice(destinationIndex, 0, prev.splice(sourceIndex, 1)[0])

      return prev
    })
  }, [])


  return {
    get state() {
      return arr
    },
    setArr: set,
    handleChange,
    push,
    filter,
    remove,
    removeByIndex,
    insert,
    get values() {
      return [...arr].map(a => a.value)
    },
    handlePositionChange,
    get length() {
      return arr.length
    }
  }
}