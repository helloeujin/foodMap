import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Stack from "./Stack";

const Nav = createStackNavigator();
{
  /* <Nav.Screen name="Stack" component={Stack} /> */
}
const Root = () => (
  <Nav.Navigator initialRouteName="Stack">
    <Nav.Group>
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Group>
  </Nav.Navigator>
);

export default Root;
