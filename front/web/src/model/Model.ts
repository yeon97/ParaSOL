export const LoginInfo = [
  {
    value: "id",
    type: "string",
    required: true,
  },
  {
    value: "password",
    type: "string",
    required: true,
  },
];
export const UserInfo = [
  ...LoginInfo,
  {
    value: "name",
    type: "string",
    required: true,
  },
];
export const Transaction = [
  {
    value: "bankName",
    type: "string",
    required: true,
  },
  {
    value: "amount",
    type: "long",
    required: true,
  },
];
export const Password = [
  {
    value: "password",
    type: "string",
    required: true,
  },
];
export const BankInfo = [
  {
    value: "bankName",
    type: "string",
    required: true,
  },
];
export const AccountInfo = [
  {
    value: "bankName",
    type: "string",
    required: true,
  },
  {
    value: "bankAccountNumber",
    type: "string",
    required: true,
  },
];
export const AccountList = [
  {
    value: "accounts",
    type: "List<AccountInfo>",
    required: true,
  },
];
export const AccountBalance = [
  ...AccountInfo,
  {
    value: "balance",
    type: "long",
    required: true,
  },
];
export const AccountHistory = [
  {
    value: "txDatetime",
    type: "localDateTime",
    required: true,
  },
  {
    value: "txMethod",
    type: "{TransactionType}",
    required: true,
  },
  {
    value: "amount",
    type: "long",
    required: true,
  },
  {
    value: "balance",
    type: "long",
    required: true,
  },
  {
    value: "accountTo",
    type: "[AccountInfo]",
    required: true,
  },
];
export const AccountHistories = [
  {
    value: "accountHistories",
    type: "List<AccountHistory>",
    required: true,
  },
];
export const Token = [
  {
    value: "JwtHeader",
    type: "string",
    required: true,
  },
];
export const AccessToken = [
  {
    value: "accessToken",
    type: "string",
    required: true,
  },
];
export const RefreshToken = [
  {
    value: "refreshToken",
    type: "string",
    required: true,
  },
];
export const AuthToken = [...AccessToken, ...RefreshToken];

////////////////////////////////////////////////////////////
//// JwtHeader
export const JwtHeader = [...AccessToken];
//// Request
export const LoginRequest = [...LoginInfo];
export const BankConnectionRequest = [...BankInfo, ...LoginInfo];
export const UserRegisterRequest = [...UserInfo];
export const UserUpdateRequest = [...UserInfo];
export const DepositRequest = [
  ...Transaction,
  {
    value: "nameFrom",
    type: "string",
    required: true,
  },
  {
    value: "accountNumber",
    type: "[accountTo]",
    required: true,
  },
];
export const WithdrawRequest = [
  ...Transaction,
  {
    value: "nameTo",
    type: "string",
    required: true,
  },
  {
    value: "accountNumber",
    type: "[accountFrom]",
    required: true,
  },
  {
    value: "bankAccountPassword",
    type: "string",
    required: true,
  },
];
const [a, , b] = UserInfo;
export const PasswordResetRequest = [a, b];
export const QueryAccountListRequest = [...BankInfo];
export const QueryAccountBalanceRequest = [...AccountInfo];
export const QueryAccountHistoryRequest = [...AccountInfo];
export const ReissueTokenRequest = [
  ...RefreshToken,
  {
    value: "id",
    type: "string",
    required: true,
  },
];
export const PasswordUpdateRequest = [
  ...Password,
  {
    value: "newPassword",
    type: "string",
    required: true,
  },
];
export const IdCheckRequest = [
  {
    value: "id",
    type: "string",
    required: true,
  },
];
//// Response
export const AuthTokenResponse = [...AuthToken];
export const AccountListQueryResultResponse = [...AccountList];
export const AccountBalanceQueryResultResponse = [...AccountBalance];
export const AccountHistoryQueryResultResponse = [...AccountHistories];
export const TransactionExecuteResultResponse = [...Transaction];
export const UserInfoQueryResultResponse = [...UserInfo];
