webpackJsonp([45],{MjAT:function(e,t,s){var a=s("Wqhb");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);s("rjj0")("76fb1a79",a,!1,{sourceMap:!1})},MroX:function(e,t,s){"use strict";(function(e){t.a={layout:"main",data:function(){return{date:"",formData:{merchID:"",cashthreshold:"",paymentdate:"",expectedweeklyamount:""},errorData:{cashthreshold:!1,paymentdate:!1,expectedweeklyamount:!1},cashthreshold:"",expectedweeklyamount:""}},computed:{},methods:{formatInput:function(e,t){if(""!=e){var s=e.replace(/,/g,"");"cashthreshold"==t?(this.formData.cashthreshold=Number(s),"."==s.substr(s.length-1)?this.cashthreshold=s:isNaN(s)?this.cashthreshold="":this.cashthreshold=parseFloat(this.cashthreshold.replace(/,/g,"")).toLocaleString()):(this.formData.expectedweeklyamount=Number(s),"."==s.substr(s.length-1)?this.expectedweeklyamount=s:isNaN(s)?this.expectedweeklyamount="":this.expectedweeklyamount=parseFloat(this.expectedweeklyamount.replace(/,/g,"")).toLocaleString())}"cashthreshold"==t?"NaN"==this.cashthreshold&&(this.cashthreshold=0):"NaN"==this.expectedweeklyamount&&(this.expectedweeklyamount=0)},formatRemitInput:function(){if(""!=this.formData.expectedweeklyamount){var e=this.formData.expectedweeklyamount.replace(/,/g,"");"."==e.substr(e.length-1)?this.formData.expectedweeklyamount=e:isNaN(e)?this.formData.expectedweeklyamount="":this.formData.expectedweeklyamount=parseFloat(this.formData.expectedweeklyamount.replace(/,/g,"")).toLocaleString()}else"NaN"==this.formData.expectedweeklyamount&&(this.formData.expectedweeklyamount=0)},setRule:function(){var t=this;this.validateData()||(e("#ruleBtn").attr("disabled",!0).html("Setting Rule....please wait"),this.$store.dispatch("settings/businessRule",this.formData).then(function(s){if(e("#ruleBtn").attr("disabled",!1).html("Set Rule"),s.data.status)return t.$toast.success("Business Rule is captured!"),void t.listRule();t.$toast.error(s.data.message)}).catch(function(t){e("#ruleBtn").attr("disabled",!1).html("Set Rule"),console.log(t)}))},listRule:function(){var e=this;this.$store.dispatch("settings/listBusinessRule",this.formData.merchID).then(function(t){if(t.data.status){var s=t.data.data;return e.formData={merchID:s.merchID,cashthreshold:s.cashthreshold,paymentdate:s.paymentdate,expectedweeklyamount:s.expectedweeklyamount},e.cashthreshold=s.cashthreshold,e.expectedweeklyamount=s.expectedweeklyamount,void(e.loading=!1)}e.loading=!1,e.$toast.error("An error occurred")}).catch(function(t){e.loading=!1,e.$toast.error("An error occurred!")})},validateData:function(){return this.clearError(),""===this.cashthreshold?(this.errorData.cashthreshold=!0,!0):""===this.formData.paymentdate?(this.errorData.paymentdate=!0,!0):""===this.expectedweeklyamount?(this.errorData.expectedweeklyamount=!0,!0):void 0},clearError:function(){this.errorData={cashthreshold:!1,paymentdate:!1,expectedweeklyamount:!1}},setBusinessData:function(){}},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.listRule()},beforeRouteEnter:function(e,t,s){var a=JSON.parse(localStorage.getItem("user"));void 0==a.role||a.rolepermission&&a.rolepermission[0].settings.viewsettings?s():(alert("You have not been permitted to view this page"),s({path:"/dashboard"}))}}}).call(t,s("7t+N"))},Wqhb:function(e,t,s){(e.exports=s("FZ+f")(!1)).push([e.i,"h2[data-v-0250619f]{font-weight:600;color:#2f4f4f}",""])},ohhr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("MroX"),r=s("tVPW"),o=!1;var i=function(e){o||s("MjAT")},n=s("VU/8")(a.a,r.a,!1,i,"data-v-0250619f",null);n.options.__file="pages/settings/index.vue",t.default=n.exports},tVPW:function(e,t,s){"use strict";var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("overlay-scrollbars",{staticClass:"main-content-wrap"},[s("overlay-scrollbars",{staticClass:"page-extras d-flx-alc-jsb settings-extra"},[s("div",{staticClass:"links-wrap"},[s("nuxt-link",{staticClass:"active",attrs:{to:"/settings"}},[e._v("Business Rules")]),e.user.rolepermission&&e.user.rolepermission[0].tax.viewtax||e.isMerchant?s("nuxt-link",{attrs:{to:"/settings/tax"}},[e._v("Tax")]):e._e(),e.user.rolepermission&&e.user.rolepermission[0].discounts.viewdiscount||e.isMerchant?s("nuxt-link",{attrs:{to:"/settings/discount"}},[e._v("Discount")]):e._e(),e.user.rolepermission&&e.user.rolepermission[0].settings.viewroles||e.isMerchant?s("nuxt-link",{attrs:{to:"/settings/roles"}},[e._v("Roles & Permissions")]):e._e(),e.user.rolepermission&&e.user.rolepermission[0].settings.viewlease||e.isMerchant?s("nuxt-link",{attrs:{to:"/settings/lease"}},[e._v("Lease")]):e._e()],1)]),s("div",{staticClass:"inner-main-wrapper"},[s("div",{staticClass:"py-3 px-0"},[s("section",{staticClass:"setting-section"},[s("div",{staticClass:"setting-section-title"},[s("h2",[e._v("Business Rules")])]),s("div",{staticClass:" r-width-500 py-2"},[s("h2"),s("form",{on:{submit:function(t){return t.preventDefault(),e.setRule.apply(null,arguments)}}},[s("label",{staticClass:"form-input"},[s("span",{staticClass:"form-input__label"},[e._v("Set Riders Cash Payment Threshold (₦)")]),s("div",{staticClass:"form-input__input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.cashthreshold,expression:"cashthreshold"}],attrs:{type:"text",placeholder:"Enter Threshold Amount"},domProps:{value:e.cashthreshold},on:{keyup:function(t){return e.formatInput(e.cashthreshold,"cashthreshold")},input:function(t){t.target.composing||(e.cashthreshold=t.target.value)}}})]),e.errorData.cashthreshold?s("span",{staticClass:"form-input__error-msg"},[e._v("Cash Threshold is required")]):e._e()]),s("label",{staticClass:"form-input"},[s("span",{staticClass:"form-input__label"},[e._v("Set Remittance Duration (Days)")]),s("div",{staticClass:"form-input__input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.formData.paymentdate,expression:"formData.paymentdate"}],attrs:{type:"number",min:"0",value:"0",placeholder:"Enter Number of Weeks"},domProps:{value:e.formData.paymentdate},on:{input:function(t){t.target.composing||e.$set(e.formData,"paymentdate",t.target.value)}}})]),e.errorData.paymentdate?s("span",{staticClass:"form-input__error-msg"},[e._v("Default Date is required")]):e._e()]),s("label",{staticClass:"form-input"},[s("span",{staticClass:"form-input__label"},[e._v("Expected Weekly Remittance (₦)")]),s("div",{staticClass:"form-input__input"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.expectedweeklyamount,expression:"expectedweeklyamount"}],attrs:{type:"text",placeholder:"Enter Amount"},domProps:{value:e.expectedweeklyamount},on:{keyup:function(t){return e.formatInput(e.expectedweeklyamount,"expectedweeklyremit")},input:function(t){t.target.composing||(e.expectedweeklyamount=t.target.value)}}})]),e.errorData.expectedweeklyamount?s("span",{staticClass:"form-input__error-msg"},[e._v("Expected weekly amount is required")]):e._e()]),s("button",{staticClass:"btn btn--primary mt-1",attrs:{type:"submit",id:"ruleBtn"}},[e._v("\n                Set Rule\n              ")])])])])])])],1)};a._withStripped=!0;var r={render:a,staticRenderFns:[]};t.a=r}});