import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import styled from "styled-components/native";

const BttnLeft = styled.TouchableOpacity`
  position: absolute;
  bottom: 36px;
  left: 30px;
  z-index: 1;
`;

function Maps(props) {
  const { navigation } = props;

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
