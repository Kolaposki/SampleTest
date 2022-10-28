<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/subscriptions" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
      </div>
    </div>
    <div id="parent-component">
      <div id="subscription" uk-modal  container="#parent-component" data-uk-modal="{bgclose:false}">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="cancelModal">X</button>
          <div class="modal-header">
            <h2>Subscribe</h2>
            <p>Fill details to subscribe to a plan</p>
          </div>
          <form @submit.prevent="paySubscription">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <label  class="form-input">
                <span class="form-input__label">Plan name</span>
                <div class="form-input__input">
                  <input type="text" v-model="modalData.planname" placeholder="" readonly>
                </div>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Type</span>
                <div class="form-input__input">
                  <select v-model="formData.subscriptiontype" @change="getPlanAmount($event)">
                    <option value="">-Select-</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Annually</option>
                  </select>
                </div>
				<span v-if="errorData.subscriptiontype" class="form-input__error-msg">Please select a subscription type</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Plan amount</span>
                <div class="form-input__input">
                  <input type="text" v-model="modalData.amount" placeholder="" readonly>
                </div>
              </label>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="cancelModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="submitBtn" class="btn btn--primary ml-1">
                + Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">
      <section class="section-wrapper">
        <ul class="card-list" v-if="loading">
          <li class="box-deco-bg  px-0 pb-0">
            <div class="card-item__content mt-0 px-2">
              <div class="card-item__main">
                <h3 class="card-item__main--title">
                  Loading....Please wait
                </h3>
              </div>
              <br />
              <p class="card-item__status">
              </p>
            </div>
          </li>
        </ul>
        <ul class="card-list none flex-width-1-3wgr" v-if="!loading">
          <li class="box-deco-bg px-0 pb-0" v-for="(row, ix) in filteredList" v-bind:key="ix">
            <a href="javascript:;" @click="subscribe(row)"  class="card-item d-blk">
              <div class="card-item__content mt-0 px-2">
                <div class="card-item__main">
                  <h3 class="card-item__main--title">
                    {{ row.licensename }}
                  </h3>
                  <p class="card-item__main--count">{{  row.licensedescription }}</p>
                </div>
                <p class="card-item__status">
                </p>
              </div>
              <p class="price px-2">
                <span>Users:</span> {{row.nosofriders}} <br />
                <span>Riders:</span> {{row.nosofusers}}
              </p>
            </a>
            <br />
            <div class="card-item__drop">
              <div v-if="row.licensename !== 'Free Trial'" class="drop-down org-drop drop-set">
				  <button class="btn btn-btn">
				  	<a href="javascript:;" @click="subscribe(row)" class="icon-text">
						<svg class="">
							<use xlink:href="/uploads/icons.svg#view"></use>
						</svg>
						<span>
							Subscribe
						</span>
					</a>
				</button>

				<!-- ormData.append('currency', 'NGN')
				formData.append('amount', data.amount)
				formData.append('merchantid', 208432)
				formData.append('email_address', this.user.merchantemailaddress)
				formData.append('merch_txnref', ref)
				formData.append('names', `${this.user.contactpersonlastname} ${this.user.contactpersonfirstname}`)
				formData.append('phone_number', this.user.merchantphonenumber) -->

				

				
                <!-- <button class="btn btn-icon drop-set" type="button" @click="toggleDropdown($event)">
                  <svg class="drop-set">
                    <use xlink:href="/uploads/icons.svg#more"></use>
                  </svg>
                </button>
                <div class="drop-wrapper" data-drop-down>
                  <ul class="drop-lists">
                    <li class="drop-list-item">
                      <a href="javascript:;" @click="subscribe(row)" class="icon-text">
                        <svg class="">
                          <use xlink:href="/uploads/icons.svg#view"></use>
                        </svg>
                        <span>
                          Subscribe
                        </span>
                      </a>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </li>
        </ul>
      </section>
