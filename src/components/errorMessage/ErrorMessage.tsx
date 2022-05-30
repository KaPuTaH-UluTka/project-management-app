import './errorMessage.scss';

import error from '../../assets/robot.gif';
import { FormattedMessage } from 'react-intl';

const ErrorMessage = () => {
  return (
    <div className="error">
      <img className="error__img" src={error} alt="loading" />
      <h4 className="error__title">
        <FormattedMessage id="errorPage.text" defaultMessage="Something went wrong..." />
      </h4>
    </div>
  );
};

export default ErrorMessage;
