import Vue from 'vue';
import VueRouter from 'vue-router';

import Vheader from './components/Vheader';
import Vhome from './components/Vhome';
import Vabout from './components/Vabout';
import Verror from './components/Verror';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: Vhome},
        {path: '/about', component: Vabout},
        {path: '*', component: Verror}
    ],
    mode: 'history',
    base: '/'
});

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
});