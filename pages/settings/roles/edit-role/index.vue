<template>
  <overlay-scrollbars class="main-content-wrap">
    <div id="parent-component">
      <div
        id="add-staff"
        uk-modal
        container="#parent-component"
        data-uk-modal="{bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button
            class="uk-modal-close-default"
            type="button"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Add New Role</h2>
            <!-- <p>Add staff name, description and necessary information from here</p> -->
          </div>
          <form @submit.prevent="createRole">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <div class="form-input">
                  <label class="form-input__label">User role</label>
                  <div class="form-input__input">
                    <input type="text" name="" id="" required v-model="role" />
                  </div>
                  <!-- <span v-if="errorData.role" class="form-input__error-msg">User role is mandatory</span> -->
                </div>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button
                id="submitBtn"
                type="submit"
                class="btn btn--primary ml-1"
              >
                + Create New Role
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper flex-width-1-1">
      <div class="box-deco-bg p-3">
          <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            <!-- <p>Role Name</p> -->
            <!-- <button id="roleBtn" class="btn btn--primary ml-2" @click="showModal">
               Add New Role
          </button> -->
          </div>
          <form @submit.prevent="createRole">
            <div class="flex-width-1-1 less-gp">
              <div class="form-input">
                <label class="form-input__label">Role Name</label>
                <div class="form-input__input">
                  <input type="text" name="" id="" required v-model="role" />
                </div>
                <!-- <span v-if="errorData.role" class="form-input__error-msg">User role is mandatory</span> -->
              </div>
            </div>
          </form>
        </section>
        <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            
          </div>
          <h3>Permissions:</h3>
          <div class="d-flx-alc-jsb" style="margin-top: 1rem">
            <div class="flex-width-1-4 less-gp">
              <h3>Dashboard</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View Dashboard</span>
                  </label>
                </div>
              </form>
              <h3>Branch</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View branches</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Add branches</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Edit branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Delete branch</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Create delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View delivery fee</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View reviews</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Add Riders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Manage Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Edit rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Reset token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Assign Commission</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Disable rider</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Delete rider</span>
                  </label>
                </div>
              </form>
              <h3>Tax</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View Tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Add tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Edit tax</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Delete tax</span>
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View orders</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Place order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View order details</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Cancel order</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Add Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Change Password</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Reset Token</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Edit Staff</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Delete Staff</span>
                  </label>
                </div>
              </form>
              <h3>Notifications</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View notifications</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View campaigns</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Create loyalty</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Update loyalty rule</span>
                  </label>
                </div>
              </form>
              <h3>Discount</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View Discounts</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Add Discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Edit discount</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">Delete discount</span>
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View complaints</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
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
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View reports</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View orders report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View revenue report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View riders report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View damage report</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View payment report</span>
                  </label>
                </div>
              </form>
              <h3>Settings</h3>
              <form>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>

                    <span class="form_input__label">View settings</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View roles</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Add role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Edit role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Delete Role</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View Permissions</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View Change Password page</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">View contact details page</span>
                  </label>
                </div>
                <div class="flex-width-1-1 less-gp">
                  <label class="form-input">
                    <label>
                      <input type="checkbox" />
                    </label>
                    <span class="form_input__label">Update contact details</span>
                  </label>
                </div>
              </form>
            </div>
            
          </div>
        </section>
        <div class="d-flx-alc-jfe mt-5">
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1">
              Update Role
            </button>
        </div>
        
      </div>
      
    </div>
  </overlay-scrollbars>
