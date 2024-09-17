import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

// Screens 
import HomeScreen from "../screens/HomeScreen";
import CitasScreen from "../screens/CitasScreen";
import DiagnosticosScreen from "../screens/DiagnosticosScreen";

const Tab = createBottomTabNavigator(); 

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
            <Tab.Screen name="Citas" component={CitasScreen}></Tab.Screen>
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