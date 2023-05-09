import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@rneui/themed";

const data = [
  {
    id: 123,
    icon: "home",
    location: "Home",
    destination: "4 Murphy ojoku close Matogun",
  },
  {
    id: 987,
    icon: "briefcase",
    location: "Work",
    destination: "computer village ikeja",
  },
];

export default function NavFavorites() {
  return (
    <FlatList
      //   horizontal
      ItemSeparatorComponent={() => <View className="bg-gray-300 h-[0.5px]" />}
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity className="flex-row items-center p-5 space-x-2">
          <Icon
            style={{
              marginRight: 4,
              borderRadius: 100,
              backgroundColor: "#000f",
              padding: 10,
            }}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text className="tfont-semibold text-lg">{item.location}</Text>
            <Text className="text-gray-500">{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
