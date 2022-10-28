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
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <!-- <div class="drop-down filter-drop">
          <select v-model="formData.branchID" @change="getReport('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div> -->
	     <div class="drop-down page-drop">
          <date-picker @change="getReport" v-model="date" range :placeholder="'Date Range'" type="datetime" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
				@close="handleRangeClose">
				<template v-slot:footer>
				<button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
					{{ showTimeRangePanel ? 'select date' : 'select time' }}
				</button>
				</template>
			</date-picker>
        </div>
		<!-- <div class="drop-down page-drop">
          <date-picker @change="getReport" v-model="dae"  range :placeholder="'Date Range'" type="week" timeTitleFormat="ddd"  format="ddd" value-type="format" :show-second="false"
				@close="handleRangeClose">
				<template v-slot:footer>
				<button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
					{{ showTimeRangePanel ? 'select date' : 'select time' }}
				</button>
				</template>
			</date-picker>
        </div>			 -->
        <!-- </div> -->
        <download-excel
            id="download"
            class="btn btn--primary"
            :fetch="fetchData"
            :fields="json_fields"
            :before-generate="startDownload"
            :before-finish="finishDownload"
            worksheet="My Worksheet"
            name="lease_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<!-- <pagination :headers="headers" :date="date"  v-model="formData.page" @go="getReport" /> -->


    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class=" column-name">Rider ID</th>
			  <th class=" column-name">Rider Name</th>
			  <th>Expected Starting Balance (₦)</th>
			  <th>Actual Starting Balance (₦)</th>
			  <th class="">Expected Weekly Remittance (₦)</th>
			  <th>Actual Weekly Remittance (₦)</th>
			  <th>Expected Ending Balance (₦)</th>
			  <th>Actual Ending Balance(₦) </th>
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
              <td class="column-name">{{row.riderID ? row.riderID : "N/A"}}</td>
			  <td class="column-name">{{row.riderfirstname}} {{row.riderlastname}}</td>
			  <td>{{row.leaseamount ? formatPrice(row.leaseamount) : "N/A"}}</td>
			  <td>{{row.leaseamount ? formatPrice(row.leaseamount) : "N/A"}} </td>
			  <td> {{row.expectedweeklyamount ? formatPrice(row.expectedweeklyamount) : "N/A"}}</td>
			  <td>{{row.remittanceamount ? formatPrice(row.remittanceamount) : "Not Remitted yet"}}</td>
			  <td>{{formatPrice(row.leaseamount - row.expectedweeklyamount )}}</td>
			  <td>{{formatPrice(row.leaseamount - row.remittanceamount )}}</td>
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
			return this.reports.filter(report => {
				if(this.search == ''){
					return this.reports
				}
				if (report.riderID !=null && report.riderID == this.search){
					return report.riderID == this.search;
				}
			})
		},
		json_fields () {
			let vm = this;
			return  {
				// "DATE": {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY') : this.$moment(e.start_date).format('Do MMM, YYYY HH:mm') + ' - ' + this.$moment(e.end_date).format('Do MMM, YYYY HH:mm')},
				"Rider ID":"riderID",
				"Expected Starting Balance":{ field: "leaseamount", callback: (e) => vm.formatPrice(e) },
				"Actual Starting Balance":{ field: "leaseamount", callback: (e) => vm.formatPrice(e) },
				"Expected Weekly Remittance":{ field: "expectedweeklyamount", callback: (e) => vm.formatPrice(e) },
				"Actual Weekly Remittance":"remittanceamount",
				"Expected Ending Balance":{
					callback: (e) => {
						return `${e.leaseamount - e.expectedweeklyamount}`;
					}
				},
				"Actual Ending Balance" : {
					callback: (e) => {
						return `${e.leaseamount - e.remittanceamount}`;
					}
				},
			}
		},
	},
	data: () => ({
		loading: true,
		dae:'',
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
		api : 'usersreport/getLeaseReport',
		
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
			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			let vm = this;
			this.formData.export = ''
			this.$store.dispatch('usersreport/getLeaseReport', this.formData)
				.then(res => {
					if(res.status) {
							this.reports = res.data
							console.log("reports", res)
							this.setHeaders(res.data, res.headers)
						
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
		
		
		
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].reports.viewleasereport: '')){
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
	}
}
</script>
