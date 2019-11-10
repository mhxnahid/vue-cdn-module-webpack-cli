import Vue from 'vue'

const toastService = (type='success', title='', message='') => {
    Vue.prototype.$toast[type]({
        title,
        message
    })
}

const toastLaravelError = (errobj) => {
    Object.keys(errobj).forEach((ele,index) => {
        errobj[ele].forEach(ele => {
            toastService('error', 'Error', ele)
        })
    });
}

export {toastService, toastLaravelError}