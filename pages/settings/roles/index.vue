<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link  to="/settings">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax" v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount" v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles" class="active" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewlease:'') || isMerchant">Lease</nuxt-link>
      </div>
    </overlay-scrollbars>
    <div id="parent-component">
      <div id="delete-modal" uk-modal container="#parent-component" data-uk-modal="{target:'#delete-modal',bgclose:false}" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" @click="cancelDelete" uk-close type="button"></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete Role?</h2>
              <p>Please confirm you like to delete the <strong>{{this.name.toUpperCase()}}</strong> role.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDelete" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="parent-component">
      <div id="users-modal" uk-modal container="#parent-component" data-uk-modal="{target:'#users-modal',bgclose:false}" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <div class=" d-flx-alc-jsb">
            <h2 style="font-weight: 600">Assigned Users</h2>   
            <button class="uk-modal-close-default mt-2 mr-2" @click="closeUsersModal" uk-close type="button"></button>         
          </div>
          <overlay-scrollbars class="table-wrapper">
            <table class="table-content">
              <thead class="">
              <tr>
                <th class="column-name">Name</th>
                <th class="column-name">Email</th>
              </tr>
              </thead>
              <tbody class="table-content large-content">
                <!-- <tr v-if="loading">
                  <td colspan="3">Loading...please wait</td>
                </tr>  -->
                <tr v-if="roleUsers.length < 1">
                  <td colspan="3">No Users assigned at the moment.</td>
                </tr>
                <tr v-if="roles.length > 0" v-for="(role, index) in roleUsers" :key="index">

                  <td class="column-name">{{role.firstname}} {{role.lastname}}</td>
                  <td class="column-name">{{role.emailaddress}}</td>                  
                </tr>
              </tbody>
            </table>
          </overlay-scrollbars>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
    
      <div class="py-3 px-0">
        <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            <h2>Roles and Permission</h2>
            <div class="btn btn--primary" @click="$router.push('/settings/roles/add')" v-if="(user.rolepermission ? user.rolepermission[0].settings.addrole:'') || isMerchant">Create Role</div>
             <!-- <nuxt-link to="add/" class="btn btn--primary"  v-if="(user.rolepermission ? user.rolepermission[0].settings.addroles:'') || isMerchant">Create Role</nuxt-link> -->
          </div>
          <overlay-scrollbars class="table-wrapper">
            <table class="table-content">
              <thead class="">
              <tr>
                <!-- <th class=" column-name">ID</th> -->
                <th class=" column-name" style="width: 20%">Role Name</th>
                <th>Assigned Users</th>
                <th class="" >Action</th>
              </tr>
              </thead>
              <tbody class="table-content large-content">
                <tr v-if="loading">
                  <td colspan="3">Loading...please wait</td>
                </tr> 
                <tr v-if="!loading && roles.length < 1">
                  <td colspan="3">No Role set at the moment.</td>
                </tr>
                <tr class="link" v-if="!loading && roles.length > 0" v-for="(role, index) in roles" :key="index" >
                  <!-- <td class="column-name">{{role.id}}</td> -->
                  <td class="column-name" @click="openUsersModal(role.id)">{{role.rolename}}</td>
                  <td @click="openUsersModal(role.id)">{{role.customercount}}</td>
                  <td class="d-flx-alc">
                      <button class="btn btn--primary" v-if="(user.rolepermission ? user.rolepermission[0].settings.viewpermission:'') || isMerchant" type="button" @click="viewPermissions(role)">
                        Edit
                      </button>
                      <button class="btn btn--danger" type="button" @click="deleteRole(role.id, role.rolename)" v-if="(user.rolepermission ? user.rolepermission[0].settings.deleterole:'') || isMerchant">
                        Delete
                      </button>
                    </td>
                </tr>
              </tbody>
            </table>
          </overlay-scrollbars>
        </section>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<style scoped>
.btn--primary{
    background-color: #089628;
    color: #fff;
    min-width: 30px !important;
}
.btn--danger{
   background-color: #dc3545;
   color: #fff;
   min-width: 30px !important;
   left: 5px;
   position: relative;
}
.btn {
	 padding: 0.6rem 1.2rem;
}
</style>
<script>
export default {
	layout: 'main',
	data: () => ({
		loading: true,
    formData:{
      merchID:"",
      userid:"",
      id:""
    },
    roles:[],
    roleUsers: [],
    id: null,
    name: ''
	}),
  computed: {
		
	},
	methods: {
    
     getRoles(){
       this.$store.dispatch('role/getPermissions', this.formData)
       .then(res => {
          this.loading = false;
          this.roles = res.data.data
          localStorage.removeItem('roles')
			    this.$store.dispatch('role/setAllRole', this.roles)
          // console.log('Roles: ', this.roles)
       }).catch(err => {
         this.loading = false;
         console.log(err)
       })
     },
     viewPermissions(role){
      localStorage.removeItem('role')
			this.$store.dispatch('role/setRole', role)
      this.$router.push('/settings/roles/view-role/' + role.id)
     },
     doDelete(){
      let data = {
        id: this.id
      }
      this.$store.dispatch('role/deleteRole', data)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success('Role deleted successfully!')
            this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
            this.getRoles()
            this.cancelDelete()
						return
          }
          this.formData.merchID = this.user.role ? this.user.merchID : this.user.id       
					this.$toast.error('An error occurred')
				}).catch(err =>{
          this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
          console.log(err)
          this.$toast.error('An error occurred')
				})
    },
     deleteRole(id, name){
      this.id = id
      this.name = name
      $('#delete-modal').addClass('uk-open').show();
     },
     cancelDelete(){
      this.id = null
      this.name = ''
      $('#delete-modal').removeClass('uk-open').hide();
     },
     openUsersModal(id){
      let data = []
      data = this.roles.filter(role => role.id == id)
      this.roleUsers = data[0].userecord
      // console.log(this.roleUsers)
      $('#users-modal').addClass('uk-open').show();
     },
     closeUsersModal(){
      this.id = null
      $('#users-modal').removeClass('uk-open').hide();
     }
	},
   beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].settings.viewroles:'')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
    this.formData.userid  = ""
    this.formData.id  = ""
    this.getRoles()
	}
}
</script>
