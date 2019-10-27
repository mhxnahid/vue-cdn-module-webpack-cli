const state = {
    posts: [{title: 'Default', detail: 'Some text'}]
}

const getters = {
    allPosts: (state) => state.posts.slice().reverse()
}

const actions = {}

const mutations = {
    addPost: (state, post) => {
        state.posts.push(post);
    }
}

export default {
    state, getters, actions, mutations
}