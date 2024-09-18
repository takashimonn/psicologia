import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getCitas } from '../api';  // Asegúrate de que la ruta sea correcta
import CitasList from '../components/citasList';
import moment from 'moment';  // Asegúrate de haber instalado moment

const CitasDiaScreen = () => {
  const [citas, setCitas] = useState([]);

  const loadCitas = async () => {
    const data = await getCitas();
    const hoy = moment().format('YYYY-MM-DD'); // Fecha de hoy en formato 'YYYY-MM-DD'
    
    // Filtrar citas para que solo se muestren las que son hoy
    const citasDelDia = data.filter(cita => moment(cita.fecha_cita).format('YYYY-MM-DD') === hoy);
    
    setCitas(citasDelDia);
  };

  useEffect(() => {
    loadCitas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        CITAS AGENDADAS
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CitasList citas={citas} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
});



export default CitasDiaScreen;
