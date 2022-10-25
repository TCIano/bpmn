import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import router from './router'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
new Vue({
    render: h => h(App),
    pinia,
    router,
}).$mount('#app')
