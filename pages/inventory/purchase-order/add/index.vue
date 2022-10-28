<template>
  <div class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16">
        <nuxt-link to="/inventory/purchase-order" class="text-link">
          <svg>
            <use href="/uploads/icons.svg#back"></use>
          </svg>
          <span class="ml-1 fw-bold co-grey">Back</span>
        </nuxt-link>
      </p>
      <div class="search-filter d-flx-alc-jfe">
      </div>
    </div>

    <div class="inner-main-wrapper">
      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">Create Purchase order</h3>
      </div>
      <overlay-scrollbars class="table-wrapper no-deco">
        <div class="mt-2" >
          <div class="flex-width-1-2 less-gp">
            <label  class="form-input">
              <span class="form-input__label">Branch</span>
              <div class="form-input__input">
                <select v-model="formData.branchID" class="filter-btn box-deco-smallr">
                  <option value="">-Select Branch-</option>
                  <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                    {{ branch.branchname }}
                  </option>
                </select>
              </div>
              <span v-if="errorData.branchID" class="form-input__error-msg">Please select a branch</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Vendor</span>
              <div class="form-input__input">
                <select v-model="formData.vendorID" class="filter-btn box-deco-smallr">
                  <option value="">-Select Vendor-</option>
                  <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                    {{ vendor.vendorname }}
                  </option>
                </select>
              </div>
              <span v-if="errorData.vendorID" class="form-input__error-msg">Please select a vendor</span>
            </label>
          </div>
          <div class="flex-width-1-2 less-gp">
            <label  class="form-input">
              <span class="form-input__label">Purchase order code</span>
              <div class="form-input__input">
                <input v-model="formData.purchaseordercode" type="text" name="" />
              </div>
              <span v-if="errorData.purchaseordercode" class="form-input__error-msg">Please enter a Purchaseorder code</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Payment terms</span>
              <div class="form-input__input">
                <input v-model="formData.paymentterms" type="text" name="" />
              </div>
              <span v-if="errorData.paymentterms" class="form-input__error-msg">Please specify the payement terms</span>
            </label>
          </div>
          <div class="flex-width-1-2 less-gp">
            <label  class="form-input">
              <span class="form-input__label">Order date</span>
              <div class="form-input__input">
                <input type="date" v-model="formData.orderdate" name="" />
              </div>
              <span v-if="errorData.orderdate" class="form-input__error-msg">Please enter the order date</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Due date</span>
              <div class="form-input__input">
                <input type="date" v-model="formData.duedate" name="" />
              </div>
              <span v-if="errorData.duedate" class="form-input__error-msg">Please enter the due date</span>
            </label>
          </div>

          <!-- <label  class="form-input">
            <span class="form-input__label">Description</span>
            <div class="form-input__input">
              <textarea v-model="formData.description" row="5" ></textarea>
            </div>
          </label> -->

          <!-- <hr /> -->
          <!--  -->
          <DataTable :poitems="poitems" :type="'purchaseOrder'" />
          <!-- <div v-for="(input,k) in poitems" :key="k">
            <div class="flex-width-1-3 less-gp">
              <label class="form-input">
                <span class="form-input__label">Product</span>
                <div class="form-input__input">
                  <select @change="setMerchID(k)" v-model="input.productID" class="filter-btn box-deco-smallr">
                    <option value="">-Select Product-</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">
                      {{ product.productname }}
                    </option>
                  </select>
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Quantity</span>
                <div class="form-input__input">
                  <input v-model="input.quantity" type="text">
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Vendor Product code</span>
                <div class="form-input__input">
                  <input v-model="input.vendorproductcode" type="text">
                </div>
              </label>
            </div>
            <div class="flex-width-1-3 less-gp">
              <label class="form-input">
                <span class="form-input__label">Unit price</span>
                <div class="form-input__input">
                  <input v-model="input.unitprice" type="text">
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Discount price</span>
                <div class="form-input__input">
                  <input v-model="input.discountprice" type="text">
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Total price</span>
                <div class="form-input__input">
                  <input v-model="input.totalprice" type="text">
                </div>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label class="form-input" v-show="k == poitems.length-1">
                <button @click="addChild(k)" class="btn btn-icon" type="button">
                  +
                </button>
              </label>
              <label class="form-input" v-show="k || ( !k && poitems.length > 1)">
                <button @click="removeChild(k)" class="btn btn-icon" type="button">
                  -
                </button>
              </label>
            </div>
          </div> -->
          <div class="d-flx-alc-jfe mt-3">
            <button type="button" class="btn btn-no-fill">
              Cancel
            </button>
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1" @click="savePurchaseOrder">
              + Create PO
            </button>
          </div>
        </div>
      </overlay-scrollbars>
    </div>
  </div>
