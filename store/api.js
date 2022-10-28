export const state = () => ({
	pos: {}
});

export const mutations = {
}

export const actions = {
    async makeAPICall(context, request) {
        // let url = `/API/${request.url}`
        // 
         //request.url = `http://127.0.0.1:8000/${request.url}`
        request.url = `https://wajeloyalty.website/API${request.url}`

        // set params
        if (request.params) {
            const params = Object.keys(request.params)
            if (params.length > 0) {
                request.url += '/'
                // url += '/?'
                // object.keys(params).forEach((key, index) => {
                //     url += (index > 0 ? '&' : '') + `${key}=${params[key]}`      
                // });
            }
        }

        // if (request.data) {

        // }

        request.headers = {
            'Authorization' : `Bearer ${localStorage.getItem('token')}`
        }

        return this.$axios(request).then(res =>{
			return res
		}).catch(err => {
            if (err.code == 401) {
                localStorage.clear();
                window.location = '/'
            }
            return err
        })
        
		// return await this.$axios.get('/API/purchaseorder/?merchID=' + id, {
		// 	headers: {
		// 		'Authorization' : `Bearer ${localStorage.getItem('token')}`
		// 	}
		// }).then(res =>{
		// 	return res
		// }).catch(err =>{
		// 	return err
		// })
	},
}
