import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Modal, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getCitas, cancelCita, reagendarCita } from '../api';
import { MaterialIcons } from '@expo/vector-icons'; // Asegúrate de tener instalado @expo/vector-icons
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

const CitasScreen = () => {
  const [citas, setCitas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState('');
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const loadCitas = async () => {
    const data = await getCitas();
    const citasPendientes = data.filter(cita => cita.estado === 'Pendiente' || cita.estado === 'confirmada');
    setCitas(citasPendientes);
  };

  const handleCancelCita = (idCita) => {
    Alert.alert(
      "Cancelar Cita",
      "¿Estás seguro de que deseas cancelar esta cita?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Sí",
          onPress: async () => {
            await cancelCita(idCita);
            loadCitas(); // Refresca citas después de cancelar
          }
        }
      ]
    );
  };

  const handleReagendarCita = async () => {
    if (citaSeleccionada && nuevaFecha) {
      await reagendarCita(citaSeleccionada, nuevaFecha);
      loadCitas(); // Refresca citas después de reagendar
      setModalVisible(false);
      setNuevaFecha('');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCitas(); // Carga citas al enfocar la pantalla
    }, [])
  );

  const getBackgroundColor = (estado) => {
    return estado === 'confirmada' ? styles.confirmedBackground : styles.pendingBackground;
  };

  // Formato de fecha
  const formatDate = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CITAS AGENDADAS</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {citas.map(cita => (
          <View key={cita.id_cita} style={[styles.citaCard, getBackgroundColor(cita.estado)]}>
            <Text style={styles.citaDate}>{`Fecha: ${formatDate(cita.fecha_cita)}`}</Text>
            <Text style={styles.patientName}>{`Paciente: ${cita.paciente}`}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => {
                setCitaSeleccionada(cita.id_cita);
                setModalVisible(true);
              }}>
                <MaterialIcons name="event" size={24} color="black" />
                {/* <Text style={styles.iconText}>Reagendar</Text> */}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleCancelCita(cita.id_cita)}>
                <MaterialIcons name="cancel" size={24} color="red" />
                {/* <Text style={styles.iconText}>Cancelar</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal para reagendar cita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Reagendar Cita</Text>
            <TextInput
              placeholder="Nueva Fecha"
              value={nuevaFecha}
              onChangeText={setNuevaFecha}
              style={styles.input}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleReagendarCita}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccd6e6',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  citaCard: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  confirmedBackground: {
    backgroundColor: '#7eb8e1', 
  },
  pendingBackground: {
    backgroundColor: '#cbc892', 
  },
  citaDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientName: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  iconText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    backgroundColor: '#ccd6e6',
    width: '80%',
    padding: 20,
    borderRadius: 10, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  modalButton: {
    padding: 10,
    backgroundColor: '#7eb8e1',
    borderRadius: 19,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '7eb8e1',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CitasScreen;
