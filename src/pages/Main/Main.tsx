import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import BoardList from '../../components/BoardList/BoardList';
import { checkBoards } from '../../store/api/boardApi';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import setContent from '../../utils/setContent';

export const Main = () => {
  const dispatch = useAppDispatch();
  const { boards, process } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    dispatch(checkBoards());
  }, []);
  const mainBoards =
    boards.length > 0 ? setContent(process, () => <BoardList boards={boards} />) : null;
  return <Container fixed>{mainBoards}</Container>;
};
