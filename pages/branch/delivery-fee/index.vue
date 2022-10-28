<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16">
        <nuxt-link to="/branch" class="text-link">
          <svg>
            <use href="/uploads/icons.svg#back"></use>
          </svg>
          <span class="ml-1 fw-bold co-grey">Back</span>
        </nuxt-link>
      </p>
      <div class="search-filter d-flx-alc-jfe">
      </div>
    </div>

    <div class="inner-main-wrapper mx-1 my-2">
      <div class="d-flx-alc-jsb">
        <h3 class="section-title">Add delivery fee for {{ branch.branchname }}</h3>
      </div>
      <overlay-scrollbar class="table-wrapper no-deco">
        <form class="mt-1" @submit.prevent="creatDeliveryFee">
			<!-- <overlay-scrollbar> -->
				<div v-for="(input,k) in deliveryFeeData" :key="k">
					<div class="flex-width-1-2 less-gp">
					<label class="form-input">
						<span class="form-input__label">Deliver Fee type</span>
						<div class="form-input__input">
						<Select2 @select="mySelectEvent($event, k)" v-model="input.deliverytype" :options="options" />
						</div>
					</label>

					<label v-if="isCourierService" class="form-input">
							<span class="form-input__label">Delivery type</span>
							<div class="form-input__input">
							<Select2 v-model="input.deliverymethod" :required="true" :options="courierOptions" />
							</div>
						</label>

					
					</div>

					<div class="flex-width-1-2 less-gp">
						<label v-if="input.amountDiv"  class="form-input">
							<span class="form-input__label">Amount</span>
							<div class="form-input__input">
							<input v-model="input.amount" type="number">
							</div>
						</label>

						<label v-if="input.flatFeeDiv"  class="form-input">
							<span class="form-input__label">Flat fee</span>
							<div class="form-input__input">
							<input v-model="input.flatfee" type="number">
							</div>
						</label>
					</div>

					<div v-show="deliveryFeeData[k].isdistancebased" class="flex-width-1-2 less-gp">
					<label  class="form-input">
						<span class="form-input__label">Start distance (km)</span>
						<div class="form-input__input">
						<input v-model="input.startdistance" type="number">
						</div>
					</label>

					<label  class="form-input">
						<span class="form-input__label">End distance (km)</span>
						<div class="form-input__input">
						<input v-model="input.enddistance" type="number">
						</div>
					</label>
					</div>

					<!-- <div v-show="deliveryFeeData[k].isweightbased" class="flex-width-1-2 less-gp">
					<label  class="form-input">
						<span class="form-input__label">Minimum Weight (kg)</span>
						<div class="form-input__input">
						<input v-model="input.minweight" type="number">
						</div>
					</label>

					<label   class="form-input">
						<span class="form-input__label">Maximum Weight (kg)</span>
						<div class="form-input__input">
						<input v-model="input.maxweight" type="number">
						</div>
					</label>
					</div> -->
					<div class="flex-width-1-2 less-gp">
					<label class="form-input" v-show="k == deliveryFeeData.length-1">
						<button @click="addChild(k)" class="btn btn--primary" type="button">
						Add
						</button>
					</label>
					<label class="form-input" v-show="k || ( !k && deliveryFeeData.length > 1)">
						<button @click="removeChild(k)" class="btn btn--danger" type="button">
						Remove
						</button>
					</label>
					</div>
				</div>
			<!-- </overlay-scrollbar> -->
          <div class="d-flx-alc-jfe mt-5">
            <button type="button" @click="cancelDelivery" id="cancelBtn" class="btn btn-no-fill">
              Cancel
            </button>
            <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
              Create delivery fee(s)
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
	computed : {
		isCourierService () { 
			 return this.userData.businessdescription !== null && this.userData.businessdescription.toLowerCase().includes('delivery')
		},
		userData () {
			return this.$store.getters['authenticate/getUserData'];
		},
	},
	data: () => ({
		formData: {
			merchID: '',
			branchID: '',
			deliveryfee: []
		},
		deliveryFeeData: [{
			startdistance: '',
			enddistance: '',
			minweight: '',
			maxweight: '',
			amount: 0,
			flatfee: 0,
			deliverymethod: '',
			merchID: '',
			branchID: '',
			deliverytype: '',
			isdistancebased: false,
			isweightbased: false,
			isflatbased: false,
			amountDiv: true,
			flatFeeDiv: false
		}],
		deliveryFee: [],
		courierOptions: [
			{id: 'pool', text: 'Pool'},
			{id: 'express', text: 'Express'}
		],
		options: [
			{id: 'isdistancebased', text: 'Distance based'},
			{id: 'isflatbased', text: 'Flat rate based'}
		],
		branch: ''
	}),
	methods: {
		creatDeliveryFee() {
			// console.log(this.input)
		  this.formData.deliveryfee = this.deliveryFeeData

		  if(!this.isCourierService) {
				this.formData.deliveryfee.deliverymethod = ''
			}
		  //validate entry
			$('#submitBtn').attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('branches/saveDeliveryFee', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Create delivery fee(s)')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.clearForm()
						this.$router.push('/branch')
						return
					}
					
					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Create delivery fee(s)')
					console.log(err)
				})
		},
		mySelectEvent({id, text}, index) {
		  this.deliveryFeeData[index].merchID = this.formData.merchID
		  this.deliveryFeeData[index].branchID = this.formData.branchID
			if(id === 'isdistancebased') {
				this.deliveryFeeData[index].isdistancebased = true
				this.deliveryFeeData[index].isweightbased = false
				this.deliveryFeeData[index].isflatbased = false
				this.deliveryFeeData[index].amountDiv = true
				this.deliveryFeeData[index].flatFeeDiv = false
			}else if(id === 'isweightbased'){
				this.deliveryFeeData[index].isdistancebased = false
				this.deliveryFeeData[index].isweightbased = true
				this.deliveryFeeData[index].isflatbased = false
				this.deliveryFeeData[index].amountDiv = true
				this.deliveryFeeData[index].flatFeeDiv = false
			}else {
				this.deliveryFeeData[index].isdistancebased = false
				this.deliveryFeeData[index].isweightbased = false
				this.deliveryFeeData[index].isflatbased = true
				this.deliveryFeeData[index].amountDiv = false
				this.deliveryFeeData[index].flatFeeDiv = true
			}
			// console.log(this.deliveryFeeData[index]);
		},
		removeChild (index) {
			this.deliveryFeeData.splice(index, 1)
		},
		addChild () {
			this.deliveryFeeData.push({
				startdistance: '',
				enddistance: '',
				minweight: '',
				maxweight: '',
				amount: 0,
				flatfee: 0,
				deliverymethod: '',
				merchID: '',
				branchID: '',
				isdistancebased: false,
				isweightbased: false,
				isflatbased: false,
				amountDiv: true,
				flatFeeDiv: false
			})
		},
		cancelDelivery() {
		  this.$router.push('/branch');
		},
		clearForm() {
			this.deliveryFeeData = [{
				startdistance: '',
				enddistance: '',
				minweight: '',
				maxweight: '',
				amount: 0,
				flatfee: 0,
				merchID: '',
				deliverymethod: '',
				branchID: '',
				deliverytype: '',
				isdistancebased: false,
				isweightbased: false,
				isflatbased: false,
				amountDiv: true,
				flatFeeDiv: false
			}]
			this.deliveryFee = []
		},
		setData() {
		  this.branch = JSON.parse(localStorage.getItem('branch'))
			this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
			this.formData.branchID = this.branch.id
		}
	},
	mounted() {
		this.setData()
	}
}

</script>
<style>

button{
	font-size: medium;
}

.btn--danger{
   background-color: #dc3545;
   color: #fff;
}
</style>