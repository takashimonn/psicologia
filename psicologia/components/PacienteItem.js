import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PacienteItem = ({ paciente, onSelect }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onSelect}>
      <Text>{paciente.nombre} {paciente.apellido}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PacienteItem;
