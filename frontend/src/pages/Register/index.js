import React, { useState } from 'react';
import {injectIntl, FormattedMessage} from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';


const Register = ({intl}) => {     
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name, 
            email,
            whatsapp,
            city,
            uf,
        };


        try {
            const response = await api.post('ongs', data);
            //alert(`Seu ID de acesso: ${response.data.id}`);    
            alert(intl.formatMessage({id: 'Register.idCreated'}) + `${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert(intl.formatMessage({id: 'Register.createFail'}));
        }

    }

  return (
    <div className="register-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />
                <h1><FormattedMessage id="Register.title" /></h1>
                <p><FormattedMessage id="Register.instructions" />
                </p>
                <Link className="back-link" to="/">
                    < FiArrowLeft size={16} color="#e02041" />
                    <FormattedMessage id="Register.backLogon" />
                </Link>

            </section>
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder={intl.formatMessage({id: 'Register.namePlaceHolder'})}
                    value={name}
                    onChange={e=> setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder={intl.formatMessage({id: 'Register.emailPlaceHolder'})}
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder={intl.formatMessage({id: 'Register.whatsappPlaceHolder'})}
                    value={whatsapp}
                    onChange={e=> setWhatsapp(e.target.value)}
                />
                <div className="input-group">
                    <input 
                    type="text" 
                    placeholder={intl.formatMessage({id: 'Register.cityPlaceHolder'})}
                    value={city}
                    onChange={e=> setCity(e.target.value)}
                    />
                    <input 
                    type="text" 
                    placeholder={intl.formatMessage({id: 'Register.statePlaceHolder'})}
                    style={{ width: 80 }} 
                    value={uf}
                    onChange={e=> setUf(e.target.value)}
                    />
                </div>

                <button className="button" type="submit"><FormattedMessage id="Register.buttonCreate" /></button>
            </form>
        </div>
    </div>
  );
}
export default injectIntl(Register);