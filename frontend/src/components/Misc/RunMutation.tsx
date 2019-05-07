import React, { FC, useEffect, Fragment, useState } from 'react'
import { MutationFn, FetchResult } from 'react-apollo'

interface RunMutationProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutateFn: MutationFn<any, any>
  shouldRun: boolean
  onSuccess?: (result: FetchResult) => void
  onComplete?: () => void
}

export const RunMutation: FC<RunMutationProps> = ({
  mutateFn,
  onSuccess,
  onComplete,
  children,
  shouldRun,
}) => {
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const run = async (): Promise<void> => {
      if (shouldRun && !running) {
        setRunning(true)
        try {
          const result = await mutateFn()
          onSuccess && result && onSuccess(result)
        } finally {
          onComplete && onComplete()
          setRunning(false)
        }
      }
    }

    run()
  }, [shouldRun, mutateFn, onSuccess, onComplete, running])

  return <Fragment>{children}</Fragment>
}
