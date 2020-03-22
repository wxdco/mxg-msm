import axios from 'axios'
import router from "@/router"
import {Loading,Message} from "element-ui"

const loading = {
    loadingInstance: null,
    open(){
        if(this.loadingInstance === null){
            this.loadingInstance = Loading.service({
                text: '拼命加载中...',
                background: '#fff'
            })
        }
    },
    close(){
        if(this.loadingInstance !== null){
            this.loadingInstance.close()
        }
        this.loadingInstance = null
    }
}


const request = axios.create({
    // /db.json >  通过 axios > /dev-api/db.json >  通过 代理转发（vue.config.js）》 http://localhost:8001/db.json
    // baseURL: '/dev-api', 
    baseURL: process.env.VUE_APP_BASE_API, 
    // baseURL: '/',
    timeout: 5000 // 请求超时，5000毫秒
})


// 请求拦截器
request.interceptors.request.use(config => {
    Message.closeAll()
    loading.open();
    // 请求拦截
    let token = window.localStorage.getItem("hrm-token")
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.token = `${token}`;
    }
    return config; 
}, error => {
    loading.close();
    // 出现异常
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response =>{
    // 结束加载动画
    loading.close();
    const resp = response.data
    if(resp.code === 401){
        this.$router.push('/login')
        return response
    } else {
        return response
    }
}, error => {
    loading.close();
    //请求报错处理
    switch (error.response.status) {
        case 401:
            localStorage.removeItem("hrm-token");
            router.push({ path: '/login' })
            break;
        default:
            return Promise.reject(error)
    }
})

//  http://localhost:8888/dev-api/db.json 404
// request.get('/db.json').then(response => {
//     console.log(response.data)
// })

export default request // 导出自定义创建 axios 对象