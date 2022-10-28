<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link
        to="/order/"
        class="btn btn--primary"
        v-if="
          (user.rolepermission
            ? user.rolepermission[0].orders.placeorder
            : '') || isMerchant
        "
        >Place an Order</nuxt-link
      >
      <!-- <button class="btn btn-no-fill" disabled v-if="(user.rolepermission ? user.rolepermission[0].orders.placeorder:'') || isMerchant">Place a Food Order</button> -->
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            @keyup="searchFilter"
          />
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down filter-drop">
          <select
            v-model="sortData.paymentmethod"
            class="filter-btn box-deco-smallr"
            @change="sortOrders"
          >
            <option value="">All Payment Methods</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="cash">Cash</option>
            <option value="banktransfer">Bank Transfer</option>
          </select>
        </div>
        <div class="drop-down filter-drop">
          <select
            v-model="sortData.orderstatus"
            @change="sortOrders"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="in_transit">In Transit</option>
            <option value="completed">Completed</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancel">Cancelled</option>
          </select>
        </div>

        <!-- <div class="drop-down filter-drop">
          <select v-model="sortData.ordertype" class="filter-btn box-deco-smallr" @change="sortOrders">
            <option value="">All Types</option>
            <option value="express">Express</option>
            <option value="pool">Pool</option>            
          </select>
        </div> -->
        <div class="drop-down filter-drop">
          <select
            v-model="orderCategory"
            class="filter-btn box-deco-smallr"
            @change="filterCategory"
          >
            <option value="">All Category</option>
            <option value="delivery">Delivery</option>
            <option value="food">Food</option>
          </select>
        </div>
      </div>
    </div>
    <pagination :headers="headers" v-model="orderData.page" @go="listOrders" />
    <div id="parent-component">
      <!-- Assign rider -->
      <div
        id="assign-rider"
        uk-modal
        data-uk-modal="{target:'#assign-rider',bgclose:false}"
        container="#parent-component"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="closeAssignRider"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Assign Rider to Order</h2>
            <p>Assigned rider will be in charge of delivering order</p>
          </div>
          <form @submit.prevent="assignRider">
            <div class="modal-body" uk-overflow-auto>
              <label class="form-input">
                <!-- <span class="form-input__label">Choose Rider</span> -->
                <div class="form-input__input">
                  <select
                    v-model="formData.riderID"
                    class="filter-btn box-deco-smallr"
                  >
                    <option value="">Select Rider</option>
                    <option
                      v-if="
                        rider.riderstatus != 'offline' &&
                        rider.riderstatus != null &&
                        rider.active
                      "
                      v-for="rider in riders"
                      :value="rider.id"
                      v-bind:key="rider.id"
                    >
                      {{ rider.riderfirstname }} {{ rider.riderlastname }}
                    </option>
                    <!-- <option value="" v-else>
						No rider is online at the moment
					</option> -->
                  </select>
                </div>
                <span v-if="riderError" class="form-input__error-msg"
                  >Please select a rider</span
                >
              </label>
            </div>
            <div class="d-flx-alc-jfe">
              <button
                type="button"
                @click="closeAssignRider"
                class="btn btn-no-fill uk-modal-close mt-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="assignBtn"
                class="btn btn--primary ml-1"
              >
                Assign rider
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- View order details -->
      <order-details ref="order_details" />
    </div>

    <!-- <overlay-scrollbars class="table-wrapper"> -->
    <div style="overflow-x: auto">
      <!-- <figcaption class="sr">
          A table showing information of orders
        </figcaption> -->
      <table class="table-content">
        <thead class="">
          <tr>
            <!-- <th></th> -->
            <th class="large-space column-name">Customer</th>
            <th class="medium-space column-name">Order ID</th>
            <th class="small-space column-name">Category</th>
            <th class="medium-space column-name">Amount (₦)</th>
            <th class="medium-space column-name">Payment Method</th>
            <th class="large-space column-name">Rider</th>
            <th class="small-space column-name">Order Status</th>
            <th class="small-space column-name">Payment Status</th>
            <th class="medium-space column-name">Order Date/Time</th>
            <th
              class="smaller-space column-name"
              v-if="
                (user.rolepermission
                  ? user.rolepermission[0].orders.vieworderdetails
                  : '') || user.rolepermission
                  ? user.rolepermission[0].orders.assignrider
                  : '' || isMerchant
              "
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody class="tablebody">
          <tr v-if="loading" style="align-content: center">
            <td colspan="10">Loading..please wait</td>
          </tr>
          <tr
            v-if="!loading && filteredList.length < 1"
            style="align-content: center"
          >
            <td colspan="10">No orders at the moment</td>
          </tr>
          <tr
            v-if="!loading && filteredList.length > 0"
            v-for="(row, ix) in filteredList"
            :key="ix"
            style="cursor: pointer"
          >
            <td class="column-name">
              <div>
                {{ getOrderName(row) }}
              </div>
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              style="color: #28a745"
              class="column-name"
            >
              {{ row.ordercode }}
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name"
            >
              {{ row.ordercategory }}
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name"
            >
              {{ formatPrice(row.ordertotal) }}
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name"
            >
              {{
                row.paymentmethod == "banktransfer"
                  ? "Bank Transfer"
                  : row.paymentmethod
              }}
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              v-if="row.riderID === null"
              class="column-name"
            >
              <span class="">N/A</span>
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name avatar-wtext"
              v-else
            >
              <i
                v-if="row.riderstatus == 'online'"
                class="online"
                title="Online"
              ></i>
              <i
                v-if="row.riderstatus == 'offline'"
                class="offline"
                title="Offline"
              ></i>
              <i
                v-if="row.riderstatus == null"
                class="unavailable"
                title="Unavailable"
              ></i>
              <span>{{ row.riderfirstname }} {{ row.riderlastname }}</span>
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name"
            >
              <span
                :class="
                  'status ' +
                  (row.orderstatus !== undefined
                    ? row.orderstatus.toLowerCase()
                    : '')
                "
                >{{
                  row.orderstatus.includes("cancel")
                    ? "CANCELLED"
                    : row.orderstatus.replace("_", " ").toUpperCase()
                }}</span
              >
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="tx-c column-name"
            >
              <span
                :class="
                  'status ' +
                  (row.paymentstatus !== undefined
                    ? row.paymentstatus.toLowerCase()
                    : '')
                "
                class="column-name"
                >{{ row.paymentstatus.replace("_", " ").toUpperCase() }}</span
              >
            </td>
            <td
              title="View order details"
              @click="orderDetails(row)"
              class="column-name"
            >
              {{
                row.orderstatus.toLowerCase() == "scheduled"
                  ? $moment(row.scheduletime).format("MMM Do YYYY hh:mma")
                  : $moment(row.transactiondate).format("MMM Do YYYY hh:mma")
              }}
            </td>
            <td
              title="View order details"
              v-if="
                (user.rolepermission
                  ? user.rolepermission[0].orders.vieworderdetails
                  : '') || user.rolepermission
                  ? user.rolepermission[0].orders.assignrider
                  : '' || isMerchant
              "
            >
              <button
                v-if="
                  (row.riderID === null ||
                    row.orderstatus.toLowerCase() == 'rejected') &&
                  row.ordermethod !== 'pick up' &&
                  row.orderstatus.toLowerCase() !== 'cancel' &&
                  ((user.rolepermission
                    ? user.rolepermission[0].orders.assignrider
                    : '') ||
                    isMerchant)
                "
                class="btn btn--tertiary"
                title="Assign Rider"
                @click="displayAssignRiderModal(row)"
                type="button"
              >
                <!-- <svg>
                    <use href="/uploads/icons.svg#hover"></use>
                  </svg> -->
                Assign
              </button>
              <button
                class="btn btn--primary"
                style="padding: 8px 16px"
                title="View order details"
                @click="orderDetails(row)"
                type="button"
                v-if="
                  (user.rolepermission
                    ? user.rolepermission[0].orders.vieworderdetails
                    : '') || isMerchant
                "
              >
                <!-- <svg>
                    <use xlink:href="/uploads/icons.svg#view"></use>
                  </svg> -->
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- </overlay-scrollbars> -->
  </overlay-scrollbars>
