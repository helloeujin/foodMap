import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const Container = styled.View`
  flex: 1;
  background-color: red;
  justify-content: flex-start;
`;

const Txt = styled.Text`
  color: #999;
  font-size: 14px;
`;

const MainScreen = () => {
  const [resourcePath, setResourcePath] = useState({});

  // SELECT IMAGE
  const selectImage = () => {
    let options = {
      selectionLimit: 0, // Default is 1, use 0 to allow any number of files
      mediaType: "photo",
      includeBase64: false,
      includeExtra: false,
      maxWidth: 600, // To resize the image
      maxHeight: 600, // To resize the image
    };

    launchImageLibrary(options, (response) => {
      // console.log(response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker error: ", response.error);
      } else {
        setResourcePath(response.assets);
      }
    });
  };

  // TAKE PHOTO
  const takePhoto = () => {
    let options = {
      saveToPhotos: true,
      mediaType: "photo",
      includeBase64: false,
      includeExtra: false,
    };

    launchCamera(options, (response) => {
      console.log(response);

      if (response.didCancel) {
        console.log("User cancelled camera picker");
      } else if (response.errorCode) {
        console.log("CameraPicker error: ", response.error);
      } else {
        setResourcePath(response.assets);
      }
    });
  };

  useEffect(() => {
    console.log(resourcePath);
    // console.log(resourcePath.uri);
  }, [resourcePath]);

  return (
    <View style={styles.container}>
      <Button title="앨범에서 사진 선택" onPress={selectImage} />
      <Button title="사진 촬영" onPress={takePhoto} />
      {resourcePath.length > 0 &&
        resourcePath.map((resource, index) => {
          console.log(resource);
          return (
            <Image
              key={`resource` + index}
              source={{ uri: resource.uri }}
              style={{ width: 110, height: 110 }}
            />
          );
        })}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

{
  /* <View style={styles.container}>
<Button title="앨범에서 사진 선택" onPress={selectImage} />
<Button title="사진 촬영" onPress={takePhoto} />
{resourcePath.length > 0 &&
  resourcePath.map((resource, index) => {
    console.log(resource);
    return (
      <Image
        key={`resource` + index}
        source={{ uri: resource.uri }}
        style={{ width: 110, height: 110 }}
      />
    );
  })}
</View> */
}

{
  /* <View>
<Text>TEXT</Text>
</View> */
}
