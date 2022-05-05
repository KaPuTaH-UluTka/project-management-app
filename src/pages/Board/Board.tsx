import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
export const Board = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boardReducer);
  return <div>Board</div>;
};
