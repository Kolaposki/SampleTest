webpackJsonp([57],{"9YAG":function(t,a,s){"use strict";var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("overlay-scrollbars",{staticClass:"main-content-wrap"},[s("div",{staticClass:"d-flx-alc-jsb page-extras"},[s("label",{staticClass:"search-w-icon"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Search"},domProps:{value:t.search},on:{input:function(a){a.target.composing||(t.search=a.target.value)}}}),s("svg",[s("use",{attrs:{href:"/uploads/icons.svg#search"}})])]),s("nuxt-link",{staticClass:"btn btn--primary",attrs:{to:"/subscriptions/new",type:"button"}},[t._v("\n      + New Subscription\n    ")])],1),s("div",{staticClass:"inner-main-wrapper"},[s("overlay-scrollbars",{staticClass:"table-wrapper"},[s("figcaption",{staticClass:"sr"},[t._v("\n        A table showing information of categories\n      ")]),s("table",{staticClass:"table-content"},[s("thead",{},[s("tr",[s("th",{staticClass:"large-space column-name"},[t._v("License")]),s("th",{staticClass:"column-name"},[t._v("Ref No.")]),s("th",{staticClass:"column-name"},[t._v("Duration")]),s("th",{staticClass:"column-name"},[t._v("Date subscribed")]),s("th",{staticClass:"column-name"},[t._v("Expiry Date")]),s("th",{staticClass:"column-name"},[t._v("Status")])])]),s("tbody",{staticClass:"tablebody"},[t.loading?s("tr",[s("td",{attrs:{colspan:"7"}},[t._v("Loading...please wait")])]):t._e(),!t.loading&&t.filteredList.length<1?s("tr",[s("td",{attrs:{colspan:"7"}},[t._v("No record at the moment")])]):t._e(),t._l(t.filteredList,function(a,e){return!t.loading&&t.filteredList.length>0?s("tr",{key:e},[s("td",{staticClass:"column-name"},[t._v(t._s(a.licensename))]),s("td",{staticClass:"column-name"},[t._v(t._s(a.transreference))]),s("td",{staticClass:"column-name"},[t._v(t._s(a.duration))]),s("td",{staticClass:"column-name"},[t._v(t._s(t.$moment(a.created_at).format("Do MMMM YYYY, h:mm a")))]),s("td",{staticClass:"column-name"},[t._v(t._s(t.$moment(a.expirationdate).format("Do MMMM YYYY, h:mm a")))]),t.calculateExpiry(a.expirationdate)?s("td",{staticClass:"column-name"},[s("span",{staticClass:"rating low"},[t._v("Inactive")])]):t._e(),t.calculateExpiry(a.expirationdate)?t._e():s("td",{staticClass:"column-name"},[s("span",{staticClass:"rating high"},[t._v("Active")])])]):t._e()})],2)])])],1)])};e._withStripped=!0;var n={render:e,staticRenderFns:[]};a.a=n},Mkis:function(t,a,s){"use strict";a.a={layout:"main",computed:{filteredList:function(){var t=this;return this.subscriptions.filter(function(a){if(a.licensename.toLowerCase().includes(t.search.toLowerCase()))return a.licensename.toLowerCase().includes(t.search.toLowerCase())})}},data:function(){return{subscriptions:[],search:"",loading:!0,formData:{merchID:""}}},methods:{getMerchantSubs:function(){var t=this;this.$store.dispatch("license/getMerchantSubscriptions",this.formData).then(function(a){if(a.data.status)return t.subscriptions=a.data.data,void(t.loading=!1);t.loading=!1,t.$toast.error("An error has occurred")}).catch(function(a){t.loading=!1,t.$toast.error("An error has occurred")})},calculateExpiry:function(t){var a=this.$moment().format("YYYY-MM-DD"),s=this.$moment(t).format("YYYY-MM-DD");return!!this.$moment(a).isAfter(s)}},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.getMerchantSubs()}}},T0Dw:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Mkis"),n=s("9YAG"),i=s("VU/8")(e.a,n.a,!1,null,null,null);i.options.__file="pages/subscriptions/index.vue",a.default=i.exports}});