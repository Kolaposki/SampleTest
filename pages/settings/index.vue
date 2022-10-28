<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link to="/settings" class="active">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax"  v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount"  v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles"  v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewlease:'') || isMerchant">Lease</nuxt-link>
      </div>
    </overlay-scrollbars>

    <div class="inner-main-wrapper">
      <div class="py-3 px-0">
        <section class="setting-section">
          <div class="setting-section-title">
            <h2>Business Rules</h2>
          </div>
          <div class=" r-width-500 py-2">
            <h2></h2>
            <!-- @submit.prevent="updateCompanyInformation" -->
            <form @submit.prevent="setRule">
              <label  class="form-input">
                <span class="form-input__label">Set Riders Cash Payment Threshold (₦)</span>
                <div class="form-input__input">
                  <input type="text" placeholder="Enter Threshold Amount" v-model="cashthreshold" @keyup="formatInput(cashthreshold, 'cashthreshold')">
                </div>
				<span v-if="errorData.cashthreshold" class="form-input__error-msg">Cash Threshold is required</span>
              </label>
			  <label  class="form-input">
                <span class="form-input__label">Set Remittance Duration (Days)</span>
                <div class="form-input__input">
                  <!-- <input type="date" placeholder="Enter Threshold Amount" v-model="formData.paymentdate" > -->
				  <input type="number" min="0" value="0" placeholder="Enter Number of Weeks" v-model="formData.paymentdate"/>
                </div>
				<span v-if="errorData.paymentdate" class="form-input__error-msg">Default Date is required</span>
              </label>
			  <label  class="form-input">
                <span class="form-input__label">Expected Weekly Remittance (₦)</span>
                <div class="form-input__input">
                  <input type="text" placeholder="Enter Amount" v-model="expectedweeklyamount" @keyup="formatInput(expectedweeklyamount, 'expectedweeklyremit')" >
                </div>
				<span v-if="errorData.expectedweeklyamount" class="form-input__error-msg">Expected weekly amount is required</span>
              </label>
              <button type="submit" id="ruleBtn" class="btn btn--primary mt-1" >
                Set Rule
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
		date:'',
		formData: {
			merchID: "",
			cashthreshold:"",
			paymentdate:"",
			expectedweeklyamount:""
		},
		errorData: {
			cashthreshold: false,
			paymentdate:false,
			expectedweeklyamount:false,
		},
		cashthreshold:'',
		expectedweeklyamount:''
		
	}),
	computed: {
		
	},
	methods: {
	formatInput (value, type){
        if(value != ''){
          let num = value.replace(/,/g, '');  //remove any currency format;    
		  if(type == 'cashthreshold'){
			this.formData.cashthreshold = Number(num)
			if(num.substr(num.length - 1) == '.'){
				this.cashthreshold = num
			}
			else if(isNaN(num)){
				this.cashthreshold = ''
			}
			else{
				this.cashthreshold = parseFloat(this.cashthreshold.replace(/,/g, '')).toLocaleString()
			}
		  }else{
			this.formData.expectedweeklyamount = Number(num)
			if(num.substr(num.length - 1) == '.'){
				this.expectedweeklyamount = num
			}
			else if(isNaN(num)){
				this.expectedweeklyamount = ''
			}
			else{
				this.expectedweeklyamount = parseFloat(this.expectedweeklyamount.replace(/,/g, '')).toLocaleString()
			}
		  }          
        }
		if(type == 'cashthreshold'){
			if(this.cashthreshold == 'NaN'){
				this.cashthreshold = 0;
			}  
		}else{
			if(this.expectedweeklyamount == 'NaN'){
				this.expectedweeklyamount = 0;
			}
		}	  
	
    },
	formatRemitInput (){
        if(this.formData.expectedweeklyamount != ''){
          let num = this.formData.expectedweeklyamount.replace(/,/g, ''); //parseFloat(this.cash_amountpaid.replace(/,/g, '')) //remove any currency format;
          

          if(num.substr(num.length - 1) == '.'){
            this.formData.expectedweeklyamount = num
          }
          else if(isNaN(num)){
            this.formData.expectedweeklyamount = ''
          }
          else{
            this.formData.expectedweeklyamount = parseFloat(this.formData.expectedweeklyamount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.formData.expectedweeklyamount == 'NaN'){
          this.formData.expectedweeklyamount = 0;
        }
	},	
	setRule() {
			if(this.validateData()) {
				return;
			}
			//  let cashtreshold = parseFloat(this.formData.cashthreshold.replace(/,/g, ''))
			//  let expectedweeklyamount = parseFloat(this.formData.expectedweeklyamount.replace(/,/g, ''))
			//  this.formData.cashthreshold = cashtreshold
			//  this.formData.expectedweeklyamount = expectedweeklyamount
			// this.formData.leasestartdate =  this.$moment(new Date()).format('YYYY-MM-DD')

			$('#ruleBtn').attr('disabled', true).html('Setting Rule....please wait')
			this.$store.dispatch('settings/businessRule', this.formData)
				.then(res => {
					$('#ruleBtn').attr('disabled', false).html('Set Rule')
					if(res.data.status) {
						this.$toast.success("Business Rule is captured!")
						// this.formData.cashthreshold = ''
			 			// this.formData.expectedweeklyamount = '' 
						// this.formData.paymentdate = '' 
						this.listRule()
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
					$('#ruleBtn').attr('disabled', false).html('Set Rule')
					console.log(e)
				})
	},
	listRule(){
		let vm = this
		this.$store.dispatch('settings/listBusinessRule', this.formData.merchID)
				.then(res => {
					if(res.data.status){
						let rules = res.data.data
						// console.log('rule', rules)
						this.formData = {
							merchID: rules.merchID,
							cashthreshold: rules.cashthreshold,
							paymentdate: rules.paymentdate,
							expectedweeklyamount: rules.expectedweeklyamount
						}
						this.cashthreshold = rules.cashthreshold
						this.expectedweeklyamount = rules.expectedweeklyamount
						this.loading = false
						return
					}

					this.loading = false
                    // console.log('errors')
					this.$toast.error('An error occurred')
				}).catch(err =>{
					this.loading = false
                    // console.log('error')
					this.$toast.error('An error occurred!')
				})
	},
		validateData() {
	    this.clearError()
			if(this.cashthreshold === '') {
				this.errorData.cashthreshold = true;
				return true;
				
			}

			if(this.formData.paymentdate === '') {
			  this.errorData.paymentdate = true
				return true;
			}

			if(this.expectedweeklyamount === ''){
			  this.errorData.expectedweeklyamount = true
				return true;
			}

		},
		clearError() {
			this.errorData = {
				cashthreshold: false,
				paymentdate:false,
				expectedweeklyamount:false,
			}
		},
		setBusinessData(){
			
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listRule()
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].settings.viewsettings: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>

<style scoped>
h2{
	font-weight: 600;
	color: darkslategrey
}
</style>