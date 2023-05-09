import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectOrigin } from "../feature/navSlice";

const data = [
  {
    id: 123,
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: 134,
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatScreen",
  },
];
export default function NavOptions() {
  const origin = useSelector(selectOrigin);
  const route = useRouter();
  return (
    <FlatList
      className="w-full"
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
          onPress={() => route.push(`${item.screen}`)}
          disabled={(item.id === 134 && true) || !origin}
        >
          <View className={`${!origin && "opacity-25"}`}>
            <Image
              source={{ uri: item.image }}
              className="h-[100px] w-[100px] "
              style={{
                // width: 100,
                resizeMode: "contain",
              }}
            />
            <Text className="my-2 text-lg font-semibold text-black">
              {item.title}
            </Text>
            <Icon
              reverse={true}
              reverseColor="white"
              color="black"
              type="antdesign"
              name="arrowright"
              containerStyle={{
                marginTop: 4,
              }}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
