import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { ColumnType } from '../../types/types';
import { useState } from 'react';
import Add from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { Task } from '../Task/Task';
import { useAppDispatch } from '../../hooks/hooks';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { updateColumn } from '../../store/api/columnApi';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { getTask } from '../../store/api/taskApi';

export const Column = (props: { column: ColumnType; className: string }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [titleColumnState, setTitleColumnState] = useState(false);
  const [titleColumn, setTitleColumn] = useState(props.column.title);

  return (
    <List
      className={props.className}
      style={{
        backgroundColor: 'white',
        margin: '10px 5px',
        minWidth: 270,
        boxShadow: '2px 2px 5px 0px black',
        background: 'ede8e8',
      }}
    >
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
            <FormattedMessage id="column.cancel" defaultMessage="Cancel" />
          </Button>
          <Button
            color="warning"
            variant="contained"
            size="small"
            onClick={() => {
              setTitleColumnState(false);
              dispatch(
                updateColumn({
                  boardId: boardId || '',
                  columnId: props.column.id,
                  title: titleColumn,
                  order: props.column.order,
                  event: 'changeName',
                })
              );
            }}
          >
            <FormattedMessage id="column.submit" defaultMessage="Submit" />
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
              dispatch(
                openModal({ boardId: boardId, columnId: props.column.id, modal: 'confirmModal' })
              );
            }}
          >
            <FormattedMessage id="column.del" defaultMessage="Delete" />
          </Button>
          <ListItemText style={{ textAlign: 'right' }} onClick={() => setTitleColumnState(true)}>
            {titleColumn}
          </ListItemText>
        </ListItem>
      )}
      <Droppable droppableId={props.column.id} type="task">
        {(provided) => (
          <List
            style={{ background: 'gainsboro', margin: 5, maxHeight: '50vh', overflowY: 'scroll' }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.column?.tasks?.map((task, index) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <List
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <Task task={task} column={props.column} />
                    </List>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
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
            if (tasks?.length > 0) {
              order = Number(tasks[tasks.length - 1].order) + 1;
            }
            if (boardId) {
              dispatch(
                openModal({
                  columnId,
                  userId,
                  modal: 'createTaskModal',
                  order,
                })
              );
            }
          }}
        >
          <Add />{' '}
          <ListItemText style={{ fontSize: 20 }}>
            <FormattedMessage id="column.addTask" defaultMessage="Add task" />
          </ListItemText>
        </Button>
      </ListItem>
    </List>
  );
};
