/**
 * Redux
 */
import { useSelector } from "react-redux";

export function useRole(rolesToCheck) {
  const roles = useSelector(state => state.session.roles);
  const hasRole = rolesToCheck?.some(role => roles.includes(role));

  return hasRole || false;
}

export function usePermission(perm) {
  const permission = useSelector(state => state.session.permissions[perm]);

  return permission || false;
}