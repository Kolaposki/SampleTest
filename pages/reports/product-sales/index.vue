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
            name="product_sales_report.xls"
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
              <th class="medium-space column-name">Product</th>
			  <th class="medium-space column-name">Product ID</th>
			  <th class="medium-space column-name">Pack Unit</th>
			  <th class="medium-space">Opening Stock</th>
			  <th class="medium-space">Stock In</th>
			  <th class="medium-space">Damaged Qty</th>
			  <th class="medium-space">Qty Sold</th>
			  <th class="medium-space">Closing Stock</th>
              <th class="medium-space">Unit Price(₦)</th>
              <th class="medium-space">Total Sales(₦)</th>
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
              <td class="column-name">{{ row.productname }}</td>
			  <td class="column-name"> {{row.productID}}</td>
			  <td class="column-name">{{row.packsize}} </td>
			  <td> {{row.pastqty}}</td>
			  <td> 0 </td>
			  <td> {{row.stock__waste__sum}}</td>
			  <td>{{ row.totaltransaction }}</td>
              <td>{{Number(row.pastqty) + Number(0) - Number(row.stock__waste__sum) - Number(row.stock__waste__sum)-Number(row.totaltransaction)}}</td>
			  <!---->
              <td > {{ formatPrice(row.unitprice) }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td>
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
				"PRODUCT NAME":"productname",
				"productID":"productID",
				"packsize":"packsize",
				"OPENING STOCK":{ field: "pastqty", callback: (e) => vm.formatPrice(e) },
				"STOCK IN":"0",
				"DAMAGE QTY":{ field: "stock__waste__sum", callback: (e) => vm.formatPrice(e)},
				"UNIT PRICE":  { field: "unitprice", callback: (e) => vm.formatPrice(e) },
				"QTY SOLD": "totaltransaction",
				"TOTAL SALES" :  { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
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
			page: 1
		},
		
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1,
		},
		api : 'salesreport/getProductSales',
		
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
				this.formData.startdate = this.$moment(this.date).format('YYYY-MM-DD HH:MM:SS')
				this.formData.enddate = this.$moment(this.date).format('YYYY-MM-DD HH:MM:SS')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''
			this.getDailySales()
			this.$store.dispatch('salesreport/getProductSales', this.new_data)
				.then(res => {
					if(res.data.status) {

							this.reports = res.data.data
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
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getReport()
		this.listBranches()
		// this.getDailySales()
	}
}
</script>
