import router from '@/router.js'
import {getUser} from '@/api/user/user.js'



/**
 * 登录过滤器
 * 
 * to:即将要进入的路由对象
 * from：即将要离开的路由对象
 * next： 一个方法 可以跳转的指定路由
 * 
 */
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("hrm-token");
    //1.判断localStorage中是否有token
    if(!token){
        //1.1 没有，跳转到登录页
        if(to.path !== '/login'){
            next({path: '/login'})
        } else{
            next();
        }
    } else {
        //1.2 有 如果是login 那就去login
        if(to.path === '/login'){
            next();
        } else {
            //如果不是login，先看本地有没有用户信息，有就去直接放行，没有通过token获取用户信息
            const userInfo = localStorage.getItem("hrm-user");
            if(userInfo){
                next();
            } else {
                getUser().then(response => {
                    const resp = response.data;
                    if(resp.code == 200){
                        localStorage.setItem("hrm-user",JSON.stringify(resp.data))
                        next();
                    } else {
                        next({path: '/login'})
                    }
                })
            }

        }
    }
              
})