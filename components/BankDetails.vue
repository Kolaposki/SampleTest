<template>
    <div>
        <div class="mx-auto w-500">
        <div class="modal-header">
                    <h2>Set Your Bank Account</h2>
                    <p>Change your settlement bank details below</p>
                  </div>
            <form @submit.prevent="updateBankInfo">
                    <div class="modal-body" uk-overflow-auto>
                      <label  class="form-input">
                        <span class="form-input__label">Bank name</span>
                        <div class="form-input__input">
						<Select2 v-model="formData.bankname" @change="onSetBank" :placeholder="'Select a Bank'" :options="banks" :settings="{width: '100%'}"/>
                          <!-- <select  v-model="formData.bankname" placeholder="Enter price">
                            <option value="">-Select Bank-</option>
                            <option v-for="bank in banks" :key="bank.code" :value="bank.name">
                              {{ bank.name }}
                            </option>
                          </select> -->
                        </div>
                        <span v-if="bankErrorData.accountname" class="form-input__error-msg">Please select a bank</span>
                      </label>
                      <div class="flex-width-1-2 less-gp">
                        <label  class="form-input">
                          <span class="form-input__label">Account number</span>
                          <div class="form-input__input">
                            <input type="text" v-model="formData.accountnumber" placeholder="**********">
                          </div>
                          <span v-if="bankErrorData.accountnumber" class="form-input__error-msg">Account Number Should be 10 digits</span>
                        </label>
                        <label  class="form-input">
                          <span class="form-input__label">Account name</span>
                          <div class="form-input__input">
                            <input type="text" v-model="formData.accountname" placeholder="Account name">
                          </div>
                          <span v-if="bankErrorData.accountname" class="form-input__error-msg">Please enter an account name</span>
                        </label>
                      </div>
                    </div>
                    <div class="d-flx-alc-jfe mt-3">
                      <button @click="cancelBank" class="btn btn-no-fill uk-modal-close">
                        Cancel
                      </button>
                      <button type="submit" id="bankInfoBtn" class="btn btn--primary ml-1">
                        + Update bank details
                      </button>
                    </div>
                  </form>
          </div>
    </div>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
		formData: {
			merchantid: '',
			businessdescription: '',
			businessfacebook: '',
			businesstwitter: '',
			merchantemailaddress: '',
			miniorderamount: '',
			businessinstagram: '',
			businesslinkedln: '',
			businessname: '',
			businesswebsite: '',
			rcnumber: '',
            bankname: '',
            bankcode: '',
			businesslogo: '',
			accountnumber: '',
			accountname: '',
			displayeccommerce: '',
		},
		userDetails: {},
		otherSettingsData: {
		  minorder: false
        },
        bankErrorData: {
			bankname: false,
			accountnumber: false,
			accountname: false
        },
        banks: [],
		value: [
			{id: 1, text: 'Yes'},
			{id: 0, text: 'No'},
			// {id: 'service', text: 'Service'}
		],
	}),

	methods: {
        onSetBank() {
			this.formData.bankcode = this.banks.find(x => x.name = this.formData.bankname).code
		},
		async getBanks () {
			this.banks = (await this.$store.dispatch('settings/activeBanks')).data.data.map(bank => {
				bank.id=bank.name; 
				bank.text = bank.name;
				return bank
			})
        },
        cancelBank() {
			UIkit.modal('#change').toggle('hide')
		},
        validateBankInfo() {
		  if(this.formData.bankname === '') {
		    this.bankErrorData.bankname = true
				return true
			}

		  if(this.formData.accountnumber === '' || this.formData.accountnumber.toString().length != 10) {
		    this.bankErrorData.accountnumber = true
				return true
			}
		  
		  if(this.formData.accountname === '') {
		    this.bankErrorData.accountname = true
				return true
			}
		  
		  return false
		},
	  updateBankInfo() {
			if(this.validateBankInfo()) {
				return;
			}

			this.onSetBank()

			$('#bankInfoBtn').attr('disabled', true).html('Updating...Please wait');
			this.$store.dispatch('settings/updateUserInfo', this.formData)
				.then(res =>{
					$('#bankInfoBtn').attr('disabled', false).html('+ Update bank details');
					if(res.data.status) {
						this.setData(res.data.data)
						this.$toast.success("Record was updated successfully")
					}
				}).catch(err =>{
					$('#bankInfoBtn').attr('disabled', false).html('+ Update bank details');
				})
		},
		setFormData() {
			this.formData = {
				merchantid: this.userDetails.id,
				businessdescription: this.userDetails.businessdescription,
				businessfacebook: this.userDetails.businessfacebook,
				businesstwitter: this.userDetails.businesstwitter,
				merchantemailaddress: this.userDetails.merchantemailaddress,
				miniorderamount: this.userDetails.miniorderamount,
				businessinstagram: this.userDetails.businessinstagram,
				businesslinkedln: this.userDetails.businesslinkedln,
				businessname: this.userDetails.businessname,
				rcnumber: this.userDetails.rcnumber,
                bankname: this.userDetails.bankname,
                bankcode: '',
				accountnumber: this.userDetails.accountnumber,
				accountname: this.userDetails.accountname,
				displayeccommerce: this.userDetails.displayeccommerce ? 1 : 0,
				businesslogo: '',
				endofday: this.userDetails.endofday,
				businesswebsite: this.userDetails.businesswebsite
			}
		}
	},
	mounted() {
	  this.userDetails = this.user
      this.setFormData()
      this.getBanks()
	}
}
</script>
