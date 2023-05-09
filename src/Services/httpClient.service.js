import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://agromarketshop.up.railway.app',
    timeout: 50000,
    headers: {
        "Content-Type": "application/json"
    }
})

export default httpClient;