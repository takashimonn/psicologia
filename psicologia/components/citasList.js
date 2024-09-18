import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const CitasList = ({ citas }) => {
  return (
    <View style={styles.container}>
      {citas.map(cita => (
        <View key={cita.id_cita} style={styles.citaContainer}>
          <Text style={styles.titulo}>Tipo de Cita: {cita.tipo_cita}</Text>
          <Text style={styles.detalle}>Estado: {cita.estado}</Text>
          <Text style={styles.fecha}>Fecha: {moment(cita.fecha_cita).format('DD/MM/YYYY')}</Text>
          <Text style={styles.hora}>Hora: {cita.hora_cita}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  citaContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 16,
    marginTop: 8,
  },
  fecha: {
    fontSize: 16,
    marginTop: 8,
  },
  hora: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default CitasList;
