export const state = () => ({
    product: {}
});

export const mutations = {
    SET_PRODUCT: function(state, data) {
        state.product = data
    }
}

export const actions = {
    setProduct(context, data) {
        localStorage.removeItem('product_data')
        localStorage.setItem('product_data', JSON.stringify(data))
        context.commit('SET_PRODUCT', data)
    },

    async deleteFeature(context, payload) {
        return await this.$axios.delete('/API/feature/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            params: { id: payload }
        }).then(res => {
            return res
        }).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
    },

    async addBarCode(context, merchID, branchID) {
        return await this.$axios.get('/API/barcodesearch/?merchID=' + merchID + '/?branchID=' + branchID, {
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

    async listProducts(context, data) {
        
        return await this.$axios.get('/API/product/?merchID=' + data.merchID + '&page=' + data.page + '&branchID=' + data.branchID + '&search=' + data.search + '&categoryID=' + data.categoryID, {
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
    async saveProduct(context, data) {
        return await this.$axios.post('/API/product/', data, {
                headers: {
                    "Content-Type": 'multipart/form-data',
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
    async editProduct(context, data) {
        return await this.$axios.put('/API/product/', data, {
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
    async addFeatures(context, data) {
        return await this.$axios.post('/API/feature/', data, {
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
    async editFeatures(context, data) {
        return await this.$axios.put('/API/feature/', data, {
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
    async listFeatures(context, id) {
        return await this.$axios.get('/API/feature/?merchID=' + id, {
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
    async mapProductFeatures(context, data) {
        return await this.$axios.post('/API/productfeature/', data, {
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
    async listPrices(context, id) {
        return await this.$axios.get('/API/price/?merchID=' + id, {
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
    async savePrices(context, data) {
        return await this.$axios.post('/API/price/', data, {
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
    async updatePrice(context, data) {
        return await this.$axios.put('/API/price/', data, {
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
    async uploadProduct(context, data) {
        return await this.$axios.post('/API/productupload/', data, {
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
    async deleteProduct(context, payload) {
        return await this.$axios.delete('/API/product/', {
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
    getProduct(state) {
        return JSON.parse(localStorage.getItem('product_data'))
    }
}