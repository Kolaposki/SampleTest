<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <label class="search-w-icon">
        <input v-model="search" type="text" placeholder="Search">
        <svg>
          <use href="/uploads/icons.svg#search"></use>
        </svg>
      </label>
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
            <th class="large-space column-name">Operation Name</th>
            <th class="column-name">Status</th>
            <th class="column-name">Time stamp</th>
            <th class="column-name">Event Initiated by</th>
            <th class="column-name">Action</th>
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
              <td class="column-name">{{ row.operationname }}</td>
              <td class="column-name" v-if="row.status==true">Successful</td>
              <td class="column-name" v-else>Failed</td>
              <td class="column-name">{{$moment(row.created_at).format('Do MMMM YYYY, h:mm a')}}</td>
              <td class="column-name">{{ row.user}}</td>
              <td class="column-name"><button type="submit" @click="viewactivity()" class="btn btn--primary mt-1" >
              View Details
                </button></td>
            </tr>
          </tbody>
        </table>
        <div id="view-activity" uk-modal data-uk-modal="{target:'#view-activity',bgclose:false}" container="#parent-component">
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeviewactivity">X</button>
            <div class="modal-header">
              <h2>
                View Activity Details
              </h2>
            </div>
            <!-- <div v-for="(row, ix) in filteredList" v-bind:key="ix">
              <h4 v-if="row.status==true">Operation Status: Successful</h4>
              <h4 v-else>Operation Status: Failed</h4>
              <h4>Operation performed by {{row.user}}</h4>
            </div> -->
            
        </div>
        </div>
      </overlay-scrollbars>
    </div>
    
  </overlay-scrollbars>
  
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.activities.filter(activity => {
				if (activity.operationname !=null && activity.operationname.toLowerCase().includes(this.search.toLowerCase())) {
					return activity.operationname !=null && activity.operationname.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		activities: [],
		search: '',
		loading: true,
		formData: {
			merchID: '',
			startdate: '2022-05-03 12:00 am',
			enddate: '2022-05-04 12:00 am'
		},
	}),
	methods: {
	  getActivityLog() {
	    this.$store.dispatch('license/getActivityLog', this.formData)
				.then(res =>{
					if(res.data.status) {
						this.activities = res.data.data
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
		},
    viewactivity(){
      $('#view-activity').addClass('uk-open').show();
    },
    closeviewactivity(){
      $('#view-activity').removeClass('uk-open').hide();
    },
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getActivityLog() 
  }
}
</script>