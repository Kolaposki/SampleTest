export const state = () => ({
    data: {}
});

export const mutations = {
   
}

export const actions = {
    async updateUserInfo(context, data) {
        return await this.$axios.post('/API/merchantsetting/', data, {
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
    async leasePayment(context, data) {
        return await this.$axios.post('/API/leasepayment/', data, {
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
    async riderWeeklyRemittance(context, data) {
        return await this.$axios.post('/API/riderweeklyremittance/', data, {
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
    async businessRule(context, data) {
        return await this.$axios.post('/API/businessrule/', data, {
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
    async listBusinessRule(context, data) {
        return await this.$axios.get('/API/businessrule/?merchID=' + data, {
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
    async updateLogisticService(context, data) {
        return await this.$axios.post('/API/updatelogisticservice/', data, {
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
    async changeMerchantPassword(context, data) {
        return await this.$axios.post('/API/merchantchangepassword/', data, {
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

    async activeBanks(context, data) {
        return await this.$axios.get('/API/banksjson/', data, {
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

    async setIntegration(context, data) {
        return await this.$axios.post('/API/integration/', data, {
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

    async getIntegration(context, data) {
        return await this.$axios.get('/API/integration/?merchID=' + data, {
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
    
}

export const getters = {}