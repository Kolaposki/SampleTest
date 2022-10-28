export const state = () => ({
	customer: {}
});

export const mutations = {
	SET_CUSTOMER: function(state, data) {
		state.customer = data
	},
	CLEAR_CUSTOMER: function(state) {
		state.customer = {}
	}
}

export const actions = {
	setCustomer(context, data) {
		localStorage.setItem('customer', JSON.stringify(data))
		context.commit('SET_CUSTOMER', data)
	},
	clearCustomer(context) {
		context.commit('CLEAR_CUSTOMER')
	},
	async getAllCustomers(context, data) {
		return await this.$axios.get('/API/customer/?merchID=' + data.merchantID, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.clear();
					window.location = '/'
				}
				return err
			})
	},

	async searchCustomer(context, data) {
		return await this.$axios.get('/API/customerrecord/?merchID=' + data.merchID + '&searchkey=' + data.search + '&page=' + data.page, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.clear();
					window.location = '/'
				}
				return err
			})
	},


	async getCustomerLoyalty(context, data) {
		return await this.$axios.get('/API/rewardloyalty/?merchID=' + data.merchantID + '?branchID=' + data.branchID + '?rewardtype=percentageorderdiscount', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
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
	getCustomer(state) {
		return JSON.parse(localStorage.getItem('customer'))
	}
}
