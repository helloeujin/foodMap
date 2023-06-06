import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, Button, Image } from "react-native";
// import MainScreen from "../screens/MainScreen";

const Nav = createStackNavigator();
{
  /* <Nav.Navigator><Nav.Screen name="MainScreen" component={MainScreen} /></Nav.Navigator> */
}

const Stack = () => {
  return (
    <View>
      <Text>TEST</Text>
    </View>
  );
};

export default Stack;
