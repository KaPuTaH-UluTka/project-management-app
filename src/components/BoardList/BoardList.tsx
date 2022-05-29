import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
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
import { FormattedMessage, useIntl } from 'react-intl';
import { Container } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import { takeAllTasks } from '../../store/api/taskApi';
import { formBoxStyles, searchValueStyles, selectStyle } from './boardListSyles';
import { rootStyles } from '../../style/rootStyles';

export default function BoardList(props: {
  boards: {
    title: string;
    description: string;
    id: string;
  }[];
}) {
  const validationSchema = yup.object({
    search: yup.string().required('taskSearch.valuePlaceholder'),
    select: yup.string().required('taskSearch.optionPlaceholder'),
  });
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      search: '',
      select: '',
    },
    validationSchema: validationSchema,
    onSubmit: (e) => {
      dispatch(openModal({ modal: 'SearchTasksModal' }));
      dispatch(takeAllTasks({ select: e.select, searchValue: e.search }));
    },
  });

  const titleCutter = (title: string) => {
    if (title.length > 6) {
      return title.slice(0, 6) + '...';
    } else return title;
  };

  const descCutter = (desc: string) => {
    if (desc.length > 10) {
      return desc.slice(0, 10) + '...';
    } else return desc;
  };

  const activeSubmit = () => {
    return !(formik.errors.search === undefined && formik.values.select !== '');
  };
  function getTranslate(key: string) {
    return intl.formatMessage({ id: key });
  }
  return (
    <Container>
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box sx={formBoxStyles}>
          <Box>
            <InputLabel id="label-search">
              <FormattedMessage id="taskSearch.valueTitle" defaultMessage="Search task" />
            </InputLabel>
            <TextField
              sx={searchValueStyles}
              variant="outlined"
              id="search"
              name="search"
              placeholder={getTranslate('taskSearch.valuePlaceholder')}
              value={formik.values.search}
              onChange={(e) => {
                formik.handleChange(e);
                activeSubmit();
              }}
              error={formik.touched.search}
              helperText={
                formik.touched.search && formik.errors.search && getTranslate(formik.errors.search)
              }
            />
          </Box>
          <Box>
            <InputLabel id="label-select">
              <FormattedMessage id="taskSearch.optionTitle" defaultMessage="Search task option" />
            </InputLabel>
            <Select
              sx={selectStyle}
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
              <MenuItem value={getTranslate('taskSearch.optionPlaceholder')} disabled>
                <FormattedMessage
                  id="taskSearch.optionPlaceholder"
                  defaultMessage="Choose search option"
                />
              </MenuItem>
              <MenuItem value="user">
                <FormattedMessage id="taskSearch.optionUserName" defaultMessage="User name" />
              </MenuItem>
              <MenuItem value="description">
                <FormattedMessage id="taskSearch.optionTaskDesc" defaultMessage="Description" />
              </MenuItem>
              <MenuItem value="title">
                <FormattedMessage id="taskSearch.optionTaskTitle" defaultMessage="Title" />
              </MenuItem>
            </Select>
            <FormHelperText sx={{ color: rootStyles.red, ml: 1 }}>
              {formik.touched.select && formik.errors.select && getTranslate(formik.errors.select)}
            </FormHelperText>
          </Box>

          <Button
            sx={{
              height: 40,
              position: 'relative',
              mt: 4,
            }}
            variant="contained"
            color="success"
            type="submit"
            disabled={activeSubmit()}
          >
            <FormattedMessage id="taskSearch.submit" defaultMessage="Search" />
          </Button>
        </Box>
      </form>
      <List className="list">
        {props.boards.map((board, index) => {
          return (
            <Link to={`${pathes.board}/${board.id}`} key={index}>
              <ListItem className="list__item">
                <Container className="list__item-info">
                  <ListItemAvatar>
                    <Avatar className="list__item-info__avatar">
                      <AssignmentTurnedInIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={titleCutter(board.title)} />
                  <ListItemText primary={descCutter(board.description)} />
                </Container>
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
