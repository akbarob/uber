import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Head from "expo-router/head";

const index = () => {
  const count = useSelector((state) => state.uber.value);
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Head>
        <title>uber</title>
        <meta name="description" content="My App description" />
      </Head>
      <Text className="text-red-500 text-3xl">INdex js</Text>
      <Text className="text-blue-500">{count}</Text>
    </View>
  );
};

export default index;
