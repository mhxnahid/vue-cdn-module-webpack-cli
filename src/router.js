import Vue from 'vue'
import VueRouter from 'vue-router';

import Vheader from './components/Vheader';
import Vhome from './components/Vhome';
const Vabout = () => import('./components/Vabout');
const Verror = () => import('./components/Verror');
//const Posts = () => import('./components/Posts');
const Notifications = () => import('./components/Notifications');
const Login = () => import('./components/Login');
const Register = () => import('./components/Register');

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Vhome },
        { path: '/about', component: Vabout },
        //{ path: '/posts', component: Posts },
        { path: '/notifications', component: Notifications },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '*', component: Verror }
    ],
    mode: 'history',
    base: '/'
});

export default router;