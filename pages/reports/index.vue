<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="inner-main-wrapper">
      <div class="report-wrapper flex-width-1-2wgr">
        <div class="report-section">
          <h3>
           Riders
          </h3>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewrideronboarding:'') || isMerchant">
            <div>
              <h4>Onboarding</h4>
              <p>Reports of riders onboarded</p>
            </div>
            <nuxt-link to="/reports/riders-onboarding" disabled="disabled" class="btn btn--primary">View</nuxt-link>
          </div>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewriderearning:'') || isMerchant">
            <div>
              <h4>Earnings</h4>
              <p>Reports of all riders earnings</p>
            </div>
            <nuxt-link to="/reports/riders-earning" disabled="disabled" class="btn btn--primary">View</nuxt-link>
          </div>
        </div>
        <div class="report-section report3" style="margin-top:0 !important">
           <h3>Revenue Report</h3>
           <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewdeliveryrevenue:'') || isMerchant">
            <div>
              <h4>Delivery Report</h4>
              <p>Reports of revenue generated</p>
            </div>
            <nuxt-link to="/reports/delivery-revenue" class="btn btn--primary">View</nuxt-link>
          </div>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewleasereport:'') || isMerchant">
            <div>
              <h4>Lease Report</h4>
              <p>Reports of lease payment by riders</p>
            </div>
            <nuxt-link to="/reports/lease" class="btn btn--primary">View</nuxt-link>
          </div>
         </div>
         
        
         <!-- <div class="report-section report3">
           <h3>Source of Truth </h3> 
           <div class="report">
            <div>
              <h4>Transactions</h4>
              <p>Reports of all transactions</p>
            </div>
            <nuxt-link to="/reports/transactions" class="btn btn--primary">View</nuxt-link>
          </div>
          <div class="report">
            <div>
              <h4>User</h4>
              <p>Reports of all users</p>
            </div>
            <nuxt-link to="/customers/" class="btn btn--primary">View</nuxt-link>
          </div>
         </div>
           -->
        
        
        <div  class="report-section" style="margin-top:1.5rem !important">
          <h3>
            Settlement Report
          </h3>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewmerchantsettlement:'') || isMerchant">
            <div>
              <h4>Settlement Report (Merchant)</h4>
              <p>Reports of settlement for Merchant</p>
            </div>
            <nuxt-link to="" class="btn btn--primary">View</nuxt-link>
          </div>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewridersettlement:'') || isMerchant">
            <div>
              <h4>Settlement Report (Riders)</h4>
              <p>Reports of settlement for Riders</p>
            </div>
            <nuxt-link to="/reports/riders-settlement" class="btn btn--primary">View</nuxt-link>
          </div>
        </div>
        <div class="report-section report3" style="margin-top:1.5rem !important">
          <h3>
            Ratings
          </h3>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewuserrating:'') || isMerchant">
            <div>
              <h4>User Ratings</h4>
              <p>Reports on user feedbacks</p>
            </div>
            <nuxt-link to="/reports/ratings" class="btn btn--primary">View</nuxt-link>
          </div>
        </div>
        <div class="report-section report3" style="margin-top:1.5rem !important">
          <h3>
            Sales Report
          </h3>
          <div class="report" v-if="(user.rolepermission ? user.rolepermission[0].reports.viewsalesreport:'') || isMerchant">
            <div>
              <h4>Order Status Summary</h4>
              <p>Reports on all orders</p>
            </div>
            <nuxt-link to="/reports/sales-report" class="btn btn--primary">View</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </overlay-scrollbars>
</template>

<script>
export default {
	layout: 'main',
  
	computed : {
		showMenu () { 
			 return this.userData.businessdescription.toLowerCase().includes('delivery')
		},

		userData () {
			return this.$store.getters['authenticate/getUserData'];
    },
    isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},

  methods : {
    goToAllSales() {
      localStorage.removeItem('formData')
      this.$router.push('/reports/all-sales/') 
    }
  },
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].reports.viewreports: '')){
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
.report-section {
  height: fit-content !important;
}

.report3 {
   margin-top: 1.5rem !important;
}
</style>
