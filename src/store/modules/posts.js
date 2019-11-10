import axios from '../../services/axios'
import {toastService} from '../../services/toast'
import VARS from '../../services/variables'

const state = {
    posts: []
}

const getters = {
    allPosts: (state) => state.posts
}

const actions = {
    fetchPosts: ({ commit }) => {
        commit('initPosts')
        axios.get(`${VARS.API_URL}posts`)
            .then((res) => {
                res.data.forEach((ele, index) => {
                    if (index > 9) return;
                    commit('addPost', ele)
                });
            });
    },
    addPost: ({ commit }, post) => {
        axios.post(`${VARS.API_URL}posts`, { post }).then(res => {
            commit('addPost', res.data.post)
            toastService('success', 'Added', 'The post has been added')
        })
    },
    removePost: ({ commit }, payload) => {
        axios.delete(`${VARS.API_URL}posts/1`).then(() => {
            commit('removePost', payload.index)
            payload.dialog.close()
            toastService('warn', 'Removed', 'The post has been removed')
        });
    }
}

const mutations = {
    initPosts: (state) => state.posts = [],
    addPost: (state, post) => state.posts.unshift(post),
    removePost: (state, index) => state.posts.splice(index, 1)
}

export default {
    state,
    getters,
    actions,
    mutations
}