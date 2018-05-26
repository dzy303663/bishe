import * as types from './mutations-types'

const mutations = {
    [types.SET_LOGIN](state,login_state){
        console.log(login_state);
        state.login_state = login_state;
    },
    [types.SET_USERNAME](state, userName) {
        console.log(userName);
        state.userName = userName;
    },
}

export default mutations