<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/staff" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
    </div>
    <div class="inner-main-wrapper" v-if="loading">
      <ul>
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
    </div>

    <div class="inner-main-wrapper" v-if="!loading">
      <div class="user-info-wrap">
        <img v-if="staffData.profilelink === '' || staffData.profilelink === null || staffData.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
        <img v-else-if="staffData.profilelink.includes('http://') && staffData.profilelink.includes('https://')" :src="staffData.profilelink.replace('http://68.65.121.57:8080/', '')"  alt="">
        <img v-else :src="staffData.profilelink"  alt="">
        <div class="staff-details-wrap">
          <!-- <div class="drop-down org-drop">
          <button class="btn btn-icon" type="button" @click="toggleDropdown($event)">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#more"></use>
            </svg>
          </button>
          <div class="drop-wrapper" data-drop-down>
            <ul class="drop-lists">
              <li class="drop-list-item">
                <button class="btn btn-text" type="button" @click="editStaff(staffData)">
                  Edit staff
                </button>
              </li>
            </ul>
          </div>
        </div> -->

          <h3 class="name">
            {{ staffData.firstname }}, {{ staffData.lastname }}
          </h3>
          <div class="user-details">
            <p>
              <span class="co-grey">Phone</span>
              <span class="co-rich-black">{{ staffData.phonenumber }}</span>
            </p>
            <p >
              <span class="co-grey">Email</span>
              <span class="co-rich-black">{{ !['administrator', 'business_owner'].includes(staffData.role) ? staffData.username : staffData.emailaddress }}</span>
            </p>
            <!-- v-if="staffData.role != 'business_owner'" -->
            <p >
              <span class="co-grey">Branch</span>
              <!-- <label class="form-input"> -->
                  <!-- <span class="form-input__label">Branch</span> -->
                  <!-- <div class="form-input__input"> -->
                    <select @change="getReport('branchID')" v-model="formData.branchID" class="filter-btn box-deco-smallr">
                      <option value="">-Select Branch-</option>
                      <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                        {{ branch.text }}
                      </option>
                    </select>
                  <!-- </div> -->
              <!-- </label> -->
              <!-- <span class="co-rich-black">{{  staffData.branchname }}</span> -->
            </p>
            <!-- v-if="!['administrator', 'business_owner'].includes(staffData.role)" -->
            <p >
              <span class="co-grey">Total Sales</span>
              <span class="co-rich-black">{{ headers.Count }}</span>
            </p>
          </div>
          <div class="role-wrap">
            <h3 class="font-16 fw-medium">
              Role
            </h3>
            <div class="drop-down staff-drop">
            <button v-if="staffData.role === 'store_attendant'" class="staff-btn btn-attendant" >
              <span>Store Attendant</span>
              <svg class="">
                <use xlink:href="/uploads/icons.svg#drop-alt"></use>
              </svg>
            </button>
            <button v-else-if="staffData.role === 'kitchen'" class="staff-btn btn-attendant" >
              <span>Kitchen Staff</span>
              <svg class="">
                <use xlink:href="/uploads/icons.svg#drop-alt"></use>
              </svg>
            </button>
            <button v-else-if="staffData.role === 'administrator'" class="staff-btn btn-admin">
              <span>Supervisor</span>
              <svg class="">
                <use xlink:href="/uploads/icons.svg#drop-alt"></use>
              </svg>
            </button>
            <button v-else-if="staffData.role === 'business_owner'" class="staff-btn btn-admin">
              <span>Business Owner</span>
              <svg class="">
                <use xlink:href="/uploads/icons.svg#drop-alt"></use>
              </svg>
            </button>
            <div class="drop-wrapper" data-drop-down>
              <h3 class="drop-title">Change user role</h3>
              <ul class="drop-lists staff-lists">
                <li class="drop-list-item">
                  <h4>Member</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </li>
                <li class="drop-list-item">
                  <h4>Supervisor</h4>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <div class="d-flx-alc-jsb page-extras table-title">
          <!-- <div class="d-flx-alc-jsb page-extras"> -->
            <!-- <nuxt-link to="/reports" class="text-link">
              <svg>
                <use href="/uploads/icons.svg#back"></use>
              </svg>
              <span class="ml-1 fw-bold co-grey">Back</span>
            </nuxt-link> -->
          
          <h3 class="section-title">Orders taken</h3>
          <!-- <nuxt-link to="/orders" class="co-rich-black">View all</nuxt-link> -->
          <div class="search-filter d-flx-alc-jfe">
            <div class="drop-down date-drop">
              <date-picker type="datetime" @change="getReport" v-model="date" range :placeholder="'Date Range'"  timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
				@close="handleRangeClose"
			>
				<template v-slot:footer>
				<button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
					{{ showTimeRangePanel ? 'select date' : 'select time' }}
				</button>
				</template>
			</date-picker>
            </div>
            <download-excel
              id="download"
              class="btn btn--primary"
              :fetch="fetchData"
              :fields="json_fields"
              :before-generate="startDownload"
              :before-finish="finishDownload"
              worksheet="My Worksheet"
              :name="staffData.lastname + '_' + staffData.firstname + '_sales_report.xls'"
            >
              Export
            </download-excel>
          </div>
        </div>
        <!-- <div class="d-flx-alc-jsb page-extras"> -->
          <pagination :headers="headers" v-model="formData.page" @go="getReport" />
        <!-- </div> -->
        <overlay-scrollbars class="table-wrapper no-deco">
          <figcaption class="sr">
            A table showing information of categories
          </figcaption>
          <table class="table-content hover-last-child-svg">
            <thead class="">
              <tr>
                <!-- <th></th> -->
                <th class="">Order ID</th>
                <th class="">Amount (N)</th>
                <th class="">Branch</th>
                <th class="large-space">Rider</th>
                <th class="">Status</th>
                <th class="">Order Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr v-if="staffData.customeorderhistory.length < 1">
                <td colspan="8">No record</td>
              </tr>
              <tr v-if="staffData.customeorderhistory.length > 0" v-for="order in staffData.customeorderhistory" :key="order.id" @click="orderDetails(order)">
                <!-- <td>
                  <div class="d-flx-alc-jc">
                    <label class="input-check">
                      <input class="uk-checkbox" type="checkbox">
                    </label>
                  </div>
                </td> -->
                <td style="color: #28A745;">{{ order.ordercode }}</td>
                <td>{{ formatPrice(order.ordertotal) }}</td>
                <td>{{ order.branchname }}</td>
                <td class="avatar-wtext">
                  <img v-if="order.riderphoto === '' || order.riderphoto === null" src="/default_image.png" alt="">
                  <img v-else :src="order.riderphoto" alt="">
                  <span>{{order.riderfirstname}} {{order.riderlastname}}</span>
                </td>
                <td class="tx-c">
                  <span :class="'status ' + order.orderstatus.toLowerCase()">{{ order.orderstatus.replace('_', ' ') }}</span>
                </td>
                <td>{{ $moment(order.created_at).format('Do MMM, YYYY')}}</td>
                <td>
                  <svg @click="orderDetails(order)">
                    <use xlink:href="/uploads/icons.svg#hover"></use>
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </overlay-scrollbars>
      </div>
    </div>

    <div id="order-details" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeOrderDetails">X</button>
        <div class="modal-header">
          <h2>
            Order Details
            <span :class="'status ' + orderDetailsData.orderstatus.toLowerCase()">{{ orderDetailsData.orderstatus.replace('_', ' ') }}</span>
          </h2>
          <p class="d-flx"> <span class="review">{{ orderDetailsData.orderid }}</span></p>
        </div>

        <div class="modal-body" uk-overflow-auto>
          <div class="d-flx-jsb">
            <div class="text-img order-modal">
              <img v-if="orderDetailsData.profilelink === '' || orderDetailsData.profilelink === null || orderDetailsData.profilelink === 'http://68.65.121.57:8080/'" class="text-img__img" src="/default_image.png" alt="">
                <img v-else-if="orderDetailsData.profilelink.includes('http://') && orderDetailsData.profilelink.includes('https://')" :src="orderDetailsData.profilelink.replace('http://68.65.121.57:8080/', '')" class="text-img__img" alt="">
                <img v-else :src="orderDetailsData.profilelink" class="text-img__img" alt="">
              <div class="text-img__content">
                <h4 class="uppercase co-grey fw-medium font-14">
                  Customer info
                </h4>
                <p class="fw-medium font-16 co-rich-black">{{ orderDetailsData.customername }}</p>
                <p class="font-16 co-rich-black">{{ orderDetailsData.customerphone }}</p>
              </div>
            </div>
            <div>
              <h4 class="uppercase co-grey fw-medium font-14">
                Delivery address
              </h4>
              <p class="width-80-pc co-rich-black">
                {{ orderDetailsData.deliveryaddress }}
              </p>
            </div>
          </div>
          <table class="table-content order-list">
            <tbody class="tablebody">
            <tr v-for="order in orderDetailsData.items" v-bind:key="order.id">
              <td>
                <div class="text-img alt">
                  <img class="text-img__img" :src="order.photo" alt="">
                  <div class="text-img__content">
                    <h3 class="fw-medium">
                      {{  order.productname }}
                    </h3>
                    <p>₦ {{ formatPrice(order.unitprice) }}</p>
                  </div>
                </div>
              </td>
              <td><span class="quantity">{{ formNumber(order.quantity) }}</span></td>
              <td > ₦ {{ formatPrice(order.totalprice) }}</td>
            </tr>
            <tr class="no-border-bottom">
              <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
              <td class="fw-medium co-lgray">₦ {{ formatPrice(calculateSubTotal(orderDetailsData.items)) }}</td>
            </tr>
            <tr class="no-border-bottom">
              <td colspan="2" class="co-lgray tx-r font-16">Delivery Fee</td>
              <td class="fw-medium co-lgray">₦ {{ formatPrice(orderDetailsData.deliverycharge) }}</td>
            </tr>
            <tr class="no-border-bottom">
              <td colspan="2" class="font-20 fw-bold tx-r">Total</td>
              <td class="font-20 fw-bold">₦ {{ formatPrice(calculateTotal(orderDetailsData.items)) }}</td>
            </tr>
            </tbody>
          </table>
          <div class="flex-width-1-2-nr mt-1">
            <div>
              <h3 class="mb-2 big-text">Assigned Rider</h3>
              <div class="text-img order-modal" v-if="orderDetailsData.rider.id !== null">
                <div class="img-wrap">
                  <img v-if="orderDetailsData.rider.photo === '' || orderDetailsData.rider.photo === null" class="text-img__img round" src="/default_image.png" alt="">
                  <img v-else class="text-img__img round" :src="orderDetailsData.rider.photo" alt="">
                  <p class="rating">
                    <span>0</span>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                  </p>
                </div>
                <div class="text-img__content">
                  <h4 class="name">
                    {{ orderDetailsData.rider.name }}
                  </h4>
                  <p>{{ orderDetailsData.rider.phone }}</p>
                  <p>{{orderDetailsData.rider.regnumber }}</p>
                </div>
              </div>
              <div class="text-img order-modal" v-else>
                <div class="img-wrap">
                  <img class="text-img__img round" src="/default_image.png" alt="">
                  <p class="rating">
                    <span>0</span>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                  </p>
                </div>
                <div class="text-img__content">
                  <h4 class="name">No rider assigned</h4>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="delete-text" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header d-flx">
          <svg>
            <use href="/uploads/icons.svg#co-delete"></use>
          </svg>
          <div class="ml-1">
            <h2>Delete staff ?</h2>
            <p>Please confirm you really want to delete this staff, this action cannot be undone.</p>
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

    <div id="edit-staff" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>Edit Staff Member</h2>
          <p>Edit/update staff name, description and necessary information from here</p>
        </div>
        <form @submit.prevent="updateStaff">
          <div class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">First name</span>
                <div class="form-input__input">
                  <input v-model="editData.firstname" type="text" placeholder="">
                </div>
                <span v-if="errorData.firstname" class="form-input__error-msg">First name is mandatory</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Last name</span>
                <div class="form-input__input">
                  <input v-model="editData.lastname" type="text" placeholder="">
                </div>
                <span v-if="errorData.lastname" class="form-input__error-msg">Last name is mandatory</span>
              </label>
            </div>

            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Date of birth</span>
                <div class="form-input__input">
                  <input v-model="editData.dob" type="date" >
                </div>
                <span v-if="errorData.dob" class="form-input__error-msg">Select a date of birth</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Avatar</span>
                <div class="form-input__input">
                  <input @change="handleUpdateImage" type="file" ref="file" accept="image/*" />
                </div>
              </label>
            </div>

            <label  class="form-input">
              <span class="form-input__label">Phone number</span>
              <div class="flex-width-uneven input-phone-flag">
                <div class="d-flx-alc flag-drop">
                  <img src="/uploads/flag.svg" alt="">
                  <p>+234</p>
                </div>
                <div class="form-input__input">
                  <input v-model="editData.phonenumber" type="text" placeholder="">
                </div>
              </div>
              <span v-if="errorData.phone" class="form-input__error-msg">Phone number is mandatory</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Email address</span>
              <div class="form-input__input">
                <input type="email" v-model="editData.emailaddress" placeholder="">
              </div>
              <span v-if="errorData.email" class="form-input__error-msg">Enter a valid email address</span>
            </label>

            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Password</span>
                <div class="form-input__input">
                  <input v-model="confirmPass.password" type="password" >
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Password confirmation</span>
                <div class="form-input__input">
                  <input v-model="confirmPass.confirmPassword"  type="password" />
                </div>
                <span v-if="confirmPass.confirmPasswordError" class="form-input__error-msg">{{ confirmPass.message}}</span>
              </label>
            </div>

            <div class="flex-width-1-2 less-gp">
              <div  class="form-input">
                <label class="form-input__label">User role</label>
                <div class="form-input__input">
                  <select v-model="editData.role" class="filter-btn box-deco-smallr">
                    <option value="">-Select User Role-</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">
                      {{ role.text }}
                    </option>
                  </select>
                </div>
                <span v-if="errorData.role" class="form-input__error-msg">User role is mandatory</span>
              </div>

              <div  class="form-input">
                <label class="form-input__label">Branch</label>
                <div class="form-input__input">
                  <select v-model="editData.branchID" class="filter-btn box-deco-smallr">
                    <option value="">-Select Branch-</option>
                    <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                      {{ branch.text }}
                    </option>
                  </select>
                </div>
                <span v-if="errorData.branch" class="form-input__error-msg">Branch is mandatory</span>
              </div>
            </div>

            <label  class="form-input">
              <span class="form-input__label">Gender</span>
              <div class="form-input__input">
                <select v-model="editData.gender" class="filter-btn box-deco-smallr">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <span v-if="errorData.gender" class="form-input__error-msg">Please select a gender</span>
            </label>
          </div>
          <div class="d-flx-alc-jfe mt-3">
            <button type="button" class="btn btn-no-fill" @click="resetEditData">
              Cancel
            </button>
            <button type="submit" id="updateBtn" class="btn btn--primary ml-1">
              Update staff
            </button>
          </div>
        </form>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../../components/Pagination.vue';
