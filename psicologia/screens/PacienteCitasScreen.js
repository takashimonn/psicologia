import { View, Text, Button, FlatList, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CitaPacienteScreen = () => {
  const [citas, setCitas] = useState([]);
  const [idPaciente, setIdPaciente] = useState(null);

  // Obtener el ID del paciente de AsyncStorage
  useEffect(() => {
    const getIdPaciente = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setIdPaciente(storedUserId);
          console.log('ID Paciente recuperado:', storedUserId);
        } else {
          Alert.alert('Error', 'No se ha encontrado el ID del paciente.');
        }
      } catch (error) {
        console.error('Error recuperando el ID del paciente:', error);
        Alert.alert('Error', 'Error al recuperar el ID del paciente.');
      }
    };
    getIdPaciente();
  }, []);

  // CAMBIAR A ENDPOINT
  useEffect(() => {
    if (idPaciente) {
      const fetchCitas = async () => {
        try {
          const response = await fetch(`http://192.168.1.74:3000/citas/paciente/${idPaciente}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error al obtener las citas'}`);
          }
          const data = await response.json();
          setCitas(data);
        } catch (error) {
          console.error('Error al obtener las citas:', error);
          Alert.alert('Error', 'Error al obtener las citas.');
        }
      };

      fetchCitas();
    }
  }, [idPaciente]);

  // Confirmar una cita
  const confirmarCita = async (id_cita) => {
    try {
      const response = await fetch(`http://192.168.1.74:3000/citas/confirmar/${id_cita}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'No se pudo confirmar la cita.'}`);
      }

      const data = await response.json();
      Alert.alert('Éxito', `Cita confirmada para el ${data.fecha_cita} a las ${data.hora_cita}`);

      // Actualizar la lista de citas en el estado después de confirmar la cita
      setCitas((prevCitas) =>
        prevCitas.map((cita) =>
          cita.id_cita === id_cita ? { ...cita, estado: 'confirmada' } : cita
        )
      );
    } catch (error) {
      console.error('Error al confirmar la cita:', error);
      Alert.alert('Error', 'Error de red. Inténtalo de nuevo.');
    }
  };

  // Filtrar las citas pendientes
  const citasPendientes = citas.filter(cita => cita.estado === 'pendiente');

  // Renderizar cada cita
  const renderItem = ({ item }) => (
    <View style={styles.citaContainer}>
      <Text style={styles.citaText}>Fecha: {item.fecha_cita}</Text>
      <Text style={styles.citaText}>Hora: {item.hora_cita}</Text>
      <Text style={styles.citaText}>Tipo: {item.tipo_cita}</Text>
      <Text style={styles.citaText}>Estado: {item.estado}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => confirmarCita(item.id_cita)}
      >
        <Text style={styles.buttonText}>Confirmar Cita</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
    
      <FlatList
        data={citasPendientes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_cita.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ccd6e6',   
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  citaContainer: {
    padding: 16,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff', // Fondo blanco de la card
  },
  citaText: {
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#7eb8e1', // Color del botón
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto blanco para el botón
    fontSize: 16,
  },
});

export default CitaPacienteScreen;
