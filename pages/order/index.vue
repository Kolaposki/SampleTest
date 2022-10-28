<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="tab d-flx-alc" >
      <nuxt-link to="/orders/" class="text-link" style="margin-right: 10px">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <div>
        <button v-for='(tab, index) in tabs' :key="index" 
      :class="selectedTab == tab ? 'active':''" @click="setTab(tab)">{{tab}}</button>
      </div>
    </div>
    <div id="delivery-form" class="inner-main-wrapper" v-if="showDeliveryForm">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <!-- <div class="d-flx-alc-jsb table-title" style="padding-right: 0">
            <h2 class="p-0 mr-0">Place Order</h2>
            <nuxt-link to="/orders/" class="btn btn-no-fill">Go back</nuxt-link>
          </div> -->
        <form class="mt-2 ml-2" @submit.prevent="placeorder">
        
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 20px">Order Information</h2>
        <hr>
          <div>
            <div class="flex-width-1-2 less-gp">
              <label class="form-input">
                  <span class="form-input__label">Delivery Type</span>
                  <div class="form-input__input">
                    <Select2 v-model="courierOptionValue" :placeholder="'Select delivery type'" :required="true" :options="courierOptions" />
                  </div>
                </label>
                <label class="form-input">
                <span class="form-input__label">Order Source</span>
                 <div class="form-input__input">
                   <Select2 v-model="source" :required="true" :placeholder="'Select order source'" :options="sources" />
                 </div>
              </label>
              <!-- <label class="form-input">
                <span class="form-input__label">I will like to</span>
                  <div class="form-input__input">
                     <Select2 v-model="courierSenderValue" :required="true" :options="courierSender" />
                  </div>
              </label> -->
            </div>
            <div class="flex-width-1-2 less-gp mb-3">
              <label class="form-input">
                  <span class="form-input__label">Branch</span>
                  <div class="form-input__input">
                      <Select2 v-model="branch" :required="true" :placeholder="'Select a branch'" :options="branches" />
                  </div>
                </label>
              <label class="form-input">
                <span class="form-input__label">Payment Method</span>
                 <div class="form-input__input">
                   <Select2 v-model="paymentMethodValue" :placeholder="'Select payment method'" :required="true" :options="paymentMethod" />
                 </div>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp mb-3">
              <label class="form-input">
                <span class="form-input__label">Customer(optional)</span>
                <div class="form-input__input">
                    <Select2 v-model="customer"  :placeholder="'Select a customer'" :options="customers" />
                </div>
              </label>
            </div>
            <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 20px">Pick-up Information</h2>
            <hr>

             <div class="flex-width-1-2 less-gp">
              <label class="form-input">
                <span class="form-input__label">Sender's Name</span>
                <div class="form-input__input">
                    <input v-model="sendersName" type="text" required>
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Sender's Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                <div class="form-input__input">
                    <input v-model="sendersNumber" @blur="validatePhonenumber(sendersNumber)" type="tel" required>
                </div>
              </label>
            </div>
            <div class="flex-width-1-1 less-gp">
              <label class="form-input">
                <span class="form-input__label"> Pick-Up Address</span>
                <div class="form-input__input">
                    <input id="map" v-model="sendersAddress" @change="getCoordinates(sendersAddress, 'sender')" type="text" required>
                </div>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Item Name</span>
                  <div class="form-input__input">
                      <input v-model="itemName" type="text" required>
                  </div>
                </label>
                <label class="form-input">
                  <span class="form-input__label">Item Quantity</span>
                  <div class="form-input__input">
                    <input v-model="itemQty" type="number" min="0" required>
                  </div>
                </label>              
              </div>
              <!-- <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Order Category</span>
                  <div class="form-input__input">
                    <Select2 v-model="orderCategoryValue" :required="true" :options="orderCategory" />
                  </div>
                </label>              
              </div> -->
              <div class="flex-width-1-2 less-gp mb-3">
                <label class="form-input">
                  <span class="form-input__label">Package Category</span>
                  <div class="form-input__input">
                    <Select2 v-model="packageCategoryValue" :placeholder="'Select package category'" :required="true" :options="packageCategory" />
                  </div>
                </label>
                <label class="form-input"></label>             
              </div>             
            
            <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 20px">Delivery Information</h2> 
            <hr>         
            <div v-for="(input,i) in delivery" :key="i">
              <div class="flex-width-1-2 less-gp mt-1">
              <label class="form-input">
                <span class="form-input__label">Receiver's Name</span>
                <div class="form-input__input">
                    <input type="text" v-model="input.receiversName" required>
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Receiver's Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                <div class="form-input__input">
                    <input type="tel" v-model="input.receiversNumber" @blur="validatePhonenumber(input.receiversNumber)" required>
                </div>
              </label>
            </div>
              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label"> Delivery Address</span>
                  <div class="form-input__input">
                      <input type="text" v-model="input.address" @change="getCoordinates(input.address, 'delivery', i)" required>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Landmark (Optional)</span>
                  <div class="form-input__input">
                      <input v-model="input.landmark" type="text">
                  </div>
                </label>
                <label class="form-input">
                  <span class="form-input__label">Delivery Note (Optional)</span>
                  <div class="form-input__input">
                      <input v-model="input.deliveryNote" type="text">
                  </div>
                </label>
              </div>              
              <div class="d-flx-alc">
                <button @click="addNew()" 
                v-show="i == delivery.length-1"
                type="button" 
                class="btn btn--primary mr-1"
                >
                Add another delivery location
                </button>
                <button @click="remove(i)" v-show="i || ( !i && delivery.length > 1)" type="button" class="btn btn--primary"> remove</button>  
              </div>
            </div>
            <hr class="mt-3">
            <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Delivery Time</span>
                  <!-- <div class="form-input__input">
                    <Select2 v-model="scheduleValue" :required="true" :options="scheduleOrder" />
                  </div> -->
                  <label class="form-input">
                    <label  style="display:flex; ">
                      <div class="form-input" style="display: flex">
                        <input @click="toggleDeliveryTime" type="checkbox" v-model="deliveryTime.now" class="checkbox" />
                        <p class="form_input__label ml-1 mr-2" style="font-size: 16px; margin-top: -5px">Now</p>
                      </div>
                      <div class="form-input" style="display: flex">
                        <input @click="toggleDeliveryTime" type="checkbox" v-model="deliveryTime.scheduled" class="checkbox" />
                        <p class="form_input__label ml-1" style="font-size: 16px: margin-top: -5px">Scheduled</p>
                      </div>
                    </label>
                  </label>
                </label>
                <label class="form-input" v-show="scheduleValue == 'scheduletime'">
                  <span class="form-input__label">Select Date</span>
                  <div class="form-input__input">
                    <input v-model="scheduletime" type="datetime-local"/>
                  </div>
                </label>              
              </div>
            <div class="d-flx-alc-jfe mt-5">
              <!-- <button type="button"  id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button> -->
              <nuxt-link to="/orders/" class="btn btn-no-fill">Cancel</nuxt-link>
              <button id="placeOrderBtn" type="submit" class="btn btn--primary ml-1">
                Submit
              </button>
            </div>
          </div>				
        </form>
        
        </section>
        <nuxt-link id="goBackToOrders" to="/orders/" class="btn btn--primary" hidden>Back</nuxt-link>
      </div>
    </div>

    <div id="food-form" class="inner-main-wrapper" v-if="showFoodForm">
      <div class="box-deco-bg p-3">
        <section class="setting-section">
          <!-- <div class="d-flx-alc-jsb table-title" style="padding-right: 0">
            <h2 class="p-0 mr-0">Place Order</h2>
            <nuxt-link to="/orders/" class="btn btn-no-fill">Go back</nuxt-link>
          </div> -->
        <form class="mt-2 ml-2" @submit.prevent="placeorder">
          <div>
            <div class="flex-width-1-2 less-gp">
              <label class="form-input">
                  <span class="form-input__label">Delivery Type</span>
                  <div class="form-input__input">
                    <Select2 v-model="courierOptionValue" :required="true" :options="courierOptions" />
                  </div>
                </label>
                <label class="form-input">
                <span class="form-input__label">Order Source</span>
                 <div class="form-input__input">
                   <Select2 v-model="source" :required="true" :options="sources" />
                 </div>
              </label>             
            </div>
            
            <div class="d-flx-alc-jfe mt-5">
              <!-- <button type="button"  id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button> -->
              <nuxt-link to="/orders/" class="btn btn-no-fill">Cancel</nuxt-link>
              <button id="placeOrderBtn" type="submit" class="btn btn--primary ml-1">
                Submit
              </button>
            </div>
          </div>				
        </form>
        
        </section>
        <nuxt-link id="goBackToOrders" to="/orders/" class="btn btn--primary" hidden>Back</nuxt-link>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<style scoped>
