import { useAppSelector } from '../../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
export const Login = () => {
  const { token } = useAppSelector((state) => state.loginReducer);
  return token ? <Navigate to={pathes.main} /> : <div>Login</div>;
};
