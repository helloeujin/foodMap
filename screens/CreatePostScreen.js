import React, { useContext, useState, useRef } from "react";
// import { Button, TextInput } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
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

const TagsInput = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin: 20px 30px;
`;

const Tag = styled.View`
  padding: 5px;
  background-color: #eee;
  borderradius: 5px;
  margin: 2px;
`;

const TagInput = styled.TextInput`
  flex: 1;
  font-size: 18px;
`;

const CreatePostScreen = ({ navigation, route }) => {
  const { addPost } = useContext(PostContext);
  const [caption, setCaption] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState("");
  const inputRef = useRef();
  const [showPlaceholder, setShowPlaceholder] = useState(true);
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

  const handleTagInput = (text) => {
    if (text === "") {
      setShowPlaceholder(true); // 사용자가 모든 텍스트를 지우면 플레이스홀더를 다시 표시
    }
    if (text.includes(" ")) {
      // 스페이스를 포함하는 경우
      if (text.trim() !== "" && !tags.includes(text.trim())) {
        // 입력된 문자열이 공백이 아니고, 이미 존재하는 태그가 아닌 경우에만 추가
        setTags([...tags, text.trim()]);
      }
      setTag(""); // 현재 태그를 초기화
    } else {
      setShowPlaceholder(false); // 사용자가 타이핑을 시작하면 플레이스홀더를 숨김
      setTag(text); // 입력 중인 태그를 업데이트
    }
  };

  const handleKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === "Backspace" && tag === "") {
      // 백스페이스를 누르고 현재 태그가 비어있으면 마지막 태그 삭제
      setTags((prevTags) => prevTags.slice(0, prevTags.length - 1));
    }
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

        <TagsInput>
          {tags
            ? tags.map((tag, index) => (
                <Tag key={index}>
                  <Text>{tag}</Text>
                </Tag>
              ))
            : ""}
          <TagInput
            ref={inputRef}
            value={tag}
            onChangeText={handleTagInput}
            onKeyPress={handleKeyPress}
            onBlur={() => {
              Keyboard.dismiss();
              if (tag === "") {
                setShowPlaceholder(true); // 입력란이 포커스를 잃고 텍스트가 없으면 플레이스홀더를 다시 표시
              }
            }}
            onSubmitEditing={() => {
              if (tag.trim() !== "" && !tags.includes(tag.trim())) {
                // 입력된 문자열이 공백이 아니고, 이미 존재하는 태그가 아닌 경우에만 추가
                setTags([...tags, tag.trim()]);
              }
              setTag(""); // 현재 태그를 초기화
            }}
            placeholder={showPlaceholder ? "Add tags" : ""}
            blurOnSubmit={false}
          />
        </TagsInput>

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