<!-- Test -->
	   <form style="display: none" method="post" id="subscribe" action="https://www.globalpay.com.ng/GlobalPayAPI/Paymentgatewaycapture.aspx" >
				Names: <input type="text" id="names" name="names" :value="`${user.contactpersonlastname} ${user.contactpersonfirstname}`"> <br/>
				Amount: <input type="text" id="amount" :value="modalData.amount" name="amount"> <br/>
				Email Address: <input type="text" :value="user.merchantemailaddress" id="email_address" name="email_address"> <br/>
				Phone Number: <input type="text" :value="user.merchantphonenumber" id="phone_number" name="phone_number"> <br/>
				<!-- Please change the currency as suited to your merchant-->
				<input type="hidden" id="currency" name="currency" value="NGN"> <br/> 
				<input type="text" id="merch_txnref" name="merch_txnref" :value="generateRefNumber(10).toLowerCase()"> <!--<br/>Merchant reference number should be unique per transaction -->
				<!-- Merchant Id value should be changed to your merchant id-->
				<input type="hidden" id="merchantid" name="merchantid" value="3339"> <br/>
				<input type="hidden" id="url" name="redirect_url" value="https://ntisamerchant.wajesmarthrms.website/subscriptions/new/"> <br/>

				 <input type="hidden" id="cmdsubmit" name="cmdsubmit" value="Submit"> 
					
				</form>  
