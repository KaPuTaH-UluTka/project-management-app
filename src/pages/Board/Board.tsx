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
export const Board = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    if (id) {
      dispatch(openBoard({ id }));
    }
  }, []);
  // console.log(board);
  return (
    <Container fixed className="board">
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
      <Grid container className="board__list">
        {board.columns.length > 0
          ? board.columns.map((column, index) => {
              return (
                <Grid key={index}>
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
          >
            <Add /> add column
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
