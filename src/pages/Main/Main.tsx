import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import BoardList from '../../components/BoardList/BoardList';
// import { checkBoards } from '../../store/Reducer/boardReducer/boardReducer';
// import { useEffect } from 'react';
import Container from '@mui/material/Container';
export const Main = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boardReducer);
  // use in future when complete problems with back-end
  // useEffect(() => {
  //   dispatch(checkBoards());
  // }, []);
  const mainBoards = boards.length > 0 ? <BoardList boards={boards} /> : null;
  return <Container fixed>{mainBoards}</Container>;
};
