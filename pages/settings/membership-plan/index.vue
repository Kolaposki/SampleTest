<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link to="/settings">Basic details</nuxt-link>
        <nuxt-link to="/settings/contact-details">Contact Details</nuxt-link>
        <nuxt-link to="/settings/change-password">Change Password</nuxt-link>
        <!-- <nuxt-link to="/settings/product-feature">Product Feature</nuxt-link>
        <nuxt-link v-if="!isCourierService" to="/settings/product-price">Product Price</nuxt-link>
        <nuxt-link v-else to="/settings/rider-commission" >Rider Commissions</nuxt-link> -->
        <!-- <nuxt-link to="/settings/loyalty-rule">Loyalty Rule</nuxt-link> -->
      </div>
    </overlay-scrollbars>
    <div class="inner-main-wrapper">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <div class="setting-section-title">
            <h2>Merchant membership plan</h2>
            <p>This is where you state how you operate on the Ntisa Platform</p>
          </div>
          <div class="mx-auto r-width-500 py-5">
            <div class="plan-item">
              <h3>Current Plan</h3>
              <div class="plan-info border-primary">
                <div class="plan-details">
                  <h4>Commission Plan</h4>
                  <p class="co-primary plan">20% / sale</p>
                  <p class="co-grey">Date joined</p>
                  <p class="co-grey">Jun 27, 2020</p>
                </div>
                <nuxt-link to="/revenue/" class="btn btn--primary">View revenue</nuxt-link>
              </div>
            </div>
            <div class="plan-item">
              <h3>Other plans</h3>
              <div class="plan-info borderline">
                <div class="plan-details">
                  <h4>Licenced Plan</h4>
                  <p class="plan">100,000 / mo / user</p>
                  <a href="">Learn more</a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
}
</script>
