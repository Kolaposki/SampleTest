export const state = () => ({});

export const mutations = {}

export const actions = {
    async getInventory(context, data) {
        return this.$axios.get('/API/stockupdate/?merchID=' + data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
    async trfQty(context, data) {
        return this.$axios.post('/API/movestock/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
    async setCostPrice(context, data) {
        return this.$axios.post('/API/stockupdate/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
    async setWaste(context, data) {
        return this.$axios.post('/API/wasteupdate/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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
    async setQuantity(context, data) {
        return this.$axios.post('/API/addproductstock/', data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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

export const getters = {}