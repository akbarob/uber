import { View, Text } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { store } from "../store";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{}} />
    </Provider>
  );
}
