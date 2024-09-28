import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { login } from '../api';  

const LoginScreen = () => {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('psicologo');

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
      const data = await login(usuario, contrasena, rol); 
      console.log('Datos recibidos:', data); 
  
      if (data.exists && data.user) {
        const { rol, id_paciente, id_psicologo } = data.user;
  
        await AsyncStorage.setItem('userRole', rol.toString());
        
        if (rol === 'paciente' && id_paciente) {
          await AsyncStorage.setItem('userId', id_paciente.toString());
        } else if (rol === 'psicologo' && id_psicologo) {
          await AsyncStorage.setItem('userId', id_psicologo.toString());
        }
  
        navigation.navigate('Tabs');
        setUsuario('');
        setContrasena('');
        Alert.alert('Éxito', 'Inicio de sesión exitoso!');
      } else {
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Error de red. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundShapesContainer}>
        <View style={styles.shapeOne} />
        <View style={styles.shapeTwo} />
        <View style={styles.shapeThree} />
      </View>

      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
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
    backgroundColor: '#ccd6e6',   
  },
  backgroundShapesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  shapeOne: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#7eb8e1',   
    top: -50,
    left: -50,
  },
  shapeTwo: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#cbc892',  // Segundo color para la mancha
    bottom: -30,
    right: -50,
  },
  shapeThree: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#8da46d',  // Tercer color para la mancha
    top: 100,
    right: -70,
  },
  image: {
    width: "30%",
    height: "30%",
    marginBottom: 10,  
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
  },
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
    color: "#ABA6A6"
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
    backgroundColor: '#7eb8e1',  
    borderRadius: 19,
    marginHorizontal: 5,
  },
  selectedRole: {
    backgroundColor: '#8da46d',  
  },
  loginButton: {
    padding: 10,
    backgroundColor: '#7eb8e1',   
    borderRadius: 19,
    marginTop: 20,
    width: '80%',
  },
});

export default LoginScreen;
