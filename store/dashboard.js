export const state = () => ({});

export const mutations = {}

export const actions = {
    async getDashBoardData(context, data) {

        const response = await fetch('https://ntisareportserver.website/merchantlogisticdashboard/?merchID=' + data.merchID + '&branchID=' + data.branchID + '&year=' + data.year + '&month=' + data.month + '&ordercategory=' + data.category, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(err => {
                if (err.code == 401) {
                    localStorage.removeItem('token')
                    window.location = '/'
                }
                return err
            })

        return response;




        // return await this.$axios.get('/API/merchantlogisticdashboard/?merchID=' + data.merchID + '&branchID=' + data.branchID + '&year=' + data.year + '&month=' + data.month + '&ordercategory=' + data.category, {
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('token')}`
        //     }
        // }).then(res => {
        //     return res
        // }).catch(err => {
        //     if (err.code == 401) {
        //         localStorage.clear();
        //         window.location = '/'
        //     }
        //     return err
        // })
    }
}

export const getters = {}