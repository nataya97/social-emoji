import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from "../components/Feed";
import Login from "../components/Login";
import Discovery from "../components/Discovery";
import UserPage from "../components/UserPage";
import Register from "../components/Register";
import Logout from "../components/Logout";

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
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/discovery',
        name: 'Discovery',
        component: Discovery
    },
    {
        path: '/profile',
        name: 'UserPage',
        component: UserPage
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
