import httpClient from "./httpClient.service";

const END_POINT = "/api/seller";

const getProductsSeller = (idSeller) => httpClient.get(`${END_POINT}/all/products/${idSeller}`);
const createNewProduct = (idSeller,dataProduct) => httpClient.post(`${END_POINT}/create/product/${idSeller}`, dataProduct);
const updateProduct = (idProduct,dataProduct) => httpClient.put(`${END_POINT}/update/product/${idProduct}`, dataProduct);
const deleteProduct = (idSeller,idProduct) => httpClient.delete(`${END_POINT}/delete/product/${idSeller}/${idProduct}`);



export {
    getProductsSeller,
    createNewProduct,
    updateProduct,
    deleteProduct
}