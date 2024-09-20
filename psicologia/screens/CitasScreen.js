// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ScrollView, Text } from 'react-native';
// import { getCitas } from '../api';
// import CitasList from '../components/citasList';

// const CitasScreen = () => {
//   const [citas, setCitas] = useState([]);

//   const loadCitas = async () => {
//     const data = await getCitas();
//     const citasPendientes = data.filter(cita => cita.estado === 'Pendiente' || cita.estado === 'confirmada');
//     setCitas(citasPendientes);
//   };

//   useEffect(() => {
//     loadCitas();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>
//         CITAS AGENDADAS
//       </Text>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <CitasList citas={citas} />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5', // Fondo gris claro para la pantalla
//     padding: 10,
//   },
//   scrollContainer: {
//     paddingBottom: 20, // Espacio para evitar que el contenido se oculte en la parte inferior
//   },
// });

// export default CitasScreen;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Button, Modal, TextInput } from 'react-native';
import { getCitas, cancelCita, reagendarCita } from '../api';

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

  const handleCancelCita = async (idCita) => {
    await cancelCita(idCita);
    loadCitas();
  };

  const handleReagendarCita = async () => {
    if (citaSeleccionada && nuevaFecha) {
      await reagendarCita(citaSeleccionada, nuevaFecha);
      loadCitas();
      setModalVisible(false);
      setNuevaFecha('');
    }
  };

  useEffect(() => {
    loadCitas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CITAS AGENDADAS</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {citas.map(cita => (
          <View key={cita.id_cita} style={styles.citaContainer}>
            <Text>{`Cita ID: ${cita.id_cita}`}</Text>
            <Text>{`Fecha: ${cita.fecha_cita}`}</Text>
            <Text>{`Estado: ${cita.estado}`}</Text>
            <Button title="Cancelar" onPress={() => handleCancelCita(cita.id_cita)} />
            <Button 
              title="Reagendar" 
              onPress={() => {
                setCitaSeleccionada(cita.id_cita);
                setModalVisible(true);
              }} 
            />
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
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Reagendar Cita</Text>
          <TextInput 
            placeholder="Nueva Fecha (YYYY-MM-DD)" 
            value={nuevaFecha} 
            onChangeText={setNuevaFecha} 
            style={styles.input} 
          />
          <Button title="Confirmar" onPress={handleReagendarCita} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  citaContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default CitasScreen;
