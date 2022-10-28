<template>
  <main class="main" id="mainContent">
    <div class="major-bg maxwidth-xxl mx-auto">
      <div class="auth-wrapper">
        <header class="auth-logo mb-3">
          <img src="/uploads/ntisa-admin-logo.png" alt="NTISA-LOGO"/>
        </header><section class="auth-wrapper__main log-in sign-in-bg">
        <div class="auth-wrapper__main--lhs">
          <div class="lhs-inner-wrap">
            <div class="title-svg">
              <svg >
                <use xlink:href="/uploads/icons.svg#key"></use>
              </svg>
              <div class="cont-holder ml-1h">
                <h1 class="aut-page-title">
                  Welcome Back!
                </h1>
                <p class="aut-page-text">
                  Sign in to continue
                </p>
              </div>
            </div>
            <form class="auth-form" @submit.prevent="submitForm">
              <label class="form-input">
                <span class="form-input__label">Email address</span>
                <div class="form-input__input">
                  <input type="text" v-model="formData.email" placeholder="What’s your email address?">
                </div>
                <span v-if="emailError" class="form-input__error-msg">Email address is required</span>
              </label>

              <label  class="form-input">
                <div class="d-flx-alc-jsb">
                  <span class="form-input__label">Password</span>
                  <nuxt-link to="/forgot-password">Forgot Password?</nuxt-link>
                </div>
                <label class="search-w-icon" style="border: 1px solid #c9ccd1">
                  <input id="password" style="height: 50px" v-model="formData.password" type="password" >
                  <svg id="pass" @click="togglePassword('password', 'pass', 'pass-off')">
                    <use href="/uploads/icons.svg#see"></use>
                  </svg>
                  <svg style="display: none" id="pass-off" @click="togglePassword('password', 'pass-off', 'pass')">
                    <use href="/uploads/icons.svg#see-off"></use>
                  </svg>
                </label>

<!--                <div class="form-input__input">-->
<!--                  <input type="password" v-model="formData.password" placeholder="Please enter your password">-->
<!--                </div>-->
                <span v-if="passwordError" class="form-input__error-msg">Password is required</span>
                <span id="errMessage" v-if="errorMsg" class="form-input__error-msg"></span>
              </label>
              <button id="submitBtn" type="submit" class="btn btn--primary auth-btn">
                Sign in
              </button>
            </form>
<!--            <p class="aut-nav">-->
<!--              Don't have an account? <nuxt-link to="/create-account">Sign up</nuxt-link>-->
<!--            </p>-->
          </div>
        </div>
        <div class="auth-wrapper__main--rhs">
          <svg >
            <use xlink:href="/uploads/icons.svg#overlap"></use>
          </svg>
          <h2>Welcome to Ntisa Admin</h2>
        </div>
      </section><div class="legal">
        <div class="legal-links">
          <a href="">privacy</a>
          <a href="">Terms</a>
        </div>
        <p>All rights reserved © {{(new Date()).getFullYear()}} Ntisa</p>
      </div>
      </div>
    </div>
  </main>
</template>
<script>

export default {
	layout: 'default',
	data: () => ({
		formData: {
			email: '',
			password: ''
		},
		emailError: false,
		passwordError: false,
		errorMsg: false,
	}),
	methods: {
		submitForm() {
		  try {
		    this.resetErrorMessages()
				if(this.formData.email === '') {
					this.emailError = true
					return
				}
				if(this.formData.password === '') {
				  this.passwordError = true
					return
				}
				
				$('#submitBtn').attr('disabled', true).html('Signing in...Please wait');
				this.$store.dispatch('authenticate/userLogin', this.formData)
					.then(res =>{
						$('#submitBtn').attr('disabled', false).html('Sign In');
						if(res.status === false) {
							$('#errMessage').html(res.message);
							this.$toast.error(res.message)
              this.errorMsg = true
              if(res.message.toLowerCase().includes('expire')) {
                window.location = 'http://ntisawebsite.wajesmarthrms.website/subscription.html'
                // window.location = 'https://ntisa.com.ng/subscription.html'
              }
							return
						}
            

				    if(Object.entries(res.data).length > 0) {

							this.$store.dispatch('riders/loginToFireBase')
								.then(res =>{
                
								}).catch(e =>{
                
								})
							
				      this.$router.push(
								decodeURIComponent(
									this.$route.query.redirect || "/dashboard"
								)
							);
							
						}
					}).catch(e =>{
						localStorage.removeItem('token')
						$('#submitBtn').attr('disabled', false).html('Sign In');
					})
			} catch (e) {
				$('#submitBtn').attr('disabled', false).html('Sign In');
			}
		},
		resetFormData() {
		  this.formData = {
		    email : '',
				password: ''
			}
		},
		resetErrorMessages() {
		  this.emailError = false
			this.passwordError = false
			this.errorMsg = false
		}
  },
  beforeCreate () {
    if (localStorage.getItem('token') != null && localStorage.getItem('token') != undefined && localStorage.getItem('token') != '') {
      this.$router.push('/dashboard')
    }
    // else{
    //   localStorage.removeItem('token')
    //   this.$router.push('/')
    // }
  }
}
</script>
