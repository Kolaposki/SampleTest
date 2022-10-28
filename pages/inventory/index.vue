<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="page-extras">
      <p class="fw-medium font-16"></p>
	  
      <div class="search-filter d-flx-alc-jfe">
	  <div class="drop-down filter-drop">
          <select  v-model="branchID" @change="filterByBranch()" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div>
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
      </div>
    </div>
    <div id="parent-component">
		<div id="transfer-quantity" uk-modal container="#parent-component" >
			<div class="uk-modal-dialog uk-margin-auto-vertical modal">
			<button class="uk-modal-close-default" type="button" uk-close></button>
			<div class="modal-header">
				<h2>Transfer Quantity</h2>
				<p>Amount will be added to the existing quantity</p>
			</div>
			<form @submit.prevent="trfQty">
				<overlay-scrollbars class="modal-body" uk-modal-auto>
				
				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label">Source Branch</span>
					<div class="form-input__input">


						{{stock_branch.source_id}}
						<Select2 required v-model="stock_branch.source_id" :options="stock_branches" />
					</div>
					</label>
				</div>

				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label">Source Product</span>
					<div class="form-input__input">
						<Select2 required v-model="stock_data.source_id" :options="source_products" />
					</div>
					</label>
				</div>

				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label">Destination Branch</span>
					<div class="form-input__input">
						<Select2 v-model="stock_branch.destination_id" :options="stock_branches" />
					</div>
					</label>
				</div>

				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label">Destination Product</span>
					<div class="form-input__input">
						<Select2 v-model="stock_data.destination_id" required :options="destination_products" />
					</div>
					</label>
				</div>

				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label">Quantity</span>
					<div class="form-input__input">
						<input type="number" required v-model="stock_data.qty">
					</div>
					</label>
				
				</div>

				</overlay-scrollbars>
				<div class="d-flx-alc-jfe mt-5">
				<button type="button" @click="closeTrfQty" class="btn btn-no-fill">
					Cancel
				</button>
				<button id="trfQty" type="submit" class="btn btn--primary ml-1">
					Transfer Quantity
				</button>
				</div>
			</form>
			</div>
		</div>


      <div id="set-quantity" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeSetQuantity" uk-close></button>
          <div class="modal-header">
            <h2>Update Quantity for : {{productcode}}</h2>
            <p>Amount will be added to the existing quantity, for subtraction add a minus sign before the amount</p>
          </div>
          <form @submit.prevent="setQuantity">
            <overlay-scrollbars class="modal-body" uk-modal-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Quantity</span>
                  <div class="form-input__input">
                    <input type="number" required v-model="formData.quantity">
                  </div>
                </label>
               
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeSetQuantity" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                Update Quantity
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="set-price" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="cancelPrice" uk-close></button>
          <div class="modal-header">
            <h2>Set Cost Price for: {{productcode}}</h2>
          </div>

          <form @submit.prevent="setPrice">
            <overlay-scrollbars :class="'modal-body'" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Cost Price</span>
                  <div class="form-input__input">
                    <input type="number" required v-model="editData.costprice">
                  </div>
                </label>
                
              </div>
              <div class="d-flx-alc-jfe mt-5">
                <button type="button" @click="cancelPrice" class="btn btn-no-fill">
                  Cancel
                </button>
                <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                  Set Cost Price
                </button>
              </div>
            </overlay-scrollbars>
          </form>
        </div>
      </div>
	   <div id="set-waste" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="cancelWaste" uk-close></button>
          <div class="modal-header">
            <h2>Set Damage Qty For: {{productcode}}</h2>
          </div>

          <form @submit.prevent="setWasteQty">
            <overlay-scrollbars :class="'modal-body'" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Quantity</span>
                  <div class="form-input__input">
                    <input type="number" required v-model="setWaste.waste">
                  </div>
                </label>
                
              </div>
              <div class="d-flx-alc-jfe mt-5">
                <button type="button" @click="cancelWaste" class="btn btn-no-fill">
                  Cancel
                </button>
                <button id="wasteBtn" type="submit" class="btn btn--primary ml-1">
                  Set Damage
                </button>
              </div>
            </overlay-scrollbars>
          </form>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">
      <ul class="card-list none flex-width-1-3 less-gp">
        <li class="card-item box-deco-bg" style="background-color: forestgreen">
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
              <p class="card-item__body--count"> ₦{{formatPrice(getTotalPrice)}}</p>
            </div>
          </nuxt-link>
        </li>
        <li class="card-item box-deco-bg" >
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
        <h3 class="section-title">Inventory</h3>
		<div v-if="!loading" href="javascript:;" @click="openTransferStock" class="btn btn--primary" type="button">
            Transfer Stock
          </div>
		  <div v-else href="javascript:;" class="btn btn--primary" type="button">
            Loading ...
          </div>
      </div>

      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class="column-name">S/N</th>
              <th class="column-name">Product Code</th>
              <th class="column-name">Product Name</th>
              <th v-if="branches.length > 0" class="column-name">Branch</th>
              <th class="">Stock Quantity</th>
              <th class="">Cost Price(₦)</th>
			  <th class="">Damage Qty</th>
              <th class="">Action</th>
            </tr>
          </thead>
          <tbody class="tablebody">

		
            <tr v-if="loading"><td colspan="6">Loading...please wait</td></tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="6">No inventory record</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
          
			  <td style="color: #353190;" class="column-name">
                #{{ ix + 1}}.
              </td>
              <td class="column-name">{{ row.productcode != null && row.productcode != 'null' ? row.productcode : '' }}</td>
              <td class="column-name">{{row.productname}}</td>
              <td v-if="branches.find(x => x.id == row.branchID)" class="column-name">{{branches.find(x => x.id == row.branchID).branchname}}</td>
			  <td v-else> </td>
              <td >{{formNumber(row.stockqty)}}</td>
              <td>{{ formatPrice(row.costprice) }}</td>
			  <td>{{ formNumber(row.waste)}}</td>
              <div class="drop-down org-drop drop-set">
                <button class="btn btn-icon drop-set"  type="button" @click.stop="toggleDropdown($event)">
                  <svg class=" drop-set">
                    <use xlink:href="/uploads/icons.svg#more"></use>
                  </svg>
                </button>
                <div class="drop-wrapper" data-drop-down>
                  <ul class="drop-lists">
                    <li class="drop-list-item">
                      <button class="btn btn-text"  @click="editQuantity(row)" title="Edit Quantity" type="button">
                        Update Quantity
                      </button>
                    </li>
                    <li class="drop-list-item">
                      <button class="btn btn-text" @click="editPrice(row)" title="Receive note" type="button">
                        Set Cost Price
                      </button>
                    </li>
					<li class="drop-list-item">
                      <button class="btn btn-text" @click="setWast(row)" title="Receive note" type="button">
                        Add Damage Qty
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>


  </overlay-scrollbars>
