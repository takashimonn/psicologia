import React from "react";
import { Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// Screens 
import HomeScreen from "../screens/HomeScreen";
import CitasScreen from "../screens/CitasScreen";
import DiagnosticosScreen from "../screens/DiagnosticosScreen";
import FormCitasScreen from "../screens/FormCitasScreen";


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
        {/* La pantalla de FormCitas va en el Stack, no en las tabs */}
        <Stack.Screen name="FormCitas" component={FormCitasScreen} />
      </Stack.Navigator>
    );
  }


function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
            <Tab.Screen 
                name="Citas" component={CitasStack}
                options={() => ({
                    headerShown: false,
                })}
                ></Tab.Screen>
            <Tab.Screen name="Diagnosticos" component={DiagnosticosScreen}></Tab.Screen>
        </Tab.Navigator> 
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tabs></Tabs>
        </NavigationContainer>
    );
}