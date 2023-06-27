import React, { useContext, useState } from "react";
// import { Button, TextInput } from "react-native-paper";
import { View } from "react-native";
import { PostContext } from "../contexts/PostContext";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ELEMENTS
const Container = styled.ScrollView`
  background-color: white;
`;

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

const ImgContainer = styled.View`
  align-items: center;
  height: 230px;
  width: 100%;
`;

const Img = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const TitleInputContainer = styled.View`
  display: flex;
  height: 70px;

  margin-left: 0px;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
`;

const TitleInput = styled.TextInput`
  font-size: 26px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 12px;
`;

const Input = styled.TextInput`
  font-size: 18px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 8px;
  margin-top: 20px;
`;

const Submit = styled.TouchableOpacity`
  background-color: #9746ff;

  border-radius: 30px;
  margin: 10px 30px;
  margin-top: 40px;
`;

const SubmitText = styled.Text`
  font-size: 19px;
  color: white;
  text-align: center;
  padding: 10px;
`;

const Line = styled.View`
  width: 90%;
  margin-left: 5%;

  border-bottom-color: #eee;
  border-bottom-width: 1px;
`;

const CreatePostScreen = ({ navigation, route }) => {
  const { addPost } = useContext(PostContext);
  const [caption, setCaption] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  // console.log(route.params.images);

  const handleSubmit = () => {
    addPost({
      location,
      rating,
      tags,
      caption,
      name,
      images: route.params.images,
    });
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Container>
        <Header>
          <MaterialCommunityIcons name="face-man" size={30} color="black" />
          <HeaderText>Youjin</HeaderText>
        </Header>
        <TitleInputContainer>
          <TitleInput
            placeholder={"가게명"}
            value={name}
            onChangeText={setName}
          />
        </TitleInputContainer>
        <ImgContainer>
          <Img source={{ uri: route.params.images[0] }} resizeMode="cover" />
        </ImgContainer>

        <Input
          label="Caption"
          value={caption}
          placeholder={"Write a caption"}
          onChangeText={setCaption}
        ></Input>

        <Line />

        <Input
          label="Location"
          value={location}
          placeholder={"Add location"}
          onChangeText={setLocation}
        ></Input>

        <Line />

        <Input
          label="Tags"
          value={tags}
          placeholder={"Add tags"}
          onChangeText={setTags}
        ></Input>

        <Line />

        <Input
          label="Rating"
          value={rating}
          placeholder={"Rating"}
          onChangeText={setRating}
        ></Input>

        <Submit onPress={handleSubmit}>
          <SubmitText>Submit</SubmitText>
        </Submit>
      </Container>
    </View>
  );
};

export default CreatePostScreen;

{
  /* <TextInput
label="Content"
value={content}
onChangeText={setContent}
multiline
/>
<TextInput label="Location" value={location} onChangeText={setLocation} />
<Button onPress={handleSubmit}>Submit</Button> */
}
