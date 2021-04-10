import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from "../components/Feed";
import Login from "../components/Login";

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
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
