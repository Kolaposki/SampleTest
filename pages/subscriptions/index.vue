<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <label class="search-w-icon">
        <input v-model="search" type="text" placeholder="Search">
        <svg>
          <use href="/uploads/icons.svg#search"></use>
        </svg>
      </label>
      <nuxt-link to="/subscriptions/new" class="btn btn--primary" type="button">
        + New Subscription
      </nuxt-link>
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
            <th class="large-space column-name">License</th>
            <th class="column-name">Ref No.</th>
            <th class="column-name">Duration</th>
            <th class="column-name">Date subscribed</th>
            <th class="column-name">Expiry Date</th>
            <th class="column-name">Status</th>
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
              <!-- <td></td> -->
              <td class="column-name">{{ row.licensename }}</td>
              <td class="column-name">{{ row.transreference }}</td>
              <td class="column-name">{{ row.duration }}</td>
              <td class="column-name">{{ $moment(row.created_at).format('Do MMMM YYYY, h:mm a')}}</td>
              <td class="column-name">{{ $moment(row.expirationdate).format('Do MMMM YYYY, h:mm a')}}</td>
              <td v-if="calculateExpiry(row.expirationdate)" class="column-name"><span class="rating low">Inactive</span></td>
              <td v-if="!calculateExpiry(row.expirationdate)" class="column-name"><span class="rating high">Active</span></td>
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
			return this.subscriptions.filter(subscription => {
				if (subscription.licensename.toLowerCase().includes(this.search.toLowerCase())) {
					return subscription.licensename.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		subscriptions: [],
		search: '',
		loading: true,
		formData: {
			merchID: ''
		}
	}),
	methods: {
	  getMerchantSubs() {
	    this.$store.dispatch('license/getMerchantSubscriptions', this.formData)
				.then(res =>{
					if(res.data.status) {
						this.subscriptions = res.data.data
            // console.log(this.subscriptions)
						this.loading = false
						return
					}
          
					this.loading = false
					this.$toast.error('An error has occurred')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error has occurred')
				})
		},
		calculateExpiry(date) {
	    let now = this.$moment().format('YYYY-MM-DD')
			let expiry = this.$moment(date).format('YYYY-MM-DD')
			if(this.$moment(now).isAfter(expiry)) {
				return true
			}else{
			  return false
			}
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getMerchantSubs()
	}
}
</script>