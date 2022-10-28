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
        <h3 class="section-title">Edit Purchase Order</h3>
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
            <span v-if="errorData.orderdate" class="form-input__error-msg">Please select a Return Date</span>
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
          </label>

          <hr /> -->

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
            <nuxt-link to="/inventory/purchase-order" type="button" class="btn btn-no-fill">
              Cancel
            </nuxt-link>
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1" @click="editPurchaseOrder">
              + Update PO
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
		  id: '',
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
		poitems: [{
			id:'',
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
		errorData : {
			branchID: false,
			vendorID: false,
			purchaseordercode: false,
			paymentterms: false,
			orderdate: false,
			duedate: false,
		},
		vendors: [],
		branches: [],
		products: []
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
      
      

			if(this.formData.duedate == ''){
				this.errorData.duedate = true;
				return true
			}
		},
		editPurchaseOrder() {

			this.formData.purchaseorderitems = this.poitems

			if(this.validate()) {
				return;
			}
			
			$('#submitBtn').attr('disabled', true).html('Updating..please wait')
			this.$store.dispatch('purchaseorders/editPurchaseOrder', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Update PO')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.errorData = {
							branchID: false,
							vendorID: false,
							purchaseordercode: false,
							paymentterms: false,
							orderdate: false,
							duedate: false,
						}
						this.$router.push('/inventory/purchase-order')
						return;
					}

					this.$toast.error('An error occurred.')
				}).catch(err =>{
				  console.log(err)
					$('#submitBtn').attr('disabled', false).html('+ Update PO')
				})
		},
		setFormData() {
			let purchaseOrder = JSON.parse(localStorage.getItem('po_data'))
			this.formData = {
			    id: purchaseOrder.id,
				template: '',
				merchID: purchaseOrder.merchID,
				branchID: purchaseOrder.branchID,
				vendorID: purchaseOrder.vendorID,
				purchaseordercode: purchaseOrder.purchaseordercode,
				paymentterms: purchaseOrder.paymentterms,
				description: purchaseOrder.description,
				orderdate: this.$moment(purchaseOrder.orderdate).format('YYYY-MM-DD'),
				duedate: this.$moment(purchaseOrder.duedate).format('YYYY-MM-DD'),
				currency: 'NGN',
				createdby: this.user.id,
			}
			let purchaseorderdetails = purchaseOrder.purchaseorderitems
			if (purchaseorderdetails.length > 0) {
				for (let i = 0; i < purchaseorderdetails.length; i++) {
					// let quantityordered = purchase.find((p) => {
					// 	return p.productID == purchaseorderdetails[i].productID
					// }).quantity;
          
					let total = (purchaseorderdetails[i].quantity * purchaseorderdetails[i].unitprice);
          
					  // purchaseorderdetails[i].packcost = total / purchaseorderdetails[i].unitprice
					
					  purchaseorderdetails[i].packquantity = total / purchaseorderdetails[i].packcost
            
					  // purchaseorderdetails[i].packsize = purchaseorderdetails[i].quantity / purchaseorderdetails[i].packquantity
					
					  this.poitems.push({
						id:purchaseorderdetails[i].id,
						productID: purchaseorderdetails[i].productID,
						quantity: purchaseorderdetails[i].quantity,
						packsize: purchaseorderdetails[i].packsize,
						packcost: purchaseorderdetails[i].packcost,
						packquantity: purchaseorderdetails[i].packquanity,
						vendorproductcode: purchaseorderdetails[i].vendorproductcode,
						unitprice: purchaseorderdetails[i].unitprice,
						totalprice: purchaseorderdetails[i].totalprice,
						branchID: purchaseOrder.branchID,
						merchID: purchaseorderdetails[i].merchID
					})
				}
			}
			if(purchaseorderdetails.length > 0) {
				this.poitems = purchaseorderdetails
			}else{
				this.addChild()
				this.removeChild(1)
			}
		},
		addChild() {
			this.poitems.push({
				id: '',
				productID: '',
				quantity: '',
				vendorproductcode: '',
				unitprice: 0,
				discountprice: 0,
				totalprice: 0,
				merchID: ''
			})
		},
		removeChild(index) {
			this.poitems.splice(index, 1)
		},
		getProducts() {
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
		this.formData.merchID = this.user.id
		this.getProducts()
		this.getVendors()
		this.getBranches()
		this.setFormData()
	}
}
</script>