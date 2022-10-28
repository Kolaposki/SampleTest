export const state = () => ({
    tax: {}
});

export const mutations = {
    SET_TAX: function(state, data) {
        state.tax = data
    }
}
export const actions = {
    setProduct(context, data) {
        localStorage.removeItem('tax_data')
        localStorage.setItem('tax_data', JSON.stringify(data))
        context.commit('SET_TAX', data)
    },

    async listTaxsWithDeleted(context, data) {
        return await this.$axios.get('/API/tax_with_deleted/?merchID=' + data.merchID, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },

    async listTaxs(context, data) {
        return await this.$axios.get('/API/taxrate/?merchID=' + data.merchID, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },

    async listTaxClassification(context, data) {
        return await this.$axios.get('/API/taxclassification/?merchID=' + data.merchID, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },
    async saveTax(context, data) {
        return await this.$axios.post('/API/taxrate/', data, {
                headers: {
                    // "Content-Type": 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },
    async updateTax(context, data) {
        return await this.$axios.put('/API/taxrate/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },
    async addTax(context, data) {
        return await this.$axios.post('/API/taxrate/', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                return res
            }).catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })
    },

    async deleteTax(context, payload) {
        return await this.$axios.delete('/API/taxrate/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { id: payload.id }
        }).then(res => {
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
    getTax(state) {
        return JSON.parse(localStorage.getItem('tax_data'))
    }
}