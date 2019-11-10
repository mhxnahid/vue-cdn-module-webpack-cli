import axios from './axios'
import VARS from './variables'

export const validatorExtends = {
    checkUniqueUsername: (val) => {
        return axios.post(`${VARS.API_URL}checkUniqueUsername`, {username: val})
    },
    checkUniqueEmail: (val) => {
        return axios.post(`${VARS.API_URL}checkUniqueEmail`, {email: val})
    },
}

export default validatorExtends;