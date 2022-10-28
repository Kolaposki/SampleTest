webpackJsonp([61],{"0JJX":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("2t2u"),r=e("gkir"),l=e("VU/8")(s.a,r.a,!1,null,null,null);l.options.__file="pages/settings/loyalty-rule/index.vue",a.default=l.exports},"2t2u":function(t,a,e){"use strict";(function(t){a.a={layout:"main",data:function(){return{loading:!0,formData:{merchID:"",loyaltyrule:"",rewardpoint:"",amountspent:"",startdate:"",endate:"",status:"True"},options:[{id:"True",text:"True"},{id:"False",text:"False"}],errorData:{loyaltyrule:"",rewardpoint:"",amountspent:"",startdate:"",endate:""},editData:{merchID:"",loyaltyrule:"",rewardpoint:"",amountspent:"",startdate:"",endate:"",status:"True",id:""},rules:[]}},computed:{isCourierService:function(){return this.user.businessdescription.toLowerCase().includes("delivery")}},methods:{saveLoyaltyRule:function(){var a=this;this.validateAddRule()||(t("#submitBtn").attr("disabled",!0).html("Creating...please wait"),this.$store.dispatch("loyalty-rule/createRule",this.formData).then(function(e){if(t("#submitBtn").attr("disabled",!1).html("+ Create loyalty rule"),"True"===e.data.status)return a.$toast.success(e.data.message),a.closeAddModal(),void a.listLoyaltyRule();a.$toast.error(e.data.message)}).catch(function(e){t("#submitBtn").attr("disabled",!1).html("+ Create loyalty rule"),a.$toast.error("An error occurred")}))},updateLoyaltyRule:function(){var a=this;t("#updateBtn").attr("disabled",!0).html("Updating...please wait"),this.$store.dispatch("loyalty-rule/updateRule",this.editData).then(function(e){if(t("#updateBtn").attr("disabled",!1).html("+ Update loyalty rule"),e.data.status)return a.$toast.success(e.data.message),a.closeEditModal(),void a.listLoyaltyRule();a.$toast.error(e.data.message)}).catch(function(e){t("#updateBtn").attr("disabled",!1).html("+ Update loyalty rule"),a.$toast.error("An error occurred")})},closeAddModal:function(){this.clearErrorData(),this.formData.loyaltyrule="",this.formData.rewardpoint="",this.formData.amountspent="",this.formData.startdate="",this.formData.endate="",this.formData.status="True",UIkit.modal("#add-loyalty-rule").toggle("hide")},closeEditModal:function(){this.editData={merchID:"",loyaltyrule:"",rewardpoint:"",amountspent:"",startdate:"",endate:"",status:"True"},UIkit.modal("#edit-loyalty-rule").toggle("hide")},clearErrorData:function(){this.errorData={loyaltyrule:"",rewardpoint:"",amountspent:"",startdate:"",endate:"",status:"True"}},validateAddRule:function(){return this.clearErrorData(),""===this.formData.loyaltyrule?(this.errorData.loyaltyrule=!0,!0):""===this.formData.rewardpoint?(this.errorData.rewardpoint=!0,!0):""===this.formData.amountspent?(this.errorData.amountspent=!0,!0):""===this.formData.startdate?(this.errorData.startdate=!0,!0):""===this.formData.endate&&(this.errorData.endate=!0,!0)},listLoyaltyRule:function(){var t=this;this.$store.dispatch("loyalty-rule/listRules",this.formData.merchID).then(function(a){t.loading=!1,t.rules=a.data.data})},displayCreateModal:function(){UIkit.modal("#add-loyalty-rule").toggle()},editLoyalty:function(t){this.editData={merchID:this.formData.merchID,loyaltyrule:t.loyaltyrule,rewardpoint:t.rewardpoint,amountspent:t.amountspent,startdate:t.startdate,endate:t.endate,status:!0===t.status?"True":"",id:t.id},UIkit.modal("#edit-loyalty-rule").toggle()}},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.listLoyaltyRule()}}}).call(a,e("7t+N"))},gkir:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("overlay-scrollbars",{staticClass:"main-content-wrap"},[e("overlay-scrollbars",{staticClass:"page-extras d-flx-alc-jsb settings-extra"},[e("div",{staticClass:"links-wrap"},[e("nuxt-link",{attrs:{to:"/settings"}},[t._v("Basic details")]),e("nuxt-link",{attrs:{to:"/settings/contact-details"}},[t._v("Contact Details")]),e("nuxt-link",{attrs:{to:"/settings/change-password"}},[t._v("Change Password")])],1)]),e("div",{staticClass:"inner-main-wrapper"},[e("div",{staticClass:"box-deco-bg p-3"},[e("section",{staticClass:"setting-section"},[e("div",{staticClass:"d-flx-alc-jsb table-title"},[e("h3",{staticClass:"section-title"},[t._v("LOYALTY RULE")]),e("button",{staticClass:"btn btn--primary",attrs:{type:"button"},on:{click:t.displayCreateModal}},[t._v("\n            Create loyalty rule\n          ")])]),e("overlay-scrollbars",{staticClass:"table-wrapper no-deco"},[e("table",{staticClass:"table-content"},[e("thead",{},[e("tr",[e("th",{},[t._v("Loyalty rule")]),e("th",{},[t._v("Reward point")]),e("th",{},[t._v("Amount spent")]),e("th",{},[t._v("Start date")]),e("th",{},[t._v("End date")]),e("th",{},[t._v("Action")])])]),e("tbody",{staticClass:"tablebody"},[t.loading?e("tr",[e("td",{attrs:{colspan:"5"}},[t._v("Loading...please wait")])]):t._e(),!t.loading&&t.rules.length<1?e("tr",[e("td",{attrs:{colspan:"5"}},[t._v("No loyalty rule at the moment.")])]):t._e(),t._l(t.rules,function(a){return!t.loading&&t.rules.length>0?e("tr",{key:a.id},[e("td",[t._v(t._s(a.loyaltyrule))]),e("td",[t._v(t._s(a.rewardpoint))]),e("td",[t._v(t._s(a.amountspent))]),e("td",[t._v(t._s(t.$moment(a.startdate).format("Do MMM, YYYY")))]),e("td",[t._v(t._s(t.$moment(a.endate).format("Do MMM, YYYY")))]),e("td",[e("button",{staticClass:"btn btn-icon",attrs:{title:"Edit",type:"button"},on:{click:function(e){return t.editLoyalty(a)}}},[e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#edit"}})])])])]):t._e()})],2)])])],1)])]),e("div",{attrs:{id:"add-loyalty-rule","uk-modal":""}},[e("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[e("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""},on:{click:t.closeAddModal}}),e("div",{staticClass:"modal-header"},[e("h2",[t._v("Add price")]),e("p",[t._v("Enter the details to create a new price.")])]),e("form",{on:{submit:function(a){return a.preventDefault(),t.saveLoyaltyRule.apply(null,arguments)}}},[e("div",{staticClass:"modal-body",attrs:{"uk-overflow-auto":""}},[e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Loyalty rule")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.loyaltyrule,expression:"formData.loyaltyrule"}],attrs:{type:"text"},domProps:{value:t.formData.loyaltyrule},on:{input:function(a){a.target.composing||t.$set(t.formData,"loyaltyrule",a.target.value)}}})]),t.errorData.loyaltyrule?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a rule")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Reward point")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.rewardpoint,expression:"formData.rewardpoint"}],attrs:{type:"text"},domProps:{value:t.formData.rewardpoint},on:{input:function(a){a.target.composing||t.$set(t.formData,"rewardpoint",a.target.value)}}})]),t.errorData.rewardpoint?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a reward point")]):t._e()])]),e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Start Date")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.startdate,expression:"formData.startdate"}],attrs:{type:"date"},domProps:{value:t.formData.startdate},on:{input:function(a){a.target.composing||t.$set(t.formData,"startdate",a.target.value)}}})]),t.errorData.startdate?e("span",{staticClass:"form-input__error-msg"},[t._v("Please select a start date")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("End Date")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.endate,expression:"formData.endate"}],attrs:{type:"date"},domProps:{value:t.formData.endate},on:{input:function(a){a.target.composing||t.$set(t.formData,"endate",a.target.value)}}})]),t.errorData.endate?e("span",{staticClass:"form-input__error-msg"},[t._v("Please select an end date")]):t._e()])]),e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Amount spent")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.amountspent,expression:"formData.amountspent"}],attrs:{type:"text"},domProps:{value:t.formData.amountspent},on:{input:function(a){a.target.composing||t.$set(t.formData,"amountspent",a.target.value)}}})]),t.errorData.amountspent?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter an amount")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Status")]),e("div",{staticClass:"form-input__input"},[e("Select2",{attrs:{options:t.options},model:{value:t.formData.status,callback:function(a){t.$set(t.formData,"status",a)},expression:"formData.status"}})],1)])]),e("div",{staticClass:"d-flx-alc-jfe mt-5"},[e("button",{staticClass:"btn btn-no-fill",attrs:{type:"button",id:"cancelBtn"},on:{click:t.closeAddModal}},[t._v("\n              Cancel\n            ")]),e("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"submitBtn",type:"submit"}},[t._v("\n              + Create loyalty rule\n            ")])])])])])]),e("div",{attrs:{id:"edit-loyalty-rule","uk-modal":""}},[e("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[e("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""},on:{click:t.closeEditModal}}),e("div",{staticClass:"modal-header"},[e("h2",[t._v("Add price")]),e("p",[t._v("Enter the details to create a new price.")])]),e("form",{on:{submit:function(a){return a.preventDefault(),t.updateLoyaltyRule.apply(null,arguments)}}},[e("div",{staticClass:"modal-body",attrs:{"uk-overflow-auto":""}},[e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Loyalty rule")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.loyaltyrule,expression:"editData.loyaltyrule"}],attrs:{type:"text"},domProps:{value:t.editData.loyaltyrule},on:{input:function(a){a.target.composing||t.$set(t.editData,"loyaltyrule",a.target.value)}}})]),t.errorData.loyaltyrule?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a rule")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Reward point")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.rewardpoint,expression:"editData.rewardpoint"}],attrs:{type:"text"},domProps:{value:t.editData.rewardpoint},on:{input:function(a){a.target.composing||t.$set(t.editData,"rewardpoint",a.target.value)}}})]),t.errorData.rewardpoint?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter a reward point")]):t._e()])]),e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Start Date")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.startdate,expression:"editData.startdate"}],attrs:{type:"date"},domProps:{value:t.editData.startdate},on:{input:function(a){a.target.composing||t.$set(t.editData,"startdate",a.target.value)}}})]),t.errorData.startdate?e("span",{staticClass:"form-input__error-msg"},[t._v("Please select a start date")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("End Date")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.endate,expression:"editData.endate"}],attrs:{type:"date"},domProps:{value:t.editData.endate},on:{input:function(a){a.target.composing||t.$set(t.editData,"endate",a.target.value)}}})]),t.errorData.endate?e("span",{staticClass:"form-input__error-msg"},[t._v("Please select an end date")]):t._e()])]),e("div",{staticClass:"flex-width-1-2 less-gp"},[e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Amount spent")]),e("div",{staticClass:"form-input__input"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.editData.amountspent,expression:"editData.amountspent"}],attrs:{type:"text"},domProps:{value:t.editData.amountspent},on:{input:function(a){a.target.composing||t.$set(t.editData,"amountspent",a.target.value)}}})]),t.errorData.amountspent?e("span",{staticClass:"form-input__error-msg"},[t._v("Please enter an amount")]):t._e()]),e("label",{staticClass:"form-input"},[e("span",{staticClass:"form-input__label"},[t._v("Status")]),e("div",{staticClass:"form-input__input"},[e("Select2",{attrs:{options:t.options},model:{value:t.editData.status,callback:function(a){t.$set(t.editData,"status",a)},expression:"editData.status"}})],1)])]),e("div",{staticClass:"d-flx-alc-jfe mt-5"},[e("button",{staticClass:"btn btn-no-fill",attrs:{type:"button"},on:{click:t.closeEditModal}},[t._v("\n              Cancel\n            ")]),e("button",{staticClass:"btn btn--primary ml-1",attrs:{id:"updateBtn",type:"submit"}},[t._v("\n              Update loyalty rule\n            ")])])])])])])],1)};s._withStripped=!0;var r={render:s,staticRenderFns:[]};a.a=r}});