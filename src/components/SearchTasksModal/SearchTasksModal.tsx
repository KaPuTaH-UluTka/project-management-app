import { List, ListItem, Box, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

const boxInfoStyle = { display: 'flex', justifyContent: 'space-between' };
const listItemStyle = {
  display: 'block',
  marginBottom: 20,
  borderRadius: 15,
  background: 'radial-gradient(at top, #feffff, #a7cecc)',
};

const addBoxInfo = (option: string, info: string) => {
  return (
    <Box style={boxInfoStyle}>
      <ListItemText primary={option} />
      <ListItemText style={{ textAlign: 'right' }} primary={info} />
    </Box>
  );
};

export const TasksModal = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.apiReducer);
  return (
    <Box style={{ overflow: 'scroll', maxHeight: '500px' }}>
      <List>
        {tasks.map((task, index) => {
          return (
            <ListItem key={index} style={listItemStyle}>
              {addBoxInfo('Task title:', task.title)}
              {addBoxInfo('Task description:', task.description)}
              {addBoxInfo('User name:', task.user.name)}
              <Box style={{ width: '100%', textAlign: 'right' }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(closeModal('closeCreateModal'));
                  }}
                >
                  <Link to={`${pathes.board}/${task.boardId}/#${task.id}`}>
                    <FormattedMessage id="tasksList.del" defaultMessage="Follow" />
                  </Link>
                </Button>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
