import { useAppSelector } from '../../hooks/hooks';
export const Login = () => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  return <div>Login</div>;
};
