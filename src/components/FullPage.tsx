import Header from './header/Header';
import Footer from './footer/Footer';
export const FullPage = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
