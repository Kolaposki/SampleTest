export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async listVendors(context, id) {
		return await this.$axios.get('/API/vendor/?merchID=' + id, {
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
	async saveVendor(context, data) {
		return await this.$axios.post('/API/vendor/', data, {
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
	async editVendor(context, data) {
		return await this.$axios.put('/API/vendor/', data, {
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
	async deleteVendor(context, payload) {
		return await this.$axios.delete('/API/vendor/', {
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
}
