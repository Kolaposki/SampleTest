<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link to="/settings">Basic details</nuxt-link>
        <nuxt-link to="/settings/contact-details">Contact Details</nuxt-link>
        <nuxt-link to="/settings/change-password">Change Password</nuxt-link>
        <!-- <nuxt-link to="/settings/product-feature">Product Feature</nuxt-link>
        <nuxt-link to="/settings/rider-commission" >Rider Commissions</nuxt-link>
        <nuxt-link to="/settings/product-price">Product Price</nuxt-link> -->
        <!-- <nuxt-link to="/settings/loyalty-rule" class="active">Loyalty Rule</nuxt-link> -->
      </div>
    </overlay-scrollbars>
    <div class="inner-main-wrapper">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <div class="d-flx-alc-jsb table-title">
            <h3 class="section-title">LOYALTY RULE</h3>
            <button class="btn btn--primary" @click="displayCreateModal" type="button">
              Create loyalty rule
            </button>
          </div>
          <overlay-scrollbars class="table-wrapper no-deco">
            <table class="table-content">
              <thead class="">
                <tr>
                  <th class="">Loyalty rule</th>
                  <th class="">Reward point</th>
                  <th class="">Amount spent</th>
                  <th class="">Start date</th>
                  <th class="">End date</th>
                  <th class="">Action</th>
                </tr>
              </thead>
              <tbody class="tablebody">
                <tr v-if="loading">
                  <td colspan="5">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && rules.length < 1">
                  <td colspan="5">No loyalty rule at the moment.</td>
                </tr>
                <tr v-if="!loading && rules.length > 0" v-for="rule in rules" :key="rule.id">
                  <td>{{ rule.loyaltyrule }}</td>
                  <td>{{ rule.rewardpoint }}</td>
                  <td>{{ rule.amountspent }}</td>
                  <td>{{ $moment(rule.startdate).format('Do MMM, YYYY') }}</td>
                  <td>{{ $moment(rule.endate).format('Do MMM, YYYY') }}</td>
                  <td>
                    <button class="btn btn-icon" @click="editLoyalty(rule)" title="Edit" type="button">
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
      </div>
    </div>

    <!-- Add loyalty rule Modal -->
    <div id="add-loyalty-rule" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeAddModal" uk-close></button>
        <div class="modal-header">
          <h2>Add price</h2>
          <p>Enter the details to create a new price.</p>
        </div>
        <form @submit.prevent="saveLoyaltyRule">
          <div class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty rule</span>
                <div class="form-input__input">
                  <input v-model="formData.loyaltyrule" type="text">
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Reward point</span>
                <div class="form-input__input">
                  <input v-model="formData.rewardpoint" type="text">
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="formData.startdate" type="date">
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="formData.endate" type="date">
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Amount spent</span>
                <div class="form-input__input">
                  <input v-model="formData.amountspent" type="text">
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Status</span>
                <div class="form-input__input">
                  <Select2 v-model="formData.status" :options="options" />
                </div>
              </label>
            </div>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeAddModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Create loyalty rule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End add loyalty rule modal -->
    
    <!-- Edit loyalty rule Modal -->
    <div id="edit-loyalty-rule" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEditModal" uk-close></button>
        <div class="modal-header">
          <h2>Add price</h2>
          <p>Enter the details to create a new price.</p>
        </div>
        <form @submit.prevent="updateLoyaltyRule">
          <div class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty rule</span>
                <div class="form-input__input">
                  <input v-model="editData.loyaltyrule" type="text">
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Reward point</span>
                <div class="form-input__input">
                  <input v-model="editData.rewardpoint" type="text">
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="editData.startdate" type="date">
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="editData.endate" type="date">
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Amount spent</span>
                <div class="form-input__input">
                  <input v-model="editData.amountspent" type="text">
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Status</span>
                <div class="form-input__input">
                  <Select2 v-model="editData.status" :options="options" />
                </div>
              </label>
            </div>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEditModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                Update loyalty rule
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End edit loyalty rule modal -->
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
		loading: true,
		formData: {
			merchID: '',
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			endate: '',
			status: 'True'
		},
		options: [
			{id: 'True', text: 'True'},
			{id: 'False', text: 'False'}
		],
		errorData: {
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			endate: '',
		},
		editData: {
			merchID: '',
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			endate: '',
			status: 'True',
			id: ''
		},
		rules: []
	}),
	computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
		saveLoyaltyRule() {
			if(this.validateAddRule()) {
				return
			}
			
			$("#submitBtn").attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('loyalty-rule/createRule', this.formData)
				.then(res =>{
					$("#submitBtn").attr('disabled', false).html('+ Create loyalty rule')
					if(res.data.status === 'True') {
						this.$toast.success(res.data.message)
						this.closeAddModal()
						this.listLoyaltyRule()
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#submitBtn").attr('disabled', false).html('+ Create loyalty rule')
					this.$toast.error('An error occurred')
				})
		},
		updateLoyaltyRule() {
			$("#updateBtn").attr('disabled', true).html('Updating...please wait')
			this.$store.dispatch('loyalty-rule/updateRule', this.editData)
				.then(res =>{
					$("#updateBtn").attr('disabled', false).html('+ Update loyalty rule')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeEditModal()
						this.listLoyaltyRule()
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#updateBtn").attr('disabled', false).html('+ Update loyalty rule')
					this.$toast.error('An error occurred')
				})
		},
		closeAddModal() {
		  this.clearErrorData()
		  this.formData.loyaltyrule = ''
			this.formData.rewardpoint = ''
			this.formData.amountspent = ''
			this.formData.startdate = ''
			this.formData.endate = ''
			this.formData.status = 'True'
			UIkit.modal('#add-loyalty-rule').toggle('hide')
		},
		closeEditModal() {
		  this.editData = {
				merchID: '',
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				endate: '',
				status: 'True'
			}
			UIkit.modal('#edit-loyalty-rule').toggle('hide')
		},
		clearErrorData() {
		  this.errorData = {
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				endate: '',
				status: 'True'
			}
		},
		validateAddRule() {
		  this.clearErrorData()
      
		  if(this.formData.loyaltyrule === ''){
		    this.errorData.loyaltyrule = true
				return true
			}
		  
		  if(this.formData.rewardpoint === ''){
		    this.errorData.rewardpoint = true
				return true
			}
		  
		  if(this.formData.amountspent === ''){
		    this.errorData.amountspent = true
				return true
			}
		  
		  if(this.formData.startdate === ''){
		    this.errorData.startdate = true
				return true
			}
		  
		  if(this.formData.endate === ''){
		    this.errorData.endate = true
				return true
			}
		  
		  return false
		},
		listLoyaltyRule() {
			this.$store.dispatch('loyalty-rule/listRules', this.formData.merchID)
				.then(res =>{
					this.loading = false
					this.rules = res.data.data
				})
		},
		displayCreateModal() {
			UIkit.modal('#add-loyalty-rule').toggle()
		},
		editLoyalty(rule) {
			this.editData = {
				merchID: this.formData.merchID,
				loyaltyrule: rule.loyaltyrule,
				rewardpoint: rule.rewardpoint,
				amountspent: rule.amountspent,
				startdate: rule.startdate,
				endate: rule.endate,
				status: (rule.status === true) ? 'True' : '',
				id: rule.id
			}
			UIkit.modal('#edit-loyalty-rule').toggle()
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listLoyaltyRule()
	}
}
</script>
