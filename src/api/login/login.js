import request from '@/utils/request'


export function login(username, password) {
    return request({
        url: `/login`,
        method: 'post',
        data: {
            loginName:username,
            password:password
        }
    })
}

export function checkToken(){
    return request({
        url: `/login/checkToken`,
        method: 'get',
    })
}


export function registerUser(user){
    return request({
        url: `/login/register`,
        method: 'post',
        data:{ 
            loginName : user.loginName,
            password : user.password,
            nickName: user.nickname,
            email : user.email
        }
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
        url: `/login/register/exist/${username}`,
        method: 'get',
    })
}

export function getEmailCode(email){
    return request({
        url: `/login/register/sendEmailCode`,
        params: {
            email
        },
        method: 'get',
    })
}

export function checkEmailCode(email,emailCode){
    return request({
        url: `/login/register/checkEmailCode`,
        params: {
            email,emailCode
        },
        method: 'get',
    })
}
