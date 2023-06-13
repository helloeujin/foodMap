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
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostContext } from "../contexts/PostContext";
import Swiper from "react-native-swiper";

const Header = styled.View`
  display: flex;
  height: 120px;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  padding: 10px 30px;

  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const HeaderText = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-left: 10px;
`;

const Location = styled.View`
  display: flex;
  height: 50px;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  padding: 10px 30px;
`;

const Bttn = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  right: 30px;
  z-index: 1;
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

  // console.log(posts);
  return (
    <View style={styles.container}>
      <Header>
        <MaterialCommunityIcons name="face-man" size={30} color="black" />
        <HeaderText>Youjin</HeaderText>
      </Header>

      <ScrollView contentContainerStyle={styles.ScrollView}>
        {posts.map((temp, index) => {
          const post = posts[posts.length - 1 - index];
          return (
            <View key={index} style={{ marginTop: index === 0 ? 0 : 40 }}>
              <Location>
                {/* <MaterialIcons name="location-on" size={24} color="black" /> */}
                <Text style={styles.postLocation}>{post.location}</Text>
              </Location>

              <Text style={styles.postText}>{post.content}</Text>

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
            </View>
          );
        })}
      </ScrollView>

      <Bttn onPress={selectImage}>
        <Ionicons name="add-circle" size={64} color="#9746ff" />
      </Bttn>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 80,
  },
  ScrollView: {
    alignItems: "center",
    paddingTop: 30,
  },

  postText: {
    marginTop: 0,
    marginLeft: 30,
    fontSize: 17,
    marginBottom: 13,
    color: "#999",
    // textAlign: "left",
    // paddingLeft: 50,
  },
  postLocation: {
    fontSize: 21,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    // textAlign: "left",
    // paddingLeft: 50,
  },
  imageContainer: {
    alignItems: "center",
    height: 250,
    width: "100%",
    // width: 300,
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    // aspectRatio: 1,
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
