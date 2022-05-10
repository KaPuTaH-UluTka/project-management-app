import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { ColumnType } from '../../types/types';
import { useState } from 'react';
import Add from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { addTask } from '../../store/api/taskApi';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

export const Column = (props: { column: ColumnType }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { board } = useAppSelector((state) => state.apiReducer);
  const [titleColumnState, setTitleColumnState] = useState(false);
  const [titleColumn, setTitleColumn] = useState(props.column.title);
  return (
    <>
      {titleColumnState ? (
        <ListItem
          style={{
            minWidth: 200,
            width: '100%',
            justifyContent: 'space-between',
            padding: '10px',
          }}
        >
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={() => {
              setTitleColumn(props.column.title);
              setTitleColumnState(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={() => setTitleColumnState(false)}
          >
            Submit
          </Button>
          <Input
            style={{ maxWidth: 100 }}
            placeholder="Write title"
            color="info"
            value={titleColumn}
            onChange={(e) => setTitleColumn(e.target.value)}
          />
        </ListItem>
      ) : (
        <ListItem
          style={{ minWidth: 200, fontSize: 14, width: '100%', justifyContent: 'space-between' }}
        >
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => {
              dispatch(openModal({ boardId: boardId, columnId: props.column.id }));
            }}
          >
            Delete
          </Button>
          <ListItemText style={{ textAlign: 'right' }} onClick={() => setTitleColumnState(true)}>
            {titleColumn}
          </ListItemText>
        </ListItem>
      )}
      <List style={{ background: 'gainsboro', margin: 5 }}>
        {props.column?.tasks?.map((task, index) => {
          return (
            <ListItem
              key={index}
              style={{
                background: 'white',
                fontSize: 14,
                width: '95%',
                justifyContent: 'space-between',
                margin: '0px auto',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: '1px solid black',
              }}
            >
              {task.title}
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={() => {
                  dispatch(
                    openModal({ boardId: boardId, columnId: props.column.id, taskId: task.id })
                  );
                }}
              >
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
      <ListItem style={{ margin: '0px auto' }}>
        <Button
          style={{ width: '90%', margin: '0 auto' }}
          color="success"
          variant="outlined"
          onClick={() => {
            let order = 1;
            const userId = localStorage.getItem('userID') || '';
            const columnId = props.column.id;
            const tasks = props.column.tasks;
            // console.log(props.column.tasks);
            if (tasks?.length > 0) {
              order = Number(tasks[tasks.length - 1].order) + 1;
            }
            if (boardId) {
              dispatch(
                addTask({
                  columnId,
                  userId,
                  boardId,
                  title: 'new task',
                  description: 'blabla',
                  order,
                })
              );
            }
          }}
        >
          <Add /> <ListItemText style={{ fontSize: 20 }}>Add Task</ListItemText>
        </Button>
      </ListItem>
    </>
  );
};
