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
          <input v-model="search" type="text" placeholder="Search" />
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>

        <div class="drop-down page-drop">
          <date-picker
            @change="getRiderReport"
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
          name="rider-onboarding-report.xls"
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
      <div class="d-flx-alc">
        <div>{{ date[0] }} - {{ date[1] }}</div>
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

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content large-content">
          <thead class="">
            <tr>
              <!-- <th></th> -->
              <!-- <th class="large-space column-name">S/N</th> -->
              <th class="large-space column-name">Rider ID</th>

              <!-- <th class="">Branch</th> -->
              <th class="large-space column-name">First Name</th>
              <th class="large-space column-name">Last Name</th>
              <th class="large-space column-name">Phone Number</th>
              <th class="large-space column-name">Residential Address</th>
              <th class="large-space column-name">Bike Reg. No</th>
              <th class="large-space column-name">
                Branch(Region of Operation)
              </th>
              <th class="large-space column-name">Contract type</th>
              <th class="large-space column-name">Signup date</th>
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
              <!-- <td  class="column-name">
                  <span  class="column-name">1++</span>
              </td> -->
              <td class="column-name">{{ row.id ? row.id : "N/A" }}</td>
              <!-- <td>{{ row.branchname }}</td> -->
              <td class="column-name">
                {{ row.riderfirstname ? row.riderfirstname : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.riderlastname ? row.riderlastname : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.riderphonenumber ? row.riderphonenumber : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.residentialaddress ? row.residentialaddress : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.registrationnumber ? row.registrationnumber : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.branchname ? row.branchname : "N/A" }}
              </td>
              <td class="column-name">
                {{ row.contracttype ? row.contracttype : "N/A" }}
              </td>
              <td class="column-name">
                {{
                  row.created_at
                    ? $moment(row.created_at).format("Do MMM, YYYY HH:mm")
                    : "N/A"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
export default {
  layout: "main",
  computed: {
    filteredList() {
      return this.reports.filter((report) => {
        if (
          report.riderfirstname
            .toLowerCase()
            .includes(this.search.toLowerCase())
        ) {
          return report.riderfirstname
            .toLowerCase()
            .includes(this.search.toLowerCase());
        } else if (
          report.riderlastname.toLowerCase().includes(this.search.toLowerCase())
        ) {
          return report.riderlastname
            .toLowerCase()
            .includes(this.search.toLowerCase());
        } else if (report.id != null && report.id == this.search) {
          return report.id == this.search;
        } else {
          return report.branchcity
            .toLowerCase()
            .includes(this.search.toLowerCase());
        }
      });
    },
    json_fields() {
      // {callback: (e) => e.date ? this.$moment(e.date).format('Do MMM, YYYY')
      let formatDate = this.$moment;
      let vm = this;
      return {
        "Signup Date": {
          callback: (e) => this.$moment(e.created_at).format("Do MMM, YYYY"),
        },
        "Rider Name": {
          callback: (e) => {
            return `${e.riderfirstname} ${e.riderlastname}`;
          },
        },
        "Reg. Number": "registrationnumber",
        Branch: "branchcity",
        "Contract Type": "contracttype",
        Address: "residentialaddress",
        "Phone Number": "riderphonenumber",
        "Email Address": "rideremailaddress",
        "Bank Name": "bankname",
        "Bank Account": "bankaccount",
        "Guarantor 1 Name": {
          callback: (e) => {
            return `${e.refreefirstname} ${e.refreelastname}`;
          },
        },
        "Guarantor 1 Phone Number ": "refreephonenumber",
        "Guarantor Address": "refreeaddress",
        "Guarantor 2 Name": {
          callback: (e) => {
            return `${e.refree_2firstname} ${e.refree_2lastname}`;
          },
        },
        "Guarantor 2 Phone Number ": "refree_2phonenumber",
        "Guarantor 2 Address": "refree_2address",
      };
    },
  },
  data: () => ({
    loading: true,
    formData: {
      merchID: "",
      startdate: "",
      enddate: "",
      branchID: "",
      riderID: "",
    },
    date: "",
    reports: [],
    search: "",
    api: "usersreport/getOnboardingReport",

    headers: {
      Next: "",
      Prev: "",
      Count: 0,
      total: 0,
      pagenum: 1,
    },
  }),
  methods: {
    formatNumber: (number) => {
      var nf = new Intl.NumberFormat();
      return nf.format(number);
    },
    getRiderReport() {
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
        .dispatch("usersreport/getOnboardingReport", this.formData)
        .then((res) => {
          if (res.status) {
            this.reports = res.data;
            // console.log('Reports', res)
            this.setHeaders(res.data, res.headers);
            this.loading = false;
            return;
          }

          this.loading = false;
          this.$toast.error("An error occurred");
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error("An error occurred!");
        });
    },
    nextData() {
      if (this.headers.Next === "") {
        return;
      }
      let page = +this.formData.page + +1;

      this.formData.page = page;
      this.getRiderReport();
    },
    previousData() {
      if (this.headers.Previous === "") {
        return;
      }
      let page = +this.formData.page - +1;
      if (page < 0) {
        this.formData.page = 1;
        return;
      }
      this.formData.page = page;
      this.getRiderReport();
    },
    viewOrderDetails(row) {
      localStorage.removeItem("riderHistory");
      this.$store.dispatch("usersreport/setRiderHistory", row);
      this.$router.push("/reports/users/rider/history");
    },
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      user.role == undefined ||
      (user.rolepermission
        ? user.rolepermission[0].reports.viewrideronboarding
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
    // console.log('user')
    // console.log(this.user)
    this.getRiderReport();
  },
};
</script>
<style scoped>
/* .table-content.large-content{
    width:2500px;
  } */
</style>