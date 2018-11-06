import {login} from '@/api/login'
const user = {
    state: {

    },
    actions: {
        //登录
       
        Login ({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                login(userInfo.username).then(data => {
               
                // console.log(data);
                // const Token = data.result
                // setToken(Token)
                // commit('SET_TOKEN', Token)
                resolve(data)
              }).catch(error => {
               
                console.log(error);
                reject(error)
              })
             
            })
          },
    }

}
export default user