</template>
<script>
import BankDetails from "../../../../components/BankDetails.vue";
import DisplayEcommerce from "../../../../components/DisplayEcommerce.vue";
export default {
  layout: "main",
  components: { BankDetails, DisplayEcommerce },
  data: () => ({
    formData: {
      merchantid: "",
      businessdescription: "",
      businessfacebook: "",
      businesstwitter: "",
      merchantemailaddress: "",
      miniorderamount: "",
      businessinstagram: "",
      businesslinkedln: "",
      businessname: "",
      businesswebsite: "",
      businesslogo: "",
      endofday: "",
      rcnumber: "",
      displayeccommerce: "",
      bankname: "",
      accountnumber: "",
      accountname: "",
      thirtypartylogistics: "",
    },
    value: [
      { id: 0, text: "No" },
      { id: 1, text: "Yes" },
      // {id: 'service', text: 'Service'}
    ],
    value1: [
      { id: 0, text: "No" },
      { id: 1, text: "Yes" },
    ],
    bankErrorData: {
      bankname: false,
      accountnumber: false,
      accountname: false,
    },
    role: "",
    roles: [],
    companyErrorData: {
      businessname: false,
      businessdescription: false,
      rcnumber: false,
    },
    banks: [
      { id: "accessbank", text: "Access Bank Plc" },
      { id: "citibank", text: "Citibank Nigeria Limited" },
      { id: "diamondbank", text: "Diamond Bank Limited" },
      { id: "ecobank", text: "Ecobank Nigeria Plc" },
      { id: "enterprisebank", text: "Enterprise Trust Bank Limited" },
      { id: "fidelitybank", text: "Fidelity Bank Plc" },
      { id: "firstbank", text: "First Bank of Nigeria Plc" },
      { id: "firstcity", text: "First City Monument Bank Limited" },
      { id: "guarantytrustbank", text: "Guaranty Trust Bank Plc." },
      { id: "heritagebank", text: "Heritage Banking Company Ltd" },
      { id: "keystonebank", text: "Key Stone Bank" },
      { id: "mainstreetbank", text: "MainStreet Bank" },
      { id: "skyebank", text: "Skye Bank Plc" },
      { id: "stanbicibtc", text: "Stanbic IBTC Bank Ltd" },
      { id: "standardchartered", text: "Standard Chartered Bank Nigeria Ltd" },
      { id: "sterlingbank", text: "Sterling Bank Plc" },
      { id: "unionbank", text: "Union Bank of Nigeria Plc" },
      { id: "unitedbank", text: "United Bank For Africa Plc" },
      { id: "unitybank", text: "Unity Bank Plc" },
      { id: "wemabank", text: "Wema Bank Plc" },
      { id: "zenithbank", text: "Zenith Bank Plc" },
    ],
    userDetails: {},
  }),
  computed: {
    isCourierService() {
      return this.user.businessdescription.toLowerCase().includes("delivery");
    },
  },
  methods: {
    createRole() {
      let user_role = this.roles.push(this.role);

      UIkit.modal("#add-staff").toggle("hide");
      return user_role;
    },
    showModal() {
      // $('#add-staff').show();
      // $('#add-staff').addClass('uk-open').show()
      // this.resetFormData()
      UIkit.modal("#add-staff").toggle();
    },
    updateCompanyInformation() {
      if (this.validateCompanyInfo()) {
        return;
      }

      $("#companyInfoBtn").attr("disabled", true).html("Updating....");
      this.$store
        .dispatch("settings/updateUserInfo", this.formData)
        .then((res) => {
          $("#companyInfoBtn")
            .attr("disabled", false)
            .html("Update Information");
          if (res.data.status) {
            this.setData(res.data.data);
            this.$toast.success("Record was updated successfully");
            return;
          }

          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          $("#companyInfoBtn")
            .attr("disabled", false)
            .html("Update Information");
          console.log(e);
        });
    },
    LogisticServices() {
      $("#logistic").attr("disabled", true).html("Updating....");
      this.$store
        .dispatch("settings/updateLogisticService", this.formData)
        .then((res) => {
          $("#logistic").attr("disabled", false).html("Update Information");
          if (res.data.status) {
            this.setData(res.data.data);
            this.$toast.success("Record was updated successfully");
            return;
          }

          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          $("#logistic").attr("disabled", false).html("Update Information");
          console.log(e);
        });
    },
    validateCompanyInfo() {
      if (this.formData.businessname === "") {
        this.companyErrorData.businessname = true;
        return true;
      }

      if (this.formData.businessdescription === "") {
        this.companyErrorData.businessdescription = true;
        return true;
      }

      // if(this.formData.displayeccommerce == ''){
      // displayeccommerce: '',
      // displayeccommerce: this.userDetails.displayeccommerce,
      // }

      if (this.formData.rcnumber === "") {
        this.companyErrorData.rcnumber = true;
        return true;
      }
    },
    displayModal() {
      this.setFormData();
      UIkit.modal("#change").toggle();
    },

    setFormData() {
      this.formData = {
        merchantid: this.userDetails.id,
        businessdescription: this.userDetails.businessdescription,
        businessfacebook: this.userDetails.businessfacebook,
        businesstwitter: this.userDetails.businesstwitter,
        merchantemailaddress: this.userDetails.merchantemailaddress,
        miniorderamount: this.userDetails.miniorderamount,
        businessinstagram: this.userDetails.businessinstagram,
        businesslinkedln: this.userDetails.businesslinkedln,
        businessname: this.userDetails.businessname,
        rcnumber: this.userDetails.rcnumber,
        bankname: this.userDetails.bankname,
        accountnumber: this.userDetails.accountnumber,
        thirtypartylogistics: this.userDetails.thirtypartylogistics ? 1 : 0,
        endofday: this.userDetails.endofday ? 1 : 0,
        displayeccommerce: this.userDetails.displayeccommerce,
        accountname: this.userDetails.accountname,
        businesswebsite: this.userDetails.businesswebsite,
        businesslogo: "",
      };
    },
    searchData(nameKey) {
      for (let i = 0; i < this.banks.length; i++) {
        if (this.banks[i].id === nameKey) {
          return this.banks[i].text;
        }
      }
    },
  },
  mounted() {
    this.userDetails = this.user;
    this.setFormData();
    // this.getBanks()
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
</style>