export const state = () => ({
    rider_row: {}
});

export const mutations = {
    SET_RIDER: function(state, data) {
        state.rider_row = data
    }
}

export const actions = {

    async getAllRiders(context) {
        return await this.$axios.get('/API/allriders/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return res
        }).catch(err => {

            return err
        })
    },
    setRider(context, data) {

        context.commit('SET_RIDER', data)
    },
}

export const getters = {

    getRider(state) {
        return state.rider_row
    }
}