<template>
  <section class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/reports" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <div class="search-filter d-flx-alc-jfe">
        <div id="branch" class="drop-down filter-drop">
          <select
            v-model="formData.paymentmode"
            @change="getRiderEarning"
            class="filter-btn box-deco-smallr"
          >
            <option value="">All Payment mode</option>
            <option value="card">Card</option>
            <option value="wallet">Wallet</option>
            <option value="cash">Cash</option>
            <option value="banktransfer">Bank Transfer</option>
          </select>
        </div>
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search" />
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down page-drop">
          <date-picker
            @change="getRiderEarning"
            v-model="date"
            range
            :placeholder="'Date Range'"
            type="datetime"
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
          name="rider-earnings-report.xls"
        >
          Export
        </download-excel>
      </div>
    </div>

    <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text" type="button">
          Showing <span> {{ showing }} </span> of
          <span>
            {{ this.headers.Count != undefined ? this.headers.Count : 0 }}
          </span>
        </button>
      </div>
      <!-- <div class="d-flx-alc">
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
      </div> -->
      <div class="d-flx-alc">
        <div>{{ date[0] }} - {{ date[1] }}</div>
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
              <th class="large-space column-name">Rider ID</th>
              <th class="column-name">Rider Name</th>
              <th class="column-name">Order No</th>
              <th class="">Total Amount (₦)</th>
              <th class="">Commission Rate (%)</th>
              <th class="">Amount Due to Ntisa (₦)</th>
              <th class="">Amount Due to rider (₦)</th>
              <th class="column-name">Payment Mode</th>
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
              class="link"
              v-if="!loading && filteredList.length > 0"
              v-for="(row, ix) in filteredList"
              v-bind:key="ix"
            >
              <td class="column-name">
                <span class="column-name">{{
                  row.riderID ? row.riderID : "N/A"
                }}</span>
              </td>
              <td class="column-name">
                {{ row.riderfirstname }} {{ row.riderlastname }}
              </td>
              <td style="color: #28a745" class="column-name">
                {{ row.ordercode ? row.ordercode : "N/A" }}
              </td>
              <td class="">
                {{ row.ordertotal ? formatPrice(row.ordertotal) : "N/A" }}
              </td>
              <td>{{ row.commissionrate ? row.commissionrate : "N/A" }}</td>
              <td>
                {{
                  row.amountduetontisa
                    ? formatPrice(row.amountduetontisa)
                    : "N/A"
                }}
              </td>
              <td>
                {{
                  row.amountduetorider
                    ? formatPrice(row.amountduetorider)
                    : "N/A"
                }}
              </td>
              <td class="column-name">
                {{ row.paymentmethod ? row.paymentmethod : "N/A" }}
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </section>
</template>
<script>
export default {
  layout: "main",
  computed: {
    filteredList() {
      return this.reports.filter((report) => {
        if (report.riderID !== null && report.riderID == this.search) {
          return report.riderID !== null && report.riderID == this.search;
        } else if (
          report.paymentmethod !== null &&
          report.paymentmethod.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return (
            report.paymentmethod !== null &&
            report.paymentmethod
              .toLowerCase()
              .includes(this.search.toLowerCase())
          );
        } else {
          return (
            report.ordercode !== null &&
            report.ordercode.toLowerCase().includes(this.search.toLowerCase())
          );
        }
      });
    },
    json_fields() {
      let formatDate = this.$moment;
      let vm = this;
      return {
        "Rider ID": "riderID",
        "Order No": "ordercode",
        "Total Amount": {
          field: "ordertotal",
          callback: (e) => vm.formatPrice(e),
        },
        "Commission Rate": "commissionrate",
        "Amount Due to Ntisa": {
          field: "amountduetontisa",
          callback: (e) => vm.formatPrice(e),
        },
        "Amount Due to Rider": {
          field: "amountduetorider",
          callback: (e) => vm.formatPrice(e),
        },
        "Mode of Payment": "paymentmethod",
      };
    },
    // {
    // 			callback: (e) => {
    // 				return `${e.riderfirstname} ${e.riderlastname}`;
    // 			}Mode of Payment
    // 		},
  },
  data: () => ({
    loading: true,
    formData: {
      merchID: "",
      page: 1,
      startdate: "",
      enddate: "",
      branchID: "",
      paymentmode: "",
      riderID: "",
    },
    date: "",
    reports: [],
    search: "",

    headers: {
      Next: "",
      Prev: "",
      Count: 0,
      total: 0,
      pagenum: 1,
    },
    api: "usersreport/getRidersEarning",
  }),
  methods: {
    formatNumber: (number) => {
      var nf = new Intl.NumberFormat();
      return nf.format(number);
      // return this.formNumber(number)
    },
    getRiderEarning() {
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
      // if(this.isSupervisor){
      // 	this.formData.branchID = ''
      // }

      this.$store
        .dispatch("usersreport/getRidersEarning", this.formData)
        .then((res) => {
          if (res.status) {
            this.reports = res.data;
            this.setHeaders(res.data, res);
            this.loading = false;
            return;
          }

          this.loading = false;
          // console.log('errors')
          this.$toast.error("An error occurred");
        })
        .catch((err) => {
          this.loading = false;
          // console.log('error')
          this.$toast.error("An error occurred!");
        });
    },
    // nextData() {
    // 	if(this.headers.Next === "") {
    // 		return
    // 	}
    // 	let page = +this.formData.page + +1

    // 	this.formData.page = page
    // 	this.getRiderEarning()
    // },
    // previousData() {
    // 	if(this.headers.Previous === "") {
    // 		return
    // 	}
    // 	let page = +this.formData.page - +1
    // 	if(page < 0) {
    // 		this.formData.page = 1
    // 		return
    // 	}
    // 	this.formData.page = page
    // 	this.getRiderEarning()
    // },
    // viewOrderDetails(row) {
    // 	localStorage.removeItem('riderHistory')
    // 	this.$store.dispatch('usersreport/setRiderHistory', row)
    // 	this.$router.push('/reports/users/rider/history')
    // }
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      user.role == undefined ||
      (user.rolepermission
        ? user.rolepermission[0].reports.viewriderearning
        : "")
    ) {
      next();
    } else {
      alert("You have not been permitted to view this page");
      next({ path: "/dashboard" });
    }
  },
  mounted() {
    this.formData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.formData.branchID = "";
    this.getRiderEarning();
  },
};
</script>
