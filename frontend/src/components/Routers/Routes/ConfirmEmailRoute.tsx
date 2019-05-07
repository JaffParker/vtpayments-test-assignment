import React from 'react'
import { RouteComponentProps } from 'react-router'
import { DocumentTitle } from '../../Misc/DocumentTitle'
import { ConfirmEmailContainer } from '../../Auth/Containers/ConfirmEmailContainer'

export default function ConfirmEmailRoute({
  match: {
    params: { token },
  },
}: RouteComponentProps<{ token: string }>): JSX.Element {
  return (
    <DocumentTitle title="Confirm Your Email">
      <ConfirmEmailContainer token={token} />
    </DocumentTitle>
  )
}
