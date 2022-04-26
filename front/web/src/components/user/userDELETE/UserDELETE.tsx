import { Components } from "components/Components";

export const UserDELETE = () => {
  ////////////// 입력해야하는 부분 ///////////
  const API = {
    uri: "/client",
    method: "DELETE",
    detail: "회원 탈퇴",
    completed: false,
  };
  const requestBody = {
    token: [
      {
        value: "jwt",
        type: "string",
        required: true,
      },
    ],
  };
  ///////////////////////////////////

  return (
    <>
      <Components API={API} requestBody={requestBody} />
    </>
  );
};
