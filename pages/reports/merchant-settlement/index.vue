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
        <div class="drop-down filter-drop">
          <select v-model="formData.branchID" @change="getReport('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div>
	     <div class="drop-down date-drop">
          <date-picker @change="getReport" type="datetime" v-model="date" :placeholder="'Today Date'" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false" :range='false' :show-time-panel="showTimeRangePanel"
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
            name="riders_settlement_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<pagination :headers="headers" :date="date" :dailyTotal="dailyTotal" v-model="formData.page" @go="getReport" />


    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <!-- <th class=" column-name">Rider ID</th> -->
              <th>Merchant ID</th>
              <th>Amount (₦)</th>
			  <th>Cash Collected by Rider (₦)</th>
			  <th >Commission Rate(%)</th>
              <th>Commission Due to Ntisa</th>
			  <th>Amount due to Merchant (₦)</th>
              <th class="column-name">Payment Status</th>
              <th class="column-name">Payment Date</th>
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
              <td class="column-name">{{row.riderID ? row.riderID : "N/A"}}</td>
			  <td>{{row.ordertotal__sum ? formatPrice(row.ordertotal__sum) : "N/A"}}</td>
			  <td>{{row.cashcollected ? formatPrice(row.cashcollected) : "N/A"}} </td>
			  <td> {{row.Commission_due_to_ntisa ? formatPrice(row.Commission_due_to_ntisa) : "N/A"}}</td>
			  <td>{{row.amountduetorider ? formatPrice(row.amountduetorider) : "N/A"}}</td>
              <td class="column-name"> {{row.paymentstatus ? row.paymentstatus : "N/A"}}</td>
			  <td class="column-name"> {{(row.paymentdate ? row.paymentdate : "N/A")}}</td>
			  
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
		filteredList () {
			return this.reports;
		},
		json_fields () {
			let vm = this;
			return  {
				"DATE": {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY') : this.$moment(e.start_date).format('Do MMM, YYYY HH:mm') + ' - ' + this.$moment(e.end_date).format('Do MMM, YYYY HH:mm')},
				"Rider ID":"riderID",
				"Amount":{ field: "ordertotal_sum", callback: (e) => vm.formatPrice(e) },
				"Cash Collected by Rider":{ field: "cashcollected", callback: (e) => vm.formatPrice(e) },
				"Commission Due to Ntisa":{ field: "Commission_due_to_ntisa", callback: (e) => vm.formatPrice(e) },
				"Amount Due to Rider":"0",
				"payment Status":"paymentstatus",
				"Payment Date" : "paymentdate",
			}
		},
	},
	data: () => ({
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
			riderID:''
		},
		
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1,
		},
		api : 'usersreport/getRiderSettlementReport',
		
	}),
	// watch: {
	// 	"formData.branchID" () { 
	// 		this.headers.pagenum = 2
	// 		this.formData.page = 1
	// 		console.log('ayoming')
	// 	},
	// },
	methods: {
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
			if(this.date !== '' && this.date != null) {
				this.formData.startdate = this.$moment(this.date).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''
			this.$store.dispatch('usersreport/getRiderSettlementReport', this.formData)
				.then(res => {
					if(res.data.status) {

							this.reports = res.data.data
							// console.log("reports", res)
							this.setHeaders(res.data.data, res.data.headers)
						
						// console.log(result)
						

						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err => {
					this.loading = false
					this.is401(err.res.status);
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
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].reports.viewmerchantsettlement: '')){
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
