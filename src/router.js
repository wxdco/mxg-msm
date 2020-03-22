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

const router =  new Router({
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

// 路由守卫
router.beforeEach((to, from, next) => {
  // 判断localstorage里面是否有token
  const isLogin = localStorage.getItem("hrm-token") ? true : false;
  if(to.path == "/login"){
    next();
  }else{
    // 如果为真，正常跳转，否则跳到登录页面
    isLogin ? next():next('/login');
  }

})

export default router;
