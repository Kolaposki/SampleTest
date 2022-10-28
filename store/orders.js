export const state = () => ({

});

export const mutations = {}

export const actions = {
    // async listOrders(context, data) {
    //     let user = JSON.parse(localStorage.getItem('user'))
    //     let url = '/API/placeorder/?merchID=' + id
    //     if (user.branchID != undefined) {
    //         url += '&branchID=' + JSON.stringify(user.branchID)
    //     }
    //     return await this.$axios.get(url, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         })
    //         .then(res => {
    //             return res
    //         }).catch(err => {
    //             if (err.code == 401) {
    //                 localStorage.clear();
    //                 window.location = '/'
    //             }
    //             return err
    //         })
    // },
    async listOrders(context, data) {
		return await this.$axios.get('/API/placeorder/?merchID=' + data.merchID +'&page='+data.page , {
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
    async sortOrders(context, data) {
        return await this.$axios.get('/API/placeorder/?merchID=' + data.merchID + '&orderstatus=' + data.orderstatus 
        + '&paymentmethod=' + data.paymentmethod + '&ordertype=' + data.ordertype + '&ordercategory=' + data.ordercategory, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.clear();
                    window.location = '/'
                }
                return err
            })
    },
    async assignRider(context, data) {
        return await this.$axios.post('/API/assignorder/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.clear();
                    window.location = '/'
                }
                return err
            })
    },
    async cancelOrder(context, data) {
        return await this.$axios.post('/API/deliverystatus/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
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

export const getters = {}