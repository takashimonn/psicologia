import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const CitaPacienteScreen = ({ route }) => {
  const [citas, setCitas] = useState([]);
  const [idPaciente, setIdPaciente] = useState(null);

  // Verificar si route.params está disponible y si contiene id_paciente
  useEffect(() => {
    if (route.params && route.params.id_paciente) {
      setIdPaciente(route.params.id_paciente);
    } else {
      Alert.alert('Error', 'No se ha proporcionado el ID del paciente.');
    }
  }, [route.params]);

  useEffect(() => {
    if (idPaciente !== null) {
      const fetchCitas = async () => {
        try {
          const response = await fetch(`http://192.168.1.16:3000/citas/paciente/${idPaciente}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error al obtener las citas'}`);
          }
          const data = await response.json();
          console.log('Datos recibidos:', data);
          setCitas(data);
        } catch (error) {
          console.error('Error:', error);
          Alert.alert('Error', 'Error al obtener las citas.');
        }
      };

      fetchCitas();
    }
  }, [idPaciente]);

  const confirmarCita = async (id_cita) => {
    try {
      const response = await fetch(`http://192.168.1.16:3000/citas/${id_cita}/confirmar`, {
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
      Alert.alert('Éxito', `Cita confirmada para ${data.fecha_cita} a las ${data.hora_cita}`);
      
      // Actualizar la lista de citas después de confirmar una cita
      setCitas(citas.map(cita => 
        cita.id_cita === id_cita ? { ...cita, estado: 'confirmada' } : cita
      ));
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error de red. Por favor, inténtalo de nuevo.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.citaContainer}>
      <Text style={styles.citaText}>Fecha: {item.fecha_cita}</Text>
      <Text style={styles.citaText}>Hora: {item.hora_cita}</Text>
      <Text style={styles.citaText}>Tipo: {item.tipo_cita}</Text>
      <Text style={styles.citaText}>Estado: {item.estado}</Text>
      {item.estado === 'Pendiente' && (
        <Button
          title="Confirmar Cita"
          onPress={() => confirmarCita(item.id_cita)}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Citas Pendientes</Text>
      <FlatList
        data={citas}
        renderItem={renderItem}
        keyExtractor={item => item.id_cita.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  citaText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default CitaPacienteScreen;
