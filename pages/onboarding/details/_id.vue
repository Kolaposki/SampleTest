<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/onboarding" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <button
        @click="verify(row)"
        title="Mark Applicant as verified"
        type="button"
        class="btn btn--primary"
        style="min-width: 60px"
      >
        Verify
      </button>
    </div>

    <div class="inner-main-wrapper">
      <div class="flex-width-4 j-c-sb">
        <div class="width-1-4">
          <div class="box-deco-bg">
            <div class="">
              <div class="user">
                <div>
                  <img
                    v-if="
                      riderData.riders_passport === '' ||
                      riderData.riders_passport === null
                    "
                    src="/default_image.png"
                    alt=""
                  />
                  <img v-else :src="riderData.riders_passport" alt="" />
                </div>
                <h2 class="user__name">
                  {{ riderData.riderfirstname }} {{ riderData.riderlastname }}
                </h2>
              </div>

              <div class="documents">
                <h5>View Documents</h5>
                <div>
                  <a class="btn btn--primary" :href="riderData.riders_passport"
                    >Passport</a
                  >
                  <a class="btn btn--primary" :href="riders_nin_slip"
                    >National ID</a
                  >
                  <a class="btn btn--primary" :href="riders_card"
                    >Rider's Card</a
                  >
                  <a class="btn btn--primary" :href="police_clearance"
                    >Police Clearance</a
                  >
                  <a class="btn btn--primary" href="">Guarantor's Form</a>
                </div>
              </div>
            </div>
          </div>

          <!-- </div> -->
        </div>
        <div class="width-3-4">
          <div class="box-deco-bg">
            <div class="d-flx-r-md">
              <div class="user-details">
                <p>
                  <span style="font-weight: 600">Rider ID</span>
                  <span class="co-rich-black">{{ riderData.id }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Phone Number</span>
                  <span class="co-rich-black">{{
                    riderData.riderphonenumber
                  }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Email Address</span>
                  <span class="co-rich-black">{{
                    riderData.rideremailaddress
                  }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Date Of Birth</span>
                  <span class="co-rich-black">{{ riderData.dob }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">NIN</span>
                  <span class="co-rich-black">{{ riderData.nin }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Years Of Experience</span>
                  <span class="co-rich-black">{{
                    riderData.years_of_experience
                  }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Residential Address</span>
                  <span class="co-rich-black">{{
                    riderData.residentialaddress
                  }}</span>
                </p>
              </div>
              <hr />
              <div class="user-details">
                <p>
                  <span style="font-weight: 600">Next Of Kin Name</span>
                  <span class="co-rich-black"
                    >{{ riderData.nextofkinfirstname }}
                    {{ riderData.nextofkinlastname }}</span
                  >
                </p>
                <p>
                  <span style="font-weight: 600">Next Of Kin Phone Number</span>
                  <span class="co-rich-black">{{
                    riderData.nextofkinphonenumber
                  }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Next Of Kin Address</span>
                  <span class="co-rich-black">{{
                    riderData.nextofkinaddress
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<style scoped>
@media only screen and (min-width: 1366px) {
  li.box-deco-bg:hover {
    background: forestgreen;
  }
  li.box-deco-bg:hover p,
  li.box-deco-bg:hover h3,
  li.box-deco-bg:hover p span {
    color: #fff !important;
  }
  .flex-width-1-2wgr > * {
    width: 48%;
    margin-left: 0;
  }
  .flex-width-1-2wgr > * :nth-child(2) {
    width: 48%;
    margin-right: 0;
  }
  .user {
    padding: 0.75rem 2rem !important;
  }
  .user-details {
    padding: 0.75rem 2rem !important;
  }
  img {
    margin: 0 auto;
  }

  .user-details span {
    font-size: 14px;
  }
}
.documents h5 {
  font-family: Source Sans Pro, sans-serif;
  font-weight: 700;
  text-align: center;
}
.documents a {
  font-weight: bold;
}
</style>
<script>
export default {
  layout: "main",
  data: () => ({
    amount: "",
    riderData: {},
  }),
  methods: {
    getRider() {
      this.riderData = this.$store.getters["onboarding/getRider"];

      console.log(this.riderData);
    },
  },
  mounted() {
    this.getRider();
  },
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (
      user.role == undefined ||
      (user.rolepermission ? user.rolepermission[0].riders.viewriders : "")
    ) {
      next();
    } else {
      alert("You have not been permitted to view this page");
      next({ path: "/dashboard" });
    }
  },
};
</script>
