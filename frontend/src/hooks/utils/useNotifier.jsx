import { useEffect } from "react";

import { useSnackbar } from "notistack";

import { useDispatch, useSelector } from "react-redux";
import { logoutApp } from "../../store/authReducer";
import CloseButton from "../../components/notiferCustom/CloseButton";
import { resetNotifier } from "../../store/reducers/app/notifierReducer";

export default function useNotifier({
  messageTo200 = true,
  messageTo400 = true,
  message400 = false,
  message403 = "No tienes permisos para esta acción",
  messageTo404 = true,
  message404 = 'Ruta URL no encontrada',
  messageTo422 = true,
  message422 = 'Error al verificar los datos',
} = {}) {
  const { enqueueSnackbar } = useSnackbar();

  const { notiText, notiStatus, notiVariant, notiKey, notiErrors } = useSelector((state) => state.notistack);
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
    }else if (notiStatus == 401) {
      enqueueSnackbar("Sesión expirada", {
        variant: "info",
        action: (key) => <CloseButton id={key} />,
      });

      dispatch(logoutApp());
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
        const errorMessages = notiErrors && Object.values(notiErrors).flat();
        if (errorMessages?.length > 0) {
          errorMessages.forEach((msg) =>
            enqueueSnackbar(msg, {
              variant: "error",
              action: (key) => <CloseButton id={key} />,
            })
          );
        } else {
          enqueueSnackbar(message422, {
            variant: "error",
            action: (key) => <CloseButton id={key} />,
          });
        }
      }
    }else if (notiStatus == 429) {
      enqueueSnackbar("Demasiadas peticiones", {
        variant: "info",
        action: (key) => <CloseButton id={key} />,
      });

      dispatch(logoutApp());
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
    }
  }, [
    notiKey,
    notiText,
    notiStatus,
    notiVariant,
    notiErrors,
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