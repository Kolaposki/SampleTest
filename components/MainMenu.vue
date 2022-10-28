<template>
  <aside class="main-navigation" style="width: 180px" id="mainbar">
    <overlay-scrollbars
      :options="{ scrollbars: { autoHide: 'scroll' } }"
      class="navigation"
    >
      <h3 class="sr">Site Navigation</h3>
      <!--      <div class="header-wrapper__site-brand">-->
      <!--        <a class="logo-holder" v-if="this.user.businesslogo === '' || this.user.businesslogo === null" href="">-->
      <!--          <img src="/uploads/ntisa_green_black.png" alt="NTISA logo">-->
      <!--          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Merchant</span>-->
      <!--        </a>-->
      <!--        <a class="logo-holder" v-if="this.user.businesslogo !== '' || this.user.businesslogo !== null" href="">-->
      <!--          <img :src="this.user.businesslogo" alt="NTISA logo">-->
      <!--        </a>-->
      <!--        <div class="d-flx-alc hide-mediumup">-->
      <!--          <button class="toggle-mobile-nav" aria-label="Toggle Navigation" data-nav-toggler id="menu-btn">-->
      <!--            <span class="slats"></span>-->
      <!--          </button>-->
      <!--        </div>-->
      <!--      </div>-->
      <!-- <button class="close-nav-drawer">
        <svg width="20px" height="20px" class="">
          <use xlink:href="/uploads/icons.svg#close-circle"></use>
        </svg> -->
      <!-- </button> -->
      <ul class="navigation__lists">
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].dashboard.viewdashboard
              : '') || isMerchant
          "
        >
          <nuxt-link to="/dashboard" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#dashboard"></use>
            </svg>
            <span class="prefix" style="font-weight: bolder">dashboard</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].branch.viewbranches
              : '') || isMerchant
          "
        >
          <nuxt-link to="/branch" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#branch"></use>
            </svg>
            <span class="prefix">Branch</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].riders.viewriders
              : '') || isMerchant
          "
        >
          <nuxt-link to="/riders" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#drivers"></use>
            </svg>
            <span class="prefix">riders</span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="navigation__lists">
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].customer.viewcustomer
              : '') || isMerchant
          "
        >
          <nuxt-link to="/customers" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#customers"></use>
            </svg>
            <span class="prefix">customers</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].orders.vieworders
              : '') || isMerchant
          "
        >
          <nuxt-link to="/orders" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#orders"></use>
            </svg>
            <span class="prefix">orders</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].staff.viewstaff
              : '') || isMerchant
          "
        >
          <nuxt-link to="/users" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#staff"></use>
            </svg>
            <span class="prefix">Users</span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="navigation__lists">
        <!-- <li class="navigation__list-item" v-if="(user.rolepermission ? user.rolepermission[0].notifications.viewnotifications:'') || isMerchant">
          <nuxt-link to="/notifications" class=" nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#notification"></use>
            </svg>
            <span class="prefix">Notifications</span>
          </nuxt-link>
        </li> -->
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].campaigns.viewcampaign
              : '') || isMerchant
          "
        >
          <nuxt-link to="/campaigns" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#campaigns"></use>
            </svg>
            <span class="prefix">Campaigns</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].complaints.viewcomplaints
              : '') || isMerchant
          "
        >
          <nuxt-link to="/complaints" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#reports"></use>
            </svg>
            <span class="prefix">Complaints</span>
          </nuxt-link>
        </li>
      </ul>
      <ul class="navigation__lists">
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].riders.viewriders
              : '') || isMerchant
          "
        >
          <nuxt-link to="/onboarding" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#drivers"></use>
            </svg>
            <span class="prefix">Onboarding</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].reports.viewreports
              : '') || isMerchant
          "
        >
          <nuxt-link to="/reports" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#reports"></use>
            </svg>
            <span class="prefix">reports</span>
          </nuxt-link>
        </li>
        <li
          class="navigation__list-item"
          v-if="
            (user.rolepermission
              ? user.rolepermission[0].settings.viewsettings
              : '') || isMerchant
          "
        >
          <nuxt-link to="/settings" class="nav-link">
            <svg class="">
              <use xlink:href="/uploads/icons.svg#settings"></use>
            </svg>
            <span class="prefix">settings</span>
          </nuxt-link>
        </li>
      </ul>
    </overlay-scrollbars>
  </aside>
</template>
<style type="text/css">
.tooltip-style {
  font-size: x-large;
  font-weight: bolder;
  text-align: center;
  background: green;
  color: white;
}

.intro-highlight {
  opacity: 0.3 !important;
}
.prefix {
  font-size: medium;
}

img {
  /* height:100px !important; */
  /*width: 20% !important;*/
  /*top: -100px !important;*/
  /*float: left !important;*/
  /*position: fixed;*/
}
</style>
<script>
(function () {
  // your page initialization code here
  // the DOM will be available here

  // document.onreadystatechange = function () {
  // 	if (document.readyState == "complete") {
  // 		// toggleNav();
  // 		// dropdown();
  // 		let skip = document.getElementsByClassName('introjs-skipbutton');
  // 		if(skip[0] != undefined) {
  // 			skip[0].innerHTML = 'Skip'
  // 		}
  // 	}
  // }

  // setTimeout
  // ( () => {
  // 	let skip = document.getElementsByClassName('introjs-skipbutton');
  // 	if(skip[0] != undefined) {
  // 		skip[0].innerHTML = 'Skip'
  // 	}
  // }, 1000);

  setInterval(() => {
    let done = document.getElementsByClassName("introjs-donebutton");
    if (done[0] != undefined) {
      done[0].addEventListener("click", (element, event) => {
        localStorage.setItem("tutorial", "done");
      });
    }
  }, 1000);

  // this.$intro().oncomplete(function () {
  // });
})();

export default {
  computed: {
    isSupervisor() {
      return this.userData.role != undefined
        ? this.userData.role.toLowerCase().includes("administrator")
        : false;
    },

    isCourierService() {
      return this.userData.businessdescription
        .toLowerCase()
        .includes("delivery");
    },

    userData() {
      return this.$store.getters["authenticate/getUserData"];
    },

    showTutorial() {
      let done = localStorage.getItem("tutorial");
      if (done != undefined && done == "done") {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {},
  methods: {
    onComplete() {
      localStorage.setItem("tutorial", "done");
      return;
    },
  },
};
</script>