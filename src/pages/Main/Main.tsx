import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import BoardList from '../../components/BoardList/BoardList';
import { checkBoards } from '../../store/api/boardApi';
import { useEffect } from 'react';
import Container from '@mui/material/Container';
import setContent from '../../utils/setContent';

const Main = () => {
  const dispatch = useAppDispatch();
  const { boards, process } = useAppSelector((state) => state.apiReducer);
  useEffect(() => {
    dispatch(checkBoards());
  }, []);
  const mainBoards = setContent(process, () => <BoardList boards={boards} />);
  return <Container fixed>{mainBoards}</Container>;
};

export default Main;
