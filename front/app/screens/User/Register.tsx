import React, { useState } from "react";
import styled from "styled-components/native";
import IdController from "../../components/Controller/IdController";
import PasswordController from "../../components/Controller/PasswordController";
import PasswordConfirmController from "../../components/Controller/PasswordConfirmController";
import NameController from "../../components/Controller/NameController";
import { LayoutContainer, HeaderText } from "../styled";
import axios from "axios";
import BtnBox from "../../components/BtnBox";
import { Alert, View } from "react-native";

const ContentContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

interface PropsType {
  navigation: any;
}

const Register: React.FC<PropsType> = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const url = "http://k6S101.p.ssafy.io:8080/user/register";

  const onSubmit = async () => {
    const data = {
      id: id,
      password: password,
      passwordConfirm: passwordConfirm,
      name: name,
    };
    await axios
      .post(url, data)
      .then((res) => {
        // navigation.navigate("Login");
        if (res.data) {
          console.log(res);
          setId("");
          setPassword("");
          setPasswordConfirm("");
          setName("");
        } else {
          Alert.alert("입력 정보를 확인해주세요.");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("에러가 발생했습니다. 잠시 후에 다시 시도해주세요.");
      });
  };

  return (
    <LayoutContainer>
      <HeaderText>회원가입</HeaderText>
      <ContentContainer>
        <IdController setId={setId} text="아이디" value={id} />
        <PasswordController
          setPassword={setPassword}
          text="비밀번호"
          value={password}
        />
        <PasswordConfirmController
          setPasswordConfirm={setPasswordConfirm}
          value={passwordConfirm}
        />
        <NameController setName={setName} text="이름" value={name} />
        <View style={{ marginTop: 50 }}>
          <BtnBox
            color="blue"
            text="회원가입"
            setter={onSubmit}
            navigation={navigation}
          ></BtnBox>
          <BtnBox color="white" text="뒤로" navigation={navigation}></BtnBox>
        </View>
      </ContentContainer>
    </LayoutContainer>
  );
};

export default Register;
