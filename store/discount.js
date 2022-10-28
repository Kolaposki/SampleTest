export const state = () => ({
    discount: {}
});

export const mutations = {
     SET_DISCOUNT: function(state, data) {
        state.discount = data
    }
}
export const actions = {
    setProduct(context, data) {
        localStorage.removeItem('discount_data')
        localStorage.setItem('discount_data', JSON.stringify(data))
        context.commit('SET_DISCOUNT', data)
    },
    async listProducts(context, data) {
        return await this.$axios.get('/API/allproduct/?merchID=' + data.merchID, {
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
    async listDiscount(context, data) {
        return await this.$axios.get('/API/orderdiscountdetails/?merchID=' + data.merchID, {
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
    async saveDiscount(context, data) {
        
        return await this.$axios.post('/API/orderdiscountfee/',data, {
                headers: {
                    // "Content-Type": 'multipart/form-data',
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
    async updateDiscount(context, data) {
        return await this.$axios.put('/API/orderdiscountdetails/', data, {
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
    async deleteDiscount(context, payload) {
        return await this.$axios.delete('/API/orderdiscountdetails/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { id: payload.id }
        }).then(res => {
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
    getTax(state) {
        return JSON.parse(localStorage.getItem('tax_data'))
    }
}