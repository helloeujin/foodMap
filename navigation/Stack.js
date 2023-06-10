import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import MainScreen from "../screens/MainScreen";
import CreatePostScreen from "../screens/CreatePostScreen";

const Nav = createStackNavigator();

const Stack = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Nav.Screen name="Main" component={MainScreen} />
      <Nav.Screen name="CreatePost" component={CreatePostScreen} />
    </Nav.Navigator>
  );
};

export default Stack;
