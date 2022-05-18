import React from 'react';
import { Switch } from '@mui/material';
import langSwitchStyle from './langSwitchStyle';
import { setLangEn, setLangRu } from '../../store/Reducer/langReducer/langReducer';
import { useAppDispatch } from '../../hooks/hooks';

const LangSwitch = () => {
  const [toggled, setToggled] = React.useState(false);
  const dispatch = useAppDispatch();
  function toggle(e: React.ChangeEvent<HTMLInputElement>) {
    setToggled(!toggled);
    e.target.checked ? dispatch(setLangRu()) : dispatch(setLangEn());
  }
  return (
    <div>
      <Switch sx={langSwitchStyle} checked={toggled} onChange={(e) => toggle(e)} />
    </div>
  );
};

export default LangSwitch;
