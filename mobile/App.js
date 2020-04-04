import React from 'react';
import Routes from './src/routes';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import 'intl/locale-data/jsonp/en-US';
import 'intl/locale-data/jsonp/en';

import LocalizationProvider from '../mobile/src/services/LocalizationProvider';

export default function App() {
  return (
    <LocalizationProvider>
      <Routes />
    </LocalizationProvider>        
  );
}

