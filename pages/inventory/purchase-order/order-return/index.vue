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
        <h3 class="section-title">Save Goods Return note</h3>
      </div>
      <overlay-scrollbars class="table-wrapper no-deco">
        <div class="mt-2" >
          <div class="flex-width-1-1 less-gp">
            <label  class="form-input">
              <span class="form-input__label">Purchase Order</span>
              <div class="form-input__input">
                <select @change="setPurchaseOrder" v-model="purchaseorder" class="filter-btn box-deco-smallr">
                  <option value="">-Select Purchase Order-</option>
                  <option v-for="(po) in purchaseOrders" :key="po.id" :value="po.purchaseordercode">
                    {{ po.purchaseordercode }}
                  </option>
                </select>
              </div>
			  
			  <span v-if="errorData.purchaseID" class="form-input__error-msg">Please select a purchase order</span>
            </label>
          </div>
          
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
              <span class="form-input__label">Return date</span>
              <div class="form-input__input">
                <input type="date" v-model="recievedate" name="" />
              </div>
			  <span v-if="errorData.orderdate" class="form-input__error-msg">Please select a Return Date</span>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Due date</span>
              <div class="form-input__input">
                <input type="date" v-model="formData.duedate" name="" />
              </div>
            </label>
          </div>

          <!-- <label  class="form-input">
            <span class="form-input__label">Description</span>
            <div class="form-input__input">
              <textarea v-model="formData.description" row="5"></textarea>
            </div>
          </label>

          <hr /> -->

          <ReturnNotes :poitems="poitems" ref="returnote" :type="'returnNotes'" />

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
                <span class="form-input__label">Total price</span>
                <div class="form-input__input">
                  <input v-model="input.totalprice" type="text">
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label">Receive date</span>
                <div class="form-input__input">
                  <input v-model="input.receivedate" type="date">
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
          <div class="d-flx-alc-jfe mt-3" id="footer">
            <button @click="cancelOrderReturn" type="button" class="btn btn-no-fill">
              Cancel
            </button>
            <button type="submit" id="submitBtn" class="btn btn--primary ml-1" @click="saveGoodsReturn">
              + Save Goods Return Note
            </button>
          </div>

        </div>
      </overlay-scrollbars>
    </div>
  </div>
