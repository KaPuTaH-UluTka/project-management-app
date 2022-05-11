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
import { ListItem } from '@mui/material';
import { addColumn } from '../../store/api/columnApi';
import BasicModal from '../../hoc/BasicModal';
import ConfirmationModal from '../../components/confirmationModal/ConfirmationModal';
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
          Return
        </Button>
      </ListItem>
      <Grid className="board__list">
        {board.columns.length > 0
          ? board.columns.map((column, index) => {
              return (
                <Grid
                  key={index}
                  style={{
                    margin: '10px 5px',
                    minWidth: 270,
                    boxShadow: '2px 2px 5px 0px black',
                    background: 'ede8e8',
                  }}
                >
                  <Column column={column} />
                </Grid>
              );
            })
          : null}
        <Grid>
          <Button
            size="large"
            style={{
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
      </Grid>
    </Container>
  );
};
