webpackJsonp([53],{Rh4r:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".btn--primary[data-v-59948418]{background-color:#089628;color:#fff;min-width:10px!important}.btn--danger[data-v-59948418]{background-color:#dc3545;color:#fff;min-width:10px!important;left:5px;position:relative}.btn[data-v-59948418]{padding:9.6px 19.2px;padding:.6rem 1.2rem}",""])},gsBl:function(t,e,a){var r=a("Rh4r");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("rjj0")("408d3695",r,!1,{sourceMap:!1})},"qc+w":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"main-content-wrap"},[a("div",{staticClass:"d-flx-alc-jsb page-extras"},[a("p",{staticClass:"fw-medium font-16"}),a("div",{staticClass:"search-filter d-flx-alc-jfe"},[a("label",{staticClass:"search-w-icon"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Search"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#search"}})])]),a("button",{staticClass:"btn btn--primary",attrs:{type:"button"},on:{click:t.showAddModal}},[t._v("\n          + Add new category\n        ")])])]),a("div",{attrs:{id:"parent-component"}},[a("div",{attrs:{id:"add-cat","uk-modal":"","data-uk-modal":"{target:'#add-cat',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""},on:{click:t.closeAddModal}}),t._m(0),a("form",{staticClass:"modal-body",on:{submit:function(e){return e.preventDefault(),t.submitCategory.apply(null,arguments)}}},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Category name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.categoryname,expression:"formData.categoryname"}],attrs:{type:"text"},domProps:{value:t.formData.categoryname},on:{input:function(e){e.target.composing||t.$set(t.formData,"categoryname",e.target.value)}}})]),t.errorData.errorCategory?a("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a category name")]):t._e()]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Description")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.categorydescription,expression:"formData.categorydescription"}],attrs:{type:"text"},domProps:{value:t.formData.categorydescription},on:{input:function(e){e.target.composing||t.$set(t.formData,"categorydescription",e.target.value)}}})]),t.errorData.errorDescription?a("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a description")]):t._e()]),a("div",{staticClass:"d-flx-alc-jfe mt-5"},[a("button",{staticClass:"btn btn-no-fill",attrs:{id:"cancelBtn",type:"button"},on:{click:t.closeAddModal}},[t._v("\n                Cancel\n              ")]),a("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"addBtn",type:"submit"}},[t._v("\n                Add category\n              ")])])])])]),a("div",{attrs:{id:"edit","uk-modal":"","data-uk-modal":"{target:'#edit',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""}}),t._m(1),a("form",{staticClass:"modal-body",on:{submit:function(e){return e.preventDefault(),t.updateCategory.apply(null,arguments)}}},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Category name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.categoryname,expression:"editData.categoryname"}],attrs:{type:"text"},domProps:{value:t.editData.categoryname},on:{input:function(e){e.target.composing||t.$set(t.editData,"categoryname",e.target.value)}}})]),t.errorEditData.errorCategory?a("span",{staticClass:"form-input__error-msg"},[t._v("Category name is mandatory")]):t._e()]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Category Description")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.categorydescription,expression:"editData.categorydescription"}],attrs:{type:"text"},domProps:{value:t.editData.categorydescription},on:{input:function(e){e.target.composing||t.$set(t.editData,"categorydescription",e.target.value)}}})]),t.errorEditData.errorDescription?a("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a description")]):t._e()]),a("div",{staticClass:"d-flx-alc-jfe mt-5"},[a("button",{staticClass:"btn btn-no-fill",attrs:{type:"button"},on:{click:t.cancelEdit}},[t._v("\n                Cancel\n              ")]),a("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"updateBtn",type:"submit"}},[t._v("\n                Update category\n              ")])])])])]),a("div",{attrs:{id:"delete-text","uk-modal":"","data-uk-modal":"{target:'#delete-text',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical small-modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button"},on:{click:t.cancelDelete}},[t._v("X")]),a("div",{staticClass:"modal-header d-flx"},[a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#co-delete"}})]),t._m(2)]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"d-flx-alc-jc mt-3"},[a("button",{staticClass:"btn btn-no-fill",on:{click:t.cancelDelete}},[t._v("\n                Cancel\n              ")]),a("button",{staticClass:"btn btn-error ml-2",attrs:{id:"deleteBtn"},on:{click:t.doDelete}},[t._v("\n                Delete\n              ")])])])])])]),a("div",{staticClass:"inner-main-wrapper"},[a("overlay-scrollbars",{staticClass:"table-wrapper"},[a("figcaption",{staticClass:"sr"},[t._v("\n          A table showing information of categories\n        ")]),a("table",{staticClass:"table-content"},[a("thead",{},[a("tr",[a("th",{staticClass:"column-name"},[t._v("ID")]),a("th",{staticClass:"column-name"},[t._v("Name")]),a("th",{staticClass:"column-name"},[t._v("Description")]),a("th",{staticClass:"Small-space"},[t._v("Actions")])])]),a("tbody",{staticClass:"tablebody"},[t.loading?a("tr",[a("td",{attrs:{colspan:"5"}},[t._v("Loading....please wait")])]):t._e(),!t.loading&&t.filteredList.length<1?a("tr",[a("td",{attrs:{colspan:"5"}},[t._v("You have not created any category.")])]):t._e(),t._l(t.filteredList,function(e,r){return!t.loading&&t.filteredList.length>0?a("tr",{key:r},[a("td",{staticClass:"column-name",staticStyle:{color:"#28A745"}},[t._v("#"+t._s(r+1))]),a("td",{staticClass:"column-name"},[t._v("\n                "+t._s(e.categoryname)+"\n              ")]),a("td",{staticClass:"column-name"},[t._v("\n                "+t._s(e.categorydescription)+"\n              ")]),a("td",{staticClass:"d-flx-alc"},[a("button",{staticClass:"btn btn--primary",attrs:{type:"button"},on:{click:function(a){return t.edit(e)}}},[t._v("\n\t\t\t\t\tEdit\n                ")]),a("button",{staticClass:"btn btn--danger",attrs:{type:"button"},on:{click:function(a){return t.deleteCat(e)}}},[t._v("\n\t\t\t\t\tDelete\n                ")])])]):t._e()})],2)])])],1)])};r._withStripped=!0;var o={render:r,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h2",[this._v("Add category")]),e("p",[this._v("Add your category description and necessary information from here")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"modal-header"},[e("h2",[this._v("Edit category")]),e("p",[this._v("Add your category description and necessary information from here")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"ml-1"},[e("h2",[this._v("Delete Category ?")]),e("p",[this._v("Please confirm you really want to delete this category, this action cannot be undone.")])])}]};e.a=o},tLFn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("u5dt"),o=a("qc+w"),s=!1;var i=function(t){s||a("gsBl")},n=a("VU/8")(r.a,o.a,!1,i,"data-v-59948418",null);n.options.__file="pages/categories/index.vue",e.default=n.exports},u5dt:function(t,e,a){"use strict";(function(t){e.a={layout:"main",computed:{filteredList:function(){var t=this;return this.categories.filter(function(e){return e.categoryname.toLowerCase().includes(t.search.toLowerCase())?null!==e.categoryname&&e.categoryname.toLowerCase().includes(t.search.toLowerCase()):null!==e.categorydescription&&e.categorydescription.toLowerCase().includes(t.search.toLowerCase())})}},data:function(){return{search:"",editError:!1,loading:!0,formData:{categoryname:"",merchID:"",categorydescription:""},errorData:{errorCategory:!1,errorDescription:!1},errorEditData:{errorCategory:!1,errorDescription:!1},editData:{categoryname:"",merchID:"",categorydescription:"",id:""},categories:[],deleteData:{id:""}}},methods:{deleteCat:function(e){this.deleteData.id=e.id,t("#delete-text").addClass("uk-open").show()},cancelDelete:function(){this.deleteData={id:""},t("#delete-text").removeClass("uk-open").hide()},doDelete:function(){var e=this;t("#deleteBtn").attr("disabled",!0).html("Deleting..please wait"),this.$store.dispatch("category/deleteCategory",this.deleteData).then(function(a){if(t("#deleteBtn").attr("disabled",!1).html("Delete"),a.data.status)return e.$toast.success(a.data.message),e.getCategories(),void e.cancelDelete();e.$toast.error("An error occurred and the operation was terminated")}).catch(function(a){e.$toast.error("An error occurred and the operation was terminated"),t("#deleteBtn").attr("disabled",!1).html("Delete"),console.log(a)})},submitCategory:function(){var e=this;this.resetError(),""!==this.formData.categoryname?""!==this.formData.categorydescription?(t("#addBtn").attr("disabled",!0).html("Adding....please wait"),this.$store.dispatch("category/addCategory",this.formData).then(function(a){t("#addBtn").attr("disabled",!1).html("Add Category"),a.data.status?(e.$toast.success(a.data.message),e.getCategories(),e.closeAddModal()):e.$toast.error(a.data.message)}).catch(function(e){t("#addBtn").attr("disabled",!1).html("Add Category"),console.log(e)})):this.errorData.errorDescription=!0:this.errorData.errorCategory=!0},updateCategory:function(){var e=this;this.resetError(),""!==this.editData.categoryname?""!==this.editData.categorydescription?(t("#updateBtn").attr("disabled",!0).html("Updating Category....please wait"),this.$store.dispatch("category/updateCategory",this.editData).then(function(a){if(t("#updateBtn").attr("disabled",!1).html("Update Category"),a.data.status)return e.$toast.success(a.data.message),e.getCategories(),void e.cancelEdit();e.$toast.error("An error occurred")}).catch(function(a){e.$toast.error("An error occurred"),t("#updateBtn").attr("disabled",!1).html("Update Category"),console.log(a)})):this.errorEditData.errorDescription=!0:this.errorEditData.errorCategory=!0},getCategories:function(){var t=this;this.$store.dispatch("category/getCategories",this.formData.merchID).then(function(e){t.loading=!1,e.status&&(t.categories=e.data.data)}).catch(function(e){t.loading=!1,console.log(e)})},edit:function(e){this.editData={categoryname:e.categoryname,merchID:e.merchID,categorydescription:e.categorydescription,id:e.id},t("#edit").addClass("uk-open").show()},cancelEdit:function(){this.editData={categoryname:"",merchID:"",categorydescription:"",id:""},t("#edit").removeClass("uk-open").hide()},resetError:function(){this.errorData={errorCategory:!1,errorDescription:!1},this.errorEditData={errorCategory:!1,errorDescription:!1}},resetForm:function(){this.formData={categoryname:"",categorydescription:""}},showAddModal:function(){t("#add-cat").addClass("uk-open").show()},closeAddModal:function(){this.formData.categoryname="",this.formData.categorydescription="",t("#add-cat").removeClass("uk-open").hide()}},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.getCategories()}}}).call(e,a("7t+N"))}});