import Vue from 'vue';
import CxltToastr from 'cxlt-vue2-toastr'
import VuejsDialog from 'vuejs-dialog';
import Echo from 'laravel-echo';
import 'pusher-js'

import Vheader from './components/Vheader'
import Vhome from './components/Vhome'

import './main.css';

import router from './router'
import store from './store'

store.dispatch('tryAutologin', {bypsss: false, toDashboard: false})

Vue.prototype.$tokenFetchEcho =  async() => {
    const token =  await store.dispatch('getAccessToken')
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'PUSHERKEY',
        cluster: 'mt1',
        encrypted: false,
        wsHost: '127.0.0.1',
        authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
        auth: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        },
        wsPort: 6001,
        disableStats: true,
    });
}


Vue.use(CxltToastr, {
    position: 'bottom left',
    timeOut: 5000
});
Vue.use(VuejsDialog);


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    components: {
        Vheader,
        Vhome,
    },
    created(){
        this.$tokenFetchEcho()
    }
}).$mount('#app');