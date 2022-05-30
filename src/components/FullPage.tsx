import Header from './header/Header';
import Footer from './footer/Footer';
import ErrorBoundary from './errorBoundary/ErrorBoundary';

export const FullPage = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      <ErrorBoundary>{children}</ErrorBoundary>
      <Footer />
    </>
  );
};
