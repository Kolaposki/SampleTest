<template>
<!--  <div class="main-header">-->
<!--  <header class="header-wrapper large-content">-->

<!--  </header>-->
  <header class="header-wrapper" id="main-header">
     <auto-logout/>
    <h2 class="sr">
      Site Branding &amp; Navigation Tools
    </h2>
    <div class="header-wrapper__site-brand" style="width: 180px">
      <nuxt-link class="logo-holder" v-if="this.user.businesslogo === '' || this.user.businesslogo === null" to="/dashboard">
        <img src="/uploads/ntisa_green_black.png" alt="NTISA logo">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Merchant</span>
      </nuxt-link>
       <nuxt-link class="logo-holder" v-if="this.user.businesslogo !== '' || this.user.businesslogo !== null" to="/dashboard">
        <img src="/uploads/ntisa-admin-logo2.png" />
       </nuxt-link>
      <div class="d-flx-alc hide-mediumup">
        <button class="toggle-mobile-nav" aria-label="Toggle Navigation" data-nav-toggler id="menu-btn">
          <span class="slats"></span>
        </button>
      </div>
    </div>
   
    <div class="header-wrapper__user-nav">
      <h2 class="header-title">
        {{ this.headerName() }}
        {{ this.getParamNameSalesReport() }}        
      </h2>
      
      <div class="header-wrapper__links-wrap">
        <nuxt-link to="/orders" class="notification">
          <svg>
            <use href="/uploads/icons.svg#bell"></use>
          </svg>          
          <span class="noti-status"></span>
        </nuxt-link>
        <p class="user-info">
          <span v-if="user.role !=undefined">{{ this.user.firstname }} {{ this.user.lastname }}</span>
          <span v-else>{{ this.user.businessname }}</span>
          <span v-show="user.rolename">{{ this.user.rolename }}</span>
        </p>
        <!-- <div
            class="drop-down profile-drop"
            v-intro="'<div class=\'profile-tip\'><img src=\'/default_image.png\' class=\'profile-svg\'></div><div>Access the logout and profile from this section</div>'"
            v-intro-tooltip-class="'tooltip-style'"
            v-intro-highlight-class="'intro-highlight'"
            v-intro-if="showTutorial"
            v-intro-step="6"
            @click.stop="toggleDropdown($event)"
        > -->

        <button @click="logout" class="btn btn--danger log-out">
          <span>Log out</span>
        </button>
          <!-- <button class="profile">
            <svg>
              <use href="/uploads/icons.svg#drop"></use>
            </svg>
          </button>
          <div class="drop-wrapper" data-drop-down>
            <ul class="drop-lists">
              <li v-if="!isSupervisor" class="drop-list-item">
                <nuxt-link to="/settings" class="icon-text " >
                  <svg>
                    <use href="/uploads/icons.svg#profile"></use>
                  </svg>
                  <span>Profile & Settings</span>
                </nuxt-link>
              </li>
              <li v-else class="drop-list-item">
                <nuxt-link to="/settings/change-password" class="icon-text " >
                  <svg>
                    <use href="/uploads/icons.svg#profile"></use>
                  </svg>
                  <span>Profile & Settings</span>
                </nuxt-link>
              </li>
              
              <li class="drop-list-item">
                <a href="javascript:;" @click="logout" class="icon-text log-out">
                  <svg>
                    <use href="/uploads/icons.svg#log-out"></use>
                  </svg>
                  <span>Log out</span>
                </a>
              </li>
            </ul>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
  </header>
<!--  </div>-->

</template>
<script>

// import Onboard from "./Onboard";

import AutoLogout from './AutoLogout.vue'
export default {
	components: {AutoLogout},
	computed :{
		showTutorial() {
			let done = localStorage.getItem('tutorial');
			if(done != undefined && done == 'done') {
				return false;
			} else {
				return true;
			}
		}
	},
	mounted () {
		
	},
	methods: {
	  logout() {
			this.$store.dispatch('authenticate/clearToken')
			localStorage.removeItem('token')
			localStorage.removeItem('user')
			localStorage.removeItem('user_data')
			localStorage.removeItem('customer')
			localStorage.removeItem('driver')
			localStorage.removeItem('product')
			localStorage.removeItem('product_data')
			localStorage.removeItem('branch')
	    //redirect to login page
	    this.$router.push('/');
		},
    
		
	}
}
</script>
<style type="text/css" scoped>

.header-wrapper__site-brand img{
  margin-top: -10px
}
.header-wrapper, .main-header {
  /* height: 7px !important; */
}

.profile-tip{
  text-align: center;
}

img {
   height:50px !important;
  /* width: 75% !important; */
  /*float: left !important;*/
  /*position: fixed;*/
  display: block;
  margin-left: auto;
  margin-right: auto;
  /*width: 50%;*/
}

.header-wrapper__site-brand{
  text-align: center;
}

.btn{
  padding: 8px 16px;
  margin-left: 10px
}

.btn--danger{
   background-color: #dc3545;
   color: #fff;
}
</style>
