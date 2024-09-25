import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image'; // Cambiamos a Image

const LoginScreen = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('psicologo'); // Estado para el rol

  const handleLogin = async () => {
    if (!usuario || !contrasena) {
      Alert.alert('Error', 'Por favor, ingresa usuario y contraseña.');
      return;
    }
  
    if (!rol) {
      Alert.alert('Error', 'Por favor, selecciona el rol.');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.1.74:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena, rol }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Usuario y/o contraseña incorrectos.');
        return;
      }
  
      const data = await response.json();
      
      console.log('Datos recibidos:', data); // Verifica los datos que se están recibiendo
  
      if (data.exists && data.user) {
        // Guarda el rol y el ID en AsyncStorage
        const { rol, id_paciente, id_psicologo } = data.user; // Extraemos ambos ID's para decidir luego
  
        if (rol) {
          await AsyncStorage.setItem('userRole', rol.toString());
        } else {
          console.warn('El rol del usuario no está definido en la respuesta.');
        }
  
        // Verificamos si el rol es paciente o psicólogo y guardamos el ID correspondiente
        if (rol === 'paciente' && id_paciente) {
          await AsyncStorage.setItem('userId', id_paciente.toString());
          console.log('ID Paciente guardado:', id_paciente);
        } else if (rol === 'psicologo' && id_psicologo) {
          await AsyncStorage.setItem('userId', id_psicologo.toString());
          console.log('ID Psicólogo guardado:', id_psicologo);
        } else {
          console.warn('El ID del usuario no está definido en la respuesta.');
        }
  
        // Redirigir a la pantalla principal
        navigation.navigate('Tabs');
        setUsuario('');
        setContrasena('');
        Alert.alert('Éxito', 'Inicio de sesión exitoso!');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error de red. Por favor, inténtalo de nuevo.');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo.png')} // Imagen en la parte superior
      />
        <Text style={styles.title}>Bienvenido/a</Text>
        <Text style={styles.subtitle}>Ingresa tus datos</Text>
      <TextInput 
        placeholder="Usuario" 
        style={styles.input}
        onChangeText={text => setUsuario(text)}
        value={usuario}
      />

      <TextInput 
        placeholder="Contraseña" 
        secureTextEntry={true} 
        style={styles.input}
        onChangeText={text => setContrasena(text)}
        value={contrasena}
      />

      <View style={styles.roleContainer}>
        <TouchableOpacity 
          onPress={() => setRol('psicologo')} 
          style={[styles.roleButton, rol === 'psicologo' && styles.selectedRole]}
        >
          <Text style={styles.buttonText}>Psicólogo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setRol('paciente')} 
          style={[styles.roleButton, rol === 'paciente' && styles.selectedRole]}
        >
          <Text style={styles.buttonText}>Paciente</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#b8b6f2', // Fondo color lila
  },
  image: {
    width: "30%",
    height: "30%",
    marginBottom: 10, // Espacio entre la imagen y el formulario
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  

  }
  ,
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  
    

  },
  input: {
    width: '80%', 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 19, 
    paddingLeft: 10, 
    marginBottom: 20,
    backgroundColor: '#FFF', 
    color:"#ABA6A6"
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    padding: 10,
    backgroundColor: '#918FCC',
    borderRadius: 19,
    marginHorizontal: 5,
  },
  selectedRole: {
    backgroundColor: '#6A5ACD', // Color diferente para el botón seleccionado
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#918FCC',
    borderRadius: 19,
    marginTop: 20,
    width: '80%',
  },
});

export default LoginScreen;
