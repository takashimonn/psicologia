import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CitasScreen from '../screens/CitasScreen';
import DiagnosticosScreen from '../screens/DiagnosticosScreen';
import FormCitasScreen from '../screens/FormCitasScreen';
import CitasDiaScreen from '../screens/CitasDiaScreen';
import CitaPacienteScreen from "../screens/CitaPcienteScreen";
import PerfilScreen from "../screens/ProfileScreen";
import PacientesListaScreen from "../screens/PacientesListaScreen";
import PropuestasScreen from '../screens/PropuestasScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 

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
             <MaterialIcons name="add-circle-outline" size={24} color="#918FCC" style={{ marginRight: 8 }} />

            
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
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'CitasPacientes') {
            iconName = focused ? 'person' : 'person-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'CitasDia') {
            iconName = focused ? 'today' : 'calendar-today';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Citas') {
            iconName = focused ? 'event' : 'event-note';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Diagnosticos') {
            iconName = focused ? 'assignment' : 'assignment-late';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Pacientes') {
            iconName = focused ? 'group' : 'group-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: route.name === 'Home' ? 'blue' : 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {userRole !== 'psicologo' && (
        <>
          <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Inicio' }} />
          <Tab.Screen name="CitasPacientes" component={CitaPacienteScreen} options={{ tabBarLabel: 'Mis Citas' }} />
        </>
      )}
      {userRole !== 'paciente' && (
        <>
          <Tab.Screen name="CitasDia" component={CitasDiaScreen} options={{ tabBarLabel: 'Citas de Hoy' }} />
          <Tab.Screen name="Citas" component={CitasStack} options={{ tabBarLabel: 'Citas', headerShown: false }} />
          <Tab.Screen name="Diagnosticos" component={DiagnosticosStack} options={{ tabBarLabel: 'Diagnósticos', headerShown: false }} />
          <Tab.Screen name="Perfil" component={PerfilScreen} options={{ tabBarLabel: 'Perfil' }} />
          <Tab.Screen name="Pacientes" component={PacientesListaScreen} options={{ tabBarLabel: 'Pacientes' }}  />

        </>
      )}
    </Tab.Navigator>
  );
}

export default TabNavigator;
