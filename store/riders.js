import fb from "../plugins/firebase.js";

export const state = () => ({
    rider: {}
});

export const mutations = {
    SET_RIDER: function(state, data) {
        state.rider = data
    }
}

export const actions = {
    setRider(context, data) {

        context.commit('SET_RIDER', data)
    },
    async listRiders(context, data) {
        let page = 1;
        let id = 0;
        if (data.id == undefined) {
            id = data;
            page = 1;
        } else {
            id = data.id
            page = data.page
        }
        // if(data.branchID != undefined)
        let user = JSON.parse(localStorage.getItem('user'))
        let url = '/API/rider/?merchID=' + id + '&page=' + page
        if (user.branchID != undefined) {
            url += '&branchID=' + JSON.stringify(user.branchID)
        }

        return await this.$axios.get(url, {
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
    async listRidersExport(context, data) {
        return await this.$axios.get('/API/rider/?merchID=' + data + '&export=true', {
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
    async createRider(context, data) {
        return await this.$axios.post('/API/adminrider/', data, {
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
    async riderPayment(context, data) {
        return await this.$axios.post('/API/ridertransaction/', data, {
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
    async updateRider(context, data) {
        return await this.$axios.put('/API/rider/', data, {
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

    async changeToken(context, data) {
        return await this.$axios.post('/API/changeridertoken/', data, {
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
    async disableRider(context, data) {
        return await this.$axios.post('/API/disablerider/', data, {
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
    async restoreRider(context, data) {
        return await this.$axios.post('/API/enablerider/', data, {
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

    async loginToFireBase(context, data) {
        return await fb.auth().signInAnonymously();
    },

    async getRiderLocation(context, data) {
        let result = '';
        let ref = fb.database().ref('customer_order/' + data + '/track_order/')
        await ref.on('value', snapShot => {
            result = snapShot.val()
        })
        return result;
    },



    // changeridertoken/

    async deleteRider(context, id) {
        return await this.$axios.delete('/API/rider/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                params: { id: id }

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

    async listCommissions(context, id) {
        return await this.$axios.get('/API/commssion/?merchID=' + id, {
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
    async saveCommission(context, data) {
        return await this.$axios.post('/API/commssion/', data, {
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
    async updateCommission(context, data) {
        return await this.$axios.put('/API/commssion/', data, {
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
    async getRiders(context, data) {

        return await this.$axios.get('/API/rideronboarding/?merchID=' + data.merchID + '&startdate=' + data.startdate + '&enddate=' + data.enddate + '&export=' + data.export+'&branchID=' + data.branchID + '&riderID=' + data.riderID, {
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

export const getters = {
    getRider(state) {
        return JSON.parse(localStorage.getItem('driver'))
    }
}