export const state = () => ({
});

export const mutations = {
}

export const actions = {
	async getLicenses() {
		return this.$axios.get('/API/license/', {
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
	async merchantSubscription(context, data) {
		return this.$axios.post('/API/merchantsubscription/', data, {
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

	async globalPay(context, data) {
		return this.$axios.post('https://demo.globalpay.com.ng/globalpay_demo/Paymentgatewaycapture.aspx', data, {
			// headers: {
			// 	'Authorization' : `Bearer ${localStorage.getItem('token')}`
			// }
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

	async getMerchantSubscriptions(context, data) {
		return this.$axios.get('/API/merchantsubscription/?merchID=' + data.merchID, {
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
	async getActivityLog(context, data) {
		return this.$axios.get('/API/auditlog/?merchID=' + data.merchID, {
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
	}
}

export const getters = {
}
