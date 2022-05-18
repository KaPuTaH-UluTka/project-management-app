import './board.scss';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { openBoard } from '../../store/api/boardApi';
import { useEffect } from 'react';
import { Column } from '../../components/Column/Column';
import { Box, ListItem } from '@mui/material';
import { addColumn, changePositionColumn, updateColumn } from '../../store/api/columnApi';
import { DragDropContext, Draggable, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import BasicModal from '../../hoc/BasicModal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import { endDragnColumn, endDragnTask } from '../../store/Reducer/apiReducer/apiReducer';
import { updateTask } from '../../store/api/taskApi';
import { TaskType } from '../../types/types';

export const Board = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    if (boardId) {
      dispatch(openBoard({ boardId }));
    }
  }, []);
  useEffect(() => console.log(board.columns), [board]);
  return (
    <Container fixed className="board">
      <BasicModal title="Confirmation">
        <ConfirmationModal />
      </BasicModal>
      <ListItem style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{board.title}</h1>
        <Button
          className="board-button"
          variant="contained"
          onClick={() => {
            navigate(-1);
          }}
        >
          Return
        </Button>
      </ListItem>
      <DragDropContext
        onDragEnd={async (result) => {
          const { source, draggableId } = result;
          const destination = result.destination as DraggableLocation;
          const currentState = [...board.columns];
          switch (result.type) {
            case 'task':
              const beforeDroppableId = result.source.droppableId;
              if (destination) {
                const droppableId = destination.droppableId;
                // const draggableId = result.draggableId;
                const currentIndexColumn = board.columns.findIndex(
                  (column) => column.id === beforeDroppableId
                );
                const currentTask = currentState[currentIndexColumn].tasks.filter(
                  (task) => task.id === draggableId
                )[0];
                const currentColumn = currentState.filter((column) => column.id === droppableId)[0];
                const oldColumnIndex = currentState.findIndex(
                  (column) => column.id === source.droppableId
                );
                let oldColumnTasks = [
                  ...(currentState[oldColumnIndex].tasks.map((task, index) => {
                    const currentValue = { ...task };
                    if (currentValue.id !== currentTask.id) {
                      if (index > source.index) {
                        currentValue.order -= 1;
                      }
                      return currentValue;
                    }
                    return;
                  }) as Array<TaskType>),
                ];
                oldColumnTasks = oldColumnTasks.filter((task) => task !== undefined);
                const newColumnIndex = currentState.findIndex(
                  (column) => column.id === destination?.droppableId
                );
                let currentColumnTasks =
                  newColumnIndex !== oldColumnIndex
                    ? [
                        ...currentState[newColumnIndex].tasks.map((task) => {
                          return { ...task };
                        }),
                      ]
                    : [...oldColumnTasks];
                currentColumnTasks.length > 0
                  ? currentColumnTasks.splice(destination?.index, 0, {
                      ...currentTask,
                    })
                  : (currentColumnTasks = [{ ...currentTask }]);
                currentColumnTasks = currentColumnTasks.map((task, index) => {
                  const currentOrder =
                    index !== 0
                      ? index + 1 !== currentColumnTasks.length
                        ? currentColumnTasks[index + 1].order
                        : currentColumnTasks[index - 1].order + 1
                      : 1;
                  if (index === destination.index && currentOrder !== task.order) {
                    task.order = currentOrder;
                  } else if (index > destination.index) {
                    task.order = task.order + 1;
                  }
                  return task;
                });
                console.log(oldColumnTasks, currentColumnTasks);
                dispatch(
                  endDragnTask({
                    oldColumnIndex,
                    newColumnIndex,
                    oldColumnTasks,
                    currentColumnTasks,
                  })
                );
                const order =
                  currentColumn.tasks.length > 0
                    ? currentColumn.tasks[currentColumn.tasks.length - 1].order + 1
                    : 1;
                await dispatch(
                  updateTask({
                    boardId: boardId,
                    oldColumnId: droppableId,
                    newColumnId: droppableId,
                    userId: currentTask.userId,
                    title: currentTask.title,
                    order,
                    description: currentTask.description,
                    taskId: currentTask.id,
                    done: currentTask.done,
                    // event: 'addEndPosition',
                  })
                );
                for (let i = 0; i < oldColumnTasks.length; i++) {
                  await dispatch(
                    updateTask({
                      boardId,
                      oldColumnId: beforeDroppableId,
                      newColumnId: beforeDroppableId,
                      title: oldColumnTasks[i].title,
                      order: oldColumnTasks[i].order,
                      description: oldColumnTasks[i].description,
                      userId: oldColumnTasks[i].userId,
                      taskId: oldColumnTasks[i].id,
                      done: oldColumnTasks[i].done,
                    })
                  );
                }
                const revCurrentTasks = [...currentColumnTasks];
                revCurrentTasks.reverse();
                for (let i = 0; i <= revCurrentTasks.length - 1 - destination.index; i++) {
                  if (i === revCurrentTasks.length - 1 - destination.index) {
                    await dispatch(
                      updateTask({
                        boardId,
                        oldColumnId: beforeDroppableId,
                        newColumnId: destination?.droppableId,
                        title: revCurrentTasks[i].title,
                        order: revCurrentTasks[i].order,
                        description: revCurrentTasks[i].description,
                        userId: revCurrentTasks[i].userId,
                        taskId: revCurrentTasks[i].id,
                        done: revCurrentTasks[i].done,
                      })
                    );
                  } else {
                    await dispatch(
                      updateTask({
                        boardId,
                        oldColumnId: destination?.droppableId,
                        newColumnId: destination?.droppableId,
                        title: revCurrentTasks[i].title,
                        order: revCurrentTasks[i].order,
                        description: revCurrentTasks[i].description,
                        userId: revCurrentTasks[i].userId,
                        taskId: revCurrentTasks[i].id,
                        done: revCurrentTasks[i].done,
                      })
                    );
                  }
                }
              }
              break;
            case 'column':
              const currentColumn = board.columns[result.source.index];
              const beforeIndex = source.index;
              const currentIndex = destination?.index || 0;
              currentState.splice(beforeIndex, 1);
              currentState.splice(currentIndex, 0, currentColumn);
              if (currentIndex > beforeIndex) {
                const currentColumns = currentState.map((item, index) => {
                  const column = { ...item };

                  if (index >= beforeIndex && index < currentIndex) {
                    column.order -= 1;
                  } else if (index === currentIndex) {
                    column.order = index !== 0 ? currentState[index - 1].order : 1;
                  }
                  return column;
                });
                dispatch(endDragnColumn({ currentColumns }));
                for (let i = 0; i < currentColumns.length; i++) {
                  const data = await changePositionColumn({
                    boardId: boardId,
                    columnId: currentColumns[i].id,
                    title: currentColumns[i].title,
                    order: currentColumns[i].order,
                    event: 'addEndPosition',
                  });
                }
              } else if (currentIndex < beforeIndex) {
                const revArray = currentState.reverse();
                const currentColumnsRev = revArray.map((item, index) => {
                  const column = { ...item };
                  if (
                    index >= revArray.length - 1 - beforeIndex &&
                    index < revArray.length - 1 - currentIndex
                  ) {
                    column.order += 1;
                  } else if (index === revArray.length - 1 - currentIndex) {
                    column.order =
                      index !== revArray.length - 1 ? currentState[index - 1].order : 1;
                  }
                  return column;
                });
                const columnsApi = [...currentColumnsRev];
                const currentColumns = currentColumnsRev.reverse();
                dispatch(endDragnColumn({ currentColumns }));
                for (let i = 0; i < columnsApi.length; i++) {
                  const data = await changePositionColumn({
                    boardId: boardId,
                    columnId: columnsApi[i].id,
                    title: columnsApi[i].title,
                    order: columnsApi[i].order,
                    event: 'addEndPosition',
                  });
                }
              } else if (currentIndex === beforeIndex) {
                dispatch(
                  updateColumn({
                    boardId: boardId,
                    columnId: currentColumn.id,
                    title: currentColumn.title,
                    order: currentColumn.order,
                    event: 'addEndPosition',
                  })
                );
              }
              dispatch(endDragnTask({ currentState }));
              break;
          }
        }}
        onDragStart={(result) => {
          switch (result.type) {
            case 'task':
              console.log('task', result);
              // const droppableId = result.source.droppableId;
              // const draggableId = result.draggableId;
              // const currentColumn = board.columns.filter((column) => column.id === droppableId)[0];
              // const currentTask = currentColumn.tasks.filter((task) => task.id === draggableId)[0];
              // console.log(currentTask);
              // const order = currentColumn.tasks[currentColumn.tasks.length - 1].order + 1;
              // dispatch(
              //   updateTask({
              //     boardId: boardId,
              //     oldColumnId: droppableId,
              //     newColumnId: droppableId,
              //     userId: currentTask.userId,
              //     title: currentTask.title,
              //     order,
              //     description: currentTask.description,
              //     taskId: currentTask.id,
              //     done: false,
              //     // event: 'addEndPosition',
              //   })
              // );
              break;
            case 'column':
              dispatch(
                updateColumn({
                  boardId: boardId,
                  columnId: result.draggableId,
                  title: board.columns.filter((column) => column.id === result.draggableId)[0]
                    .title,
                  order: board.columns[board.columns.length - 1].order + 1,
                  event: 'addEndPosition',
                })
              );
              break;
          }
        }}
      >
        <Grid className="board__list">
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <div
                style={{ display: 'flex', flexWrap: 'nowrap' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columns.map((column, index) => {
                  return (
                    <Draggable key={column.id} draggableId={column.id} index={index}>
                      {(provided) => (
                        <div {...provided.draggableProps} ref={provided.innerRef}>
                          <div {...provided.dragHandleProps}>
                            <Column column={column} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Button
            size="large"
            style={{
              height: 40,
              minWidth: '150px',
              position: 'relative',
              top: 10,
              left: 20,
            }}
            onClick={() => {
              let order = 1;
              if (board.columns?.length > 0) {
                order = Number(board.columns[board.columns.length - 1].order) + 1;
              }
              if (boardId) {
                dispatch(
                  addColumn({
                    boardId,
                    title: 'new task',
                    order,
                  })
                );
              }
            }}
          >
            <Add /> add column
          </Button>
        </Grid>
      </DragDropContext>
    </Container>
  );
};
