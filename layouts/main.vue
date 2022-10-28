<template>
  <!-- <v-app>
   <v-content> -->
      <div class="is-home">
        <a class="skip-link sr  z-depth-1" href="#mainContent">
          Skip to main content
        </a>
        <h1 class="sr">
          Ntisa Merchant App
        </h1>

        <MainHeader />

        <main class="main" id="mainContent">
          <div class="main-wrapper">
            <MainMenu />
			<div id="logout-popup" uk-modal container="#parent-component" data-uk-modal="{target:'#logout-popup',bgclose:false}" >
					<div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
					<button class="uk-modal-close-default" @click="cancelLogout" type="button">X</button>
					<div class="modal-header d-flx">
						<svg>
						<use href="/uploads/icons.svg#co-delete"></use>
						</svg>
						<div class="ml-1">
						<h2>Session Expired</h2>
						<p>Your session has expired. Would you like to be redirected to the login page?</p>
						</div>
					</div>
					<div class="modal-body">
						<div class="d-flx-alc-jc mt-3">
						<button @click="cancelLogout" class="btn btn-no-fill">
							Cancel
						</button>
						<button @click="logout" id="deleteBranch" class="btn btn-error ml-2">
							Logout
						</button>
						</div>
					</div>
					</div>
				</div>
            <nuxt />
          </div>
        </main>
      </div>
   <!-- </v-content>
  </v-app> -->
</template>
<script>
import MainHeader from "../components/MainHeader";
import MainMenu from "../components/MainMenu";
export default {
	name: 'main-layout',
	// vuetify: new Vuetify(),
	components: {
		MainHeader,
		MainMenu
	},
	methods : {
		cancelLogout() {
			$('#logout-popup').removeClass('uk-open').hide();
		},
		logout() {
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
	},
	mounted() {
		this.toggleNav();
		let done = localStorage.getItem('tutorial');
		if(done != undefined && done != '' && done != 'null' && done != 'undefined' && done == 'done'){
			this.$store.dispatch('branches/listBranches', this.user.id)
				.then(res => {
					// this.loading = false
					let branches = res.data.data
					this.$store.dispatch('branches/setBranches', branches)
					if(branches.length <= 0) {
						// this.$intro().start();
					} else {
						localStorage.setItem('tutorial', 'done');
					}
				}).catch(e =>{
				})
		}
		
	}
}
</script>
