import React, { useContext, useCallback, Fragment } from 'react'
import classNames from 'classnames'
import { Icon } from '../../Misc/Icon'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import styles from './UserPermissionChecbox.module.css'
import { DisabledFormContext } from '../../../contexts/DisabledFormContext'
import { Permission } from '../../../types/Api'
import { Row } from 'reactstrap'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UserPermissionChecboxProps {
  permission: Permission
  active: boolean
  onChange: (permissionId: string, active: boolean) => void
}

export const UserPermissionChecbox: React.FC<UserPermissionChecboxProps> = ({
  permission: { id, name, description },
  active,
  onChange,
}) => {
  const disabled = useContext(DisabledFormContext)
  const handleClick = useCallback(() => {
    if (!disabled) onChange(id, !active)
  }, [id, active, onChange, disabled])

  return (
    <Fragment>
      <Row className="mb-2">
        <div
          className={classNames(styles.Checkbox, { [styles.checked]: active })}
          onClick={handleClick}
        >
          {active && <Icon icon={faCheck} size="sm" />}
        </div>
        <div className="ml-1">{name}</div>
      </Row>
    </Fragment>
  )
}
