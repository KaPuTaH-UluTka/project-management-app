import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Container, Slide } from '@mui/material';
import { apiErrorStyle } from './apiErrorStyle';
import { useAppDispatch } from '../../hooks/hooks';
import { shiftApiErrors } from '../../store/Reducer/apiReducer/apiReducer';
import { TransitionGroup } from 'react-transition-group';
import { useIntl } from 'react-intl';

const ApiError = (props: { errors: string[] }) => {
  const [interval, setStateInterval] = useState<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const intl = useIntl();

  function getTranslate(key: string) {
    return intl.formatMessage({ id: key });
  }
  useEffect(() => {
    if (props.errors.length > 0) {
      if (!interval) {
        setStateInterval(
          setInterval(() => {
            dispatch(shiftApiErrors());
          }, 5000)
        );
      }
    } else {
      if (interval) {
        clearInterval(interval);
      }
      setStateInterval(null);
    }
  }, [props.errors]);
  return (
    <Container sx={apiErrorStyle}>
      {props.errors.map((e, i) => {
        return (
          <TransitionGroup key={i}>
            <Slide direction={'down'}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{getTranslate(e)}</strong>
              </Alert>
            </Slide>
          </TransitionGroup>
        );
      })}
    </Container>
  );
};

export default ApiError;
