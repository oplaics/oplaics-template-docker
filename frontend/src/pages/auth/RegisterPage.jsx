/**
 * React
 */
import { NavLink } from "react-router-dom";

/**
 * MUI
 */
import { Button, Grid } from "@mui/material";

/**
 * React Hook Form
 */
import { FormProvider, useForm } from "react-hook-form";

/**
 * Components
 */
import ContainerUI from "../../components/ui/ContainerUI";
import { InputPasswordHook } from "../../components/forms/Inputs/InputPasswordHook";
import { InputHook } from "../../components/forms/Inputs/InputHook";
import useNotifier from "../../hooks/utils/useNotifier";

export default function RegisterPage() {
  useNotifier();

  const methods = useForm({
    defaultValues: {
      name: "Jhon Doe",
      email: "testing@test.test",
      password: "password",
      password_confirmation: "password",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ContainerUI full>
      <h1>Registro</h1>
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
              name="name"
              label="Nombre"
              fullWidth
              rules={{
                required: "El nombre es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 255,
                  message: "El nombre no debe exceder los 255 caracteres",
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputHook
              name="email"
              label="Correo electrónico"
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
              name="password_confirmation"
              label="Confirmar contraseña"
              fullWidth
              rules={{
                required: "La confirmación de contraseña es requerida",
                validate: (value, { password }) =>
                  value === password || "Las contraseñas no coinciden",
              }}
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrarse
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />
      <NavLink to="/auth">Ir a login</NavLink>
    </ContainerUI>
  );
}
