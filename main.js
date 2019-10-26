import Vue from 'vue'
import VueRouter from 'vue-router'

import Vheader from './Vheader.js'
import Vhome from './Vhome.js'
import Vabout from './Vabout.js'
import Verror from './Verror.js'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: '/', component: Vhome},
        {path: '/about', component: Vabout},
        {path: '*', component: Verror}
    ],
    mode: 'history',
    base: '/test/vue-cdn-module-webpack-cli/'
})

new Vue({
    router,
    el: '#app',
    data: {
        works: 'Vue works!',
        text: ''
    },
    components: {
        Vheader,
        Vhome,
        Verror
    }
})