import { Container } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import { Navigate } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';

import './welcome.scss';

import welcome from '../../assets/welcome.png';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';

const Welcome = () => {
  const { token } = useAppSelector((state) => state.apiReducer);
  return token ? (
    <Navigate to={pathes.main} />
  ) : (
    <section className="welcome">
      <Container maxWidth="lg">
        <div className="welcome__inner">
          <div className="welcome__info">
            <h1 className="welcome__info-title">
              <FormattedMessage id="welcome.title" defaultMessage="Welcome to our RS-Trello" />
            </h1>
            <div className="welcome__info-descr">
              <FormattedMessage id="welcome.info" />
            </div>
            <div className="welcome__info-developers">
              <b>
                <FormattedMessage
                  id="welcome.created"
                  defaultMessage="The project was created by:"
                />{' '}
              </b>
              <a href="">@KaPuTaH-UluTka</a>, <a href="">@anterebol</a>, <a href="">@Mikel2003</a>
            </div>
          </div>

          <div className="welcome__img">
            <img src={welcome} alt="greeting image" />
          </div>
        </div>
      </Container>
      <Container
        sx={{ mx: 'auto', p: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography sx={{ fontSize: 20 }}>
          <FormattedMessage id="welcome.review" defaultMessage="Short review" />
        </Typography>
        <iframe
          className="welcome__iframe"
          width="560"
          height="315"
          src=""
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Container>
    </section>
  );
};

export default Welcome;
