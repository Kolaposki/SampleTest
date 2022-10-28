export default function({ $axios, redirect }) {
    $axios.onError(error => {
        // console.log(error)
        try {
            if (500 != error.response.status) {
                this.$store.dispatch('authenticate/clearToken')
                localStorage.removeItem('token')
                localStorage.removeItem('user')
                localStorage.removeItem('user_data')
                localStorage.removeItem('customer')
                localStorage.removeItem('driver')
                localStorage.removeItem('product')
                localStorage.removeItem('product_data')
                localStorage.removeItem('branch')
                    //redirect to login page
                this.$router.push('/');

                // UIkit.modal('#logout-popup').show();
            }
        } catch (err) {
            // UIkit.modal('#logout-popup').show();
            this.$store.dispatch('authenticate/clearToken')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            localStorage.removeItem('user_data')
            localStorage.removeItem('customer')
            localStorage.removeItem('driver')
            localStorage.removeItem('product')
            localStorage.removeItem('product_data')
            localStorage.removeItem('branch')
                //redirect to login page
            this.$router.push('/');
        }
    })
}