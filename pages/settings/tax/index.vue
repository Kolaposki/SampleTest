<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
        <nuxt-link  to="/settings">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax" class="active" v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount"  v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
        <nuxt-link to="/settings/roles"  v-if="(user.rolepermission ? user.rolepermission[0].settings.viewroles:'') || isMerchant">Roles & Permissions</nuxt-link>
        <nuxt-link to="/settings/lease"  v-if="(user.rolepermission ? user.rolepermission[0].settings.viewlease:'') || isMerchant">Lease</nuxt-link>
      </div>
    </overlay-scrollbars>
    <div id="parent-component">
      <div id="delete-text" uk-modal container="#parent-component" data-uk-modal="{target:'#delete-text',bgclose:false}" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" @click="cancelDelete" type="button">X</button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Remove Tax ?</h2>
              <p>Please confirm you really want to delete this Tax, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDelete" id="deleteTax" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">
    
      <div class="py-3 px-0">
        <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            <h2 class="">Tax</h2>
            <button class="btn btn--primary" type="button" @click="openModal"  v-if="(user.rolepermission ? user.rolepermission[0].tax.addtax:'') || isMerchant">
              Add tax
            </button>
          </div>
          <overlay-scrollbars class="table-wrapper">
            <table class="table-content">
              <thead class="">
                <tr>
                  <th class="small-space  column-name">Name</th>
                  <th class="small-space  column-name">Value(%)</th>
                  <th class="small-space">Action</th>
                </tr>
              </thead>
              <tbody class="table-content large-content">
                <tr v-if="loading">
                  <td colspan="2">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && taxes.length < 1">
                  <td colspan="2">No tax set at the moment. You could apply tax to your orders or product</td>
                </tr>
                <tr v-if="!loading && taxes.length > 0" v-for="p in taxes" :key="p.id">
                  <td class="column-name">{{ p.name }}</td>
                  <td class="column-name">{{ p.value }}</td>
                  <td class="d-flx-alc">
                    <button class="btn btn--primary" v-if="(user.rolepermission ? user.rolepermission[0].tax.edittax:'') || isMerchant" type="button" @click="editTax(p)">
                      Edit
                    </button>
                    <button class="btn btn--danger ml-1" type="button" @click="deleteTax(p)" v-if="(user.rolepermission ? user.rolepermission[0].tax.deletetax:'') || isMerchant">
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

    <!-- Add Features Modal -->
    <div id="add-tax" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
        <div class="modal-header">
          <h2>Add tax</h2>
          <p>Enter the details to create a new tax.</p>
        </div>
        <form @submit.prevent="saveTax">
          <div class="modal-body" uk-overflow-auto>
            <label  class="form-input">
              <span class="form-input__label">Name</span>
              <div class="form-input__input">
                <input v-model="formData.name" type="text">
              </div>
              <span v-if="errorData.name" class="form-input__error-msg">Please enter a name</span>
            </label>
            <!-- <label  class="form-input">
              <span class="form-input__label">Display Name</span>
              <div class="form-input__input">
                <input v-model="formData.display_name" type="text">
              </div>
              <span v-if="errorData.display_name" class="form-input__error-msg">Please enter a display name</span>
            </label> -->
            <!-- <label  class="form-input">
              <span class="form-input__label">Level</span>
              <div class="form-input__input">
                <select v-model="formData.level">
                  <option value="">-Select-</option>
                  <option value="order">Order</option>
                  <option value="product">Product</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              <span v-if="errorData.level" class="form-input__error-msg">Please enter a level</span>
            </label> -->
            <label  class="form-input">
              <span class="form-input__label">Value (%)</span>
              <div class="form-input__input">
                <input 
                id="add_value_tax"

                type="number" onblur="document.getElementById('add_value_tax').value= parseFloat(document.getElementById('add_value_tax').value).toFixed(2);" min="0" max="100" step="0.01"
                v-model="formData.value">
              </div>
              <span v-if="errorData.value" class="form-input__error-msg">Please enter a value</span>
            </label>
            <!-- <label  class="form-input">
              <span class="form-input__label">State</span>
              <div class="form-input__input">
                <input v-model="formData.state" type="text">
              </div>
              <span v-if="errorData.state" class="form-input__error-msg">Please enter a state</span>
            </label> -->
            <!-- <label  class="form-input">
              <span class="form-input__label">City</span>
              <div class="form-input__input">
                <input v-model="formData.city" type="text">
              </div>
              <span v-if="errorData.city" class="form-input__error-msg">Please enter a city</span>
            </label> 
            <label  class="form-input">
              <span class="form-input__label">Tax Classification</span>
              <div class="form-input__input">
                <select v-model="formData.tax_classification">
                  <option value="">-Select-</option>
                  <option v-for="(row, i) in tax_classifications" v-bind:key="i" :value="row.id">{{row.name}}</option>
                </select>
              </div>
              <span v-if="errorData.tax_classification" class="form-input__error-msg">Please enter a tax classification</span>
            </label>
            -->
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End add feature modal -->


    <!-- Add Features Modal -->
    <div id="edit-tax" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEdit" uk-close></button>
        <div class="modal-header">
          <h2>Edit tax</h2>
          <p>Enter the details to update a new tax.</p>
        </div>
        <form @submit.prevent="updateTax">
           <div class="modal-body" uk-overflow-auto>
            <label  class="form-input">
              <span class="form-input__label">Name</span>
              <div class="form-input__input">
                <input v-model="editData.name" type="text">
              </div>
              <span v-if="errorData.name" class="form-input__error-msg">Please enter a name</span>
            </label>
            <!-- <label  class="form-input">
              <span class="form-input__label">Display Name</span>
              <div class="form-input__input">
                <input v-model="editData.display_name" type="text">
              </div>
              <span v-if="errorData.display_name" class="form-input__error-msg">Please enter a display name</span>
            </label> -->
            <!-- <label  class="form-input">
              <span class="form-input__label">Level</span>
              <div class="form-input__input">
                <select v-model="editData.level">
                  <option value="">-Select-</option>
                  <option value="order">Order</option>
                  <option value="product">Product</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
              <span v-if="errorData.level" class="form-input__error-msg">Please enter a level</span>
            </label> -->
            <label  class="form-input">
              <span class="form-input__label">Value (%)</span>
              <div class="form-input__input">
                <input 
                id="edit_value_tax"
                onkeypress="return (document.getElementById('edit_value_tax').value.indexOf('.') > 0 ? (document.getElementById('edit_value_tax').value.substr(document.getElementById('edit_value_tax').value.indexOf('.'), 3).length > 2 ? false : true) : false"

                v-model="editData.value" type="text">
              </div>
              <span v-if="errorData.value" class="form-input__error-msg">Please enter a value</span>
            </label>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEdit" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                Edit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- End add feature modal -->
  </overlay-scrollbars>
