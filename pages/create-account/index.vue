<template>
  <main class="main" id="mainContent">
    <div class="major-bg maxwidth-xxl mx-auto">
      <div class="auth-wrapper">
        <header class="auth-logo mb-3">
          <img src="/uploads/logo.png" alt="NTISA Logo">
        </header><section class="auth-wrapper__main create-acct sign-in-bg">
        <div class="auth-wrapper__main--lhs">
          <div class="lhs-inner-wrap">
            <h1 class="aut-page-title ">
              Create your Ntisa merchant account
            </h1>
            <form class="auth-form">
            <div class="flex-width-1-2 less-gp">

              <label  class="form-input">
                <span class="form-input__label">First name</span>
                <div class="form-input__input">
                  <input type="text" placeholder="First name">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Last name</span>
                <div class="form-input__input">
                  <input type="text" placeholder="Last name">
                </div>
              </label>

            </div>
            <label  class="form-input">
              <span class="form-input__label">Phone number</span>
              <div class="flex-width-uneven input-phone-flag">
                <div class="d-flx-alc flag-drop">
                  <img src="/uploads/flag.svg" alt="">
                  <p>+234</p>
                </div>
                <div class="form-input__input">
                  <input type="text" placeholder="First name">
                </div>
              </div>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Email address</span>
              <div class="form-input__input">
                <input type="email" placeholder="What’s your email address?">
              </div><span class="form-input__error-msg">Error message</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Password</span>
              <div class="form-input__input">
                <input type="password" placeholder="Please enter a strong password">
                <button class="form-input__toggle-password">
                  <svg class="">
                    <use xlink:href="/uploads/icons.svg/#see"></use>
                  </svg>
                  <!-- <svg class="">
                      <use xlink:href="/uploads/icons.svg/#see-off"></use>
                  </svg> -->
                </button>
              </div>
            </label>
            <button class="btn btn--primary auth-btn">
              Register
            </button>
          </form><p class="aut-nav">
            Have an account? <nuxt-link to="/">Log-In</nuxt-link>
          </p>
          </div>

        </div>
        <div class="auth-wrapper__main--rhs">
          <svg >
            <use xlink:href="/uploads/icons.svg#overlap"></use>
          </svg>
          <h2>Welcome to the Ntisa Merchant app</h2>
        </div>
      </section><div class="legal">
        <div class="legal-links">
          <a href="">privacy</a>
          <a href="">Terms</a>
        </div>
        <p>All rights reserved © 2020 Ntisa</p>
      </div>
      </div>
      <!-- loader -->

      <!-- <div class="loader">
          <div class="holder">
              <div class="left"></div>
              <div class="right"></div>
          </div>
          <p>loading...</p>
      </div> -->
    </div>
  </main>
</template>
<script>
export default {
	layout: 'default'
}
</script>
