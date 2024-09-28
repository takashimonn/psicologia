import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { getCitas } from '../api';  
import moment from 'moment'; 

const CitasDiaScreen = () => {
  const [citas, setCitas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);  

  const loadCitas = async () => {
    const data = await getCitas();
    const hoy = moment().format('YYYY-MM-DD');
    const citasDelDia = data.filter(cita => 
      moment(cita.fecha_cita).format('YYYY-MM-DD') === hoy && cita.estado === 'confirmada'
    );
    
    setCitas(citasDelDia);
  };

  useEffect(() => {
    loadCitas();
  }, []);

  const handleCardPress = () => {
    setModalVisible(true); 
  };

  return (
    <View style={styles.container}>
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {citas.length > 0 ? (
          citas.map((cita, index) => (
            <TouchableOpacity key={index} style={styles.card} onPress={handleCardPress}>
              <View style={styles.cardContent}>
                <View style={styles.leftContent}>
                  <Text style={styles.nombrePaciente}>
                    Paciente: {cita.nombre_paciente}
                  </Text>
                  <Text style={styles.tipoCita}>
                    Tipo de cita: {cita.tipo_cita}
                  </Text>
                  <Text style={styles.tarifa}>
                    Tarifa: ${cita.tarifa}
                  </Text>
                </View>
                <Text style={styles.horaCita}>
                  {moment(cita.hora_cita, 'HH:mm:ss').format('HH:mm')}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noCitas}>No hay citas confirmadas para hoy.</Text>
        )}
      </ScrollView>

      {/* Modal para mostrar la propuesta de terapia */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Propuesta de terapia</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ccd6e6',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
 
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftContent: {
    flex: 1,
  },
  nombrePaciente: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipoCita: {
    fontSize: 16,
    color: '#555',
  },
  tarifa: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  horaCita: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#8da46d',
  },
  noCitas: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#8da46d',  // Botón azul
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CitasDiaScreen;
