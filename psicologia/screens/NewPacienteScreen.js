import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { savePaciente, getPacientes } from '../api'; 

const PacientesScreen = ({ navigation }) => {  // Recibiendo navigation como prop
    const [nuevoPaciente, setNuevoPaciente] = useState({
        nombre: '',
        apellido: '',
        fecha_nacimiento: '',
        correo_electronico: '',
        telefono: '',
        direccion: '',
        id_psicologo: '',
        usuario: '',
        contrasena: '',
        tarifa: '',
        nombre_emergencia: '',
        contacto_emergencia: '',
        estado_civil: '',
        ocupacion: '',
        fecha_registro: new Date().toISOString(),
    });

    const [pacientes, setPacientes] = useState([]);

    // Cargar la lista de pacientes
    useEffect(() => {
        loadPacientes();
    }, []);

    const loadPacientes = async () => {
        try {
            const data = await getPacientes();
            setPacientes(data);
        } catch (error) {
            console.error('Error al cargar pacientes:', error);
        }
    };

    const handleChange = (name, value) => {
        setNuevoPaciente({ ...nuevoPaciente, [name]: value });
    };

    const handleSubmit = async () => {
        // Validar que todos los campos necesarios estén completos
        if (!nuevoPaciente.nombre || !nuevoPaciente.apellido || !nuevoPaciente.fecha_nacimiento || !nuevoPaciente.correo_electronico || !nuevoPaciente.telefono || !nuevoPaciente.direccion || !nuevoPaciente.id_psicologo || !nuevoPaciente.usuario || !nuevoPaciente.contrasena || !nuevoPaciente.tarifa || !nuevoPaciente.nombre_emergencia || !nuevoPaciente.contacto_emergencia || !nuevoPaciente.estado_civil || !nuevoPaciente.ocupacion) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        try {
            const pacienteCreado = await savePaciente(nuevoPaciente);
            Alert.alert('Éxito', `Paciente ${pacienteCreado.nombre} registrado con éxito.`);
            setNuevoPaciente({
                nombre: '',
                apellido: '',
                fecha_nacimiento: '',
                correo_electronico: '',
                telefono: '',
                direccion: '',
                id_psicologo: '',
                usuario: '',
                contrasena: '',
                tarifa: '',
                nombre_emergencia: '',
                contacto_emergencia: '',
                estado_civil: '',
                ocupacion: '',
                fecha_registro: new Date().toISOString(),
            }); // Resetear el formulario

            Alert.alert('Paciente registrado con exito');
            // Aquí, puedes llamar a la función para navegar atrás y recargar datos
            loadPacientes();
            goBackAndRefresh();
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al registrar el paciente. Inténtalo de nuevo.');
            console.error(error);
        }
    };

    const goBackAndRefresh = () => {
        navigation.goBack(); // Regresar a la pantalla anterior
        loadPacientes(); // Recargar la lista de pacientes en la pantalla anterior
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registrar Nuevo Paciente</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nuevoPaciente.nombre}
                onChangeText={(text) => handleChange('nombre', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={nuevoPaciente.apellido}
                onChangeText={(text) => handleChange('apellido', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de Nacimiento"
                value={nuevoPaciente.fecha_nacimiento}
                onChangeText={(text) => handleChange('fecha_nacimiento', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={nuevoPaciente.correo_electronico}
                onChangeText={(text) => handleChange('correo_electronico', text)}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={nuevoPaciente.telefono}
                onChangeText={(text) => handleChange('telefono', text)}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={nuevoPaciente.direccion}
                onChangeText={(text) => handleChange('direccion', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="ID Psicólogo"
                value={nuevoPaciente.id_psicologo}
                onChangeText={(text) => handleChange('id_psicologo', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={nuevoPaciente.usuario}
                onChangeText={(text) => handleChange('usuario', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={nuevoPaciente.contrasena}
                onChangeText={(text) => handleChange('contrasena', text)}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Tarifa"
                value={nuevoPaciente.tarifa}
                onChangeText={(text) => handleChange('tarifa', text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre Emergencia"
                value={nuevoPaciente.nombre_emergencia}
                onChangeText={(text) => handleChange('nombre_emergencia', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contacto Emergencia"
                value={nuevoPaciente.contacto_emergencia}
                onChangeText={(text) => handleChange('contacto_emergencia', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Estado Civil"
                value={nuevoPaciente.estado_civil}
                onChangeText={(text) => handleChange('estado_civil', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Ocupación"
                value={nuevoPaciente.ocupacion}
                onChangeText={(text) => handleChange('ocupacion', text)}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrar Paciente</Text>
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
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
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
    pacientesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
    },
    pacienteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
});

export default PacientesScreen;
