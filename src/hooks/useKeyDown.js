import { useCallback, useEffect } from 'react'

const useKeyDown = (callback, keys) => {
  const onKeyDown = useCallback(
    (event) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key)
      if (wasAnyKeyPressed) {
        // event.preventDefault()
        callback(event)
      }
    },
    [callback, keys]
  )

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
}

export default useKeyDown
