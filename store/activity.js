export const state = () => ({
});

export const mutations = {
}

export const actions = {
	async getActivityLog(context, data) {
		return this.$axios.get('/API/auditlog/?merchID=' + data.merchID, {
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