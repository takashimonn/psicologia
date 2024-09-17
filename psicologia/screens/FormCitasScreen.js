import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
        saveCita(cita)
    };

    return (
        <View>
            <Text>Registra una nueva cita</Text>

            <TextInput 
                placeholder="id_psicologo" 
                onChangeText={(text) => handleChange('id_psicologo', text)} 
            />

            <TextInput 
                placeholder="id_paciente" 
                onChangeText={(text) => handleChange('id_paciente', text)} 
            />

            <TextInput 
                placeholder="fecha_cita"
                onChangeText={(text) => handleChange('fecha_cita', text)} 
            />

            <TextInput 
                placeholder="hora_cita"
                onChangeText={(text) => handleChange('hora_cita', text)} 
            />

            <TextInput 
                placeholder="tipo_cita"
                onChangeText={(text) => handleChange('tipo_cita', text)} 
            />
            
            <TextInput 
                placeholder="estado"
                onChangeText={(text) => handleChange('estado', text)} 
            />

            <TouchableOpacity onPress={handleSubmit}> 
                <Text>Agendar cita</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormCitasScreen;
