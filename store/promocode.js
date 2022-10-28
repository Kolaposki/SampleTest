export const state = () => ({
	pos: {}
});

export const mutations = {
}

export const actions = {
	async listPurchaseOrder(context, id) {
		return await this.$axios.get('/API/purchaseorder/?merchID=' + id, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
		}).then(res =>{
			return res
		}).catch(err =>{
			return err
		})
	},
	
	async emailVendor(context, data) {
		return await this.$axios.post('/API/emailvendor/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
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
	async savePurchaseOrder(context, data) {
		return await this.$axios.post('/API/purchaseorder/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
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
	async editPurchaseOrder(context, data) {
		return await this.$axios.put('/API/purchaseorder/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
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
	async saveReceiveNote(context, data) {
		return await this.$axios.post('/API/createnote/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
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
	async saveGoodsReturnNote(context, data) {
		return await this.$axios.post('API/goodsreturnnote/', data, {
			headers: {
				'Authorization' : `Bearer ${localStorage.getItem('token')}`
			}
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
	getPurchaseOrder(state) {
		return JSON.parse(localStorage.getItem('po_data'))
	}
}
