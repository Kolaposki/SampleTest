<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link v-if="!isSupervisor" to="/settings">Basic details</nuxt-link>
        <nuxt-link v-if="!isSupervisor" to="/settings/contact-details">Contact Details</nuxt-link>
        <nuxt-link to="/settings/change-password" v-if="isMerchant" >Change Password</nuxt-link>
        <nuxt-link to="/settings/integration" v-if="isMerchant && !isCourierService" class="active">Integration</nuxt-link>
        
        <nuxt-link to="/settings/tax" v-if="isMerchant" >Tax</nuxt-link>
        <nuxt-link to="/settings/discount" v-if="isMerchant && !isCourierService">Discount</nuxt-link>
        <nuxt-link to="/settings/roles" v-if="isMerchant">Roles & Permissions</nuxt-link>
        <!-- <nuxt-link v-if="!isSupervisor" to="/settings/product-feature">Product Feature</nuxt-link>
		<nuxt-link v-if="!isSupervisor" to="/settings/rider-commission" >Rider Commissions</nuxt-link>
        <nuxt-link v-if="!isSupervisor" to="/settings/product-price">Product Price</nuxt-link> -->
        <!-- <nuxt-link to="/settings/loyalty-rule">Loyalty Rule</nuxt-link> -->
      </div>
    </overlay-scrollbars>
    <div class="inner-main-wrapper">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <div class="setting-section-title">
            <h2>Set Integration details</h2>
            <p>Enter details to sync with other software</p>
          </div>
          <div v-if="loading" class="mx-auto r-width-500 py-5">
                Loading Please Wait...
          </div>
          <div v-if="!loading" class="mx-auto r-width-500 py-5">
            <form @submit.prevent="setIntegration">
              <label  class="form-input">
                <span class="form-input__label">Select External Software</span>
                <div class="form-input__input">
                  <select required v-model="formData.tool">
                    <option value="woocommerce">WooCommerce</option>
                  </select>
                </div>
              </label>

              
              <div v-if="formData.tool == 'woocommerce'" class="flex-width-1-2 less-gp">
                <label  class="form-input">
                    <span class="form-input__label">Consumer Secret</span>
                    <div class="form-input__input">
                    <input type="text" required v-model="formData.consumer_secret" placeholder="Enter Consumer Secret from WooCommerce Integration Settings">
                    </div>
                </label>

                <label  class="form-input">
                    <span class="form-input__label">Consumer Key</span>
                    <div class="form-input__input">
                    <input type="text" required v-model="formData.consumer_key" placeholder="Enter Consumer Key from WooCommerce Integration Settings">
                    </div>
                </label>
              </div>
              <div v-if="formData.tool == 'woocommerce'" class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Url</span>
                  <div class="form-input__input">
                    <input type="text" required v-model="formData.url" placeholder="https://wordpress.wajesmarthrms.website">
                  </div>
                </label>
                <div class="form-input">
                  <label class="form-input__label">Branch</label>
                  <div class="form-input__input">
                    <select required v-model="formData.branchID" class="filter-btn box-deco-smallr">
                      <option value="">-Select Branch-</option>
                      <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                        {{ branch.branchname }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- <label  class="form-input">
                  <span class="form-input__label">Instagram</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.businessinstagram" placeholder="Enter Instagram url">
                  </div>
                </label> -->
              </div>
              <button type="submit" id="submitBtn" class="btn btn--primary mt-2">
                Sync
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>

  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
		formData: {
			url: '',
			tool: 'woocommerce',
			branchID: '',
			consumer_secret: '',
      consumer_key: '',
      merchID: ''
    },
    loading: false,
		branches: [],
	}),
  computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
        getAllBranches() {
            this.$store.dispatch('branches/listBranches', this.formData.merchID)
                .then(res =>{
                    this.branches = res.data.data
                }).catch(e =>{
                    console.log(e)
                })
        },
        getIntegration() {
            this.loading = true
            this.$store.dispatch('settings/getIntegration', this.formData.merchID)
                .then(res =>{
                    this.loading = false
                    let obj = res.data.data
                    if(!(obj && Object.keys(obj).length === 0 && obj.constructor === Object)){
                      this.formData = res.data.data
                    }
                }).catch(e =>{
                    console.log(e)
                })
        },
        setIntegration() {
            this.formData.merchID = this.user.id
            $('#submitBtn').attr('disabled', true).html('Syncing..please wait')
            this.$store.dispatch('settings/setIntegration', this.formData)
                .then(res =>{
                    $('#submitBtn').attr('disabled', false).html('Sync')

                    if(res.data.status) {
                        this.$toast.success(res.data.message)
                        return
                    }
        
                    this.$toast.error(res.data.message)
                }).catch(err =>{
                    $('#submitBtn').attr('disabled', false).html('Sync')
                    this.$toast.error('An error occurred')
                })
		},
    },
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getAllBranches()
    this.getIntegration()
	}
}
</script>
