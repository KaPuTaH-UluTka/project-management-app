import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Star from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import { pathes } from '../../pathes/pathes';
import { useAppDispatch } from '../../hooks/hooks';
import BasicModal from '../confirmation/Confirmation';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import './boardList.scss';

export default function BoardList(props: {
  boards: {
    title: string;
    id: string;
  }[];
}) {
  const dispatch = useAppDispatch();
  return (
    <List className="list">
      <BasicModal />
      {props.boards.map((board, index) => {
        return (
          <Link to={`${pathes.board}/${board.id}`} key={index}>
            <ListItem className="list__item">
              <ListItemAvatar>
                <Avatar sx={{}} className="list__item-avatar">
                  <Star />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={board.title} />
              <Button
                className="list__item-button"
                variant="contained"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(openModal());
                }}
              >
                Delete
              </Button>
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
