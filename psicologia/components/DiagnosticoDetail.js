import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DiagnosticoDetail = ({ diagnostico }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnóstico del Paciente</Text>
      <Text>{diagnostico}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default DiagnosticoDetail;
