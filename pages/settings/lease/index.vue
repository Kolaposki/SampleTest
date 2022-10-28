<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <!-- <nuxt-link  to="/settings" >Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax" v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount" v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease" class="active" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewcontactdetails:'') || isMerchant">Lease</nuxt-link> -->
        <nuxt-link  to="/settings">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax"  v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount"  v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles"  v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease" class="active" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewlease:'') || isMerchant">Lease</nuxt-link>
      </div>
      
    </overlay-scrollbars>
    <div class=" " style="display:flex; margin-left:30px; margin-top:10px">
          <button 
            v-for='(tab, index) in tabs' 
            :key="index" 
     		:class="selectedTab == tab ? 'active':''" 
             @click="setTab(tab)" 
             class="tab"
         > {{tab}}</button>
      </div>
    <div class="inner-main-wrapper">
      <div class="py-3 px-0">
        <section class="setting-section" v-if="showLeasePayment">
          <div class="setting-section-title">
            <h2>Lease Payment Form</h2>
          </div>
          <div class=" r-width-500 py-2">
            <!-- <h2>Set Riders Cash Payment Threshold</h2> -->
            <!-- @submit.prevent="updateCompanyInformation" -->
            <form @submit.prevent="createLease">
              <label  class="form-input">
                <span class="form-input__label">Rider</span>
                <div class="form-input__input">
                     <select2 :placeholder="'Select a rider'" :options="options" :settings="settings" v-model="formData.riderID" required/>
                </div>
                <span v-show="errorData.riderID" class="form-input__error-msg">Select a rider</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Lease Initial Amount (₦) </span>
                <div class="form-input__input">
                  <input type="text" placeholder="Enter Lease Initial Amount" v-model="leaseamount" required @keyup="formatInput"> 
                </div>
                <span v-show="errorData.leaseamount" class="form-input__error-msg">Lease amount is required</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Lease Duration(No of months)</span>
                <div class="form-input__input">
                  <input type="text" placeholder="Enter Lease Duration in Months" v-model="formData.leaseduration" required>
                </div>
                <span v-show="errorData.leaseduration" class="form-input__error-msg">Lease duration is required</span>
              </label>
              <!-- <label  class="form-input">
                <span class="form-input__label">Lease Start Date</span>
               
                <div class="form-input__input">
                  <input type="text" placeholder="">
                </div>
              </label> -->
              <button type="submit" id="leaseBtn" class="btn btn--primary mt-1" >
               Submit
              </button>
            </form>
          </div>
        </section> 
        <section class="setting-section" v-if="showRemittance">
          <div class="setting-section-title">
            <h2>Rider's Weekly Remittance Form</h2>
          </div>
          <div class=" r-width-500 py-2">
            <!-- <h2>Set Riders Cash Payment Threshold</h2> -->
            <!-- @submit.prevent="updateCompanyInformation" -->
            <form @submit.prevent="riderRemittance">
              <label  class="form-input">
                <span class="form-input__label">Rider</span>
                <div class="form-input__input">
                     <select2 :placeholder="'Select a rider'" :options="options" :settings="settings" v-model="remitData.riderID" required/>
                </div>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Actual Weekly Remittance (₦)</span>
                <div class="form-input__input">
                  <input type="text" placeholder="Enter Amount" v-model="remittanceamount" required @keyup="formatRiderInput">
                </div>
              </label>
              <button type="submit" id="remitBtn" class="btn btn--primary mt-1" >
               Submit
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
      options: [
			{id: '', text: 'Select Riders'},],
      settings: {
			width: '100%'
    	},
		formData: {
			merchID:'',
      riderID:'',
      leaseamount:'',
      leaseduration:'',
      leasestartdate:'',
		},
    leaseamount:'',
    errorData: {
      riderID:false,
      leaseamount:false,
      leaseduration:false
		},
    remitData: {
      riderID: '',
      remittanceamount:'',
      merchID:''
    },
    remittanceamount:'',
    riderslist:[],
    tabs:["Lease Payment", "Rider's remittance"],
    selectedTab:"Lease Payment",
		showLeasePayment:true,
        showRemittance:false,
	}),
	computed: {
		
	},
	methods: {
	formatInput (){
        if(this.leaseamount != ''){
          let num = this.leaseamount.replace(/,/g, '');  //remove any currency format;
          this.formData.leaseamount = Number(num)

          if(num.substr(num.length - 1) == '.'){
            this.leaseamount = num
          }
          else if(isNaN(num)){
            this.leaseamount = ''
          }
          else{
            this.leaseamount = parseFloat(this.leaseamount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.leaseamount == 'NaN'){
          this.leaseamount = 0;
        } 
    
	
  },
	formatRiderInput (){
        if(this.remittanceamount != ''){
          let num = this.remittanceamount.replace(/,/g, '');  //remove any currency format;
          this.remitData.remittanceamount = Number(num)

          if(num.substr(num.length - 1) == '.'){
            this.remittanceamount = num
          }
          else if(isNaN(num)){
            this.remittanceamount = ''
          }
          else{
            this.remittanceamount = parseFloat(this.remittanceamount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.remittanceamount == 'NaN'){
          this.remittanceamount = 0;
        } 
    
	
    },
    createLease() {
			// if(this.validateData()) {
			// 	return;
			// }
			this.formData.leasestartdate =  this.$moment(new Date()).format('YYYY-MM-DD')
			// let leaseamount = parseFloat(this.formData.leaseamount.replace(/,/g, ''))
			// this.formData.leaseamount = leaseamount

			$('#leaseBtn').attr('disabled', true).html('Submitting....please wait')
			this.$store.dispatch('settings/leasePayment', this.formData)
				.then(res => {
					$('#leaseBtn').attr('disabled', false).html('Submit')
					if(res.data.status) {
						this.$toast.success('Lease Payment is captured!')
            this.leaseamount = ''
            this.formData.riderID = ''
            this.formData.leaseduration = ''
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
					$('#leaseBtn').attr('disabled', false).html('Submit')
					console.log(e)
				})
		},	
    validateData() {
	    this.clearError()
			if(this.formData.riderID === '') {
				this.errorData.riderID = true;
				return true;
				
			}

			if(this.leaseamount === '') {
			  this.errorData.leaseamount = true
				return true;
			}

			if(this.formData.leaseduration === ''){
			  this.errorData.leaseduration = true
				return true;
			}

		},
		clearError() {
			this.errorData = {
				riderID: false,
				leaseamount:false,
				leaseduration:false,
			}
		},
    riderRemittance() {
			// if(this.validateRiderData()) {
			// 	return;
			// }
			// this.formData.leasestartdate =  this.$moment(new Date()).format('YYYY-MM-DD')
			// let remittanceamount = parseFloat(this.remitData.remittanceamount.replace(/,/g, ''))
			// this.remitData.remittanceamount = remittanceamount
			$('#remitBtn').attr('disabled', true).html('Submitting....please wait')
			this.$store.dispatch('settings/riderWeeklyRemittance', this.remitData)
				.then(res => {
					$('#remitBtn').attr('disabled', false).html('Submit')
					if(res.data.status) {
						this.$toast.success("Rider's weekly remittance is captured!")
            this.remitData.riderID = ''
            this.remittanceamount = ''
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
					$('#leaseBtn').attr('disabled', false).html('Submit')
					console.log(e)
				})
		},	
		getRiders() {
	    this.$store.dispatch('riders/listRidersExport', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
            this.setRiders(res.data.data)
          }
				}).catch(e =>{
					console.log(e)
				})
		},
        setRiders(riders) {
			let vm = this
			riders.forEach(function(e) {
				let data = {
					id: e.id,
					text: e.riderfirstname + ' ' + e.riderlastname
				}
                vm.riderslist.push(data)
				vm.options.push(data)
			})
		},
        setTab(name) {
			this.selectedTab = name
			if(name == 'Lease Payment'){
				this.showLeasePayment = true
				this.showRemittance = false
			}else{
				this.showLeasePayment = false
				this.showRemittance = true
			}
    	},
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].settings.viewlease: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
        this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
        this.remitData.merchID = this.user.role ? this.user.merchID : this.user.id
        this.getRiders()
    }
}
</script>

<style scoped>
h2{
	font-weight: 600;
	color: darkslategrey
}
.tab {
		overflow: hidden;
		border: .5px solid rgb(238, 238, 238);
		background-color: white;
		margin-left: 0
	}

	/* Style the buttons that are used to open the tab content */
	button.tab {
		background-color: inherit;
		float: left;
		border: 1px solid forestgreen;
		outline: none;
		cursor: pointer;
		padding: 18px 32px;
		font-weight: 600;
		/* transition: 0.3s; */
		margin-left: 0
	}
	/* Change background color of buttons on hover */
	button.tab:hover {
		background-color: rgb(248, 248, 248);
		color: forestgreen;
		font-weight: 600
	}
	.tab button.click{
		min-width: 10px !important;
		height: 50px;
    	margin-top: 10px;
	}


	.tab button.click:hover{
		background: forestgreen;
		color:#fff
	}

	/* Create an active/current tablink class */
	button.tab.active {
		color: white;
		background-color: forestgreen;
	}
</style>