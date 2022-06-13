import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tabs />
    </NavigationContainer>
  );
}
