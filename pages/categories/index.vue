<template>
  <section class="main-content-wrap">

    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <button class="btn btn--primary" type="button" @click="showAddModal">
          + Add new category
        </button>

      </div>
    </div>

    <div id="parent-component">
      <div id="add-cat" uk-modal data-uk-modal="{target:'#add-cat',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeAddModal" uk-close></button>
          <div class="modal-header">
            <h2>Add category</h2>
            <p>Add your category description and necessary information from here</p>
          </div>
          <form class="modal-body" @submit.prevent="submitCategory">
            <label  class="form-input">
              <span class="form-input__label">Category name</span>
              <div class="form-input__input">
                <input type="text" v-model="formData.categoryname">
              </div>
              <span v-if="errorData.errorCategory" class="form-input__error-msg">Please enter a category name</span>
            </label>
            <label  class="form-input">
              <span class="form-input__label">Description</span>
              <div class="form-input__input">
                <input type="text" v-model="formData.categorydescription">
              </div>
              <span v-if="errorData.errorDescription" class="form-input__error-msg">Please enter a description</span>
            </label>
            <div class="d-flx-alc-jfe mt-5">
              <button id="cancelBtn" type="button" @click="closeAddModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="addBtn" type="submit" class="btn btn--primary ml-1">
                Add category
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="edit" uk-modal data-uk-modal="{target:'#edit',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Edit category</h2>
            <p>Add your category description and necessary information from here</p>
          </div>
          <form class="modal-body" @submit.prevent="updateCategory">
            <label  class="form-input">
              <span class="form-input__label">Category name</span>
              <div class="form-input__input">
                <input v-model="editData.categoryname" type="text">
              </div>
              <span v-if="errorEditData.errorCategory" class="form-input__error-msg">Category name is mandatory</span>
            </label>
            <label  class="form-input">
              <span class="form-input__label">Category Description</span>
              <div class="form-input__input">
                <input v-model="editData.categorydescription" type="text">
              </div>
              <span v-if="errorEditData.errorDescription" class="form-input__error-msg">Please enter a description</span>
            </label>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="cancelEdit" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                Update category
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
              <h2>Delete Category ?</h2>
              <p>Please confirm you really want to delete this category, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDelete" id="deleteBtn" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <!-- <th></th> -->
              <th class="column-name">ID</th>
              <th class="column-name">Name</th>
              <th class="column-name">Description</th>
              <th class="Small-space">Actions</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading"><td colspan="5">Loading....please wait</td></tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="5">You have not created any category.</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </td> -->
              <td style="color: #28A745;" class="column-name">#{{ ix + 1 }}</td>
              <td class="column-name">
                {{ row.categoryname }}
              </td>
              <td class="column-name">
                {{ row.categorydescription }}
              </td>
              <td class="d-flx-alc">
                <button class="btn btn--primary" type="button" @click="edit(row)">
					Edit
                </button>
			   
                <button class="btn btn--danger" type="button" @click="deleteCat(row)">
					Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>


  </section>
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
	computed: {
		filteredList () {
			return this.categories.filter(category => {
				if (category.categoryname.toLowerCase().includes(this.search.toLowerCase())) {
					return category.categoryname !== null && category.categoryname.toLowerCase().includes(this.search.toLowerCase());
				}
				else {
					return category.categorydescription !== null && category.categorydescription.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		search: '',
		editError: false,
		loading: true,
		formData: {
			categoryname: '',
			merchID: '',
			categorydescription: ''
		},
		errorData: {
			errorCategory: false,
			errorDescription: false
		},
		errorEditData: {
			errorCategory: false,
			errorDescription: false
		},
		editData: {
			categoryname: '',
			merchID: '',
			categorydescription: '',
			id: ''
		},
		categories: [],
		deleteData: {
		  id: ''
		}
	}),
	methods: {
		deleteCat(category) {
			this.deleteData.id = category.id
			$('#delete-text').addClass('uk-open').show();
		},
		cancelDelete() {
			this.deleteData = {
				id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
		doDelete() {
			$('#deleteBtn').attr('disabled', true).html('Deleting..please wait')
			this.$store.dispatch('category/deleteCategory', this.deleteData)
				.then(res =>{
					$('#deleteBtn').attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCategories()
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
		submitCategory() {
		  this.resetError()
			if(this.formData.categoryname === ''){
			  this.errorData.errorCategory = true
				return
			}
			
			if(this.formData.categorydescription === ''){
				this.errorData.errorDescription = true
				return
			}
			
			$('#addBtn').attr('disabled', true).html('Adding....please wait')
			this.$store.dispatch('category/addCategory', this.formData)
				.then(res =>{
					$('#addBtn').attr('disabled', false).html('Add Category')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCategories()
						this.closeAddModal()
					} else{
						this.$toast.error(res.data.message)
					}

				}).catch(e =>{
					$('#addBtn').attr('disabled', false).html('Add Category')
					console.log(e)
				})
		},
		updateCategory() {
			this.resetError()
			if(this.editData.categoryname === ''){
				this.errorEditData.errorCategory = true
				return
			}
			if(this.editData.categorydescription === ''){
				this.errorEditData.errorDescription = true
				return
			}
			$('#updateBtn').attr('disabled', true).html('Updating Category....please wait')
			this.$store.dispatch('category/updateCategory', this.editData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('Update Category')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getCategories()
						this.cancelEdit()
						return
					}
					
					this.$toast.error('An error occurred')
				}).catch(e =>{
					this.$toast.error('An error occurred')
					$('#updateBtn').attr('disabled', false).html('Update Category')
					console.log(e)
				})
		},
		getCategories() {
			this.$store.dispatch('category/getCategories', this.formData.merchID)
				.then(res =>{
				  this.loading = false
				  if(res.status) {
				    this.categories = res.data.data
					}
				}).catch(e =>{
				  this.loading = false
					console.log(e)
				})
		},
		edit(category) {
		  this.editData = {
				categoryname: category.categoryname,
				merchID: category.merchID,
				categorydescription: category.categorydescription,
				id: category.id
			}
			$('#edit').addClass('uk-open').show();
		},
		cancelEdit() {
			this.editData = {
				categoryname: '',
				merchID: '',
				categorydescription: '',
				id: ''
			}
			$('#edit').removeClass('uk-open').hide();
		},
		resetError() {
		  this.errorData = {
		    errorCategory: false,
				errorDescription: false
			}
			
			this.errorEditData = {
		    errorCategory: false,
				errorDescription: false
			}
		},
		resetForm() {
			this.formData = {
				categoryname: '',
				categorydescription: ''
			}
		},
		showAddModal() {
			$('#add-cat').addClass('uk-open').show();
		},
		closeAddModal() {
		  this.formData.categoryname = ''
			this.formData.categorydescription = ''
			$('#add-cat').removeClass('uk-open').hide();
		}
	},
	mounted() {
	   this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.getCategories()
	}
}
</script>
