/**
 * React
 */
import { Outlet } from "react-router-dom";

function DefaultLayoutWrapper() {
  return <Outlet />;
}

export default function DefaultLayout() {
  return <DefaultLayoutWrapper />;
}
