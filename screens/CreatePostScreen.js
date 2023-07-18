import React, { useContext, useState, useRef } from "react";
// import { Button, TextInput } from "react-native-paper";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Image,
} from "react-native";
import { PostContext } from "../contexts/PostContext";
import styled from "styled-components/native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

// ELEMENTS
const Container = styled.View`
  background-color: white;
  flex: 1;
`;

const Header = styled.View`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: flex-end;
  flex-direction: row;
  padding: 10px 30px;
  padding-bottom: 20px;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-left: 4px;
`;

const InputArea = styled.ScrollView`
  flex: 6;
  background-color: #f9f9f9;
`;

const ImgContainer = styled.View`
  align-items: center;
  height: 230px;
  width: 100%;
  margin-bottom: 10px;
`;

const Img = styled.Image`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Input = styled.TextInput`
  font-size: 16px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 8px;
  margin-top: 20px;
`;

const Submit = styled.TouchableOpacity`
  position: absolute;
  background-color: #111;
  border-radius: 42px;
  left: 20%;
  margin-top: 40px;
  bottom: 20px;
  width: 60%;
`;

const SubmitText = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
  padding: 10px 10px;
  letter-spacing: 0.3px;
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
  margin: 4px;
`;

const TagInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

const RatingInput = styled.View`
  flex-direction: row;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 13px;
  padding-bottom: 13px;
`;

const Rating = styled.TouchableOpacity`
  padding-right: 10px;
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

  const handleRating = (num) => {
    setRating(num);
  };

  return (
    <Container>
      <Header>
        <Image
          source={require("../img/profile.png")}
          style={{ width: 43, height: 43, marginBottom: -5 }}
        />
        <HeaderText>Youjin's Map</HeaderText>
      </Header>

      <InputArea>
        <ImgContainer>
          <Img source={{ uri: route.params.images[0] }} resizeMode="cover" />
        </ImgContainer>

        <Input
          label="Location"
          value={location}
          placeholder={"Add location"}
          onChangeText={setLocation}
        ></Input>

        <Line />
        <Input
          label="Caption"
          value={caption}
          placeholder={"Write a caption"}
          onChangeText={setCaption}
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

        <RatingInput>
          <Rating onPress={() => handleRating(1)}>
            <FontAwesome
              name={rating >= 1 ? "star" : "star-o"}
              size={24}
              color="black"
            />
          </Rating>
          <Rating onPress={() => handleRating(2)}>
            <FontAwesome
              name={rating >= 2 ? "star" : "star-o"}
              size={24}
              color="black"
            />
          </Rating>
          <Rating onPress={() => handleRating(3)}>
            <FontAwesome
              name={rating >= 3 ? "star" : "star-o"}
              size={24}
              color="black"
            />
          </Rating>
          <Rating onPress={() => handleRating(4)}>
            <FontAwesome
              name={rating >= 4 ? "star" : "star-o"}
              size={24}
              color="black"
            />
          </Rating>
          <Rating onPress={() => handleRating(5)}>
            <FontAwesome
              name={rating === 5 ? "star" : "star-o"}
              size={24}
              color="black"
            />
          </Rating>
        </RatingInput>
      </InputArea>

      <Submit onPress={handleSubmit}>
        <SubmitText>Save</SubmitText>
      </Submit>
    </Container>
  );
};

export default CreatePostScreen;

const styles = StyleSheet.create({
  star: {
    position: "absolute",
    zIndex: 1,
  },
});
