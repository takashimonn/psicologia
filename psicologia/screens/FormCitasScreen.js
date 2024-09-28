import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Picker } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { saveCita, getPacientes } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormCitasScreen = () => {
    const [cita, setCita] = useState({
        id_psicologo: '',
        id_paciente: '',
        fecha_cita: '',
        hora_cita: '',
        tipo_cita: '',
        estado: 'pendiente',
    });
    const [pacientes, setPacientes] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // Cargar el ID del psicólogo desde AsyncStorage
    useEffect(() => {
        const loadPsicologoId = async () => {
            const idPsicologo = await AsyncStorage.getItem('userId');
            if (idPsicologo) {
                setCita((prevCita) => ({ ...prevCita, id_psicologo: idPsicologo }));
                loadPatients(idPsicologo); // Cargar pacientes basados en el psicólogo
            }
        };
        loadPsicologoId();
    }, []);

    // Cargar los pacientes del psicólogo
    const loadPatients = async (idPsicologo) => {
        try {
            const data = await getPacientes(idPsicologo); // Filtrar pacientes por id_psicologo en la API
            setPacientes(data);
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
        }
    };

    const handleChange = (name, value) => setCita({ ...cita, [name]: value });

    const handleDateConfirm = (date) => {
        handleChange('fecha_cita', moment(date).format('YYYY-MM-DD'));
        setDatePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        handleChange('hora_cita', moment(time).format('HH:mm'));
        setTimePickerVisibility(false);
    };

    const handleSubmit = () => {
        if (!cita.id_psicologo || !cita.id_paciente || !cita.fecha_cita || !cita.hora_cita || !cita.tipo_cita || !cita.estado) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        saveCita(cita)
            .then(() => {
                Alert.alert('Cita registrada con éxito');
                // Reinicia el formulario después de registrar con éxito
                setCita({
                    id_psicologo: cita.id_psicologo,
                    id_paciente: '',
                    fecha_cita: '',
                    hora_cita: '',
                    tipo_cita: '',
                    estado: 'no confirmado', // Resetea el estado a "no confirmado"
                });
            })
            .catch((error) => {
                Alert.alert('Error', 'Ocurrió un problema al registrar la cita. Inténtalo de nuevo.');
                console.error(error); // Log del error para depuración
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registra una nueva cita</Text>

            {/* Lista de pacientes asociados al psicólogo */}
            <View style={styles.input}>
                <Picker
                    selectedValue={cita.id_paciente}
                    onValueChange={(value) => handleChange('id_paciente', value)}
                >
                    <Picker.Item label="Seleccione un paciente" value="" />
                    {pacientes.map((paciente) => (
                        <Picker.Item key={paciente.id_paciente} label={paciente.nombre} value={paciente.id_paciente} />
                    ))}
                </Picker>
            </View>

            {/* Date and Time Pickers in a Row */}
            <View style={styles.row}>
                <TouchableOpacity style={styles.dateTimeWrapper} onPress={() => setDatePickerVisibility(true)}>
                    <TextInput 
                        style={[styles.input, styles.dateTimeInput]}
                        placeholder="Fecha Cita (YYYY-MM-DD)"
                        value={cita.fecha_cita}
                        editable={false} // Campo no editable
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.dateTimeWrapper} onPress={() => setTimePickerVisibility(true)}>
                    <TextInput 
                        style={[styles.input, styles.dateTimeInput]}
                        placeholder="Hora Cita (HH:MM)"
                        value={cita.hora_cita}
                        editable={false} // Campo no editable
                    />
                </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisibility(false)}
            />

            {/* Time Picker Modal */}
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={() => setTimePickerVisibility(false)}
            />

            <TextInput 
                style={styles.input}
                placeholder="Tipo Cita"
                onChangeText={(text) => handleChange('tipo_cita', text)} 
                value={cita.tipo_cita}
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
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dateTimeWrapper: {
        flex: 1,
        marginRight: 8, // Espacio entre los campos de fecha y hora
    },
    dateTimeInput: {
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#918FCC',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default FormCitasScreen;
