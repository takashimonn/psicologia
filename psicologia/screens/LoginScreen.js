import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native'; // Importación de navigation

const LoginScreen = () => {
  const navigation = useNavigation(); // Usa navigation para la navegación
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = async () => {
    if (!usuario || !contrasena) {
      Alert.alert('Error', 'Por favor, ingresa usuario y contraseña.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.16:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usuario, contrasena }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Usuario y/o contraseña incorrectos.');
        return;
      }

      const data = await response.json();

      if (data.exists) {
        // Usuario existe, redirigir a la siguiente pantalla
        navigation.navigate('Tabs');
        setUsuario('');
        setContrasena('');
        Alert.alert('Éxito', 'Inicio de sesión exitoso!');
      } else {
        // Usuario no encontrado
        Alert.alert('Error', 'Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Error de red. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity onPress={handleLogin}>
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
  },
  input: {
    width: '80%', 
    height: 40, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingLeft: 10, 
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
