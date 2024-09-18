import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { getCitas } from '../api';
import CitasList from '../components/citasList';

const CitasScreen = () => {
  const [citas, setCitas] = useState([]);

  const loadCitas = async () => {
    const data = await getCitas();
    const citasPendientes = data.filter(cita => cita.estado === 'Pendiente' || cita.estado === 'confirmada');
    setCitas(citasPendientes);
  };

  useEffect(() => {
    loadCitas();
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        CITAS AGENDADAS
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CitasList citas={citas} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo gris claro para la pantalla
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 20, // Espacio para evitar que el contenido se oculte en la parte inferior
  },
});

export default CitasScreen;
