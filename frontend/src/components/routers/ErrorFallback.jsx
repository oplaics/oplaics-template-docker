/**
 * React
 */
import { useRouteError } from "react-router-dom";

/**
 * Components
 */
import Fallback from "./Fallback";

export default function ErrorFallback() {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <Fallback text='Error interno en la App' homeButton />
  );
}