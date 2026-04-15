/**
 * React
 */
import { NavLink } from "react-router-dom";

/**
 * MUI
 */
import { Button, Grid } from "@mui/material";

/**
 * RHF
 */
import { FormProvider, useForm } from "react-hook-form";

/**
 * Components
 */
import ContainerUI from "../../components/ui/ContainerUI";
import { InputHook } from "../../components/forms/Inputs/InputHook";
import { InputPasswordHook } from "../../components/forms/Inputs/InputPasswordHook";
import { CheckBoxHook } from "../../components/forms/checkbox/CheckboxHook";
import { useLoginMutation } from "../../store/services/auth/AuthApi";
import useNotifier from "../../hooks/utils/useNotifier";

export default function LoginPage() {
  useNotifier();

  const [login, { isLoading }] = useLoginMutation();

  const methods = useForm({
    defaultValues: {
      email: "testing@test.test",
      password: "password",
    },
  });

  const onSubmit = (data) => {
    login({
      body: data
    });
  };

  return (
    <ContainerUI full>
      <h1>Login</h1>
      <FormProvider {...methods}>
        <Grid
          container
          component="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          autoComplete="off"
          spacing={2}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <InputHook
              name="email"
              label="Correo electrónico"
              disabled={isLoading}
              fullWidth
              rules={{
                required: "El correo electrónico es requerido",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "El correo electrónico no es válido",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputPasswordHook
              name="password"
              label="Contraseña"
              disabled={isLoading}
              fullWidth
              rules={{
                required: "La contraseña es requerida",
                minLength: {
                  value: 8,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <CheckBoxHook
              name="remember"
              label="Recordar sesión"
              disabled={isLoading}
            />
          </Grid>
          <Grid size={12}>
            <Button loading={isLoading} type="submit" variant="contained" color="primary">
              Iniciar sesión
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />
      <NavLink to="/auth/register">Ir a Register</NavLink>
      <br />
      <NavLink to="/auth/forgot">Reiniciar contraseña</NavLink>
    </ContainerUI>
  );
}
