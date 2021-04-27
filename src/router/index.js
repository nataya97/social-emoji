import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from "../components/Feed";
import Login from "../components/Login";
import Discovery from "../components/Discovery";

Vue.use(VueRouter)

const routes = [
    {
        path: '/feed',
        name: 'Feed',
        component: Feed
    },
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/discovery',
        name: 'Discovery',
        component: Discovery
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
