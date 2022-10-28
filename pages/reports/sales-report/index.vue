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
          <input
            v-model="search"
            type="text"
            @keyup="filteredOrder"
            placeholder="Search"
          />
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down filter-drop">
          <select
            v-model="paymentMethod"
            @change="paymentMethodFilter()"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="banktransfer">Bank Transfer</option>
          </select>
        </div>
        <div class="drop-down filter-drop">
          <select
            v-model="orderStatus"
            @change="orderStatusFilter()"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Order Status</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="intransit">In Transit</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
        <div class="drop-down filter-drop">
          <select
            v-model="orderCategory"
            @change="orderCategoryFilter()"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Category</option>
            <option value="food">Food</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <div class="drop-down filter-drop">
          <select
            v-model="formData.branchID"
            @change="getReport('branchID')"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Branches</option>
            <option
              v-for="branch in branches"
              :key="branch.id"
              :value="branch.id"
            >
              {{ branch.branchname }}
            </option>
          </select>
        </div>
        <div class="drop-down date-drop">
          <date-picker
            @change="getReport"
            type="datetime"
            v-model="date"
            range
            :placeholder="'Date Range'"
            timeTitleFormat="YYYY-MM-DD hh:mm a"
            format="YYYY-MM-DD hh:mm a"
            value-type="format"
            :show-second="false"
            :show-time-panel="showTimeRangePanel"
            @close="handleRangeClose"
          >
            <template v-slot:footer>
              <button class="mx-btn mx-btn-text" @click="toggleTimeRangePanel">
                {{ showTimeRangePanel ? "select date" : "select time" }}
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
          name="order-status-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

    <pagination
      :headers="headers"
      :date="date"
      v-model="formData.page"
      @go="getReport"
    />

    <div id="parent-component">
      <order-details ref="order_details" />
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <!-- <th></th> -->
              <th class="large-space column-name">Customer</th>
              <th class="column-name">Phone</th>
              <th class="column-name">Order ID</th>
              <th class="column-name">Order Category</th>
              <th class="">Amount (₦)</th>
              <th class="column-name">Payment Method</th>
              <th class="column-name">Branch</th>
              <th class="large-space column-name">Rider</th>
              <th class="column-name">Order Status</th>
              <th class="column-name">Order Date</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="9">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="9">No record at the moment</td>
            </tr>

            <tr
              v-if="!loading && filteredList.length > 0"
              v-for="(row, ix) in filteredList"
              v-bind:key="ix"
            >
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->

              <td class="column-name">
                <div class="avatar-wtext">
                  <span class="column-name"
                    >{{ row.firstname }} {{ row.lastname }}</span
                  >
                </div>
              </td>
              <td class="column-name">{{ row.phonenumber }}</td>
              <td style="color: #28a745" class="column-name">
                {{ row.ordercode }}
              </td>
              <td class="column-name">{{ row.ordercategory }}</td>
              <td>{{ formatPrice(row.ordertotal) }}</td>
              <td class="column-name">
                {{ row.paymentmethod }}
              </td>
              <td class="column-name">{{ row.branchname }}</td>
              <td
                v-if="
                  row.riderfirstname != undefined &&
                  row.riderlastname != undefined
                "
                class="avatar-wtext column-name"
              >
                <span class="column-name"
                  >{{ row.riderfirstname }} {{ row.riderlastname }}</span
                >
              </td>
              <td v-else class="avatar-wtext column-name">
                <span></span>
              </td>

              <td class="tx-c column-name">
                <span
                  :class="'column-name status ' + row.orderstatus.toLowerCase()"
                  >{{ row.orderstatus.replace("_", " ") }}</span
                >
              </td>
              <td class="column-name">{{ row.created_at }}</td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
      <!--      container="#parent-component"-->
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from "../../../components/Pagination.vue";
import OrderDetails from "../../../components/OrderDetails.vue";
export default {
  components: { Pagination, OrderDetails },
  layout: "main",
  computed: {
    // showing() {
    // 	let count = this.headers.Count != undefined ? Number(this.headers.Count) : 1;
    // 	let from = (this.headers.pagenum != null) && Number(this.headers.pagenum) > 1 ? (Number(this.this.headers.pagenum) * 10) - 10 : 1;
    // 	let to = count > 10 ? (Number(count) % 10) + from : count;
    // 	return from  + ' - ' +  to;
    // },
    json_fields() {
      let vm = this;

      let result = {
        // "DATE": {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY') : this.$moment(e.start_date).format('Do MMM, YYYY HH:mm') + ' - ' + this.$moment(e.end_date).format('Do MMM, YYYY HH:mm')},
        CUSTOMER: {
          callback: (e) => {
            return `${e.firstname} ${e.lastname}`;
          },
        },
        PHONE: "phonenumber",
        "ORDER ID": "ordercode",
        "ORDER CATEGORY": "ordercategory",
        AMOUNT: { field: "ordertotal", callback: (e) => vm.formatPrice(e) },
        "PAYMENT METHOD": "paymentmethod",
        BRANCH: "branchname",
        // "RIDER":{ callback: (e) => e.riderfirstname + ' ' + e.riderlastname},
        "ORDER STATUS": "orderstatus",
        // "ORDER DATE":"created_at"
        // "TAX TOTAL" :  { field: "vat", callback: (e) => vm.formatPrice(e)},
      };

      // vm.taxes.forEach((tax) => {
      // 	result[`${tax.name}(${tax.value})%`] = {
      // 		callback : e => {
      // 			let details = e.taxes.find(x => x.tax_id == tax.id)
      // 			if (details) {
      // 				console.log(details)
      // 				return vm.formatPrice(details.value)
      // 			}
      // 			return ''
      // 		}

      // 		// vm.getTax(e.taxes, tax.id)
      // 	}
      // })

      result["BRANCH"] = {
        callback: (e) => e.branchname + ", " + e.branchcity,
      };
      result["RIDER"] = {
        callback: (e) => e.riderfirstname + " " + e.riderlastname,
      };
      // result["ORDER ITEMS"] = {callback: (e) => e.orderitems.length > 0 ? e.orderitems.map(x => x.quantity + ' ' + x.productname).reduce((p, v) => p + ', ' + v) : ''}
      result["ORDER DATE"] = "created_at";

      return result;
    },
  },
  data: () => ({
    filteredList: [],
    paymentMethod: "",
    orderStatus: "",
    orderCategory: "",
    taxes: [],
    loading: true,
    date: "",
    formData: {
      branchID: "",
      enddate: "",
      merchID: "",
      reporttype: "",
      startdate: "",
      page: 1,
    },
    api: "salesreport/getReport",
    search: "",
    reports: [],
    branches: [],
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

    headers: {
      Next: "",
      Prev: "",
      Count: 0,
      total: 0,
      pagenum: 1,
    },
  }),
  methods: {
    paymentMethodFilter() {
      this.filteredList = this.reports.filter((report) => {
        if (this.paymentMethod == "") {
          return this.reports;
        }
        if (
          report.paymentmethod != null &&
          report.paymentmethod
            .toLowerCase()
            .includes(this.paymentMethod.toLowerCase())
        ) {
          return report.paymentmethod
            .toLowerCase()
            .includes(this.paymentMethod.toLowerCase());
        }
      });
    },
    orderStatusFilter() {
      this.filteredList = this.reports.filter((report) => {
        if (this.orderStatus == "") {
          return this.reports;
        }
        if (
          report.orderstatus != null &&
          report.orderstatus
            .toLowerCase()
            .includes(this.orderStatus.toLowerCase())
        ) {
          return report.orderstatus
            .toLowerCase()
            .includes(this.orderStatus.toLowerCase());
        }
      });
    },
    orderCategoryFilter() {
      this.filteredList = this.reports.filter((report) => {
        if (this.orderCategory == "") {
          return this.reports;
        }
        if (
          report.ordercategory != null &&
          report.ordercategory
            .toLowerCase()
            .includes(this.orderCategory.toLowerCase())
        ) {
          return report.ordercategory
            .toLowerCase()
            .includes(this.orderCategory.toLowerCase());
        }
      });
    },
    filteredOrder() {
      this.filteredList = this.reports.filter((report) => {
        if (
          report.ordercode.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return report.ordercode
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
        if (
          report.firstname.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return report.firstname
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
        if (report.lastname.toLowerCase().includes(this.search.toLowerCase())) {
          return report.lastname
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
        if (
          report.paymentstatus.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return report.paymentstatus
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
      });
    },
    getTaxs() {
      this.$store
        .dispatch("tax/listTaxsWithDeleted", this.formData)
        .then((res) => {
          // this.loading = false
          this.taxes = res.data.data;
        })
        .catch((err) => {
          // this.loading = false
          console.log(err);
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
          return this.formatPrice(details[0].paymentamount);
        }
      }
      return "";
    },
    getTax(taxes, id) {
      if (taxes.length > 0) {
        let details = taxes.filter((x) => x.tax_id == id);
        if (details.length == 1) {
          return this.formatPrice(details[0].value);
        }
      }
      return "";
    },
    formatNumber: (number) => {
      var nf = new Intl.NumberFormat();
      return nf.format(number);
      // return this.formNumber(number)
    },
    getReport(param) {
      if (param != undefined && param == "branchID") {
        this.formData.page = 1;
      }
      this.loading = true;

      if (this.date !== "" && this.date[0] != null) {
        this.formData.startdate = this.$moment(this.date[0]).format(
          "YYYY-MM-DD"
        );
        this.formData.enddate = this.$moment(this.date[1]).format("YYYY-MM-DD");
      } else {
        this.formData.startdate = "";
        this.formData.enddate = "";
      }

      let vm = this;

      this.formData.export = "";
      this.$store
        .dispatch("salesreport/getReport", this.new_data)
        .then((res) => {
          if (res.status) {
            this.reports = res.data;
            this.filteredList = res.data;
            this.setHeaders(res.data, res.headers);
            this.loading = false;
            return;
          }
          this.loading = false;
          this.$toast.error("An error occurred");
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error("An error occurred " + err);
        });
    },
    sortReport() {
      this.loading = true;

      if (this.date !== "" && this.date[0] != null) {
        this.formData.startdate = this.$moment(this.date[0]).format(
          "YYYY-MM-DD"
        );
        this.formData.enddate = this.$moment(this.date[1]).format("YYYY-MM-DD");
      } else {
        this.formData.startdate = "";
        this.formData.enddate = "";
      }
      this.formData.export = "";
      this.formData.page = 1;

      this.$store
        .dispatch("salesreport/getReport", this.formData)
        .then((res) => {
          if (res.status) {
            this.reports = res.data;
            let array = [];
            let formatNumber = this.formatPrice;
            this.reports.forEach(function (e) {
              let data = {
                name: e.firstname + " " + e.lastname,
                contact: e.phonenumber,
                orderID: e.ordercode,
                amount: formatNumber(e.ordertotal),
                branch: e.branchname + ", " + e.branchcity,
                rider: e.riderfirstname + " " + e.riderlastname,
              };
              array.push(data);
            });
            this.json_data = array;
            this.headers = res.headers;
            this.loading = false;
            return;
          }

          this.loading = false;
          this.$toast.error("An error occurred");
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error("An error occurred" + err);
        });
    },
    listBranches() {
      let vm = this;
      this.$store
        .dispatch("branches/listBranches", this.formData.merchID)
        .then((res) => {
          this.branches = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    nextData() {
      if (this.headers.Next === "") {
        return;
      }
      let page = +this.formData.page + +1;

      this.formData.page = page;
      this.getReport();
    },
    previousData() {
      if (this.headers.Prev === "") {
        return;
      }
      let page = +this.formData.page - +1;
      if (page < 0) {
        this.formData.page = 1;
        return;
      }
      this.formData.page = page;
      this.getReport();
    },
    orderDetails(order) {
      localStorage.setItem("order_data", JSON.stringify(order));
      this.$refs.order_details.setOrder(order);
      // this.clearOrderDetails()
      // this.orderDetailsData = {
      // 	items: order.orderitems,
      // 	orderid: order.ordercode,
      // 	tax: 0,
      // 	orderstatus: order.orderstatus.replace('_', ' '),
      // 	customername: order.firstname + ' ' + order.lastname,
      // 	customerphone: order.username,
      // 	deliveryaddress: order.address,
      // 	profilelink: order.profilelink,
      // 	deliverycharge: order.deliverycharge,
      // 	rider : {
      // 		id: order.riderID,
      // 		name: order.riderfirstname + ' ' + order.riderlastname,
      // 		phone: order.riderphonenumber,
      // 		regnumber: order.registrationnumber,
      // 		photo: order.riderphoto
      // 	},
      // 	staff: {
      // name: order.staffname,
      // 		photo: order.staffpic,
      // 		// phone: ''
      // 	}
      // }
      // $('#order-details').addClass('uk-open').show();
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
    closeOrderDetails() {
      this.clearOrderDetails();
      $("#order-details").removeClass("uk-open").hide();
    },
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      user.role == undefined ||
      (user.rolepermission
        ? user.rolepermission[0].reports.viewsalesreport
        : "")
    ) {
      next();
    } else {
      alert("You have not been permitted to view this page");
      next({ path: "/dashboard" });
    }
  },
  mounted() {
    this.formData.merchID = this.user.id;
    this.formData.reporttype = this.$route.params.name;
    this.listBranches();
    this.getReport();
    this.filteredOrder();
    this.getTaxs();
  },
};
</script>
<style scoped>
.search-filter .filter-drop {
  min-width: 0px !important;
}
.search-filter > * {
  margin-right: 7px;
}
.filter-btn {
  padding: 12px 7px !important;
}
</style>