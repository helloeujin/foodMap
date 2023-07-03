import { Button, Image, StyleSheet, Text, View } from "react-native";

import CreatePostScreen from "../screens/CreatePostScreen";
import MainScreen from "../screens/MainScreen";
import Maps from "../screens/Maps";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const Nav = createStackNavigator();

const Stack = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Nav.Screen name="Main" component={MainScreen} />
      <Nav.Screen name="CreatePost" component={CreatePostScreen} />
      <Nav.Screen name="Maps" component={Maps} />
    </Nav.Navigator>
  );
};

export default Stack;
