import httpClient from "./httpClient.service";

const END_POINT = "/api/buyer";

const addProductCar = (idProduct, idBuyer, cantidad) => httpClient.post(`${END_POINT}/addcar/${idProduct}/${idBuyer}/${cantidad}`);
const getAllProductsCar = (idBuyer) => httpClient.get(`${END_POINT}/allProductsCar/${idBuyer}`);
const deleteProductCar = (idProduct,idBuyer) =>  httpClient.delete(`${END_POINT}/delete/${idProduct}/${idBuyer}`);


export {
    addProductCar,
    getAllProductsCar,
    deleteProductCar
}