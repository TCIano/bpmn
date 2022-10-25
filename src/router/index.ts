import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/home',
        name: 'home',
        // redirect: '/home',
        component: () => import('../view/home/index.vue'),
    },
    {
        path: '/bpmn',
        name: 'bpmn',
        // redirect: '/home',
        component: () => import('../view/bnmp/index.vue'),
    },
]

const createRouter = () =>
    new VueRouter({
        routes,
    })

const router = createRouter()

export function useRouter() {
    return router
}

export function useRoute() {
    return router.currentRoute
}
export default router
