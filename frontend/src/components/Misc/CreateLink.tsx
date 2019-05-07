import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { CircledPlusIcon } from './CircledPlusIcon'

interface CreateLinkProps {
  url: string
  children: string
}

export const CreateLink: FC<CreateLinkProps> = ({ url, children }) => (
  <Link to={url} className="btn btn-outline-success float-right">
    <CircledPlusIcon /> {children}
  </Link>
)
