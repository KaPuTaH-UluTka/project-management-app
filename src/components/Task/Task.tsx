import { Box, ListItem, Button } from '@mui/material';
import { ColumnType, TaskType } from '../../types/types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '../../hooks/hooks';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/api/signApi';

export const Task = (props: { task: TaskType; column: ColumnType }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [nameUser, setNameUser] = useState('');
  const findName = async () => {
    const data = (await (
      await dispatch(getUser(props.task.userId))
    ).payload) as { data: { name: string } };
    setTimeout(() => setNameUser(data.data.name), 300);
  };
  useEffect(() => {
    findName();
  }, []);

  return (
    <ListItem
      style={{
        background: 'white',
        fontSize: 14,
        width: '95%',
        display: 'block',
        margin: '0px auto',
        cursor: 'pointer',
        borderBottom: '1px solid black',
        borderRadius: '10px 0',
        padding: '5px 10px',
      }}
    >
      <Box style={{ display: 'flex' }}>
        <AccountCircleIcon style={{ margin: 'auto 10px auto 0px' }} />
        {nameUser ? (
          <p style={{ margin: 'auto 0' }}>{nameUser}</p>
        ) : (
          <CircularProgress style={{ height: 20, width: 20, margin: 'auto 10px' }} />
        )}
      </Box>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          fontWeight: 'bold',
          height: 30,
        }}
      >
        <p style={{ margin: 'auto 0' }}>{props.task.title}</p>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={() => {
            dispatch(
              openModal({
                boardId: boardId,
                columnId: props.column.id,
                taskId: props.task.id,
                modal: 'confirmModal',
              })
            );
          }}
        >
          <FormattedMessage id="column.del" defaultMessage="Delete" />
        </Button>
      </div>
    </ListItem>
  );
};
