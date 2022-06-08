export interface IUsersArray {
  "id": number,
  "name": string,
  "email":string,
  "password":string,
  "role": string,
};
export interface IPageDetail {
  "id": number,
  "name": string,
  "userId": number
}
export interface IRole {
  "ADMIN": string,
  "BASIC": string
}
export interface IMgmtDetails {
  "ROLE": IRole,
  "users": IUsersArray[],
  "page": IPageDetail[]
}

export interface Ipayload {
  "user":string,
  "role":string
}