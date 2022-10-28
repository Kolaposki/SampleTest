export const state = () => ({
});

export const mutations = {
}

export const actions = {
	async getStockReport(context, data) {
		return this.$axios.get('/API/stockmovement/?startdate=' + data.startdate + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&branchID=' + data.branchID+ '&export=' + data.export+ '&page=' + data.page, {
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
	async getExpiredProduct(context, data) {
		return this.$axios.get('/API/expirystock/?startdate=' + data.startdate + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&branchID=' + data.branchID+ '&export=' + data.export + '&page=' + data.page, {
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
