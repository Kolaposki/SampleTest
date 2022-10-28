<template>
    <div>
        <div class="mx-auto w-500">
            <form v-if="user.bankname" @submit.prevent="updateOtherSettings">
              <div class="flex-width-1-1 less-gp">
                <!-- <label  class="form-input"> -->
                  <!--<span class="form-input__label">Should your products show on the Eccomerce Platform</span>-->
                  <div class="form-input__input p-1">
                     <label  class="form-input">
						<span class="form-input__label">Display On E-commerce</span>
						<div class="form-input__input">
						<Select2 v-model="formData.displayeccommerce" :options="value"/>
						<!-- <select required  v-model="formData.displayeccommerce">
							<option value="">Select --</option>
							<option value="1">Yes</option>
							<option value="0">No</option>
						</select> -->
						<!-- <input type="text" v-model="formData.displayeccommerce" placeholder="Enter Display Commerce"> -->
						</div>
					</label>
                  </div>
                <!-- </label> -->
				<label  class="form-input pt-1">
					<div class="">
						<button type="submit" id="eccommerceBtn" class="btn btn--primary mt-2">
							Update Information
						</button>
					</div>
				</label>
              </div>
              
            </form>
			<bank-details v-else/>
          </div>
    </div>
</template>
<script>
import BankDetails from './BankDetails.vue';
export default {
	layout: 'main',
	components: { BankDetails },
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
		},
		value: [
			{id: 1, text: 'Yes'},
			{id: 0, text: 'No'},
			// {id: 'service', text: 'Service'}
		],
	}),

	methods: {
	  updateOtherSettings() {
		  this.userDetails = this.user
		  this.setFormData()
		this.otherSettingsData.minorder = false
		if(this.formData.displayeccommerce === ''){
			this.otherSettingsData.minorder = true
			return
		}
	    $('#eccommerceBtn').attr('disabled', true).html('Updating....')
			this.$store.dispatch('settings/updateUserInfo', this.formData)
				.then(res =>{
					$('#eccommerceBtn').attr('disabled', false).html('Updating Information')
					if(res.data.status) {
						this.setData(res.data.data)
						this.$toast.success("Settings was updated successfully")
						//UIkit.modal('#displayeccomerce').toggle();
						return
					}
					this.$toast.error('An error occurred')
					// UIkit.modal('#miniorder').toggle();
				}).catch(e =>{
					// UIkit.modal('#miniorder').toggle();
					$('#eccommerceBtn').attr('disabled', false).html('Update Information')
				})

		},
		setFormData() {
			 
				this.formData.merchantid = this.userDetails.id;
				this.formData.businessdescription = this.userDetails.businessdescription;
				this.formData.businessfacebook = this.userDetails.businessfacebook;
				this.formData.businesstwitter = this.userDetails.businesstwitter;
				this.formData.merchantemailaddress = this.userDetails.merchantemailaddress;
				this.formData.miniorderamount = this.userDetails.miniorderamount;
				this.formData.businessinstagram = this.userDetails.businessinstagram;
				this.formData.businesslinkedln = this.userDetails.businesslinkedln;
				this.formData.businessname = this.userDetails.businessname;
				this.formData.rcnumber = this.userDetails.rcnumber;
				this.formData.bankname = this.userDetails.bankname;
				this.formData.accountnumber = this.userDetails.accountname;
				this.formData.accountname = this.userDetails.accountnumber;
				
				this.formData.endofday =  this.userDetails.endofday,
				this.formData.businesslogo = '';
				this.formData.businesswebsite =  this.userDetails.businesswebsite;
			
		}
	},
	mounted() {
	  this.userDetails = this.user
	  this.setFormData()
	  this.formData.displayeccommerce = this.userDetails.displayeccommerce ? 1 : 0;
	}
}
</script>
