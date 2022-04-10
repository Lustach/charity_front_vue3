export default {
    state: {
        loading: true,
    },
    mutations:{
        toggleIsLoading(state,value){
            state.loading = value;
        },
    },
};