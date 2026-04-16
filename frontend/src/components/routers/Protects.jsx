// Route
import { Navigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { useRole, usePermission } from '../../hooks/utils/usePermissions';

export function NoSeeAuth({ children }) {
  const auth = useSelector((state) => state.session.auth);
  /**
   * Verificar auth y redirigir a página anterior
   * si es que existe. En caso de no existir un
   * state, se enviará a la ruta principal de la app.
   */
  if (auth) {
    return <Navigate to={'/auth/2fa'} />
  }

  return children;
}

export function AuthProtect({ stateNull, children, roles, permission = null }) {
  const auth = useSelector((state) => state.session.auth);
  const token_can = useSelector((state) => state.session.token_can);
  const perm = usePermission(permission);
  const role = useRole(roles);

  let location = useLocation();
  
  /**
   * Verificar logout para redirigir a la vista de login.
   * 
   * STATENULL: El state será nulo solo cuando se haga un logout
   * desde la app para evitar que redireccione a la página anterior
   * donde se hizo el logout, así cuando vuelva hacer un login la
   * app lo redireccionará hacia la ruta principal (/hub)
   */
  if (!auth) {
    return <Navigate to={'/auth'} state={!stateNull && { from: location }} />
  }

  /**
   * 2FA Required Protection
   */
  if (token_can.includes('2fa_required') && location.pathname !== '/auth/2fa' && location.pathname !== '/auth/logout') {
    return <Navigate to={'/auth/2fa'} state={!stateNull && { from: location }} />
  }

  if (!token_can.includes('2fa_required') && location.pathname === '/auth/2fa') {
    return <Navigate to={'/'} state={null} />
  }

  /**
   * Role & Permission Protection
   */
  if (roles && !role) {
    return <Navigate to={'/no-perm'} state={null} />
  }

  if (permission && !perm) {
    return <Navigate to={'/no-perm'} state={null} />
  }

  return children;
}