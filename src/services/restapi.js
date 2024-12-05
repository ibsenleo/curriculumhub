import axios from "axios";

const baseUrl = 'http://localhost'
const port = 1337
const apiVersion = 'api'

const apiUrl = baseUrl + ':' + port + (apiVersion ? '/'+apiVersion : '');

export const restApi = axios.create({
    baseURL: apiUrl
})

export const restApiAuth = (token) => {
    return axios.create({
        baseURL: apiUrl,
        headers: {'Authorization': 'Bearer ' + token}
    })
}