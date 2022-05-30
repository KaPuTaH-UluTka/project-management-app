import React from 'react';
import { Switch } from '@mui/material';
import langSwitchStyle from './langSwitchStyle';
import { setLangEn, setLangRu } from '../../store/Reducer/langReducer/langReducer';
import { useAppDispatch } from '../../hooks/hooks';

const LangSwitch = () => {
  const [toggled, setToggled] = React.useState(localStorage.getItem('lang') || 'En');
  const dispatch = useAppDispatch();
  function toggle(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      setToggled('Ru');
      dispatch(setLangRu());
    } else {
      setToggled('En');
      dispatch(setLangEn());
    }
  }

  return (
    <div>
      <Switch sx={langSwitchStyle} checked={toggled !== 'En'} onChange={(e) => toggle(e)} />
    </div>
  );
};

export default LangSwitch;
