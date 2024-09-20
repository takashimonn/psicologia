import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PropuestasScreen = () => {
  const [propuesta, setPropuesta] = useState('');
  const [idPaciente, setIdPaciente] = useState(null);

  useEffect(() => {
    const getIdPaciente = async () => {
      try {
        const storedPacienteId = await AsyncStorage.getItem('id_paciente'); // Asegúrate de que 'id_paciente' está en el AsyncStorage
        if (storedPacienteId) {
          setIdPaciente(storedPacienteId);
        } else {
          Alert.alert('Error', 'No se ha encontrado el ID del paciente en el almacenamiento.');
        }
      } catch (error) {
        console.error('Error recuperando el ID del paciente:', error);
        Alert.alert('Error', 'Error al recuperar el ID del paciente.');
      }
    };

    getIdPaciente();
  }, []);

  const handleSubmit = async () => {
    if (!propuesta) {
      Alert.alert('Error', 'Por favor, ingrese una propuesta.');
      return;
    }

    if (idPaciente) {
      try {
        const response = await fetch('http://192.168.1.16:3000/notas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propuesta_terap: propuesta,
            id_paciente: idPaciente,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error ${response.status}: ${errorData.message || 'Error al crear la nota'}`);
        }

        Alert.alert('Éxito', 'Propuesta creada con éxito.');
        setPropuesta(''); // Limpiar el campo de entrada
      } catch (error) {
        console.error('Error al enviar la propuesta:', error);
        Alert.alert('Error', 'Error al enviar la propuesta.');
      }
    } else {
      Alert.alert('Error', 'ID del paciente no disponible.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Crear Propuesta</Text>
      <TextInput
        style={styles.input}
        placeholder="Escriba su propuesta aquí"
        value={propuesta}
        onChangeText={setPropuesta}
        multiline
      />
      <Button title="Enviar Propuesta" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
});

export default PropuestasScreen;
