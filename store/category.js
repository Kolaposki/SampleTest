export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async addCategory(context, data) {
		return await this.$axios.post('/API/category/', data, {
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
	async getCategories(context, id) {
		return await this.$axios.get('/API/category/?merchID=' + id, {
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
	async updateCategory(context, data) {
		return await this.$axios.put('/API/category/', data, {
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
	async deleteCategory(context, payload) {
		return await this.$axios.delete('/API/category/', {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
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
}
