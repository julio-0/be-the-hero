import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {IntlProvider} from 'react-intl';


import messages_br from "./translations/pt-BR.json";
import messages_en from "./translations/en.json";

const messages = {
    'pt-BR': messages_br,
    'en': messages_en
};

const language = messages[navigator.language] ? navigator.language : navigator.language.split(/[-_]/)[0];  
//const locale = messages[language] ? language : 'en';  
const locale = 'en';

ReactDOM.render(

  <React.StrictMode>
    <IntlProvider  locale={locale} messages={messages[locale]}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

