import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "expo-router/head";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { setOrigin } from "../feature/navSlice";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import NavFavorites from "../components/NavFavorites";
// import { GOOGLE_MAPS_APIKEY } from "@env";
const index = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="  bg-white ">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar style="dark" />
      <View className="px-2">
        <Image
          source={{ uri: "https://links.papareact.com/gzs" }}
          className="h-[100px] w-[100px] "
          style={{
            // width: 100,
            resizeMode: "contain",
          }}
        />
        <GooglePlacesAutocomplete
          autoFocus={true}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from"
          placeholderTextColor="#00ccbb"
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );
            // 'details' is provided when fetchDetails = true
            console.log(data, details);
          }}
          fetchDetails={true}
          returnKeyType="search"
          enablePoweredByContainer={false}
          query={{
            key: process.env.GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          keyboardType="default"
          styles={{
            container: {
              flex: 0,
              // backgroundColor: "#000",
              padding: 3,
              // paddingTop: 6,
              // shadowColor: "#000",

              borderWidth: 1,
              borderRadius: 10,
            },
            textInput: {
              fontSize: 18,
              color: "red",
            },
          }}
          minLength={2}
        />
        <NavOptions />
        <NavFavorites />
      </View>

      {/* <Head>
        <title>uber</title>
        <meta name="description" content="My App description" />
      </Head> */}
    </SafeAreaView>
  );
};

export default index;
