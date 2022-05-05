import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Reducer/configReducer';

const app = (
  <BrowserRouter>
    <Provider store={store()}>
      <App />
    </Provider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(app);

reportWebVitals();
