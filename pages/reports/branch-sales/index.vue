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
          <select  v-model="formData.branchID" @change="getReport('branchID')" class="filter-btn box-deco-smallr">
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
            name="branch_sales_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<pagination :headers="headers" :date="date" v-model="formData.page" @go="getReport" />


    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <!-- <th></th> -->
              <th class="medium-space column-name">Start Date</th>
              <th class="medium-space column-name">End Date</th>
              <th class="medium-space column-name">Store/ Branch</th>
              <th class="medium-space">Sales Amount(₦)</th>
              <th class="medium-space">Customer/Sales Count</th>
              <!-- <th class="">Orders</th> -->
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="10">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="10">No record at the moment</td>
            </tr>
            <tr class="" v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <td v-show="row.date" class="column-name">
				{{ $moment(row.date).format('Do MMM, YYYY') }}
			  </td>
			  <td v-show="row.date" class="column-name">
				{{ $moment(row.date).format('Do MMM, YYYY') }}
			  </td>
			  <td v-show="!row.date" class="column-name">
				{{ $moment(row.start_date).format('Do MMM, YYYY HH:mm') }} 
			  </td>
			  <td v-show="!row.date" class="column-name">
				{{ $moment(row.end_date).format('Do MMM, YYYY HH:mm')}}
			  </td>
              <td class="column-name">{{ row.branchname }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td>
              <td>{{ row.totalcustomer}}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>


    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports;		
		},
		json_fields () {
			let vm = this;
			return  {
				"DATE": {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY') : this.$moment(e.start_date).format('Do MMM, YYYY HH:mm') + ' - ' + this.$moment(e.end_date).format('Do MMM, YYYY HH:mm') },
				"AREA": "branchcity",
				"STORE/ BRANCH": "branchname",
				"AMOUNT" :  { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
				"CUSTOMER COUNT":  { field: "totalcustomer", callback: (e) => vm.formatPrice(e) },
			}
		},
	},
	data: () => ({
		loading: true,
		search: '',
		result: '',
		start_date:'',
		end_date:'',
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
		api : 'salesreport/getBranchSales',
		
	}),
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

			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD HH:MM:SS')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD HH:MM:SS')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''

			this.$store.dispatch('salesreport/getBranchSales', this.new_data)
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
		orderDetails(row) {
			let data = {
				merchID: this.user.id,
				branchID: row.branchID,
				page: 1,
				startdate:'',
				enddate:''
			};
			// console.log(row)
			// console.log(row.start_date)
			if (row.date){
				this.data.startdate = this.$moment(row.date).format('YYYY-MM-DD')
				this.data.enddate = this.$moment(row.date).add(1, 'days').format('YYYY-MM-DD')
			} else {
				this.data.startdate = this.$moment(row.start_date).format('YYYY-MM-DD')
				this.data.enddate = this.$moment(row.end_date).format('YYYY-MM-DD')
			}
			localStorage.removeItem('formData')
			localStorage.setItem('formData', JSON.stringify(data))
			this.$router.push('/reports/all-sales/');
		},
		
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getReport()
		this.listBranches()
	}
}
</script>
