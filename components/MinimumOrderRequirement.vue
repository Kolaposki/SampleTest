<template>
    <div>
        <div class="mx-auto w-500">
            <form @submit.prevent="updateOtherSettings">
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Minimum Order Value</span>
                  <div class="form-input__input p-1">
                    <input type="text" v-model="formData.miniorderamount" placeholder="Enter Minimum Ordererable Value">
                  </div>
                  <span v-if="otherSettingsData.minorder" class="form-input__error-msg">Please enter a value</span>
                </label>
				<label  class="form-input pt-1">
					<div class="">
						<button type="submit" id="otherSettingsBtn" class="btn btn--primary mt-2">
							Update Information
						</button>
					</div>
				</label>
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
			businesslogo: '',
			accountnumber: '',
			accountname: '',
			displayeccommerce: '',
		},
		userDetails: {},
		otherSettingsData: {
		  minorder: false
		}
	}),

	methods: {
	  updateOtherSettings() {
		this.otherSettingsData.minorder = false
		if(this.formData.miniorderamount === ''){
			this.otherSettingsData.minorder = true
			return
		}
      
	    $('#otherSettingsBtn').attr('disabled', true).html('Updating....')
			this.$store.dispatch('settings/updateUserInfo', this.formData)
				.then(res =>{
					$('#otherSettingsBtn').attr('disabled', false).html('Update Information')
					if(res.data.status) {
						this.setData(res.data.data)
						this.$toast.success("Record was updated successfully")
						UIkit.modal('#miniorder').toggle();
						return
					}
					this.$toast.error('An error occurred')
					// UIkit.modal('#miniorder').toggle();
				}).catch(e =>{
					// UIkit.modal('#miniorder').toggle();
					$('#otherSettingsBtn').attr('disabled', false).html('Update Information')
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
				accountnumber: this.userDetails.accountname,
				accountname: this.userDetails.accountnumber,
				displayeccommerce: this.userDetails.displayeccommerce,				
				endofday: this.userDetails.endofday,
				businesslogo: '',
				businesswebsite: this.userDetails.businesswebsite
			}
		}
	},
	mounted() {
	  this.userDetails = this.user
	  this.setFormData()
	}
}
</script>
