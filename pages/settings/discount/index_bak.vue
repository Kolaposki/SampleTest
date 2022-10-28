<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link v-if="!isSupervisor" to="/settings" class="active">Basic details</nuxt-link>
        <nuxt-link to="/settings/contact-details" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewcontactdetails:'') || isMerchant">Contact Details</nuxt-link>
        <nuxt-link to="/settings/change-password" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewchangepassword:'') || isMerchant">Change Password</nuxt-link>
		<!-- <nuxt-link to="/settings/integration" v-if="isMerchant && !isCourierService" >Integration</nuxt-link> -->
        <nuxt-link to="/settings/tax" v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		<nuxt-link to="/settings/discount" v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <!-- <nuxt-link to="/settings/product-feature">Product Feature</nuxt-link>
        <nuxt-link to="/settings/rider-commission" >Rider Commissions</nuxt-link> -->
        <!-- <nuxt-link to="/settings/product-tax">Rider Commisions</nuxt-link> -->
        <!-- <nuxt-link to="/settings/loyalty-rule">Loyalty Rule</nuxt-link> -->
      </div>
    </overlay-scrollbars>
	<div id="discount-fee" uk-modal container="#parent-component" data-uk-modal="{target:'#discount-fee',bgclose:false}">
      <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>Discount</h2>
          <p>View a list of all your Discount and update them as necessary</p>
        </div>
        <!-- <div class="modal-body" uk-overflow-auto> -->
          <overlay-scrollbars class="modal-body"  >
          <table class="table-content">
            <thead class="">
              <tr>
                <th class="">Minimum Qty</th>
                <th class="">Maximum Qty</th>
                <th class="">Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <!-- <tbody>
              <tr v-if="fees.length < 1">
                <td colspan="8">No delivery fees at the moment</td>
              </tr>
			  
              <tr v-if="fees.length > 0" v-for="fee in fees" :key="fee.id">
                <td>{{ fee.minweight }}</td>
                <td>{{ fee.maxweight }}</td>
                <td>{{ fee.startdistance }}</td>
                <td>{{ fee.enddistance }}</td>
                <td v-if="fee.isdistancebased">Distance based</td>
                <td v-if="fee.isweightbased">Weight based</td>
                <td v-if="fee.isflatbased">Flat rate based</td>
                <td v-if="isCourierService">{{ fee.deliverymethod  }}</td>
                <td>{{ fee.amount }}</td>
                <td>{{ fee.flatfee }}</td>
                <td>
                  <button class="btn btn-icon" @click="editDeliveryFee(fee)" title="Edit" type="button">
                    <svg>
                      <use href="/uploads/icons.svg#edit"></use>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody> -->
          </table>
          </overlay-scrollbars>
        <!-- </div> -->
      </div>
    </div>
    <div class="inner-main-wrapper">
      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">Add discount</h3>
        <div class="search-filter d-flx-alc-jfe">
		  <div>
			  <button type="button" @click="viewDiscount()" class="btn btn--primary" id="viewDiscountBtn">View Discount</button>
		  </div>
		  
	  </div>
      </div>
	  
      <overlay-scrollbar class="table-wrapper no-deco">

      <form class="mt-2">
			<!-- <overlay-scrollbar> -->
				<div v-for="(input,i) in discountdata.discountfee" :key="i">
					<div class="flex-width-1-2 less-gp">
					<label class="form-input">
						<span class="form-input__label">Minimum Qty</span>
						<div class="form-input__input">
						    <input v-model="input.minorder" type="number">
						</div>
					</label>
					</div>

           <div class="flex-width-1-2 less-gp">
						<label class="form-input">
							<span class="form-input__label"> Maximum Qty</span>
							<div class="form-input__input">
							<input v-model="input.maxorder" type="number">
							</div>
						</label>
					</div>
					<div class="flex-width-1-2 less-gp">
						<label class="form-input">
							<span class="form-input__label">Discounted Amount</span>
							<div class="form-input__input">
							<input v-model="input.discountedamount" type="number">
							</div>
						</label>
					</div>

          <button 
            @click="addNew(i)"  
            v-show="i == discountdata.discountfee.length-1" 
            type="button" 
            class="btn btn--primary"
          >
          +
          </button>
          <button @click="remove(i)" v-show="i || ( !i && discountdata.discountfee.length > 1)" type="button" class="btn btn--primary">-</button>        			
				</div>
				

			<!-- </overlay-scrollbar> -->
          <div class="d-flx-alc-jfe mt-5">
            <button type="button"  id="cancelBtn" class="btn btn-no-fill">
              Cancel
            </button>
            <button id="submitBtn" type="submit" class="btn btn--primary ml-1" @click="creatDiscount()">
              + Create Discount
            </button>
          </div>
      </form>


      </overlay-scrollbar>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	data: () => ({
      newID:0,
      discountdata: {
      discountfee: [
          {
              "minorder": "",
              "maxorder": "",
              "discountedamount": "",
              "merchID": ""
          
          },
      ],
		},
	}),
  computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
		creatDiscount() {
			// console.log(this.input)
		    $('#submitBtn').attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('branches/saveDiscountFee', this.discountdata)
				.then(res =>{console.log(res);
					$('#submitBtn').attr('disabled', false).html('+ Create Discount fee(s)');    
						this.$toast.success(res.data.message)
					// if(res.data.status) {
					// 	this.$toast.success(res.data.message)
					// 	this.clearForm()
					// 	this.$router.push('/branch')
					// 	return
					// }
					
					// this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Create Discount fee(s)')
					console.log(err)
				})
		},
    addNew(){
    let new_obj = {
                  "minorder": "",
                  "maxorder": "",
                  "discountedamount": "",
                  "merchID": this.newID           
              };
          

          this.discountdata.discountfee.push(new_obj)
          
    },
		remove(index) {
			this.discountdata.discountfee.splice(index, 1)
		},
        
		viewDiscount() {
			$('#viewDiscountBtn').attr('disabled', true).html('Retrieving...please wait')
			this.$store.dispatch('branches/getDiscountFee', this.discountdata)
				.then(res =>{
					console.log(res)
					$('#viewDiscountBtn').attr('disabled', false).html('View discount fees')
				// if(res.data.status) {
				// 	// this.fLoading = false
				// 	// this.fees = res.data.data
				// 	// $('#delivery-fee').addClass('uk-open').show();
				// 	UIkit.modal('#discount-fee').toggle()
				// 	return
				// }
					// this.fLoading = false
					this.$toast.error('An error occurred while retrieving data')
		 		}).catch(err =>{
				$('#viewDiscountBtn').attr('disabled', false).html('View discount fees')
					this.$toast.error('An error occurred while retrieving data')
					console.log(err)
				})
		},
	},
	mounted() {
        this.newID = this.user.role ? this.user.merchID : this.user.id;
        this.discountdata.discountfee[0].merchID = this.user.role ? this.user.merchID : this.user.id;
	}
}
</script>
<style>

  button{
    font-size: medium;
  }

</style>