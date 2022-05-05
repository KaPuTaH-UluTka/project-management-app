import { addLogin } from '../store/Reducer/loginReducer/loginReducer';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Header from './header/Header';
import Footer from './footer/Footer';
export const FullPage = ({ children }: { children: JSX.Element }) => {
  const { isLogined } = useAppSelector((state) => state.loginReducer);
  const dispatch = useAppDispatch();
  return (
    <>
      <Header />
      {!isLogined ? <button onClick={() => dispatch(addLogin())}>Login/logout</button> : null}
      {children}
      <Footer />
    </>
  );
};
