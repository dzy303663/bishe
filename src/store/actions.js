import * as types from './mutations-types.js'

export const loginState=function ({commit}) {
    console.log("actions");
    commit(types.SET_LOGIN,true);
}

export const setUserName = function ({ commit }, userName) {
    console.log("actions");
    commit(types.SET_USERNAME, userName);
}
