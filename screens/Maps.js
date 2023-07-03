import { Button, Text, TextInput, View } from "react-native";
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

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log("position.coords", position.coords);
        setCurrentLocation(position.coords);
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      searchPlaces(searchQuery)
        .then((response) => {
          console.log(response);
          response.json();
        })
        .then((data) => {
          setSearchResults(data.results);
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
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", position: "absolute", width: "100%", alignItems: "center" }}>
        <TextInput
          style={{
            backgroundColor: "gray",
            fontColor: "white",
            width: "50%",
            height: 50,
            marginTop: 30,
            marginLeft: 20,
          }}
          placeholder="Search for a place..."
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button style={{ backgroundColor: "white", height: 50 }} title="Search" onPress={handleSearch} color="red" />
      </View>
      <BttnLeft
        style={{ backgroundColor: "#9746ff", borderRadius: 32, width: 54, height: 54 }}
        onPress={() => navigation.goBack()}>
        <View flex={1} style={{ justifyContent: "center", alignItems: "center" }}>
          <Ionicons name="chevron-back" size={32} color="#ffffff" />
        </View>
      </BttnLeft>
    </>
  );
}

export default Maps;
