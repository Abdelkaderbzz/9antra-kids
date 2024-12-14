export const checkPermission = (model: string) => {
  const permissionsArray = [
    'create_role',
    'delete_role',
    'update_role',
    'get_role',
    'manage_permissions',
    'manage_domain',
    'get_user',
    'create_user',
    'update_user',
    'delete_user',
    'manage_user',
    'get_role',
    'create_role',
    'update_role',
    'delete_role',
    'manage_role',
    'get_domain',
    'create_domain',
    'update_domain',
    'delete_domain',
    'manage_domain',
    'get_permissions',
    'create_permissions',
    'update_permissions',
    'delete_permissions',
    'manage_permissions',
  ]

  const normalizedInput = model.toLowerCase()

  return permissionsArray.some((permission) => permission.includes(normalizedInput))
}
