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


export function registerUser(user){
    return request({
        url: `/user`,
        method: 'post',
        data:{ 
            loginName : user.loginName,
            password : user.password,
            nickName: user.nickname,
            email : user.email
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

export function checkEmailCode(email,emailCode){
    return request({
        url: `/user/checkEmailCode`,
        params: {
            email,emailCode
        },
        method: 'get',
    })
}
