<template>
  <overlay-scrollbars class="main-content-wrap">
     <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
         <nuxt-link  to="/settings">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax"  v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount"  v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles" class="active" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewlease:'') || isMerchant">Lease</nuxt-link>
      </div>
    </overlay-scrollbars>
    <div class="d-flx-alc-jsb page-extras">
      <div @click="from == 'transaction' ? $router.push('/settings/roles')  : $router.back()" class="text-link over">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </div>
    </div>
    <div class="inner-main-wrapper flex-width-1-1">
      <div class="py-3 px-0">
          <section class="setting-section">
            <div class="setting-section-title">
              <h2>View/Update Permission</h2>
            </div>
          <form>
            <div class="flex-width-1-1 less-gp">
              <div class="form-input">
                <label class="form-input__label">Role Name</label>
                <div class="form-input__input">
                  <input type="text" name="" id=""  v-model="roleData.rolename" />
                </div>
                <!-- <span v-if="errorData.role" class="form-input__error-msg">User role is mandatory</span> -->
              </div>
            </div>
          </form>
        </section>
        <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            
          </div>
          <h3 class="form-input__label">Permissions</h3>
          <div class="d-flx-alc-jsb" style="margin-top: 1rem" v-for="(role, ix) in roleData.rolepermission" :key="ix">
          
            <div class="flex-width-1-4 less-gp">
              <!-- <h3>Dashboard</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.dashboard.viewdashboard"/>
                    </label>

                    <span class="form_input__label">View Dashboard</span>
                  </label>
                </div>
              </form> -->
              <h3>Branch</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.viewbranches" />
                    </label>

                    <span class="form_input__label">View branches</span>
                  </label>
                  <!-- addbranches: (...)
