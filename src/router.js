import Vue from "vue";
import Router from "vue-router";
import Login from "./views/login";
import Layout from "@/components/layout.vue"
import Home from './views/home'
import Staff from './views/staff'
import Salary from './views/salary'
import Attence from './views/attence'
import Performance from './views/performance'
import Log from './views/log'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "layout",
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          meta: {title: '首页'}
        }
      ]
    },
    {
      path: '/staff',
      component: Layout,
      children: [
        {
          path: '/',
          component: Staff,
          meta: {title: '员工管理'}
        }
      ]
    },
    {
      path: '/salary',
      component: Layout,
      children: [
        {
          path: '/',
          component: Salary,
          meta: {title: '薪资管理'}
        }
      ]
    },
    {
      path: '/attence',
      component: Layout,
      children: [
        {
          path: '/',
          component: Attence,
          meta: {title: '考勤管理'}
        }
      ]
    },
    {
      path: '/performance',
      component: Layout,
      children: [
        {
          path: '/',
          component: Performance,
          meta: {title: '绩效管理'}
        }
      ]
    },
    {
      path: '/log',
      component: Layout,
      children: [
        {
          path: '/',
          component: Log,
          meta: {title: '日志管理'}
        }
      ]
    }

  ]
});
