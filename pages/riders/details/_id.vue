<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/riders" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
    </div>

    <div id="parent-component">
      
      <div id="rider-cash" uk-modal data-uk-modal="{target:'#rider-cash',bgclose:false}" container="#parent-component">

         <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Rider's Cash Remittance</h2>
            <!-- <p>Add rider name, description and necessary information from here</p> -->
          </div>
          <form>
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Rider's cash remittance amount</span>
                  <div class="form-input__input">
                    <input type="text" placeholder="Enter amount" v-model="amount" @keyup="formatInput" @focus="errorData=false">
                  </div>
                  <span v-if="errorData" class="form-input__error-msg">Amount field is required</span>
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="closeRiderCash" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="createBtn" class="btn btn--primary ml-1" @click.prevent="makeRiderPayment('ridercashremittance')">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="rider-amount" uk-modal data-uk-modal="{target:'#rider-amount',bgclose:false}" container="#parent-component">

         <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Amount Due to Rider</h2>
            <!-- <p>Add rider name, description and necessary information from here</p> -->
          </div>
          <form>
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label"></span>
                  <div class="form-input__input">
                    <input type="text" placeholder="Enter amount" v-model="amount" @keyup="formatInput" @focus="errorData=false">
                  </div>
                  <span v-if="errorData" class="form-input__error-msg">Amount field is required</span>
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="closeRiderAmount" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="amountBtn" class="btn btn--primary ml-1" @click.prevent="makeRiderPayment('ntisapayment')">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <div class="inner-main-wrapper">
      <div class="flex-width-4 j-c-sb" v-if="loading">
        Loading....please wait
      </div>
      <div class="flex-width-4 j-c-sb" v-if="!loading">
        <div class="width-1-4">
          <div class="box-deco-bg">
            <div class="d-flx-r-md">
              <div class="user">
                <div>
                  <img v-if="photo === '' || photo === null" src="/default_image.png" alt="">
                  <img v-else :src="photo" alt="">
                </div>
                <h2 class="user__name">{{ riderData.riderfirstname }} {{ riderData.riderlastname }}</h2>
                <div class="user__rating">
                  <div :class="'user__rating--level level'+removeFloat(riderData.rate__avg)">
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                  </div>
                  <span class="user__rating--score">{{ removeFloat(riderData.rate__avg) }}</span>
                  <!-- <span class="user__rating--reviews">(0 reviews)</span> -->
                </div>
                <div v-if="riderData.riderstatus =='online'" class="user__status status engaged" style="margin-bottom: 10px">

                  Online
                </div>
                <div v-else-if="riderData.riderstatus =='offline'" class="user__status status offline" style="margin-bottom: 10px">

                  Offline
                </div>
                <div v-else class="user__status status offline">
                  Unavailable
                </div>
                
              </div>
              <div class="user-details">
                <p>
                  <span style="font-weight: 600">Reg. Number</span>
                  <span class="co-rich-black">{{ riderData.registrationnumber }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Phone</span>
                  <span class="co-rich-black">{{ riderData.riderphonenumber }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Branch</span>
                  <span class="co-rich-black">{{ riderData.branchname }}</span>
                </p>
                <!-- <p>
                  <span>Vehicle type</span>
                  <span class="co-rich-black">{{ riderData.vehicletype }}</span>
                </p> -->
                
              </div>
            </div>
          </div>
          <div style="margin-top: 20px">
            <Map :center="track" :zoom="zoom">
              <template slot-scope="{map}">
                <map-marker :map="map" :position="track"> </map-marker>
              </template>
            </Map>
            </div>
          <!-- </div> -->
        </div>
        <div class="width-3-4">
          <ul class="card-list none ml-mt-1 flex-width-1-4wgr">
             <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <div>
                  <h3>
                    Total Earnings from Inception
                  </h3>
                </div>
                <!-- <svg>
                  <use href="/uploads/icons.svg#wallet"></use>
                </svg> -->
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.ridertotalearning)}}</p>

              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <h3>
                  Earnings from Month to Date
                </h3>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.ridercurrentmonthearning) }}</p>
              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen; cursor:pointer" @click="riderCash" title="click here to update rider's cash remittance"> 
              <div class="card-item__header">
                <div>
                  <h3>
                    Amount Due to Ntisa
                  </h3>
                </div>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.amountduetonitsa)}}</p>

              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen; cursor:pointer" title="click here to clear amount due to rider" @click="riderAmount">
              <div class="card-item__header">
                <h3>
                  Amount Due to Rider
                </h3>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.totalridercashcommission) }}</p>
              </div>
            </li>
            
          </ul>
          <!-- <ul class="card-list none ml-mt-1 flex-width-1-2wgr">
             <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <div>
                  <h3>
                    Amount Due to Ntisa
                  </h3>
                </div>
                <svg>
                  <use href="/uploads/icons.svg#wallet"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.amountduetonitsa)}}</p>

              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <h3>
                  Amount Due to Rider
                </h3>
                <svg>
                  <use href="/uploads/icons.svg#rider"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(riderData.totalridercashcommission) }}</p>
              </div>
            </li>
        </ul> -->
          <div>
            <div class="d-flx-alc-jsb table-title">
              <h3 class="section-title">Deliveries</h3>
              <nuxt-link to="/orders/" class="co-rich-black">View all</nuxt-link>
            </div>
            <overlay-scrollbars class="table-wrapper no-deco">
              <figcaption class="sr">
                A table showing information of categories
              </figcaption>
              <table class="table-content large-content">
                <thead class="">
                  <tr>
                    <!-- <th></th> -->
                    <th class="large-space column-name">Customer Name</th>
                    <th class="column-name">Contact</th>
                    <th class="column-name">Order ID</th>
                    <th class="column-name">Amount (N)</th>
                    <th class="column-name">Branch</th>
                    <!-- <th class="large-space">Rider</th> -->
                    <th class="column-name">Status</th>
                    <th class="column-name">Order Time</th>
                    <!-- <th></th> -->
                  </tr>
                </thead>
                <tbody class="tablebody">
                  <tr v-if="riderData.orderdetails.length < 1">
                    <td colspan="10">No order details for this rider</td>
                  </tr>
                  <tr v-if="riderData.orderdetails.length > 0" v-for="order in riderData.orderdetails" :key="order.id">
                    <!-- <td>
                      <div class="d-flx-alc-jc">
                        <label class="input-check">
                          <input class="uk-checkbox" type="checkbox">
                        </label>
                      </div>
                    </td> -->
                    <td class="column-name">
                      
                        <!-- <img v-if="order.profilelink === '' || order.profilelink === null || order.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
                        <img v-else-if="order.profilelink.includes('http://') && order.profilelink.includes('https://')" :src="order.profilelink.replace('http://68.65.121.57:8080/', '')"  alt="">
                        <img v-else :src="order.profilelink"  alt=""> -->
                        <span v-if="order.firstname && order.lastname">{{ order.firstname }} {{ order.lastname }}</span>
                        <span v-else>N/A</span>
                     
                    </td>
                    <td class="column-name">{{ order.phonenumber ? order.phonenumber : 'N/A' }}</td>
                    <td class="column-name" style="color: #28A745;">{{ order.ordercode }}</td>
                    <td class="column-name">{{ formatPrice(order.ordertotal) }}</td>
                    <td class="column-name">{{order.branchname}}</td>
                    <!-- <td class="avatar-wtext">
                      <img v-if="order.riderphoto === '' || order.riderphoto === null" src="/default_image.png" alt="">
                      <img v-else :src="order.riderphoto" alt="">
                      <span>{{ order.riderfirstname }} {{ order.riderlastname }}</span>
                    </td> -->
                    <td class="tx-c column-name">
                      <span :class="'status ' +(order.orderstatus !== undefined ?  order.orderstatus.toLowerCase() : '')">{{ order.orderstatus.includes('cancel') ? 'CANCELLED' : order.orderstatus.replace('_', ' ').toUpperCase()}}</span>
                    </td>
                    <td class="column-name">{{$moment(order.created_at).format('Do, MMM YY')}}</td>
                    <!-- <td>
                      <svg @click="viewOrderDetails(order)">
                        <use xlink:href="/uploads/icons.svg#hover"></use>
                      </svg>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </overlay-scrollbars>

          </div>
        </div>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<style scoped>
