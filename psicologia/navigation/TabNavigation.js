import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import CitasScreen from "../screens/CitasScreen";
import DiagnosticosScreen from "../screens/DiagnosticosScreen";
import FormCitasScreen from "../screens/FormCitasScreen";
import CitasDiaScreen from "../screens/CitasDiaScreen";

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
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CitasDia" component={CitasDiaScreen} />
            <Tab.Screen name="Citas" component={CitasStack} options={{ headerShown: false }} />
            <Tab.Screen name="Diagnosticos" component={DiagnosticosScreen} />
        </Tab.Navigator>
    );
}

export default TabNavigator;
