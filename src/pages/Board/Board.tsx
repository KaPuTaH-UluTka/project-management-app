import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
export const Board = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.loginReducer);
  return <div>Board</div>;
};
