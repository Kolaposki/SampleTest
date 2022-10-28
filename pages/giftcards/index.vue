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
        <button class="btn btn--primary" type="button" @click="displayModal">
          + Create gift card
        </button>

        <div id="add-gift-card" uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="cancelModal" uk-close></button>
            <div class="modal-header">
              <h2>Create Gift card</h2>
              <p>Create gift cards your customers can purchase and use on the Ntisa </p>
            </div>
            <form @submit.prevent="createCard">
              <overlay-scrollbars class="modal-body" uk-overflow-auto>
                <label  class="form-input">
                  <span class="form-input__label">Name</span>
                  <div class="form-input__input">
                    <input v-model="formData.name" type="text" placeholder="">
                  </div>
                  <span v-if="errorData.name" class="form-input__error-msg">Please enter a name</span>
                </label>

                <label  class="form-input">
                  <span class="form-input__label">Amount</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.amount" placeholder="">
                  </div>
                  <span v-if="errorData.amount" class="form-input__error-msg">Please enter an amount</span>
                </label>

                <div class="form-input">
                  <span class="form-input__label">Giftcard availability</span>
                  <span class="font-14 co-lgray">Can this Gift card be bought by anyone?</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.isavaliabletoall" value="1" name="availability">
                    <span class="design"></span>
                    <span class="text">Yes</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.isavaliabletoall" value="0" name="availability">
                    <span class="design"></span>
                    <span class="text">No</span>
                  </label>
                  <span v-if="errorData.isavaliabletoall" class="form-input__error-msg">Please select an option</span>
                </div>

                <label  class="form-input">
                  <span class="form-input__label">Expiring date</span>
                  <div class="form-input__input wsvg">
                    <input type="date" v-model="formData.voucher_date" placeholder="">
                    <svg class="">
                      <use xlink:href="/uploads/icons.svg/#calendar"></use>
                    </svg>
                  </div>
                  <span v-if="errorData.voucher_date" class="form-input__error-msg">Please select an expiry date</span>
                </label>

                <label  class="form-input">
                  <span class="form-input__label">Count</span>
                  <div class="form-input__input">
                    <input v-model="formData.count" type="text" placeholder="">
                  </div>
                  <span v-if="errorData.count" class="form-input__error-msg">Please enter a count</span>
                </label>
              </overlay-scrollbars>
              <div class="d-flx-alc-jfe mt-3">
                <button @click="cancelModal" type="button" class="btn btn-no-fill">
                  Cancel
                </button>
                <button type="submit" id="createBtn" class="btn btn--primary ml-1" >
                  + Create gift card
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="drop-down page-drop">
<!--          <button class="btn-text " type="button" >-->
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

    <div class="inner-main-wrapper">
      <ul class="gifts-list grid mostly-4">
        <li v-if="loading">
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              Loading...please wait
            </div>
          </div>
        </li>
        <li v-if="!loading && filteredList.length < 1">
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              No gift cards have been created
            </div>
          </div>
        </li>
        <li v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
          <div class="gifts-card">
            <div class="gifts-card__extra">
              <p>0 sold</p>
<!--              <button class="btn btn-icon" type="button" uk-toggle="target: #delete">-->
<!--                <svg>-->
<!--                  <use href="/uploads/icons.svg#delete"></use>-->
<!--                </svg>-->
<!--              </button>-->
            </div>

            <div class="gifts-card__title">
              <svg>
                <use xlink:href="/uploads/icons.svg#overlap"></use>
              </svg>
            </div>
            <nuxt-link :to="'/giftcards/details/' + row.id" class="gifts-card__foot">
              <div class="gcard-title">
                <h4>{{ row.cardname }}</h4>
                <p class="co-primary">₦ {{ formatPrice(row.amount) }}</p>
              </div>
              <svg >
                <use xlink:href="/uploads/icons.svg#lock"></use>
              </svg>
              <p class="expire">
                <span >Expires</span>
                <span>{{ $moment(row.expiration_date).format('MMM Do YY')}}</span>
              </p>
            </nuxt-link>
          </div>
        </li>
      </ul>

      <div id="delete" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete Category ?</h2>
              <p>Please confirm you really want to delete this category, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button class="btn btn-no-fill">
                Cancel
              </button>
              <button class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.cards.filter(card => {
				if (card.cardname.toLowerCase().includes(this.search.toLowerCase())) {
					return card.cardname.toLowerCase().includes(this.search.toLowerCase());
				}
				else {
					return card.serialnumber.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		search: '',
		loading: true,
		formData: {
			merchID: '',
			createdby: '',
			name: '',
			voucher_date: '',
			amount: '',
			count: '',
			isavaliabletoall: ''
		},
		errorData: {
			merchID: false,
			name: false,
			voucher_date: false,
			amount: false,
			count: false,
			isavaliabletoall: false
		},
		cards: []
	}),
	methods: {
	  createCard() {
	    let validator = this.validateData()
			if(validator) {
				return;
			}

			$('#createBtn').attr('disabled', true).html('Creating card(s)....please wait')
			this.formData.createdby = this.user.id
			if(this.formData.isavaliabletoall === '1') {
				this.formData.isavaliabletoall = true
			}else{
				this.formData.isavaliabletoall = false
			}
			this.formData.count = parseInt(this.formData.count)
			this.$store.dispatch('giftcards/createGiftCards', this.formData)
				.then(res =>{
					$('#createBtn').attr('disabled', true).html('+ Create gift card')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getGiftCards()
						this.cancelModal()
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(err =>{
					$('#createBtn').attr('disabled', true).html('+ Create gift card')
					console.log(err)
				})
		},
		cancelModal() {
	    this.resetValidatorError()
			this.formData = {
				createdby: '',
				name: '',
				voucher_date: '',
				amount: '',
				count: '',
				isavaliabletoall: ''
			}
	    UIkit.modal('#add-gift-card').toggle('hide')
		},
		displayModal() {
			UIkit.modal('#add-gift-card').toggle()
		},
	  validateData() {
	    this.resetValidatorError()
	    if(this.formData.name === '') {
	      this.errorData.name = true
				return true
			}

			if(this.formData.amount === '') {
				this.errorData.amount = true
				return true
			}

			if(!this.formData.isavaliabletoall) {
				this.errorData.isavaliabletoall = true
				return true
			}

			if(this.formData.voucher_date === '') {
				this.errorData.voucher_date = true
				return true
			}

			if(this.formData.count === '') {
				this.errorData.count = true
				return true
			}

			return false
		},
		resetValidatorError() {
	    this.errorData = {
				merchID: false,
				name: false,
				voucher_date: false,
				amount: false,
				count: false,
				isavaliabletoall: false
			}
		},
	  getGiftCards() {
	    this.$store.dispatch('giftcards/listGiftCards', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.cards = res.data.data
						this.loading = false
						return
					}
					
					this.loading = false
					this.$toast.error('An error occurred while retrieving data. Please try again')
				}).catch(err =>{
					console.log(err)
				})
		}
	},
	mounted() {
	   this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getGiftCards()
	}
}
</script>
