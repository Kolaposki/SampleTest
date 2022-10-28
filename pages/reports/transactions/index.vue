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
        <div class="drop-down page-drop">
          <date-picker @change="getRiderReport" v-model="date" range :placeholder="'Date Range'" type="datetime" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
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
          name="source-of-truth-transactions-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

    <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text " type="button" >
          Showing <span> {{showing}} </span> of <span> {{ this.headers.Count != undefined ? this.headers.Count : 0 }} </span>
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

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content large-content">
          <thead class="">
          <tr>
              
            <!-- <th></th> -->
            <th class="large-space column-name">S/N</th>
            <!-- <th class="">Username</th> -->
            <th  class="large-space column-name">Request Date</th>
            <th  class=" large-space column-name">Order Source</th>
            <!-- <th class="">Branch</th> -->
            <th class="large-space">User ID</th>
            <th class="large-space">order Match Date</th>
            <th class="large-space">Rider ID</th>
            <th class="large-space">User Location</th>
            <th class="large-space">Rider's City of Operation</th>
            <th class="large-space">Pickup Date</th>
            <th class="large-space">Mode of Payment</th>
            <th class="large-space">Amount (₦)</th>
            <th class="large-space">Order Completion Date</th>
            <th class="large-space">Commission Rate (%)</th>
            <th class="large-space">Order Status</th>
            <th class="large-space">Order No</th>
            <th class="large-space">User Rating</th>
            <th class="large-space">User Feedback</th>
          </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="9">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && reports.length < 1">
              <td colspan="9">No record at the moment</td>
            </tr>
            <tr class="link" v-if="!loading && reports.length > 0" v-for="(row, ix) in reports" v-bind:key="ix">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td  class="column-name">
                <!-- <div class="avatar-wtext"> -->
                  <span  class="column-name">1</span>
                <!-- </div> -->
              </td>
              <td style="color: #28A745;"  class="column-name">{{row.created_at ? $moment(row.created_at).format('MMM Do YY, h:mm a'):'N/A'}}</td>
              <td class="column-name">{{row.source ? row.source:'N/A'}}</td>
              <td>{{row.customerID ? row.customerID : "N/A"}}</td>
              <td>{{row.assigntime ? $moment(row.assigntime).format('MMM Do YY, h:mm a'):'N/A'}} </td>
              <td>{{row.riderID ? row.riderID: 'N/A'}}</td>
              <td>{{row.address ? row.address : "N/A"}}</td>
              <td>{{row.branchcity ? row.branchcity : "N/A"}}</td>
              <td>{{row.pickuptime ? $moment(row.pickuptime).format('MMM Do YY, h:mm a'):'N/A'}}</td>
              <td>{{row.paymentmethod ? row.paymentmethod : "N/A"}}</td>
              <td>{{row.ordertotal ? formatPrice(row.ordertotal) : "N/A"}}</td>
              <td>{{row.completiontime ? $moment(row.completiontime).format('MMM Do YY, h:mm a'):'N/A'}}</td>
              <td>{{row.commissionrate ? row.commissionrate : "N/A"}}</td>
              <td>{{row.orderstatus ? row.orderstatus : "N/A"}}</td>
              <td>{{row.ordercode ? row.ordercode : "N/A"}}</td>
              <td>{{row.userrating ? row.userrating: 'N/A'}}</td>
              <td>{{row.userfeedback ? row.userfeedback: 'N/A'}}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports.filter(report => {
				if(report.riderfirstname.toLowerCase().includes(this.search.toLowerCase())) {
					return report.riderfirstname.toLowerCase().includes(this.search.toLowerCase());
				} else if (report.riderlastname.toLowerCase().includes(this.search.toLowerCase())){
					return report.riderlastname.toLowerCase().includes(this.search.toLowerCase());
				} else {
					return report.riderusername.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},
		json_fields () {
			let formatDate = this.$moment
			let vm = this;
			return  {
				"Request Date" : {callback: (e) => this.$moment(e.created_at).format('Do MMM, YYYY')},
				"Order Source": "source",
				"User ID": "customerID",
				"Order Match Date": {callback: (e) => this.$moment(e.assigntime).format('Do MMM, YYYY')},
				"Rider ID" :  "riderID",
				"User Location" :  "address",
        "Rider's City of Operation":"branchcity",
        "Pickup Date": {callback: (e) => this.$moment(e.pickuptime).format('Do MMM, YYYY')},
        "Mode of Payment": "paymentmethod",
        "Amount": { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
        "Order Completion Time": {callback: (e) => this.$moment(e.completiontime).format('Do MMM, YYYY')},
        "Commission Rate": "commissionrate",
        "Order Status": "orderstatus",
        "Order No": "ordercode",
        "User Rating": "userating",
        "User Feedback": "userfeedback",
			}
		},
		
	},
	data: () => ({
		loading: true,
		formData: {
			merchID: '',
			startdate: '',
			enddate: '',
			branchID:''
		},
		date: '',
		reports: [],
		search: '',
		api: 'usersreport/getTransactions',
		
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1
		},
	}),
	methods: {
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			return nf.format(number);
			// return this.formNumber(number)
		},
		getRiderReport() {
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
			// if(this.isSupervisor){
			// 	this.formData.branchID = ''
			// }
      
			this.$store.dispatch('usersreport/getTransactions', this.formData)
				.then(res => {
					if(res.data.status){
						this.reports = res.data.data
						this.setHeaders(res.data.data, res.data.headers)
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred!')
				})
		},
		nextData() {
			if(this.headers.Next === "") {
				return
			}
			let page = +this.formData.page + +1

			this.formData.page = page
			this.getRiderReport()
		},
		previousData() {
			if(this.headers.Previous === "") {
				return
			}
			let page = +this.formData.page - +1
			if(page < 0) {
				this.formData.page = 1
				return
			}
			this.formData.page = page
			this.getRiderReport()
		},
		viewOrderDetails(row) {
			localStorage.removeItem('riderHistory')
			this.$store.dispatch('usersreport/setRiderHistory', row)
			this.$router.push('/reports/users/rider/history')
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.formData.branchID = ''
		// console.log('user')
		// console.log(this.user)
		this.getRiderReport()
	}
}
</script>
<style scoped>
  .table-content.large-content{
    width:2500px;
  }
</style>