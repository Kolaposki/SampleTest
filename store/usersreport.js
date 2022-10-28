export const state = () => ({
    orderHistory: [],
    riderHistory: []
});

export const mutations = {
    SET_ORDER_HISTORY: function(state, data) {
        state.orderHistory = data
    },
    SET_RIDER_HISTORY: function(state, data) {
        state.riderHistory = data
    }
}

export const actions = {
    setOrderHistory(context, data) {
        localStorage.setItem('orderHistory', JSON.stringify(data))
        context.commit('SET_ORDER_HISTORY', data)
    },
    setRiderHistory(context, data) {
        localStorage.setItem('riderHistory', JSON.stringify(data))
        context.commit('SET_RIDER_HISTORY', data)
    },
    async getCustomerReport(context, data) {
        return await this.$axios.get('/API/customer/?merchID=' + data.merchID + '&page=' + data.page + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&pagination=' + data.export, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return res
        }).catch(err => {
            if (err.code == 401) {
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    },
    async getCustomerTransactions(context, data) {
        return await this.$axios.get('/API/customerorders/?customerID=' + data.id + '&page=' + data.page + '&branchID=' + data.branchID, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return res
        }).catch(err => {
            if (err.code == 401) {
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    },


    async getRidersEarning(context, data) {
        const response = fetch('https://ntisareportserver.website/riderearningsreport/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&paymentmode=' + data.paymentmode + '&riderID=' + data.riderID + '&branchID=' + data.branchID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;

        // return await this.$axios.get('/API/riderearningsreport/?merchID=' + data.merchID +'&startdate='+data.startdate +'&enddate='+data.enddate +'&export='+data.export +'&paymentmode='+data.paymentmode +'&riderID='+data.riderID+'&branchID='+data.branchID, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {

        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    },
    async getTransactions(context, data) {
        return await this.$axios.get('/API/transactiontruthsource/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&riderID=' + data.riderID + '&branchID=' + data.branchID, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            return res
        }).catch(err => {
            if (err.code == 401) {
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    },
    async getRevenueReport(context, data) {
        const response = fetch('https://ntisareportserver.website/revenuereport/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&paymentmode=' + data.paymentmode + '&riderID=' + data.riderID + '&branchID=' + data.branchID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;
        // return await this.$axios.get('/API/revenuereport/?merchID=' + data.merchID +'&startdate='+data.startdate +'&enddate='+data.enddate +'&export='+data.export +'&paymentmode='+data.paymentmode +'&riderID='+data.riderID+'&branchID='+data.branchID, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    },
    async getRatingReport(context, data) {
        const response = fetch('https://ntisareportserver.website/ratingreport/?startdate=' + data.startdate + '&enddate=' + data.enddate, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;
        // return await this.$axios.get('/API/ratingreport/?startdate='+data.startdate +'&enddate='+data.enddate, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    },
    async getOnboardingReport(context, data) {
        const response = fetch('https://ntisareportserver.website/rideronboarding/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&branchID=' + data.branchID + '&riderID=' + data.riderID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                return data;
            })
            .catch((err) => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err;
            });

        return response;

    },
    async getRiderSettlementReport(context, data) {
        const response = fetch('https://ntisareportserver.website/ridersettlement/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&branchID=' + data.branchID + '&riderID=' + data.riderID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;
        // return await this.$axios.get('/API/ridersettlement/?merchID=' + data.merchID +'&startdate='+data.startdate +'&enddate='+data.enddate +'&export='+data.export +'&branchID='+data.branchID +'&riderID='+data.riderID, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    },
    async getLeaseReport(context, data) {
        const response = fetch('https://ntisareportserver.website/leasereport/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&branchID=' + data.branchID + '&riderID=' + data.riderID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;
        // return await this.$axios.get('/API/leasereport/?merchID=' + data.merchID +'&startdate='+data.startdate +'&enddate='+data.enddate +'&export='+data.export +'&branchID='+data.branchID +'&riderID='+data.riderID, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    },
    async getRidersReport(context, data) {
        const response = fetch('https://ntisareportserver.website/rider/?merchID=' + data.merchID + '&page=' + data.page + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&branchID=' + data.branchID, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())

        .then((data) => {
                console.log('data', data)
                return data;
            })
            .catch((err) => {
                return err;
            });

        return response;
        // return await this.$axios.get('/API/rider/?merchID=' + data.merchID + '&page=' + data.page + '&startdate=' + data.startdate + '&enddate=' + data.enddate+ '&export=' + data.export + '&branchID='+data.branchID, {
        // 	headers: {
        // 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
        // 	}
        // }).then(res =>{
        // 	return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.removeItem('token')
        //         window.location = '/'
        //     }
        //     return err
        // })
    }
}

export const getters = {
    getOrderHistory(state) {
        return JSON.parse(localStorage.getItem('orderHistory'))
    },
    getRiderHistory(state) {
        return JSON.parse(localStorage.getItem('riderHistory'))
    }
}