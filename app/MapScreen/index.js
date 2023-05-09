import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { Navigator, Slot, Stack, Tabs, useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInormation,
} from "../../feature/navSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import MapViewDirections from "react-native-maps-directions";
import NavigateCard from "../../components/NavigateCard";
import RideOptions from "../../components/RideOptions";
import { Icon } from "@rneui/themed";

export default function MapScreen() {
  const mapRef = useRef(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const Yes = createNativeStackNavigator();
  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    if (!origin || !destination) return;

    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    // console.log(origin, destination, process.env.GOOGLE_MAPS_APIKEY);
    function getTravelTime() {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${destination.description}&mode=driving&key=${process.env.GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) =>
          dispatch(setTravelTimeInormation(data.rows[0].elements[0]))
        );
    }

    getTravelTime();
  }, [origin, destination, process.env.GOOGLE_MAPS_APIKEY]);

  return (
    <View>
      <Stack.Screen
        //   name="index"
        options={{
          // headerShown: false,
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <View className="h-1/2">
        <TouchableOpacity
          className="absolute top-5 left-5 z-50 shadow-md bg-white rounded-full"
          onPress={() => {
            route.back();
          }}
        >
          <Icon
            size={30}
            color="black"
            name="chevron-left"
            type="fontawesome"
          />
        </TouchableOpacity>
        <MapView
          ref={mapRef}
          className="flex-1"
          // mapType="mutedStandard"
          initialRegion={{
            latitude: origin.location?.lat,
            longitude: origin.location?.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {origin && destination && (
            <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              apikey={process.env.GOOGLE_MAPS_APIKEY}
              strokeColor="black"
              strokeWidth={3}
            />
          )}
          {origin?.location && (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="origin"
              description={origin.description}
              identifier="origin"
            />
          )}
          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="destination"
              description={destination.description}
              identifier="destination"
            />
          )}
        </MapView>
      </View>

      <View className="h-1/2 ">
        <NavigationContainer independent={true}>
          <Yes.Navigator>
            <Yes.Screen
              name="NavigateCard"
              component={NavigateCard}
              options={{ headerShown: false, animation: "slide_from_left" }}
            />
            <Yes.Screen
              name="RideOptions"
              component={RideOptions}
              options={{ headerShown: false, animation: "slide_from_right" }}
            />
          </Yes.Navigator>
        </NavigationContainer>

        {/* <Stack initialRouteName="home">
          <Stack.Screen
            name="/app/fish/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="/app/fish/meat"
            options={{
              headerShown: false,
            }}
          />
        </Stack> */}
      </View>
    </View>
  );
}
