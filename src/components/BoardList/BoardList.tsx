import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Star from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { pathes } from '../../pathes/pathes';
import { useAppDispatch } from '../../hooks/hooks';
import { openModal } from '../../store/Reducer/confirmationReducer/confirmationReducer';
import './boardList.scss';
import { FormattedMessage } from 'react-intl';
import { Container } from '@mui/material';
import { takeAllTasks } from '../../store/api/taskApi';
import { formBoxStyles, searchValueStyles, selectStyle } from './boardListSyles';

export default function BoardList(props: {
  boards: {
    title: string;
    description: string;
    id: string;
  }[];
}) {
  const validationSchema = yup.object({
    search: yup.string().required('Write search info'),
    select: yup.string().required('Choise your search selector'),
  });
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      search: '',
      select: 'Choise search option',
    },
    validationSchema: validationSchema,
    onSubmit: (e) => {
      dispatch(openModal({ modal: 'SearchTasksModal' }));
      dispatch(takeAllTasks({ select: e.select, searchValue: e.search }));
    },
  });

  const activeSubmit = () => {
    return formik.errors.search !== undefined || formik.values.select === 'Choise search option';
  };
  return (
    <Container>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box sx={formBoxStyles}>
          <Box>
            <InputLabel id="label-search">Search task value</InputLabel>
            <TextField
              style={searchValueStyles}
              variant="outlined"
              id="search"
              name="search"
              placeholder="Write search info"
              value={formik.values.search}
              onChange={(e) => {
                formik.handleChange(e);
                activeSubmit();
              }}
              error={formik.touched.search}
            />
          </Box>
          <Box>
            <InputLabel id="label-select">Search task option</InputLabel>
            <Select
              style={selectStyle}
              id="select"
              name="select"
              variant="outlined"
              labelId="label-select"
              value={formik.values.select}
              onChange={(e) => {
                formik.handleChange(e);
                activeSubmit();
              }}
              error={formik.touched.select}
            >
              <MenuItem value="Choise search option" disabled>
                Choise search option
              </MenuItem>
              <MenuItem value="user">User name</MenuItem>
              <MenuItem value="description">Description</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </Box>

          <Button
            style={{
              height: 40,
              position: 'relative',
              top: 30,
            }}
            variant="contained"
            color="success"
            type="submit"
            disabled={activeSubmit()}
          >
            <FormattedMessage id="search" defaultMessage="Search" />
          </Button>
        </Box>
      </form>
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
                <ListItemText primary={board.description} />
                <Button
                  className="list__item-button"
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(openModal({ boardId: board.id, modal: 'confirmModal' }));
                  }}
                >
                  <FormattedMessage id="boardList.del" defaultMessage="Delete" />
                </Button>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Container>
  );
}
