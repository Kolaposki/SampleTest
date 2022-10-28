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
        <div class="drop-down filter-drop">
          <select v-model="formData.branchID" @change="getStockReport" class="filter-btn box-deco-smallr">
            <option value="">Select Branch</option>
            <option v-for="branch in branches" :value="branch.id" :key="branch.id">{{ branch.branchname }}</option>
          </select>
        </div>
        <div class="drop-down date-drop">
          <date-picker @change="getStockReport" type="datetime" v-model="date" :placeholder="'Date'" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false" :range='false' :show-time-panel="showTimeRangePanel"
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
          name="inventory-stock-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

	<pagination :headers="headers" :date="date" v-model="formData.page" @go="getStockReport" />

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <!-- <th></th> -->
            <th class="column-name"> Name</th>
            <th class=""> Price(₦)</th>
            <th class=""> Opening Stock</th>
            <th class=""> Stock In</th>
            <th v-if="closing" class=""> Closing Stock</th>
            <th v-else class=""> Current Stock</th>
            <!--<th class="">OUTWARD QTY</th>-->
            <th class="column-name">Branch</th>
            <th class="column-name">Date</th>
          </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="8">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="8">No record at the moment</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td class="column-name">{{ row.productname }}</td>
              <td>{{formatPrice(row.sellingprice)}}</td>
              <td>{{ row.pastqty}}</td>
              <td>{{ row.prod}}</td>
              <td>{{ row.productqty}}</td>
              <td class="column-name">{{ row.branchname }}</td>
				<td class="column-name">{{ $moment(row.date).format('Do, MMM YYYY') }}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports.filter(report => {
				
					return (report.branchname != undefined && report.branchname.toLowerCase().includes(this.search.toLowerCase())) || ( report.branchstate != undefined && report.branchstate.toLowerCase().includes(this.search.toLowerCase())) || 
					( report.branchcity != undefined && report.branchcity.toLowerCase().includes(this.search.toLowerCase()) ) ||
					( report.productname != undefined && report.productname.toLowerCase().includes(this.search.toLowerCase()) );
				
			});
		},
		json_fields () {
      		let formatDate = this.$moment
			let vm = this;
			return  {
				"PRODUCT NAME": "productname",
				"SELLING PRICE": "sellingprice",
				"OPENING STOCK": "pastqty",
				"INWARD": "prod",
				"STOCK": "productqty",
				"BRANCH": "branchname",
				"DATE": { field: "date", callback: (e) => formatDate(e).format('Do MMMM, YYYY')}
			}
		},
		
	},
	data: () => ({
		branches: [],
		search: '',
		closing: false,
		reports: [],
		headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
		},
		loading: true,
		api : 'inventoryreport/getStockReport',
		formData: {
			merchID: '',
			branchID: '',
			startdate: '',
			enddate: '',
			page: 1
		},
		date: '',
		
		productTypes: {
			'nonstocked_product' : 'Non stocked product',
			'stocked_product': 'Stocked product',
			'service': 'Service product'
		},
	}),
	methods: {
		showProductType(type) {
			return this.productTypes[type]
		},
	  showQuantity(row) {
	    if(row.inwardqty != null) {
	      return '<svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="green" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" /></svg>' + row.inwardqty
			} else {
	      return '<svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="red" d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" /></svg>' + row.outwardqty
			}
		},
		getBranches() {
			let vm = this
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(err =>{
          
				})
		},
		getStockReport() {
			
		  	this.loading = true
      
			if(this.date != null && this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date).format('YYYY-MM-DD HH:MM:SS')
				// this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD HH:MM:SS')
			} else {
				this.formData.startdate = ''
				// this.formData.enddate = ''
			}

			this.formData.export = ''
			
			this.$store.dispatch('inventoryreport/getStockReport', this.new_data)
				.then(res =>{
					if(res.data.status) {
						this.reports = res.data.data

						if (res.data.data != undefined && res.data.data.length > 0) {
							this.setHeaders(res.data.data, res.data.headers)

							this.closing = this.$moment(new Date()).format('Do') != this.$moment(this.reports[0].date).format('Do')


							// console.log(new Date())
							// console.log(this.$moment(new Date()).format('Do'))
							// console.log(this.reports[0].date)
							// console.log(this.$moment(this.reports[0].date).format('Do'))
						}
						
						this.loading = false
						return
					}
					
					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error(err)
				})
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getBranches()
		this.getStockReport()
	}
}
</script>
