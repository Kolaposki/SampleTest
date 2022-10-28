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
        
        <div class="drop-down filter-drop">
          <select v-model="formData.branchID" @change="getExpiredProductReport" class="filter-btn box-deco-smallr">
            <option value="">Select Branch</option>
            <option v-for="branch in branches" :value="branch.id" :key="branch.id">{{ branch.branchname }}</option>
          </select>
        </div>
        <div class="drop-down date-drop">
          <date-picker @change="getExpiredProductReport" type="datetime" v-model="date" range :placeholder="'Date Range'" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
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
          name="expired-product-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>
    <pagination :headers="headers" v-model="formData.page" @go="getExpiredProductReport" />
    <div id="parent-component">


      <div id="order-details" uk-modal data-uk-modal="{target:'#order-details',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>
              Order Details
              <span class="status ready">Ready</span>
            </h2>
            <p class="d-flx"> <span class="review">NT2838</span></p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <div class="d-flx-jsb">
              <div class="text-img order-modal">
                <img class="text-img__img" src="/uploads/user.png" alt="">
                <div class="text-img__content">
                  <h4 class="uppercase co-grey fw-medium font-14">
                    Customer info
                  </h4>
                  <p class="fw-medium font-16 co-rich-black">Grace Cole</p>
                  <p class="font-16 co-rich-black">08178293784</p>
                </div>
              </div>
              <div>
                <h4 class="uppercase co-grey fw-medium font-14">
                  Delivery address
                </h4>
                <p class="width-80-pc co-rich-black">
                  Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.
                </p>
              </div>
            </div>
            <table class="table-content order-list">
              <tbody class="tablebody">
              <tr>
                <td>
                  <div class="text-img alt">
                    <img class="text-img__img" src="/uploads/food.png" alt="">
                    <div class="text-img__content">
                      <h3 class="fw-medium">
                        Chocolate Chip Cookies
                      </h3>
                      <p>₦ 500.00</p>
                    </div>
                  </div>
                </td>
                <td><span class="quantity">6</span></td>
                <td > ₦ 3000.00</td>
              </tr>
              <tr>
                <td>
                  <div class="text-img alt">
                    <img class="text-img__img" src="/uploads/food.png" alt="">
                    <div class="text-img__content">
                      <h3 class="fw-medium">
                        Chocolate Chip Cookies
                      </h3>
                      <p>₦ 500.00</p>
                    </div>
                  </div>
                </td>
                <td><span class="quantity">6</span></td>
                <td > ₦ 3000.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
                <td class="fw-medium co-lgray">₦ 8500.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="co-lgray tx-r font-16">Tax</td>
                <td class="fw-medium co-lgray">₦ 8500.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="font-20 fw-bold tx-r">Total</td>
                <td class="font-20 fw-bold">₦ 8500.00</td>
              </tr>
              </tbody>
            </table>
            <div class="flex-width-1-2-nr mt-1">
              <div>
                <h3 class="mb-2 big-text">Assigned Rider</h3>
                <div class="text-img order-modal">
                  <div class="img-wrap">
                    <img class="text-img__img round" src="/uploads/user.png" alt="">
                    <p class="rating">
                      <span>4.7</span>
                      <svg>
                        <use href="/uploads/icons.svg#star"></use>
                      </svg>
                    </p>
                  </div>
                  <div class="text-img__content">
                    <h4 class="name">
                      Kola Kamsiyonna
                    </h4>
                    <p>08178293784</p>
                    <p>AX 398 ENU</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="mb-2 big-text">Responding Staff</h3>
                <div class="text-img order-modal">
                  <img class="text-img__img round" src="/uploads/user.png" alt="">
                  <div class="text-img__content">
                    <h4 class="name">
                      Customer info
                    </h4>
                    <p>08178293784</p>
                    <p>Grace Cole</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">
      <figure class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content ">
          <thead class="">
            <tr>
              <!-- <th></th> -->
              <th class="column-name">Bike No</th>
              <th class="column-name">Rider</th>
              <th class="column-name">Purchased date</th>
              <th class="column-name">Manufacturer</th>
              <th class="">Cause of damage</th>
              <th class="column-name">Condition</th>
              <th class="column-name">Remedies</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="7">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="7">No record at the moment</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td class="column-name">NTISA-001</td>
              <td style="color: #28A745;" class="column-name">Adisa Hameed</td>
              <!-- <td class="column-name">{{ row.productdescription }}</td> -->
              <td class="column-name">01/04/2013</td>
              <td>Suzuki</td>
              <td class="column-name">Minor accident</td>
              <td class="column-name">Partly damaged</td>
              <td class="column-name">To be fixed at the Mechanic Workshop</td>
            </tr>
          </tbody>
        </table>
      </figure>


    </div>
  </section>
</template>
<script>
import Pagination from '../../../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports.filter(report => {
				if(report.productname.toLowerCase().includes(this.search.toLowerCase())) {
					return report.productname.toLowerCase().includes(this.search.toLowerCase());
				} else if (report.producttype.toLowerCase().includes(this.search.toLowerCase())){
					return report.producttype.toLowerCase().includes(this.search.toLowerCase());
				} else {
					return report.productdescription.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},
    json_fields () {
      let formatDate = this.$moment
			let vm = this;
			return  {
					"PRODUCT CODE": "productcode",
          "PRODUCT NAME": "productname",
          "PRODUCT DESCRIPTION": "productdescription",
          "PRODUCT TYPE": "producttype",
          "SELLING PRICE": { field: "sellingprice", callback: (e) => vm.formatPrice(e) },
          "EXPIRY DATE": { field: "expiration_date", callback: (e) => formatDate(e).format('Do MMMM, YYYY')},
			}
		},
		
	},
	data: () => ({
		loading: true,
		reports: [],
		date: '',
    search: '',
    api : 'inventoryreport/getExpiredProduct',
    branches: [],
    headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
		},
		formData: {
			merchID: '',
			branchID: '',
			startdate: '',
      enddate: '',
      page: 1
		},
	}),
	methods: {
		formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			return nf.format(number);
			// return this.formNumber(number)
		},
		getExpiredProductReport() {
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
      
			this.$store.dispatch('inventoryreport/getExpiredProduct', this.new_data)
				.then(res =>{
					if(res.data.status){
            this.reports = res.data.data
            
            if (res.data.data != undefined && res.data.data.length > 0) {
							this.setHeaders(res.data.data, res.data.headers)
						}
						
						// this.json_data = array
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred!')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ')
				})
		},
		getBranches() {
      let vm = this
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(err =>{
          
				})
		}
	},
	mounted() {
    this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getExpiredProductReport()
		this.getBranches()
	}
}
</script>
