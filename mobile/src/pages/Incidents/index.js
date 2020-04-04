import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import LocalizationContext from '../../services/LocalizationContext';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const { t } = React.useContext(LocalizationContext);
    //const { t, i18n } = React.useContext(LocalizationContext);
    //const { t, locale, setLocale } = React.useContext(LocalizationContext);

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', { params: {page} });
        setIncidents([ ... incidents, ... response.data ]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);

        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();



    }), [];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    {t('incidentTotalLabel')} <Text style={styles.headerTextBold}>{total} {t('incidents')} </Text>
                </Text>
            </View>

            <Text style={styles.title}>{t('welcome')}</Text>
            <Text style={styles.description}>{t('selectIncident')}</Text>

            <FlatList 
                data={incidents} 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.1}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>{t('NGO')}</Text>
                <Text style={styles.incidentValue}>{incident.name} {t('_of_')} {incident.city}/{incident.uf} </Text>

                        <Text style={styles.incidentProperty}>{t('incident')}</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>{t('value')}</Text>
                        <Text style={styles.incidentValue}>{ Intl.NumberFormat(`${t('language')}`, {
                             style: 'currency', currency: `${t('currency')}` 
                             } ).format(incident.value) }
                        </Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)} >
                                <Text style={styles.detailsButtonText}>{t('toDetails')}</Text>
                                <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View> 
                )}
            />

        </View>
    )
}