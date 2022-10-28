<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
<!--        <div class="drop-down filter-drop">-->
<!--          <button class="filter-btn box-deco-smallr" type="button" >-->
<!--            <span class="mr-1">all branches</span>-->
<!--            <svg class="">-->
<!--              <use xlink:href="/uploads/icons.svg#drop"></use>-->
<!--            </svg>-->
<!--          </button>-->
<!--          <div class="drop-wrapper" data-drop-down>-->
<!--            <ul class="drop-lists">-->
<!--              <li class="drop-list-item">-->
<!--                All branches-->
<!--              </li>-->
<!--              <li class="drop-list-item">-->
<!--                eleko branch-->
<!--              </li>-->
<!--              <li class="drop-list-item">-->
<!--                lekki branch-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
        <button class="btn btn--primary" type="button" @click="displayCreateModal">
          + Create loyalty points
        </button>

        

        <div class="drop-down page-drop">
<!--          <button class="btn-text " type="button">-->
<!--            Showing <span> 1-20 </span> of <span> 48 </span>-->
<!--          </button>-->
<!--          <div class="drop-wrapper" data-drop-down>-->
<!--            <ul class="drop-lists">-->
<!--              <li class="drop-list-item">-->
<!--                Newest-->
<!--              </li>-->
<!--              <li class="drop-list-item">-->
<!--                Oldest-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>

        <div class="d-flx-alc">
<!--          <button class="btn btn-icon smallsvg">-->
<!--            <svg>-->
<!--              <use href="/uploads/icons.svg#arrow-right"></use>-->
<!--            </svg>-->
<!--          </button>-->
<!--          <button class="btn btn-icon smallsvg">-->
<!--            <svg>-->
<!--              <use href="/uploads/icons.svg#arrow-left"></use>-->
<!--            </svg>-->
<!--          </button>-->
        </div>
      </div>
    </div>

    <div id="parent-component">
      <div container="#parent-component" id="add-loyalty-rule"  uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeAddModal" uk-close></button>
            <div class="modal-header">
              <h2>Create Loyalty Points</h2>
              <p>Create milestones your customers should reach and give them a reward for reaching the milestone. </p>
            </div>
            <form @submit.prevent="saveLoyaltyRule">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty</span>
				<span class="font-14 co-lgray">Enter a name for the loyalty</span>
                <div class="form-input__input">
                  <input v-model="formData.loyaltyrule" type="text" required>
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              
            </div>
			<div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                <span class="form-input__label">Reward point(s) for Every</span>
                <div class="form-input__input">
                  <input v-model="formData.rewardpoint" type="number" required>
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Amount spent</span>
                <div class="form-input__input">
                  <input v-model="formData.amountspent" type="number" required>
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>

              <!-- <label  class="form-input">
                <span class="form-input__label">Status</span>
                <div class="form-input__input">
                  <Select2 v-model="formData.status" :options="options" />
                </div>
              </label> -->
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="formData.startdate" type="date" required>
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="formData.endate" type="date" required>
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeAddModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Create loyalty points
              </button>
            </div>
          <!-- </div> -->
        </form>
          </div>
        </div>

		<div container="#parent-component" id="edit-loyalty-rule" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEditModal" uk-close></button>
        <div class="modal-header">
          <h2>Update Loyalty</h2>
          <p>Update Loyalty Points details.</p>
        </div>
        <form @submit.prevent="updateLoyaltyRule">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty</span>
				<span class="font-14 co-lgray">Update Loyalty Name</span>
                <div class="form-input__input">
                  <input v-model="editData.loyaltyrule" type="text" required>
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              
            </div>
            <div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                <span class="form-input__label">Reward point(s) for every </span>
                <div class="form-input__input">
                  <input v-model="editData.rewardpoint" type="number" required>
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>

			  <label  class="form-input">
                <span class="form-input__label">Amount Spent</span>
                <div class="form-input__input">
                  <input v-model="editData.amountspent" type="number" required>
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>
            </div>
			<div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="editData.startdate" type="date" required>
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="editData.endate" type="date" required>
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Status</span>
				<span class="font-14 co-lgray">Activate or Deactivate loyalty</span>
                <div class="form-input__input">
                  <select v-model="editData.status">
					  <option  v-if="status == 'True'" value="True">Reactivate</option>
					  <option v-for="(option, index) in options" v-if="status !== option.id" :key="index" :value="option.id">{{option.text}}</option>
				  </select>
                </div>
              </label>
            </div>
          </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEditModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                + Update loyalty rule
              </button>
            </div>
          <!-- </div> -->
        </form>
      </div>
    </div>
    </div>

    <div class="inner-main-wrapper">
      <ul v-if="loading">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              Loading...please wait
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="!loading && filteredList.length < 1">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              No loyalty point rule have been created
            </div>
          </div>
        </li>
      </ul>
      <ul class="loyalty-list grid mostly-4-fill" v-if="!loading && filteredList.length > 0">
        <li v-for="(row, ix) in filteredList" v-bind:key="ix">
          <a class="loyalty-card" @click.prevent="editLoyalty(row)">
            <div class="loyalty-card__body">
              <h3>
                {{ row.loyaltyrule }}
              </h3>
              <p>{{ formNumber(row.rewardpoint)}} points for every N{{formatPrice(row.amountspent)}} spent </p>
            </div>
            <div class="loyalty-card__foot">
              <!-- <div class="gcard-title">
                <p class="co-primary fw-medium">10 Redemptions</p>
              </div> -->

              <p class="d-flx-alc">
                <span v-if="checkDate(row.endate)" class="status no-radius ended">Ended</span>
                <span v-else-if="row.status == false" class="status no-radius ended">Inactive</span>
                <span v-else class="status no-radius active">Active</span>
                <svg>
                  <use xlink:href="/uploads/icons.svg#trophy"></use>
                </svg>
              </p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </overlay-scrollbars>
</template>

<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			if( this.search == ''){
				return this.rules
			} else {
				return this.rules.filter(reward => {
				// if (reward.loyaltyrule.toLowerCase().includes(this.search.toLowerCase())) {
					return reward.loyaltyrule.toLowerCase().includes(this.search.toLowerCase());
				// }
				// else if (reward.description.toLowerCase().includes(this.search.toLowerCase())) {
				// 	return reward.description.toLowerCase().includes(this.search.toLowerCase());
				// }
				// else {
				// 	return reward.rewardtask.toLowerCase().includes(this.search.toLowerCase());
				// }
				});
			}
		}
	},
	data: () => ({
		loading: true,
		search: '',
		status: '',
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
			{id: 'True', text: 'Activate'},
			{id: 'False', text: 'Deactivate'}
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
	// computed: {
	// 	isCourierService () { 
	// 		 return this.user.businessdescription.toLowerCase().includes('delivery')
	// 	},
	// },
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
		checkDate(date) {
			return this.$moment().isAfter(date);
		},
		editLoyalty(rule) {
			this.editData = {
				merchID: this.formData.merchID,
				loyaltyrule: rule.loyaltyrule,
				rewardpoint: rule.rewardpoint,
				amountspent: rule.amountspent,
				startdate: rule.startdate,
				endate: rule.endate,
				status: (rule.status === true) ? 'True' : 'False',
				id: rule.id
			}
			this.status = (rule.status === true) ? 'True' : 'False'
			UIkit.modal('#edit-loyalty-rule').toggle()
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listLoyaltyRule()
	}
}
</script>