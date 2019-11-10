import axios from '../../services/axios'
import VARS from '../../services/variables'
import toasterService from '../../services/toast'
import * as moment from 'moment'

const state = {
    chatList: [],
    chatUsers: [],
}

const getters = {
    getChatList: (state) => state.chatList,
    getChatUsers: (state) => state.chatUsers,
}

const actions = {
    fetchChatUsers({commit}){
        axios.get(`${VARS.API_URL}users`)
            .then(res => {
                commit('setChatUsers', res.data)
            })
    },
    fetchChatMessages({commit,getters}, user_id){
        axios.get(`${VARS.API_URL}listChatMessages/${user_id}`)
            .then(res => {
                if(!res.data.data)return 
                const messages = res.data.data;
                commit('removeChatFromUser', user_id)
                //user = getters.getUser
                messages.forEach(ele => {
                    ele.socket = (ele.to_user_id != user_id) ? true : false;
                    ele.to_user_id = user_id
                    ele.unshift = true;
                    commit('addChatMessageM', ele)
                })
            })
    },
    submitTestChat: ({commit, dispatch}, data) => {
        return axios.post(`${VARS.API_URL}privateChat`, data)
    },
    addChatMessage: ({commit,getters}, msg) => {
        const thisUser = getters.getChatUsers.filter(ele => ele.id == msg.to_user_id)
        //console.log(thisUser)
        let filteredUsers = getters.getChatUsers.filter(ele => ele.id != msg.to_user_id)
        //console.log(filteredUsers)
        filteredUsers.unshift(thisUser[0])
        commit('setChatUsers', filteredUsers)

        msg.unshift=false;
        commit('addChatMessageM', msg)
    },
}

const mutations = {
    addChatMessageM: (state, data) => {        
        const add = {
            message: data.message,
            socket: data.socket,
            to_user_id: data.to_user_id,
            time: (data.created_at) ? moment.utc(data.created_at).local().format('h:mm a') : moment().format('h:mm a'),
        }
        
        //console.log(data.socket)
        if(data.unshift){
            state.chatList.unshift(add)
        }else{
            state.chatList.push(add)
        }

        var chatWindow = document.getElementById("chatWindow");
        setTimeout(() => chatWindow.scrollTop = chatWindow.scrollHeight, 100)

    },
    setChatUsers: (state,data) => state.chatUsers = data,
    removeChatFromUser: (state,user_id) => {
        state.chatList = state.chatList.filter(ele => ele.to_user_id != user_id)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}