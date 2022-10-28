<template>
  <overlay-scrollbars class="main-content-wrap">
    <overlay-scrollbars class="page-extras d-flx-alc-jsb settings-extra">
      <div class="links-wrap">
         <nuxt-link  to="/settings">Business Rules</nuxt-link>
        <nuxt-link to="/settings/tax"  v-if="(user.rolepermission ? user.rolepermission[0].tax.viewtax:'') || isMerchant">Tax</nuxt-link>
		    <nuxt-link to="/settings/discount" class="active"  v-if="(user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'') || isMerchant">Discount</nuxt-link>
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
              <h2>Remove Discount ?</h2>
              <p>Please confirm you really want to delete this Discount, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDelete" id="deleteDiscount" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper">    
      <div class=" py-3 px-0">
        <section class="setting-section">
          <div class="setting-section-title d-flx-alc-jsb">
            <h2 class="section-title">Discount </h2>
            <button class="btn btn-no-fill" type="button" @click="openModal" disabled v-if="(user.rolepermission ? user.rolepermission[0].discounts.adddiscount:'') || isMerchant">
              Add  Discount
            </button>
          </div>
          <!-- <overlay-scrollbars class="table-wrapper">
            <table class="table-content">
              <thead class="">
              <tr>
                <th class="large-space column-name">Product Name</th>
                <th class="large-space column-name">Discount Type</th>
                <th class="small-space">Min Qty</th>
                <th class="small-space">Max Qty</th>
                <th class="large-space">Volume Discount(₦)</th>
                <th class="large-space">Percentage </th>
                <th class="large-space">Action</th>
              </tr>
              </thead>
              <tbody class="table-content large-content">
                <tr v-if="loading">
                  <td colspan="2">Loading...please wait</td>
                </tr>
                <tr v-if="!loading && discount.length < 1">
                  <td colspan="2">No discount set at the moment.</td>
                </tr>
                
                <tr v-if="!loading && discount.length > 0" v-for="p in discount" :key="p.id">
                  <td class="column-name">{{  p.productname }}</td> 
                  <td class="column-name">{{  p.discounttype }}</td> 
                  <td>{{ p.minorder }}</td>
                  <td>{{ p.maxorder }}</td>
                  <td>{{formatPrice(p.discountedamount)}}</td>
                  <td>{{p.discountedpercent}}</td>                 
                  
                  <td class="d-flx-alc">
                    <button class="btn btn--primary" type="button" @click="editDiscount(p)">
                      Edit
                    </button>
                     <button class="btn btn--danger" @click="deleteDiscount(p)" title="Delete" type="button">
                      Delete
                    </button>
                  </td>                  
                </tr>
              </tbody>
            </table>
          </overlay-scrollbars> -->
        </section>
      </div>
    </div>

    <!-- Add Features Modal -->
    <div id="add-tax" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
        <div class="modal-header">
          <h2>Discount Amount</h2>
          <p>Enter the details to create a new Discount. You can only add one discount type per product</p>
        </div>
        <form class="mt-2" @submit.prevent="createDiscount">
		  	<!--<overlay-scrollbar>-->
          <div v-for="(input,i) in discountdata.discountfee" :key="i">
               <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Product</span>
                  <div class="form-input__input">
                    <select v-model="input.productID" class="filter-btn box-deco-smallr" required>
                      <option value="">-Select Product-</option>
                      <option v-for="product in products" :key="product.id" :value="product.id">
                        {{ product.productname}}
                      </option>
                    </select>
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Discount Type</span>
                  <div class="form-input__input">
                    <Select2 v-model="input.discounttype" :options="options" />
                  </div>
              </label>
            </div>
            <div  v-if="input.discounttype=='Volume Discount'"  class="flex-width-1-2 less-gp">
              <label class="form-input">
                <span class="form-input__label">Minimum order Amount</span>
                <div class="form-input__input">
                    <input v-model="input.minorder" type="number" required>
                </div>
              </label>
              <label class="form-input">
                <span class="form-input__label"> Maximum Order Amount</span>
                <div class="form-input__input">
                <input v-model="input.maxorder" type="number" required>
                </div>
              </label>
               <label class="form-input">
                  <span class="form-input__label">Discount Amount (NGN)</span>
                  <div class="form-input__input">
                  <input v-model="input.discountedamount" type="text" required>
                  </div>
              </label>
            </div>
            <div  v-if="input.discounttype=='Percent'"  class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Discount In % </span>
                  <div class="form-input__input">
                  <input type="range" v-model="input.discountedpercent" min="1" max="100"  required>
                    <div class="form-input__input">Percentage in Value: {{input.discountedpercent}}</div>
                  </div>
              </label>

            </div>
            <div  class="flex-width-1-2 less-gp">
              <button style="float: left" @click="addNew(i)" 
                v-show="i == discountdata.discountfee.length-1" type="button" class="btn btn--primary"> Add
              </button>
              <button style="float: left" @click="remove(i)" v-show="i || ( !i && discountdata.discountfee.length > 1)" type="button" class="btn btn--primary">Remove</button>   
            </div>     			
          </div>
				
			  <!--</overlay-scrollbar>-->
          <div class="d-flx-alc-jfe mt-5">

            <button type="button"  id="cancelBtn" class="btn btn-no-fill" @click="closeModal">
              Cancel
            </button>
            <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
              + Create Discount
            </button>
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
          <h2>Edit Discount</h2>
          <p>Enter the details to update a new tax.</p>
        </div>
        <form @submit.prevent="updateDiscount">
            <div  class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Product</span>
                <div class="form-input__input">
                  <select v-model="editData.productID" class="filter-btn box-deco-smallr" required>
                    <option value="">-Select Product-</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">
                      {{ product.productname}}
                    </option>
                  </select>
                </div>
              </label>
              
              <label  class="form-input">
                <span class="form-input__label">Discount Type</span>
                <div class="form-input__input">
                 <Select2 v-model="editData.discounttype" :options="options" />
                </div>
              </label>
           </div>
           <div v-if="editData.discounttype=='Volume Discount'" class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Min Volume</span>
                <div class="form-input__input">
                  <input v-model="editData.minorder" type="text">
                </div>
                <span v-if="errorData.minorder" class="form-input__error-msg">Please enter the min discount</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Max Volume</span>
                <div class="form-input__input">
                  <input v-model="editData.maxorder" type="text">
                </div>
                <span v-if="errorData.maxorder" class="form-input__error-msg">Please enter a max discount</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Discount Volume</span>
                <div class="form-input__input">
                  <input id="edit_value_tax" v-model="editData.discountedvalue" type="text">
                </div>
                <span v-if="errorData.discountedamount" class="form-input__error-msg">Please enter a discount value</span>
              </label>
           </div>
            <div  v-if="editData.discounttype=='Percent'"  class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Discount In % </span>
                  <div class="form-input__input">
                    <input type="range" v-model="editData.discountedpercent" min="1" max="100"  required>
                    <div class="form-input__input">Percentage in Value: {{editData.discountedpercent}}</div>
                    <!--input v-model="editData.discountedpercent"  type="number" required>-->
                  </div>
              </label>
            </div>
              <!--<button type="button" @click="closeEdit" id="cancelBtn" class="btn btn--primary ml-1">
                Cancel
              </button>-->
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                Edit
              </button>
           
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
		formData: {
			merchID:'',
      
    },
    discountdata: {
      "merchID":"",
      discountfee: [
          {
              "minorder": "",
              "maxorder": "",
              "discountedamount":0,
              "productID":"",
              "discounttype":"",
              "discountedpercent":0
          },
      ],
		},
    tax_classifications: [],
    discount: [],
    products:[],
    deleteData: {},
    options: [
			{id: 'Percent', text: 'Percent'},
			{id: 'Volume Discount', text:'Volume Discount'}
		],
		errorData: {
		  productID: false,
      maxorder:false,
      minorder:false,
      discountedamount:false
		},
		editData: {
      id: '',
		  minorder: '',
      maxorder:'',
      discountedamount:'',
      discountedpercent:'',
      discounttype:"",
      productID:""
		}
	}),
  computed: {
		isCourierService () { 
			 return this.user.businessdescription.toLowerCase().includes('delivery')
		},
	},
	methods: {
   /* 
  validateFormData() {
		  //this.clearValidation()
      console.log(this.discountdata.discountfee.productID)
		  if(this.input.productID === ''){
		    this.errorData.productID = true
				return true
      }
		  return false
		},
    */
    addNew(){
      let new_obj = {
        "minorder": "",
        "maxorder": "",
        "minorder": "",
        "maxorder": "",
        "discountedamount":0,
        "productID":"",
        "discounttype":"",
        "discountedpercent":0
        //"merchID": this.newID           
      };    
      this.discountdata.discountfee.push(new_obj)
      this.discountdata.merchID=this.newID             
    },
    remove(index) {
			this.discountdata.discountfee.splice(index, 1)
		},
    doDelete(){
     // this.$toast.error("This action cannot be reversed")'
      this.$store.dispatch('discount/deleteDiscount',this.deleteData)
				.then(res =>{
					if(res.data.status) {
						this.$toast.success(res.data.message)
            this.formData.merchID = this.user.id
            this.cancelDelete()
            this.getDiscount()
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
    listProduct() {
	    this.$store.dispatch('discount/listProducts',this.formData)
				.then(res =>{
          this.products = res.data.data
          // console.log(this.products)
				})
		},
	  createDiscount() {
      
      /*if(this.validateFormData()) {
          return;
        }*/
       this.discountdata =this.discountdata.discountfee
        var data = {
           "merchID":this.user.id,
           "discountfee":this.discountdata
        };
        $('#submitBtn').attr('disabled', true).html('Saving....please wait')
        this.$store.dispatch('discount/saveDiscount',data)
          .then(res =>{
           $('#submitBtn').attr('disabled', false).html('+ Create Discount')
            if(res.data.status) {
              this.$toast.success(res.data.message)
              this.getDiscount()
              this.closeModal()
              //this.discountdata()
              //this.$router.push('/settings/')
              location.reload()
              return
            }
					this.$toast.error(res.data.message)
				}).catch(err =>{
          //this.formData.merchID = this.user.id
					//$('#submitBtn').attr('disabled', false).html('+ Create Discount')
					console.log(err)
				})
		},
    deleteDiscount(p) {
      this.deleteData = p
      $('#delete-text').addClass('uk-open').show();
      
    },
		updateDiscount() {

      (this.editData)
		  $('#updateBtn').attr('disabled', true).html('Updating..please wait')
			this.$store.dispatch('discount/updateDiscount', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update')
					if(res.data.status) {
						this.$toast.success(res.data.message)
            //this.formData.merchID = this.user.id
						this.getDiscount()
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
	  getDiscount() {
	    this.$store.dispatch('discount/listDiscount', this.formData)
				.then(res =>{
					this.loading = false

					this.discount = res.data.data
          // console.log('res', this.discount)
				}).catch(err =>{
					this.loading = false
					console.log(err)
				})
    },
		editDiscount(p) {
		  this.editData = p
			UIkit.modal('#edit-tax').toggle()
		},
		openModal() {
			UIkit.modal('#add-tax').toggle()
		},
		closeModal() {
	
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
      //this.editData.tax_classification = this.tax_classifications[0].id
			UIkit.modal('#edit-tax').toggle('hide')
		},
    formatPrice: function (price) {
                var str = price.toString().split(".");
                if (str[0].length >= 3) {
                    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
                }
                if (!str[1]) {
                    str[1] = "00";
                }
                return str.join(".");
    },
	},
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].discounts.viewdiscount:'')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	},
	mounted() {
    this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
		this.getDiscount()
    this.listProduct()
		
	}
}
</script>
