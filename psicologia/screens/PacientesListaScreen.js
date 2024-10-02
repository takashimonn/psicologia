import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, FlatList, TouchableOpacity, Modal, Button, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import { getPacientes, getDiagnosticosByPaciente, saveDiagnostico } from '../api'; // Importa la API correctamente

const PacientesTablaScreen = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRegistroVisible, setModalRegistroVisible] = useState(false); // Controla el modal de registro
  const [loadingDiagnosticos, setLoadingDiagnosticos] = useState(false);
  const [nuevoDiagnostico, setNuevoDiagnostico] = useState(''); // Estado para el nuevo diagnóstico

  const loadPatients = async () => {
    try {
      const data = await getPacientes();
      setPacientes(data);
    } catch (error) {
      console.error('Error al cargar pacientes:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Se ejecuta cada vez que la pantalla se enfoca
      loadPatients();
    }, [])
  );

  const handlePacientePress = async (paciente) => {
    setSelectedPaciente(paciente);
    setModalVisible(true);
    setLoadingDiagnosticos(true);
    try {
      const diag = await getDiagnosticosByPaciente(paciente.id_paciente);
      setDiagnosticos(diag);
    } catch (error) {
      console.error('Error al cargar diagnósticos:', error);
    } finally {
      setLoadingDiagnosticos(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPaciente(null);
    setDiagnosticos([]);
  };

  // Maneja la apertura del modal de registro de diagnóstico
  const openRegistroModal = () => {
    setModalRegistroVisible(true);
  };

  // Cierra el modal de registro de diagnóstico
  const closeRegistroModal = () => {
    setModalRegistroVisible(false);
    setNuevoDiagnostico('');
  };

  // Maneja el registro de un nuevo diagnóstico
  const handleRegistrarDiagnostico = async () => {
    if (!nuevoDiagnostico.trim()) {
      Alert.alert('Error', 'Por favor ingrese un diagnóstico válido.');
      return;
    }

    const fechaRegistro = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
    const nuevoDiag = {
      id_paciente: selectedPaciente.id_paciente,
      diagnostico: nuevoDiagnostico,
      fecha_diagnostico: fechaRegistro,
    };

    try {
      await saveDiagnostico(nuevoDiag); // Llama al endpoint de registro
      Alert.alert('Éxito', 'Diagnóstico registrado correctamente');
      setDiagnosticos([...diagnosticos, nuevoDiag]); // Actualiza la lista de diagnósticos
      closeRegistroModal(); // Cierra el modal de registro
    } catch (error) {
      console.error('Error al registrar diagnóstico:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el diagnóstico.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePacientePress(item)} style={styles.tableRow}>
            <Text style={styles.cell}>{item.nombre} {item.apellido}</Text>
            <Text style={styles.cell}>{item.telefono}</Text>
            <Text style={styles.cell}>{item.tarifa}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Nombre</Text>
            <Text style={styles.headerText}>Teléfono</Text>
            <Text style={styles.headerText}>Tarifa</Text>
          </View>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPaciente && (
              <>
                <Text style={styles.modalTitle}>Diagnósticos del paciente {selectedPaciente.nombre} {selectedPaciente.apellido}</Text>
                
                {loadingDiagnosticos ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  diagnosticos.length > 0 ? (
                    diagnosticos.map((diag, index) => (
                      <Text key={index} style={styles.modalText}>• {diag.fecha_diagnostico} - {diag.diagnostico}</Text>
                    ))
                  ) : (
                    <Text style={styles.modalText}>No hay diagnósticos disponibles.</Text>
                  )
                )}
                <Button title="Registrar Diagnóstico" onPress={openRegistroModal} />
                <Button title="Cerrar" onPress={closeModal} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal para registrar un nuevo diagnóstico */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRegistroVisible}
        onRequestClose={closeRegistroModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Registrar nuevo diagnóstico</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese diagnóstico"
              value={nuevoDiagnostico}
              onChangeText={setNuevoDiagnostico}
            />
            <Button title="Registrar" onPress={handleRegistrarDiagnostico} />
            <Button title="Cancelar" onPress={closeRegistroModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default PacientesTablaScreen;
