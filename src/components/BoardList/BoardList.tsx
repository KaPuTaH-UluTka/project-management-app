import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Star from '@mui/icons-material/StarBorder';
import { pathes } from '../../pathes/pathes';
import './boardList.scss';

export default function BoardList(props: {
  boards: {
    title: string;
    id: string;
  }[];
}) {
  return (
    <List className="list">
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
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
