/**
 * React
 */
import { NavLink } from "react-router-dom";

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
import useTitleHook from "../../hooks/utils/useTitleHook";
import ContainerUI from "../../components/ui/ContainerUI";
import { InputHook } from "../../components/forms/Inputs/InputHook";
import { InputPasswordHook } from "../../components/forms/Inputs/InputPasswordHook";

export default function ForgotPage() {
  useTitleHook('2FA - App');
  const form1 = useForm();
  const form2 = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <ContainerUI full>
      <h1>2FA Page</h1>
      
      <FormProvider {...form1}>
        <Grid container component="form" onSubmit={form1.handleSubmit(onSubmit)} autoComplete="off" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputHook
              name="otp"
              label="Código de autenticación"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Verificar
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />

      <FormProvider {...form2}>
        <Grid container component="form" onSubmit={form2.handleSubmit(onSubmit)} autoComplete="off" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputPasswordHook
              name="new_password"
              label="Nueva contraseña"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputPasswordHook
              name="new_password_confirmation"
              label="Confirmar contraseña"
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" fullWidth>
              Cambiar contraseña
            </Button>
          </Grid>
        </Grid>
      </FormProvider>

      <br />
      <NavLink to="/auth/logout">Cerrar sección</NavLink>
    </ContainerUI>
  )
}