</template>
<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.inventory.filter(vendor => {
				if (vendor.productname != null && vendor.productname != 'null' && vendor.productname.toLowerCase().includes(this.search.toLowerCase())) {
					return vendor.productname.toLowerCase().includes(this.search.toLowerCase());
				} else if(vendor.productcode != null && vendor.productcode != 'null' && vendor.productcode.toLowerCase().includes(this.search.toLowerCase())) {
					return vendor.productcode.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},

		source_products () {
			return this.inventory_list.filter(x => x.branchID == this.stock_branch.source_id).map((x) => { return {id: x.id, text: x.productname}})
		},

		destination_products () {
			return this.inventory_list.filter(x => x.branchID == this.stock_branch.destination_id).map((x) => { return {id: x.id, text: x.productname}})
		},

		stock_branches () {
			return this.branches.map((x) => { return {id: x.id, text: x.branchname}})
		},
		getTotalPrice () {
			let inv = this.inventory;
			let total = inv.map(el => el.costprice).reduce((acc, curr) => {
				acc += Number(curr)
				return acc
			}, 0);
			return total;
		},
    
		// getTotalPrice(){
		//   return this.inventory.map((inv) => inv);
		// }
	},
	data: () => ({
		search: '',
		totalprice: '',
		productcode: '',
		branches: [],
		inventory_list: [],
		branchID: '',
		inventory: [],
		stock_data:{
			source_id: '',
			destination_id: '',
			qty: ''
		},
		stock_branch:{
			source_id: '',
			destination_id: ''
		},
		formData:  {
			merchID: "",
			branchID: "",
			quantity: "",
			productID: ''
		},
		editData: {
			merchID: "",
			branchID: "",
			costprice: "",
			productID: ''
		},
		setWaste: {
			merchID: "",
			branchID: "",
			waste: "",
			productID: ''
		},
		loading: true,
		vendors: [],
		purchaseorders: [],
		deleteData: {
		  id: ''
		}
	}),
	methods: {
		trfQty() {
		  $('#trfQty').attr('disabled', true).html('Transferring quantity..please wait')
		  	this.stock_data.merchID = this.formData.merchID
			console.log(this.stock_data)
			this.$store.dispatch('inventory/trfQty', this.stock_data)
				.then(res =>{
					$('#trfQty').attr('disabled', false).html('Transfer Quantity')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeTrfQty()
						this.listInventory()
						return
					}

					this.$toast.error(res.data.message)
					
				}).catch(err =>{
					this.$toast.error('An error occured')
					$('#trfQty').attr('disabled', false).html('Set Cost Price')
					console.log(err)
				})
		},	
		openTransferStock(){
			console.log('hey')
			UIkit.modal('#transfer-quantity').show();

		},
		editQuantity(inventory) {
			this.productcode = inventory.productname
			if(inventory.productcode  != '' && inventory.productcode != null && inventory.productcode != 'null') {
				this.productcode += ' (' + inventory.productcode + ')';
			}
			this.formData = {
				productID: inventory.id,
				// id: inventory.id,
				branchID: inventory.branchID,
				merchID: inventory.merchID,
				// quantity: inventory.stockqty,
				quantity: ''
			}
			UIkit.modal('#set-quantity').toggle()
		},
		listBranches() {
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(e =>{
				})
		},
		filterByBranch() {
			this.inventory = this.inventory_list.filter(vendor => {
				console.log('branchID')
				console.log(this.branchID)
				if(this.branchID != '' && this.branchID != undefined && vendor.branchID != null && vendor.branchID != 'null' && vendor.branchID == this.branchID) {
					return vendor.branchID == this.branchID
				}
				else if(this.branchID == ''){
					// this.listInventory()'
					return vendor.branchID == ''
				}
			})
		},
		setQuantity() {
			$('#submitBtn').attr('disabled', true).html('Updating quantity...Please wait')
			this.$store.dispatch('inventory/setQuantity', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('Update Quantity')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listInventory()
						this.closeSetQuantity()
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('Update Quantity')
					this.$toast.error(err)
				})
		},
		closeTrfQty(){
			this.stock_data = {
				source_id: '',
				destination_id: '',
				qty: ''
			}
			this.stock_branch = {
				source_id: '',
				destination_id: ''
			}

			UIkit.modal('#transfer-quantity').toggle();
		},
		cancelSetQuantity() {
		  this.formData = {
				merchID: '',
				branchID: "",
				quantity: "",
				productID: '',
				id: ''
			}
      
			this.formData.merchID = this.user.id
      
		},
		closeSetQuantity() {
		  this.cancelSetQuantity()
			UIkit.modal('#set-quantity').toggle('hide')
		},
		editPrice(inventory) {
			this.productcode = inventory.productname
			if(inventory.productcode  != '' && inventory.productcode != null && inventory.productcode != 'null') {
				this.productcode += ' (' + inventory.productcode + ')';
			}
			this.editData = {
				productID: inventory.id,
				// id: inventory.id,
				branchID: inventory.branchID,
				merchID: inventory.merchID,
				costprice: ''
				// costprice: inventory.costprice
			}
			UIkit.modal('#set-price').toggle()
		},
		setWast(inventory) {
			this.productcode = inventory.productname
			if(inventory.productcode  != '' && inventory.productcode != null && inventory.productcode != 'null') {
				this.productcode += ' (' + inventory.productcode + ')';
			}
			this.setWaste = {

				productID: inventory.id,
				// id: inventory.id,
				branchID: inventory.branchID,
				merchID: inventory.merchID,
				waste: ''
				// costprice: inventory.costprice
			}
			UIkit.modal('#set-waste').toggle()
		},
		setPrice() {
		  $('#updateBtn').attr('disabled', true).html('Setting Waste..please wait')
			this.$store.dispatch('inventory/setCostPrice', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('Set Cost Price')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.cancelPrice()
						this.listInventory()
						return
					}

					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#updateBtn').attr('disabled', false).html('Set Cost Price')
					console.log(err)
				})
		},
	   setWasteQty() {
		  $('#wasteBtn').attr('disabled', true).html('Setting  DAMAGE ..please wait')
			this.$store.dispatch('inventory/setWaste', this.setWaste)
				.then(res =>{
					$('#wasteBtn').attr('disabled', false).html('Set DAMAGE  Quantity')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.cancelWaste()
						this.listInventory()
						return
					}
					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#wasteBtn').attr('disabled', false).html('Set Waste Quantity')
					console.log(err)
				})
		},
		cancelPrice() {
		  this.editData = {
				merchID: "",
				branchID: "",
				costprice: "",
				productID: '',
				id: '',
			}
			UIkit.modal('#set-price').toggle('hide')
		},
		cancelWaste() {
		  this.editData = {
				merchID: "",
				branchID: "",
				waste: "",
				productID: '',
				id: '',
			}
			UIkit.modal('#set-waste').toggle('hide')
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
						this.inventory_list = res.data.data
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
		this.listPurchaseOrders()
		this.listBranches()
	}
}
</script>
<style scoped>
.table-wrapper.no-deco {
  padding-right: unset !important;
  /*  */
  
}
</style>