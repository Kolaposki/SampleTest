<template>
  <section class="main-content-wrap">
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
          name="rider-list-report.xls"
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
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <!-- <th></th> -->
            <th class="large-space column-name">Rider Name</th>
            <!-- <th class="">Username</th> -->
            <th  class="column-name">Reg number</th>
            <th  class="column-name">Phone number</th>
            <!-- <th class="">Branch</th> -->
            <th class="">Total Orders</th>
            <th class="">Total Earnings(₦)</th>
            <th class="">Commission(₦)</th>
            <th class=""></th>
          </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="9">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="9">No record at the moment</td>
            </tr>
            <tr class="link" v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td  class="column-name">
                <!-- <div class="avatar-wtext"> -->
                  <span  class="column-name">{{ row.riderfirstname }} {{ row.riderlastname }}</span>
                <!-- </div> -->
              </td>
              <!-- <td>{{ row.riderusername }}</td> -->
              <td style="color: #28A745;"  class="column-name">{{ row.registrationnumber }}</td>
              <td>{{ row.riderphonenumber }}</td>
              <!-- <td>{{ row.branchname }}</td> -->
              <td>{{ row.totalorder }}</td>
              <td>{{ formatPrice(row.totalamountorder) }}</td>
              <td>{{ formatPrice (row.ridercommission) }}</td>
              <td>
                <button class="btn btn-icon" title="View History" @click="viewOrderDetails(row)" type="button">
                  <svg>
                    <use href="/uploads/icons.svg#toq-file"></use>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>

    </div>
  </section>
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
				"RIDER NAME" : {
					callback: (e) => {
						return `${e.riderfirstname} ${e.riderlastname}`;
					}
				},
				"REG. NUMBER": "registrationnumber",
				"BRANCH": "branchname",
				"TOTAL ORDERS": "totalorder",
				"TOTAL AMOUNT" :  { field: "totalamountorder", callback: (e) => vm.formatPrice(e) },
				"COMMISION AMOUNT" :  { field: "ridercommission", callback: (e) => vm.formatPrice(e) },
				
			}
		},
		
	},
	data: () => ({
		loading: true,
		formData: {
			merchID: '',
			page: 1,
			startdate: '',
			enddate: '',
			branchID:''
		},
		date: '',
		reports: [],
		search: '',
		api: 'usersreport/getRidersReport',
		
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
			if(this.isSupervisor){
				this.formData.branchID = ''
			}
      
			this.$store.dispatch('usersreport/getRidersReport', this.formData)
				.then(res => {
					if(res.data.status){
						this.reports = res.data.data.data
						let array = []
						this.setHeaders(res.data.data.data, res.data.data)
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