</template>
<script>
import DataTable from '../../../../components/DataTable'
export default {
	layout: 'main',
	components: {
		DataTable
	},
	data: () => ({
		formData: {
		  template: '',
			merchID: '',
			branchID: '',
			vendorID: '',
			purchaseordercode: '',
			paymentterms: '',
			description: '',
			orderdate: '',
			duedate: '',
			currency: 'NGN',
			createdby: '',
			purchaseorderitems: []
		},
		listProductData: {
			page: 1,
			merchID: '',
			branchID: '',
			categoryID: '',
			search: ''
		},
		errorData : {
			branchID: false,
			vendorID: false,
			purchaseordercode: false,
			paymentterms: false,
			orderdate: false,
			duedate: false,
		},
		poitems: [{
			productID: '',
			packsize: 1,
			packquantity: '',
			packcost: '',
			quantity: '',
			vendorproductcode: '',
			unitprice: 0,
			discountprice: 0,
			totalprice: 0,
			merchID: ''
		}],
		products: [],
		branches: [],
		vendors: []
	}),
	methods: {
		validate () {
			if(this.formData.purchaseordercode == ''){
				this.errorData.purchaseordercode = true;
				return true
			}

			if(this.formData.orderdate == ''){
				this.errorData.orderdate = true;
				return true
			}
      
			if(this.formData.branchID == ''){
				this.errorData.branchID = true;
				return true
			}
      
			if(this.formData.vendorID == ''){
				this.errorData.vendorID = true;
				return true
			}

			if(this.formData.paymentterms == ''){
				this.errorData.paymentterms = true;
				return true
			}

			if(this.formData.purchaseorderitems.length == 0){
				this.$toast.error('Add at least one product')
			}

			if(this.formData.duedate == ''){
				this.errorData.duedate = true;
				return true
			}
		},
		savePurchaseOrder() {
			this.formData.createdby = this.user.id
			this.formData.purchaseorderitems = this.poitems
      
			if(this.validate()) {
				return;
			}

			console.log(this.formData)
			$('#submitBtn').attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('purchaseorders/savePurchaseOrder', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Create PO')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.clearFormData()
						this.errorData = {
							branchID: false,
							vendorID: false,
							purchaseordercode: false,
							paymentterms: false,
							orderdate: false,
							duedate: false,
						}
						this.$router.push('/inventory/purchase-order')
						return
					}
					
					this.$toast.error(res.data.message)
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Create PO')
					console.log(err)
				})
		},
		clearFormData() {
		  this.formData = {
				template: '',
				branchID: '',
				vendorID: '',
				purchaseordercode: '',
				paymentterms: '',
				description: '',
				orderdate: '',
				duedate: '',
				currency: 'NGN',
				createdby: '',
				purchaseorderitems: []
			}
		},
		addChild () {
			this.poitems.push({
				productID: '',
				quantity: '',
				vendorproductcode: '',
				unitprice: 0,
				discountprice: 0,
				totalprice: 0,
				merchID: ''
			})
		},
		removeChild (index) {
			this.poitems.splice(index, 1)
		},
		getProducts(param) {
			if (param != undefined && param == 'branchID'){
				this.listProductData.page = 1
			}
			this.$store.dispatch('products/listProducts', this.formData.merchID)
				.then(res =>{
					this.products = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		setMerchID(index) {
		  this.poitems[index].merchID = this.formData.merchID
		},
		getBranches() {
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		getVendors() {
			this.$store.dispatch('vendor/listVendors', this.formData.merchID)
				.then(res =>{
					this.vendors = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.poitems[0].merchID = this.user.role ? this.user.merchID : this.user.id
		this.getBranches()
		this.getProducts()
		this.getVendors()
	}
}
</script>
<style scoped>

</style>