export default {
  layout: 'main',
  components: { Pagination },
	computed: {
		staff() {
	    return this.$store.getters['users/getStaff']
    },
    json_fields () {
			let vm = this;
			
			return  {
				"NAME" : {
					callback: (e) => {
						return `${e.firstname} ${e.lastname}`;
					}
				},
				"CONTACT": "phonenumber",
				"ORDER ID": "ordercode",
				"METHOD": "ordermethod",
				"AMOUNT" :  { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
				"BRANCH": { callback: (e) => e.branchname + ', ' + e.branchcity},
				"RIDER": { callback: (e) => e.riderfirstname + ' ' + e.riderlastname},
        "DATE": {callback: (e) => this.$moment(e.created_at).format('Do MMM, YYYY')},
        "ORDER ITEMS": {callback: (e) => e.orderitems.length > 0 ? e.orderitems.map(x => x.quantity + ' ' + x.productname).reduce((p, v) => p + ', ' + v) : ''}
			}
		},
	},
	data: () => ({
    loading: true,
    api : 'salesreport/getTotalSales',
    date: [],
		formData: {
			merchID: '',
			branchID: '',
			startdate: '',
      enddate: '',
      staffID: '',
			page: 1
    },
    headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1
		},
		confirmPass: {
			passwordError: false,
			message: '',
			password: '',
			confirmPassword: '',
			confirmPasswordError: false
		},
		errorData: {
			email: false,
			firstname: false,
			lastname: false,
			phone: false,
			password: false,
			gender: false,
			dob: false,
			branch: false,
			role: false,
			invalidEmail: false
		},
		staffData: {},
		orderDetailsData: {
			items: [],
			tax: 0,
			orderid: '',
			orderstatus: '',
			customername: '',
			customerphone: '',
			deliveryaddress: '',
			profilelink: '',
			deliverycharge: 0,
			rider: {
				id: '',
				phone: '',
				name: '',
				regnumber: ''
			},
			staff: {
				photo: '',
				name: '',
				phone: ''
			}
		},
		editData: {
			id: '',
			merchID: '',
			emailaddress: '',
			firstname: '',
			lastname: '',
			phonenumber: '',
			dob: '',
			branchID: '',
			gender: '',
			role: '',
			profilelink: '',
			title: ''
		},
		roles: [
			{id: 'store_attendant', text: 'Store Attendant'},
			{id: 'administrator', text: 'Supervisor'},
			{id: 'business_owner', text: 'Business Owner'}
		],
		branches: []
	}),
	methods: {
	  getStaff() {
      this.staffData = JSON.parse(localStorage.getItem('user_data'))
      this.formData.staffID = this.staffData.id
			this.staffData.customeorderhistory = [];
			this.getReport()			
    },
    getReport(param) {
      this.loading = true
      if (param != undefined && param == 'branchID'){
				this.formData.page = 1
			}

			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD HH:MM:SS')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD HH:MM:SS')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''

			this.$store.dispatch(this.api, this.formData)
				.then(res => {
					if(res.data.status) {

							vm.staffData.customeorderhistory = res.data.data
							this.setHeaders(res.data.data, res.data.headers)
						
						// console.log(result)
						

						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err => {
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
		},
		getCustomerOrderHistory () {
			let vm = this;
			this.$store.dispatch('users/staffOrderHistory', this.staffData)
				.then(res =>{
					if(res.data.data.status != false) {
						// console.log(res.data)
						vm.staffData.customeorderhistory = res.data.data.customeorderhistory
						this.loading = false
						return
					}
					this.$toast.error('An error occurred')
				}).catch(e =>{
					console.log(e)
				});

		},
		updateStaff() {
			//validate password
			this.resetErrorData()
			if(this.validateUpdateData()) {
				return;
			}
			
			if(this.confirmPass.password !== '') {
			  this.formData.userpassword = this.confirmPass.password
			}

			$('#updateBtn').attr('disabled', true).html('Updating staff....please wait')
			this.$store.dispatch('users/updateUser', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update Staff')
					if(res.data.status !== 'False') {
						this.$toast.success(res.data.message)
						this.resetEditData()
						this.$router.push('/staff')
						return
					}
					this.$toast.error('An error occurred')
				}).catch(e =>{
					$('#updateBtn').attr('disabled', false).html('+ Update Staff')
					console.log(e)
				})
		},
		resetEditData() {
			this.editData = {
				merchID: this.user.id,
				emailaddress: '',
				firstname: '',
				lastname: '',
				phonenumber: '',
				dob: '',
				branchID: '',
				role: '',
				profilelink: '',
				gender: ''
			};
			this.confirmPass = {
			  password: '',
				confirmPassword: ''
			}
			UIkit.modal('#edit-staff').toggle('hide')
		},
		handleUpdateImage(e) {
			let files = e.target.files
			if(!files.length)
				return
			this.createBase64ImageEdit(files[0])
		},
		createBase64ImageEdit(fileObject) {
			let reader = new FileReader()
			reader.onload = (e) => {
				this.editData.profilelink = e.target.result.split(',')[1]
			};
			reader.readAsDataURL(fileObject)
		},
		editStaff(user) {
			this.editData.id = user.id
			this.editData.merchID = user.merchID
			this.editData.emailaddress = user.username
			this.editData.firstname = user.firstname
			this.editData.lastname = user.lastname
			this.editData.phonenumber = user.phonenumber
			this.editData.dob = user.dob
			this.editData.branchID = user.branchID
			this.editData.role = user.role
			this.editData.profilelink = ''
			this.editData.gender = user.gender
			UIkit.modal('#edit-staff').toggle()
		},
		validateUpdateData() {
			if(this.editData.firstname === '') {
				this.errorData.firstname = true
				return true
			}
			if(this.editData.lastname === ''){
				this.errorData.lastname = true
				return true
			}
			if(this.editData.dob === '') {
				this.errorData.dob = true
				return true
			}
			if(this.editData.phonenumber === ''){
				this.errorData.phone = true
				return true
			}
			if(this.editData.emailaddress === ''){
				this.errorData.email = true
				return true
			}
			if(this.confirmPass.password !== '') {
				if(this.confirmPass.confirmPassword === '') {
					this.confirmPass.confirmPasswordError = true
					this.confirmPass.message = "Please enter a password confirmation"
					return true
				}
				if(this.confirmPass.password !== this.confirmPass.confirmPassword) {
					this.confirmPass.confirmPasswordError = true
					this.confirmPass.message = "Password confirmation does not match"
					return true
				}
			}
			if(this.editData.role === ''){
				this.errorData.role = true
				return true
			}
			if(this.editData.branchID === ''){
				this.errorData.branch = true
				return true
			}
			if(this.editData.gender === ''){
			  this.errorData.gender = true
				return true
			}

			return false
		},
		resetErrorData() {
			this.errorData = {
				email: false,
				firstname: false,
				lastname: false,
				phone: false,
				password: false,
				dob: false,
				branch: false,
				role: false,
				invalidEmail: false,
				gender: false
			}
			this.confirmPass.confirmPasswordError = false
		},
		orderDetails(order) {
			this.clearOrderDetails()
			this.orderDetailsData = {
				items: order.orderitems,
				orderid: order.ordercode,
				tax: 0,
				orderstatus: order.orderstatus.replace('_', ' '),
				customername: order.firstname + ' ' + order.lastname,
				customerphone: order.username,
				deliveryaddress: order.address,
				profilelink: order.profilelink,
				deliverycharge: order.deliverycharge,
				rider : {
					id: order.riderID,
					name: order.riderfirstname + ' ' + order.riderlastname,
					phone: order.riderphonenumber,
					regnumber: order.registrationnumber
				},
				staff: {
	        name: order.staffname,
					photo: order.staffpic,
					// phone: ''
				}
			}
			$('#order-details').addClass('uk-open').show();
		},
		clearOrderDetails() {
			this.orderDetailsData = {
				items: [],
				orderid: '',
				orderstatus: '',
				tax: 0,
				customername: '',
				customerphone: '',
				deliveryaddress: '',
				profilelink: '',
				deliverycharge: 0,
				rider: {
					id: '',
					phone: '',
					name: '',
					regnumber: ''
				},
				staff: {
					photo: '',
					name: '',
					phone: ''
				}
			}
		},
		calculateSubTotal(items) {
			let sum = 0
			items.forEach(function(value, index, array){
				sum += value.totalprice
			})
			return sum
		},
		closeOrderDetails() {
			this.clearOrderDetails()
			$('#order-details').removeClass('uk-open').hide();
		},
		calculateTotal(items) {
			let total = 0
			let sum = 0
			items.forEach(function(value, index, array){
				sum += value.totalprice
			})
			let tax = 0;
			if(this.orderDetailsData.tax > 0) {
				tax = (this.orderDetailsData.tax / 100) * sum
			}

			total = +sum + +tax + +this.orderDetailsData.deliverycharge;
			return total
		},
		getAllBranches() {
      let vm = this;
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					let theBranches = []
					res.data.data.forEach(function(e) {
						let data = {
							id: e.id,
							text: e.branchname
            }
            // console.log(vm.staffData.branchID)
            if (vm.staffData.branchID.includes(e.id)){
              theBranches.push(data)
            }
						
					})
					this.branches = theBranches
				}).catch(e =>{
					console.log(e)
				})
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getStaff()
		this.getAllBranches()
	}
}
</script>
