<template>

  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <!-- <nuxt-link to="/reports" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link> -->
      <div class="search-filter d-flx-alc-jfe" >
        
        <label class="search-w-icon">
          <input v-model="search" @keyup="searchComplaints" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down filter-drop">
          <select class="filter-btn box-deco-smallr" v-model="complaintStatus" @change="filterComplaints">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select> 
        </div>
        <div class="drop-down page-drop">
            <date-picker @change="displayComplaints" v-model="date" range :placeholder="'Date Range'" type="datetime" timeTitleFormat="YYYY-MM-DD hh:mm a"  format="YYYY-MM-DD hh:mm a" value-type="format" :show-second="false"  :show-time-panel="showTimeRangePanel"
            @close="handleRangeClose">
            <template v-slot:footer>
            <button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
              {{ showTimeRangePanel ? 'select date' : 'select time' }}
            </button>
            </template>
        </date-picker>
        </div>
        
      </div>
    </div>
    <!-- resolve complaint modal -->
    <div class="parent-component">
      <div id="resolve-complaint" uk-modal container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Are you sure you want to update this complaint as resolved?</h2>
          </div>
          <form @submit.prevent="updateComplaint">
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <div class="form-input__input">
                    <textarea v-model="feedbackbody" type="text" placeholder="How was the complaint resolved?" required></textarea>
                  </div>
                </label>
              </div>
              <div class="">
                <div class="d-flx-alc-jc">
                  <button class="btn btn-no-fill" @click="closeModal">
                    Cancel
                  </button>
                  <button id="updateBtn" class="btn btn--primary ml-2" type="submit">
                    Update
                  </button>
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>

    <!-- view resolved complaint modal -->
    <div class="parent-component">
      <div id="view-resolved-complaint" uk-modal container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal" v-for="(row, index) in viewDetail" :key="index">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Complaint <span :class="'status ' + row.status.toLowerCase()">{{row.status}}</span></h2> 
            <p v-if="row.status == 'PENDING'" class="mt-1">{{row.created_at.substring(0,16)}}</p>
            <hr>           
          </div>
          <div class="modal-content">
            <div v-if="row.vendor != null">
              <p>Vendor</p>
              <h4>{{row.vendorname}}</h4>
              <hr>
            </div>
            <div v-if="row.ordercode != null">
              <p>Order ID</p>
              <h4>{{row.ordercode}}</h4>
              <hr>
            </div>
            <p>Customer</p>
            <h4>{{row.customername}}</h4>
            <hr>
            <p>Issue</p>
            <h4>{{row.feedback}}</h4>

            <div v-if="row.feedbackbody != null">
            <hr>
              <p>Reason</p>
              <h4>{{row.feedbackbody}}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text " type="button" >
          Showing <span> {{showing}} </span> of <span> {{ this.headers.Count != undefined ? this.headers.Count : 0 }} </span>
        </button>
      </div>
      <div class="d-flx-alc">
        <div>{{date[0]}} - {{date[1]}}</div>
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
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          Complaints Table
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class="large-space column-name">Customer</th>
              <th class="large-space column-name">Category</th>
              <th class="large-space column-name">Issue</th>
              
              <th class="medium-space">Date of Complaint</th>
              <th class="large-space">Status</th>				
              <th class="small-space  column-name">Action</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="8">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="8">No complaints at the moment</td>
            </tr>
            <tr v-for="(row, ix) in filteredList" v-bind:key="ix">
              <td class="column-name">{{row.customername ? row.customername: 'N/A'}}</td>
              <td class="column-name">{{row.category ? row.category: 'N/A'}}</td>
              <td class="column-name">{{row.feedback ? row.feedback : 'N/A'}}</td>
              
              <td>{{row.created_at.substring(0,16)}}</td>

              <td v-if="row.status == 'PENDING'">
                <span class="status pending">{{row.status}}</span>
              </td>
              <td v-if="row.status == 'RESOLVED'">
                <span class="status resolved">{{row.status}}</span>
              </td>              

              <td v-if="row.status == 'PENDING'">                   
                <ul style="list-style: none; padding: 0">
                  <li style="float: left"><button class="btn btn--tertiary" style="margin-right: 10px" @click="viewComplaint(row.id)">View</button></li> 
                  <li style="float: left"><button class="btn btn--primary" @click="getID(row.id)">Resolve</button></li>
                </ul>             
              </td>
              <td v-if="row.status == 'RESOLVED'" class="column-name">
                <button class="btn btn--tertiary" @click="viewComplaint(row.id)">View</button>
              </td>
            </tr>
          </tbody>
        </table>
          
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
		
	},
	data: () => ({
		loading: true,
    complaintStatus:'',
    feedbackbody: '',
    date:'',
    id: 0,
		filteredList: {},
    list: {}, 
    search: '',
    viewDetail: {},
    headers: {
			Next: '',
			Previous: '',
			Count: 0,
			total: 0,
			pagenum: 1
		},  
    formData: {
      startdate:'',
      enddate:''
    }
	}),
	mounted() {
    	this.loading = true
		this.displayComplaints()
	},
	methods: {
		displayComplaints(){
      if(this.date !== '' && this.date[0] != null) {
				this.formData.startdate = this.$moment(this.date[0]).format('YYYY-MM-DD')
				this.formData.enddate = this.$moment(this.date[1]).format('YYYY-MM-DD')
			} else {
				this.formData.startdate = ''
				this.formData.enddate = ''
			}
			this.$store.dispatch('complaints/getComplaints', this.formData)
				.then(res => {
          if(res.status){
            this.filteredList = res.data
            this.list = res.data
            this.setHeaders(res.data, res.headers)
            this.loading = false
          }
					
				}).catch(err =>{
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
			this.displayComplaints()
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
			this.displayComplaints()
		},
    getID(id){
      this.id = id
      UIkit.modal('#resolve-complaint').toggle()
      this.displayComplaints()
    },
    viewComplaint(id){
      this.id = id
      this.$store.dispatch('complaints/getComplaints', this.formData)
				.then(res => {
          if(res.status){
            this.viewDetail = res.data.filter(res => res.id == this.id)
            // console.log('detail: ', this.viewDetail)
          }					
				}).catch(err =>{
					this.$toast.error('An error occurred ' + err)
				})
      UIkit.modal('#view-resolved-complaint').toggle()
    },
    updateComplaint(){
      $('#updateBtn').attr('disabled', true).html('Updating..please wait')
      let data = {
        "id": this.id,
        "status": "RESOLVED",
        "feedbackbody": this.feedbackbody
      }
      this.$store.dispatch('complaints/updateComplaint', data)
				.then(res => {
          if(res.status){
            $('#updateBtn').attr('disabled', false).html('Update')
            UIkit.modal('#resolve-complaint').toggle('hide')
            this.feedbackbody = ''
            this.displayComplaints()
          }else{
            $('#updateBtn').attr('disabled', false).html('Update')
            this.$toast.error('An error occurred ' + res.message)
          }					
				}).catch(err =>{
					this.$toast.error('An error occurred ' + err)
				})
      
    },
    closeModal(){
      UIkit.modal('#resolve-complaint').toggle('hide')
    },
    searchComplaints(){
      this.filteredList = this.list.filter(complaint => {
        if(complaint.customername != undefined && complaint.customername.toLowerCase().includes(this.search.toLowerCase())){
          return complaint.customername.toLowerCase().includes(this.search.toLowerCase())
        }
        // else if(complaint.status != undefined && complaint.status.toLowerCase().includes(this.search.toLowerCase())){
        //   return complaint.status.toLowerCase().includes(this.search.toLowerCase())
        // }
         else if(complaint.category != undefined && complaint.category.toLowerCase().includes(this.search.toLowerCase())){
          return complaint.category.toLowerCase().includes(this.search.toLowerCase())
        }
      })
    }, 
    filterComplaints(){
       this.filteredList = this.list.filter(complaint => {
					if(this.complaintStatus == ''){
						return this.list
					}
					if(complaint.status != null && complaint.status.toLowerCase().includes(this.complaintStatus.toLowerCase())){
						return complaint.status.toLowerCase().includes(this.complaintStatus.toLowerCase())
					}				
				})
    }
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].complaints.viewcomplaints: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>

<style scoped>
hr{
  margin-top: 8px;
  margin-bottom: 6px;
}

.modal-content{
  margin-top: 16px
}
.modal-content p{
  font-size: 16px;
  margin-top: 8px
}

.modal-content h4{
  font-size: 16px;
}

.btn--primary{
  min-width: 0px;
}
.btn{
  padding: 8px 16px;
}
.btn.btn-no-fill {
  min-width: 60px;
}

.uk-h3, h3{
  height: 50px
}

form{
  margin-top: 20px
}

td .column-name{
  text-align: center
}
tr th{
  padding: 15px
}

/* .status.pending{
  background-color: #edbd39;
  color: white;
} */
</style>