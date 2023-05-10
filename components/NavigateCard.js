import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../feature/navSlice";
import { TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import NavFavorites from "./NavFavorites";

export default function NavigateCard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Good Morning, Akbar</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            styles={{
              container: { backgroundColor: "white", paddingTop: 20, flex: 0 },
              textInput: {
                backgroundColor: "#dddddf",
                borderRadius: 1,
                fontSize: 20,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            placeholder="Where to???"
            enablePoweredByContainer={false}
            fetchDetails={true}
            returnKeyType={"search"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptions");
            }}
            query={{
              key: process.env.GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            keyboardType="default"
            debounce={500}
            nearbyPlacesAPI="GooglePlacesSearch"
            // className="pt-20 flex-0 text-20 px-20 pb-0 bg-[#dddddf]"
          />
        </View>
        <NavFavorites />
      </View>
      <View className="flex-row justify-evenly items-center py-2 mt-auto bg-white border-t border-gray-100">
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptions")}
          className="flex-row bg-black justify-between w-24 px-4 py-3 rounded-full"
        >
          <Icon size={16} color="white" name="car" type="font-awesome" />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row  justify-between w-24 px-4 py-3 rounded-full">
          <Icon
            size={16}
            color="black"
            name="fast-food-outline"
            type="ionicon"
          />
          <Text className="text-black text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
