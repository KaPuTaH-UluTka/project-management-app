import { Box, ListItem, Button } from '@mui/material';
import { ColumnType, TaskType } from '../../types/types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch } from '../../hooks/hooks';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import { getTask } from '../../store/api/taskApi';
import { getUser } from '../../store/api/signApi';
import { useParams, useLocation } from 'react-router-dom';

export const Task = (props: { task: TaskType; column: ColumnType }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { hash } = useLocation();
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
        background: hash === `#${props.task.id}` ? 'DarkOrange' : 'white',
        fontSize: 14,
        width: '95%',
        display: 'block',
        margin: '0px auto',
        cursor: 'pointer',
        borderBottom: '1px solid black',
        borderRadius: '10px 0',
        padding: '5px 10px',
      }}
      onClick={async () => {
        await dispatch(
          getTask({
            boardId: boardId as string,
            columnId: props.column.id,
            taskId: props.task.id,
          })
        );
        dispatch(
          openModal({
            modal: 'updateTaskModal',
            taskId: props.task.id,
            done: props.task.done,
            columnId: props.column.id,
          })
        );
      }}
    >
      <Box style={{ display: 'flex' }}>
        <AccountCircleIcon
          style={{
            margin: 'auto 10px auto 0px',
            color: hash === `#${props.task.id}` ? 'white' : 'black',
          }}
        />
        {nameUser ? (
          <p style={{ margin: 'auto 0', color: hash === `#${props.task.id}` ? 'white' : 'black' }}>
            {nameUser}
          </p>
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
        <p style={{ margin: 'auto 0', color: hash === `#${props.task.id}` ? 'white' : 'black' }}>
          {props.task.title}
        </p>
        <Button
          color="error"
          variant="contained"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
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