<!-- Test -->
		<!-- <form style="display: none" method="post" id="subscribe" action="https://www.globalpay.com.ng/GlobalPayAPI/Paymentgatewaycapture.aspx" >
				Names: <input type="text" id="names" name="names" :value="`${user.contactpersonlastname} ${user.contactpersonfirstname}`"> <br/>
				Amount: <input type="text" id="amount" :value="modalData.amount" name="amount"> <br/>
				Email Address: <input type="text" :value="user.merchantemailaddress" id="email_address" name="email_address"> <br/>
				Phone Number: <input type="text" :value="user.merchantphonenumber" id="phone_number" name="phone_number"> <br/>
				
				<input type="hidden" id="currency" name="currency" value="NGN"> <br/>
				<input type="text" id="merch_txnref" name="merch_txnref" :value="generateRefNumber(10).toLowerCase()"> <br/>
				
				<input type="hidden" id="merchantid" name="merchantid" value="3339"> <br/>
				<input type="hidden" id="url" name="redirect_url" value="https://ntisamerchant.wajesmarthrms.website/subscriptions/new"> <br/>

				<input type="hidden" id="cmdsubmit" name="cmdsubmit" value="Submit"> 
					
				</form> -->

    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.licenses.filter(license => {
				if (license.licensename.toLowerCase().includes(this.search.toLowerCase())) {
					return license.licensename.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		loading: true,
		search: '',
		reference: '',
		formData: {
			merchID: '',
			transrefernce: '',
			licenseID: '',
			amount: '',
			subscriptiontype: ''
		},
		txnref: "",
		status: "",
		errorData: {
			amount: false,
			subscriptiontype: false
		},
		modalData: {
		  planname: '',
			amount: 0
		},
		licenses: [],
		plan: {}
	}),
	methods: {
		validate() {
			if(this.formData.subscriptiontype == '') {
				this.errorData.subscriptiontype = true
				return true;
			}

			// if(this.formData.amount == 0){

			// }
		},
		getLicenses() {
			this.$store.dispatch('license/getLicenses')
				.then(res =>{
					if(res.data.status) {
					  this.licenses = res.data.data
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err =>{
				  this.loading = false
					this.$toast.error('An error occurred')
				})
		},
		subscribe(row) {
			if(row.licensename !== 'Free Trial'){
				this.clearData()
				this.plan = row
				this.modalData.planname = row.licensename
				this.formData.licenseID = row.id
				UIkit.modal('#subscription').toggle()
				// $('#subscription').addClass('uk-open').show();
			}
			// UIkit.modal('#subscription').toggle()
		},
		clearData() {
		  this.plan = {}
		  this.formData.subscriptiontype = ''
		  this.modalData = {
				planname: '',
				amount: 0
			}
		},
		cancelModal() {
			this.errorData.subscriptiontype = false
		  this.clearData()
			// $('#subscription').removeClass('uk-open').hide();
			UIkit.modal('#subscription').toggle('hide')
		},
		paySubscription() {
			if(this.validate()) {
				return;
			}
			this.reference = this.generateRefNumber(10).toLowerCase()
		  	if(confirm('Are you sure you want to subscribe to this license?')) {
				let data = this.modalData
				let user = this.user
				
				let ref =  this.reference;
				let vm = this

				localStorage.setItem('licenseID', this.formData.licenseID)
				localStorage.setItem('amount', data.amount)
				localStorage.setItem('subscriptiontype', this.formData.subscriptiontype)

				// document.getElementById('subscribe').submit();

				// let formData = new FormData();
				// formData.append('currency', 'NGN')
				// formData.append('amount', data.amount)
				// formData.append('merchantid', 208432)
				// formData.append('email_address', this.user.merchantemailaddress)
				// formData.append('merch_txnref', ref)
				// formData.append('names', `${this.user.contactpersonlastname} ${this.user.contactpersonfirstname}`)
				// formData.append('phone_number', this.user.merchantphonenumber)

				

				

				// this.$store.dispatch('license/globalPay', formData
				// )
				// 	.then(res =>{
				// 		console.log(res)
				// 		if(res.data.status) {
				// 			// this.$toast.success('Subscription successful')
				// 			this.cancelModal();
				// 			// this.$router.push('/subscriptions')
						
				// 			return
				// 		}
          
				// 		this.$toast.error('An error occurred')
				// 	}).catch(err =>{
				// 		this.cancelModal();
				// 		this.$toast.error('An error occurred')
				// 	})

				// window.location = 'https://demo.globalpay.com.ng/GlobalPayAPI/Paymentgatewaycapture.aspx/?currency=NGN' + '?amount=' + data.amount + '?merchant_id=21863' + '?First_Name=' + this.user.contactpersonfirstname + '?Last_Name=' + this.user.contactpersonlastname
				var x = getpaidSetup({
					PBFPubKey:'FLWPUBK-9e6e22dec3b0cd3401d10fbcb3597b12-X',
					// PBFPubKey: 'FLWPUBK_TEST-f3f55b6337e00cdc6846c5322f5e57e6-X',
					//PBFPubKey: 'FLWPUBK-00fd26c8dc92b4e1663550c4ba7532aa-X',
					customer_email: user.merchantemailaddress,
					amount: data.amount,
					customer_phone: user.merchantphonenumber,
					customer_firstname: user.businessname,
					currency: "NGN",
					txref: ref,
					onclose: function () {
						vm.errorData.subscriptiontype = false
					},
					callback: function (response) {
						if (
							response.data.data.responsecode == "00" ||
				response.data.data.responsecode == "0"
						) {
							// redirect to a success page
							vm.$toast.success('Payment was successful')
							
							
							// console.log(response.data.tx)
							vm.merchantSubscription(response.data.tx)
							
						} else {
							// redirect to a failure page.
							vm.$toast.error('An error occurred! Please try again or contact the administrator')
						}
						x.close(); // use this to close the modal immediately after payment.
					}
				});
			}
		},
		merchantSubscription(data) {
			this.formData.transrefernce = data.txRef
			this.formData.amount = data.amount
			
			this.$store.dispatch('license/merchantSubscription', this.formData)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success('Subscription successful')
						this.cancelModal();
						this.$router.push('/subscriptions')
						
						return
					}
					this.$toast.error('An error occurred')
					
				}).catch(err =>{
					this.cancelModal();
					this.$toast.error('An error occurred')
				})
		},
		getPlanAmount(e) {
		  let value = e.target.value
			if(value === '') {
				this.$toast.error('Please select a type')
				return
			}

			if(value === 'monthly') {
			  this.modalData.amount = this.plan.monthlypricing
				return
			}
			
			if(value === 'quarterly') {
				this.modalData.amount = this.plan.quarterlypricing
				return
			}

			if(value === 'yearly') {
				this.modalData.amount = this.plan.annuallypricing
				return
			}
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
	  
		
		// console.log(this.$route.query.status);
		if(this.$route.query.txnref != undefined && this.$route.query.status != undefined) {
			
			if(this.$route.query.status == 'successful') {
				this.$toast.success('Transaction is being processed')
				this.formData.transrefernce = this.$route.query.txnref
				this.formData.licenseID = localStorage.getItem('licenseID')
				this.formData.amount = localStorage.getItem('amount')
				this.formData.subscriptiontype = localStorage.getItem('subscriptiontype')
				this.merchantSubscription();
			} else {
				this.$toast.error('Failed to process transaction')
				this.getLicenses()
			}
			localStorage.removeItem('licenseID')
			localStorage.removeItem('amount')
			localStorage.removeItem('subscriptiontype')
 		} else {
			 this.getLicenses()
		 }
	}
}
</script>