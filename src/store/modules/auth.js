import axios from '../../services/axios'
import router from '../../router'
import {toastService, toastLaravelError} from '../../services/toast'
import VARS from '../../services/variables'
import * as moment from 'moment'

const state = {
    user: {},
    userIsLogged: false
}

const getters = {
    getUser: (state) => state.user,
    getUserLogged: (state) => state.userIsLogged,
}

const actions = {
    tryAutologin: async ({commit,dispatch}, payload) => {
        const is_logged = await dispatch('isLogged')
        if(!is_logged && !payload.bypass)return;

        const axio = await axios.get(`${VARS.API_URL}user`)
            .then(async res => {
                if(res.data.username){
                    const se = await commit('setUser', res.data)
                    const sel = await commit('setUserLogged', true)

                    dispatch('connectWebsock')
                    if(payload.toDashboard){
                        router.push({path: '/'}).catch(e=>{})
                    }
                }
            })
            .catch((err) => {
                console.log(err)
            })
        return
    },
    registerUser: ({commit, dispatch}, data) => {
        axios.post(`${VARS.API_URL}register`, data)
            .then(res => {
                dispatch('handleRegLoginToken', res.data)
            })
            .catch((err) => {
                if(!err.response.data.errors)return;
                const errobj = err.response.data.errors;
                toastLaravelError(errobj);
            })
    },
    loginUser: ({commit, dispatch}, data) => {
        axios.post(`${VARS.API_URL}login`, data)
            .then(res => {
                dispatch('handleRegLoginToken', res.data)
            })
            .catch((err) => {
                if(!err.response.data.errors)return;
                const errobj = err.response.data.errors;
                toastLaravelError(errobj);
            })
    },
    handleRegLoginToken: ({dispatch, commit}, result) => {
        const expires_in = moment().valueOf() + (result.expires_in*1000);
        const access_token = result.access_token
        const refresh_token = result.refresh_token

        dispatch('setAccessToken', access_token)
        dispatch('setTokenExpiration', expires_in)
        dispatch('setRefreshToken', refresh_token)

        toastService('success', 'Success!', 'You\'ve successfuly logged in')

        dispatch('tryAutologin', {bypsss: true, toDashboard: true})
    },
    getAccessToken: () => localStorage.getItem('access_token'),
    isLogged: async ({dispatch}) => {
        const tok = await dispatch('getAccessToken')
        if(tok)return true;
        return false;
    },
    setAccessToken: ({}, token) => localStorage.setItem('access_token', token),
    setTokenExpiration: ({}, timestamp) => localStorage.setItem('expires_in', timestamp),
    setRefreshToken: ({}, token) => localStorage.setItem('refresh_token', token),
    wipeToken: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_in');
        localStorage.removeItem('refresh_token');
    },
    logOut: ({dispatch, commit}) => {
        dispatch('wipeToken')
        commit('setUserLogged', false)
        commit('setUser', {})
        router.push('/').catch(e => {})
    },
    async connectWebsock ({dispatch,getters})  {
        Echo.disconnect()
        const token = await dispatch('getAccessToken')
        const reconnectWithNewToken = await this._vm.$tokenFetchEcho()
        const logged = await getters.getUser
        if(!logged)return
        Echo.channel(`private-chat.user.${logged.id}`).listen("PrivateChatEvent", message => {
            //console.log(message)
            //return
            toastService('warn', 'New Message', `${message.senderName}: ${message.message}`)
            dispatch('addChatMessage', {message: message.message, socket: true, to_user_id: parseInt(message.user_id)});
        });
    },
}

const mutations = {
    setUserLogged: (state, bool) => {state.userIsLogged = bool},
    setUser: (state,data) => state.user = data,
}

export default {
    state,
    getters,
    actions,
    mutations
}