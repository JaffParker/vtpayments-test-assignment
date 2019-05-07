import React, { FC } from 'react'
import { Icon } from './Icon'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'

export const CircledPlusIcon: FC = () => (
  <Icon icon={faPlus} mask={faCircle} transform="shrink-6" />
)
