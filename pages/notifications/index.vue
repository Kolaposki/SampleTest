<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="searchs" type="text" @keyup.enter="searchReport"  placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down auth-drop">

        </div>
        <button class="btn btn--primary" type="button" @click="displayModal" v-if="(user.rolepermission ? user.rolepermission[0].notifications.sendnotifications:'') || isMerchant">
          <svg>
            <use xlink:href="/uploads/icons.svg#bell-btn"></use>
          </svg>
          <span class="ml-1">Send Notifications</span>
        </button>
      </div>
    </div>
    <pagination :headers="headers" ref="pagination" v-model="getData.page" @go="getAllCustomers" />

    <div id="parent-component">
      <div id="send-push-notification" uk-modal data-uk-modal="{target:'#send-push-notification',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeModal">X</button>
          <div class="modal-header">
            <h2> Notification message</h2>
            <p>Create notifications to be sent to your customers.</p>
          </div>
          <form @submit.prevent="submitNotification">
            <overlay-scrollbars class="modal-body" >
              <div  class="form-input">
                <label class="form-input__label">Notification Medium</label>
                <div class="form-input__input">
                  <select  v-model="formData.type" >
                    <option value="">Select a notification type</option>
                    <option value="push">Push Notifications</option>
                    <option value="email">SMS</option>
                    <option value="email">Email</option>

                  </select>
                </div>
                <span v-if="errorData.type" class="form-input__error-msg">Please enter a medium</span>
              </div>
              <label  class="form-input">
                <span class="form-input__label">Notification Subject</span>
                <div class="form-input__input">
                  <input type="text" required v-model="formData.title" placeholder="Buy 2 and get one free!">
                </div>
                <span v-if="errorData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
              <div  class="form-input">
                <label class="form-input__label">Notification body</label>
                <div class="form-input__input">
                  <textarea rows="5" v-model="formData.body" placeholder="Enter"></textarea>
                </div>
                <span v-if="errorData.body" class="form-input__error-msg">Please enter a message body</span>
              </div>
              <div class="form-input">
                <span class="form-input__label">Select customers</span>
                <div class="form-input__input">
                  <select2-multiple-control v-model="formData.id" :placeholder="'Select as least one customer'" :options="options" :settings="settings"/>
                </div>
                <span v-if="errorData.id" class="form-input__error-msg">Please select a customer</span>
              </div>              
              
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="closeModal" class="btn btn-no-fill uk-modal-close">
                Cancel
              </button>
              <button id="submitBtn" class="btn btn--primary ml-1" type="submit">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="customer-details" uk-modal data-uk-modal="{target:'#customer-details',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal review-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>
              Customer Details
              <span class="status delivered">Active</span>
            </h2>
          </div>
          <div class="modal-body p-3" uk-overflow-auto>
            <h3 class="uppercase co-grey fw-medium font-16 mb-2">Business information</h3>
            <div class="box-deco d-flx-alc-jc-fwp p-3">
              <div class="avatar avatar-80">
                <img src="/default_image.png" alt="">
              </div>
              <div class="flex-width-1-2 small-gap mt-5">
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    Customer’s Name
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">{{ customerDetails.firstname }} {{  customerDetails.lastname }}</p>
                </div>
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    Phone number
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">{{ customerDetails.phonenumber }}</p>
                </div>
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    Email Address
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">
                    {{ customerDetails.emailaddress }}
                  </p>
                </div>
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    Home Address
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">
                    N/A
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <h3 class="uppercase co-grey fw-medium font-16 mb-2">Purchase information</h3>
              <div class="flex-width-1-2 small-gap  p-3 box-deco">
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    No of Orders made
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">{{ formNumber(customerDetails.totalordermade) }}</p>
                </div>
                <div>
                  <h4 class="uppercase co-grey fw-normal font-16">
                    Total amount Spent
                  </h4>
                  <p class="fw-normal font-18 co-rich-black">₦ {{ formatPrice(customerDetails.totalamountspent) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flx-alc-jfe">
            <button class="btn btn-no-fill uk-modal-close">Cancel</button>
            <button class="btn btn-error ml-1" uk-toggle="target: #suspend-customer">
              <svg>
                <use xlink:href="/uploads/icons.svg#warning"></use>
              </svg>
              <span class="ml-h">suspend</span>
            </button>
            <!-- <button class="btn btn-no-fillalt ml-1" uk-toggle="target: #activate-customer">
                <svg>
                    <use xlink:href="/uploads/icons.svg#activate"></use>
                </svg>
                <span class="ml-h">Activate</span>
            </button> -->
            <a href="javascript:;" @click="transactionHistory(customerDetails)" class="btn btn--primary ml-1">View Transaction History</a>
          </div>
        </div>
      </div>
      <div id="suspend-customer" uk-modal data-uk-modal="{target:'#suspend-customer',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#suspend"></use>
            </svg>
            <div class="ml-1">
              <h2>Suspend Customer ?</h2>
              <p class="mt-1">You’re about to suspend<span class="fw-medium"> Kehinde Ademola</span>. If suspended, this customer will not be able to make any purchases on Ntisa.</p>
              <div class="my-1">
                <label  class="form-input">
                  <span class="form-input__label">Suspension Reason</span>
                  <div class="form-input__input">
                    <input type="text" placeholder="State your suspension reason here">
                  </div>
                </label>
              </div>
            </div>

          </div>

          <div class="d-flx-alc-jfe mt-3">
            <button class="btn btn-no-fill uk-modal-close">
              Cancel
            </button>
            <button class="btn btn-error ml-2">
              Suspend Customer
            </button>
          </div>
        </div>
      </div>
      <div id="activate-customer" uk-modal data-uk-modal="{target:'#activate-customer',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#confirm"></use>
            </svg>
            <div class="ml-1">
              <h2>Activate Customer?</h2>
              <p class="mt-2">You’re about to activate <span class="fw-medium"> Kehinde Ademola</span>.  This gives the customer access to Ntisa again</p>
            </div>
          </div>
          <div class="d-flx-alc-jfe mt-3">
            <button class="btn btn-no-fill uk-modal-close">
              Cancel
            </button>
            <button class="btn btn--primary ml-2">
              Activate Customer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of customers
        </figcaption>
        <table class="table-content ">
          <thead class="">
          <tr>

            <th  class="column-name">Customer Name</th>
            <th  class="column-name">Email address</th>
            <th  class="column-name">Phone Number</th>
            <th >Total Spent(₦)</th>
            <!-- <th>Total order made</th> -->
            <th  class="column-name">Signup Date</th>
            <!-- <th></th> -->
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && filteredList.length < 1">
            <td colspan="8">No customer details</td>
          </tr>
          <tr class="over" v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" :key="ix">

            <td @click="viewDetails(row)"  class="column-name">
              <div class="avatar-wtext">
                <!-- <img v-if="row.profilelink === '' || row.profilelink === null || row.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
                <img v-else-if="row.profilelink.includes('http://') && row.profilelink.includes('https://')" :src="row.profilelink.replace('http://68.65.121.57:8080/', '')" alt="">
                <img v-else :src="row.profilelink" alt=""> -->
                <span>{{ row.firstname }} {{ row.lastname }}</span>
              </div>
            </td>
            <td @click="viewDetails(row)" class="email column-name">{{ row.emailaddress }}</td>
            <td @click="viewDetails(row)"  class="column-name">{{ row.phonenumber }}</td>
            <td @click="viewDetails(row)"> {{ formatPrice(row.totalamountspent) }}</td>
            <!-- <td>{{ row.totalordermade }}</td> -->
            <td @click="viewDetails(row)"  class="column-name">{{ $moment(row.created_at).format('Do MMMM, YYYY') }}</td>
            <!-- <td class="d-flx-alc">
              <button class="btn btn-icon" @click="viewDetails(row)">
                <svg>
                  <use xlink:href="/uploads/icons.svg#page"></use>
                </svg>
              </button>
              <button class="btn btn-icon" @click="suspendAccount(row)" uk-toggle="target: #suspend-customer">
                <svg>
                  <use xlink:href="/uploads/icons.svg#warning"></use>
                </svg>
              </button>
            </td> -->
          </tr>
          </tbody>
        </table>
      </overlay-scrollbars>

    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
    searchs: {
       get() {
         return this.search
       }, 
       set (val) {
         this.search = val
       }
     },
		filteredList () {
			if(this.customers != undefined) {
        return this.customers
        // .filter(customer => {
				// 	if (customer.firstname.toLowerCase().includes(this.search.toLowerCase())) {
				// 		return customer.firstname.toLowerCase().includes(this.search.toLowerCase());
				// 	}else {
				// 		return customer.lastname.toLowerCase().includes(this.search.toLowerCase())
				// 	}
				// });
			} else {
        return []
      }
		}
	},
	data: () => ({
		search: '',
		loading: true,
    customers: [],
    customersList: [],
     
		customerDetails: {},
		formData: {
			id: [],
			title: "",
			body: "",
			type: "push"
    },
    getData : {
      id: 0,
      page: 1
    },
		errorData: {
			id: false,
			title: false,
			body: false
		},
		options: [
			{id: '', text: 'Select Customers'},
			{id: 'all', text: 'All Customers'}
		],
		settings: {
			width: '100%'
    },
    
		headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
		},
	}),
	methods: {
    searchReport(){
      this.getData.page = 1
      if(this.search){
        this.getData.search = this.search
        this.getSearch()
        return;
      }
    },
    getSearch() {
      this.loading = true
         this.$store.dispatch('customers/searchCustomer', this.getData).then(res => {
					if(res.data.status) {
            this.customers = res.data.data.data
						if (res.data.data.data != undefined && res.data.data.data.length > 0) {
              console.log('something')
              this.$refs.pagination.$forceUpdate()
              this.setHeaders(res.data.data.data, res.data.data)
              
						}
						this.loading = false
            return
          }
          });
    },
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			return nf.format(number);
			// return this.formNumber(number)
    },
    getCustomersUnpaginated(){
      this.$store.dispatch('customer/getCustomersAll', this.getData)
				.then(res => {
          if(res.data.status) {
            this.setCustomers(res.data.data)
          }
        });
    },
		getAllCustomers() {
      if(this.search) {
        this.getData.search = this.search
        this.getSearch()
        return;
      }
			this.$store.dispatch('customer/getCustomers', this.getData)
				.then(res => {
					if(res.data.status) {
						if (res.data.data.data != undefined && res.data.data.data.length > 0) {
							this.customers = res.data.data.data
							// this.setCustomers(this.customers)
							this.setHeaders(res.data.data.data, res.data.data)
						}
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred while retrieving data')
				})
		},
		setCustomers(customers) {
			let vm = this
			customers.forEach(function(e) {
				let data = {
					id: e.id,
					text: e.firstname + ' ' + e.lastname
				}
        vm.customersList.push(data)
				vm.options.push(data)
			})
		},
		submitNotification() {
			if(this.validateData()) {
				return
			}
			console.log(this.formData.id)
			let form = this.formData.id;
			if (form.includes('all')){
				form = [];
				this.customersList.forEach( (customer) => {
					form.push(customer.id)
				});
				console.log(form)
			}

			let result = form.map(function (x) {
				return parseInt(x, 10);
			});
      
			let resultFinal = Object.assign({}, this.formData);

			resultFinal.id = result

			$('#submitBtn').attr('disabled', true).html('Sending...Please wait')
			if(resultFinal.type === 'push'){
				resultFinal.url = '/API/pushnotification/';
			}
      
			
			this.$store.dispatch('customer/sendPushNotification', resultFinal)
				.then(res => {
					console.log(res)
					$('#submitBtn').attr('disabled', false).html('Send Notification')
					if(res.data.status) {
						this.$toast.success('notification sent')
						this.closeModal()
						return
					}

					this.$toast.error(res.data.message);
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('Send Notification')
					this.$toast.error('An error occurred')
				})
		},
		transactionHistory(details) {
			localStorage.removeItem('setDetails')
			UIkit.modal('#customer-details').toggle()
			this.$store.dispatch('customer/clearDetails')
			this.$store.dispatch('customer/setDetails', details)
			this.$router.push('/customers/transaction')
		},
		viewDetails(customer) {
			localStorage.removeItem('customer')
			this.$store.dispatch('customers/setCustomer', customer)
			this.$router.push('/customers/details/' + customer.id)
		},
		displayModal() {
			UIkit.modal('#send-push-notification').toggle()
		},
		closeModal() {
			this.clearData()
			UIkit.modal('#send-push-notification').toggle()
		},
		clearData() {
			this.formData = {
				id: [],
				title: "",
				body: "",
				type: "push",
			}
		},
		clearError() {
			this.errorData = {
				id: false,
				title: false,
				body: false,
				type: false
			}
		},
		validateData() {
			this.clearError()
			if(this.formData.id.length < 1) {
				this.errorData.id = true
				return true
			}

			if(this.formData.title === '') {
				this.errorData.title = true
				return true
			}

			if(this.formData.body === '') {
				this.errorData.body = true
				return true
			}

			if(this.formData.type === '') {
				this.errorData.type = true
				return true
			}

			return false
		},
		suspendAccount(row){
			UIkit.modal('#suspend-customer').toggle()
		}
	},
	mounted() {
    this.getData.id = this.user.role ? this.user.merchID : this.user.id
    // this.getData.merchID = this.user.role ? this.user.merchID : this.user.id
    // this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
    this.getAllCustomers()
    this.getCustomersUnpaginated()
	}
}
</script>
<style scoped>
table td {
  padding: 15px 10px;
}
</style>