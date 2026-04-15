/**
 * React
 */
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom";

/**
 * Components
 */
import Fallback from "../../components/routers/Fallback";
import useTitleHook from "../../hooks/utils/useTitleHook";

/**
 * Redux
 */
import { useLogoutMutation } from "../../store/services/auth/AuthApi";
import useNotifier from "../../hooks/utils/useNotifier";

export default function LogoutPage() {
  useNotifier();
  useTitleHook('Logout - App');
  const [searchParams] = useSearchParams();  
  const [getLogout] = useLogoutMutation();

  useEffect(() => {
    getLogout({mode: searchParams.get('mode')});
  }, [getLogout, searchParams]);

  return (
    <Fallback text='Estamos cerrando su sesion, espere por favor...' />
  )
}