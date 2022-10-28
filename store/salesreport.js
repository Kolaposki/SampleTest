export const state = () => ({});

export const mutations = {}

export const actions = {
    async getReport(context, data) {

        const response = fetch('https://ntisareportserver.website/salereport/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&reporttype=' + data.reporttype + '&startdate=' + data.startdate + '&page=' + data.page + '&export=' + data.export, {
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


        // return await this.$axios.get('/API/salereport/?branchID='+data.branchID+'&enddate='+data.enddate+'&merchID='+data.merchID+'&reporttype='+data.reporttype+'&startdate='+data.startdate+'&page='+data.page+ '&export=' + data.export, {
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
    async getTotalSales(context, data) {
        if (data.staffID == undefined) {
            data.staffID = ''
        }
        return await this.$axios.get('/API/salereport/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&startdate=' + data.startdate + '&page=' + data.page + '&export=' + data.export+'&staffID=' + data.staffID, {
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
    async getProductChart(context, data) {
        return await this.$axios.get('/API/productchart/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&startdate=' + data.startdate + '&page=' + data.page, {
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
    async getProductSales(context, data) {
        return await this.$axios.get('/API/salesbyproduct/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&startdate=' + data.startdate + '&page=' + data.page + '&export=' + data.export, {
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
    async getBranchSales(context, data) {
        return await this.$axios.get('/API/salesbybranch/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&startdate=' + data.startdate + '&page=' + data.page + '&export=' + data.export, {
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
    async getDailySales(context, data) {
        // totalsales/?startdate=&enddate=&merchID={{merchID}}&branchID=
        return await this.$axios.get('/API/totalsales/?branchID=' + data.branchID + '&enddate=' + data.enddate + '&merchID=' + data.merchID + '&startdate=' + data.startdate, {
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
    }
}


export const getters = {}