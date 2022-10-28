<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/reports/users/rider" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link> |
      <span class="ml-1 fw-bold co-grey">
        {{ histories.riderfirstname}} {{ histories.riderlastname}}'s Order History
      </span>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <!-- <a href="/uploads/down.png" download class="btn btn--primary">Export</a> -->
      </div>
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <!-- <th></th> -->
            <th class="large-space">Customer Name</th>
            <th class="">Contact</th>
            <th class="">Order ID</th>
            <th class="">Amount(₦)</th>
            <th class="">Branch</th>
            <th class="large-space">Rider</th>
            <th class="">Status</th>
            <th class="">Order Time</th>
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
            <!-- <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td> -->
            <td>
<!--              <div class="avatar-wtext">-->
                <span>{{ row.firstname }} {{ row.lastname }}</span>
<!--              </div>-->
            </td>
            <td>{{ row.phonenumber }}</td>
            <td style="color: #28A745;">{{ row.ordercode }}</td>
            <td>{{ formatPrice(row.ordertotal) }}</td>
            <td>{{ row.branchname }},{{ row.branchcity }}</td>
            <td class="avatar-wtext">
              <span>{{ row.riderfirstname }} {{ row.riderlastname }}</span>
            </td>
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
			return JSON.parse(localStorage.getItem('riderHistory'))
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
		}
	},
	data: () => ({
		search: '',
		loading: true,
		histories: {},
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
			this.orderHistories = this.history.orderdetails
			this.loading = false
		},
		orderDetails(order) {
			this.clearOrderDetails()
			let vm = this;
			this.orderDetailsData = {
				items: order.orderitems,
				orderid: order.ordercode,
				tax: 0,
				orderstatus: order.orderstatus.replace('_', ' '),
				customername: order.firstname + ' ' + order.lastname,
				customerphone: order.username,
				deliveryaddress: order.address,
				deliverycharge: vm.formatPrice(order.deliverycharge),
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
	},
	mounted() {
		this.getOrderHistory()
	}
}
</script>
