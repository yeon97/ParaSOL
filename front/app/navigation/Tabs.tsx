import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import History from "../screens/History";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { mainBlue } from "../color";
import { useEffect, useState } from "react";
import PayStack from "./PayStack";
import MypageStack from "./MypageStack";
import Benefit from "../screens/Benefit";
import HomeStack from "./HomeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

interface PropsType {
  // 로그인 여부 set
  setLogin: (a: any) => void;
}

const Tab = createBottomTabNavigator();

const Tabs: React.FC<PropsType> = ({ setLogin }) => {
  // const
  // Axios 새로운 인증 토큰 url
  const tokenUrl = "http://k6S101.p.ssafy.io:8080/user/token";
  // Axios 내 정보 조회 url
  const getMyInfoUrl = "http://k6S101.p.ssafy.io:8080/pay";

  // useState
  // 잔액
  const [balance, setBalance] = useState<string>("999,999");
  // 아이디
  const [id, setId] = useState<string>("ID");
  // 계좌 연결 정보
  const [bankInfo, setBankInfo] = useState({
    // 은행 이미지
    bankImg:
      "data:image/jpeg;base64,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",
    // 은행 이름
    bankName: "신한은행",
    // 계좌 번호
    bankNum: "110-128-203947",
  });

  // Axios
  // 새로운 인증 토큰 발급
  const getNewToken = async (): Promise<any> => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    await axios({
      method: "get",
      url: tokenUrl,
      headers: { Authorization: `Bearer ${refreshToken}` },
      params: refreshToken,
    })
      .then((response) => {
        console.log(response);
        AsyncStorage.setItem("accessToken", response.data.accessToken);
        return true;
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("토큰 만료! 다시 로그인해주세요.");
        AsyncStorage.clear();
        setLogin(false);
        return false;
      });
  };
  // 내 정보 조회
  const getMyInfo = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    await axios({
      method: "get",
      url: getMyInfoUrl,
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        console.log(res);
        setBalance(res.data.balance);
        setId(res.data.id);
        setBankInfo(res.data.bankInfo);
      })
      .catch(async (err) => {
        console.log(err);
        if (err.response.status === 401 && (await getNewToken?.())) getMyInfo();
      });
  };

  // useEffect
  useEffect(() => {
    getMyInfo();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarLabelStyle: { fontWeight: "bold", fontSize: 13 },
        tabBarActiveTintColor: mainBlue,
        tabBarInactiveTintColor: "black",
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
    >
      {/* 거래 내역 */}
      <Tab.Screen
        name="History"
        options={{
          title: "거래 내역",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="newspaper-variant-multiple-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      >
        {(props) => (
          <History
            {...props}
            balance={balance}
            setBalance={setBalance}
            getNewToken={getNewToken}
          />
        )}
      </Tab.Screen>
      {/* 페이 */}
      <Tab.Screen
        name="Pay"
        options={{
          title: "페이",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="cash-plus"
                size={size}
                color={color}
              />
            );
          },
        }}
      >
        {(props) => (
          <PayStack
            {...props}
            balance={balance}
            bankInfo={bankInfo}
            setBalance={setBalance}
            getNewToken={getNewToken}
          />
        )}
      </Tab.Screen>
      {/* 홈 */}
      <Tab.Screen
        name="Home"
        options={{
          title: "홈",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      >
        {(props) => (
          <HomeStack
            {...props}
            balance={balance}
            id={id}
            setBalance={setBalance}
            getNewToken={getNewToken}
          />
        )}
      </Tab.Screen>
      {/* 혜택 */}
      <Tab.Screen
        name="Benefit"
        component={Benefit}
        options={{
          title: "혜택",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="lightning-bolt-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      {/* 내 정보 */}
      <Tab.Screen
        name="Mypage"
        options={{
          title: "내 정보",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      >
        {(props) => (
          <MypageStack
            {...props}
            setLogin={setLogin}
            bankInfo={bankInfo}
            setBankInfo={setBankInfo}
            getNewToken={getNewToken}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default Tabs;
