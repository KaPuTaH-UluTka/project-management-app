import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { pathes } from '../pathes/pathes';
export const Private = ({ children }: { children: JSX.Element }) => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  if (!isLogined) {
    return <Navigate to={pathes.welcome} />;
  }
  return children;
};
