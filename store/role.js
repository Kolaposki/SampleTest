export const state = () => ({
	role: {},
    roles:{}
});

export const mutations = {
	SET_ROLE: function(state, data) {
		state.role = data
	},
    SET_ALL_ROLES: function(state,data){
        state.roles = data
    },
	CLEAR_ROLE: function(state) {
		state.role = {}
	}
}

export const actions ={
    setRole(context, data) {
		localStorage.setItem('role', JSON.stringify(data))
		context.commit('SET_ROLE', data)
	},
    setAllRole(context, data){
        localStorage.setItem('allrole', JSON.stringify(data))
        context.commit('SET_ALL_ROLES', data)
    },
	clearCustomer(context) {
		context.commit('CLEAR_ROLE')
	},
    async deleteRole(context, data) {
        return await this.$axios.delete('/API/assignroleandpermission/',{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: { id: data.id }
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
    async setPermissions(context, data){
        return await this.$axios.post('/API/assignroleandpermission/', data, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res =>{
            return res
        }).catch(err =>{
            if (err.code == 401){
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    },
    async getPermissions(context, data){
        return await this.$axios.get('/API/assignroleandpermission/?merchID=' + data.merchID + '&userid=' + data.userid + '&id=' + data.id, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then (res => {
            return res
        }).catch(err => {
            if(err.code == 401){
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    },
    async updatePermissions(context, data){
        return await this.$axios.put('/API/assignroleandpermission/', data, {
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res =>{
            return res
        }).catch(err =>{
            if (err.code == 401){
                localStorage.removeItem('token')
                window.location = '/'
            }
            return err
        })
    }
}