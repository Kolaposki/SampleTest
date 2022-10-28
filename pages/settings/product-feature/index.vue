<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link to="/settings">Basic details</nuxt-link>
        <nuxt-link to="/settings/contact-details">Contact Details</nuxt-link>
        <nuxt-link to="/settings/change-password">Change Password</nuxt-link>
        <!-- <nuxt-link to="/settings/product-feature" class="active">Product Feature</nuxt-link>
        <nuxt-link to="/settings/rider-commission" >Rider Commissions</nuxt-link>
        <nuxt-link to="/settings/product-price">Product Price</nuxt-link> -->
        
        <!-- <nuxt-link to="/settings/loyalty-rule">Loyalty Rule</nuxt-link> -->
      </div>
    </overlay-scrollbars>
    <div class="inner-main-wrapper">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <div class="d-flx-alc-jsb table-title">
            <h3 class="section-title">PRODUCT FEATURE</h3>
            <button class="btn btn--primary" type="button" @click="openModal">
              + Add new
            </button>
          </div>
          <overlay-scrollbars class="table-wrapper no-deco">
            <table class="table-content">
              <thead class="">
              <tr>
                <th class="">Feature type</th>
                <th class="">Feature name</th>
                <th class="">Action</th>
              </tr>
              </thead>
              <tbody class="tablebody">
                <tr v-if="loading">
                  <td colspan="3">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && features.length < 1">
                  <td colspan="3">No record at the moment. Please add a feature.</td>
                </tr>
                <tr v-if="!loading && features.length > 0" v-for="feature in features" v-bind:key="feature.id">
                  <td style="color: #353190;">{{ feature.featuretype }}</td>
                  <td>{{ feature.featurename }}</td>
                  <td class="d-flx-alc">
                    <button class="btn btn-icon" @click="editFeature(feature)" title="Edit" type="button">
                      <svg>
                        <use href="/uploads/icons.svg#edit"></use>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </overlay-scrollbars>
        </section>

        <!-- Add Features Modal -->
        <!-- <div id="parent-component" > -->
          <div id="add-features" container="#parent-component" uk-modal>
            <div class="uk-modal-dialog uk-margin-auto-vertical modal">
              <button class="uk-modal-close-default" type="button" @click="clearForm" uk-close></button>
              <div class="modal-header">
                <h2>Add Product feature</h2>
                <p>Enter the details to create a new product feature</p>
              </div>
              <form @submit.prevent="saveProductFeatures">
                <div class="modal-body" uk-overflow-auto>
                  <div class="flex-width-1-2 less-gp" v-for="(input,k) in productFeatures" :key="k">
                    <label  class="form-input">
                      <span class="form-input__label">Feature type</span>
                      <div class="form-input__input">
                        <Select2 v-model="input.featuretype" :options="options" @select="changeType($event, k)" />
                      </div>
                    </label>
                    <label  class="form-input">
                      <span class="form-input__label">Feature name</span>
                      <div class="form-input__input">
                        <input v-model="input.featurename" type="text">
                      </div>
                    </label>
                    <label class="form-input" v-show="k == productFeatures.length-1">
                      <button @click="addChild(k)" class="btn btn-icon" type="button">
                        +
                      </button>
                    </label>
                    <label class="form-input" v-show="k || ( !k && productFeatures.length > 1)">
                      <button @click="removeChild(k)" class="btn btn-icon" type="button">
                        -
                      </button>
                    </label>
                  </div>
                  <div class="d-flx-alc-jfe mt-5">
                    <button @click="clearForm" type="button" id="cancelBtn" class="btn btn-no-fill">
                      Cancel
                    </button>
                    <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                      + Add feature(s)
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- End add feature modal -->

          <div id="edit-features" container="#parent-component" uk-modal>
            <div class="uk-modal-dialog uk-margin-auto-vertical modal">
              <button class="uk-modal-close-default" type="button" @click="closeEditModal" uk-close></button>
              <div class="modal-header">
                <h2>Update Product feature</h2>
                <p>Enter the details to update a new product feature</p>
              </div>
              <form @submit.prevent="updateProductFeatures">
                <div class="modal-body" uk-overflow-auto>
                  <div class="flex-width-1-2 less-gp">
                    <label  class="form-input">
                      <span class="form-input__label">Feature type</span>
                      <div class="form-input__input">
                        <Select2 :options="options" v-model="editData.featuretype" />
                      </div>
                    </label>
                    <label  class="form-input">
                      <span class="form-input__label">Feature name</span>
                      <div class="form-input__input">
                        <input v-model="editData.featurename" type="text">
                      </div>
                    </label>
                  </div>
                  <div class="d-flx-alc-jfe mt-5">
                    <button @click="closeEditModal" type="button" class="btn btn-no-fill">
                      Cancel
                    </button>
                    <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                      + Update feature
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        <!-- </div> -->
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
		loading: true,
		formData: {
			merchID: ''
		},
		features: [],
		productFeatures: [{
			featuretype: '',
			featurename: '',
			merchID: ''
		}],
		editData: {
			id: '',
			featuretype: '',
			featurename: '',
			merchID: ''
		},
		options: [
			{id: 'size', text: 'Size'},
			{id: 'weight', text: 'Weight'},
			{id: 'color', text: 'Color'}
		]
	}),
	computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
		saveProductFeatures() {
			this.formData.features = this.productFeatures
			$('#submitBtn').attr('disabled', true).html('Adding feature..please wait')
			this.$store.dispatch('products/addFeatures', this.formData)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listFeatures()
						this.clearForm()
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Add feature(s)')
					console.log(err)
				})
		},
		updateProductFeatures() {
		  
		},
		listFeatures() {
			this.$store.dispatch('products/listFeatures', this.formData.merchID)
				.then(res =>{
					this.loading = false
					this.features = res.data.data
				}).catch(err =>{
					this.loading = false
					console.log(err)
				})
		},
		editFeature(feature) {
			this.editData.id = feature.id
			this.editData.featurename = feature.featurename
			this.editData.featuretype = feature.featuretype
			this.editData.merchID = feature.merchID
			UIkit.modal('#edit-features').toggle()
		},
		closeEditModal() {
			this.editData.id = ''
			this.editData.featurename = ''
			this.editData.featuretype = ''
			this.editData.merchID = ''
			UIkit.modal('#edit-features').toggle('hide')
		},
		changeType({id, text}, index) {
			this.productFeatures[index].merchID = this.formData.merchID
		},
		clearForm() {
			this.formData = {
				productfeatures: []
			}
			this.productFeatures = [{
				featuretype: '',
				featurename: '',
				merchID: ''
			}]
			UIkit.modal('#add-features').toggle('hide')
		},
		openModal() {
			UIkit.modal('#add-features').toggle()
		},
		addChild () {
			this.productFeatures.push({
				featuretype: '',
				featurename: '',
				merchID: ''
			})
		},
		removeChild (index) {
			this.productFeatures.splice(index, 1)
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listFeatures()
	}
}
</script>
