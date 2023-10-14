import {ReactNode} from "react";
import {useAppContext} from "../store/AppContext.tsx";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
  const { step } = useAppContext();

  if(step === 'init') return <Navigate to={'/'} />

  return children
}

export default ProtectedRoute
