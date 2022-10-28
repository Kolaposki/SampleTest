<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
      </div>
    </div>
    <div id="parent-component">
      <div id="add-vendor" uk-modal data-uk-modal="{target:'#add-vendor',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="cancelAddData" uk-close></button>
          <div class="modal-header">
            <h2>Add Vendor</h2>
            <p>Add a vendor description and necessary information from here</p>
          </div>
          <form @submit.prevent="createVendor">
            <overlay-scrollbars class="modal-body" uk-modal-auto>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Vendor name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendorname" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Vendor contact person</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendorcontactperson" required>
                  </div>
                </label>
              </div>
              <label  class="form-input">
                <span class="form-input__label">Vendor address</span>
                <div class="form-input__input">
                  <input type="text" v-model="formData.vendoraddress" required>
                </div>
              </label>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Country</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendorcountry" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">State</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendorstate" required>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">City</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendorcity" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Email</span>
                  <div class="form-input__input">
                    <input type="email" v-model="formData.vendoremail" required>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Account Name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.vendoraccountname" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Bank</span>
                  <div class="form-input__input">
                    <Select2 v-model="formData.vendorbankname" :options="bankName" required/>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Payment method</span>
                  <div class="form-input__input">
                    <Select2 v-model="formData.paymentmethod" :options="paymentMethods" required/>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Payment terms</span>
                  <div class="form-input__input">
                    <Select2 v-model="formData.paymentterms" :options="paymentTerms" required/>
                  </div>
                </label>
              </div>
              <hr />
              <div v-for="(input,k) in products" :key="k">
                <div class="flex-width-1-2 less-gp">
                  <label class="form-input">
                    <span class="form-input__label">Vendor code</span>
                    <div class="form-input__input">
                      <input v-model="input.vendorcode" type="text">
                    </div>
                  </label>
                  <label class="form-input">
                    <span class="form-input__label">Vendor price</span>
                    <div class="form-input__input">
                      <input v-model="input.vendorprice" type="number" required>
                    </div>
                  </label>
                </div>
                <label class="form-input">
                  <span class="form-input__label">Product</span>
                  <div class="form-input__input">
                    <select @change="mySelectEvent($event, k)" v-model="input.productid" class="filter-btn box-deco-smallr">
                      <option value="">-Select Product-</option>
                      <option v-for="product in vendorProducts" :key="product.id" :value="product.id">
                        {{ product.text }}
                      </option>
                    </select>
                  </div>
                </label>
                <label class="form-input" v-show="k == products.length-1">
                  <button @click="addChild(k)" class="btn btn-icon" type="button">
                    +
                  </button>
                </label>
                <label class="form-input" v-show="k || ( !k && products.length > 1)">
                  <button @click="removeChild(k)" class="btn btn-icon" type="button">
                    -
                  </button>
                </label>
              </div>

            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" id="cancelBtn" @click="closeVendorModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Add Vendor
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="delete-text" uk-modal data-uk-modal="{target:'#delete-text',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" @click="cancelDelete">X</button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete Vendor ?</h2>
              <p>Please confirm you really want to delete this vendor, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDeleteVendor" id="deleteBtn" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="edit-vendor" uk-modal data-uk-modal="{target:'#edit-vendor',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="cancelEdit" uk-close></button>
          <div class="modal-header">
            <h2>Edit Vendor</h2>
            <p>Edit vendor description and necessary information from here</p>
          </div>

          <form @submit.prevent="editVendorData">
            <overlay-scrollbars :class="'modal-body'" uk-overflow-auto>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Vendor name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendorname" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Vendor contact person</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendorcontactperson" required>
                  </div>
                </label>
              </div>
              <label  class="form-input">
                <span class="form-input__label">Vendor address</span>
                <div class="form-input__input">
                  <input type="text" v-model="editData.vendoraddress" required>
                </div>
              </label>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Country</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendorcountry" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">State</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendorstate" required>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">City</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendorcity" required>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Email</span>
                  <div class="form-input__input">
                    <input type="email" v-model="editData.vendoremail" required>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Account Name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="editData.vendoraccountname" required>
                  </div>
                </label>
                <!-- <label  class="form-input">
                  <span class="form-input__label">Account Number</span>
                  <div class="form-input__input">
                    <input type="text">
                  </div>
                </label> -->
                <label  class="form-input">
                  <span class="form-input__label">Bank</span>
                  <div class="form-input__input">
                    <Select2 v-model="editData.vendorbankname" :options="bankName" required/>
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Payment method</span>
                  <div class="form-input__input">
                    <Select2 v-model="editData.paymentmethod" :options="paymentMethods" required/>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Payment terms</span>
                  <div class="form-input__input">
                    <Select2 v-model="editData.paymentterms" :options="paymentTerms" required/>
                  </div>
                </label>
              </div>
               <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Change Status</span>
                  <div class="form-input__input">
                  <Select2 v-model="editData.active" :options="status" required/>
                    <!-- <Select v-model="editData.active">
                      <option value="true">Activate</option>
                      <option value="false">Deactivate</option>
                    </Select> -->
                  </div>
                </label>
              </div>
              <hr />
              <div class="d-flx-alc-jfe mt-5">
                <button type="button" id="cancelUpdateBtn" @click="closeEditModal" class="btn btn-no-fill">
                  Cancel
                </button>
                <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                  + Update Vendor
                </button>
              </div>
            </overlay-scrollbars>
          </form>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">
      <ul class="card-list none flex-width-1-3 less-gp">
        <li class="card-item box-deco-bg">
          <nuxt-link to="/inventory">
            <div class="card-item__header">
              <h3>
                Inventory
              </h3>
              <svg>
                <use href="/uploads/icons.svg#toq-file"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">₦{{formatPrice(getTotalPrice)}}</p>
            </div>
          </nuxt-link>
        </li>
        <li class="card-item box-deco-bg" style="background-color: forestgreen">
          <nuxt-link class="active" to="/inventory/vendor">
            <div class="card-item__header">
              <h3>
                Vendors
              </h3>
              <svg>
                <use href="/uploads/icons.svg#toq-file"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">{{ vendors.length }}</p>
            </div>
          </nuxt-link>
        </li>
        <li class="card-item box-deco-bg">
          <nuxt-link to="/inventory/purchase-order">
            <div class="card-item__header">
              <h3>
                Purchase Orders
              </h3>
              <svg>
                <use href="/uploads/icons.svg#money-bag"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">{{ purchaseorders.length }}</p>
            </div>
          </nuxt-link>
        </li>
        
      </ul>

      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">VENDORS</h3>
        <button class="btn btn--primary" type="button" @click="addVendorModal">
          + Add new vendor
        </button>
      </div>

      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class="">S/N</th>
              <th class="">Vendor Name</th>
              <th class="">City</th>
              <th class="">State</th>
              <th class="">Email</th>
              <th class="">Status</th>
              <th class="">Action</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading"><td colspan="6">Loading...please wait</td></tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="6">No vendor record</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <td style="color: #353190;">
                #{{ ix + 1}}.
              </td>
              <td>{{ row.vendorname }}</td>
              <td >{{row.vendorcity}}</td>
              <td >{{row.vendorstate}}</td>
              <td>{{ row.vendoremail }}</td>
              <td>
                <span v-if="row.active" class="status paid">Active</span>
                <span v-if="!row.active" class="status ended">Inactive</span>
              </td>
              <td class="d-flx-alc">
                 <button class="btn btn--primary" type="button" @click="editVendor(row)">
					          Edit
                </button>
              </td>
              <td>
                <button class="btn btn--danger" type="button" @click="deleteVendor(row)">
					          Delete
                </button>
                <!--
                <button class="btn btn-icon" @click="editVendor(row)" type="button">
                  <svg>
                    <use href="/uploads/icons.svg#edit"></use>
                  </svg>
                </button>
                <button class="btn btn-icon" type="button" @click="deleteVendor(row)">
                  <svg>
                    <use href="/uploads/icons.svg#delete"></use>
                  </svg>
                </button>-->
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>


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
   left: 10px;
   position: relative;
}
.btn {
	 padding: 0.6rem 1.2rem;
}
</style>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.vendors.filter(vendor => {
				if (vendor.vendorname.toLowerCase().includes(this.search.toLowerCase())) {
					return vendor.vendorname.toLowerCase().includes(this.search.toLowerCase());
				} else if(vendor.vendoremail.toLowerCase().includes(this.search.toLowerCase())) {
					return vendor.vendoremail.toLowerCase().includes(this.search.toLowerCase());
				}else if(vendor.vendorcity.toLowerCase().includes(this.search.toLowerCase())) {
					return vendor.vendorcity.toLowerCase().includes(this.search.toLowerCase());
				}
				else {
					return vendor.vendorstate.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},
		getTotalPrice () {
			let inv = this.inventory;
			let total = inv.map(el => el.costprice).reduce((acc, curr) => {
				acc += Number(curr)
				return acc
			}, 0);
			console.log(total)
			return total;
		},
	},
	data: () => ({
		inventory: [],
		totalprice: '',
		search: '',
		formData: {
			vendorname: '',
			merchID: '',
			vendorcontactperson: '',
			vendoraddress: '',
			vendoremail: '',
			vendorcity: '',
			vendorstate: '',
			vendorcountry: '',
			paymentmethod: '',
			vendoraccountname: '',
			vendorbankname: '',
			paymentterms: '',
			productdetails: [],
			active: true
		},
		editData: {
		  id: '',
			vendorname: '',
			merchID: '',
			vendorcontactperson: '',
			vendoraddress: '',
			vendoremail: '',
			vendorcity: '',
			vendorstate: '',
			vendorcountry: '',
			paymentmethod: '',
			vendoraccountname: '',
			vendorbankname: '',
			paymentterms: '',
      productdetails: [],
      active: true
		},
		products: [{
			productid: '',
			vendorprice: '',
			vendorcode: '',
			productname: '',
			description: ''
		}],
		bankName: [
			{ id: 'accessbank', text: 'Access Bank Plc'},
			{ id : 'citibank', text: 'Citibank Nigeria Limited'},
			{ id: 'diamondbank', text: 'Diamond Bank Limited'},
			{ id: 'ecobank', text: 'Ecobank Nigeria Plc'},
			{ id: 'enterprisebank', text: 'Enterprise Trust Bank Limited'},
			{ id: 'fidelitybank', text: 'Fidelity Bank Plc'},
			{ id: 'firstbank', text: 'First Bank of Nigeria Plc'},
			{ id: 'firstcity', text: 'First City Monument Bank Limited'},
			{ id: 'guarantytrustbank', text: 'Guaranty Trust Bank Plc.'},
			{ id: 'heritagebank', text: 'Heritage Banking Company Ltd'},
			{ id: 'keystonebank', text: 'Key Stone Bank'},
			{ id: 'mainstreetbank', text: 'MainStreet Bank'},
			{ id: 'skyebank', text: 'Skye Bank Plc'},
			{ id: 'stanbicibtc', text: 'Stanbic IBTC Bank Ltd'},
			{ id: 'standardchartered', text: 'Standard Chartered Bank Nigeria Ltd'},
			{ id: 'sterlingbank', text: 'Sterling Bank Plc'},
			{ id: 'unionbank', text: 'Union Bank of Nigeria Plc'},
			{ id: 'unitedbank', text: 'United Bank For Africa Plc'},
			{ id: 'unitybank', text: 'Unity Bank Plc'},
			{ id: 'wemabank', text: 'Wema Bank Plc'},
			{ id: 'zenithbank', text: 'Zenith Bank Plc'}
		],
		paymentTerms: [
			{id: 'monthly', text: 'Monthly'},
			{ id: 'quarterly', text: 'Quarterly'},
			{ id: 'yearly', text: 'Yearly'}
		],
		paymentMethods: [
			{ id: 'online', text: 'Online'},
			{ id: 'cheque', text: 'Cheque'}
    ],
    	status: [
			{ id: 'true', text: 'Activate'},
			{ id: 'false', text: 'Deactivate'}
		],
		vendorProducts: [],
		loading: true,
		vendors: [],
		vProducts: [],
		purchaseorders: [],
		deleteData: {
		  id: ''
		}
	}),
	methods: {
		deleteVendor(category) {
			this.deleteData.id = category.id
			$('#delete-text').addClass('uk-open').show();
		},
		cancelDelete() {
			this.deleteData = {
				id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
		doDeleteVendor() {
			$('#deleteBtn').attr('disabled', true).html('Deleting..please wait')
			this.$store.dispatch('vendor/deleteVendor', this.deleteData)
				.then(res =>{
					$('#deleteBtn').attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listVendors()
						this.cancelDelete()
						return
					}

					this.$toast.error('An error occurred and the operation was terminated')
				}).catch(err =>{
					this.$toast.error('An error occurred and the operation was terminated')
					$('#deleteBtn').attr('disabled', false).html('Delete')
					console.log(err)
				})
		},
		mySelectEvent(e, index) {
		  let id = e.target.value

			for (let i=0; i < this.vendorProducts.length; i++) {
				if (this.vendorProducts[i].id == id) {
					this.products[index].productname = this.vendorProducts[i].text
					this.products[index].description = this.vendorProducts[i].text
					console.log(this.products[index])
					return
				}
			}
		},
		createVendor() {
		  this.formData.productdetails = this.products
			$('#submitBtn').attr('disabled', true).html('Adding vendor...Please wait')
			this.$store.dispatch('vendor/saveVendor', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Add Vendor')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listVendors()
						this.closeVendorModal()
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Add Vendor')
					this.$toast.error(err)
				})
		},
		addChild () {
			this.products.push({
				productid: '',
				vendorprice: '',
				vendorcode: '',
				productname: '',
				description: ''
			})
		},
		removeChild (index) {
			this.products.splice(index, 1)
		},
		addVendorModal() {
			UIkit.modal('#add-vendor').toggle()
		},
		cancelAddData() {
		  this.formData = {
				vendorname: '',
				vendorcontactperson: '',
				vendoraddress: '',
				vendoremail: '',
				vendorcity: '',
				vendorstate: '',
				vendorcountry: '',
				paymentmethod: '',
				vendoraccountname: '',
				vendorbankname: '',
				paymentterms: '',
				productdetails: [],
				active: true
			}
		},
		closeVendorModal() {
		  this.cancelAddData()
			UIkit.modal('#add-vendor').toggle('hide')
		},
		editVendor(vendor) {
			this.editData = {
				id: vendor.id,
				vendorname: vendor.vendorname,
				merchID: vendor.merchID,
				vendorcontactperson: vendor.vendorcontactperson,
				vendoraddress: vendor.vendoraddress,
				vendoremail: vendor.vendoremail,
				vendorcity: vendor.vendorcity,
				vendorstate: vendor.vendorstate,
				vendorcountry: vendor.vendorcountry,
				paymentmethod: vendor.paymentmethod,
				vendoraccountname: vendor.vendoraccountname,
				vendorbankname: vendor.vendorbankname,
				paymentterms: vendor.paymentterms,
        productdetails: vendor.productdetails,
        active: vendor.active
			}
			UIkit.modal('#edit-vendor').toggle()
		},
		editVendorData() {
		  $('#updateBtn').attr('disabled', true).html('Updating..please wait')
			this.$store.dispatch('vendor/editVendor', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update vendor')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeEditModal()
						this.listVendors()
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#updateBtn').attr('disabled', false).html('+ Update vendor')
					console.log(err)
				})
		},
		cancelEdit() {
		  this.editData = {
				id: '',
				vendorname: '',
				merchID: '',
				vendorcontactperson: '',
				vendoraddress: '',
				vendoremail: '',
				vendorcity: '',
				vendorstate: '',
				vendorcountry: '',
				paymentmethod: '',
				vendoraccountname: '',
				vendorbankname: '',
				paymentterms: '',
        productdetails: [],
        active: false
			}
		},
		closeEditModal() {
		  this.cancelEdit()
			UIkit.modal('#edit-vendor').toggle('hide')
		},
		listVendors() {
		  this.$store.dispatch('vendor/listVendors', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.vendors = res.data.data
						this.loading = false
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					this.$toast.error(e)
					this.loading = false
				})
		},
		listInventory() {
		  this.$store.dispatch('inventory/getInventory', this.formData.merchID)
				.then(res =>{
					console.log(res.data)
					if(res.data.status) {
						this.inventory = res.data.data
						this.totalprice = res.data.totalinventoryvalue
						this.loading = false
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					this.$toast.error(e)
					this.loading = false
				})
		},
		listProducts() {
		  this.$store.dispatch('products/listProducts', this.formData.merchID)
				.then(res =>{
					this.vProducts = res.data.data
					let vm = this
					res.data.data.forEach(function(r) {
						let data = {
							id: r.id,
							text: r.productname
						}
						vm.vendorProducts.push(data)
					})
				}).catch(e =>{
					console.log(e)
				})
		},
		listPurchaseOrders() {
			this.$store.dispatch('purchaseorders/listPurchaseOrder', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.purchaseorders = res.data.data
						return
					}
				}).catch(err =>{
				})
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listVendors()
    this.listInventory()
    this.listProducts()
		this.listPurchaseOrders()
	}
}
</script>
<style scoped>
.table-wrapper.no-deco {
  padding-right: unset !important;
  /*  */
  
}
</style>