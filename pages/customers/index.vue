<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <!-- <p class="fw-medium font-16"></p> -->
      <!-- <nuxt-link to="/reports" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link> -->
      <div class="" >
        <button class="btn btn--primary" type="button" @click="openModal">
          Add Customer
        </button>
      </div>
      <div class="search-filter d-flx-alc-jfe" >
        
        <label class="search-w-icon">
          <input v-model="search" type="text"  placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <!-- <div class="drop-down page-drop">
          <date-picker @change="getCustomerReport" v-model="date" range:placeholder="'Date Range'" type="datetime" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
				@close="handleRangeClose">
				<template v-slot:footer>
				<button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
					{{ showTimeRangePanel ? 'select date' : 'select time' }}
				</button>
 
   
				</template>
			</date-picker>
        </div> -->
        <download-excel
            id="download"
            class="btn btn--primary"
            :fetch="fetchData"
            :fields="json_fields"
            :before-generate="startDownload"
            :before-finish="finishDownload"
            worksheet="My Worksheet"
            name="customer-list-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>
    <pagination :headers="headers" ref="pagination" v-model="formData.page" @go="getCustomerReport" />

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper no-deco">
        
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <th class="large-space column-name">Name</th>
            <th class="large-space column-name">Phone Number</th>
            <th class="larger-space column-name">Email Address</th>
            <th class="medium-space">Transaction Value(₦)</th>
            <th class="medium-space">Total orders</th>
            <th class="small-space">Action</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && filteredList == [] ">
            <td colspan="8">No customer record have been added</td>
          </tr>
          <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix" style="cursor:pointer">
            <td @click="viewCustomerDetails(row)" class="column-name">{{ row.firstname }} {{ row.lastname }}</td>
            <td @click="viewCustomerDetails(row)"  class="column-name">{{ row.phonenumber }}</td>
            <td @click="viewCustomerDetails(row)" class="email column-name">{{ row.emailaddress }}</td>
            <td  @click="viewCustomerDetails(row)">{{ formatPrice(row.totalamountspent) }}</td>
            <td>{{ row.totalordermade }}</td>
            <td class="d-flx-alc">
              <button class="btn btn--primary" type="button" @click="editRecord(row)">
                Edit 
              </button>
              <!-- <button class="btn btn--danger" @click="deleteCustomer(row.id)" title="Delete" type="button">
                Delete 
              </button> -->
            </td>
          </tr>
          </tbody>
        </table>
          <div id="edit-customer" uk-modal container="#parent-component" >
            <div class="uk-modal-dialog uk-margin-auto-vertical modal">
              <button class="uk-modal-close-default" type="button" uk-close></button>
              <div class="modal-header">
                <h2>Edit Customer</h2>
                <p>Edit customer name, phone number and email</p>
              </div>
              <form @submit.prevent="updateCustomer">
                <overlay-scrollbars :class="'modal-body'" uk-overflow-auto>
                  <div class="flex-width-1-2 less-gp">
                    <label  class="form-input">
                      <span class="form-input__label">First name</span>
                      <div class="form-input__input">
                        <input v-model="updateData.firstname" type="text" placeholder="" required>
                      </div>
                      <!--<span v-if="errorUpdateData.firstname" class="form-input__error-msg">First name is mandatory</span>-->
                    </label>

                    <label  class="form-input">
                      <span class="form-input__label">Last name</span>
                      <div class="form-input__input">
                        <input v-model="updateData.lastname" type="text" placeholder="" required>
                      </div>
                      <!--<span v-if="errorUpdateData.lastname" class="form-input__error-msg">Last name is mandatory</span>-->
                    </label>

                    
                  </div> 
                  <div class="flex-width-1-1 less-gp">
                    <label  class="form-input">
                      <span class="form-input__label">Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                      <div class="form-input__input">
                        <input v-model="updateData.phonenumber" type="tel" placeholder="" pattern="^[0]\d{10}$" required>
                      </div>
                      <!--<span v-if="errorUpdateData.lastname" class="form-input__error-msg">Last name is mandatory</span>-->
                    </label>
                  </div>
                  <div class="flex-width-1-1 less-gp">
                    <label  class="form-input">
                      <span class="form-input__label">Email Address</span>
                      <div class="form-input__input">
                        <input v-model="updateData.emailaddress" type="email" placeholder="">
                      </div>
                      <!--<span v-if="errorUpdateData.lastname" class="form-input__error-msg">Last name is mandatory</span>-->
                    </label>
                  </div>                  
                <div class="d-flx-alc-jfe mt-3">
                  <button type="button" @click="cancelUpdate" class="btn btn-no-fill">
                    Cancel
                  </button>
                  <button type="submit" id="updateBtn" class="btn btn--primary ml-1">
                    Update Customer
                  </button>
                </div>
                </overlay-scrollbars>
              </form>
            </div>
          </div>
          <div id="delete-text" uk-modal data-uk-modal="{target:'#delete-text',bgclose:false}" container="#parent-component" >
            <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
              <button class="uk-modal-close-default" type="button" @click="cancelDelete">X</button>
              <div class="modal-header d-flx">
                <svg>
                  <use href="/uploads/icons.svg#co-delete"></use>
                </svg>
                <div class="ml-1">
                  <h2>Delete Customer?</h2>
                  <p>Please confirm you really want to delete this customer, this action cannot be undone.</p>
                </div>
              </div>
              <div class="modal-body">
                <div class="d-flx-alc-jc mt-3">
                  <button @click="cancelDelete" class="btn btn-no-fill">
                    Cancel
                  </button>
                  <button @click="doDeleteCustomer" id="deleteBtn" class="btn btn-error ml-2">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
      </overlay-scrollbars>
    </div>

    <div id="add-customer" uk-modal>

      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
        <div class="modal-header">
          <h2>Add Customers</h2>
          <p>Enter the details to create customers.</p>
        </div>
        <form class="mt-2" @submit.prevent="createCustomer">
		  	<!--<overlay-scrollbar>-->
          <div v-for="(input,i) in customerdata.customerdetails" :key="i">
            <div class="flex-width-1-2 less-gp">
              <label class="form-input">
                <span class="form-input__label">First Name</span>
                <div class="form-input__input">
                    <input v-model="input.firstname" type="text" required>
                </div>
              </label>
              <label class="form-input">
                  <span class="form-input__label"> Last Name</span>
                  <div class="form-input__input">
                  <input v-model="input.lastname" type="text" required>
                  </div>
              </label>
            </div>
            <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                  <div class="form-input__input">
                  <input v-model="input.phonenumber" type="tel" pattern="^[0]\d{10}$" required>
                  </div>
                </label>
               
            </div>
            <div class="flex-width-1-1 less-gp">
               <label class="form-input">
                  <span class="form-input__label">Email Address </span>
                  <div class="form-input__input">
                  <input v-model="input.emailaddress" type="email">
                  </div>
                </label>
            </div>

            <button @click="addNew(i)" 
              v-show="i == customerdata.customerdetails.length-1" 
              type="button" 
              class="btn btn--primary"
            >
             Add more
            </button>
            <button @click="remove(i)" v-show="i || ( !i && customerdata.customerdetails.length > 1)" type="button" class="btn btn--primary"> remove</button>        			
          </div>
				
			  <!--</overlay-scrollbar>-->
          <div class="d-flx-alc-jfe mt-5">
            <button type="button"  id="cancelBtn" class="btn btn-no-fill" @click="closeModal">
              Cancel
            </button>
            <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
              Create Customer
            </button>
          </div>
        </form>
      
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
		screenSize() {
			return screen.availWidth > 400
     },
    
    //  searchs: {
    //    get() {
    //      return this.search
    //    }, 
    //    set (val) {
    //      this.search = val      
        
    //    }
    //  },
    filteredList(){
       if (this.search == '') {
        return this.reports;
      } 
      else {
        return this.reports.filter((report) => {
          if (report.firstname != null && report.firstname.toLowerCase().includes(this.search.toLowerCase())) {
            return report.firstname.toLowerCase().includes(this.search.toLowerCase())
          }
          else if(report.lastname != null && report.lastname.toLowerCase().includes(this.search.toLowerCase())){
            return report.lastname.toLowerCase().includes(this.search.toLowerCase())
          }
        })
      }
      
    },
		
    
		json_fields () {
      let formatDate = this.$moment
      return  {
        "Customer Name" : {
              callback: (e) => {
                  return `${e.firstname} ${e.lastname}`;
              }
          },
        "Phone Number": "phonenumber",
        "Email": "emailaddress",
        "Total Order" :  "totalordermade",
        "Total Amount Spent": "totalamountspent",
        "Wallet Balance": "walletbalance",
        "Loyalty Points":"loyaltybalance",
      }
		},
	},
	data: () => ({
		loading: true,
		reports: [],
    search: '',
    api: 'usersreport/getCustomerReport',
		date: '',
		formData: {
			merchID: '',
			page: 1,
			startdate: '',
			enddate: ''
		},
    
    updateData:{

        id: '',
				firstname:'',
				merchID:'',
				lastname:'',
				phonenumber:'',
				emailaddress: ''

    },
    customerdata: {
      "merchID":"",
      customerdetails: [
          {
              "firstname": "",
              "lastname": "",
              "phonenumber": "",
              "emailaddress": "",
          },
      ],
		},
    deleteData:{
      id:''
    },
		headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
		},
		// totalamountspent
		
		// json_data: []
	}),
	methods: {
    deleteCustomer(customer) {
      // console.log(customer)
			this.deleteData.id = customer
			$('#delete-text').addClass('uk-open').show();
		},
    editRecord(customer) {
			this.updateData = {
	      id: customer.id,
				firstname: customer.firstname,
				lastname: customer.lastname,
				phonenumber:customer.phonenumber,
				emailaddress: customer.emailaddress
			}
			UIkit.modal('#edit-customer').toggle()
		},
    cancelUpdate() {
			this.updateData = {
				firstname: '',
				merchID: '',
				lastname: '',
				emailaddress: '',
				phonenumber: ''
			}
			UIkit.modal('#edit-customer').toggle('hide')
		},
    addNew(){
      let new_obj = {
              "firstname": "",
              "lastname": "",
              "phonenumber": "",
              "emailaddress": ""
            };    
      this.customerdata.customerdetails.push(new_obj)
      //this.discountdata.merchID=this.newID       
    },
    cancelDelete() {
			this.deleteData = {
				id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
    doDeleteCustomer() {
			$('#deleteBtn').attr('disabled', true).html('Deleting..please wait')
      // console.log(this.deleteData)
			this.$store.dispatch('customer/deleteCustomer', this.deleteData)
				.then(res =>{
					$('#deleteBtn').attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCustomerReport()
						this.cancelDelete()
						return
					}

					this.$toast.error('An error occurred and the operation was terminated')
				}).catch(err =>{
					this.$toast.error('An error occurred and the operation was terminated')
					$('#deleteBtn').attr('disabled', false).html('Delete')
					console.log(err)
				})
		},
    updateCustomer() {
			// if(this.passwordData.password !== '') {
			// 	this.updateData.riderpassword = this.passwordData.password
			// }
			$('#updateBtn').html('Updating Customer....please wait')
			$('#updateBtn').attr('disabled', true);
			this.$store.dispatch('customer/updateCustomer', this.updateData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update Customer')
					if(res.data.status) {
					  this.$toast.success(res.data.message)
						this.getCustomerReport()
						this.cancelUpdate()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					$('#updateBtn').attr('disabled', false).html('+ Update rider')
					console.log(e)
				})
		},
    remove(index) {
			this.customerdata.customerdetails.splice(index, 1)
		},
    closeModal() {
			UIkit.modal('#add-customer').toggle('hide')
		},
    openModal() {
			UIkit.modal('#add-customer').toggle()
		},
    createCustomer(){
      this.customerdata =this.customerdata.customerdetails
      var data = {
          "merchID":this.user.id,
          "customerdetails":this.customerdata
        };
      $('#submitBtn').attr('disabled', true).html('Saving....please wait')
        this.$store.dispatch('customer/saveCustomer',data)
          .then(res =>{
           $('#submitBtn').attr('disabled', false).html('+ Create Customer')
            if(res.data.status) {
              this.$toast.success(res.data.message)
              this.getCustomerReport()
              this.closeModal()
              //this.discountdata()
              this.$router.push('/customers')
              //location.reload()
              return
            }
					this.$toast.error(res.data.message)
				}).catch(err =>{
          //this.formData.merchID = this.user.id
					//$('#submitBtn').attr('disabled', false).html('+ Create Discount')
					console.log(err)
				})
    },
    searchReport(){
      this.formData.page = 1
      if(this.search){
        this.formData.search = this.search
        this.getSearch()
        return;
      }
    },
    getSearch() {
      this.loading = true
         this.$store.dispatch('customers/searchCustomer', this.formData)
				.then(res => {
					if(res.data.status) {
            this.reports = res.data.data
						if (res.data.data != undefined && res.data.data.length > 0) {
              // console.log('something')
              this.$refs.pagination.$forceUpdate()
              this.setHeaders(res.data.data, res)
              
						}
						this.loading = false
            return
          }
          });
    },
		nextData() {
			if(this.headers.Next === "") {
				return
			}
			let page = +this.formData.page + +1

			this.formData.page = page
			this.getCustomerReport()
		},
		previousData() {
			if(this.headers.Prev === "") {
				return
			}
			let page = +this.formData.page - +1
			if(page < 0) {
				this.formData.page = 1
				return
			}
			this.formData.page = page
			this.getCustomerReport()
		},
		getCustomerReport() {
      if(this.search){
        this.formData.search = this.search
        this.getSearch()
        return;
      }
			this.loading = true

			// console.log(this.date[0])
			if(this.date !== '' && this.date[0]  != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
      }
      
      this.formData.export = ''
			this.$store.dispatch('usersreport/getCustomerReport', this.formData)
				.then(res => {
					if(res.data.status) {
						this.reports = res.data.data.data

						if (res.data.data.data != undefined && res.data.data.data.length > 0) {
							this.setHeaders(res.data.data.data, res.data.data)
						}
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
		},
		sortCustomerReport() {
			this.loading = true

			if(this.date !== '' && this.date[0]  != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
      }
      
      this.formData.export = ''

			this.formData.page = 1

			this.$store.dispatch('usersreport/getCustomerReport', this.formData)
				.then(res =>{
					// console.log(res)
					if(res.data.status) {
						this.reports = res.data.data.data
						if (res.data.data.data != undefined && res.data.data.data.length > 0) {
							this.setHeaders(res.data.data.data, res.data.data)
						}
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
		},

		viewCustomerDetails(customer) {
			localStorage.removeItem('customer')
			this.$store.dispatch('customers/setCustomer', customer)
			this.$router.push('/customers/details/' + customer.id)
    },
    
	},
	mounted() {
    this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
    this.loading = true
    this.getCustomerReport()
		// console.log('in')
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].customer.viewcustomer: '')){
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
.btn--primary{
    background-color: #089628;
    color: #fff;
    min-width: 15px !important;
}
.btn--danger{
   background-color: #dc3545;
   color: #fff;
   min-width: 15px !important;
   left: 5px;
   position: relative;
}
.btn {
	 padding: 0.6rem 1.2rem;
}
</style>