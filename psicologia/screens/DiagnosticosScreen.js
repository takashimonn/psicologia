import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getPacientes, getDiagnosticosByPaciente } from '../api';

const DiagnosticosScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const idPsicologo = 27; // Obtén este valor dinámicamente según el usuario logueado

  const loadPacientes = async () => {
      try {
          const data = await getPacientes(idPsicologo);
          setPacientes(data);
      } catch (error) {
          console.error('Error al cargar pacientes:', error);
      }
  };

  const loadDiagnosticos = async (idPaciente) => {
      try {
          const data = await getDiagnosticosByPaciente(idPaciente);
          console.log('Diagnósticos cargados:', data);
          setDiagnosticos([data]);
      } catch (error) {
          console.error('Error al cargar diagnósticos:', error);
      }
  };

  useEffect(() => {
      loadPacientes();
  }, []);

  useEffect(() => {
      if (selectedPaciente) {
          loadDiagnosticos(selectedPaciente);
      } else {
          setDiagnosticos([]);
      }
  }, [selectedPaciente]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Diagnósticos</Text>
            <FlatList
                data={pacientes}
                keyExtractor={(item) => item.id_paciente.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.pacienteItem}
                        onPress={() => setSelectedPaciente(item.id_paciente)}
                    >
                        <Text style={styles.pacienteName}>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
            />
            {selectedPaciente && (
                <View style={styles.diagnosticosContainer}>
                    <Text style={styles.subTitle}>Diagnósticos para el paciente seleccionado:</Text>
                    <FlatList
                        data={diagnosticos}
                        keyExtractor={(item) => item.id_diagnostico.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.diagnosticoItem}>
                                <Text style={styles.diagnosticoText}>Fecha: {item.fecha_diagnostico}</Text>
                                <Text style={styles.diagnosticoText}>Diagnóstico: {item.diagnostico}</Text>
                            </View>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    pacienteItem: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    pacienteName: {
        fontSize: 18,
        color: '#007bff',
    },
    diagnosticosContainer: {
        marginTop: 16,
    },
    subTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    diagnosticoItem: {
        padding: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    diagnosticoText: {
        fontSize: 16,
        color: '#333',
    },
});

export default DiagnosticosScreen;
