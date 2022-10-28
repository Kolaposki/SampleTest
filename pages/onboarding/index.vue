<template>
  <overlay-scrollbars class="main-content-wrap">
    <pagination :headers="headers" v-model="get.page" @go="getAllRiders" />

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of new Ntisa Rider signups
        </figcaption>
        <table class="table-content large-content">
          <thead class="">
            <tr>
              <th class="column-name">ID</th>
              <th class="column-name">Full Name</th>
              <th class="column-name">Phone</th>
              <th class="column-name">Email</th>
              <th class="column-name">Years Of Experience</th>
              <th class="">Actions</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="12">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="12">No records at the moment</td>
            </tr>
            <tr
              v-if="!loading && filteredList.length > 0"
              v-for="(row, ix) in filteredList"
              v-bind:key="ix"
              :class="row.active === false ? 'disabled-tr' : ''"
              :uk-tooltip="
                row.active === false
                  ? 'title: This Rider has been suspended; pos: bottom'
                  : null
              "
            >
              <td class="column-name" @click="displayDetails(row)">
                <!-- <img :src="row.riders_passport" alt="" /> -->
                {{ row.id }}
              </td>
              <td class="column-name" @click="displayDetails(row)">
                {{ row.riderfirstname }} {{ row.riderlastname }}
              </td>
              <td class="column-name" @click="displayDetails(row)">
                {{ row.riderphonenumber }}
              </td>
              <td class="column-name" @click="displayDetails(row)">
                {{ row.rideremailaddress }}
              </td>
              <td class="column-name" @click="displayDetails(row)">
                {{ row.years_of_experience }}
              </td>
              <td class="column-name">
                <button
                  @click="displayDetails(row)"
                  title="view details"
                  type="button"
                  class="btn btn--tertiary"
                >
                  View
                </button>
                <button
                  @click="verify(row)"
                  title="Mark Applicant as verified"
                  type="button"
                  class="btn btn--primary"
                  style="min-width: 60px"
                >
                  Verify
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from "../../components/Pagination.vue";
export default {
  components: { Pagination },
  layout: "main",
  computed: {},
  data: () => ({
    search: "",
    loading: true,
    riders: [],
    get: {
      id: 0,
      page: 1,
    },
    headers: {
      Next: "",
      Prev: "",
      count: 0,
      total: 0,
      pagenum: 1,
    },
    filteredList: [],
  }),
  methods: {
    getAllRiders() {
      this.loading = true;
      this.$store
        .dispatch("onboarding/getAllRiders")
        .then((res) => {
          this.riders = res.data.data;
          this.filteredList = res.data.data;
          if (res.data.data != undefined && res.data.data.length > 0) {
            this.setHeaders(this.riders, res.data.headers);
          }
          this.loading = false;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
    displayDetails(rider) {
      console.log(rider);
      this.$store.dispatch("onboarding/setRider", rider).then(() => {
        this.$router.push("/onboarding/details/" + rider.id);
      });
    },
    verify(rider) {},
  },
  mounted() {
    this.getAllRiders();
  },
};
</script>

<style scoped>
table {
  width: 100% !important;
}
td:hover {
  cursor: pointer;
}
/* .avatar-wtext span{
	margin-left: -5px;
} */
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
table .disabled-tr {
  background: white;
}
table .disabled-tr td {
  opacity: 0.5;
}
/* table .disabled-tr td:last-of-type {
    opacity: 1;
} */
table .disabled-tr td:last-of-type .btn {
  opacity: 0.5;
}
table .disabled-tr td:first-of-type {
  position: relative;
}
table .disabled-tr td:first-of-type .disable-svg {
  position: absolute;
  width: 20px;
  height: 20px;
  right: -10px;
  opacity: 1;
}
</style>
