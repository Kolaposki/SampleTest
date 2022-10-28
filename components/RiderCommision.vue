<template>
  <div >
    <!-- <div class="inner-main-wrapper"> -->
      <!-- <div class="box-deco-bg p-3"> -->
        <section class="setting-section">
          <div class="d-flx-alc-jsb table-title">
            <h3 class="section-title">RIDER COMMISSIONS</h3>
            <button class="btn btn--primary" type="button" @click="openModal">
              + Add Commissions
            </button>
          </div>
          <overlay-scrollbars class="table-wrapper no-deco">
            <table class="table-content">
              <thead class="">
              <tr>
                <th class="">Commission Rule</th>
                <th class="">Commission Amount</th>
                <th class="">Based On Every</th>
                <th class="">Action</th>
              </tr>
              </thead>
              <tbody class="tablebody">
                <tr v-if="loading">
                  <td colspan="2">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && commissions.length < 1">
                  <td colspan="2">No commisions at the moment. Please create a commission</td>
                </tr>
                <tr v-if="!loading && commissions.length > 0" v-for="p in commissions" :key="p.id">
                  <td>{{ p.commissionrule }}</td>
                  <td>{{ p.commissionpoint }}</td>
                  <td>{{ p.amountearned }}</td>
                  <td>
                    <button class="btn btn-icon" style="margin-left: auto;margin-right: auto;" @click="editCommission(p)" title="Edit" type="button">
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
      <!-- </div> -->
    <!-- </div> -->


    <!-- <div id="parent-component"> -->
      <!-- Add Features Modal -->
      <div id="add-commission" container="#parent-component" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
          <div class="modal-header">
            <h2>Add Commission</h2>
            <p>Enter the details to create a new commission.</p>
          </div>
          <form @submit.prevent="saveCommission">
            <div class="modal-body" uk-overflow-auto>
              <label  class="form-input">
                <span class="form-input__label">Commission Rule</span>
                <div class="form-input__input">
                  <input v-model="formData.commissionrule" type="text">
                </div>
                <span v-if="errorData.commissionrule" class="form-input__error-msg">Please enter a the Rule Name</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Commission Amount</span>
                <div class="form-input__input">
                  <input v-model="formData.commissionpoint" type="number">
                </div>
                <span v-if="errorData.commissionpoint" class="form-input__error-msg">Please enter a Commission</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Commission Based On Every</span>
                <div class="form-input__input">
                  <input v-model="formData.amountearned" type="number">
                </div>
                <span v-if="errorData.amountearned" class="form-input__error-msg">Please enter the rule for the commission</span>
              </label>
              <div class="d-flx-alc-jfe mt-5">
                <button type="button" @click="closeModal" id="cancelBtn" class="btn btn-no-fill">
                  Cancel
                </button>
                <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                  + Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- End add feature modal -->


      <!-- edit Features Modal -->
      <div id="edit-commission" container="#parent-component" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeEdit" uk-close></button>
          <div class="modal-header">
            <h2>Edit Commission</h2>
            <p>Enter the details to update the commission.</p>
          </div>
          <form @submit.prevent="updateCommission">
            <div class="modal-body" uk-overflow-auto>
              <label  class="form-input">
                <span class="form-input__label">Commission Rule</span>
                <div class="form-input__input">
                  <input v-model="editData.commissionrule" type="text">
                </div>
                <span v-if="errorData.commissionrule" class="form-input__error-msg">Please enter a the Rule Name</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Commission Amount</span>
                <div class="form-input__input">
                  <input v-model="editData.commissionpoint" type="text">
                </div>
                <span v-if="errorData.commissionpoint" class="form-input__error-msg">Please enter a Commission</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Commission is Earned Based On Every</span>
                <div class="form-input__input">
                  <input v-model="editData.amountearned" type="text">
                </div>
                <span v-if="errorData.amountearned" class="form-input__error-msg">Please enter the rule for the commission</span>
              </label>
              <div class="d-flx-alc-jfe mt-5">
                <button type="button" @click="closeEdit" class="btn btn-no-fill">
                  Cancel
                </button>
                <button id="updateCommissionBtn" type="submit" class="btn btn--primary ml-1">
                  + Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- End edit feature modal -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
		loading: true,
		formData: {
			merchID: '',
			commissionpoint: '',
			amountearned: '',
			commissionrule: ''
		},
		commissions: [],
		errorData: {
			commissionpoint: false,
			amountearned: false,
			commissionrule: false
		},
		editData: {
			commissionpoint: '',
			amountearned: '',
			commissionrule: '',
			id: ''
		}
	}),
	
	methods: {
		saveCommission() {
		  this.clearErrorData()
			if(this.formData.commissionpoint === ''){
			  this.errorData.commissionpoint = true
				return
			}
      
			if(this.formData.commissionrule === ''){
			  this.errorData.commissionrule = true
				return
			}

			if(this.formData.amountearned === ''){
			  this.errorData.amountearned = true
				return
			}
      
      
			$('#submitBtn').attr('disabled', true).html('Saving....please wait')
			this.$store.dispatch('riders/saveCommission', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Save')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCommissions()
						this.closeModal()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Save')
					console.log(err)
				})
		},
		updateCommission() {
			this.clearErrorData()
			if(this.editData.commissionpoint === ''){
			  this.errorData.commissionpoint = true
				return
			}
      
			if(this.editData.commissionrule === ''){
			  this.errorData.commissionrule = true
				return
			}

			if(this.editData.amountearned === ''){
			  this.errorData.amountearned = true
				return
			}

			$('#updateCommissionBtn').attr('disabled', true).html('Updating..please wait')
			this.$store.dispatch('riders/updateCommission', this.editData)
				.then(res =>{
					$('#updateCommissionBtn').attr('disabled', false).html('+ Update')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCommissions()
						this.closeEdit()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#updateCommissionBtn').attr('disabled', false).html('+ Update')
					console.log(err)
				})
		},
	  getCommissions() {
	    this.$store.dispatch('riders/listCommissions', this.formData.merchID)
				.then(res =>{
					this.loading = false
					this.commissions = res.data.data != undefined ? res.data.data : [];
				}).catch(err =>{
					this.loading = false
					console.log(err)
				})
		},
		editCommission(p) {
		  this.editData = {
		    commissionpoint: p.commissionpoint,
				amountearned: p.amountearned,
				commissionrule: p.commissionrule,
				id: p.id
			}
			UIkit.modal('#edit-commission').toggle()
		},
		openModal() {
			UIkit.modal('#add-commission').toggle()
		},
		closeModal() {
		  this.formData.commissionpoint = ''
		  this.formData.amountearned = ''
		  this.formData.commissionrule = ''
			UIkit.modal('#add-commission').toggle('hide')
			UIkit.modal('#rider-commission').toggle()
		},
		clearErrorData() {
		  this.errorData = {
		    commissionpoint: false,
				amountearned: false,
				commissionrule: false
			}
		},
		closeEdit() {
			this.editData = {
				commissionpoint: '',
				amountearned: '',
				commissionrule: '',
				id: ''
			}
      
			UIkit.modal('#edit-commission').toggle('hide')
			UIkit.modal('#rider-commission').toggle()
		}
	},
	mounted() {
		 this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getCommissions()
	}
}
</script>
