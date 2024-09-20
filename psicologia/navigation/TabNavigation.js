import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CitasScreen from '../screens/CitasScreen';
import DiagnosticosScreen from '../screens/DiagnosticosScreen';
import FormCitasScreen from '../screens/FormCitasScreen';
import CitasDiaScreen from '../screens/CitasDiaScreen';
import CitaPacienteScreen from "../screens/CitaPcienteScreen";
import PropuestasScreen from '../screens/PropuestasScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CitasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Citas" 
        component={CitasScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("FormCitas")}>
              <Text style={{ marginRight: 20 }}>New</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="FormCitas" component={FormCitasScreen} />
    </Stack.Navigator>
  );
}

function DiagnosticosStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Diagnosticos" 
        component={DiagnosticosScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Propuestas')}>
              <Text style={{ marginRight: 20 }}>Propuestas</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="Propuestas" component={PropuestasScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
      } catch (error) {
        console.error('Error retrieving user role:', error);
      }
    };

    getUserRole();
  }, []);



  return (
    <Tab.Navigator>
      {userRole !== 'psicologo' && (
        <>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="CitasPacientes" component={CitaPacienteScreen} />
        </>
      )}
      {userRole !== 'paciente' && (
        <>
          <Tab.Screen name="CitasDia" component={CitasDiaScreen} />
          <Tab.Screen name="Citas" component={CitasStack} options={{ headerShown: false }} />
          <Tab.Screen name="Diagnosticos" component={DiagnosticosStack} options={{ headerShown: false }} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default TabNavigator;

