<template>
  <main class="main" id="mainContent">
    <div class="major-bg maxwidth-xxl mx-auto">
      <div class="auth-wrapper">
        <header class="auth-logo mb-3">
          <img src="/uploads/ntisa-admin-logo.png" alt="NTISA-LOGO"/>
        </header><section class="auth-wrapper__main forget-password">
        <div class="auth-wrapper__main--lhs">
          <div class="lhs-inner-wrap" v-if="reset">
            <div class="title-svg">
              <svg >
                <use xlink:href="/uploads/icons.svg#padlock"></use>
              </svg>
              <div class="cont-holder ml-1h">
                <h1 class="aut-page-title">
                  Forgot Password?
                </h1>
                <p class="aut-page-text">
                  Restore access to your account
                </p>
              </div>
            </div>
            <form @submit.prevent="resetPassword" class="auth-form">
              <label  class="form-input">
                <span class="form-input__label">Email address</span>
                <div class="form-input__input">
                  <input type="email" v-model="formData.emailaddress" placeholder="What’s your email address?">
                </div>
                <span v-if="errorData.email" class="form-input__error-msg">Please enter an email</span>
              </label>
              <button type="submit" id="submitBtn" class="btn btn--primary auth-btn"> Reset password</button>
            </form>
            <p class="aut-nav">
              Do you have an account? <nuxt-link to="/">Sign in</nuxt-link>
            </p>
          </div>
          <div v-if="success" class="lhs-inner-wrap">
            <h1>Check your inbox</h1>
            <p><b>{{ formData.emailaddress }}</b></p>
            <p style="text-align: justify;">A password reset link has been sent to the above email address. Please click the password reset link to set new password.</p>
            <hr />
            <p class="aut-nav">
              <nuxt-link to="/">Back to Sign in</nuxt-link>
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
		success: false,
		reset: true,
		formData: {
			emailaddress: ''
		},
		errorData: {
			email: false
		}
	}),
	methods: {
		resetPassword() {
			if(this.validateEmail()) {
				return
			}

			$('#submitBtn').attr('disabled', true).html('Resetting...please wait')
			this.$store.dispatch('forgot-password/forgotPassword', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('Reset Password')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.success = true
						this.reset = false
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('Reset Password')
					console.log(err)
				})
		},
		validateEmail() {
			this.clearValidation()
			if(this.formData.email === "") {
				this.errorData.email = true
				return true
			}

			return false
		},
		clearValidation() {
			this.errorData = {
				email: false
			}
		},
		clearFormData() {
			this.formData = {
				email: ''
			}
		}
	}
}
</script>
