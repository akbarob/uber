import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import { selectTravelTimeInformation } from "../feature/navSlice";
import { useSelector } from "react-redux";

const data = [
  {
    id: 12,
    title: "Uber X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: 123,
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: 1234,
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

export default function RideOptions() {
  const [selected, setselected] = useState(null);
  const TravelTimeInformation = useSelector(selectTravelTimeInformation);
  const navigation = useNavigation();
  console.log("time:", TravelTimeInformation);

  const SurgeChargeRate = 1.5;
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          className="absolute top-5 left-5 z-50 shadow-md bg-white rounded-full"
          onPress={() => {
            navigation.goBack();
            setselected(null);
          }}
        >
          <Icon
            size={30}
            color="black"
            name="chevron-left"
            type="fontawesome"
          />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">Select a Ride</Text>
      </View>

      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`flex-row px-10 justify-between items-center ${
                selected?.id === item.id && "bg-gray-200"
              }`}
              onPress={() => setselected(item)}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain",
                }}
                source={{ uri: item.image }}
              />
              <View className="-ml-6">
                <Text className=" text-xl font-semibold">{item.title}</Text>
                <Text className="">
                  Travel Time...
                  {TravelTimeInformation?.duration.text}
                </Text>
                <Text className="">
                  Travel distance...
                  {TravelTimeInformation?.distance.text}
                </Text>
              </View>
              <Text className="text-xl">
                {new Intl.NumberFormat("en-ng", {
                  style: "currency",
                  currency: "NGN",
                }).format(
                  TravelTimeInformation?.duration.value *
                    SurgeChargeRate *
                    item.multiplier
                )}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View className="mt-auto border-t border-gray-300">
        <TouchableOpacity
          disabled={selected === null}
          className={`${selected ? "bg-black" : "bg-gray-300"} py-3 m-3`}
        >
          <Text className="text-center text-white text-xl font-semibold">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