</template>
<script>
import ReturnNotes from '../../../../components/ReturnNotes'
export default {
	layout: 'main',
	components: {
		ReturnNotes
	},
	data: () => ({
		formData: {
			merchID: '',
			description: '',
			vendorID: '',
			branchID: '',
			orderdate: '',
			duedate: '',
			purchaseID: '',
			notedetails: []
		},
		errorData: {
			purchaseID : false,
			orderdate : false
		},
		poitems: [],
		vendors: [],
		branches: [],
		products: [],
		purchaseorder: '',
		purchaseOrders: []
	}),
	computed :{
		recievedate : {
			set (val) {
				this.$refs.returnote.setDate(val)
				this.formData.orderdate = val
				console.log('hey')
			},

			get () {
				return this.formData.orderdate
			}
		}
	},
	methods: {
		validate() {
			if(this.formData.purchaseID == ''){
				this.errorData.purchaseID = true;
				return true
			}

			if(this.formData.orderdate == ''){
				this.errorData.orderdate = true;
				return true
			}

			let products = this.formData.notedetails.filter(res => res.receivedate == '')
			console.log(products)
			
			if (products.length > 0) {
				this.$toast.error("Recieve Date for products "+ products.map(res => res.vendorproductcode).reduce((acc, cur) => {
					acc += ', ' + cur
					return acc
				})  +" are empty")
				return true
			}
		},
		saveGoodsReturn() {
			
			this.formData.notedetails = this.poitems

			if(this.validate()) {
				return;
			}

			$('#submitBtn').attr('disabled', true).html('Saving.....')
			this.$store.dispatch('purchaseorders/saveGoodsReturnNote', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Save Goods Return Note')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.$router.push('/inventory/purchase-order')
						this.errorData = {
							purchaseID : false,
							orderdate : false
						}
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('+ Save Goods Return Note')
				})
		},
		cancelOrderReturn() {
		  this.$router.push('/inventory/purchase-order')
		},
    	getTotalQty (data) {
			if(data != undefined) {
				return data.map(el => el.quantity).reduce((total, curr) => {
					total += Number(curr)
					return total
				}, 0)
			}
		},
		setGoodsReturnNote() {
			let purchaseorder = JSON.parse(localStorage.getItem('po_data')) //
			let returnotes = JSON.parse(localStorage.getItem('goodsReturn'))
			if(purchaseorder) {
				this.formData.purchaseID = purchaseorder.id
				this.formData.branchID = purchaseorder.branchID
				this.formData.vendorID = purchaseorder.vendorID
				this.formData.description = purchaseorder.description
				this.formData.duedate = this.$moment(purchaseorder.duedate).format('YYYY-MM-DD')
				// 
				let returnitem = purchaseorder.receiveorderitems;

				this.purchaseorder = purchaseorder.purchaseordercode
        
				let purchaseorderdetails = returnotes.goodsreturnnoteitems
        
				if (purchaseorderdetails.length > 0) {
					for (let i = 0; i < purchaseorderdetails.length; i++) {
						// let quantityreceived = purchase.find((p) => {
						// 	return p.productID == returnitem[i].productID
						// }).quantity;
            
						let quantityreceived = this.getTotalQty(returnitem.map((val) => val.receivenoteitems.filter( (item) => item.productID == purchaseorderdetails[i].productID )).reduce((acc, crr) => {
							acc.push(...crr); 
							return acc;
						}, []));
            
						this.poitems.push({
							productID: purchaseorderdetails[i].productID,
							quantity: purchaseorderdetails[i].quantity,
							vendorproductcode: purchaseorderdetails[i].vendorproductcode,
							quantityreceived: quantityreceived,
							quantityleft: quantityreceived - purchaseorderdetails[i].quantity,
							unitprice: purchaseorderdetails[i].unitprice,
							totalprice: purchaseorderdetails[i].totalprice,
							branchID: purchaseorder.branchID,
							receivedate: purchaseorderdetails[i].receivedate,
							merchID: purchaseorderdetails[i].merchID
						})
					}
				} 
				$(" input").prop("disabled", true);
				$("select").prop("disabled", true);
        
				$("textarea").prop("disabled", true);
				$("#footer").hide();
				$('.section-title').html('Goods Return Note For Purchase Order : '+purchaseorder.purchaseordercode)
			}
		},
		addChild() {
			this.poitems.push({
				productID: '',
				quantity: '',
				vendorproductcode: '',
				unitprice: 0,
				totalprice: 0,
				branchID: '',
				receivedate: '',
				merchID: ''
			})
		},
		removeChild(index) {
			this.poitems.splice(index, 1)
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
		listPurchaseOrders() {
		  this.$store.dispatch('purchaseorders/listPurchaseOrder', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.purchaseOrders = res.data.data
						this.loading = false
						return
					}
          
					this.$toast.error('An error occurred while retrieving records')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred while retrieving records')
				})
		},
		setPurchaseOrder (event) {

			this.poitems = [];
      
			let purchaseorder = this.purchaseOrders.find((p) => p.purchaseordercode == event.target.value);
			console.log(this.purchaseOrders)
			if(purchaseorder) {
				this.formData.purchaseID = purchaseorder.id
				this.formData.branchID = purchaseorder.branchID
				this.formData.vendorID = purchaseorder.vendorID
				this.formData.description = purchaseorder.description
				this.formData.duedate = this.$moment(purchaseorder.duedate).format('YYYY-MM-DD')

				

				let purchaseorderdetails = purchaseorder.purchaseorderitems
				console.log(purchaseorderdetails);
				if (purchaseorderdetails.length > 0) {
					for (let i = 0; i < purchaseorderdetails.length; i++) {
					  this.poitems.push({
							productID: purchaseorderdetails[i].productID,
							quantity: purchaseorderdetails[i].quantity,
							quantityreceived: purchaseorderdetails[i].quantity,
							quantityleft: 0,
							vendorproductcode: purchaseorderdetails[i].vendorproductcode,
							unitprice: purchaseorderdetails[i].unitprice,
							totalprice: purchaseorderdetails[i].totalprice,
							total: purchaseorderdetails[i].totalprice,
							branchID: purchaseorder.branchID,
							receivedate: '',
							merchID: purchaseorderdetails[i].merchID
						})
					}
				} else {
					this.addChild()
					this.removeChild(1)
				}
			}

		}
	},
	mounted() {
		this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getProducts()
		this.getBranches()
		this.getVendors()
		this.listPurchaseOrders()
		this.setGoodsReturnNote()
	}
}
</script>