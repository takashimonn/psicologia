import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import CitasScreen from "./screens/CitasScreen";

import Navigation from "./navigation/TabNavigation";

const Stack = createStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="CitasScreen" component={CitasScreen} />
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <Navigation></Navigation>
  );
};

export default App;
