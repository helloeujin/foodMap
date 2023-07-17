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

const Container = styled.View`
  padding-top: 0px;
  flex: 1;
  background-color: white;
`;

const Header = styled.View`
  display: flex;
  flex: 1.5;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  padding: 10px 30px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-left: 4px;
`;

const Search = styled.View`
  flex: 0.8;
  padding: 18px 30px 10px 30px;
`;

const SearchArea = styled.View`
  border: 0.75px solid #333;
  height: 80%;
  border-radius: 30px;
  justify-content: center;
`;

const Posts = styled.ScrollView`
  flex: 7;
  background-color: #f4f4f4;
`;

const NavBar = styled.View`
  flex: 1.3;
`;

const Location = styled.View`
  display: flex;
  flex: 5;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  padding: 10px 30px;
  border: 1px solid red;
`;

const Bttn = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 50%;
  margin-left: -28px;
  z-index: 1;
  border: 0.75px solid black;
  width: 56px;
  height: 56px;
  border-radius: 40px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const Txt = styled.Text`
  color: #999;
  font-size: 14px;
`;

const RatingBox = styled.View`
  padding-top: 13px;
  flex-direction: row;
  padding-left: 30px;
  padding-bottom: 20px;
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
    <Container>
      <Header>
        {/* <MaterialCommunityIcons name="face-man" size={30} color="black" /> */}
        <Image
          source={require("../img/profile.png")}
          style={{ width: 43, height: 43, marginBottom: -5 }}
        />

        <HeaderText>Youjin's Map</HeaderText>
      </Header>

      <Search>
        <SearchArea>
          {/* <FontAwesome
            name="search"
            size={22}
            color="black"
            style={styles.searchIcon}
          /> */}
          <Ionicons
            name="ios-search"
            size={20}
            color="#333"
            style={styles.searchIcon}
          />
        </SearchArea>
      </Search>

      <Posts>
        {posts.map((temp, index) => {
          const post = posts[posts.length - 1 - index];
          return (
            <View key={index} style={{ marginTop: index === 0 ? 0 : 40 }}>
              <Location>
                {/* <MaterialIcons name="location-on" size={24} color="black" /> */}
                <Text style={styles.postLocation}>{post.name}</Text>
              </Location>

              <Text style={styles.postText}>{post.caption}</Text>
              <Text style={styles.postText}>{post.location}</Text>
              <Text style={styles.postText}>
                {post.tags
                  ? post.tags.map((tag, index) => (
                      <Text key={index}>{"#" + tag + " "}</Text>
                    ))
                  : ""}
              </Text>

              {/* <Text style={styles.postText}>{post.rating}</Text> */}

              <RatingBox>
                <FontAwesome
                  name={post.rating >= 1 ? "star" : "star-o"}
                  style={styles.star}
                  size={24}
                  color="black"
                />
                <FontAwesome
                  name={post.rating >= 2 ? "star" : "star-o"}
                  style={styles.star}
                  size={24}
                  color="black"
                />
                <FontAwesome
                  name={post.rating >= 3 ? "star" : "star-o"}
                  style={styles.star}
                  size={24}
                  color="black"
                />
                <FontAwesome
                  name={post.rating >= 4 ? "star" : "star-o"}
                  style={styles.star}
                  size={24}
                  color="black"
                />
                <FontAwesome
                  name={post.rating === 5 ? "star" : "star-o"}
                  style={styles.star}
                  size={24}
                  color="black"
                />
              </RatingBox>

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
      </Posts>

      <Bttn onPress={selectImage}>
        {/* <Ionicons name="add-circle" size={64} color="#9746ff" /> */}
        <FontAwesome name="camera" size={30} color="black" />
      </Bttn>

      <NavBar></NavBar>
    </Container>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  postText: {
    marginTop: 0,
    marginLeft: 30,
    fontSize: 17,
    marginBottom: 13,
    color: "#999",
  },
  postLocation: {
    fontSize: 21,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  imageContainer: {
    alignItems: "center",
    height: 250,
    width: "100%",
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  star: {
    paddingRight: 8,
  },
  searchIcon: {
    marginLeft: 12,
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
