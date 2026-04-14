import { NavLink } from "react-router-dom";
import ContainerUI from "../../components/ui/ContainerUI";

export default function RegisterPage() {
  return (
    <ContainerUI full>
      RegisterPage

      <br/>
      <NavLink to="/auth">Ir a login</NavLink>
    </ContainerUI>
  )
}