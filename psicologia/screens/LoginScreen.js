import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default LoginScreen;
