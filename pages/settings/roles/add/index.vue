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
              <h2>Create Role</h2>
            </div>
          <form>
            <div class="flex-width-1-1 less-gp">
              <div class="form-input">
                <label class="form-input__label">Role Name</label>
                <div class="form-input__input">
                  <input type="text" name="" id="" required v-model="formData.rolename" />
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
          <div class="mt-1">
              <h3>All Permissions</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="allPermissions" @change="isAll" />
                    </label>
                    <span class="form_input__label">Add all permissions</span>
                  </label>
                </div>
              </form>
            </div>

          <div class="d-flx-alc-jsb" style="margin-top: 1rem"  v-for="(permission , index) in permissions " :key="index">            
            <div class="flex-width-1-4 less-gp">             

              <!-- <h3>Dashboard</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox"  v-model="permission.dashboard.viewdashboard" />
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
                      <input type="checkbox"  v-model="permission.branch.viewbranches"/>
                    </label>

                    <span class="form_input__label">View branches</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.addbranches" />
                    </label>

                    <span class="form_input__label">Add branches</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.editbranch" />
                    </label>

                    <span class="form_input__label">Edit branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.deletebranch" />
                    </label>

                    <span class="form_input__label">Delete branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.createdeliveryfee" />
                    </label>

                    <span class="form_input__label">Create delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.viewdeliveryfee" />
                    </label>

                    <span class="form_input__label">View delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.viewreviews"/>
                    </label>

                    <span class="form_input__label">View reviews</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.branch.viewperformance" />
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
                      <input type="checkbox" v-model="permission.riders.viewriders" />
                    </label>

                    <span class="form_input__label">View riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.addriders" />
                    </label>

                    <span class="form_input__label">Add Riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.managecommission"/>
                    </label>

                    <span class="form_input__label">Manage Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.editrider"/>
                    </label>

                    <span class="form_input__label">Edit rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.resettoken" />
                    </label>

                    <span class="form_input__label">Reset token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.assigncommission" />
                    </label>

                    <span class="form_input__label">Assign Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.disablerider" />
                    </label>

                    <span class="form_input__label">Disable rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.riders.deleterider" />
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
                      <input type="checkbox" v-model="permission.customer.viewcustomer"/>
                    </label>

                    <span class="form_input__label">View Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.customer.addcustomer" />
                    </label>
                    <span class="form_input__label">Add Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.customer.editcustomer" />
                    </label>

                    <span class="form_input__label">Edit Customer</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.customer.deletecustomer"/>
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
                      <input type="checkbox" v-model="permission.discounts.viewdiscount"/>
                    </label>

                    <span class="form_input__label">View Discounts</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.discounts.adddiscount" />
                    </label>
                    <span class="form_input__label">Add Discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.discounts.editdiscount"/>
                    </label>

                    <span class="form_input__label">Edit discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.discounts.deletediscount"/>
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
                      <input type="checkbox" v-model="permission.orders.vieworders"/>
                    </label>

                    <span class="form_input__label">View orders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.orders.placeorder"/>
                    </label>
                    <span class="form_input__label">Place order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.orders.vieworderdetails"/>
                    </label>

                    <span class="form_input__label">View order details</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.orders.cancelorder"/>
                    </label>

                    <span class="form_input__label">Cancel order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.orders.assignrider" />
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
                      <input type="checkbox" v-model="permission.staff.viewstaff"/>
                    </label>

                    <span class="form_input__label">View staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.staff.addstaff"/>
                    </label>

                    <span class="form_input__label">Add Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.staff.changepassword"/>
                    </label>

                    <span class="form_input__label">Change Password</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.staff.resettoken" />
                    </label>

                    <span class="form_input__label">Reset Token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.staff.editstaff"/>
                    </label>

                    <span class="form_input__label">Edit Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.staff.deletestaff" />
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
                      <input type="checkbox" v-model="permission.notifications.viewnotifications"/>
                    </label>

                    <span class="form_input__label">View notifications</span>
                  </label>
                </div> -->
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.notifications.sendnotifications"/>
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
                      <input type="checkbox" v-model="permission.campaigns.viewcampaign" />
                    </label>

                    <span class="form_input__label">View campaigns</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.createloyalty" />
                    </label>

                    <span class="form_input__label">Create loyalty rule</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.updateloyaltyrule"/>
                    </label>

                    <span class="form_input__label">Edit loyalty rule</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.deleteloyaltyrule"/>
                    </label>

                    <span class="form_input__label">Delete loyalty rule</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.createpromocode"/>
                    </label>

                    <span class="form_input__label">Create Promocode</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.editpromocode"/>
                    </label>

                    <span class="form_input__label">Edit Promocode</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.campaigns.sharepromocode"/>
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
                      <input type="checkbox" v-model="permission.complaints.viewcomplaints"/>
                    </label>

                    <span class="form_input__label">View complaints</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.complaints.setresolvedstatus"/>
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
                      <input type="checkbox" v-model="permission.reports.viewreports"/>
                    </label>

                    <span class="form_input__label">View reports</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewrideronboarding"/>
                    </label>
                    <span class="form_input__label">View orders report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewriderearning"/>
                    </label>
                    <span class="form_input__label">View revenue report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewmerchantsettlement"/>
                    </label>
                    <span class="form_input__label">View riders report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewridersettlement"/>
                    </label>
                    <span class="form_input__label">View rider settlement</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewsalesreport"/>
                    </label>
                    <span class="form_input__label">View sales report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewuserrating"/>
                    </label>
                    <span class="form_input__label">View user rating</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewleasereport"/>
                    </label>
                    <span class="form_input__label">View lease report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.reports.viewdeliveryrevenue"/>
                    </label>
                    <span class="form_input__label">View Delivery Report</span>
                  </label>
                </div>
              </form>
              <h3>Settings</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewsettings"/>
                    </label>

                    <span class="form_input__label">View settings</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewroles"/>
                    </label>
                    <span class="form_input__label">View roles</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.addrole" />
                    </label>
                    <span class="form_input__label">Add role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.editrole"/>
                    </label>
                    <span class="form_input__label">Edit role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.deleterole"/>
                    </label>
                    <span class="form_input__label">Delete Role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewpermission"/>
                    </label>
                    <span class="form_input__label">View Permissions</span>
                  </label>
                </div>
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewbusinessrule"/>
                    </label>
                    <span class="form_input__label">View buiness rule</span>
                  </label>
                </div> -->
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewlease"/>
                    </label>
                    <span class="form_input__label">View Lease page</span>
                  </label>
                </div>
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewleasepayment"/>
                    </label>
                    <span class="form_input__label">View lease payment</span>
                  </label>
                </div> -->
                <!-- <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.settings.viewriderremittance"/>
                    </label>
                    <span class="form_input__label">View rider's remittance</span>
                  </label>
                </div> -->
              </form>
              <h3>Tax</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.tax.viewtax"/>
                    </label>

                    <span class="form_input__label">View Tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.tax.addtax" />
                    </label>
                    <span class="form_input__label">Add tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.tax.edittax" />
                    </label>

                    <span class="form_input__label">Edit tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" v-model="permission.tax.deletetax"/>
                    </label>

                    <span class="form_input__label">Delete tax</span>
                  </label>
                </div>
              </form>
            </div>
            
          </div>
        </section>
        <div class="d-flx-alc-jfe mt-5">
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1" @click="createRole">
              Create Role
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
    formData: {
      merchID: "",
      rolename: "",
    },
    allPermissions: false,
    permissions:[
        {
          "dashboard":{
              viewdashboard:true
          },
          "branch":{
            viewbranches:false,
            addbranches:false,
            editbranch:false,
            deletebranch:false,
            createdeliveryfee:false,
            viewdeliveryfee:false,
            viewreviews:false,
            viewperformance:false
          },
          "riders":{
            viewriders:false,
            addriders:false,
            managecommission:false,
            editrider:false,
            resettoken:false,
            assigncommission:false,
            disablerider:false,
            deleterider:false
          },
          "tax":{
            viewtax:false,
            addtax:false,
            edittax:false,
            deletetax:false
          },
          "customer":{
            viewcustomer:false,
            addcustomer:false,
            editcustomer:false,
            deletecustomer:false
          },
          "orders":{
            vieworders:false,
            placeorder:false,
            vieworderdetails:false,
            cancelorder:false,
            assignrider:false
          },
          "staff":{
            viewstaff:false,
            addstaff:false,
            changepassword:false,
            resettoken:false,
            editstaff:false,
            deletestaff:false
          },
          "notifications":{
            sendnotifications:false
          },
          "campaigns":{
            viewcampaign:false,
            createloyalty:false,
            updateloyaltyrule:false,
            deleteloyaltyrule:false,
            createpromocode:false,
            editpromocode:false,
            sharepromocode:false,
          },
          "discounts":{
            viewdiscount:false,
            adddiscount:false,
            editdiscount:false,
            deletediscount:false
          },
          "complaints":{
            viewcomplaints:false,
            setresolvedstatus:false
          },
          "reports":{
            viewreports:false,
            viewrideronboarding:false,
            viewriderearning:false,
            viewmerchantsettlement:false,
            viewridersettlement:false,
            viewsalesreport:false,
            viewuserrating:false,
            viewleasereport:false,
            viewdeliveryrevenue:false
          },
          "settings":{
            viewsettings:false,
            viewroles:false,
            addrole:false,
            editrole:false,
            deleterole:false,
            viewpermission:false,
            viewlease:false
          }
        }
      ]
  }),
  computed: {
    
  },
  methods: {
    createRole(){
      var data = {
           "merchID": this.formData.merchID,
           "rolename": this.formData.rolename,
           "rolepermission": this.permissions
      };
      $('#submitBtn').attr('disabled', true).html('Creating role....please wait')
        this.$store.dispatch('role/setPermissions',data)
          .then(res =>{
           $('#submitBtn').attr('disabled', false).html('+ Create Role')
            if(res.data.status) {
              this.$toast.success(res.data.message)
              // console.log(res)
              this.$router.push('/settings/roles/')
              // location.reload()
              return
            }
					this.$toast.error(res.data.message)
				}).catch(err =>{
					console.log(err)
				})
    },
    isAll(){
      if(this.allPermissions){
        this.permissions = [
            {
              "dashboard":{
                  viewdashboard:true
              },
              "branch":{
                viewbranches:true,
                addbranches:true,
                editbranch:true,
                deletebranch:true,
                createdeliveryfee:true,
                viewdeliveryfee:true,
                viewreviews:true,
                viewperformance:true
              },
              "riders":{
                viewriders:true,
                addriders:true,
                managecommission:true,
                editrider:true,
                resettoken:true,
                assigncommission:true,
                disablerider:true,
                deleterider:true
              },
              "tax":{
                viewtax:true,
                addtax:true,
                edittax:true,
                deletetax:true
              },
              "customer":{
                viewcustomer:true,
                addcustomer:true,
                editcustomer:true,
                deletecustomer:true
              },
              "orders":{
                vieworders:true,
                placeorder:true,
                vieworderdetails:true,
                cancelorder:true,
                assignrider:true
              },
              "staff":{
                viewstaff:true,
                addstaff:true,
                changepassword:true,
                resettoken:true,
                editstaff:true,
                deletestaff:true
              },
              "notifications":{
                sendnotifications:true
              },
              "campaigns":{
                viewcampaign:true,
                createloyalty:true,
                updateloyaltyrule:true,
                deleteloyaltyrule:true,
                createpromocode:true,
                editpromocode:true,
                sharepromocode:true,
              },
              "discounts":{
                viewdiscount:true,
                adddiscount:true,
                editdiscount:true,
                deletediscount:true
              },
              "complaints":{
                viewcomplaints:true,
                setresolvedstatus:true
              },
              "reports":{
                viewreports:true,
                viewrideronboarding:true,
                viewriderearning:true,
                viewmerchantsettlement:true,
                viewridersettlement:true,
                viewsalesreport:true,
                viewuserrating:true,
                viewleasereport:true,
                viewdeliveryrevenue:true
              },
              "settings":{
                viewsettings:true,
                viewroles:true,
                addrole:true,
                editrole:true,
                deleterole:true,
                viewpermission:true,
                viewlease:true
              }
            }
          ]
      }else{
        this.permissions = [
        {
          "dashboard":{
              viewdashboard:true
          },
          "branch":{
            viewbranches:false,
            addbranches:false,
            editbranch:false,
            deletebranch:false,
            createdeliveryfee:false,
            viewdeliveryfee:false,
            viewreviews:false,
            viewperformance:false
          },
          "riders":{
            viewriders:false,
            addriders:false,
            managecommission:false,
            editrider:false,
            resettoken:false,
            assigncommission:false,
            disablerider:false,
            deleterider:false
          },
          "tax":{
            viewtax:false,
            addtax:false,
            edittax:false,
            deletetax:false
          },
          "customer":{
            viewcustomer:false,
            addcustomer:false,
            editcustomer:false,
            deletecustomer:false
          },
          "orders":{
            vieworders:false,
            placeorder:false,
            vieworderdetails:false,
            cancelorder:false,
            assignrider:false
          },
          "staff":{
            viewstaff:false,
            addstaff:false,
            changepassword:false,
            resettoken:false,
            editstaff:false,
            deletestaff:false
          },
          "notifications":{
            sendnotifications:false
          },
          "campaigns":{
            viewcampaign:false,
            createloyalty:false,
            updateloyaltyrule:false,
            deleteloyaltyrule:false,
            createpromocode:false,
            editpromocode:false,
            sharepromocode:false,
          },
          "discounts":{
            viewdiscount:false,
            adddiscount:false,
            editdiscount:false,
            deletediscount:false
          },
          "complaints":{
            viewcomplaints:false,
            setresolvedstatus:false
          },
          "reports":{
            viewreports:false,
            viewrideronboarding:false,
            viewriderearning:false,
            viewmerchantsettlement:false,
            viewridersettlement:false,
            viewsalesreport:false,
            viewuserrating:false,
            viewleasereport:false,
            viewdeliveryrevenue:false
          },
          "settings":{
            viewsettings:false,
            viewroles:false,
            addrole:false,
            editrole:false,
            deleterole:false,
            viewpermission:false,
            viewlease:false
          }
        }
      ]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].settings.addrole:'')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
  mounted() {
    this.formData.merchID = this.user.role ? this.user.merchID : this.user.id;
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