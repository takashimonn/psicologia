import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CitasScreen from '../screens/CitasScreen';
import FormCitasScreen from '../screens/FormCitasScreen';
import CitasDiaScreen from '../screens/CitasDiaScreen';
import CitaPacienteScreen from "../screens/PacienteCitasScreen";
import PacientesTablaScreen from "../screens/PacientesListaScreen";
import NewPacienteScreen from '../screens/NewPacienteScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

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
              <MaterialIcons name="add-circle-outline" size={24} color="#8da46d" style={{ marginRight: 8 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="FormCitas" component={FormCitasScreen} />
    </Stack.Navigator>
  );
}

function PacientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Pacientes" 
        component={PacientesTablaScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("NewPacientes")}>
              <MaterialIcons name="add-circle-outline" size={24} color="#8da46d" style={{ marginRight: 8 }} />
            </TouchableOpacity>
          ),
          title: "Lista de Pacientes",
        })}
      />
      <Stack.Screen name="NewPacientes" component={NewPacienteScreen} />
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'CitasPacientes') {
            iconName = focused ? 'person' : 'person-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'CitasDia') {
            iconName = 'event';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Citas') {
            iconName = focused ? 'event' : 'event-note';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Pacientes') {
            iconName = focused ? 'group' : 'group';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#fff',  
        tabBarInactiveTintColor: '#fff',   
        tabBarStyle: {
          backgroundColor: '#7eb8e1', 
        },
      })}
    >
      {userRole !== 'psicologo' && (
        <Tab.Screen name="CitasPacientes" component={CitaPacienteScreen} options={{ tabBarLabel: 'Mis Citas' }} />
      )}
      {userRole !== 'paciente' && (
        <>
          <Tab.Screen name="Citas del Día" component={CitasDiaScreen} options={{ tabBarLabel: 'Citas de Hoy' }} />
          <Tab.Screen name="Citas" component={CitasStack} options={{ tabBarLabel: 'Citas', headerShown: false }} />
          <Tab.Screen name="Pacientes" component={PacientesStack} options={{ tabBarLabel: 'Pacientes', headerShown: false }} />
        </>
      )}
    </Tab.Navigator>
  );
}

export default TabNavigator;
