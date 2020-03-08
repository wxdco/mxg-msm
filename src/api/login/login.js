import request from '@/utils/request'


export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username, // username: username
            password
        }
    })
}

export function getUser(token){
    return request({
        url: `/user/info/${token}`,
        method: 'get'
    })
}

export function logout(token){
    return request({
        url: `/user/logout`,
        method: 'post',
        data:{ token }
    })
}

export function checkUser(username){
    return request({
        url: `/user/exist`,
        params: {
            loginName: username
        },
        method: 'get',
    })
}

export function getEmailCode(email){
    return request({
        url: `/user/emailCode`,
        params: {
            email
        },
        method: 'get',
    })
}