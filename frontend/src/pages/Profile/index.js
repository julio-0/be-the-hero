import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {injectIntl, FormattedMessage} from 'react-intl';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './styles.css';
import { getToken, logout } from "../../services/auth";

const Profile = ({intl}) => { 
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const token = getToken();
    //const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [token]);

    async function handleDeleteIncident(id){
        try {
          await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id ) );
        } catch (error) {
            alert(intl.formatMessage({id: 'Profile.deleteFail'}));
        }
    }

    function handleLogout(){
        logout();
        localStorage.clear();
        history.push('/');
    }

  return (
    <div className="profile-container">
        <header>
            <img src={logoImg} alt="Be The Hero" />
            <span><FormattedMessage id="Profile.welcome" />{ongName}</span>
            <Link className="button" to="/incidents/new">
            <FormattedMessage id="Profile.newIncident" />
            </Link>            
            <button type="button" onClick={handleLogout}>
                <FiPower size={18} color="#e02041" />
            </button>

        </header>
        
        <h1><FormattedMessage id="Profile.incidentList" /></h1>

        <ul>
            {incidents.map(incident =>(
                <li key={incident.id}>
                    <strong><FormattedMessage id="Profile.incidentTitle" /></strong>
                    <p>{incident.title}</p>

                    <strong><FormattedMessage id="Profile.incidentDescription" /></strong>
                    <p>{incident.description}</p>

                    <strong><FormattedMessage id="Profile.incidentValue" /></strong>
                    <p>
                    
                    { Intl.NumberFormat(`${intl.formatMessage({id: 'language'})}`, {
                             style: 'currency', currency: `${intl.formatMessage({id: 'currency'})}` 
                             } ).format(incident.value) }                    
                    </p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>                
            ))}            

        </ul>
    </div>
  );
}
export default injectIntl(Profile);