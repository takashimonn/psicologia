import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { saveCita } from '../api';

const FormCitasScreen = () => {
    const [cita, setCita] = useState({
        id_psicologo: '',
        id_paciente: '',
        fecha_cita: '',
        hora_cita: '',
        tipo_cita: '',
        estado: '',
    });

    const handleChange = (name, value) => setCita({ ...cita, [name]: value });

    const handleSubmit = () => {
        saveCita(cita);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registra una nueva cita</Text>

            <TextInput 
                style={styles.input}
                placeholder="ID Psicólogo" 
                onChangeText={(text) => handleChange('id_psicologo', text)} 
            />

            <TextInput 
                style={styles.input}
                placeholder="ID Paciente" 
                onChangeText={(text) => handleChange('id_paciente', text)} 
            />

            <TextInput 
                style={styles.input}
                placeholder="Fecha Cita (YYYY-MM-DD)"
                onChangeText={(text) => handleChange('fecha_cita', text)} 
            />

            <TextInput 
                style={styles.input}
                placeholder="Hora Cita (HH:MM)"
                onChangeText={(text) => handleChange('hora_cita', text)} 
            />

            <TextInput 
                style={styles.input}
                placeholder="Tipo Cita"
                onChangeText={(text) => handleChange('tipo_cita', text)} 
            />
            
            <TextInput 
                style={styles.input}
                placeholder="Estado"
                onChangeText={(text) => handleChange('estado', text)} 
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}> 
                <Text style={styles.buttonText}>Agendar Cita</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FormCitasScreen;
