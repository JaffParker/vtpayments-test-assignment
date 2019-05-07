import React, { FC, useState, useEffect, Fragment } from 'react'
import { Loading } from './Loading'

interface WaitProps {
  delay?: number
}

export const Wait: FC<WaitProps> = ({ delay = 1500, children }) => {
  const [waiting, setWaiting] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setWaiting(false)
    }, delay)

    return () => clearTimeout(timeout)
  })

  return waiting ? <Loading /> : <Fragment>{children}</Fragment>
}
