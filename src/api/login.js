import axios from 'axios';
// 登录
// export const login = (username) => request({
//     method: 'post',
//     url: 'login',
//     data: { username }
// })
export const login = params => {
    console.log(params);
    return axios.post(`http://localhost:3000/login`,
        params).then(res => res.data);
};
