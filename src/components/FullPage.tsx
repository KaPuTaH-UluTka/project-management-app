import { signUp, signIn } from '../store/api/signApi';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Header from './header/Header';
import Footer from './footer/Footer';
export const FullPage = ({ children }: { children: JSX.Element }) => {
  const { token } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  return (
    <>
      <Header />
      {!token ? (
        <div>
          <button onClick={() => dispatch(signIn({ login: 'login', password: '1111' as string }))}>
            Sign in
          </button>
          <button
            onClick={() =>
              dispatch(signUp({ name: 'name', login: 'login', password: '1111' as string }))
            }
          >
            Sign up
          </button>
        </div>
      ) : null}
      {children}
      <Footer />
    </>
  );
};
