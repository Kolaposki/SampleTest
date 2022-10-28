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
        <button class="btn btn--primary" type="button" @click="displayCreatePromoModal">
          + Create PromoCode
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
      <div container="#parent-component" id="add-promocode"  uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeAddPromoModal" uk-close></button>
            <div class="modal-header">
              <h2>Create Promocode</h2>
              <p>Promo Codes to be used on the POS</p>
            </div>
            <form @submit.prevent="savePromoCode">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Promocode Title</span>
                <div class="form-input__input">
                  <input v-model="promoData.title" type="text" required>
                </div>
                <span v-if="promoErrorData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
               <label  class="form-input">
                <span class="form-input__label">Code</span>
                <div class="form-input__input">
                  <input v-model="promoData.code" type="text" required disabled>
                </div>
              </label>
              
            </div>
            <div class="flex-width-1-2 less-gp">
             
              <label  class="form-input">
                <span class="form-input__label">Amount</span>
                <div class="form-input__input">
                  <input v-model="promoData.amount" min="0" onkeypress="return event.charCode >= 48" type="number" required>
                </div>
                <span v-if="promoErrorData.amount" class="form-input__error-msg">Please enter an amount</span>
              </label>

              <!-- <label  class="form-input">
                <span class="form-input__label">Status</span>
                <div class="form-input__input">
                  <Select2 v-model="promoData.status" :options="options" />
                </div>
              </label> -->
            </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeAddPromoModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Create Promocode
              </button>
            </div>
          <!-- </div> -->
        </form>
          </div>
        </div>

		<div container="#parent-component" id="edit-promocode" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEditPromoModal" uk-close></button>
        <div class="modal-header">
          <h2>Update Promocode</h2>
          <p>Update Promocode details.</p>
        </div>
        <form @submit.prevent="updatePromocode">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Promocode Title</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.title" type="text" required>
                </div>
                <span v-if="promoErrorData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
               <label  class="form-input">
                <span class="form-input__label">Code</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.code" type="text" required disabled>
                </div>
              </label>
              
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Amount</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.amount" min="0" onkeypress="return event.charCode >= 48" type="number" required>
                </div>
              </label>
            </div>
            <!-- <div class="flex-width-1-2 less-gp"> -->
              <label  class="form-input">
                <span class="form-input__label">Status</span>
				        <span class="font-14 co-lgray">Activate or Deactivate Promocode</span>
                <div class="form-input__input">
                  <select v-model="editPromoData.active">
                    <option  value="0">Deactivate</option>
                    <option  value="1">Activate</option>
                    <!-- <option v-for="(option, index) in options.filter(o => o.id != promocode.active)" :key="index" :value="option.id">{{option.text}}</option> -->
                  </select>
                </div>
              </label>
            <!-- </div> -->
          </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEditPromoModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                + Update Promocode
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
      <ul v-if="!loading && promoList.length < 1">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              No Promocodes have been created
            </div>
          </div>
        </li>
      </ul>
      <ul class="loyalty-list grid mostly-2" v-if="!loading && promoList.length > 0">
        <li v-for="(row, ix) in promoList" v-bind:key="ix">
          <a class="loyalty-card" @click.stop="toggleDropdown($event)">
            
            <div class="loyalty-card__body">
              <h3>
                {{ row.title }}
              </h3>
              <p>Code : {{ row.code}} </p>
            </div>
            
            <div class="drop-down org-drop drop-set">
              <div class="drop-wrapper" data-drop-down>
                <ul class="drop-lists">
                  <li class="drop-list-item">
                    <button class="btn btn-text" type="button" @click.prevent="copyLink(row.code)">
                      Copy Code
                    </button>
                  </li>
                  <li class="drop-list-item">
                    <button class="btn btn-text" type="button" @click.prevent="editLoyalty(row)">
                      Edit Details
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="loyalty-card__foot">
              <!-- <div class="gcard-title">
                <p class="co-primary fw-medium">10 Redemptions</p>
              </div> -->

              <p class="d-flx-alc">
                <!-- <span v-if="checkDate(row.endate)" class="status no-radius ended">Ended</span> -->
                <span v-if="row.active == false" class="status no-radius ended">Inactive</span>
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
		promoList () {
			if( this.search == ''){
				return this.promocodes
			} else {
				return this.promocodes.filter(promocode => {
					return promocode.code.toLowerCase().includes(this.search.toLowerCase()) || promocode.title.toLowerCase().includes(this.search.toLowerCase());
				});
			}
		}
	},
	data: () => ({
		loading: true,
		search: '',
		status: '',
		promoData: {
			merchID: '',
			code: '',
			amount: '',
			title: '',
			active: 1
    },
    promocode : {},
		options: [
			{id: 1, text: 'Activate'},
			{id: 0, text: 'Deactivate'}
    ],
		promoErrorData: {
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			endate: '',
		},
		editPromoData: {
			merchID: '',
			code: '',
			amount: '',
			title: '',
			active: ''
		},
		promocodes: []
	}),
	// computed: {
	// 	isCourierService () { 
	// 		 return this.user.businessdescription.toLowerCase().includes('delivery')
	// 	},
	// },
	methods: {
    copyLink(link) {
		  let vm = this
			this.$copyText(link).then(function (e) {
			  vm.$toast.success('Code copied to clipboard')
			}, function(e){
			  vm.$toast.error('An error occurred.Cannot copy.')
			})
		},
		savePromoCode() {
			
      let request = {
        url : '/promocode',
        method: 'post',
        params: {
          merchID : this.user.id,
        },
        data: this.promoData
      }
			
			$("#submitBtn").attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('api/makeAPICall', request)
				.then(res =>{
					$("#submitBtn").attr('disabled', false).html('+ Create Promocode')
					if(res.data.status === 'True') {
						this.$toast.success(res.data.message)
						this.closeAddPromoModal()
						this.listPromocodes()
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#submitBtn").attr('disabled', false).html('+ Create Promocode')
					this.$toast.error('An error occurred')
				})
		},
		updatePromocode() {
      $("#updateBtn").attr('disabled', true).html('Updating...please wait')
      this.editPromoData.active = Number(this.editPromoData.active) == 1 ? 1 : 0;
      let vm = this
      // if (Number(this.editPromoData.active) != 1) {
      //   delete this.editPromoData.active
      // }
      let request = {
        url : '/promocode',
        method: 'put',
        params: {
          merchID : this.user.id,
        },
        data: this.editPromoData
      }
			this.$store.dispatch('api/makeAPICall', request)
				.then(res =>{
					$("#updateBtn").attr('disabled', false).html('+ Update Promocode')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeEditPromoModal()
						this.listPromocodes()
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#updateBtn").attr('disabled', false).html('+ Update Promocode')
					this.$toast.error('An error occurred')
				})
		},
		closeAddPromoModal() {
		  this.clearErrorpromoData()
		  this.promoData.title = ''
			this.promoData.amount = ''
			this.promoData.code = ''
			this.promoData.merchID = this.user.id
			this.promoData.status = ''
			UIkit.modal('#add-promocode').toggle('hide')
		},
		closeEditPromoModal() {
		  this.editPromoData = {
				merchID: this.user.id,
				code: '',
				title: '',
				amount: '',
				status: ''
			}
			UIkit.modal('#edit-promocode').toggle('hide')
		},
		clearErrorpromoData() {
		  this.promoErrorData = {
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				endate: '',
				status: 'True'
			}
		},
		validatePromoAddRule() {
		  this.clearpromoErrorData()
      
		  if(this.promoData.loyaltyrule === ''){
		    this.promoErrorData.loyaltyrule = true
				return true
			}
		  
		  if(this.promoData.rewardpoint === ''){
		    this.promoErrorData.rewardpoint = true
				return true
			}
		  
		  if(this.promoData.amountspent === ''){
		    this.promoErrorData.amountspent = true
				return true
			}
		  
		  if(this.promoData.startdate === ''){
		    this.promoErrorData.startdate = true
				return true
			}
		  
		  if(this.promoData.endate === ''){
		    this.promoErrorData.endate = true
				return true
			}
		  
		  return false
		},
		listPromocodes() {
      let request = {
        url : '/promocode',
        method: 'get',
        params: {
          merchID : this.user.id,
        }
      }
			this.$store.dispatch('api/makeAPICall', request)
				.then((res) =>{
          this.loading = false
          // console.log(res)
					this.promocodes = res.data.data
				})
		},
		displayCreatePromoModal() {
      this.promoData.code = this.generateRefNumber(6).toUpperCase()
			UIkit.modal('#add-promocode').toggle()
		},
		checkDate(date) {
			return this.$moment().isAfter(date);
		},
		editLoyalty(promocode) {
      this.promocode = promocode
			this.editPromoData = {
				merchID: this.user.id,
				amount: promocode.amount,
				code: promocode.code,
				title: promocode.title,
				startdate: promocode.startdate,
				endate: promocode.endate,
				active: (promocode.active == true) ? 1 : 0,
				id: promocode.id
      }
      // this.editPromoData = Object.assign({}, promocode)
      // console.log(this.editPromoData)
			// this.status = 
			UIkit.modal('#edit-promocode').toggle()
		}
	},
	mounted() {
		this.promoData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listPromocodes()
	}
}
</script>