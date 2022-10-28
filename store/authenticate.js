export const state = () => ({
	userData: {},
	token: ''
});

export const mutations = {
	SET_USER_DATA: function(state, data) {
		state.userData = data
	},
	CLEAR_USER_DATE: function(state, data) {
		state.userData = data
	},
	SET_TOKEN: function(state, data) {
		state.token = data
	},
	CLEAR_TOKEN: function(state, data) {
		state.token = data
	}
}

export const actions = {
	setUserData(context, data) {
		context.commit('SET_USER_DATA', data)
	},
	clearUserData(context) {
		context.commit('CLEAR_USER_DATE', {})
	},
	clearToken(context) {
		context.commit('CLEAR_TOKEN', '')
	},
	async userLogin(context, data) {
		return await this.$axios.get('/API/merchantauthentication/?username=' + data.email + '&password=' + data.password)
			.then(res => {
				localStorage.setItem('user', JSON.stringify(res.data.data))
				localStorage.setItem('token', res.data.token)
				context.commit('SET_USER_DATA', res.data.data)
				return res.data
			}).catch(err => {
				// console.log('Error code: ', err.code)
				if (err.code == 401) {
					localStorage.clear();
					localStorage.removeItem('token')
					window.location = '/'
				}
				return err
			})
	}
}

export const getters = {
	getUserData(state) {
		return state.userData
	},
	getUserToken(state) {
		return state.token
	}
}
