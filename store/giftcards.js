export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async listGiftCards(context, id) {
		return await this.$axios.get('/API/merchantgiftcard/?merchID=' + id, {
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
	async createGiftCards(context, data) {
		return await this.$axios.post('/API/merchantgiftcard/', data, {
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
}
