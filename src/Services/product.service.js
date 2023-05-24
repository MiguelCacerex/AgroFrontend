import httpClient from "./httpClient.service";

const END_POINT = "/api/product";

const getAllProducts = () => httpClient.get(`${END_POINT}/all`);
const getAllLastProducts = () => httpClient.get(`${END_POINT}/all/lastproducts`);
const getProductSelected = (idproduct) => httpClient.get(`${END_POINT}/selected/${idproduct}`);


export {
    getAllProducts,
    getAllLastProducts,
    getProductSelected
}