import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {injectIntl, FormattedMessage} from 'react-intl';

import { FiArrowLeft } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';

//export default function Register() {
const NewIncident = ({intl}) => { 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });
            history.push('/profile');
        } catch (error) {
            alert(intl.formatMessage({id: 'Incident.newIncidentFail'}));
        }

    }
  return (
    <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero" />
                <h1><FormattedMessage id="Incident.newIncident" /></h1>
                <p>
                    <FormattedMessage id="Incident.newIncidentDescription" />
                </p>
                <Link className="back-link" to="/profile">
                    < FiArrowLeft size={16} color="#e02041" />
                    <FormattedMessage id="Incident.buttonBackHome" />
                </Link>

            </section>
            <form onSubmit={handleNewIncident}>
                <input 
                type="text" 
                placeholder={intl.formatMessage({id: 'Incident.titlePlaceHolder'})}
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
                <textarea 
                placeholder={intl.formatMessage({id: 'Incident.descriptionPlaceHolder'})}
                value={description}
                onChange={e => setDescription(e.target.value)}
                />
                <input 
                type="text" 
                placeholder={intl.formatMessage({id: 'Incident.valuePlaceHolder'})}
                value={value}
                onChange={e => setValue(e.target.value)}
                />
                <button className="button" type="submit"><FormattedMessage id="Incident.buttonCreate" /></button>
            </form>
        </div>
    </div>
  );
}
export default injectIntl(NewIncident);

