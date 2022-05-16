import logo from '../../assets/rs-school.png';

import './footer.scss';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__logo">
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={logo} alt="rs logo" />
            </a>
          </div>

          <div className="footer__developers">
            <div className="footer__developers-title">
              <FormattedMessage id="footer.devs" defaultMessage="Developers:" />
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/KaPuTaH-UluTka" target="_blank" rel="noreferrer">
                Alex
              </a>
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/anterebol" target="_blank" rel="noreferrer">
                Aleksey
              </a>
            </div>
            <div className="footer__developers-name">
              <a href="https://github.com/Mikel2003" target="_blank" rel="noreferrer">
                Mikhail
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