createdeliveryfee: (...)
deletebranch: (...)
editbranch: (...)
viewbranches: (...)
viewdeliveryfee: (...)
viewperformance: (...)
viewreviews -->
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.addbranches" />
                    </label>

                    <span class="form_input__label">Add branches</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.editbranch" />
                    </label>

                    <span class="form_input__label">Edit branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.delete" />
                    </label>

                    <span class="form_input__label">Delete branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.createdeliveryfee" />
                    </label>

                    <span class="form_input__label">Create delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.viewdeliveryfee" />
                    </label>

                    <span class="form_input__label">View delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.viewreviews"/>
                    </label>

                    <span class="form_input__label">View reviews</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.branch.viewperformance"/>
                    </label>

                    <span class="form_input__label">View performance</span>
                  </label>
                </div>
              </form>
              <h3>Rider</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.viewriders"/>
                    </label>

                    <span class="form_input__label">View riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.addriders"/>
                    </label>

                    <span class="form_input__label">Add Riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.managecommission"/>
                    </label>

                    <span class="form_input__label">Manage Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.editrider"/>
                    </label>

                    <span class="form_input__label">Edit rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.riders.resettoken"/>
                    </label>

                    <span class="form_input__label">Reset token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.assigncommission"/>
                    </label>

                    <span class="form_input__label">Assign Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.disablerider" />
                    </label>

                    <span class="form_input__label">Disable rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.riders.deleterider"/>
                    </label>

                    <span class="form_input__label">Delete rider</span>
                  </label>
                </div>
              </form>
              <h3>Customers</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.customer.viewcustomer"/>
                    </label>

                    <span class="form_input__label">View Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.customer.addcustomer" />
                    </label>
                    <span class="form_input__label">Add Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.customer.editcustomer" />
                    </label>

                    <span class="form_input__label">Edit Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.customer.deletecustomer"/>
                    </label>

                    <span class="form_input__label">Delete Customer</span>
                  </label>
                </div>
              </form>
              <h3>Discount</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.discounts.viewdiscount"/>
                    </label>

                    <span class="form_input__label">View Discounts</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.discounts.adddiscount"/>
                    </label>
                    <span class="form_input__label">Add Discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.discounts.editdiscount"/>
                    </label>

                    <span class="form_input__label">Edit discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.discounts.deletediscount"/>
                    </label>

                    <span class="form_input__label">Delete discount</span>
                  </label>
                </div>
              </form>
            </div>
            <div class="flex-width-1-4 less-gp">
              <h3>Orders</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.orders.vieworders"/>
                    </label>

                    <span class="form_input__label">View orders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.orders.placeorder"/>
                    </label>
                    <span class="form_input__label">Place order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.orders.vieworderdetails"/>
                    </label>

                    <span class="form_input__label">View order details</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.orders.cancelorder" />
                    </label>

                    <span class="form_input__label">Cancel order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.orders.assignrider" />
                    </label>

                    <span class="form_input__label">Assign rider</span>
                  </label>
                </div>
              </form>
              <h3>Staff</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.staff.viewstaff"/>
                    </label>

                    <span class="form_input__label">View staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.staff.addstaff"/>
                    </label>

                    <span class="form_input__label">Add Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.staff.changepassword"/>
                    </label>

                    <span class="form_input__label">Change Password</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.staff.resettoken"/>
                    </label>

                    <span class="form_input__label">Reset Token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.staff.editstaff"/>
                    </label>

                    <span class="form_input__label">Edit Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.staff.deletestaff"/>
                    </label>

                    <span class="form_input__label">Delete Staff</span>
                  </label>
                </div>
              </form>
              <h3>Notifications</h3>
              <form>
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.notifications.viewnotifications"/>
                    </label>

                    <span class="form_input__label">View notifications</span>
                  </label>
                </div> -->
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.notifications.sendnotifications"/>
                    </label>

                    <span class="form_input__label">Send notifications</span>
                  </label>
                </div>
              </form>
               <h3>Campaigns</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.viewcampaign" />
                    </label>

                    <span class="form_input__label">View campaigns</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.createloyalty" />
                    </label>

                    <span class="form_input__label">Create loyalty</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.updateloyaltyrule"/>
                    </label>

                    <span class="form_input__label">Update loyalty rule</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.deleteloyaltyrule"/>
                    </label>

                    <span class="form_input__label">Delete loyalty rule</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.createpromocode"/>
                    </label>

                    <span class="form_input__label">Create Promocode</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.editpromocode"/>
                    </label>

                    <span class="form_input__label">Edit Promocode</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.campaigns.sharepromocode"/>
                    </label>

                    <span class="form_input__label">Share Promocode</span>
                  </label>
                </div>
              </form>
            </div>

            <div class="flex-width-1-4 less-gp">
              <h3>Complaints</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.complaints.viewcomplaints"/>
                    </label>

                    <span class="form_input__label">View complaints</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.complaints.setresolvedstatus"/>
                    </label>
                    <span class="form_input__label">Set resolve status</span>
                  </label>
                </div>
              </form>
              <h3>Reports</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewreports"/>
                    </label>

                    <span class="form_input__label">View reports</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewrideronboarding"/>
                    </label>
                    <span class="form_input__label">View rider onboarding</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewriderearning"/>
                    </label>
                    <span class="form_input__label">View rider earning</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewmerchantsettlement"/>
                    </label>
                    <span class="form_input__label">View merchant settlement</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewridersettlement"/>
                    </label>
                    <span class="form_input__label">View rider's settlement</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewsalesreport"/>
                    </label>
                    <span class="form_input__label">View sales report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewuserrating"/>
                    </label>
                    <span class="form_input__label">View user rating</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewleasereport"/>
                    </label>
                    <span class="form_input__label">View lease report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.reports.viewdeliveryrevenue"/>
                    </label>
                    <span class="form_input__label">View delivery report</span>
                  </label>
                </div>
              </form>
              <h3>Settings</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewsettings"/>
                    </label>

                    <span class="form_input__label">View settings</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewroles"/>
                    </label>
                    <span class="form_input__label">View roles</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.addrole" />
                    </label>
                    <span class="form_input__label">Add role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.editrole"/>
                    </label>
                    <span class="form_input__label">Edit role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.deleterole"/>
                    </label>
                    <span class="form_input__label">Delete Role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewpermission"/>
                    </label>
                    <span class="form_input__label">View Permissions</span>
                  </label>
                </div>
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewbusinessrule"/>
                    </label>
                    <span class="form_input__label">View business rule</span>
                  </label>
                </div> -->
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewlease"/>
                    </label>
                    <span class="form_input__label">View lease page</span>
                  </label>
                </div>
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewleasepayment"/>
                    </label>
                    <span class="form_input__label">View lease payment</span>
                  </label>
                </div> -->
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.settings.viewriderremittance"/>
                    </label>
                    <span class="form_input__label">View rider remittance</span>
                  </label>
                </div> -->
              </form>
              <h3>Tax</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.tax.viewtax"/>
                    </label>

                    <span class="form_input__label">View Tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.tax.addtax" />
                    </label>
                    <span class="form_input__label">Add tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="role.tax.edittax"/>
                    </label>

                    <span class="form_input__label">Edit tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="role.tax.deletetax"/>
                    </label>

                    <span class="form_input__label">Delete tax</span>
                  </label>
                </div>
              </form>
            </div>
            
          </div>
        </section>
        <div class="d-flx-alc-jfe mt-5">
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1" @click="updateRole">
              Update Role
            </button>
        </div>
      </div>
      
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
  layout: "main",
  data: () => ({
    roleData:[],
    formData:{
      merchID:"",
      userid:"",
      id:"",
      rolename:""
    }
  }),
  computed: {
    role() {
	    return JSON.parse(localStorage.getItem('role'))
    },
  },
  methods: {
    
    getRoles(){
      //  this.roleData = this.role
      //  console.log('role', this.roleData)
       this.$store.dispatch('role/getPermissions', this.formData)
       .then(res => {
          this.loading = false;
          this.roleData = res.data.data
          // console.log('res', this.roleData)
       }).catch(err => {
         this.loading = false;
         console.log(err)
       })
    },
    updateRole(){
         var data = {
           "merchID": this.formData.merchID,
           "rolename": this.roleData.rolename,
           "id": this.formData.id,
           "rolepermission": this.roleData.rolepermission,
           "userID":""
      };
      $('#submitBtn').attr('disabled', true).html('Updating role....please wait')
        this.$store.dispatch('role/updatePermissions',data)
          .then(res =>{
           $('#submitBtn').attr('disabled', false).html('Update Role')
            if(res.data.status) {
              this.$toast.success("Role Updated successfully")
              this.$router.push('/settings/roles/')
              return
            }
					this.$toast.error(res.data.message)
				}).catch(err =>{
					console.log(err)
				})
     }
  },
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].settings.editrole:'')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
  mounted() {
     this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
    this.formData.id = this.$route.params.id
    this.getRoles()
  },
};
</script>
<style scoped>
.setting-section-title {
  border-bottom: none;
}
.form_input__label {
  margin-left: 15px;
}
.d-flx-alc-jsb{
    align-items: flex-start;
}

h3{
  height: 30px
}
</style>