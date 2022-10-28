export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async listRules(context, id) {
		return await this.$axios.get('/API/merchantloyaltyrule/?merchID=' + id, {
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
	async createRule(context, data) {
		return await this.$axios.post('/API/merchantloyaltyrule/', data, {
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
	async updateRule(context, data) {
		return await this.$axios.put('/API/merchantloyaltyrule/', data,  {
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
	async deleteRule(context, data) {
		return await this.$axios.delete('/API/merchantloyaltyrule/', {
			
			headers: {
				
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			},
			params: {id: data.id}

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
	}

}

export const getters = {
}
