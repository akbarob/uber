import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { Stack } from "expo-router";
import { store } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          // classname="flex-1"
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Stack />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </Provider>
  );
}
