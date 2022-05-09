import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import BoardList from '../../components/BoardList/BoardList';
import { checkBoards } from '../../store/api/boardApi';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
export const Main = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.loginReducer);
  useEffect(() => {
    dispatch(checkBoards(null));
  }, []);
  const mainBoards = boards.length > 0 ? <BoardList boards={boards} /> : null;
  return <Container fixed>{mainBoards}</Container>;
};
