<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="tab d-flx-alc" >
      <button v-for='(tab, index) in tabs' :key="index" 
      :class="selectedTab == tab ? 'active':''" @click="setTab(tab)"> {{tab}}</button>
    </div>
    <div class="inner-main-wrapper" v-if="showLoyaltyRule">
     
    </div>
    <div class="inner-main-wrapper" v-if="showPromoCode">
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
            <th class="medium-space column-name">Total orders</th>
            <th class="large-space">Actionsssss</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <!-- <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && filteredList == [] ">
            <td colspan="8">No customer record have been added</td>
          </tr> -->
          <tr>
            <td class="column-name"></td>
            <td   class="column-name"></td>
            <td  class="email column-name"></td>
            <td ></td>
            <td class="column-name"></td>
            <td class="d-flx-alc">
              <button class="btn btn--primary" type="button" >
                Edit 
              </button>
              <button class="btn btn--danger" title="Delete" type="button">
                Delete 
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
    
   
  </overlay-scrollbars>
</template>
<style scoped>
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
		border: none;
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
    pickupGeoCode: {
      formatted_address: '',
      latitude: '',
      longitude: ''
    },
    showLoyaltyRule: true,
    showPromoCode: false,
    tabs: ['Loyalty', 'Promocode'],
    selectedTab: 'Loyalty',
    deliveryGeoCode: [],
		formData: {
			merchID:'',      
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
			{id: 'wallet', text: 'Wallet'},
      {id: 'cash', text: 'Cash'},
      {id: 'banktransfer', text: 'Bank Transfer'}
		],
    sources: [
			{id: 'cooperatesales', text: 'Cooperate Sales'},
			{id: 'callandwhatsapp', text: 'Call and Whatsapp'},
      {id: 'socialmedia', text: 'Social Media'}
		],
    scheduleValue: '',
    scheduletime: '',
    scheduleOrder: [
			{id: 'now', text: 'Now'},
			{id: 'scheduletime', text:'Scheduled'}
		],
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
    setTab(name) {
      this.selectedTab = name
      this.showLoyaltyRule = !this.showLoyaltyRule
      this.showPromoCode = !this.showPromoCode
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
            "paymentstatus": "PAID",
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
            "customerID":"",
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
    this.listBranches()		
	}
}
</script>
