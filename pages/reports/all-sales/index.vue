<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <div @click="$router.back()" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </div>
      <div class="search-filter d-flx-alc-jfe">
        <div class="drop-down filter-drop">
          <select v-model="formData.branchID" @change="getReport('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div>
        <div class="drop-down date-drop">
          <date-picker @change="getReport" type="datetime" v-model="date" range :placeholder="'Date Range'" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
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
            name="total_sales_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

    <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text " type="button" >
          Showing <span> {{showing}} </span> of <span> {{ this.headers.Count != undefined ? this.headers.Count : 0}} </span>
        </button>
      </div>
      <div class="d-flx-alc">
        <button @click="previousData" class="btn btn-icon smallsvg">
          <svg>
            <use href="/uploads/icons.svg#arrow-right"></use>
          </svg>
        </button>
        <button @click="nextData" class="btn btn-icon smallsvg">
          <svg>
            <use href="/uploads/icons.svg#arrow-left"></use>
          </svg>
        </button>
      </div>
    </div>

    <div id="parent-component">


      <order-details ref="order_details" />
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
              <th class="large-space column-name">Customer</th>
              <!-- <th class="">Mobile</th> -->
              <th  class="column-name">Order ID</th>
              <th  class="column-name">Method</th>
              <th class="">Amount(₦)</th>
              <th class="medium-space column-name">Payment Methods</th>
              <!-- <th class="medium-space">Tax</th> -->
              <th  class="column-name">Branch</th>
              <th class="large-space column-name">Rider</th>
              <th class="column-name">Status</th>
              <th class="">Order Time</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="10">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="10">No record at the moment</td>
            </tr>
            <tr class="link" v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix" @click="orderDetails(row)">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td class="column-name">
                <!-- <div class="avatar-wtext"> -->
                  <!-- <span> -->
					  {{row.firstname}} {{row.lastname}}
					  <!-- </span> -->
                <!-- </div> -->
              </td>
              <!-- <td>{{ row.phonenumber }}</td> -->
              <td style="color: #28A745;"  class="column-name">{{ row.ordercode }}</td>
              <td class="column-name">{{ row.ordermethod }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td>
              <td class="column-name"> 
			  
			  	{{ row.paymentdetails.map(x => x.paymentmethod ? x.paymentmethod : '').reduce( (p, c) => p + ', ' +  c.toUpperCase(), '').slice(1)}}

			  </td>
              <!-- <td>{{ formatPrice(row.vat)  }}</td> -->
              <td class="column-name">{{ row.branchname }}, {{ row.branchcity }}</td>
              <td class="avatar-wtext column-name">
                <span  class="column-name">{{ row.riderfirstname }} {{ row.riderlastname }}</span>
              </td>
              <td class="tx-c">
                <span :class="'column-name status ' + row.orderstatus.toLowerCase()">{{ row.orderstatus.replace('_', ' ') }}</span>
              </td>
              <td>{{ row.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>


    </div>
  </overlay-scrollbars>
</template>
<script>
import OrderDetails from '../../../components/OrderDetails.vue';
export default {
  components: { OrderDetails },
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports.filter(report => {
				if (report.ordercode.toLowerCase().includes(this.search.toLowerCase())) {
					return report.ordercode.toLowerCase().includes(this.search.toLowerCase());
				} else if(report.firstname.toLowerCase().includes(this.search.toLowerCase())) {
					return report.firstname.toLowerCase().includes(this.search.toLowerCase());
				} else if (report.lastname.toLowerCase().includes(this.search.toLowerCase())){
					return report.lastname.toLowerCase().includes(this.search.toLowerCase());
				} else {
					return report.businessname.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},

		json_fields () {
			let vm = this;
			
			let result =  {
				"NAME" : {
					callback: (e) => {
						return `${e.firstname} ${e.lastname}`;
					}
				},
				"CONTACT": "phonenumber",
				"ORDER ID": "ordercode",
				"METHOD": "ordermethod",
				"AMOUNT" :  { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
				"CASH": {callback: (e) => vm.getAmount(e.paymentdetails, 'cash')},
        		"POS": {callback: (e) => vm.getAmount(e.paymentdetails, 'pos')},
        		"BANK TRANSFER": {callback: (e) => vm.getAmount(e.paymentdetails, 'bank')},
				"TAX TOTAL" :  { field: "vat", callback: (e) => vm.formatPrice(e)},
			}

			vm.taxes.forEach((tax) => {
				result[`${tax.name}(${tax.value})%`] = {
					callback : e => {
						let details = e.taxes.find(x => x.tax_id == tax.id)
						if (details) {
							console.log(details)
							return vm.formatPrice(details.value)
						}
						return ''
					}
					
					// vm.getTax(e.taxes, tax.id)
				}
			})

			result["BRANCH"] = { callback: (e) => e.branchname + ', ' + e.branchcity}
			result["RIDER"] = { callback: (e) => e.riderfirstname + ' ' + e.riderlastname}
			result["ORDER ITEMS"] = {callback: (e) => e.orderitems.length > 0 ? e.orderitems.map(x => x.quantity + ' ' + x.productname).reduce((p, v) => p + ', ' + v) : ''}
			result["DATE"] = "created_at"

			return result
		},
		
		showing() {
			// console.log(this.headers);
			let total = this.headers.total != undefined ? Number(this.headers.total) : 0;
			let Count = this.headers.Count != undefined ? Number(this.headers.Count) : 1;
			let from = (this.headers.pagenum != null) && Number(this.headers.pagenum - 1) > 1 ? ((Number(this.headers.pagenum - 1) * 10) - 10): 1;
			let to = from == 1 ? total : from + total;
			from = from > 1 ? from + 1 : from
			if(this.headers.last !=undefined && this.headers.last){

				return Count - total + ' - ' + Count
			}
			return  from + ' - ' +  to;
		}
	},
	data: () => ({
		taxes:[],
		loading: true,
		search: '',
		reports: [],
		branches: [],
		date: '',
		formData: {
			merchID: '',
			branchID: '',
			startdate: '',
			enddate: '',
			page: 1
		},
		
		// json_data: [],
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1
		},
		api : 'salesreport/getTotalSales',
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
				regnumber: '',
				photo: ''
			},
			staff: {
				photo: '',
				name: '',
				phone: ''
			}
		}
	}),
	
	methods: {
		getTaxs() {
	    this.$store.dispatch('tax/listTaxsWithDeleted', this.formData)
				.then(res =>{
					// this.loading = false
					this.taxes = res.data.data
				}).catch(err =>{
					// this.loading = false
					console.log(err)
				})
    	},
		getAmount(paymentdetails, method){
			if (paymentdetails.length > 0 ){
				let details = paymentdetails.filter(x => {
					if (x.paymentmethod){
						return x.paymentmethod.toLowerCase().includes(method)
					}
					return false
				})
				if (details.length == 1) {
					return this.formatPrice(details[0].paymentamount)
				}
			}
			return ''
		},
		getTax(taxes, id){
			if (taxes.length > 0 ){
				let details = taxes.filter(x => x.tax_id == id)
				if (details.length == 1) {
					return this.formatPrice(details[0].value)
				}
			}
			return ''
		},
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			// return this.formNumber(number)
			return nf.format(number);
		},
		getReport (param) {
			if (param != undefined && param == 'branchID'){
				this.formData.page = 1
			}
			this.loading = true

			let vm = this;

			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD HH:MM:SS')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD HH:MM:SS')
			} else if(this.formData.startdate != '' && this.formData.enddate != ''){
				vm.date = []
				// vm.date.push(new date(this.formData.startdate))
				// vm.date.push(new date(this.formData.enddate))
			}
			

			// console.log(this.date)

			this.formData.export = ''

			this.$store.dispatch('salesreport/getTotalSales', this.new_data)
				.then(res => {
					if(res.data.status) {
						this.reports = res.data.data
						let array = []
						// let formatNumber = this.formNumber
						
						this.headers.Next = res.data.headers.Next
						this.headers.Prev = res.data.headers.Prev
						this.headers.Count = res.data.headers.Count
						this.headers.total = res.data.data.length

						const urlParams = new URLSearchParams(this.headers.Next.substring(this.headers.Next.lastIndexOf('/')));
							
						this.headers.pagenum = Number(urlParams.get('page'))

						// console.log(this.headers.pagenum)
						if(this.headers.pagenum != '') {
							this.headers.last = false
							
						} else {
							this.headers.last = true
							// this.headers.pagenum = 1
						}

						// console.log(this.headers)

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
		nextData() {
			if(this.headers.Next === "") {
				return
			}
			let page = +this.formData.page + +1

			this.formData.page = page
			this.getReport()
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
			this.getReport()
		},
		listBranches() {
			let vm = this;
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		orderDetails(order) {
			this.$refs.order_details.setOrder(order)
			// this.clearOrderDetails()
			// this.orderDetailsData = {
			// 	items: order.orderitems,
			// 	orderid: order.ordercode,
			// 	tax: 0,
			// 	orderstatus: order.orderstatus.replace('_', ' '),
			// 	customername: order.firstname + ' ' + order.lastname,
			// 	customerphone: order.username,
			// 	deliveryaddress: order.address,
			// 	profilelink: order.profilelink,
			// 	deliverycharge: order.deliverycharge,
			// 	rider : {
			// 		id: order.riderID,
			// 		name: order.riderfirstname + ' ' + order.riderlastname,
			// 		phone: order.riderphonenumber,
			// 		regnumber: order.registrationnumber,
			// 		photo: order.riderphoto
			// 	},
			// 	staff: {
	        // name: order.staffname,
			// 		photo: order.staffpic,
			// 		// phone: ''
			// 	}
			// }
			// $('#order-details').addClass('uk-open').show();
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
					name: '',
					photo: '',
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
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id	
		
		

		if(localStorage.getItem('formData') != undefined && localStorage.getItem('formData') != ''){
			this.formData = JSON.parse(localStorage.getItem('formData'))
		}



	  
		this.getReport()
		this.listBranches()

		this.getTaxs()
	}
}
</script>
