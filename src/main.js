import Vue from 'vue';
import VueRouter from 'vue-router';

import './main.css';

import Vheader from './components/Vheader';
import Vhome from './components/Vhome';
const Vabout = () => import('./components/Vabout');
const Verror = () => import( './components/Verror');
const Posts = () => import('./components/Posts');

import store from './store'

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: Vhome},
        {path: '/about', component: Vabout},
        {path: '/posts', component: Posts},
        {path: '*', component: Verror}
    ],
    mode: 'history',
    base: '/'
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    el: '#app',
    data: {
        works: 'Vue works!',
        text: ''
    },
    components: {
        Vheader,
        Vhome,
    }
});