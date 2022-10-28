export const state = () => ({

});

export const mutations = {
}

export const actions = {
	async listCampaign(context, id) {
		return await this.$axios.get('/API/rewardcampaigns/?merchID=' + id, {
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
	async createCampaign(context, data) {
		return await this.$axios.post('/API/rewardcampaigns/', data, {
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
