import { NavLink } from "react-router-dom";
import ContainerUI from "../../components/ui/ContainerUI";

export default function LoginPage() {
  return (
    <ContainerUI full>
      LoginPage

      <br/>
      <NavLink to="/auth/register">Ir a Register</NavLink>
      <br/>
      <NavLink to="/auth/forgot">Reiniciar contraseña</NavLink>
    </ContainerUI>
  )
}
