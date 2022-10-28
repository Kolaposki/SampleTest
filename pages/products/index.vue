<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="page-extras">
      <p class="fw-medium font-16"></p>
	  
      <div class="search-filter d-flx-alc-jfe">
	  	<div class="drop-down filter-drop">
          <select  v-model="listProductData.branchID" @change="listProducts('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Branches</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.branchname }}
            </option>
          </select>
        </div>
		<div class="drop-down filter-drop">
          <select  v-model="listProductData.categoryID" @change="listProducts('branchID')" class="filter-btn box-deco-smallr">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
				{{ category.categoryname }}
			</option>
          </select>
        </div>
		
        <label class="search-w-icon">
          <input v-model="search" type="text" @keyup.enter="searchProducts" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
      </div>
    </div>
<!--    container="#parent-component" -->
    <div id="parent-component">
      <div id="map-features" uk-modal data-uk-modal="{target:'#map-features',bgclose:false}" container="#parent-component"  >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          
            <overlay-scrollbars class="modal-body">
              <product-feature />

            </overlay-scrollbars>
           
        </div>
      </div>
	</div>
      <div id="miniorder" uk-modal data-uk-modal="{target:'#miniorder',bgclose:false}" container="#parent-component"  >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal product-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
            <overlay-scrollbars class="modal-body">
              <minimum-order-requirement />
            </overlay-scrollbars>
        </div>
      </div>

	  <!--<div id="displayeccomerce" uk-modal data-uk-modal="{target:'#displayeccomerce',bgclose:false}" container="#parent-component"  >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal product-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
            <overlay-scrollbars class="modal-body">
              <DisplayEcommerce />
            </overlay-scrollbars>
        </div>
      </div>-->
      <div id="add-product" uk-modal data-uk-modal="{target:'#add-product',bgclose:false}" container="#parent-component"  >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal product-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
           <div class="modal-header">
            <h2>Add Product</h2>
            <p>Add new Product</p>
          </div>
            <overlay-scrollbars class="modal-body">
              <add-product ref="addProduct" @refresh="recall"  />
            </overlay-scrollbars>
        </div>
      </div>

      <div id="edit-product" uk-modal data-uk-modal="{target:'#edit-product',bgclose:false}" container="#parent-component"  >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal product-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <h2>Edit Product</h2>
            <p>Update existing Product</p>
            <overlay-scrollbars class="modal-body">
              <edit-product ref="editProduct" @refresh="recall" />
            </overlay-scrollbars>
        </div>
      </div>

      <div id="upload-products" uk-modal data-uk-modal="{target:'#upload-products',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" @click="closeUploadProduct" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Upload products</h2>
            <p>Select details for upload a product</p>
          </div>
          <form @submit.prevent="uploadInventoryProduct">
            <overlay-scrollbars class="modal-body">
              <div >
                <label class="form-input">
                  <span class="form-input__label">Branch</span>
                  <div class="form-input__input">
                    <select v-model="uploadData.branchID" class="filter-btn box-deco-smallr">
                      <option value="">-Select Branch-</option>
                      <option v-for="branch in branches" :key="branch.id" :value="branch.id">
                        {{ branch.branchname }}
                      </option>
                    </select>
                  </div>
                  <span v-if="uploadDataError.branch" class="form-input__error-msg">Please select a branch</span>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Category</span>
                  <div class="form-input__input">
                    <select v-model="uploadData.categoryID" class="filter-btn box-deco-smallr">
                      <option value="">-Select Category-</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.categoryname }}
                      </option>
                    </select>
                  </div>
                  <span v-if="uploadDataError.category" class="form-input__error-msg">Please select a category</span>
                </label>
              </div>
              <label  class="form-input">
                <span class="form-input__label">Product type</span>
                <div class="form-input__input">
                  <select v-model="uploadData.producttype" class="filter-btn box-deco-smallr">
                    <option value="">-Select product type-</option>
                    <option v-for="(type, index) in productTypes" :key="index" :value="type.id">
                      {{ type.text }}
                    </option>
                  </select>
                </div>
                <span v-if="uploadDataError.productype" class="form-input__error-msg">Please select a product type</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">File</span>
                <div class="form-input__input">
                  <input type="file" ref="file" accept=".xlsx, .csv, .xls" />
                </div>
                <span v-if="uploadDataError.file" class="form-input__error-msg">Please select a file</span>
              </label>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <a href="/download/productupload.xlsx" download class="btn btn-secondary btn-no-fill">
                Download sample file
              </a>
              <button id="uploadBtn" type="submit" class="btn btn--primary ml-1">
                + Upload Products
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
              <h2>Delete Product?</h2>
              <p>Please confirm you really want to delete this product, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDeleteProduct" id="deleteBtn" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="product-features" uk-modal data-uk-modal="{target:'#product-features',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Product Features</h2>
            <p>These are the list of features mapped of the product - <span style="font-weight: bold;" id="productName"></span></p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <table>
              <thead class="">
              <tr>
                <th class="">Feature type</th>
                <th class="">Feature name</th>
                <th class="">Price</th>
              </tr>
              </thead>
              <tbody class="tablebody">
              <tr v-if="productfeatures.length < 1">
                <td colspan="3">No features mapped for this product</td>
              </tr>
              <tr v-if="productfeatures.length > 0" v-for="feature in productfeatures" :key="feature.id">
                <td>{{ feature.featuretype }}</td>
                <td>{{ feature.featurename }}</td>
                <td>₦ {{ formatPrice(feature.price) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="d-flx-alc-jfe mt-5">
            <button @click="clearDisplayFeatures" type="button" class="btn btn-no-fill">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div id="share" uk-modal data-uk-modal="{target:'#share',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Shareable link</h2>
            <p>Share this product on social networks of your choice</p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <div class="share-link-text">
              <p>Copy link</p>
              <div>
                <div class="form-input__input">
                  <input type="text" :value="link" />
                </div>

                <div class="d-flx-alc-jfe mt-3">
                  <button class="btn btn-no-fill" @click.stop.prevent="copyLink">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

	
	
    <div class="inner-main-wrapper">
      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">PRODUCTS</h3>
        <div class="search-filter d-flx-alc-jfe">
          <!--<div v-if="!this.isSupervisor" href="javascript:;" @click="openDisplayEcccomerce" class="btn btn--primary" type="button">
            Eccommerce Visibility
          </div>-->
          <a v-if="!this.isSupervisor" href="javascript:;" @click="openMiniOrder" class="btn btn--primary" type="button">
            Minimum Order Value
          </a>
          <a href="javascript:;" @click="openProductFeatures" class="btn btn--primary" type="button">
            Add Special Features
          </a>
          <!-- <nuxt-link to="/products/add" class="btn btn--primary" type="button">
            + Add new product
          </nuxt-link> -->
          <a href="javascript:;" @click="addProduct" class="btn btn--primary" type="button">
            + Add new product
          </a>
          <a href="javascript:;" @click="uploadProduct" class="btn btn--primary" type="button">
            + Batch uploads
          </a>
        </div>
      </div>
	  <pagination :headers="headers" v-model="listProductData.page" @go="listProducts" />
      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <th class="column-name">Image</th>
              <th class="column-name">Name</th>
              <th class="column-name">Code</th>
              <th class="column-name">Branch</th>
              <th class="">Amount (₦)</th>
              <th class="">Discount</th>
              <th class="">Stock</th>
              <th class="">Action</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="7">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="7">No record. Please add a product.</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <td v-if="row.photo" class="column-name">
                <img :src="row.photo" />
              </td>
              <td v-else class="column-name">No photo</td>
              <td style="color: #353190;" class="column-name">{{ row.productname }}</td>
              <td class="column-name">{{ row.productcode != null && row.productcode != 'null' ? row.productcode : '' }}</td>
              <td class="column-name">{{ row.branchname }}</td>
              <td>{{ formatPrice(row.sellingprice) }}</td>
              <td> {{ formatPrice(row.discount) }}</td>
              <td>{{ formNumber(row.stockqty) }}</td>
              <div class="td">
                <div class="drop-down org-drop drop-set">
                  <button class="btn btn-icon drop-set" type="button" @click.stop="toggleDropdown($event)">
                    <svg class="drop-set">
                      <use xlink:href="/uploads/icons.svg#more"></use>
                    </svg>
                  </button>
                  <div class="drop-wrapper" data-drop-down>
                    <ul class="drop-lists">
                      <li class="drop-list-item">
                        <button class="btn btn-text" @click="displayFeature(row)" title="View product feature" type="button">
                          Display Features
                        </button>
                      </li>
                      <li class="drop-list-item">
                        <button class="btn btn-text" @click="editProduct(row)"  type="button">
                          Edit Product
                        </button>
                      </li>
                      <li class="drop-list-item">
                        <button class="btn btn-text" @click="deleteProduct(row)"  type="button">
                          Delete Product
                        </button>
                      </li>
                      <li class="drop-list-item">
                        <button class="btn btn-text" @click="generateShare(row)"  type="button">
                          Share Product
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- <td class="d-flx-alc-fw">
                <button class="btn btn-icon" @click="displayFeature(row)" title="View product feature" type="button">
                  <svg>
                    <use href="/uploads/icons.svg#view"></use>
                  </svg>
                </button>
                <button class="btn btn-icon" title="Edit" @click="editProduct(row)" type="button">
                  <svg>
                    <use href="/uploads/icons.svg#edit"></use>
                  </svg>
                </button>
                <button class="btn btn-icon" type="button" @click="deleteProduct(row)">
                  <svg>
                    <use href="/uploads/icons.svg#delete"></use>
                  </svg>
                </button>
                <button class="btn btn-icon" type="button" @click="generateShare(row)">
                  <svg>
                    <use xlink:href="/uploads/icons.svg#share"></use>
                  </svg>
                </button>
              </td> -->
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>


  </overlay-scrollbars>
</template>
<style scoped>
.btn--primary{
  margin-bottom: 2px !important;
}
.btn {
	 padding: 0.6rem 1.2rem;
}
</style>
<script>
import MinimumOrderRequirement from '../../components/MinimumOrderRequirement.vue';
import DisplayEcommerce from '../../components/DisplayEcommerce.vue';
import ProductFeature from '../../components/ProductFeature.vue';
import AddProduct from '../../components/AddProduct.vue';
import EditProduct from '../../components/EditProduct.vue';
import Pagination from '../../components/Pagination.vue';
export default {
	components: { ProductFeature, DisplayEcommerce, MinimumOrderRequirement, AddProduct, EditProduct, Pagination },
	layout: 'main',
	computed: {
		filteredList () {
			return this.lProducts;
		}
	},
	data: () => ({
		search: '',
		loading: true,
		listProductData: {
			page: 1,
			merchID: '',
			branchID: '',
			categoryID: '',
			search: ''
		},
		formData: {
		    merchID: '',
			featureID: '',
			productID: '',
			priceID: ''
		},
		headers: {
			Next: '',
			Prev: '',
			Count: 0,
			total: 0,
			pagenum: 1
		},
		productID: '',
		lProducts: [],
		lVendors: [],
		lPurchaseOrder: [],
		features: [],
		prices: [],
		productfeatures: [],
		uploadData: {
		  branchID: '',
			merchID: '',
			categoryID: '',
			producttype: ''
		},
		uploadDataError: {
		  branch: false,
			category: false,
			productype: false,
			file: false
		},
		branches: [],
		categories: [],
		deleteData: {
		  id: ''
		},
		productTypes: [
			{id: 'nonstocked_product', text: 'Non stocked product'},
			{id: 'stocked_product', text: 'Stocked product'},
			{id: 'service', text: 'Service product'}
		],
		link: '',
		url: 'https://ntisawebapp.wajesmarthrms.website/product/',
		// url: 'https://checkout.ntisa.com.ng/product/'
	}),
	methods: {
		openProductFeatures () {
			UIkit.modal('#map-features').toggle();
		},
		openMiniOrder () {
			UIkit.modal('#miniorder').toggle();
		},
		openDisplayEcccomerce () {
			UIkit.modal('#displayeccomerce').toggle();
		},
		addProduct () {
			this.$refs.addProduct.clearForm();
			this.$refs.addProduct.getFeatures();
			UIkit.modal('#add-product').toggle('show');
		},
		deleteProduct(product) {
			this.deleteData.id = product.id
			$('#delete-text').addClass('uk-open').show();
		},
		generateShare(product) {
		  let url = this.url + this.user.businessdescription.toLowerCase() + '/' + product.merchID + '/' + product.id + '/'  + this.slugify(product.productname, '-')
			this.link = encodeURI(url)
			UIkit.modal('#share').toggle();
		},
		copyLink() {
		  let vm = this
			this.$copyText(this.link).then(function (e) {
			  vm.$toast.success('Link copied to clipboard')
			}, function(e){
			  vm.$toast.error('An error occurred.Cannot copy.')
			})
		},
		cancelDelete() {
			this.deleteData = {
				id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
		doDeleteProduct() {
			$('#deleteBtn').attr('disabled', true).html('Deleting..please wait')
			this.$store.dispatch('products/deleteProduct', this.deleteData)
				.then(res =>{
					$('#deleteBtn').attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listProducts()
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
		uploadInventoryProduct() {
		  if(this.validateUploadData()) {
		    return;
			}

			if(this.isSupervisor){
				this.uploadData.branchID = this.user.branchID
			}

		  let data = new FormData()
			data.append('branchID', this.uploadData.branchID)
			data.append('categoryID', this.uploadData.categoryID)
			data.append('producttype', this.uploadData.producttype)
			data.append('merchID', this.formData.merchID)
			data.append('file', this.$refs.file.files[0])
      
			$('#uploadBtn').attr('disabled', true).html('Uploading..please wait')
			this.$store.dispatch('products/uploadProduct', data)
				.then(res => {
					if(res.data.status) {
						this.$toast.success(res.data.message)
						$('#uploadBtn').attr('disabled', false).html('+ Upload products')
						this.closeUploadProduct()
						this.listProducts()
					}
				}).catch(err =>{
					$('#uploadBtn').attr('disabled', false).html('+ Upload products')
				})
		},
		validateUploadData() {
		  this.clearUploadErrorData()
		  if(this.uploadData.branchID === '') {
		    this.uploadDataError.branch = true
		    return true
			}
		  
		  if(this.uploadData.categoryID === '') {
		    this.uploadDataError.category = true
		    return true
			}

			if(this.uploadData.producttype === '') {
				this.uploadDataError.productype = true
				return true
			}
		  
		  if(this.$refs.file.files.length < 1) {
		    this.uploadDataError.file = true
		    return true
			}
		},
		clearUploadErrorData() {
			this.uploadDataError = {
				branch: false,
				category: false,
				file: false
			}
		},
		closeUploadProduct() {
		  this.uploadData = {
				// branchID: '',
				merchID: '',
				categoryID: ''
			}
			$('#upload-products').removeClass('uk-open').hide();
		},
		uploadProduct() {
			UIkit.modal('#upload-products').toggle()
		},
		submitMapProduct() {
			$('#submitBtn').attr('disabled', true).html('Mapping..please wait')
			this.$store.dispatch('products/mapProductFeatures', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Map features')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listProducts()
						this.closeMapFeature()
					}
				}).catch(err =>{
					this.$toast.error(err)
					$('#submitBtn').attr('disabled', false).html('+ Map features')
				})
		},
		displayFeature(product) {
		  this.clearDisplayFeatures()
			$('#productName').html(product.productname)
			this.productfeatures = product.productfeatureinfo
			$('#product-features').addClass('uk-open').show();
		},
		clearDisplayFeatures() {
			$('#productName').html('')
			this.productfeatures = []
			$('#product-features').removeClass('uk-open').hide();
		},
		listVendors() {
			this.$store.dispatch('vendor/listVendors', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.lVendors = res.data.data
						this.loading = false
						return
					}

					this.$toast.error('An error occurred')
				}).catch(e =>{
					this.$toast.error(e)
					this.loading = false
				})
		},
		async editProduct(product) {
			localStorage.removeItem('product_data')
			console.log(product)
			await this.$store.dispatch('products/setProduct', product)
			// this.$refs.editProduct.getFeatures();
			this.$refs.editProduct.attachedProducts();
			// this.$router.push('/products/edit')
      
			UIkit.modal('#edit-product').toggle();
		},
		searchProducts(){
			this.formData.page = 1
			this.listProductData.search = this.search
			this.listProducts()
		},
		listProducts(param) {
			
			if (param != undefined && param == 'branchID'){
				this.listProductData.page = 1
			}
			// let productFilter = Object.assign({}, this.new_data)
			this.$store.dispatch('products/listProducts', this.new_data)
				.then(res =>{
					this.lProducts = res.data.data
					// .filter((product) => {
					// 	if(this.isSupervisor) {
					// 		return product.branchID == this.formData.branchID
					// 	}
					// 	return true;
					// })
					this.setHeaders(res.data.data, res.data.headers)
					this.loading = false
				}).catch(e =>{
					this.loading = false
					console.log(e)
				})
		},
		mapFeature(product) {
		  this.formData.productID = product.id
		  UIkit.modal('#map-features').toggle()
		},
		closeMapFeature() {
			this.formData.productID = ''
			this.formData.featureID = ''
			this.formData.priceID = ''
			UIkit.modal('#map-features').toggle('hide')
		},
		listFeatures() {
		  this.$store.dispatch('products/listFeatures', this.formData.merchID)
				.then(res =>{
				  let array = []
					res.data.data.forEach(function(r){
						let data = {
							id: r.id,
							text: r.featuretype + ': ' + r.featurename
						}
						array.push(data)
					})
					this.features = array
				}).catch(err =>{
					console.log(err)
				})
		},
		listPrice() {
		  this.$store.dispatch('products/listPrices', this.formData.merchID)
				.then(res =>{
					let array = []
					res.data.data.forEach(function(r){
						let data = {
							id: r.id,
							text: r.price
						}
						array.push(data)
					})
					this.prices = array
				}).catch(err =>{
					console.log(err)
				})
		},
		listPurchaseOrders() {
			this.$store.dispatch('purchaseorders/listPurchaseOrder', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.lPurchaseOrder = res.data.data
						return
					}
				}).catch(err =>{
				})
		},
		listBranches() {
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
				}).catch(e =>{
				})
		},
		listCategories() {
			this.$store.dispatch('category/getCategories', this.formData.merchID)
				.then(res =>{
					this.categories = res.data.data
				}).catch(e =>{

				})
		},
		recall() {
			this.formData.merchID = this.user.id
			this.listProductData.merchID = this.user.id
			
			this.listProducts()
			// this.listVendors()
			this.listFeatures()
			// this.listPrice()
			// this.listPurchaseOrders()
			this.listBranches()
			this.listCategories()
      
		},
		// Create callback function to receive barcode when the scanner is already done
		onBarcodeScanned (barcode) {
			// console.log(barcode)
			// this.addProduct();
			// this.$refs.addProduct.formData.productcode = barcode;
			
			// do something...
		},
	},
	mounted() {
		this.$barcodeScanner.init(this.onBarcodeScanned)
		this.recall();
	},
	destroyed () {
		// Remove listener when component is destroyed
		// console.log('scanner done')
		this.$barcodeScanner.destroy()
	},
}
</script>