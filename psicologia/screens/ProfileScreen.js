// // PerfilScreen.js
// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
// import { Card, Button } from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const PerfilScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Reemplaza 'tu_endpoint_aqui' con la URL de tu API
//         const userRole = await AsyncStorage.getItem('userRole');
//         const response = await axios.get(`tu_endpoint_aqui/${userRole}`); // Cambia según tu endpoint
//         setUserData(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
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
//     <View style={styles.container}>
//       <Card style={styles.card}>
//         <Card.Content>
//           <View style={styles.profileContainer}>
//             <Image
//               source={{ uri: userData.fotoPerfil }} // Asegúrate de que esta URL sea válida
//               style={styles.profileImage}
//             />
//             <Text style={styles.name}>{userData.nombre}</Text>
//             <Text style={styles.email}>{userData.correo}</Text>
//           </View>
//         </Card.Content>
//         <Card.Actions>
//           <Button onPress={() => console.log('Editar Perfil')}>Editar Perfil</Button>
//         </Card.Actions>
//       </Card>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   card: {
//     width: '100%',
//     maxWidth: 400,
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   name: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   email: {
//     fontSize: 16,
//     color: 'gray',
//   },
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

// export default PerfilScreen;
