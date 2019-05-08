import React, { FC, useState } from 'react'
import { Permission } from '../../../types/Api'
import { GetPermissionsAndForUser } from '../../../graphql/queries/GetPermissionsAndForUser'
import { Query, Mutation } from 'react-apollo'
import { Loading } from '../../Misc/Loading'
import { GrantPermissionToUser } from '../../../graphql/mutations/GrantPermissionToUser'
import { RevokePermission } from '../../../graphql/mutations/RevokePermission'
import { UserPermissionChecbox } from '../Forms/UserPermissionChecbox'
import { Row, Col } from 'reactstrap'

interface UserPermissionsContainerProps {
  userId: string
}

export const UserPermissionsContainer: FC<UserPermissionsContainerProps> = ({
  userId,
}) => {
  const [grantedIds, setGrantedIds] = useState<string[]>([])
  const [revokedIds, setRevokedIds] = useState<string[]>([])

  return (
    <Query<
      {
        getPermissions: Permission[]
        getPermissionsForUser: Permission[]
      },
      { userId: string }
    >
      query={GetPermissionsAndForUser}
      variables={{ userId }}
    >
      {({ data, loading }) => {
        if (loading) return <Loading />
        if (data) {
          const grantedPermissionIds = data.getPermissionsForUser.map(
            permission => permission.id,
          )
          return (
            <Mutation<
              {},
              {
                userId: string
                permissionId: string
              }
            >
              mutation={GrantPermissionToUser}
            >
              {grantPermission => (
                <Mutation<
                  {},
                  {
                    userId: string
                    permissionId: string
                  }
                >
                  mutation={RevokePermission}
                >
                  {revoke => {
                    const handleChange = async (
                      permissionId: string,
                      active: boolean,
                    ): Promise<void> => {
                      if (active) {
                        await grantPermission({
                          variables: { permissionId, userId },
                        })
                        setGrantedIds(ids => [...ids, permissionId])
                        setRevokedIds(ids =>
                          ids.filter(id => id !== permissionId),
                        )
                      } else {
                        await revoke({ variables: { permissionId, userId } })
                        setRevokedIds(ids => [...ids, permissionId])
                        setGrantedIds(ids =>
                          ids.filter(id => id !== permissionId),
                        )
                      }
                    }

                    return (
                      <Row>
                        <Col sm="12" md={{ size: 8, offset: 2 }}>
                          <h1>Permissions</h1>
                          <hr />
                          {data.getPermissions.map(permission => (
                            <UserPermissionChecbox
                              key={permission.id}
                              permission={permission}
                              active={[...grantedPermissionIds, ...grantedIds]
                                .filter(id => !revokedIds.includes(id))
                                .includes(permission.id)}
                              onChange={handleChange}
                            />
                          ))}
                        </Col>
                      </Row>
                    )
                  }}
                </Mutation>
              )}
            </Mutation>
          )
        }
      }}
    </Query>
  )
}