@media only screen and (min-width: 1366px){
  li.box-deco-bg:hover{
  background:forestgreen;
}
  li.box-deco-bg:hover p, li.box-deco-bg:hover h3, li.box-deco-bg:hover p  span{
    color:#fff !important;
  }
  .flex-width-1-2wgr > * {
      width: 48%;
      margin-left: 0;
  }
  .flex-width-1-2wgr > * :nth-child(2) {
      width: 48%;
      margin-right: 0;
  }
  .user {
    padding: 0.75rem 2rem !important;
  }
  .user-details {
      padding: 0.75rem 2rem !important;
  }
  img{
    margin:0 auto
  }

  .user-details span{
    font-size: 14px
  }
}

</style>
<script>
import fb from "../../../plugins/firebase.js";
import Map from '../../../components/Map.vue'
import MapMarker from '../../../components/MapMarker.vue'

export default {
	components: { MapMarker, Map },
	layout: 'main',
	computed: {
    
		track: {
			set (val) {
				if(val == null){
					this.position = branchLocation
				}
				this.position = val
			},

			get () {
				if(this.position == null){
					return this.branchLocation
				}
        
				// console.log(this.position)
        
				return this.position
			}
		},
		engaged() {
			let len = this.riderData.orderdetails.length
      
			
			if(len > 0) {
				let status = this.riderData.orderdetails[len - 1].orderstatus
				return status != 'completed' && status != 'canceled'
			} else {
				return false
			}
		},
		status () {
			let len = this.riderData.orderdetails.length
			if(len > 0) {
				return this.riderData.orderdetails[len - 1].orderstatus
			} else {
				return 'not Engaged'
			}

		},
		rider() {
	    return this.$store.getters['riders/getRider']
		}
	},
	data: () => ({
    formData:{
        merchID: '',
        riderID:'',
        paymentmethod:'',
        amount: '',
        paymenttype:'',
        paymentdate:''
    },
    amount:'',
    errorData:false,
    t:{},
    rate: 2.00,
    photo: '',
		loading: true,
		riderData: {},
    zoom: 10,
    branches: [],
		branchLocation: {},
		position: null,
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
		}
	}),
	methods: {
		listenOnMap () {
      // console.log('isaw')
			let result;
			let len = this.riderData.orderdetails.length
			let vm  = this;
			
					if(this.riderData.latitude != null && this.riderData.longitude) {
						vm.track = {lat : Number(this.riderData.latitude) , lng : Number(this.riderData.longitude) };
            // console.log('track 1', vm.track)
						vm.zoom = 15
					} else {
				this.track = this.branchLocation
        // console.log('track 3', vm.track)
			}
        
		
		},
	  setRiderData() {
      this.riderData = JSON.parse(localStorage.getItem('driver'))
      let vm = this;
      this.photo = this.riderData.riderphoto !=null ? this.riderData.riderphoto : "N/A"
      let branch = this.branches.find( b => vm.riderData.branchID === b.id)
      // console.log(branch)
		  this.branchLocation = {lat: Number(branch.latitude !=null ? branch.latitude : ''), lng: Number(branch.longitude !=null ? branch.longitude:'')}
			this.listenOnMap()
			this.loading = false
		},
		riderCash() {
			$('#rider-cash').addClass('uk-open').show();
		},
		closeRiderCash() {
      this.amount = ''
      this.errorData =false
			$('#rider-cash').removeClass('uk-open').hide();
		},
    riderAmount() {
			$('#rider-amount').addClass('uk-open').show();
		},
		closeRiderAmount() {
      this.amount = ''
      this.errorData =false
			$('#rider-amount').removeClass('uk-open').hide();
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
    formatInput (){
        if(this.amount != ''){
          
          let num = this.amount.replace(/,/g, '');  //remove any currency format;
          this.formData.amount = Number(num) 

          if(num.substr(num.length - 1) == '.'){
            this.amount = num
          }
          else if(isNaN(num)){
            this.amount = ''
          }
          else{
            this.amount = parseFloat(this.amount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.amount == 'NaN'){
          this.amount = 0;
        } 
  },
    makeRiderPayment(payment) {
      if(this.amount == ''){
        this.errorData = true
        return
      }
      this.formatInput()
			this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
      this.formData.paymentdate = this.$moment(new Date()).format('YYYY-MM-DD')
      this.formData.riderID = this.rider.id
      if(payment == 'ridercashremittance'){
        this.formData.paymentmethod = 'cashpayment'
        this.formData.paymenttype = 'debit'
        $('#createBtn').attr('disabled', true).html('Submitting....please wait')
      }
      else{
        this.formData.paymentmethod = 'riderpayment'
        this.formData.paymenttype = 'credit'
        $('#amountBtn').attr('disabled', true).html('Submitting....please wait')
      }
			this.$store.dispatch('riders/riderPayment', this.formData)
				.then(res => {
           if(payment == 'ridercashremittance'){
             $('#createBtn').attr('disabled', false).html('Submit')
           }else{
             $('#amountBtn').attr('disabled', false).html('Submit')
           }
					if(res.data.status) {
						this.$toast.success(res.data.message)
             if(payment == 'ridercashremittance'){
               this.closeRiderCash()
             }else{
                this.closeRiderAmount()
             }
              this.amount = ''
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
           if(payment == 'ridercashremittance'){
             $('#createBtn').attr('disabled', false).html('Submit')
           }else{
             $('#amountBtn').attr('disabled', false).html('Submit')
           }
					console.log(e)
				})
	  },
	},
	mounted() {
    this.branches = JSON.parse(localStorage.getItem('branches'))
    
		// console.log('in rider details')
	  this.setRiderData()
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].riders.viewriders: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>
