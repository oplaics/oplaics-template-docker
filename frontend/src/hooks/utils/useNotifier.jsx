/**
 * React
 */
import { useEffect } from "react";

/**
 * Notistack
 */
import { useSnackbar } from "notistack";
import CloseButton from "../../components/notiferCustom/CloseButton";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { logoutSession } from "../../store/reducers/app/sessionReducer";
import { resetNotifier } from "../../store/reducers/app/notifierReducer";

export default function useNotifier({
  messageTo200 = true,
  messageTo400 = true,
  message400 = false,
  message403 = "No tienes permisos para esta acción",
  messageTo404 = true,
  message404 = "Ruta URL no encontrada",
  messageTo422 = true,
  message422 = "Error al verificar los datos",
} = {}) {
  const { enqueueSnackbar } = useSnackbar();

  const notiText = useSelector((state) => state.notifier.notiText);
  const notiStatus = useSelector((state) => state.notifier.notiStatus);
  const notiVariant = useSelector((state) => state.notifier.notiVariant);
  const notiKey = useSelector((state) => state.notifier.notiKey);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!notiKey) return;

    if (notiStatus == 200 || notiStatus == 201) {
      messageTo200 &&
        enqueueSnackbar(notiText, {
          variant: notiVariant,
          action: (key) => <CloseButton id={key} />,
        });
    } else if (notiStatus == 400) {
      messageTo400 &&
        enqueueSnackbar(message400 ? message400 : notiText, {
          variant: "warning",
          action: (key) => <CloseButton id={key} />,
        });
    } else if (notiStatus == 401) {
      enqueueSnackbar("Sesión expirada", {
        variant: "info",
        action: (key) => <CloseButton id={key} />,
      });

      dispatch(logoutSession());
    } else if (notiStatus == 403) {
      enqueueSnackbar(message403, {
        variant: "error",
        action: (key) => <CloseButton id={key} />,
      });
    } else if (notiStatus == 404) {
      messageTo404 &&
        enqueueSnackbar(notiText ? notiText : message404, {
          variant: "warning",
          action: (key) => <CloseButton id={key} />,
        });
    } else if (notiStatus == 405) {
      enqueueSnackbar("Método no soportado", {
        variant: "error",
        action: (key) => <CloseButton id={key} />,
      });
    } else if (notiStatus == 422) {
      if (messageTo422) {
        enqueueSnackbar(message422, {
          variant: "error",
          action: (key) => <CloseButton id={key} />,
        });
      }
    } else if (notiStatus == 429) {
      enqueueSnackbar("Demasiadas peticiones", {
        variant: "info",
        action: (key) => <CloseButton id={key} />,
      });

      dispatch(logoutSession());
    } else if (notiStatus == 500) {
      enqueueSnackbar("Error interno en el servidor", {
        variant: "error",
        action: (key) => <CloseButton id={key} />,
      });
    } else if (notiStatus == "offline") {
      enqueueSnackbar("Revise su conexión a internet", {
        variant: "error",
        action: (key) => <CloseButton id={key} />,
      });
    }

    return () => {
      dispatch(resetNotifier());
    };
  }, [
    notiKey,
    notiText,
    notiStatus,
    notiVariant,
    dispatch,
    enqueueSnackbar,
    messageTo200,
    messageTo400,
    message400,
    message403,
    messageTo404,
    message404,
    messageTo422,
    message422,
  ]);
}
