import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './components/app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Reducer/configReducer';
import LocaleWrapper from './components/localeWrapper/LocaleWrapper';

const app = (
  <BrowserRouter>
    <Provider store={store()}>
      <LocaleWrapper>
        <App />
      </LocaleWrapper>
    </Provider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(app);
