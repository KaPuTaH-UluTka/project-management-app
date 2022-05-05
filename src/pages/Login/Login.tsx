import { useAppSelector } from '../../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
export const Login = () => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  return isLogined ? <Navigate to={pathes.main} /> : <div>Login</div>;
};
