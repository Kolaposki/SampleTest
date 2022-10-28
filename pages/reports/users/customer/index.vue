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
          <date-picker @change="getCustomerReport" v-model="date" range :placeholder="'Date Range'" type="datetime"></date-picker>
        </div>
        <download-excel
          class="btn btn--primary"
          :data="json_data"
          :fields="json_fields"
          worksheet="My Worksheet"
          name="customer-list-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

    <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text " type="button" >
          Showing <span> 1-20 </span> of <span> {{ this.headers.count }} </span>
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
            <!-- <th>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </th> -->
            <th class=" small-space ">Image</th>
            <th class=" large-space ">Name</th>
            <th class="large-space">Mobile</th>
            <th class="larger-space">Email</th>
            <th class="large-space">Ist order</th>
            <th class="small-space">Total order</th>
            <th class="large-space">Last order</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && filteredList.length < 1">
            <td colspan="8">No customer record have been added</td>
          </tr>
          <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix" @click="viewCustomerDetails(row)">
            <!-- <td>
              <div class="d-flx-alc-jc">
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </div>
            </td> -->
            <td>
              <a href="javascript:;" class="avatar-wtext">
                <img v-if="row.profilelink === '' || row.profilelink === null || row.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
                <img v-else-if="row.profilelink.includes('http://') && row.profilelink.includes('https://')" :src="row.profilelink.replace('http://68.65.121.57:8080/', '')" alt="">
                <img v-else :src="row.profilelink" alt="">
              </a>
            </td>
            <td>{{ row.firstname }} {{ row.lastname }}</td>
            <td>{{ row.phonenumber }}</td>
            <td class="email">{{ row.emailaddress }}</td>
            <td>{{ $moment(row.firstorderdate).format('Do, MMM YYYY') }}</td>
            <td class="text-center">{{ row.customeorderhistory.length }}</td>
            <!-- <td>
              <span v-if="row.userrate <= 2" class="rating low">
                <svg class="">
                  <use xlink:href="/uploads/icons.svg/#star"></use>
                </svg>
                <span>
                  {{ row.userrate }}
                </span>
              </span>
              <span v-if="row.userrate > 2" class="rating high">
                <svg class="">
                  <use xlink:href="/uploads/icons.svg/#star"></use>
                </svg>
                <span>
                  {{ row.userrate }}
                </span>
              </span>
            </td> -->
            <td>{{ $moment(row.lastorderdate).format('Do, MMM YYYY') }}</td>
          </tr>
          </tbody>
<!--          <tbody class="tablebody">-->
<!--            <tr v-if="loading">-->
<!--              <td colspan="8">Loading...please wait</td>-->
<!--            </tr>-->
<!--            <tr v-if="!loading && filteredList.length < 1">-->
<!--              <td colspan="8">No record at the moment</td>-->
<!--            </tr>-->
<!--            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix" @click="viewCustomerDetails(row)">-->
<!--              <td>-->
<!--                <label class="input-check">-->
<!--                  <input class="uk-checkbox" type="checkbox">-->
<!--                </label>-->
<!--              </td>-->
<!--              <td>-->
<!--                <div class="avatar-wtext">-->
<!--                  <span>{{ row.firstname }} {{ row.lastname }}</span>-->
<!--                </div>-->
<!--              </td>-->
<!--              <td>{{ row.phonenumber }}</td>-->
<!--              <td style="color: #28A745;">{{ row.emailaddress }}</td>-->
<!--              &lt;!&ndash; <td>{{ Math.floor(row.userrate) }}</td> &ndash;&gt;-->
<!--              <td>{{ $moment(row.firstorderdate).format('Do MMMM, YYYY') }}</td>-->
<!--              <td>{{ $moment(row.lastorderdate).format('Do MMMM, YYYY') }}</td>-->
<!--              <td>-->
<!--                <button class="btn btn-icon" @click="viewCustomerDetails(row)" title="View order history" type="button">-->
<!--                  <svg>-->
<!--                    <use href="/uploads/icons.svg#toq-file"></use>-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </td>-->
<!--            </tr>-->
<!--          </tbody>-->
        </table>
      </overlay-scrollbars>

      <div id="order-details" uk-modal>
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
  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.reports.filter(report => {
				if(report.firstname.toLowerCase().includes(this.search.toLowerCase())) {
					return report.firstname.toLowerCase().includes(this.search.toLowerCase());
				} else if (report.lastname.toLowerCase().includes(this.search.toLowerCase())){
					return report.lastname.toLowerCase().includes(this.search.toLowerCase());
				} else {
					return report.emailaddress.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		loading: true,
		reports: [],
		search: '',
		date: '',
		formData: {
			merchID: '',
			page: 1,
			startdate: '',
			enddate: ''
		},
		headers: {
		  Next: '',
			Prev: '',
			count: 0
		},
		json_fields: {
			"CUSTOMER NAME": "customername",
			"CONTACT": "contact",
			"EMAIL": "email",
			"RATING": "rating",
			"FIRST ORDER DATE": "firstorderdate",
			"LAST ORDER DATE": "lastorderdate"
		},
		json_data: []
	}),
	methods: {
		nextData() {
			if(this.headers.Next === "") {
				return
			}
			let page = +this.formData.page + +1

			this.formData.page = page
			this.getCustomerReport()
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
			this.getCustomerReport()
		},
	  getCustomerReport() {
	    this.loading = true

			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}

			this.$store.dispatch('usersreport/getCustomerReport', this.formData)
				.then(res => {
					if(res.data.status) {
						this.reports = res.data.data.data
						this.headers = {
							Next: res.data.data.Next,
							Prev: res.data.data.Prev,
							count: res.data.data.Count
						}
						let array = []
						let formatDate = this.$moment
						if (res.data.data.length > 0) {
							this.reports.forEach(function (e) {
								let data = {
									customername: e.firstname + ' ' + e.lastname,
									contact: e.phonenumber,
									email: e.emailaddress,
									rating: e.userrate,
									firstorderdate: formatDate(e.firstorderdate).format('Do MMMM, YYYY'),
									lastorderdate: formatDate(e.lastorderdate).format('Do MMMM, YYYY')
								}
								array.push(data)
							})
							this.json_data = array
						}
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
		},
		sortCustomerReport() {
	    this.loading = true

			if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}

			this.formData.page = 1

			this.$store.dispatch('usersreport/getCustomerReport', this.formData)
				.then(res =>{
				  // console.log(res)
					if(res.data.status) {
						this.reports = res.data.data.data
						this.headers = {
							Next: res.data.data.Next,
							Prev: res.data.data.Prev,
							count: res.data.data.Count
						}
						let array = []
						let formatDate = this.$moment
						if(res.data.data.length > 0) {
							this.reports.forEach(function (e) {
								let data = {
									customername: e.firstname + ' ' + e.lastname,
									contact: e.phonenumber,
									email: e.emailaddress,
									rating: e.userrate,
									firstorderdate: formatDate(e.firstorderdate).format('Do MMMM, YYYY'),
									lastorderdate: formatDate(e.lastorderdate).format('Do MMMM, YYYY')
								}
								array.push(data)
							})
							this.json_data = array
						}
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
		},

		viewCustomerDetails(customer) {
			localStorage.removeItem('customer')
			this.$store.dispatch('customers/setCustomer', customer)
			this.$router.push('/customers/details/' + customer.id)
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getCustomerReport()
	}
}
</script>
