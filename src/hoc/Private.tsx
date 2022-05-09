import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { pathes } from '../pathes/pathes';
export const Private = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.loginReducer);
  if (!token) {
    return <Navigate to={pathes.welcome} />;
  }
  return children;
};
