import logo from '../../assets/rs-school.png';

import './footer.scss';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <img src={logo} alt="rs logo" />
          </div>

          <div className="footer__developers">
            <div className="footer__developers-title">
              <FormattedMessage id="footer.devs" defaultMessage="Developers:" />
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/KaPuTaH-UluTka">Alex</a>
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/anterebol">Aleksey</a>
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/Mikel2003">Mikhail</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
