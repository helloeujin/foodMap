import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import MainScreen from "../screens/MainScreen";

const Nav = createStackNavigator();

const Stack = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="MainScreen" component={MainScreen} />
    </Nav.Navigator>
  );
};

export default Stack;
