import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.10/vue.esm.browser.min.js'
import VueRouter from 'https://cdnjs.cloudflare.com/ajax/libs/vue-router/3.1.3/vue-router.esm.browser.min.js'

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