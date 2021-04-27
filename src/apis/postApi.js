import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:8095',
    headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-type": "application/json",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
    },
});
