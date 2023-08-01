import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";

import Geolocation from "@react-native-community/geolocation";
import { Ionicons } from "@expo/vector-icons";
import { searchPlaces } from "../help/api";
import styled from "styled-components/native";

const BttnLeft = styled.TouchableOpacity`
  position: absolute;
  bottom: 36px;
  left: 30px;
  z-index: 1;
`;

const SearchButton = styled.View`
  height: 40px;
  width: 100px;
  position: absolute;
  top: 36px;
  left: 10px;
  z-index: 1;
  background-color: red;
`;

function Maps(props) {
  const { navigation } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);

  const handleRegionChangeComplete = (region) => {
    console.log(region);
    setCurrentRegion(region);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }, []);

  console.log("searchResults", searchResults.length);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchPlaces(searchQuery, { ...currentRegion, radius: 1000 })
        .then((response) => {
          response.map((r) => console.log(r?.name));
          setSearchResults(response);
          console.log("ㄷㄴ");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 37.877439,
            longitude: 127.728922,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
          showsMyLocationButton
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {searchResults.length > 0 ? (
            searchResults.map((result, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: result.geometry.location.lat,
                  longitude: result.geometry.location.lng,
                }}
                title={result.name}
                onPress={() => console.log(result.name)}
              />
            ))
          ) : (
            <></>
          )}
        </MapView>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          position: "absolute",
          width: "100%",
          alignItems: "center",
          marginTop: 30,
          justifyContent: "space-around",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: "white",
            fontColor: "white",
            width: "50%",
            height: 50,
            borderRadius: 5,
            marginLeft: 20,
          }}
          placeholder="Search for a place..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            height: 50,
            borderColor: "black",
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            borderRadius: 5,
          }}
          title="Search"
          onPress={handleSearch}
          color="red"
        >
          <Text style={{ color: "#9746ff", marginHorizontal: 20 }}>Search</Text>
        </TouchableOpacity>
      </View>
      <BttnLeft
        style={{ backgroundColor: "#9746ff", borderRadius: 32, width: 54, height: 54 }}
        onPress={() => navigation.goBack()}
      >
        <View flex={1} style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="chevron-back" size={32} color="#ffffff" />
        </View>
      </BttnLeft>
    </>
  );
}

export default Maps;
