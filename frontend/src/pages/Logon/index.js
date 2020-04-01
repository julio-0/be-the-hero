import React, { useState } from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';

import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.css';

const Logon = ({intl}) => {
  const [id, setId] = useState('');
  const history = useHistory();

  
  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      console.log(response.data.name);

      history.push('/profile');
    } catch (error) {
      alert(intl.formatMessage({id: 'Logon.logInFail'}));
    }

  }

  return (
    <div className="logon-container">
        <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogin}>
            <h1><FormattedMessage id="Logon.logInLabel"/></h1>
            <input
              placeholder={intl.formatMessage({id: 'Logon.logInInput'})} 
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <button className="button" type="submit"><FormattedMessage id="Logon.logInButton"/> </button>

            <Link className='back-link' to="/register">
                < FiLogIn size={16} color="#e02041" />
                <FormattedMessage id="Logon.noAccount"/>
            </Link>
        </form>

        </section>
        <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
export default injectIntl(Logon);