import Loading from '../components/loading/Loading';
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (process: string, func: () => JSX.Element) => {
  switch (process) {
    case 'loading':
      return <Loading />;
    case 'confirmed':
      return func();
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state');
  }
};

export default setContent;
