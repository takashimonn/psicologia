import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiagnosticosScreen = () => {
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [idPsicologo, setIdPsicologo] = useState(null);

  useEffect(() => {
    const getIdPsicologo = async () => {
      try {
        const storedPsicologoId = await AsyncStorage.getItem('userId');
        if (storedPsicologoId) {
          setIdPsicologo(storedPsicologoId);
        } else {
          Alert.alert('Error', 'No se ha encontrado el ID del psicólogo en el almacenamiento.');
        }
      } catch (error) {
        console.error('Error recuperando el ID del psicólogo:', error);
        Alert.alert('Error', 'Error al recuperar el ID del psicólogo.');
      }
    };

    getIdPsicologo();
  }, []);

  useEffect(() => {
    if (idPsicologo !== null) {
      const fetchDiagnosticos = async () => {
        try {
          const response = await fetch(`http://192.168.1.16:3000/diagnosticos/psicologo/${idPsicologo}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error al obtener los diagnósticos'}`);
          }
          const data = await response.json();
          setDiagnosticos(data);
        } catch (error) {
          console.error('Error:', error);
          Alert.alert('Error', 'Error al obtener los diagnósticos.');
        }
      };

      fetchDiagnosticos();
    }
  }, [idPsicologo]);

  const renderItem = ({ item }) => (
    <View style={styles.diagnosticoContainer}>
      <Text style={styles.diagnosticoText}>Fecha: {item.fecha_diagnostico}</Text>
      <Text style={styles.diagnosticoText}>Diagnóstico: {item.diagnostico}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Diagnósticos</Text>
      <FlatList
        data={diagnosticos}
        renderItem={renderItem}
        keyExtractor={item => item.id_diagnostico.toString()}
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
  diagnosticoContainer: {
    padding: 16,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  diagnosticoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default DiagnosticosScreen;
