import { useEffect } from 'react';
import { List, ListItem, Box, Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { pathes } from '../../pathes/pathes';
import { closeModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';

export const TasksModal = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.apiReducer);
  useEffect(() => console.log(tasks), [tasks]);
  return (
    <Box>
      <List>
        {tasks.map((task, index) => {
          return (
            <ListItem
              key={index}
              style={{
                display: 'block',
                marginBottom: 20,
                borderRadius: 15,
                background: 'radial-gradient(at top, #feffff, #a7cecc)',
              }}
            >
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={'Task title:'} />
                <ListItemText style={{ textAlign: 'right' }} primary={task.title} />
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={'Task description:'} />
                <ListItemText style={{ textAlign: 'right' }} primary={task.description} />
              </Box>
              <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItemText primary={'User name:'} />
                <ListItemText style={{ textAlign: 'right' }} primary={task.user.name} />
              </Box>
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
