<template>
  <main class="main" id="mainContent">
    <div class="major-bg maxwidth-xxl mx-auto">
      <div class="auth-wrapper">
        <header class="auth-logo mb-3">
          <img src="/uploads/logo.png" alt="NTISA Logo">
        </header><section class="auth-wrapper__main forget-password">
        <div class="auth-wrapper__main--lhs">
          <div class="lhs-inner-wrap">
            <div class="title-svg">
              <svg >
                <use xlink:href="/uploads/icons.svg#padlock"></use>
              </svg>
              <div class="cont-holder ml-1h">
                <h1 class="aut-page-title">
                  Reset password
                </h1>
                <p class="aut-page-text">
                  Enter the details to reset your password
                </p>
              </div>
            </div>
            <form class="auth-form" @submit.prevent="submitForm">
              <label  class="form-input">
                <span class="form-input__label">New Password</span>
                   <label class="search-w-icon">
                    <input id="password" v-model="formData.password" type="password" >
                    <svg id="pass" @click="togglePassword('password', 'pass', 'pass-off')">
                      <use href="/uploads/icons.svg#see"></use>
                    </svg>
                    <svg style="display: none" id="pass-off" @click="togglePassword('password', 'pass-off', 'pass')">
                      <use href="/uploads/icons.svg#see-off"></use>
                    </svg>
                  </label>
<!--                <div class="form-input__input">-->
<!--                  <input type="password" v-model="formData.password" placeholder="Enter your new password">-->
<!--                </div>-->
                <span v-if="errorData.password" class="form-input__error-msg">Please enter a password</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Confirm Password</span>
                <label class="search-w-icon">
                  <input id="confirmpassword" v-model="password_confirmation" type="password" >
                  <svg id="pass" @click="togglePassword('confirmpassword', 'see', 'see-off')">
                    <use href="/uploads/icons.svg#see"></use>
                  </svg>
                  <svg style="display: none" id="see-off" @click="togglePassword('confirmpassword', 'see-off', 'see')">
                    <use href="/uploads/icons.svg#see-off"></use>
                  </svg>
                </label>
<!--                <div class="form-input__input">-->
<!--                  <input type="password" v-model="password_confirmation" placeholder="Enter a password confirmation">-->
<!--                </div>-->
                <span v-if="errorData.confirmpassword" class="form-input__error-msg">{{ errorData.message }}</span>
              </label>
              <button type="submit" id="submitBtn" class="btn btn--primary auth-btn"> Reset password</button>
            </form>
            <p class="aut-nav">
              Do you have an account? <nuxt-link to="/">Sign in</nuxt-link>
            </p>
          </div>
        </div>
        <div class="auth-wrapper__main--rhs">
          <svg >
            <use xlink:href="/uploads/icons.svg#overlap"></use>
          </svg>
          <h2>Don’t Worry It happens to the best of us</h2>
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
		formData: {
			userid: '',
			password: ''
		},
		password_confirmation: '',
		errorData: {
			password: false,
			confirmpassword: false,
			message: ''
		}
	}),
	methods: {
		submitForm() {
			if(this.validateForm()) {
				return
			}

			$('#submitBtn').attr('disabled', true).html('Resetting..please wait')
			this.$store.dispatch('forgot-password/passwordReset', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('Reset Password')
					if(res.data.status !== 'False') {
						this.$toast.success(res.data.message)
						this.clearFormData()
						this.$router.push('/')
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('Reset Password')
					this.$toast.error('An error occurred! Please try again')
				})
		},
		clearFormData() {
			this.formData = {
				userid: '',
				password: ''
			}
		},
		validateForm() {
			this.clearErrorMessage()
			if(this.formData.password === ''){
				this.errorData.password = true
				return true
			}

			if(this.password_confirmation === ''){
				this.errorData.confirmpassword = true
				this.message = "Please enter a password confirmation"
				return true
			}

			if(this.formData.password !== '') {
				if(this.formData.password !== this.password_confirmation) {
					this.errorData.confirmpassword = true
					this.message = "Password and confirm password does not match"
					return true
				}
			}
      
			return false
		},
		clearErrorMessage() {
			this.errorData = {
				password: false,
				confirmpassword: false,
				message: ''
			}
		}
	},
	mounted() {
		this.formData.userid = this.$route.query.token
	}
}
</script>
