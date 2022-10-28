/*! For license information please see LICENSES */
webpackJsonp([23],{"9gFK":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("overlay-scrollbars",{staticClass:"main-content-wrap"},[a("div",{staticClass:"d-flx-alc-jsb page-extras"},[a("nuxt-link",{staticClass:"text-link",attrs:{to:"/reports"}},[a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#back"}})]),a("span",{staticClass:"ml-1 fw-bold co-grey"},[t._v("Back")])]),a("div",{staticClass:"search-filter d-flx-alc-jfe"},[a("label",{staticClass:"search-w-icon"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Search"},domProps:{value:t.search},on:{keyup:t.filteredRider,input:function(e){e.target.composing||(t.search=e.target.value)}}}),a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#search"}})])]),a("div",{staticClass:"drop-down filter-drop",attrs:{id:"branch"}},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.paymentStatus,expression:"paymentStatus"}],staticClass:"filter-btn box-deco-smallr",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.paymentStatus=e.target.multiple?a:a[0]},function(e){return t.filterStatus()}]}},[a("option",{attrs:{value:"",selected:""}},[t._v("All Payment Status")]),a("option",{attrs:{value:"pending"}},[t._v("pending")]),a("option",{attrs:{value:"paid"}},[t._v("paid")])])]),a("div",{staticClass:"drop-down filter-drop"},[a("select",{directives:[{name:"model",rawName:"v-model",value:t.formData.branchID,expression:"formData.branchID"}],staticClass:"filter-btn box-deco-smallr",on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.formData,"branchID",e.target.multiple?a:a[0])},function(e){return t.getReport("branchID")}]}},[a("option",{attrs:{value:""}},[t._v("All Branches")]),t._l(t.branches,function(e){return a("option",{key:e.id,domProps:{value:e.id}},[t._v("\n              "+t._s(e.branchname)+"\n            ")])})],2)]),a("div",{staticClass:"drop-down date-drop"},[a("date-picker",{attrs:{range:"",placeholder:"Date Range",type:"datetime",timeTitleFormat:"YYYY-MM-DD hh:mm a",format:"YYYY-MM-DD hh:mm a","value-type":"format","show-second":!1,"show-time-panel":t.showTimeRangePanel},on:{change:t.getReport,close:t.handleRangeClose},scopedSlots:t._u([{key:"footer",fn:function(){return[a("button",{staticClass:"mx-btn mx-btn-text",on:{click:t.toggleTimeRangePanel}},[t._v("\n\t\t\t\t\t"+t._s(t.showTimeRangePanel?"select date":"select time")+"\n\t\t\t\t")])]},proxy:!0}]),model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),a("download-excel",{staticClass:"btn btn--primary",attrs:{id:"download",fetch:t.fetchData,fields:t.json_fields,"before-generate":t.startDownload,"before-finish":t.finishDownload,worksheet:"My Worksheet",name:"riders_settlement_report.xls"}},[t._v("\n          Export\n        ")])],1)],1),a("div",{staticClass:"d-flx-alc-jse page-extras"},[a("div",{staticClass:"d-flx-alc"},[a("div",{staticClass:"d-flx-alc-jfe"},[t._v(t._s(t.date[0])+" - "+t._s(t.date[1]))])])]),a("div",{staticClass:"inner-main-wrapper"},[a("overlay-scrollbars",{staticClass:"table-wrapper"},[a("figcaption",{staticClass:"sr"},[t._v("\n          A table showing information of categories\n        ")]),a("table",{staticClass:"table-content"},[a("thead",{},[a("tr",[a("th",{staticClass:" column-name"},[t._v("Rider ID")]),a("th",{staticClass:" column-name"},[t._v("Rider Name")]),a("th",[t._v("Amount (₦)")]),a("th",[t._v("Cash Collected by Rider (₦)")]),a("th",[t._v("Commission Due to Ntisa (₦)")]),a("th",[t._v("Amount due to Rider (₦)")]),a("th",{staticClass:"column-name"},[t._v("Payment Status")]),a("th",{staticClass:"column-name"},[t._v("Payment Date")])])]),a("tbody",{staticClass:"tablebody"},[t.loading?a("tr",[a("td",{attrs:{colspan:"10"}},[t._v("Loading...please wait")])]):t._e(),!t.loading&&t.filteredList.length<1?a("tr",[a("td",{attrs:{colspan:"10"}},[t._v("No record at the moment")])]):t._e(),t._l(t.filteredList,function(e,s){return!t.loading&&t.filteredList.length>0?a("tr",{key:s},[a("td",{staticClass:"column-name"},[t._v(t._s(e.riderID?e.riderID:"N/A"))]),a("td",{staticClass:"column-name"},[t._v(t._s(e.riderfirstname)+" "+t._s(e.riderlastname))]),a("td",[t._v(t._s(e.ordertotal__sum?t.formatPrice(e.ordertotal__sum):"N/A"))]),a("td",[t._v(t._s(e.cashcollected?t.formatPrice(e.cashcollected):"N/A")+" ")]),a("td",[t._v(" "+t._s(e.Commission_due_to_ntisa?t.formatPrice(e.Commission_due_to_ntisa):"N/A"))]),a("td",[t._v(t._s(e.amountduetorider?t.formatPrice(e.amountduetorider):"N/A"))]),a("td",{staticClass:"column-name"},[a("span",{staticClass:"column-name",class:"status "+(void 0!==e.paymentstatus?e.paymentstatus.toLowerCase():"")},[t._v(t._s(e.paymentstatus.replace("_"," ").toUpperCase()))])]),a("td",{staticClass:"column-name"},[t._v(" "+t._s(e.paymentdate?e.paymentdate:"N/A"))])]):t._e()})],2)])])],1)])};s._withStripped=!0;var r={render:s,staticRenderFns:[]};e.a=r},FXUk:function(t,e,a){"use strict";var s=a("hYtS");a("/5sW");e.a={components:{Pagination:s.a,"vue-datetime-picker":a("i0ln")},layout:"main",computed:{json_fields:function(){var t=this;return{"Rider ID":"riderID",Amount:{field:"ordertotal__sum",callback:function(e){return t.formatPrice(e)}},"Cash Collected by Rider":{field:"cashcollected",callback:function(e){return t.formatPrice(e)}},"Commission Due to Ntisa":{field:"Commission_due_to_ntisa",callback:function(e){return t.formatPrice(e)}},"Amount Due to Rider":"amountduetorider","payment Status":"paymentstatus","Payment Date":"paymentdate"}}},data:function(){return{loading:!0,search:"",result:"",paymentStatus:"",filteredList:[],dailyTotal:"",reports:[],branches:[],date:"",formData:{merchID:"",branchID:"",startdate:"",enddate:"",riderID:""},headers:{Next:"",Prev:"",Count:0,total:0,pagenum:1},api:"usersreport/getRiderSettlementReport"}},methods:{filterStatus:function(){var t=this;this.filteredList=this.reports.filter(function(e){return""==t.paymentStatus?t.reports:null!=e.paymentstatus&&e.paymentstatus.toLowerCase().includes(t.paymentStatus.toLowerCase())?e.paymentstatus.toLowerCase().includes(t.paymentStatus.toLowerCase()):void 0})},filteredRider:function(){var t=this;this.filteredList=this.reports.filter(function(e){return""==t.search?t.reports:null!=e.riderID&&e.riderID==t.search?e.riderID==t.search:void 0})},formatNumber:function(t){return(new Intl.NumberFormat).format(t)},getReport:function(t){var e=this;void 0!=t&&"branchID"==t&&(this.formData.page=1),this.loading=!0,""!==this.date&&null!=this.date[0]?(this.formData.startdate=this.$moment(this.date[0]).format("YYYY-MM-DD"),this.formData.enddate=this.$moment(this.date[1]).format("YYYY-MM-DD")):(this.formData.startdate="",this.formData.enddate="");this.formData.export="",this.$store.dispatch("usersreport/getRiderSettlementReport",this.formData).then(function(t){if(t.status)return console.log("res",t),e.reports=t.data,e.filteredList=t.data,e.setHeaders(t.data,t.headers),void(e.loading=!1);e.loading=!1,e.$toast.error("An error occurred")}).catch(function(t){e.loading=!1,e.is401(t.res.status),e.$toast.error("An error occurred "+t)})},listBranches:function(){var t=this;this.$store.dispatch("branches/listBranches",this.formData.merchID).then(function(e){t.branches=e.data.data}).catch(function(t){console.log(t)})},getDailySales:function(){var t=this;this.$store.dispatch("salesreport/getDailySales",this.formData).then(function(e){t.dailyTotal=e.data.data}).catch(function(t){console.log(t)})}},beforeRouteEnter:function(t,e,a){var s=JSON.parse(localStorage.getItem("user"));void 0==s.role||s.rolepermission&&s.rolepermission[0].reports.viewridersettlement?a():(alert("You have not been permitted to view this page"),a({path:"/dashboard"}))},mounted:function(){this.formData.merchID=this.user.role?this.user.merchID:this.user.id,this.getReport(),this.listBranches()}}},M2Sb:function(t,e,a){"use strict";e.a={layout:"main",props:["headers","value","date"],methods:{previous:function(){if(""!==this.headers.Prev){var t=+this.value-1;t<0?t=1:(this.$emit("input",t),this.$emit("go"))}},next:function(){if(""!==this.headers.Next){var t=+this.value+1;this.$emit("input",t),this.$emit("go")}}}}},hYtS:function(t,e,a){"use strict";var s=a("M2Sb"),r=a("zTfd"),n=a("VU/8")(s.a,r.a,!1,null,null,null);n.options.__file="components/Pagination.vue",e.a=n.exports},i0ln:function(t,e,a){(function(t){!function(t){function e(s){if(a[s])return a[s].exports;var r=a[s]={exports:{},id:s,loaded:!1};return t[s].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var a={};e.m=t,e.c=a,e.p="",e(0)}([function(e,a){var s=["today","clear","close","selectMonth","prevMonth","nextMonth","selectYear","prevYear","nextYear","selectDecade","prevDecade","nextDecade","prevCentury","nextCentury","pickHour","incrementHour","decrementHour","pickMinute","incrementMinute","decrementMinute","pickSecond","incrementSecond","decrementSecond","togglePeriod","selectTime"];e.exports={replace:!0,inherit:!1,template:"<div class='input-group date'><input class='form-control' :name='name' type='text' /><span class='input-group-addon'><i class='fa fa-fw fa-calendar'></i></span></div>",props:{model:{required:!0,twoWay:!0},type:{type:String,required:!1,default:"datetime"},language:{type:String,required:!1,default:""},datetimeFormat:{type:String,required:!1,default:"YYYY-MM-DD HH:mm:ss"},dateFormat:{type:String,required:!1,default:"YYYY-MM-DD"},timeFormat:{type:String,required:!1,default:"HH:mm:ss"},name:{type:String,required:!1,default:""},onChange:{required:!1,default:null}},beforeCompile:function(){this.isChanging=!1,this.control=null},ready:function(){var e={useCurrent:!1,showClear:!0,showClose:!1,icons:{time:"fa fa-clock-o",date:"fa fa-calendar",up:"fa fa-chevron-up",down:"fa fa-chevron-down",previous:"fa fa-chevron-left",next:"fa fa-chevron-right",today:"fa fa-dot-circle-o",clear:"fa fa-trash",close:"fa fa-times"}},a=this.language;switch(null!==a&&""!==a||(this.$language?a=this.$language:langauge="en-US"),e.locale=this.getLanguageCode(a),this.type){case"date":e.format=this.dateFormat;break;case"time":e.format=this.timeFormat;break;case"datetime":default:e.format=this.datetimeFormat}if(this.$i18n&&this.$i18n.datetime_picker){for(var r=this.$i18n.datetime_picker,n=t.fn.datetimepicker.defaults.tooltips,i=0;i<s.length;++i){var o=s[i];r[o]&&(n[o]=r[o])}e.tooltips=n}t(this.$el).datetimepicker(e),this.control=t(this.$el).data("DateTimePicker"),this.control.date(this.model);var l=this;t(this.$el).on("dp.change",function(){l.isChanging||(l.isChanging=!0,l.model=l.control.date(),l.$nextTick(function(){l.isChanging=!1,l.onChange&&l.onChange(l.model)}))})},watch:{model:function(t,e){this.isChanging||(this.isChanging=!0,this.control.date(t),this.isChanging=!1,this.onChange&&this.onChange(t))}},methods:{getLanguageCode:function(t){if(null===t||0===t.length)return"en";if(t.length<=2)return t;switch(t){case"zh-CN":case"zh-TW":case"ar-MA":case"ar-SA":case"ar-TN":case"de-AT":case"en-AU":case"en-CA":case"en-GB":case"fr-CA":case"hy-AM":case"ms-MY":case"pt-BR":case"sr-CYRL":case"tl-PH":case"tzm-LATN":case"tzm":return t.toLowerCase();default:return t.substr(0,2)}}}}}])}).call(e,a("7t+N"))},sqMn:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("FXUk"),r=a("9gFK"),n=a("VU/8")(s.a,r.a,!1,null,null,null);n.options.__file="pages/reports/riders-settlement/index.vue",e.default=n.exports},zTfd:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flx-alc-jsb page-extras"},[a("div",{staticClass:"drop-down page-drop"},[a("button",{staticClass:"btn-text ",attrs:{type:"button"}},[t._v("\n          Showing "),a("span",[t._v(" "+t._s(t.showing)+" ")]),t._v(" of "),a("span",[t._v(" "+t._s(void 0!=this.headers.Count?this.headers.Count:0)+" ")])])]),a("div",{staticClass:"d-flx-alc"},[t.date&&"object"==typeof t.date?a("div",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.date[0])+" - "+t._s(t.date[1]))]):t._e(),a("div",{directives:[{name:"show",rawName:"v-show",value:"string"==typeof t.date,expression:"typeof date == 'string'"}],staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.date)+" ")]),a("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.previous}},[a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#arrow-right"}})])]),a("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.next}},[a("svg",[a("use",{attrs:{href:"/uploads/icons.svg#arrow-left"}})])])])])};s._withStripped=!0;var r={render:s,staticRenderFns:[]};e.a=r}});