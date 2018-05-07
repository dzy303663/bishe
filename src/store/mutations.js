import * as types from './mutations-types'

const mutations = {
    [types.SET_LOGIN](state,login_state){
        console.log(login_state);
        state.login_state = login_state;
    }
}

export default mutations