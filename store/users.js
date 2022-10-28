export const state = () => ({
	staff: {}
});

export const mutations = {
	SET_STAFF: function(state, data) {
		state.staff = data
	},
	CLEAR_STAFF: function(state, data) {
		state.staff = data
	}
}

export const actions = {
	setStaff(context, data) {
		localStorage.setItem('user_data', JSON.stringify(data))
		context.commit('SET_STAFF', data)
	},
	clearStaff(context) {
		context.commit('CLEAR_STAFF', {})
	},
	async getAllUsers(context, data) {
		let user = JSON.parse(localStorage.getItem('user'))
		let url = '/API/logisticmerchantusers/?merchID=' + data.merchID 
		if (user.branchID != undefined) {
			url += '&branchID=' + JSON.stringify(user.branchID)
		}
		return await this.$axios.get(url, {
		// return await this.$axios.get('/API/merchantusers/?merchID=' + data.merchID + '&role=' + data.role, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	async createUser(context, data) {
		return await this.$axios.post('/API/merchantusers/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	async updateUser(context, data) {
		return await this.$axios.put('/API/merchantusers/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	async updateRole(context, data) {
		return await this.$axios.put('/API/assignuserole/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	async changePassword(context, data) {
		return await this.$axios.post('/API/userpasswordchange/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	async changeToken(context, data) {
		return await this.$axios.post('/API/changeusertoken/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		})
			.then(res =>{
				return res
			}).catch(err => {
				if (err.code == 401) {
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	},
	
	// localhost:8000/stafforderhistory/?id=1
	async staffOrderHistory(context, payload) {
		return await this.$axios.get('/API/stafforderhistory/', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			},
			params: {id: payload.id}
		}).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
	},
	async deleteUser(context, payload) {
		return await this.$axios.delete('/API/user/', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			},
			params: {id: payload.id}
		}).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
	}
}

export const getters = {
	getStaff(state) {
		return JSON.parse(localStorage.getItem('user_data'))
	}
}
