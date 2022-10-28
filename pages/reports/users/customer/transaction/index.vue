<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <a class="text-link" @click="viewCustomerDetails(histories)">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </a> |
      <span class="ml-1 fw-bold co-grey">
        {{ histories.firstname}} {{ histories.lastname}}'s Order History
      </span>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <download-excel
            id="download"
            class="btn btn--primary"
            :data="filteredList"
            :fields="json_fields"
            :before-generate="startDownload"
            :before-finish="finishDownload"
            worksheet="My Worksheet"
            :name="histories.firstname + '-' + histories.lastname + '-customer-report.xls'"
        >
          Export
        </download-excel>
<!--        <a href="/uploads/down.png" download class="btn btn&#45;&#45;primary">Export</a>-->
<!--        <div class="drop-down page-drop">-->
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
<!--        </div>-->
<!--        <div class="d-flx-alc">-->
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
<!--        </div>-->
      </div>
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content ">
          <thead class="">
          <tr>
<!--            <th></th>-->
            <th class="large-space">Customer</th>
            <th class="large-space">Mobile</th>
            <th class="medium-space">Order ID</th>
            <th class="small-space">Amount(₦)</th>
            <th class="large-space">Branch</th>
<!--            <th class="large-space">Rider</th>-->
            <th class="small-space">Status</th>
            <th class="medium-space">Order Time</th>
          </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="9">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="9">No record at the moment</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix" @click="orderDetails(row)">
<!--              <td>-->
<!--                <label class="input-check">-->
<!--                  <input class="uk-checkbox" type="checkbox">-->
<!--                </label>-->
<!--              </td>-->
              <td>
                {{ row.firstname }} {{ row.lastname }}
              </td>
              <td>{{ row.phonenumber }}</td>
              <td style="color: #28A745;">{{ row.ordercode }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td>
              <td>{{ row.branchname }},{{ row.branchcity }}</td>
<!--              <td class="avatar-wtext">-->
<!--                <span>{{ row.riderfirstname }} {{ row.riderlastname }}</span>-->
<!--              </td>-->
              <td class="tx-c">
                <span :class="'status ' + row.orderstatus.toLowerCase()">{{ row.orderstatus.replace('_', ' ') }}</span>
              </td>
              <td>{{ $moment(row.created_at).format('Do MMMM, YYYY') }}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>


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
                <td><span class="quantity">{{ order.quantity }}</span></td>
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
                <h3 class="mb-2 big-text">Responding Staff</h3>
                <div class="text-img order-modal" v-if="orderDetailsData.staff.name !== ''">
                  <img v-if="orderDetailsData.staff.photo === ''" class="text-img__img round" src="/default_image.png" alt="">
                  <img v-else class="text-img__img round" :src="orderDetailsData.staff.photo" alt="">
                  <div class="text-img__content">
                    <h4 class="name">
                      Staff Info
                    </h4>
                    <p>{{ orderDetailsData.staff.phone }}</p>
                    <p>{{ orderDetailsData.staff.name }}</p>
                  </div>
                </div>
                <div class="text-img order-modal" v-else>
                  <img class="text-img__img round" src="/default_image.png" alt="">
                  <div class="text-img__content">
                    <h4 class="name">
                      No staff info
                    </h4>
                  </div>
                </div>
              </div>
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
	  history() {
	    return JSON.parse(localStorage.getItem('orderHistory'))
		},
		filteredList () {
			return this.orderHistories.filter(history => {
				if(history.firstname.toLowerCase().includes(this.search.toLowerCase())) {
					return history.firstname.toLowerCase().includes(this.search.toLowerCase());
				} else if (history.lastname.toLowerCase().includes(this.search.toLowerCase())){
					return history.lastname.toLowerCase().includes(this.search.toLowerCase());
				} else {
					return history.branchname.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},
    json_fields () {
      let vm = this;
      let formatDate = this.$moment
			
			return  {
				"CUSTOMER NAME" : {
					callback: (e) => {
						return `${e.firstname} ${e.lastname}`;
					}
				},
        "CONTACT": "phonenumber",
        "BRANCH": { callback: (e) => e.branchname + ', ' + e.branchcity},
        "ORDER ID": "ordercode",
        "AMOUNT" :  { field: "order_total", callback: (e) => vm.formatPrice(e) },
				"STATUS": { field: "orderstatus", callback: (e) => vm.formatPrice(e).replace('_', ' ') },
				"ORDER TIME": { field: "created_at", callback: (e) => vm.$moment(e).format('Do MMMM, YYYY')}
			}
		},
		
	},
	data: () => ({
		search: '',
		loading: true,
		histories: [],
		orderHistories: [],
		
		orderDetailsData: {
			items: [],
			tax: 0,
			orderid: '',
			orderstatus: '',
			customername: '',
			customerphone: '',
			deliveryaddress: '',
			deliverycharge: 0,
			profilelink: '',
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
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			return nf.format(number);
			// return this.formNumber(number)
		},
		getOrderHistory() {
			this.histories = this.history
			this.orderHistories = this.history.customeorderhistory
			// console.log(this.histories)
			
			this.loading = false
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
				deliverycharge: order.deliverycharge,
				profilelink: order.profilelink,
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
				deliverycharge: 0,
				profilelink: '',
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
		closeOrderDetails() {
			this.clearOrderDetails()
			$('#order-details').removeClass('uk-open').hide();
		},
		viewCustomerDetails(customer) {
			localStorage.removeItem('customer')
			this.$store.dispatch('customers/setCustomer', customer)
			this.$router.push('/customers/details/' + customer.id)
		}
	},
	mounted() {
		this.getOrderHistory()
	}
}
</script>
