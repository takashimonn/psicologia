// // PacientesTablaScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
// import { DataTable } from 'react-native-paper'; // Importa DataTable
// import axios from 'axios';

// const PacientesTablaScreen = () => {
//   const [pacientes, setPacientes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPacientes = async () => {
//       try {
//         // Reemplaza 'tu_endpoint_aqui' con la URL de tu API
//         const response = await axios.get('tu_endpoint_aqui');
//         setPacientes(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPacientes();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text>Error: {error}</Text>
//       </View>
//     );
//   }

//   return (
//     <DataTable>
//       <DataTable.Header>
//         <DataTable.Title>Nombre</DataTable.Title>
//         <DataTable.Title>Edad</DataTable.Title> {/* Cambia o agrega campos según tu API */}
//         <DataTable.Title>Correo</DataTable.Title>
//       </DataTable.Header>

//       {pacientes.map((paciente) => (
//         <DataTable.Row key={paciente.id}> {/* Cambia 'id' según tu estructura de datos */}
//           <DataTable.Cell>{paciente.nombre}</DataTable.Cell> {/* Cambia 'nombre' según tu estructura de datos */}
//           <DataTable.Cell>{paciente.edad}</DataTable.Cell> {/* Cambia 'edad' según tu estructura de datos */}
//           <DataTable.Cell>{paciente.correo}</DataTable.Cell> {/* Cambia 'correo' según tu estructura de datos */}
//         </DataTable.Row>
//       ))}
//     </DataTable>
//   );
// };

// const styles = StyleSheet.create({
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default PacientesTablaScreen;
