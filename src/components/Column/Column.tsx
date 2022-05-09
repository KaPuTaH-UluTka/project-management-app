import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import ListItemText from '@mui/material/ListItemText';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { ColumnType } from '../../types/types';
import { useState } from 'react';
import Add from '@mui/icons-material/Add';
export const Column = (props: { column: ColumnType }) => {
  const [titleColumnState, setTitleColumnState] = useState('ыы');
  const [titleColumn, setTitleColumn] = useState(props.column.title);
  return (
    <Container
      sx={{
        minWidth: 270,
        padding: '2px !important',
        margin: '10px 5px',
        boxShadow: '2px 2px 5px 0px black',
        background: 'ede8e8',
      }}
    >
      {titleColumnState ? (
        <ListItem
          style={{
            minWidth: 200,
            width: '100%',
            justifyContent: 'space-between',
            margin: '0px auto',
          }}
        >
          <Input
            style={{ maxWidth: 100 }}
            placeholder="Write title"
            color="info"
            value={titleColumn}
            onChange={(e) => setTitleColumn(e.target.value)}
          />
          <Button color="warning" variant="contained" size="small">
            Cancel
          </Button>
          <Button color="warning" variant="contained" size="small">
            Submit
          </Button>
        </ListItem>
      ) : (
        <ListItem
          style={{ minWidth: 200, fontSize: 14, width: '100%', justifyContent: 'space-between' }}
        >
          <ListItemText>{props.column.title}</ListItemText>
          <Button color="error" variant="contained" size="small">
            Delete
          </Button>
        </ListItem>
      )}
      <List style={{ background: 'gainsboro', margin: 5 }}>
        {props.column.tasks.map((task, index) => {
          return (
            <ListItem
              key={index}
              style={{
                background: 'white',
                fontSize: 14,
                width: '95%',
                justifyContent: 'space-between',
                margin: '0px auto',
                fontWeight: 'bold',
                cursor: 'pointer',
                borderBottom: '1px solid black',
              }}
            >
              {task.title}
              <Button color="error" variant="contained" size="small">
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>
      <ListItem style={{ margin: '0px auto' }}>
        <Button style={{ width: '90%', margin: '0 auto' }} color="success" variant="outlined">
          <Add /> <ListItemText style={{ fontSize: 20 }}>Add Task</ListItemText>
        </Button>
      </ListItem>
    </Container>
  );
};
