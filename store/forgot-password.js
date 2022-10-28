export const state = () => ({

});

export const mutations = {

}

export const actions = {
	async forgotPassword(context, data) {
		return this.$axios.post('/API/merchantpasswordrecovery/', data)
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
	async passwordReset(context, data) {
		return this.$axios.post('/API/passwordrecovery/', data)
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
	async activateEmail(context, data) {
		return this.$axios.get('/API/merchantactivation/?token=' + data.token)
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
