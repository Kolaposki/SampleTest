<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/reports" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <div class="search-filter d-flx-alc-jfe">
		  <label class="search-w-icon">
          <input v-model="search" type="text" @keyup="filteredRevenue()" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
		<div id="branch" class="drop-down filter-drop">
				<select v-model="paymentMode" @change="filterStatus()" class="filter-btn box-deco-smallr">
					<option value="">All Payment mode</option>
					<option value="card">Card</option>
					<option value="wallet">Wallet</option>
					<option value="cash">Cash</option>
					<option value="banktransfer">Bank Transfer</option>
				</select>
      	 	</div>
        <div class="drop-down filter-drop">
		
		
          <select v-model="formData.branchID" @change="getReport('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div>
		<div class="drop-down date-drop">
			<date-picker @change="getReport" v-model="date" range :placeholder="'Date Range'" type="datetime" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
					@close="handleRangeClose"
				>
					<template v-slot:footer>
					<button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
						{{ showTimeRangePanel ? 'select date' : 'select time' }}
					</button>
					</template>
				</date-picker>
        </div>			
        <!-- </div> -->
        <download-excel
            id="download"
            class="btn btn--primary"
            :fetch="fetchData"
            :fields="json_fields"
            :before-generate="startDownload"
            :before-finish="finishDownload"
            worksheet="My Worksheet"
            name="delivery_revenue_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<pagination :headers="headers" :date="date"  v-model="formData.page" @go="getReport" />


    <div class="inner-main-wrapper">
		<div class="width-1-4">
          <ul class="card-list none ml-mt-1 flex-width-1-4wgr">
             <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <div>
                  <h3>
                    Gross Revenue
                  </h3>
                </div>
                <!-- <svg>
                  <use href="/uploads/icons.svg#wallet"></use>
                </svg> -->
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(totalrevenuefood + totalrevenuedelivery + totalrevenuepos)}}</p>

              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <h3>
                  Total Revenue (Food)
                </h3>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(totalrevenuefood)}}</p>
              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <div>
                  <h3>
                    Total Revenue (Delivery)
                  </h3>
                </div>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(totalrevenuedelivery)}}</p>

              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <h3>
                 Total Revenue (POS)
                </h3>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(totalrevenuepos)}}</p>
              </div>
            </li>
            
          </ul>
          
          <div>
            
           
          </div>
        </div>
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class=" column-name">Date</th>
			  <th class="column-name">Product</th>
			  <th class="column-name">Location</th>
			  <th class="column-name">Payment Mode</th>
			  <th>Amount (₦)</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="10">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="10">No record at the moment</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td v-show="row.date">
				{{ $moment(row.date).format('Do MMM, YYYY') }}
			  </td>

			  <td v-show="!row.date">
				<span> {{ $moment(row.start_date).format('Do MMM, YYYY HH:mm') }} </span> - 
				<span> {{ $moment(row.end_date).format('Do MMM, YYYY HH:mm')}} </span>
			  </td> -->
              <td class="column-name">{{row.created_at ? $moment(row.created_at).format('Do MMM, YYYY HH:mm'): "N/A"}}</td>
			  <td class="column-name">{{row.product}}</td>
			  <td class="column-name">{{row.location}}</td>
			  <td class="column-name"> {{row.paymentmethod ? row.paymentmethod : "N/A"}}</td>
			  <td> {{formatPrice(row.ordertotal)}}</td>
			  
              <!-- <td>{{Number(row.pastqty) + Number(0) - Number(row.stock__waste__sum) - Number(row.stock__waste__sum)-Number(row.totaltransaction)}}</td> -->
			  <!---->
              <!-- <td > {{ formatPrice(row.unitprice) }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td> -->
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../../components/Pagination.vue';
var Vue = require("vue");
export default {
    components: { Pagination, "vue-datetime-picker": require("vue-datetime-picker") },
	layout: 'main',
	computed: {
		json_fields () {
			let vm = this;
			return  {
				"Date": {callback: (e) => this.$moment(e.created_at).format('Do MMM, YYYY HH:mm') },
				"Location":"location",
				"Product":"product",
				"Mode of Payment":"paymentmethod",
				"Amount":{ field: "ordertotal", callback: (e) => vm.formatPrice(e) }
			}
		},
	},
	data: () => ({
		paymentMode:'',
		totalrevenuepos:'',
		totalrevenuedelivery:'',
		totalrevenuefood:'',
		filteredList:[],
		loading: true,
		search: '',
		result: '',
		dailyTotal: '',
		reports: [],
		branches: [],
		date: '',
		formData: {
			merchID: '',
			branchID: '',
			startdate: '',
			enddate: '',
			paymentmode:'',
			riderID:''
		},
		
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1,
		},
		api : 'usersreport/getRevenueReport',
		
	}),
	// watch: {
	// 	"formData.branchID" () { 
	// 		this.headers.pagenum = 2
	// 		this.formData.page = 1
	// 		console.log('ayoming')
	// 	},
	// },
	methods: {
		filterStatus(){
			this.filteredList  =  this.reports.filter(report => {
					if(this.paymentMode == ''){
						return this.reports
					}
					if(report.paymentmethod != null && report.paymentmethod.toLowerCase().includes(this.paymentMode.toLowerCase())){
						return report.paymentmethod.toLowerCase().includes(this.paymentMode.toLowerCase())
					}				
				})
		},
		filteredRevenue () {
			this.filteredList = this.reports.filter(report =>{
				if(this.search == ''){
					return this.reports
				}
				if (report.riderID !=null && report.riderID == this.search) {
						return report.riderID == this.search;
				}
		});
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
			// console.log('date')
			// console.log(this.date)
			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''
			// this.getDailySales()
			this.$store.dispatch('usersreport/getRevenueReport', this.formData)
				.then(res => {
				console.log('res', res)
					if(res.status) {

							this.reports = res.data
							this.filteredList = res.data
							this.totalrevenuepos = res.totalposamount
							this.totalrevenuefood = res.totalfoodamount
							this.totalrevenuedelivery = res.totaldeliveryamount
							this.setHeaders(res.data, res)
						

						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err => {
					this.$toast.error('An error occurred ' + err)
				})
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
		getDailySales() {
			let vm = this;
			this.$store.dispatch('salesreport/getDailySales', this.formData)
				.then(res =>{
					this.dailyTotal = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		
		
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].reports.viewdeliveryrevenue: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getReport()
		this.listBranches()
		// this.getDailySales()
	}
}

</script>
