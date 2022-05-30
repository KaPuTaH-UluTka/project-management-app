import React from 'react';
import { IntlProvider } from 'react-intl';
import English from '../../lang/en.json';
import Russian from '../../lang/ru.json';
import { useAppSelector } from '../../hooks/hooks';

const LocaleWrapper = (props: { children: JSX.Element }) => {
  const local = useAppSelector((state) => state.langReducer.lang);
  let lang;
  local === 'En' ? (lang = English) : (lang = Russian);
  return (
    <IntlProvider locale={local} messages={lang}>
      {props.children}
    </IntlProvider>
  );
};

export default LocaleWrapper;
