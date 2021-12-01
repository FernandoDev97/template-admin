import axios from 'axios'

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/workinideas/vagafrontendteste/items'
})

export default api;