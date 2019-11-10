import axios from 'axios'
import store from '../store'

//Vue.use(axios)
const custom = axios.create()

custom.interceptors.request.use(async config => {
    config.headers.Accept = 'application/json'
    const response = await store.dispatch('getAccessToken')
    //console.log(response)
    if (response && response != null && response != '' && response != false && response != 'undefined') {
        config.headers.Authorization = `Bearer ${response}`;
    }
    return config;
});

export default custom;