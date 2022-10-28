<template>
    <!-- <div v-if="warningZone"> -->
        <div id="parent-component">
            <div id="auto-logout" uk-modal data-uk-modal="{target:'#auto-logout',bgclose:false}" container="#parent-component"  >
                <div class="uk-modal-dialog  uk-modal-body small-modal">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <h2>Your session is about to expire in {{ timerCount }} s</h2>
                    <p>You can click Don't Log me out to keep your session alive for another 45 mins</p>
                    <p class="uk-text-right uk-margin">
                        <button class="uk-button uk-button-primary uk-modal-close uk-button-large uk-text-default" type="button" @click="dontLogout">Don't Log me out!</button>
                        <button class="uk-button uk-button-danger uk-button-large uk-text-default" type="button" @click="logoutUser">Log Out</button>
                    </p>
                        <!-- <overlay-scrollbars class="modal-body">
                          <h2>You are about to be logged out in 59s</h2>
                          
                        </overlay-scrollbars> -->
                
                </div>
            </div>
        </div>
    
    <!-- </div> -->
</template>

<script>

export default {
    name: 'autologout',
    data: () => ({
        events: ['click', 'mousemove','mousedown','scroll','keypress','load'],
		warningTimer: null,
		logoutTimer: null,
        setInterval_global: null,
        setinterval5: null,
        warningZone: false,
        timerCount: 60
    }),
    methods: {
        dontLogout(){
            this.warningZone = false
            this.combineTimer()
            this.openAutoLogout()
            clearInterval(this.setInterval5)
            this.timerCount--
        },
        combineTimer() {
            this.resetTimer()
            this.warningZone = false;
            this.setTimers()
        },
        setTimers: function(){
            let vm = this
            clearInterval(this.setInterval_global)
            vm.setInterval_global = setInterval(() => {
                if (!vm.warningZone) {
                        vm.warningTimer--
                }
                }, 1000);
	    },
		warningMessage(){
            this.events.forEach(function (event) {
            window.removeEventListener(event, this.combineTimer)
            }, this);
			this.warningZone = true;
            this.openAutoLogout()
            this.CountDownTimer()
            
		},

        logoutUser: function(){
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
    
        },

		resetTimer (){
            this.setinterval5 = null
            this.warningTimer = 2700;
            this.timerCount = 60;
            clearInterval(this.setInterval_global)
            clearInterval(this.setinterval5)
		},

        CountDownTimer (){
            let vm = this
            clearInterval(this.setinterval5)
            this.setInterval5 = setInterval(() => {
                if (vm.warningZone) {
                    vm.timerCount--
                }
                }, 1000)
        },

        openAutoLogout () {
			UIkit.modal('#auto-logout').toggle()
		}
    },
    mounted() {
		this.resetTimer();

        this.setTimers();
        

        this.events.forEach(function(event){
			window.addEventListener(event, this.combineTimer)
		}, this);

    },
    destroyed() {
        this.events.forEach(function(event){
			window.removeEventListener(event, this.combineTimer)
		}, this);
        this.resetTimer()
    },
    watch: {
            timerCount: {
                handler(value) {
                    if(value < 0) {
                        this.resetTimer()
                    	this.logoutUser()

                    }
            }
        },
        warningTimer: {
            handler(value) {
                    if(value < 0) {
                        this.resetTimer()
                        this.warningMessage()

                    }
        }
    }
        },

}
</script>
<style scoped>
    button{
        color: #fff;
        margin-left: 10px;
    }
</style>