</template>
<script>
import OrderDetails from "../../components/OrderDetails.vue";
import Pagination from "../../components/Pagination.vue";
export default {
  components: { OrderDetails, Pagination },
  layout: "main",

  data: () => ({
    orderCategory: "",
    headers: {
      Next: "",
      Prev: "",
      count: 0,
      total: 0,
      pagenum: 1,
    },
    search: "",
    date: "",
    loading: true,
    formData: {
      merchID: "",
      riderID: "",
      orderID: "",
    },
    riderData: {
      merchID: "",
      startdate: "",
      enddate: "",
      branchID: "",
      riderID: "",
      export: "",
    },
    orderData: {
      merchID: "",
      page: 1,
    },
    orderSort: [],
    orderDetailsData: {
      items: [],
      tax: 0,
      orderid: "",
      orderstatus: "",
      customername: "",
      customerphone: "",
      deliveryaddress: "",
      profilelink: "",
      deliverycharge: 0,
      rider: {
        id: "",
        phone: "",
        name: "",
        regnumber: "",
        photo: "",
      },
      staff: {
        photo: "",
        name: "",
        phone: "",
      },
    },
    riderError: false,
    riderslist: [],
    type: "",
    category: "",
    orderstatus: "",
    sortData: {
      merchID: "",
      orderstatus: "",
      paymentmethod: "",
      ordercategory: "",
    },
    order: {},
    filteredList: {},
  }),

  computed: {
    userData() {
      return this.$store.getters["authenticate/getUserData"];
    },

    isCourierService() {
      return this.userData.businessdescription != undefined
        ? this.userData.businessdescription.toLowerCase().includes("delivery")
        : false;
    },
    isFood() {
      return this.userData.businessdescription != undefined
        ? this.userData.businessdescription.toLowerCase().includes("food")
        : false;
    },

    // orders () {
    // 	if(this.isSupervisor){
    // 		return this.orderSort.filter( (order) => this.type != '' ? order.ordertype == this.type : true && this.user.branchID == order.branchID);
    // 	} else {
    // 		return this.orderSort.filter( (order) => this.type != '' ? order.ordertype == this.type : true);
    // 	}
    // },
    riders() {
      return this.riderslist.filter(
        (ride) => ride.branchID == this.order.branchID
      );
    },
    // filteredList () {
    // 	let vm = this;
    // 	return this.orders.filter(order => {
    // 		if (order.ordercode !== undefined && order.ordercode.toLowerCase().includes(this.search.toLowerCase())) {
    // 			return order.ordercode.toLowerCase().includes(this.search.toLowerCase());
    // 		}
    // 		if (order.sendername !== undefined && order.sendername.toLowerCase().includes(this.search.toLowerCase())) {
    // 			return order.sendername.toLowerCase().includes(this.search.toLowerCase());
    // 		}
    // 		console.log(vm.orderstatus)
    // 		if(vm.orderstatus.toLowerCase() !== ''){
    // 			return order.orderstatus.toLowerCase().includes(vm.orderstatus.toLowerCase())
    // 		}
    // 	});
    // }
  },
  methods: {
    copyLink(link) {
      let vm = this;
      this.$copyText(link).then(
        function (e) {
          vm.$toast.success("Delivery Pin copied to clipboard");
        },
        function (e) {
          vm.$toast.error("An error occurred.Cannot copy.");
        }
      );
    },
    searchFilter() {
      this.filteredList = this.orderSort.filter((order) => {
        if (
          order.ordercode !== undefined &&
          order.ordercode.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return order.ordercode
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
        let customername = order.firstname + " " + order.lastname;
        if (
          customername !== undefined &&
          customername !== "" &&
          customername.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return customername.toLowerCase().includes(this.search.toLowerCase());
        }
        if (
          order.paymentstatus !== undefined &&
          order.paymentstatus.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return order.paymentstatus
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
      });
    },
    // filterStatus () {
    // 	this.filteredList = this.orderSort.filter(order => {
    // 		if(order.orderstatus !== undefined && order.orderstatus.toLowerCase().includes(this.orderstatus.toLowerCase())){
    // 			return order.orderstatus.toLowerCase().includes(this.orderstatus.toLowerCase())
    // 		}
    // 	});

    // },
    // filterPaymentMethod () {
    // 	this.filteredList = this.orderSort.filter(order => {
    // 		if(order.paymentmethod !== undefined && order.paymentmethod.toLowerCase().includes(this.sortData.paymentmethod.toLowerCase())){
    // 			return order.paymentmethod.toLowerCase().includes(this.sortData.paymentmethod.toLowerCase());
    // 		}
    // 	});

    // },
    // filterType() {
    // 	this.filteredList = this.orderSort.filter(order => {
    // 		if(order.ordermethod !== undefined && order.ordermethod.toLowerCase().includes(this.type.toLowerCase())){
    // 			return order.ordermethod.toLowerCase().includes(this.type.toLowerCase());
    // 		}
    // 	});
    // },
    filterCategory() {
      this.filteredList = this.orderSort.filter((order) => {
        if (this.orderCategory == "") {
          return this.orderSort;
        }
        if (
          order.ordercategory !== undefined &&
          order.ordercategory
            .toLowerCase()
            .includes(this.orderCategory.toLowerCase())
        ) {
          return order.ordercategory
            .toLowerCase()
            .includes(this.orderCategory.toLowerCase());
        }
      });
    },
    getAmount(paymentdetails, method) {
      if (paymentdetails.length > 0) {
        let details = paymentdetails.filter((x) => {
          if (x.paymentmethod) {
            return x.paymentmethod.toLowerCase().includes(method);
          }
          return false;
        });
        if (details.length == 1) {
          return details[0].paymentamount;
        }
      }
      return "";
    },

    getTax(taxes, id) {
      if (taxes.length > 0) {
        let details = taxes.filter((x) => x.tax_id == id);
        if (details.length == 1) {
          return details[0].value;
        }
      }
      return "";
    },

    getOrderName(row) {
      if (row.customerID == null) {
        return "N/A";
      } else {
        return row.firstname + " " + row.lastname;
      }
    },

    getOrderPhone(row) {
      if (this.isCourierService) {
        return row.senderphone != undefined && row.senderphone != ""
          ? row.senderphone
          : row.recieverphonenumber != undefined &&
            row.recieverphonenumber != ""
          ? row.recieverphonenumber
          : "";
      } else {
        return row.phonenumber;
      }
    },
    nextData() {
      if (this.headers.Next === "") {
        return;
      }
      let page = +this.orderData.page + +1;

      this.orderData.page = page;
      this.listOrders();
    },
    previousData() {
      if (this.headers.Prev === "") {
        return;
      }
      let page = +this.orderData.page - +1;
      if (page < 0) {
        this.orderData.page = 1;
        return;
      }
      this.orderData.page = page;
      this.listOrders();
    },
    listOrders() {
      this.$store
        .dispatch("orders/listOrders", this.orderData)
        .then((res) => {
          if (res.data.status) {
            this.orderSort = res.data.data;
            this.filteredList = res.data.data;
            if (res.data.data != undefined && res.data.data.length > 0) {
              this.setHeaders(this.orderSort, res.data.headers);
            }
            this.loading = false;
            return;
          }
          this.loading = false;
          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    sortOrders() {
      this.loading = true;
      // console.log(this.sortData)
      this.$store
        .dispatch("orders/sortOrders", this.sortData)
        .then((res) => {
          if (res.data.status) {
            this.filteredList = res.data.data;
            this.orderSort = res.data.data;
            this.loading = false;
          }
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    getRiders() {
      this.$store
        .dispatch("riders/getRiders", this.riderData)
        .then((res) => {
          this.riderslist = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    orderDetails(order) {
      this.$refs.order_details.setOrder(order);
    },
    assignRider() {
      this.riderError = false;
      if (this.formData.riderID === "") {
        this.riderError = true;
        return;
      }
      $("#assignBtn").attr("disabled", true).html("Assigning....please wait");
      this.$store
        .dispatch("orders/assignRider", this.formData)
        .then((res) => {
          $("#assignBtn").attr("disabled", false).html("Assign Rider");
          if (res.data.status) {
            let rider = this.riders.find(
              (rider) => rider.id == this.formData.riderID
            );

            let order = this.orderSort.find(
              (order) => order.id == this.formData.orderID
            );
            order.riderfirstname = rider.riderfirstname;
            order.riderphonenumber = rider.riderphonenumber;
            order.riderID = rider.riderID;
            order.riderlastname = rider.riderlastname;
            order.riderphoto = rider.riderphoto;

            // console.log(this.orderSort.find((order) => order.id == this.formData.orderID ))

            // rider.riderlastname
            // rider.riderphoto

            this.closeAssignRider();
            this.$toast.success(res.data.message);
            // this.listOrders()
            // this.getRiders()
            return;
          }

          this.$toast.error(res.data.message);
        })
        .catch((err) => {
          this.$toast.error(res.data.message);
          $("#assignBtn").attr("disabled", false).html("Assign Rider");
          console.log(err);
        });
    },
    closeOrderDetails() {
      this.clearOrderDetails();
      $("#order-details").removeClass("uk-open").hide();
    },
    displayAssignRiderModal(order) {
      this.formData.orderID = order.id;
      this.order = order;
      $("#assign-rider").addClass("uk-open").show();
    },
    closeAssignRider() {
      this.formData.orderID = "";
      $("#assign-rider").removeClass("uk-open").hide();
    },
    clearOrderDetails() {
      this.orderDetailsData = {
        items: [],
        orderid: "",
        orderstatus: "",
        tax: 0,
        customername: "",
        customerphone: "",
        deliveryaddress: "",
        profilelink: "",
        deliverycharge: 0,
        rider: {
          id: "",
          phone: "",
          name: "",
          regnumber: "",
        },
        staff: {
          name: "",
          photo: "",
          phone: "",
        },
      };
    },
    calculateSubTotal(items) {
      let sum = 0;
      items.forEach(function (value, index, array) {
        sum += value.totalprice;
      });
      return sum;
    },
    calculateTotal(items) {
      let total = 0;
      let sum = 0;
      items.forEach(function (value, index, array) {
        sum += value.totalprice;
      });
      let tax = 0;
      if (this.orderDetailsData.tax > 0) {
        tax = (this.orderDetailsData.tax / 100) * sum;
      }

      total = +sum + +tax + +this.orderDetailsData.deliverycharge;
      return total;
    },
  },
  mounted() {
    this.formData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.sortData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.orderData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.riderData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.listOrders();
    this.getRiders();
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      user.role == undefined ||
      (user.rolepermission ? user.rolepermission[0].orders.vieworders : "")
    ) {
      next();
    } else {
      alert("You have not been permitted to view this page");
      next({ path: "/dashboard" });
    }
  },
};
</script>
<style scoped>
td.column-name i.online {
  width: 10px;
  height: 10px;
  background-color: forestgreen;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
}
td i.offline {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
}
td i.unavailable {
  width: 20px;
  height: 20px;
  background-color: gold;
  border-radius: 50%;
  padding: 5px;
  margin-right: 10px;
}
.btn--primary {
  min-width: 75px;
  margin-top: 10px;
}
.btn {
  padding: 8px 16px;
}
.btn.btn-no-fill {
  min-width: 60px;
}

.order-wait {
  width: 100%;
  display: flex;
  height: 70px;
  border-radius: 10px;
  border-top: 3px solid lightgreen;
  box-shadow: -1px 3px 1px 1px #dfdfdf;
  margin-bottom: 15px;
  background: #fff;
  justify-content: center;
  align-items: center;
}
.order-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 210px;
  border-radius: 10px;
  border-top: 3px solid lightgreen;
  box-shadow: -1px 3px 1px 1px #dfdfdf;
  margin-bottom: 15px;
  background: #fff;
  align-items: center;
}
.order-details {
  width: 95%;
  height: 60px;
  border-bottom: 1px solid lightgreen;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.order-details .order-confirm {
  background: lightgreen;
  padding: 5px;
  border-radius: 5px;
  color: #fff;
}

.order-cum-info {
  width: 95%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}

.order-id {
  font-weight: bolder;
}
.order-time {
  flex: 0 1 73%;
  /* padding-left: 15px; */
}
.customer,
.delivery {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
}
.order-cum-info .delivery {
  flex: 0 1 35%;
}
.order-cum-info .action {
  display: flex;
  align-items: center;
}
.order-cum-info .action button {
  display: flex;
  flex-direction: column;
}
.order-cum-info .action > .reject {
  background: red;
  height: 90px;
  color: #ffffff;
  margin-right: 15px;
  padding: 15px;
  border-radius: 10px;
}
.order-cum-info .action > .accept {
  background: green;
  height: 90px;
  color: #fff;
  padding: 15px;
  border-radius: 10px;
}
@media screen and (max-width: 800px) {
  .order-container,
  .order-details,
  .order-cum-info {
    height: auto;
  }
  .action {
    margin: 0 auto;
    padding-bottom: 20px;
  }
  .accept,
  .reject {
    height: 30px;
    margin-top: 10px;
  }
}
@media screen and (max-width: 1219px) {
  .order-details .order-confirm {
    margin-bottom: 10px;
  }
}
.avatar-wtext i.online {
  width: 10px;
  height: 10px;
  background-color: forestgreen;
  border-radius: 50%;
  margin-right: 4px;
}
.avatar-wtext i.offline {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
  margin-right: 4px;
}
.avatar-wtext i.unavailable {
  width: 10px;
  height: 10px;
  background-color: gold;
  border-radius: 50%;
  margin-right: 4px;
}
table.table-content {
  width: 100%;
}
</style>
