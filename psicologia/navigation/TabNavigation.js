import React, {useState, useEffect} from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import CitasScreen from "../screens/CitasScreen";
import DiagnosticosScreen from "../screens/DiagnosticosScreen";
import FormCitasScreen from "../screens/FormCitasScreen";
import CitasDiaScreen from "../screens/CitasDiaScreen";
import CitaPacienteScreen from "../screens/CitaPcienteScreen";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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
                <Text>New</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="FormCitas" component={FormCitasScreen} />
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

  if (userRole === null) {
      // Optionally, you can render a loading screen while fetching the role
      return <View><Text>Loading...</Text></View>;
  }

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
          <Tab.Screen name="Diagnosticos" component={DiagnosticosScreen} />
        </>
      )}
        </Tab.Navigator>
    );
}

export default TabNavigator;
