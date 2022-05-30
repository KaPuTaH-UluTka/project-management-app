import { Avatar, Box, Container, Link } from '@mui/material';
import mikel2003 from '../../assets/teamAvatars/mikel2003.jpg';
import anterebol from '../../assets/teamAvatars/anterebol.jpg';
import ulutka from '../../assets/teamAvatars/ulutka.jpg';

import './welcome.scss';

import welcome from '../../assets/welcome.png';
import Typography from '@mui/material/Typography';
import { FormattedMessage } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { useEffect } from 'react';

const Welcome = () => {
  const {
    createBoardModal,
    createColumnModal,
    createTaskModal,
    deleteUserModal,
    updateTaskModal,
    searchTasksModal,
  } = useAppSelector((state) => state.openModalReducer);
  const { token } = useAppSelector((state) => state.apiReducer);
  const dispatch = useAppDispatch();
  function chooseDeleteModal() {
    let modalStatus;
    if (createBoardModal || createColumnModal || createTaskModal || searchTasksModal) {
      modalStatus = 'closeCreateModal';
    } else if (deleteUserModal) {
      modalStatus = 'deleteUserModal';
    } else if (updateTaskModal) {
      modalStatus = 'updateTaskModal';
    } else {
      modalStatus = 'confirmModal';
    }
    dispatch(closeModal(modalStatus));
  }
  useEffect(() => {
    if (!token) {
      chooseDeleteModal();
    }
  }, []);
  return (
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
          src=""
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Container>
      <Box className="welcome__team">
        <Typography className="welcome__team-title">
          <FormattedMessage id="welcome.team" defaultMessage="Our team" />
        </Typography>
        <Container className="welcome__team-item">
          <Container className="avatar-wrapper">
            <Avatar className="avatar" alt="UluTkA" src={ulutka} />
          </Container>
          <Container className="welcome__team-item__info">
            <Link href="https://github.com/KaPuTaH-UluTka" target="_blank">
              @KaPuTaH-UluTka
            </Link>
            <Typography>
              <FormattedMessage
                id="welcome.ulutka"
                defaultMessage="Setup workflow, Sign In/Sign Up form, localisation, popup for errors, and some small
            features."
              />
            </Typography>
          </Container>
        </Container>
        <Container className="welcome__team-item">
          <Container className="avatar-wrapper">
            <Avatar className="avatar" alt="anterebol" src={anterebol} />
          </Container>
          <Container className="welcome__team-item__info">
            <Link href="https://github.com/anterebol" target="_blank">
              @anterebol
            </Link>
            <Typography>
              <FormattedMessage
                id="welcome.anterebol"
                defaultMessage="Routing, board page structure, drag and drop, home page, page 404 and a lot of small
            tweaks."
              />
            </Typography>
          </Container>
        </Container>
        <Container className="welcome__team-item">
          <Container className="avatar-wrapper">
            <Avatar className="avatar" alt="Mikel2003" src={mikel2003} />
          </Container>
          <Container className="welcome__team-item__info">
            <Link href="https://github.com/Mikel2003" target="_blank">
              @Mikel2003
            </Link>
            <Typography>
              <FormattedMessage
                id="welcome.mikel2003"
                defaultMessage="Suspense feature, error boundary, lazy loading component, welcome page, header and
            footer."
              />
            </Typography>
          </Container>
        </Container>
      </Box>
    </section>
  );
};

export default Welcome;
