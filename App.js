import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PostProvider } from "./contexts/PostContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <PostProvider>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </PostProvider>
    </SafeAreaProvider>
  );
}
