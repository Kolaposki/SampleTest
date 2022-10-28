export const state = () => ({
	branch: {}
});

export const mutations = {
	SET_BRANCH: function(state, data) {
		state.branch = data
	},
	CLEAR_BRANCH: function(state, data) {
		state.branch = data
	}
}

export const actions = {
	setBranch(context, data) {
		localStorage.setItem('branch', JSON.stringify(data))
		context.commit('SET_BRANCH', data)
	},
	setBranches(context, data) {
		localStorage.setItem('branches', JSON.stringify(data))
	},
	clearBranch(context) {
		context.commit('CLEAR_BRANCH', {})
	},
	async listBranches(context, id) {
		let user = JSON.parse(localStorage.getItem('user'))
		let url = '/API/merchantbranch/?merchID=' + id
		if (user.branchID != undefined) {
			url += '&branchID=' + JSON.stringify(user.branchID)
		}
		return await this.$axios.get(url, {
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
	async addBranch(context, data) {
		return await this.$axios.post('/API/merchantbranch/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`,
				"Content-Type": 'multipart/form-data'
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
	async updateBranch(context, data) {
		return await this.$axios.put('/API/merchantbranch/', data, {
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
	async getPerformance(context, data) {
		return await this.$axios.get('/API/merchantbranch/?merchID=' + data.merchID + '&reporttype=' + data.reporttype + '&branchID=' + data.branchID, {
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
	async saveDeliveryFee(context, data) {
		return await this.$axios.post('/API/merchantdeliveryfee/', data, {
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
	async saveDiscountFee(context, data) {
		return await this.$axios.post('/API/orderdiscountfee/', data, {
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
	async getDiscountFee(context, data) {
		return await this.$axios.get('/API/orderdiscountfee/', data, {
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
	async getDeliveryFee(context, data) {
		return await this.$axios.get('/API/merchantdeliveryfee/?merchID=' + data.merchID + '&branchID=' + data.branchID, {
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
	async updateDeliveryFee(context, data) {
		return await this.$axios.put('/API/merchantdeliveryfee/', data, {
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
	async getBranchReviews(context, data) {
		return await this.$axios.get('/API/ratemerchant/?merchID=' + data.merchID + '&branchID=' + data.branchID, {
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
	async deleteBranch(context, payload) {
		return await this.$axios.delete('/API/merchantbranch/', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`,
				'Content-Type': 'application/json'
			},
			params: {id: payload.id}
		}).then(res =>{
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
	getBranchData(state) {
		return JSON.parse(localStorage.getItem('branch'))
	}
}
