import httpClient from "./httpClient.service";

const END_POINT = "/api/user";

const singUp = (user) => httpClient.post(`${END_POINT}/signup/`, user);
const singIn = (email, password) => httpClient.get(`${END_POINT}/signin/${email}/${password}`);
const confirmUser = (token) => httpClient.post(`${END_POINT}/confirm/${token}`);


export { 
    singUp,
    singIn,
    confirmUser 
}