</template>
<style scoped>
.btn--primary{
    background-color: #089628;
    color: #fff;
    min-width: 10px !important;
}
.btn--danger{
   background-color: #dc3545;
   color: #fff;
   min-width: 10px !important;

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
		formData: {
			merchID: '',
			tax: ''
    },
    tax_classifications: [],
    taxes: [],
    deleteData: {},
		errorData: {
		  tax: false
		},
		editData: {
		  tax: '',
			id: ''
		}
	}),
  computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
    doDelete(){
      
      // this.$toast.error("This action cannot be reversed")
      this.$store.dispatch('tax/deleteTax', this.deleteData)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success(res.data.message)
            this.formData.merchID = this.user.id
            this.getTaxs()
            this.cancelDelete()
						return
          }
          this.formData.merchID = this.user.id
          
					this.$toast.error('An error occurred')
				}).catch(err =>{
          this.formData.merchID = this.user.id
          console.log(err)
          this.$toast.error('An error occurred')
				})
    },
    cancelDelete() {
		  this.deleteData = {
		    id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
		saveTax() {
		  this.clearErrorData()
			if(this.formData.name === ''){
			  this.errorData.name = true
				return
      }
      if(this.formData.value === ''){
			  this.errorData.value = true
				return
      } 
      if(this.formData.tax_classification === ''){
			  this.errorData.tax_classification = true
				return
      }
      
			$('#submitBtn').attr('disabled', true).html('Saving....please wait')
      this.formData.tax_classification = this.tax_classifications[0].id
			this.$store.dispatch('tax/saveTax',this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Save')
          if(res.data.status) {
						this.$toast.success(res.data.message)
            
            this.formData.merchID = this.user.id
						this.getTaxs()
						this.closeModal()
						return
          }
          this.formData.merchID = this.user.id
					this.$toast.error(res.data.message)
				}).catch(err =>{
          this.formData.merchID = this.user.id
					$('#submitBtn').attr('disabled', false).html('+ Save')
					console.log(err)
				})
		},

    deleteTax(p) {
      this.deleteData = p
      $('#delete-text').addClass('uk-open').show();
      
    },
		updateTax() {
			this.clearErrorData()
      if(this.editData.name === ''){
			  this.errorData.name = true
				return
      }
      if(this.editData.value === ''){
			  this.errorData.value = true
				return
      } 
      // if(this.editData.tax_classification === ''){
			//   this.errorData.tax_classification = true
			// 	return
      // }
      
      
      this.editData.tax_classification = this.tax_classifications[0].id

			$('#updateBtn').attr('disabled', true).html('Updating..please wait')
			this.$store.dispatch('tax/updateTax', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update')
					if(res.data.status) {
						this.$toast.success(res.data.message)
            this.formData.merchID = this.user.id
						this.getTaxs()
						this.closeEdit()
						return
          }
          
          this.editData.merchID = this.user.id
          
					
					this.$toast.error(res.data.message)
				}).catch(err =>{
          this.editData.merchID = this.user.id
					$('#updateBtn').attr('disabled', false).html('+ Update')
					console.log(err)
				})
		},
	  getTaxs() {
	    this.$store.dispatch('tax/listTaxs', this.formData)
				.then(res =>{
					this.loading = false
					this.taxes = res.data.data
				}).catch(err =>{
					this.loading = false
					console.log(err)
				})
    },
    getTaxClassification() {
	    this.$store.dispatch('tax/listTaxClassification', this.formData)
				.then(res =>{
					this.loading = false
					this.tax_classifications = res.data.data
				}).catch(err =>{
					this.loading = false
					console.log(err)
				})
		},
		editTax(p) {
		  this.editData = p
			UIkit.modal('#edit-tax').toggle()
		},
		openModal() {
			UIkit.modal('#add-tax').toggle()
		},
		closeModal() {
		  this.formData = {

      }
      
      this.formData.merchID = this.user.id
      this.formData.tax_classification = this.tax_classifications[0].id
			UIkit.modal('#add-tax').toggle('hide')
		},
		clearErrorData() {
		  this.errorData = {
		    tax: false
			}
		},
		closeEdit() {
			this.editData = {
      }
      
      this.formData.merchID = this.user.id
      this.editData.tax_classification = this.tax_classifications[0].id
			UIkit.modal('#edit-tax').toggle('hide')
		}
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].tax.viewtax: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getTaxs()
		this.getTaxClassification()
	}
}
</script>
