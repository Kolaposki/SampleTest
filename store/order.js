export const state = () => ({
	// complaints: {},
});

export const mutations = {
	// SET_COMPLAINTS: function(state, data) {
	// 	state.complaints = data
	// },	
}

export const actions = {	
	async placeOrder(context, data) {
		return await this.$axios.post('/API/placeadmindeliveryorder/', data, {
            headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
        }).then(res => {
            return res.data
        }).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
	}
}

