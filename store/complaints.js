export const state = () => ({
	complaints: {},
});

export const mutations = {
	SET_COMPLAINTS: function(state, data) {
		state.complaints = data
	},	
}

export const actions = {	
	async getComplaints(context, data) {
		return await this.$axios.get('/API/feedback/?startdate=' + data.startdate + '&enddate=' + data.enddate, {
            headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
        }).then(res => {
            context.commit('SET_COMPLAINTS', res.data)
            return res.data
        }).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
	},
	async updateComplaint(context, data) {
		return await this.$axios.put('/API/feedback/', data, {
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

export const getters = {
	getComplaints(state) {
		return state.token
	}
}
