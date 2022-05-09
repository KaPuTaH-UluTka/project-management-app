import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
export const Board = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.apiReducer);
  return <div>Board</div>;
};
