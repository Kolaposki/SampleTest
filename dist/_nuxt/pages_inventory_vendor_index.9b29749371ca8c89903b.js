webpackJsonp([21],{"/N0O":function(t,e,a){var n=a("DlQd");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("f3204876",n,!1,{sourceMap:!1})},"0/oG":function(t,e,a){"use strict";(function(t){e.a={layout:"main",computed:{filteredList:function(){var t=this;return this.vendors.filter(function(e){return e.vendorname.toLowerCase().includes(t.search.toLowerCase())?e.vendorname.toLowerCase().includes(t.search.toLowerCase()):e.vendoremail.toLowerCase().includes(t.search.toLowerCase())?e.vendoremail.toLowerCase().includes(t.search.toLowerCase()):e.vendorcity.toLowerCase().includes(t.search.toLowerCase())?e.vendorcity.toLowerCase().includes(t.search.toLowerCase()):e.vendorstate.toLowerCase().includes(t.search.toLowerCase())})},getTotalPrice:function(){var t=this.inventory.map(function(t){return t.costprice}).reduce(function(t,e){return t+=Number(e)},0);return console.log(t),t}},data:function(){return{inventory:[],totalprice:"",search:"",formData:{vendorname:"",merchID:"",vendorcontactperson:"",vendoraddress:"",vendoremail:"",vendorcity:"",vendorstate:"",vendorcountry:"",paymentmethod:"",vendoraccountname:"",vendorbankname:"",paymentterms:"",productdetails:[],active:!0},editData:{id:"",vendorname:"",merchID:"",vendorcontactperson:"",vendoraddress:"",vendoremail:"",vendorcity:"",vendorstate:"",vendorcountry:"",paymentmethod:"",vendoraccountname:"",vendorbankname:"",paymentterms:"",productdetails:[],active:!0},products:[{productid:"",vendorprice:"",vendorcode:"",productname:"",description:""}],bankName:[{id:"accessbank",text:"Access Bank Plc"},{id:"citibank",text:"Citibank Nigeria Limited"},{id:"diamondbank",text:"Diamond Bank Limited"},{id:"ecobank",text:"Ecobank Nigeria Plc"},{id:"enterprisebank",text:"Enterprise Trust Bank Limited"},{id:"fidelitybank",text:"Fidelity Bank Plc"},{id:"firstbank",text:"First Bank of Nigeria Plc"},{id:"firstcity",text:"First City Monument Bank Limited"},{id:"guarantytrustbank",text:"Guaranty Trust Bank Plc."},{id:"heritagebank",text:"Heritage Banking Company Ltd"},{id:"keystonebank",text:"Key Stone Bank"},{id:"mainstreetbank",text:"MainStreet Bank"},{id:"skyebank",text:"Skye Bank Plc"},{id:"stanbicibtc",text:"Stanbic IBTC Bank Ltd"},{id:"standardchartered",text:"Standard Chartered Bank Nigeria Ltd"},{id:"sterlingbank",text:"Sterling Bank Plc"},{id:"unionbank",text:"Union Bank of Nigeria Plc"},{id:"unitedbank",text:"United Bank For Africa Plc"},{id:"unitybank",text:"Unity Bank Plc"},{id:"wemabank",text:"Wema Bank Plc"},{id:"zenithbank",text:"Zenith Bank Plc"}],paymentTerms:[{id:"monthly",text:"Monthly"},{id:"quarterly",text:"Quarterly"},{id:"yearly",text:"Yearly"}],paymentMethods:[{id:"online",text:"Online"},{id:"cheque",text:"Cheque"}],status:[{id:"true",text:"Activate"},{id:"false",text:"Deactivate"}],vendorProducts:[],loading:!0,vendors:[],vProducts:[],purchaseorders:[],deleteData:{id:""}}},methods:{deleteVendor:function(e){this.deleteData.id=e.id,t("#delete-text").addClass("uk-open").show()},cancelDelete:function(){this.deleteData={id:""},t("#delete-text").removeClass("uk-open").hide()},doDeleteVendor:function(){var e=this;t("#deleteBtn").attr("disabled",!0).html("Deleting..please wait"),this.$store.dispatch("vendor/deleteVendor",this.deleteData).then(function(a){if(t("#deleteBtn").attr("disabled",!1).html("Delete"),a.data.status)return e.$toast.success(a.data.message),e.listVendors(),void e.cancelDelete();e.$toast.error("An error occurred and the operation was terminated")}).catch(function(a){e.$toast.error("An error occurred and the operation was terminated"),t("#deleteBtn").attr("disabled",!1).html("Delete"),console.log(a)})},mySelectEvent:function(t,e){for(var a=t.target.value,n=0;n<this.vendorProducts.length;n++)if(this.vendorProducts[n].id==a)return this.products[e].productname=this.vendorProducts[n].text,this.products[e].description=this.vendorProducts[n].text,void console.log(this.products[e])},createVendor:function(){var e=this;this.formData.productdetails=this.products,t("#submitBtn").attr("disabled",!0).html("Adding vendor...Please wait"),this.$store.dispatch("vendor/saveVendor",this.formData).then(function(a){if(t("#submitBtn").attr("disabled",!1).html("+ Add Vendor"),a.data.status)return e.$toast.success(a.data.message),e.listVendors(),void e.closeVendorModal();e.$toast.error("An error occurred")}).catch(function(a){t("#submitBtn").attr("disabled",!1).html("+ Add Vendor"),e.$toast.error(a)})},addChild:function(){this.products.push({productid:"",vendorprice:"",vendorcode:"",productname:"",description:""})},removeChild:function(t){this.products.splice(t,1)},addVendorModal:function(){UIkit.modal("#add-vendor").toggle()},cancelAddData:function(){this.formData={vendorname:"",vendorcontactperson:"",vendoraddress:"",vendoremail:"",vendorcity:"",vendorstate:"",vendorcountry:"",paymentmethod:"",vendoraccountname:"",vendorbankname:"",paymentterms:"",productdetails:[],active:!0}},closeVendorModal:function(){this.cancelAddData(),UIkit.modal("#add-vendor").toggle("hide")},editVendor:function(t){this.editData={id:t.id,vendorname:t.vendorname,merchID:t.merchID,vendorcontactperson:t.vendorcontactperson,vendoraddress:t.vendoraddress,vendoremail:t.vendoremail,vendorcity:t.vendorcity,vendorstate:t.vendorstate,vendorcountry:t.vendorcountry,paymentmethod:t.paymentmethod,vendoraccountname:t.vendoraccountname,vendorbankname:t.vendorbankname,paymentterms:t.paymentterms,productdetails:t.productdetails,active:t.active},UIkit.modal("#edit-vendor").toggle()},editVendorData:function(){var e=this;t("#updateBtn").attr("disabled",!0).html("Updating..please wait"),this.$store.dispatch("vendor/editVendor",this.editData).then(function(a){if(t("#updateBtn").attr("disabled",!1).html("+ Update vendor"),a.data.status)return e.$toast.success(a.data.message),e.closeEditModal(),void e.listVendors();e.$toast.error("An error occurred")}).catch(function(e){t("#updateBtn").attr("disabled",!1).html("+ Update vendor"),console.log(e)})},cancelEdit:function(){this.editData={id:"",vendorname:"",merchID:"",vendorcontactperson:"",vendoraddress:"",vendoremail:"",vendorcity:"",vendorstate:"",vendorcountry:"",paymentmethod:"",vendoraccountname:"",vendorbankname:"",paymentterms:"",productdetails:[],active:!1}},closeEditModal:function(){this.cancelEdit(),UIkit.modal("#edit-vendor").toggle("hide")},listVendors:function(){var t=this;this.$store.dispatch("vendor/listVendors",this.formData.merchID).then(function(e){if(e.data.status)return t.vendors=e.data.data,void(t.loading=!1);t.$toast.error("An error occurred")}).catch(function(e){t.$toast.error(e),t.loading=!1})},listInventory:function(){var t=this;this.$store.dispatch("inventory/getInventory",this.formData.merchID).then(function(e){if(console.log(e.data),e.data.status)return t.inventory=e.data.data,t.totalprice=e.data.totalinventoryvalue,void(t.loading=!1);t.$toast.error("An error occurred")}).catch(function(e){t.$toast.error(e),t.loading=!1})},listProducts:function(){var t=this;this.$store.dispatch("products/listProducts",this.formData.merchID).then(function(e){t.vProducts=e.data.data;var a=t;e.data.data.forEach(function(t){var e={id:t.id,text:t.productname};a.vendorProducts.push(e)})}).catch(function(t){console.log(t)})},listPurchaseOrders:function(){var t=this;this.$store.dispatch("purchaseorders/listPurchaseOrder",this.formData.merchID).then(function(e){e.data.status&&(t.purchaseorders=e.data.data)}).catch(function(t){})}},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.listVendors(),this.listInventory(),this.listProducts(),this.listPurchaseOrders()}}}).call(e,a("7t+N"))},"1gF+":function(t,e,a){var n=a("KpIC");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("58974166",n,!1,{sourceMap:!1})},DlQd:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".table-wrapper.no-deco[data-v-aa9d8852]{padding-right:unset!important}",""])},KpIC:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,".btn--primary[data-v-aa9d8852]{background-color:#089628;color:#fff;min-width:10px!important}.btn--danger[data-v-aa9d8852]{background-color:#dc3545;color:#fff;min-width:10px!important;left:10px;position:relative}.btn[data-v-aa9d8852]{padding:9.6px 19.2px;padding:.6rem 1.2rem}",""])},SgJF:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("overlay-scrollbars",{staticClass:"main-content-wrap"},[a("div",{staticClass:"page-extras"},[a("p",{staticClass:"fw-medium font-16"}),a("div",{staticClass:"search-filter d-flx-alc-jfe"},[a("label",{staticClass:"search-w-icon"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Search"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#search"}})])])])]),a("div",{attrs:{id:"parent-component"}},[a("div",{attrs:{id:"add-vendor","uk-modal":"","data-uk-modal":"{target:'#add-vendor',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""},on:{click:t.cancelAddData}}),a("div",{staticClass:"modal-header"},[a("h2",[t._v("Add Vendor")]),a("p",[t._v("Add a vendor description and necessary information from here")])]),a("form",{on:{submit:function(e){return e.preventDefault(),t.createVendor.apply(null,arguments)}}},[a("overlay-scrollbars",{staticClass:"modal-body",attrs:{"uk-modal-auto":""}},[a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendorname,expression:"formData.vendorname"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendorname},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendorname",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor contact person")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendorcontactperson,expression:"formData.vendorcontactperson"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendorcontactperson},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendorcontactperson",e.target.value)}}})])])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor address")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendoraddress,expression:"formData.vendoraddress"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendoraddress},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendoraddress",e.target.value)}}})])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Country")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendorcountry,expression:"formData.vendorcountry"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendorcountry},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendorcountry",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("State")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendorstate,expression:"formData.vendorstate"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendorstate},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendorstate",e.target.value)}}})])])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("City")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendorcity,expression:"formData.vendorcity"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendorcity},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendorcity",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Email")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendoremail,expression:"formData.vendoremail"}],attrs:{type:"email",required:""},domProps:{value:t.formData.vendoremail},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendoremail",e.target.value)}}})])])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Account Name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.vendoraccountname,expression:"formData.vendoraccountname"}],attrs:{type:"text",required:""},domProps:{value:t.formData.vendoraccountname},on:{input:function(e){e.target.composing||t.$set(t.formData,"vendoraccountname",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Bank")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.bankName,required:""},model:{value:t.formData.vendorbankname,callback:function(e){t.$set(t.formData,"vendorbankname",e)},expression:"formData.vendorbankname"}})],1)])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Payment method")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.paymentMethods,required:""},model:{value:t.formData.paymentmethod,callback:function(e){t.$set(t.formData,"paymentmethod",e)},expression:"formData.paymentmethod"}})],1)]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Payment terms")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.paymentTerms,required:""},model:{value:t.formData.paymentterms,callback:function(e){t.$set(t.formData,"paymentterms",e)},expression:"formData.paymentterms"}})],1)])]),a("hr"),t._l(t.products,function(e,n){return a("div",{key:n},[a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor code")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.vendorcode,expression:"input.vendorcode"}],attrs:{type:"text"},domProps:{value:e.vendorcode},on:{input:function(a){a.target.composing||t.$set(e,"vendorcode",a.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor price")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.vendorprice,expression:"input.vendorprice"}],attrs:{type:"number",required:""},domProps:{value:e.vendorprice},on:{input:function(a){a.target.composing||t.$set(e,"vendorprice",a.target.value)}}})])])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Product")]),a("div",{staticClass:"form-input__input"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.productid,expression:"input.productid"}],staticClass:"filter-btn box-deco-smallr",on:{change:[function(a){var n=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(e,"productid",a.target.multiple?n:n[0])},function(e){return t.mySelectEvent(e,n)}]}},[a("option",{attrs:{value:""}},[t._v("-Select Product-")]),t._l(t.vendorProducts,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v("\n                        "+t._s(e.text)+"\n                      ")])})],2)])]),a("label",{directives:[{name:"show",rawName:"v-show",value:n==t.products.length-1,expression:"k == products.length-1"}],staticClass:"form-input"},[a("button",{staticClass:"btn btn-icon",attrs:{type:"button"},on:{click:function(e){return t.addChild(n)}}},[t._v("\n                    +\n                  ")])]),a("label",{directives:[{name:"show",rawName:"v-show",value:n||!n&&t.products.length>1,expression:"k || ( !k && products.length > 1)"}],staticClass:"form-input"},[a("button",{staticClass:"btn btn-icon",attrs:{type:"button"},on:{click:function(e){return t.removeChild(n)}}},[t._v("\n                    -\n                  ")])])])})],2),a("div",{staticClass:"d-flx-alc-jfe mt-5"},[a("button",{staticClass:"btn btn-no-fill",attrs:{type:"button",id:"cancelBtn"},on:{click:t.closeVendorModal}},[t._v("\n                Cancel\n              ")]),a("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"submitBtn",type:"submit"}},[t._v("\n                + Add Vendor\n              ")])])],1)])]),a("div",{attrs:{id:"delete-text","uk-modal":"","data-uk-modal":"{target:'#delete-text',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical small-modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button"},on:{click:t.cancelDelete}},[t._v("X")]),a("div",{staticClass:"modal-header d-flx"},[a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#co-delete"}})]),a("div",{staticClass:"ml-1"},[a("h2",[t._v("Delete Vendor ?")]),a("p",[t._v("Please confirm you really want to delete this vendor, this action cannot be undone.")])])]),a("div",{staticClass:"modal-body"},[a("div",{staticClass:"d-flx-alc-jc mt-3"},[a("button",{staticClass:"btn btn-no-fill",on:{click:t.cancelDelete}},[t._v("\n                Cancel\n              ")]),a("button",{staticClass:"btn btn-error ml-2",attrs:{id:"deleteBtn"},on:{click:t.doDeleteVendor}},[t._v("\n                Delete\n              ")])])])])]),a("div",{attrs:{id:"edit-vendor","uk-modal":"","data-uk-modal":"{target:'#edit-vendor',bgclose:false}",container:"#parent-component"}},[a("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[a("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""},on:{click:t.cancelEdit}}),a("div",{staticClass:"modal-header"},[a("h2",[t._v("Edit Vendor")]),a("p",[t._v("Edit vendor description and necessary information from here")])]),a("form",{on:{submit:function(e){return e.preventDefault(),t.editVendorData.apply(null,arguments)}}},[a("overlay-scrollbars",{class:"modal-body",attrs:{"uk-overflow-auto":""}},[a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendorname,expression:"editData.vendorname"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendorname},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendorname",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor contact person")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendorcontactperson,expression:"editData.vendorcontactperson"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendorcontactperson},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendorcontactperson",e.target.value)}}})])])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Vendor address")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendoraddress,expression:"editData.vendoraddress"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendoraddress},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendoraddress",e.target.value)}}})])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Country")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendorcountry,expression:"editData.vendorcountry"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendorcountry},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendorcountry",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("State")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendorstate,expression:"editData.vendorstate"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendorstate},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendorstate",e.target.value)}}})])])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("City")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendorcity,expression:"editData.vendorcity"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendorcity},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendorcity",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Email")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendoremail,expression:"editData.vendoremail"}],attrs:{type:"email",required:""},domProps:{value:t.editData.vendoremail},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendoremail",e.target.value)}}})])])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Account Name")]),a("div",{staticClass:"form-input__input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.vendoraccountname,expression:"editData.vendoraccountname"}],attrs:{type:"text",required:""},domProps:{value:t.editData.vendoraccountname},on:{input:function(e){e.target.composing||t.$set(t.editData,"vendoraccountname",e.target.value)}}})])]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Bank")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.bankName,required:""},model:{value:t.editData.vendorbankname,callback:function(e){t.$set(t.editData,"vendorbankname",e)},expression:"editData.vendorbankname"}})],1)])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Payment method")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.paymentMethods,required:""},model:{value:t.editData.paymentmethod,callback:function(e){t.$set(t.editData,"paymentmethod",e)},expression:"editData.paymentmethod"}})],1)]),a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Payment terms")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.paymentTerms,required:""},model:{value:t.editData.paymentterms,callback:function(e){t.$set(t.editData,"paymentterms",e)},expression:"editData.paymentterms"}})],1)])]),a("div",{staticClass:"flex-width-1-2 less-gp"},[a("label",{staticClass:"form-input"},[a("span",{staticClass:"form-input__label"},[t._v("Change Status")]),a("div",{staticClass:"form-input__input"},[a("Select2",{attrs:{options:t.status,required:""},model:{value:t.editData.active,callback:function(e){t.$set(t.editData,"active",e)},expression:"editData.active"}})],1)])]),a("hr"),a("div",{staticClass:"d-flx-alc-jfe mt-5"},[a("button",{staticClass:"btn btn-no-fill",attrs:{type:"button",id:"cancelUpdateBtn"},on:{click:t.closeEditModal}},[t._v("\n                  Cancel\n                ")]),a("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"updateBtn",type:"submit"}},[t._v("\n                  + Update Vendor\n                ")])])])],1)])])]),a("div",{staticClass:"inner-main-wrapper"},[a("ul",{staticClass:"card-list none flex-width-1-3 less-gp"},[a("li",{staticClass:"card-item box-deco-bg"},[a("nuxt-link",{attrs:{to:"/inventory"}},[a("div",{staticClass:"card-item__header"},[a("h3",[t._v("\n                Inventory\n              ")]),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#toq-file"}})])]),a("div",{staticClass:"card-item__body"},[a("p",{staticClass:"card-item__body--count"},[t._v("₦"+t._s(t.formatPrice(t.getTotalPrice)))])])])],1),a("li",{staticClass:"card-item box-deco-bg",staticStyle:{"background-color":"forestgreen"}},[a("nuxt-link",{staticClass:"active",attrs:{to:"/inventory/vendor"}},[a("div",{staticClass:"card-item__header"},[a("h3",[t._v("\n                Vendors\n              ")]),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#toq-file"}})])]),a("div",{staticClass:"card-item__body"},[a("p",{staticClass:"card-item__body--count"},[t._v(t._s(t.vendors.length))])])])],1),a("li",{staticClass:"card-item box-deco-bg"},[a("nuxt-link",{attrs:{to:"/inventory/purchase-order"}},[a("div",{staticClass:"card-item__header"},[a("h3",[t._v("\n                Purchase Orders\n              ")]),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#money-bag"}})])]),a("div",{staticClass:"card-item__body"},[a("p",{staticClass:"card-item__body--count"},[t._v(t._s(t.purchaseorders.length))])])])],1)]),a("div",{staticClass:"d-flx-alc-jsb table-title"},[a("h3",{staticClass:"section-title"},[t._v("VENDORS")]),a("button",{staticClass:"btn btn--primary",attrs:{type:"button"},on:{click:t.addVendorModal}},[t._v("\n          + Add new vendor\n        ")])]),a("overlay-scrollbars",{staticClass:"table-wrapper no-deco"},[a("figcaption",{staticClass:"sr"},[t._v("\n          A table showing information of categories\n        ")]),a("table",{staticClass:"table-content"},[a("thead",{},[a("tr",[a("th",{},[t._v("S/N")]),a("th",{},[t._v("Vendor Name")]),a("th",{},[t._v("City")]),a("th",{},[t._v("State")]),a("th",{},[t._v("Email")]),a("th",{},[t._v("Status")]),a("th",{},[t._v("Action")])])]),a("tbody",{staticClass:"tablebody"},[t.loading?a("tr",[a("td",{attrs:{colspan:"6"}},[t._v("Loading...please wait")])]):t._e(),!t.loading&&t.filteredList.length<1?a("tr",[a("td",{attrs:{colspan:"6"}},[t._v("No vendor record")])]):t._e(),t._l(t.filteredList,function(e,n){return!t.loading&&t.filteredList.length>0?a("tr",{key:n},[a("td",{staticStyle:{color:"#353190"}},[t._v("\n                #"+t._s(n+1)+".\n              ")]),a("td",[t._v(t._s(e.vendorname))]),a("td",[t._v(t._s(e.vendorcity))]),a("td",[t._v(t._s(e.vendorstate))]),a("td",[t._v(t._s(e.vendoremail))]),a("td",[e.active?a("span",{staticClass:"status paid"},[t._v("Active")]):t._e(),e.active?t._e():a("span",{staticClass:"status ended"},[t._v("Inactive")])]),a("td",{staticClass:"d-flx-alc"},[a("button",{staticClass:"btn btn--primary",attrs:{type:"button"},on:{click:function(a){return t.editVendor(e)}}},[t._v("\n\t\t\t\t\t          Edit\n                ")])]),a("td",[a("button",{staticClass:"btn btn--danger",attrs:{type:"button"},on:{click:function(a){return t.deleteVendor(e)}}},[t._v("\n\t\t\t\t\t          Delete\n                ")])])]):t._e()})],2)])])],1)])};n._withStripped=!0;var s={render:n,staticRenderFns:[]};e.a=s},sk2R:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("0/oG"),s=a("SgJF"),o=!1;var r=function(t){o||(a("1gF+"),a("/N0O"))},i=a("VU/8")(n.a,s.a,!1,r,"data-v-aa9d8852",null);i.options.__file="pages/inventory/vendor/index.vue",e.default=i.exports}});