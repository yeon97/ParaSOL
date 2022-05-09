import { Btn, BtnContainer, BtnText } from "../screens/styled";

interface PropsType {
  color: string;
  text: string;
  setPrice?: (a: string) => void;
  setIsUpdate?: (a: boolean) => void;
  setLogin?: (a: boolean) => void;
  onSubmit?: any;
  deleteUser?: any;
  navigation?: any;
}

const BtnBox: React.FC<PropsType> = ({
  color,
  text,
  setPrice,
  setIsUpdate,
  setLogin,
  onSubmit,
  deleteUser,
  navigation,
}) => {
  const onPress = () => {
    switch (text) {
      case "충전하기":
        console.log("charge");
        navigation?.navigate("Charging");
        break;
      case "출금하기":
        console.log("withdraw");
        navigation?.navigate("Withdrawing");
        break;
      case "송금하기":
        console.log("transaction");
        navigation?.navigate("Transaction");
        break;
      case "QR 스캔":
        console.log("QR scan");
        break;
      case "정보 수정":
        console.log("update info");
        // navigation?.navigate("UpdateProfile");
        setIsUpdate?.(true);
        break;
      case "수정 완료":
        console.log("complete update");
        setIsUpdate?.(false);
        break;
      case "비밀번호 수정":
        console.log("update password");
        break;
      case "회원 탈퇴":
        console.log("delete info");
        deleteUser?.();
        // setLogin?.(false);
        break;
      case "초기화":
        console.log("reset");
        setPrice?.("0");
        break;
      case "뒤로":
        navigation?.goBack();
        console.log("back");
        break;
      case "로그인":
        console.log("login");
        break;
      case "회원가입":
        console.log("register");
        onSubmit?.();
      default:
        console.log("set text props");
    }
  };

  return (
    <BtnContainer>
      <Btn color={color} onPress={onPress}>
        <BtnText white={color === "white" ? true : false}>{text}</BtnText>
      </Btn>
    </BtnContainer>
  );
};

export default BtnBox;
