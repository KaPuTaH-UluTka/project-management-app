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
import { addColumn, updateColumn } from '../../store/api/columnApi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import BasicModal from '../../hoc/BasicModal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import { endDragnColumn, endDragnTask } from '../../store/Reducer/apiReducer/apiReducer';
import { ViewColumnSharp } from '@mui/icons-material';

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
        onDragUpdate={() => {}}
        onDragEnd={(result) => {
          const { destination, source, draggableId } = result;
          switch (result.type) {
            case 'task':
              // const draggableId = result.draggableId;
              const beforeDroppableId = result.source.droppableId;
              const currentIndexColumn = board.columns.findIndex(
                (column) => column.id === beforeDroppableId
              );
              const currentTask = board.columns[currentIndexColumn].tasks.filter(
                (task) => task.id === draggableId
              );
              dispatch(endDragnTask({ result, currentTask }));
              break;
            case 'column':
              const currentColumn = board.columns[result.source.index];
              const beforeIndex = source.index;
              const currentIndex = destination?.index || 0;
              const currentState = [...board.columns];
              console.log(result);
              currentState.splice(beforeIndex, 1);
              currentState.splice(currentIndex, 0, currentColumn);
              let timer = 10;
              if (currentIndex > beforeIndex) {
                const currentColumns = currentState.map((item, index) => {
                  const column = { ...item };

                  if (index >= beforeIndex && index < currentIndex) {
                    column.order -= 1;
                    setTimeout(() => {
                      dispatch(
                        updateColumn({
                          boardId: boardId,
                          columnId: column.id,
                          title: column.title,
                          order: column.order,
                          event: 'addEndPosition',
                        })
                      );
                    }, timer);
                    timer += 100;
                  } else if (index === currentIndex) {
                    column.order = index !== 0 ? currentState[index - 1].order : 1;
                    setTimeout(() => {
                      dispatch(
                        updateColumn({
                          boardId: boardId,
                          columnId: column.id,
                          title: column.title,
                          order: column.order,
                          event: 'addEndPosition',
                        })
                      );
                    }, timer);
                  }
                  return column;
                });
                dispatch(endDragnColumn({ currentColumns }));
              } else if (currentIndex < beforeIndex) {
                const revArray = currentState.reverse();
                const currentColumnsRev = revArray.map((item, index) => {
                  const column = { ...item };
                  console.log(currentIndex, beforeIndex);

                  if (
                    index >= revArray.length - 1 - beforeIndex &&
                    index < revArray.length - 1 - currentIndex
                  ) {
                    column.order += 1;
                    setTimeout(() => {
                      dispatch(
                        updateColumn({
                          boardId: boardId,
                          columnId: column.id,
                          title: column.title,
                          order: column.order,
                          event: 'addEndPosition',
                        })
                      );
                    }, timer);
                    timer += 100;
                  } else if (index === revArray.length - 1 - currentIndex) {
                    column.order =
                      index !== revArray.length - 1 ? currentState[index - 1].order : 1;
                    setTimeout(() => {
                      dispatch(
                        updateColumn({
                          boardId: boardId,
                          columnId: column.id,
                          title: column.title,
                          order: column.order,
                          event: 'addEndPosition',
                        })
                      );
                    }, timer);
                  }
                  return column;
                });
                const currentColumns = currentColumnsRev.reverse();
                dispatch(endDragnColumn({ currentColumns }));
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

              break;
          }
        }}
        onDragStart={(result) => {
          switch (result.type) {
            case 'task':
              console.log('task', result);
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
