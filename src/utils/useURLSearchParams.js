import { useEffect, useState } from 'react'

export default function useURLSearchParams() {
  const [params, setParams] = useState(new URLSearchParams())

  useEffect(() => {
    setParams(new URLSearchParams(window.location.search))
  }, [])

  return params
}
