webpackJsonp([85],{"7d+w":function(t,s,a){"use strict";s.a={layout:"default",data:function(){return{loading:!0,success:!1,formData:{token:""}}},methods:{validateToken:function(){var t=this;this.$store.dispatch("forgot-password/activateEmail",this.formData).then(function(s){if(s.data.status)return t.$toast.success(s.data.message),t.success=!0,void(t.loading=!1);t.loading=!1,t.success=!1,t.$toast.error(s.data.message)}).catch(function(s){t.loading=!1})}},mounted:function(){this.formData.token=this.$route.params.token,this.validateToken()}}},"LrV/":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("7d+w"),i=a("smXq"),n=a("VU/8")(e.a,i.a,!1,null,null,null);n.options.__file="pages/API/activate/_token.vue",s.default=n.exports},smXq:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("main",{staticClass:"main",attrs:{id:"mainContent"}},[a("div",{staticClass:"major-bg maxwidth-xxl mx-auto"},[a("div",{staticClass:"auth-wrapper"},[t._m(0),a("section",{staticClass:"auth-wrapper__main forget-password"},[a("div",{staticClass:"auth-wrapper__main--lhs"},[t.loading?a("div",{staticClass:"lhs-inner-wrap"},[t._m(1)]):t._e(),t.loading?t._e():a("div",{staticClass:"lhs-inner-wrap"},[t.success?a("div",{staticClass:"title-svg"},[a("svg",[a("use",{attrs:{"xlink:href":"/uploads/icons.svg#padlock"}})]),t._m(2)]):t._e(),t.success?t._e():a("div",{staticClass:"title-svg"},[a("svg",[a("use",{attrs:{"xlink:href":"/uploads/icons.svg#padlock"}})]),t._m(3)]),a("p",{staticClass:"aut-nav"},[a("nuxt-link",{staticClass:"btn btn--primary auth-btn",attrs:{to:"/"}},[t._v("Back to sign in")])],1)])]),a("div",{staticClass:"auth-wrapper__main--rhs"},[a("svg",[a("use",{attrs:{"xlink:href":"/uploads/icons.svg#overlap"}})]),a("h2",[t._v("Welcome to Ntisa")])])]),t._m(4)])])])};e._withStripped=!0;var i={render:e,staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("header",{staticClass:"auth-logo mb-3"},[s("img",{attrs:{src:"/uploads/logo.png",alt:"NTISA Logo"}})])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"title-svg"},[s("div",{staticClass:"cont-holder ml-1h"},[s("h1",{staticClass:"aut-page-title"},[this._v("\n                      Loading...please wait\n                  ")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cont-holder ml-1h"},[s("h1",{staticClass:"aut-page-title"},[this._v("\n                Account activation successful\n              ")]),s("p",{staticClass:"aut-page-text"},[this._v("\n                You have successfully activated your account\n              ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"cont-holder ml-1h"},[s("h1",{staticClass:"aut-page-title"},[this._v("\n                Account activation failed\n              ")]),s("p",{staticClass:"aut-page-text"},[this._v("\n                Your account was not activated due to an invalid activation code or a network error\n              ")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"legal"},[s("div",{staticClass:"legal-links"},[s("a",{attrs:{href:""}},[this._v("privacy")]),s("a",{attrs:{href:""}},[this._v("Terms")])]),s("p",[this._v("All rights reserved © 2020 Ntisa")])])}]};s.a=i}});