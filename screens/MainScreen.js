import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostContext } from "../contexts/PostContext";
import Swiper from "react-native-swiper";

const Container = styled.View`
  flex: 1;
  background-color: red;
  justify-content: flex-start;
`;

const Txt = styled.Text`
  color: #999;
  font-size: 14px;
`;

const MainScreen = ({ navigation }) => {
  // const [resourcePath, setResourcePath] = useState({});
  const { posts, addPost } = useContext(PostContext);
  const [selectedImages, setSelectedImages] = useState([]);

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
        // setResourcePath(response.assets);
        const images = response.assets.map((asset) => asset.uri);
        setSelectedImages(images);
        navigation.navigate("CreatePost", { images });
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
        // setResourcePath(response.assets);
        const images = response.assets.map((asset) => asset.uri);
        setSelectedImages(images);
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <FontAwesome name="photo" size={24} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.ScrollView}>
        {posts.map((post, index) => (
          <View key={index} style={styles.postContainer}>
            <Text style={styles.postLocation}>{post.location}</Text>
            {post.images && (
              <View style={styles.imageContainer}>
                <Swiper showsButtons={false}>
                  {post.images.map((image, imageIndex) => (
                    <Image
                      key={imageIndex}
                      source={{ uri: image }}
                      style={styles.postImage}
                      resizeMode="cover"
                    />
                  ))}
                </Swiper>
              </View>
            )}
            <Text style={styles.postText}>{post.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    right: 30,
    top: 80,
    zIndex: 1,
  },
  ScrollView: {
    alignItems: "center",
    paddingTop: 130,
  },
  postContainer: {
    marginBottom: 0,
    // alignItems: "center",
  },
  postText: {
    marginTop: 10,
    // textAlign: "left",
    // paddingLeft: 50,
  },
  postLocation: {
    marginBottom: 10,
    // textAlign: "left",
    // paddingLeft: 50,
  },
  imageContainer: {
    alignItems: "center",
    height: 300,
    width: 300,
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    aspectRatio: 1,
  },
});

{
  /* <Button title="앨범에서 사진 선택" onPress={selectImage} />
      <Button title="사진 촬영" onPress={takePhoto} /> */
}
{
  /* {resourcePath.length > 0 &&
        resourcePath.map((resource, index) => {
          console.log(resource);
          return (
            <Image
              key={`resource` + index}
              source={{ uri: resource.uri }}
              style={{ width: 110, height: 110 }}
            />
          );
        })} */
}
