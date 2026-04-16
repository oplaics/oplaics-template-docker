import { NavLink } from "react-router-dom";
import ContainerUI from "../../components/ui/ContainerUI";

export default function HomePage() {
  return (
    <ContainerUI full>
      <div>HomePage</div>
      
      <br />
      <NavLink to="/auth/logout">Cerrar sesión</NavLink>
    </ContainerUI>
  )
}
