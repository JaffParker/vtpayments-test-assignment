import React from 'react'
import { FontAwesomeIcon, Props } from '@fortawesome/react-fontawesome'

interface IconProps extends Props {}

export const Icon: React.FC<IconProps> = props => <FontAwesomeIcon {...props} />
