import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { ColumnType } from '../../types/types';
import React, { useState } from 'react';
import Add from '@mui/icons-material/Add';
import { useLocation, useParams } from 'react-router-dom';
import { Task } from '../Task/Task';
import { useAppDispatch } from '../../hooks/hooks';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import { updateColumn } from '../../store/api/columnApi';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';
import { listColumnStyles, itemColumnStyles, titleColumnStyles } from './columnStyles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, IconButton, ThemeProvider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { violetTheme } from '../../style/rootStyles';

export const Column = (props: { column: ColumnType; className: string }) => {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const { hash } = useLocation();
  const [titleColumnState, setTitleColumnState] = useState(false);
  const [titleColumn, setTitleColumn] = useState(props.column.title);

  const validationSchema = yup.object({
    titleColumn: yup.string().min(3).required(),
  });
  const columnForm = useFormik({
    initialValues: {
      titleColumn: titleColumn,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setTitleColumnState(false);
      setTitleColumn(columnForm.values.titleColumn);
      dispatch(
        updateColumn({
          boardId: boardId || '',
          columnId: props.column.id,
          title: columnForm.values.titleColumn,
          order: props.column.order,
          event: 'changeName',
        })
      );
    },
  });

  function activateSubmit() {
    if (!columnForm.errors.titleColumn) {
      return false;
    } else return true;
  }

  return (
    <ThemeProvider theme={violetTheme}>
      <List className={props.className} style={listColumnStyles}>
        {titleColumnState ? (
          <ListItem sx={itemColumnStyles}>
            <Box component="form" onSubmit={columnForm.handleSubmit}>
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
                type="submit"
                disabled={activateSubmit()}
              >
                <FormattedMessage id="column.submit" defaultMessage="Submit" />
              </Button>
              <Input
                id="titleColumn"
                style={{ maxWidth: 100 }}
                placeholder="Write title"
                color="info"
                value={columnForm.values.titleColumn}
                onChange={columnForm.handleChange}
                error={columnForm.touched.titleColumn && Boolean(columnForm.errors.titleColumn)}
              />
            </Box>
          </ListItem>
        ) : (
          <ListItem style={titleColumnStyles}>
            <IconButton
              color={'primary'}
              onClick={() => {
                dispatch(
                  openModal({ boardId: boardId, columnId: props.column.id, modal: 'confirmModal' })
                );
              }}
            >
              <ClearIcon />
            </IconButton>
            <ListItemText style={{ textAlign: 'right' }} onClick={() => setTitleColumnState(true)}>
              {titleColumn}
            </ListItemText>
          </ListItem>
        )}
        <Droppable droppableId={props.column.id} type="task">
          {(provided) => (
            <List
              className={props.className ? 'column-scroll' : ''}
              style={{ background: 'gainsboro', margin: 5, maxHeight: '50vh', overflowY: 'scroll' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.column?.tasks?.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <List
                        className={`#${task.id}` === hash ? 'current-task' : ''}
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
        <ListItem sx={{ margin: '0 auto' }}>
          <Button
            style={{ width: '90%', margin: '0 auto' }}
            color="primary"
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
    </ThemeProvider>
  );
};
