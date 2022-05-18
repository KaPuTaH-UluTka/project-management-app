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
import { addColumn } from '../../store/api/columnApi';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import BasicModal from '../../hoc/BasicModal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
import { FormattedMessage } from 'react-intl';

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
  // useEffect(() => console.log(board.columns), [board]);
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
          <FormattedMessage id="board.return" defaultMessage="Return" />
        </Button>
      </ListItem>
      <DragDropContext onDragEnd={() => {}}>
        <Grid className="board__list">
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Box
                style={{ display: 'flex', flexWrap: 'nowrap' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columns.map((column, index) => {
                  return (
                    <Draggable key={index} draggableId={column.id} index={index}>
                      {(provided) => (
                        <Grid {...provided.draggableProps} ref={provided.innerRef}>
                          <div {...provided.dragHandleProps}>
                            <Column column={column} />
                          </div>
                        </Grid>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
          <Button
            size="large"
            style={{
              height: 40,
              minWidth: '210px',
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
            <Add /> <FormattedMessage id="board.addColumn" defaultMessage="Add column" />
          </Button>
        </Grid>
      </DragDropContext>
    </Container>
  );
};
