export default {
    state:{
        uid: '',
        token: '',
    },
    mutations:{
        setState(state,payload){
            // state = {...payload}
            state.uid = payload.uid;
            state.token = payload.token;
        },
    },
    getters:{
        getResetPasswordState(state){
            return state;
        },
    },
};