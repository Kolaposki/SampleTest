<template>
  <main class="main" id="mainContent">
    <div class="major-bg maxwidth-xxl mx-auto">
      <div class="auth-wrapper">
        <header class="auth-logo mb-3">
          <img src="/uploads/logo.png" alt="NTISA Logo">
        </header><section class="auth-wrapper__main forget-password">
        <div class="auth-wrapper__main--lhs">
            <div class="lhs-inner-wrap" v-if="loading">
                 <div class="title-svg">
                    <div class="cont-holder ml-1h">
                    <h1 class="aut-page-title">
                        Loading...please wait
                    </h1>
                    </div>
                </div>
            </div>
          <div class="lhs-inner-wrap" v-if="!loading">
            <div class="title-svg" v-if="success">
              <svg >
                <use xlink:href="/uploads/icons.svg#padlock"></use>
              </svg>
              <div class="cont-holder ml-1h">
                <h1 class="aut-page-title">
                  Account activation successful
                </h1>
                <p class="aut-page-text">
                  You have successfully activated your account
                </p>
              </div>
            </div>
            <div class="title-svg" v-if="!success">
              <svg >
                <use xlink:href="/uploads/icons.svg#padlock"></use>
              </svg>
              <div class="cont-holder ml-1h">
                <h1 class="aut-page-title">
                  Account activation failed
                </h1>
                <p class="aut-page-text">
                  Your account was not activated due to an invalid activation code or a network error
                </p>
              </div>
            </div>
            <p class="aut-nav">
              <nuxt-link class="btn btn--primary auth-btn" to="/">Back to sign in</nuxt-link>
            </p>
          </div>
        </div>
        <div class="auth-wrapper__main--rhs">
          <svg >
            <use xlink:href="/uploads/icons.svg#overlap"></use>
          </svg>
          <h2>Welcome to Ntisa</h2>
        </div>
      </section>
        <div class="legal">
          <div class="legal-links">
            <a href="">privacy</a>
            <a href="">Terms</a>
          </div>
          <p>All rights reserved © 2020 Ntisa</p>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
	layout: 'default',
	data: () => ({
		loading: true,
		success: false,
		formData: {
			token: ''
		}
	}),
	methods: {
		validateToken() {
			this.$store.dispatch('forgot-password/activateEmail', this.formData)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.success = true
						this.loading = false
						return
					}
                    
					this.loading = false
					this.success = false
					this.$toast.error(res.data.message)
				}).catch(err =>{
					this.loading = false
				})
		}
	},
	mounted() {
		this.formData.token = this.$route.params.token
		this.validateToken()
	}
}
</script>
