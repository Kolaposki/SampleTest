export const state = () => ({
	details: {}
});

export const mutations = {
	SET_DETAILS: function(state, data) {
		state.details = data
	},
	CLEAR_DETAILS: function(state) {
		state.details = {}
	}
}

export const actions = {
	setDetails(context, data) {
		localStorage.setItem('setDetails', data)
		context.commit('SET_DETAILS', data)
	},
	clearDetails(context) {
		context.commit('CLEAR_DETAILS')
	},
	async getCustomers(context, data) {
		//  '/API/customer/?merchID=' + data
		
		return await this.$axios.get('/API/customer/?merchID=' + data.id + '&page=' + data.page, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
	},
	async deleteCustomer(context, payload) {
        return await this.$axios.delete('/API/customerecord/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { id: payload.id }
        }).then(res => {
            return res
        }).catch(err => {
            if (err.code == 401) {
				localStorage.clear();
                window.location = '/'
            }
            return err
        })
    },
	async getCustomersAll(context, data){
		
		return await this.$axios.get('/API/offlinecustomer/?merchID=' + data.id + '&pagination=false', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
	},
	async sendPushNotification(context, data) {
		// data.url = ;
		let url = data.url;
		delete data.url;
		delete data.type;
		return await this.$axios.post(url, data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
	},
	async saveCustomer(context, data) {
		return await this.$axios.post('/API/customerecord/',data, {
				headers: {
					// "Content-Type": 'multipart/form-data',
					'Authorization': `Bearer ${localStorage.getItem('token')}`
				}
			})
			.then(res => {
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.clear();
					window.location = '/'
				}
				return err
			})
    },
	async updateCustomer(context, data) {
		return await this.$axios.put('/API/customerecord/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res =>{
			  return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.clear();
					window.location = '/'
				}
				return err
			})
	},

}

export const getters = {
	getDetails(state) {
		return state.details
	}
}
