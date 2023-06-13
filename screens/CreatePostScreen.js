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
  font-size: 28px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 12px;
`;

const CaptionInput = styled.TextInput`
  font-size: 23px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 12px;
  margin-top: 20px;
`;

const Submit = styled.TouchableOpacity`
  background-color: #9746ff;

  border-radius: 30px;
  margin: 10px 30px;
  margin-top: 40px;
`;

const SubmitText = styled.Text`
  font-size: 20px;
  color: white;
  text-align: center;
  padding: 10px;
`;

const CreatePostScreen = ({ navigation, route }) => {
  const { addPost } = useContext(PostContext);
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  // console.log(route.params.images);

  const handleSubmit = () => {
    addPost({ content, location, images: route.params.images });
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
            value={location}
            onChangeText={setLocation}
          />
        </TitleInputContainer>
        <ImgContainer>
          <Img source={{ uri: route.params.images[0] }} resizeMode="cover" />
        </ImgContainer>

        <CaptionInput
          label="Location"
          value={content}
          placeholder={"Write a caption..."}
          onChangeText={setContent}
        ></CaptionInput>

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
