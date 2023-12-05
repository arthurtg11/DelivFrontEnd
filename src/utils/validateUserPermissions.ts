// type User = {
//   permissions?: string[];
//   roles?: string[];
// };

type ValidateuserPermissions = {
  user: any;
  permissions?: string[];
  roles?: string[];
};

export function validateuserPermissions({
  user,
  permissions,
  roles,
}: ValidateuserPermissions) {
  if (roles?.length > 0) {
    const hasAllRoles = roles.some((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllRoles) return false;
  }

  return true;
}
