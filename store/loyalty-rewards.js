export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async listLoyaltyRewards(context, id) {
		return await this.$axios.get('/API/rewardloyalty/?merchID=' + id, {
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
	async createLoyaltyRewards(context, data) {
		return await this.$axios.post('/API/rewardloyalty/', data, {
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
