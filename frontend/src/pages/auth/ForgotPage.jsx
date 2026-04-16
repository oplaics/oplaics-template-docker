/**
 * React
 */
import { NavLink, useNavigate } from "react-router-dom";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";

/**
 * MUI
 */
import { Button, Grid } from "@mui/material";

/**
 * Components
 */
import useNotifier from "../../hooks/utils/useNotifier";
import ContainerUI from "../../components/ui/ContainerUI";
import useTitleHook from "../../hooks/utils/useTitleHook";
import { InputHook } from "../../components/forms/Inputs/InputHook";
import { InputPasswordHook } from "../../components/forms/Inputs/InputPasswordHook";

/**
 * Redux
 */
import { useChangePasswordMutation, useForgotMutation } from "../../store/services/auth/AuthApi";

export default function ForgotPage() {
  useTitleHook("Forgot - App");
  useNotifier();

  const navigate = useNavigate();

  const form1 = useForm();
  const form2 = useForm();

  const [forgot, { isLoading, data, originalArgs }] = useForgotMutation();
  const [changePassword, { isLoading: isLoadingChangePassword }] = useChangePasswordMutation();

  const onSubmit1 = (data) => {
    forgot({
      body: data,
      setError: form1.setError,
    });
  };

  const onSubmit2 = (data) => {
    changePassword({
      body: {
        ...data,
        email: originalArgs?.body?.email,
      },
      setError: form2.setError,
      callback: () => {
        navigate("/auth");
      }
    });
  };

  return (
    <ContainerUI full>
      <h1>Forgot</h1>

      <FormProvider {...form1}>
        <Grid
          container
          component="form"
          onSubmit={form1.handleSubmit(onSubmit1)}
          autoComplete="off"
          spacing={2}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <InputHook
              name="email"
              label="Correo electrónico"
              disabled={isLoading || (data?.status === 200 && originalArgs?.body?.email === form1.getValues("email"))}
              rules={{
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "El correo electrónico no es válido",
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button loading={isLoading} disabled={(data?.status === 200 && originalArgs?.body?.email === form1.getValues("email"))} type="submit" variant="contained" fullWidth>
              Enviar correo de recuperación
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />
      <h1>Restablecer contraseña</h1>

      <FormProvider {...form2}>
        <Grid
          container
          component="form"
          onSubmit={form2.handleSubmit(onSubmit2)}
          autoComplete="off"
          spacing={2}
        >
          <Grid size={12}>
            <InputHook
              name="otp"
              label="Código de autenticación"
              disabled={isLoading || data?.status !== 200 || isLoadingChangePassword}
              rules={{
                required: "El código de autenticación es requerido",
                minLength: {
                  value: 6,
                  message:
                    "El código de autenticación debe tener al menos 6 caracteres",
                },
                maxLength: {
                  value: 6,
                  message:
                    "El código de autenticación debe tener como máximo 6 caracteres",
                },
              }}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputPasswordHook
              name="new_password"
              label="Nueva contraseña"
              disabled={isLoading || data?.status !== 200 || isLoadingChangePassword}
              fullWidth
              rules={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 8 caracteres",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputPasswordHook
              name="new_password_confirmation"
              label="Confirmar contraseña"
              disabled={isLoading || data?.status !== 200 || isLoadingChangePassword}
              fullWidth
              rules={{
                required: "La confirmación de contraseña es requerida",
                validate: (value, { new_password }) =>
                  value === new_password || "Las contraseñas no coinciden",
              }}
            />
          </Grid>
          <Grid size={12}>
            <Button loading={isLoadingChangePassword} disabled={isLoading || data?.status !== 200} type="submit" variant="contained" fullWidth>
              Cambiar contraseña
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />
      <NavLink to="/auth/logout">Cerrar sección</NavLink>
    </ContainerUI>
  );
}
