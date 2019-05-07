import React, { FC, Fragment } from 'react'
import { Alert } from 'reactstrap'

interface ErrorProps {
  error?: string
}

export const Error: FC<ErrorProps> = ({ error }) => (
  <Alert color="danger">
    <p>
      Something went wrong while loading a resource. Try reloading the page and
      if this doesn't go away, contact the developers.
    </p>
    <br />
    {error && (
      <Fragment>
        <p>Include this information with your report: </p>
        <pre>{error}</pre>
      </Fragment>
    )}
  </Alert>
)
