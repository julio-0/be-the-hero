import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import LocalizationContext from '../../services/LocalizationContext';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route =useRoute();

    const { t } = React.useContext(LocalizationContext);
    const incident = route.params.incident;
    const value = Intl.NumberFormat(t('language'), {style: 'currency', currency: t('currency')}).format(incident.value);
    const message = `${t('message', { name: incident.name, title: incident.title, value: value })}`;
    
    function navigateBack(){
        navigation.goBack();
    }

    function openMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function openWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateBack} >
                                <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>{t('NGO')}:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>{t('incident')}:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>{t('value')}:</Text>
                <Text style={styles.incidentValue}>
                    { Intl.NumberFormat(`${t('language')}`,
                        { style: 'currency', currency: `${t('currency')}` 
                        }).format(incident.value) 
                    }
                </Text>                
            </View> 
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>{t('saveTheDay')}</Text>
                <Text style={styles.heroTitle}>{t('beHero')}</Text>

                <Text style={styles.heroDescription}>{t('contact')}</Text>


                <View style={styles.actions}>
                    <TouchableOpacity 
                                style={styles.action} 
                                onPress={openWhatsapp} >
                                    <Text style={styles.actionText}>{t('whatsapp')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                                style={styles.action} 
                                onPress={openMail} >
                                    <Text style={styles.actionText}>{t('email')}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}