input.checkbox{
    height: 20px;
    width: 20px;
}
 input.checkbox:checked{
    
}
h1{
  font-size: 2em;
  font-weight: 600
}
.btn--primary{
    background-color: #089628;
    color: #fff;
    min-width: 10px !important;
}
.btn--danger{
   background-color: #dc3545;
   color: #fff;
   min-width: 10px !important;
   left: 5px;
   position: relative;
}
.btn {
	 padding: 0.6rem 1.2rem;
}

/* Style the tab */
	.tab {
		overflow: hidden;
		border: .5px solid rgb(238, 238, 238);
		background-color: white;
    padding-left: 2em
	}

	/* Style the buttons that are used to open the tab content */
	.tab button {
		background-color: inherit;
		float: left;
		border: 1px solid forestgreen;
		outline: none;
		cursor: pointer;
		padding: 18px 32px;
		font-weight: 600;
    margin-left: 1em
		/* transition: 0.3s; */
	}
	/* Change background color of buttons on hover */
	.tab button:hover {
		background-color: rgb(248, 248, 248);
		color: forestgreen;
		font-weight: 600
	}

	/* Create an active/current tablink class */
	.tab button.active {
		color: white;
		background-color: forestgreen;
	}

</style>
<script>
export default {
	layout: 'main',
	data: () => ({
		loading: true,
    customer:'',
    customers: [],
    deliveryTime: {
      now: true,
      scheduled: false
    },
    pickupGeoCode: {
      formatted_address: '',
      latitude: '',
      longitude: ''
    },
    showDeliveryForm: true,
    showFoodForm: false,
    tabs: ['Delivery', 'Food'],
    selectedTab: 'Delivery',
    deliveryGeoCode: [],
		formData: {
			merchID:'',      
    },
    getData:{
      id:'', 
      page:1
    },
    courierOptionValue: '',
    courierSenderValue: '',
    sendersName: '',
    sendersNumber: '',
    sendersAddress: '',
    itemName: '',
    itemQty: '',
    source: '',
    orderCategoryValue: '',
    orderCategory: [
      {id: 'Delivery', text: 'Delivery'},
			{id: 'Food', text: 'Food'},
    ],
    packageCategoryValue: '',
    delivery: [{
      receiversName: '',
      receiversNumber: '',      
      address: '',
      landmark: '',
      deliveryNote: '',    
    }],    
    payMethod: '',
    courierOptions: [
			{id: 'pool', text: 'Pool'},
			{id: 'express', text: 'Express'}
		],
    courierSender: [
			{id: 'sender', text: 'Send a package'},
			{id: 'receiver', text: 'Receive a package'},
      {id: 'third-party', text: 'Third Party'}
		],
    packageCategory: [
			{id: 'gadgets', text: 'Gadgets'},
			{id: 'food', text: 'Food'},
      {id: 'health', text: 'Health'},
      {id: 'products', text: 'Products'},
      {id: 'documents', text: 'Documents'},
      {id: 'others', text: 'Others'}
		],
    paymentMethodValue: '',
    paymentMethod: [
			{id: 'card', text: 'Card'},
      {id: 'cash', text: 'Cash'},
      {id: 'banktransfer', text: 'Bank Transfer'}
		],
    sources: [
			{id: 'cooperatesales', text: 'Cooperate Sales'},
			{id: 'callandwhatsapp', text: 'Call and Whatsapp'},
      {id: 'socialmedia', text: 'Social Media'}
		],
    scheduleValue: 'now',
    scheduletime: '',    
		branches: [],
    branch: '',
    errorData: {
      phoneNumber: false,
      sendersAddress: true,
      deliveryAddress: true
    } 
	}),
  computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
    getCustomers(){
      		this.$store.dispatch('customer/getCustomersAll', this.getData)
				.then(res => {
          if(res.data.status) {
            this.setCustomers(res.data.data)
          }
        });
    	},
		setCustomers(customers) {
			let vm = this
      let data = {
        id: 0,
        text: 'Select a customer'
      }        
      this.customers.push(data)
      // console.log(this.customers)
			customers.forEach(function(e) {
				let data = {
					id: e.id,
					text: e.firstname + ' ' + e.lastname
				}        
				vm.customers.push(data)
			})
		},
    setTab(name) {
      this.selectedTab = name
      if(name == 'Delivery'){
				this.showFoodForm = false
				this.showDeliveryForm = true
			}else{
				this.showFoodForm = true
				this.showDeliveryForm = false
			}
    },
    toggleDeliveryTime(){
      this.deliveryTime.scheduled = !this.deliveryTime.scheduled
      this.deliveryTime.now = !this.deliveryTime.now
      if(this.deliveryTime.scheduled){
        this.scheduleValue = 'scheduletime'
      }else{
        this.scheduleValue = 'now'
      }
      // console.log(this.scheduleValue)
    },
  getCoordinates(address, type, index) {
      const google = window.google
			let service = new google.maps.places.PlacesService(document.getElementById("map"));
			if(address != '') {
				const request = {
					query: address,
					fields: ["name", "geometry", "formatted_address"],
				};
				let vm = this;
        try{
          service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // console.log('Places found:')
              if(type == 'sender'){
                if(results[0].geometry.location.lng() && results[0].geometry.location.lat()){
                  vm.pickupGeoCode.longitude = results[0].geometry.location.lng()
                  vm.pickupGeoCode.latitude = results[0].geometry.location.lat()
                  vm.pickupGeoCode.formatted_address = results[0].formatted_address                
                  vm.$toast.success('Address coordinates found')
                }                
              }
              if(type == 'delivery'){
                vm.deliveryGeoCode[index] = {formatted_address: results[0].formatted_address, latitude: results[0].geometry.location.lat(), longitude: results[0].geometry.location.lng()}             
                vm.$toast.success('Address coordinates found')
              }
              // console.log(vm.deliveryGeoCode)
              return 
            } else {
              vm.$toast.error('Address cordinates not found. Please enter an address with street name, city and state')
              
              // console.log('Not found:')
              // console.log(results)
              return;
            }
          });
        } catch (error) {
          console.log(error)
        }
			}      
		},
    validatePhonenumber(number){
      var regExp = /^\d{11}$/
      if(!regExp.test(number)){
        this.$toast.error("Invalid phone number entered. It must be 11-digits")
        this.errorData.phoneNumber = true
      }else{
        this.errorData.phoneNumber = false
      }      
    },
    addNew(){
      let new_obj = {
        receiversName: '',
        receiversNumber: '',
        address: '',
        landmark: '',
        deliveryNote: '',
      };    
      this.delivery.push(new_obj)            
    },
    remove(index) {
			this.delivery.splice(index, 1)
      // console.log('delivery data: ', this.delivery)
		},
    placeorder(){
      $('#placeOrderBtn').attr('disabled', true).html('Submitting..please wait')
      var data;
      var delivery = [];
      this.deliveryGeoCode.forEach(geoCode => {
        if(geoCode.latitude && geoCode.longitude){
          this.errorData.deliveryAddress = false
          // console.log(geoCode.longitude)
        }
      })
      // console.log('delivery address error: ', this.errorData.deliveryAddress)

      if(this.pickupGeoCode.latitude && this.pickupGeoCode.longitude ){
        this.errorData.sendersAddress = false
      }else{
        this.errorData.sendersAddress = true
      }
      // console.log('pickup address error: ', this.errorData.sendersAddress)

      if(this.scheduletime == ''){
        this.scheduletime = "now"
      }

      if(!(this.errorData.phoneNumber) && !(this.errorData.deliveryAddress) && !(this.errorData.sendersAddress)){
        for(let index = 0; index < this.delivery.length; index++){
          delivery.push({
            "area": "none",
            "city": "none",
            "deliveryaddress": this.deliveryGeoCode[index].formatted_address,
            "deliverylatitude": this.deliveryGeoCode[index].latitude,
            "deliverylongitude": this.deliveryGeoCode[index].longitude,
            "landmark": this.delivery[index].landmark,
            "receivername": this.delivery[index].receiversName,
            "deliveryinstruction": this.delivery[index].deliveryNote,
            "receiverphonenumber": this.delivery[index].receiversNumber,
            "state": "none"
          })
        }
        data = {
            "ordercode": "",
            "ordertotal": 0,
            "merchID": this.formData.merchID,
            "branchID": Number(this.branch),
            "riderID": "",
            "deliverycharge": 0,
            "ETA": "",
            "orderstatus": "pending",
            "paymentstatus": (this.paymentMethodValue == "cash") ? "PENDING" : "PAID",
            "ordertype": '',
            "ordermethod": this.courierOptionValue,
            "ordercategory": "Delivery",
            "pickupaddress": this.pickupGeoCode.formatted_address,
            "sendername": this.sendersName,
            "senderphone": this.sendersNumber,
            "pickuplongitude": this.pickupGeoCode.longitude,
            "pickuplatitude": this.pickupGeoCode.latitude,
            "paymentreference":"",
            "paymentaccountname":"",
            "paymentaccountnumber":"",
            "deliveryinstruction": "",
            "itemname": this.itemName,
            "itemquantity": this.itemQty,
            "weight": "100",
            "discountpayment": "0.00",
            "vechicletype": "bike",
            "staffID": this.formData.merchID,
            "deliverylocation": delivery,
            "itemcategory": this.packageCategoryValue,
            "paymentmethod": this.paymentMethodValue,
            "source": this.source,
            "customerID": (this.customer == 0) ? '' : this.customer,
            "scheduletime": this.scheduletime
        }
        // console.log(data)
        this.$store.dispatch('order/placeOrder', data)
				.then(res => {
          if(res.status){
            $('#placeOrderBtn').attr('disabled', false).html('Submit')
            this.$toast.success('Submitted successfully')
            document.getElementById('goBackToOrders').click()
          }else{
            $('#placeOrderBtn').attr('disabled', false).html('Submit')
            this.$toast.error('An error occurred ' + res.message)
          }					
				}).catch(err =>{
					this.$toast.error('An error occurred ' + err)
				})      
      }else{
        this.$toast.error('Error found in detail(s) provided. Cross-check and try again')
        $('#placeOrderBtn').attr('disabled', false).html('Submit')
      }      
    },
    listBranches() {
	    this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res => {
          res.data.data.forEach(branch => {
              this.branches.push({id: branch.id, text: branch.branchname})
            })
          // console.log('branches: ', this.branches)
				}).catch(e =>{
					console.log(e)
				})
		},
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
    this.getData.id = this.user.role ? this.user.merchID : this.user.id
    this.listBranches()		
    this.getCustomers()
    
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].orders.placeorder: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>
