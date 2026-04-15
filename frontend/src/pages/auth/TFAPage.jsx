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

/**
 * Redux
 */
import { useTfaMutation } from "../../store/services/auth/AuthApi";

export default function TFAPage() {
  useTitleHook('2FA - App');
  const [tfa, { isLoading }] = useTfaMutation();
  
  const methods = useForm();

  const onSubmit = (data) => {
    tfa({
      body: data
    });
  }

  return (
    <ContainerUI full>
      <h1>2FA Page</h1>
      
      <FormProvider {...methods}>
        <Grid container component="form" onSubmit={methods.handleSubmit(onSubmit)} autoComplete="off" spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputHook
              name="otp"
              label="Código de autenticación"
              rules={{
                required: "El código de autenticación es requerido",
                minLength: {
                  value: 6,
                  message: "El código de autenticación debe tener al menos 6 caracteres"
                },
                maxLength: {
                  value: 6,
                  message: "El código de autenticación debe tener como máximo 6 caracteres"
                }
              }}
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
      <NavLink to="/auth/logout">Cerrar sección</NavLink>
    </ContainerUI>
  )
}
