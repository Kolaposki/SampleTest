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
			<input v-model="search"  type="text" placeholder="Search">
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
        </div>	 -->
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
            name="user_rating_report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<pagination :headers="headers" :date="date"  v-model="formData.page" @go="getReport" />


    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class=" column-name">order ID</th>
			  <th class="column-name">Customer Name</th>
			  <th class="column-name">Rating</th>
			  <th class="column-name">User Feedback</th>
			  <th class="column-name">User Location</th>
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
              <td class="column-name">{{row.orderno ? row.orderno: "N/A"}}</td>
			  <td class="column-name">{{row.customername}}</td>
			  <td class="column-name">{{row.ratings ? row.ratings : "N/A"}}</td>
			  <td class="column-name"> {{row.feedback ? row.feedback : "N/A"}}</td>
			  <td class="column-name">{{row.location ? row.location : "N/A"}}</td>
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
				if(report.orderID != null && report.orderID == this.search) {
					return report.orderID == this.search;
				} else if (report.customername != null && report.customername.toLowerCase().includes(this.search.toLowerCase())){
					return report.customername.toLowerCase().includes(this.search.toLowerCase());
				} 
			});
		},
		json_fields () {
			let vm = this;
			return  {
				// "DATE": {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY') : this.$moment(e.start_date).format('Do MMM, YYYY HH:mm') + ' - ' + this.$moment(e.end_date).format('Do MMM, YYYY HH:mm')},
				"Order No":"orderno",
				"Name":"customername",
				"User Rating":"ratings",
				"User Feedback": "feedback",
				"User Location": "userlocation"
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
			startdate: '',
			enddate: ''
		},
		
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1,
		},
		api : 'usersreport/getRatingReport',
		
	}),
	methods: {
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
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
			this.$store.dispatch('usersreport/getRatingReport', this.formData)
				.then(res => {
					if(res.status) {

							this.reports = res.data
							this.setHeaders(res.data, res.headers)

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
			this.$store.dispatch('branches/listBranches', this.user.role ? this.user.merchID : this.user.id)
				.then(res =>{
					this.branches = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		
		
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].reports.viewuserrating: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
		this.getReport()
		this.listBranches()
	}
}
</script>
