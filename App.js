import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function App() {
  const [resourcePath, setResourcePath] = useState({});

  // SELECT IMAGE
  const selectImage = () => {
    let options = {
      strageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchImageLibrary(options, (response) => {
      console.log(response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker error: ", response.error);
      } else {
        setResourcePath(response.assets[0]);
      }
    });
  };

  // TAKE PHOTO
  const takePhoto = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
    };

    launchCamera(options, (response) => {
      console.log(response);

      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorCode) {
        console.log("CameraPicker error: ", response.error);
      } else {
        setResourcePath(response.assets[0]);
      }
    });
  };

  // useEffect(() => {
  //   console.log(resourcePath);
  //   console.log(resourcePath.uri);
  // }, [resourcePath]);

  return (
    <View style={styles.container}>
      <Button title="앨범에서 사진 선택" onPress={selectImage} />
      <Button title="사진 촬영" onPress={takePhoto} />
      {resourcePath.uri && (
        <Image
          source={{ uri: resourcePath.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
