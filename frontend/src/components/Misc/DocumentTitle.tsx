import React, { ReactElement } from 'react'
import VDocumentTitle from 'react-document-title'

interface DocumentTitleProps {
  title?: string
  defaultTitle?: string
  children: ReactElement
}

export const DocumentTitle: React.FC<DocumentTitleProps> = ({
  title,
  defaultTitle,
  children,
}) => (
  <VDocumentTitle
    title={`${title ? `${title} | ` : ''}${defaultTitle || 'VTPayments'}`}
  >
    {children}
  </VDocumentTitle>
)
