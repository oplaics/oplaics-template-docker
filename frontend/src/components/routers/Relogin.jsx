import { useEffect } from "react";

/**
 * Components
 */
import Fallback from "./Fallback";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateSession } from "../../store/reducers/app/sessionReducer";
import { useReloginMutation } from "../../store/services/auth/AuthApi";

export default function Relogin({ children }) {
  const apiKey = useSelector((state) => state.session.apiKey);
  const relogin = useSelector((state) => state.session.relogin);
  const dispatch = useDispatch();
  const [postRelogin, { isLoading }] = useReloginMutation();

  useEffect(() => {
    dispatch(updateSession({ key: "relogin", value: false }));
    if (!apiKey || !relogin || isLoading) return;
    postRelogin();
  }, [apiKey, relogin, isLoading, postRelogin, dispatch]);

  if (relogin || isLoading)
    return (
      <Fallback
        text="Estamos cargando algunas cosas, por favor espere..."
        loading
      />
    );
  return children;
}