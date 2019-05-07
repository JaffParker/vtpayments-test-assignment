import React, { FC, EventHandler, MouseEvent } from 'react'
import { Button } from 'reactstrap'
import { CircledPlusIcon } from './CircledPlusIcon'

interface CreateButtonProps {
  onClick: EventHandler<MouseEvent>
  children: string
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick, children }) => (
  <Button color="success" outline onClick={onClick}>
    <CircledPlusIcon /> {children}
  </Button>
)
