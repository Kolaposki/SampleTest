webpackJsonp([18],{"+OcL":function(t,a,e){"use strict";(function(t){var s=e("hYtS");a.a={components:{Pagination:s.a},layout:"main",computed:{},data:function(){return{loading:!0,complaintStatus:"",feedbackbody:"",date:"",id:0,filteredList:{},list:{},search:"",viewDetail:{},headers:{Next:"",Previous:"",Count:0,total:0,pagenum:1},formData:{startdate:"",enddate:""}}},mounted:function(){this.loading=!0,this.displayComplaints()},methods:{displayComplaints:function(){var t=this;""!==this.date&&null!=this.date[0]?(this.formData.startdate=this.$moment(this.date[0]).format("YYYY-MM-DD"),this.formData.enddate=this.$moment(this.date[1]).format("YYYY-MM-DD")):(this.formData.startdate="",this.formData.enddate=""),this.$store.dispatch("complaints/getComplaints",this.formData).then(function(a){a.status&&(t.filteredList=a.data,t.list=a.data,t.setHeaders(a.data,a.headers),t.loading=!1)}).catch(function(a){t.loading=!1,t.$toast.error("An error occurred "+a)})},nextData:function(){if(""!==this.headers.Next){var t=+this.formData.page+1;this.formData.page=t,this.displayComplaints()}},previousData:function(){if(""!==this.headers.Previous){var t=+this.formData.page-1;t<0?this.formData.page=1:(this.formData.page=t,this.displayComplaints())}},getID:function(t){this.id=t,UIkit.modal("#resolve-complaint").toggle(),this.displayComplaints()},viewComplaint:function(t){var a=this;this.id=t,this.$store.dispatch("complaints/getComplaints",this.formData).then(function(t){t.status&&(a.viewDetail=t.data.filter(function(t){return t.id==a.id}))}).catch(function(t){a.$toast.error("An error occurred "+t)}),UIkit.modal("#view-resolved-complaint").toggle()},updateComplaint:function(){var a=this;t("#updateBtn").attr("disabled",!0).html("Updating..please wait");var e={id:this.id,status:"RESOLVED",feedbackbody:this.feedbackbody};this.$store.dispatch("complaints/updateComplaint",e).then(function(e){e.status?(t("#updateBtn").attr("disabled",!1).html("Update"),UIkit.modal("#resolve-complaint").toggle("hide"),a.feedbackbody="",a.displayComplaints()):(t("#updateBtn").attr("disabled",!1).html("Update"),a.$toast.error("An error occurred "+e.message))}).catch(function(t){a.$toast.error("An error occurred "+t)})},closeModal:function(){UIkit.modal("#resolve-complaint").toggle("hide")},searchComplaints:function(){var t=this;this.filteredList=this.list.filter(function(a){return void 0!=a.customername&&a.customername.toLowerCase().includes(t.search.toLowerCase())?a.customername.toLowerCase().includes(t.search.toLowerCase()):void 0!=a.category&&a.category.toLowerCase().includes(t.search.toLowerCase())?a.category.toLowerCase().includes(t.search.toLowerCase()):void 0})},filterComplaints:function(){var t=this;this.filteredList=this.list.filter(function(a){return""==t.complaintStatus?t.list:null!=a.status&&a.status.toLowerCase().includes(t.complaintStatus.toLowerCase())?a.status.toLowerCase().includes(t.complaintStatus.toLowerCase()):void 0})}},beforeRouteEnter:function(t,a,e){var s=JSON.parse(localStorage.getItem("user"));void 0==s.role||s.rolepermission&&s.rolepermission[0].complaints.viewcomplaints?e():(alert("You have not been permitted to view this page"),e({path:"/dashboard"}))}}}).call(a,e("7t+N"))},"1yjw":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("+OcL"),i=e("rAne"),o=!1;var n=function(t){o||e("Ajmq")},l=e("VU/8")(s.a,i.a,!1,n,"data-v-593a7824",null);l.options.__file="pages/complaints/index.vue",a.default=l.exports},Ajmq:function(t,a,e){var s=e("P9Co");"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e("rjj0")("22d1da0e",s,!1,{sourceMap:!1})},M2Sb:function(t,a,e){"use strict";a.a={layout:"main",props:["headers","value","date"],methods:{previous:function(){if(""!==this.headers.Prev){var t=+this.value-1;t<0?t=1:(this.$emit("input",t),this.$emit("go"))}},next:function(){if(""!==this.headers.Next){var t=+this.value+1;this.$emit("input",t),this.$emit("go")}}}}},P9Co:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"hr[data-v-593a7824]{margin-top:8px;margin-bottom:6px}.modal-content[data-v-593a7824]{margin-top:16px}.modal-content p[data-v-593a7824]{font-size:16px;margin-top:8px}.modal-content h4[data-v-593a7824]{font-size:16px}.btn--primary[data-v-593a7824]{min-width:0}.btn[data-v-593a7824]{padding:8px 16px}.btn.btn-no-fill[data-v-593a7824]{min-width:60px}.uk-h3[data-v-593a7824],h3[data-v-593a7824]{height:50px}form[data-v-593a7824]{margin-top:20px}td .column-name[data-v-593a7824]{text-align:center}tr th[data-v-593a7824]{padding:15px}",""])},hYtS:function(t,a,e){"use strict";var s=e("M2Sb"),i=e("zTfd"),o=e("VU/8")(s.a,i.a,!1,null,null,null);o.options.__file="components/Pagination.vue",a.a=o.exports},rAne:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("overlay-scrollbars",{staticClass:"main-content-wrap"},[e("div",{staticClass:"d-flx-alc-jsb page-extras"},[e("p",{staticClass:"fw-medium font-16"}),e("div",{staticClass:"search-filter d-flx-alc-jfe"},[e("label",{staticClass:"search-w-icon"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{type:"text",placeholder:"Search"},domProps:{value:t.search},on:{keyup:t.searchComplaints,input:function(a){a.target.composing||(t.search=a.target.value)}}}),e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#search"}})])]),e("div",{staticClass:"drop-down filter-drop"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.complaintStatus,expression:"complaintStatus"}],staticClass:"filter-btn box-deco-smallr",on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.complaintStatus=a.target.multiple?e:e[0]},t.filterComplaints]}},[e("option",{attrs:{value:""}},[t._v("All Status")]),e("option",{attrs:{value:"pending"}},[t._v("Pending")]),e("option",{attrs:{value:"resolved"}},[t._v("Resolved")])])]),e("div",{staticClass:"drop-down page-drop"},[e("date-picker",{attrs:{range:"",placeholder:"Date Range",type:"datetime",timeTitleFormat:"YYYY-MM-DD hh:mm a",format:"YYYY-MM-DD hh:mm a","value-type":"format","show-second":!1,"show-time-panel":t.showTimeRangePanel},on:{change:t.displayComplaints,close:t.handleRangeClose},scopedSlots:t._u([{key:"footer",fn:function(){return[e("button",{staticClass:"mx-btn mx-btn-text",on:{click:t.toggleTimeRangePanel}},[t._v("\n            "+t._s(t.showTimeRangePanel?"select date":"select time")+"\n          ")])]},proxy:!0}]),model:{value:t.date,callback:function(a){t.date=a},expression:"date"}})],1)])]),e("div",{staticClass:"parent-component"},[e("div",{attrs:{id:"resolve-complaint","uk-modal":"",container:"#parent-component"}},[e("div",{staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[e("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""}}),e("div",{staticClass:"modal-header"},[e("h2",[t._v("Are you sure you want to update this complaint as resolved?")])]),e("form",{on:{submit:function(a){return a.preventDefault(),t.updateComplaint.apply(null,arguments)}}},[e("div",{staticClass:"flex-width-1-1 less-gp"},[e("label",{staticClass:"form-input"},[e("div",{staticClass:"form-input__input"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.feedbackbody,expression:"feedbackbody"}],attrs:{type:"text",placeholder:"How was the complaint resolved?",required:""},domProps:{value:t.feedbackbody},on:{input:function(a){a.target.composing||(t.feedbackbody=a.target.value)}}})])])]),e("div",{},[e("div",{staticClass:"d-flx-alc-jc"},[e("button",{staticClass:"btn btn-no-fill",on:{click:t.closeModal}},[t._v("\n                  Cancel\n                ")]),e("button",{staticClass:"btn btn--primary ml-2",attrs:{id:"updateBtn",type:"submit"}},[t._v("\n                  Update\n                ")])])])])])])]),e("div",{staticClass:"parent-component"},[e("div",{attrs:{id:"view-resolved-complaint","uk-modal":"",container:"#parent-component"}},t._l(t.viewDetail,function(a,s){return e("div",{key:s,staticClass:"uk-modal-dialog uk-margin-auto-vertical modal"},[e("button",{staticClass:"uk-modal-close-default",attrs:{type:"button","uk-close":""}}),e("div",{staticClass:"modal-header"},[e("h2",[t._v("Complaint "),e("span",{class:"status "+a.status.toLowerCase()},[t._v(t._s(a.status))])]),"PENDING"==a.status?e("p",{staticClass:"mt-1"},[t._v(t._s(a.created_at.substring(0,16)))]):t._e(),e("hr")]),e("div",{staticClass:"modal-content"},[null!=a.vendor?e("div",[e("p",[t._v("Vendor")]),e("h4",[t._v(t._s(a.vendorname))]),e("hr")]):t._e(),null!=a.ordercode?e("div",[e("p",[t._v("Order ID")]),e("h4",[t._v(t._s(a.ordercode))]),e("hr")]):t._e(),e("p",[t._v("Customer")]),e("h4",[t._v(t._s(a.customername))]),e("hr"),e("p",[t._v("Issue")]),e("h4",[t._v(t._s(a.feedback))]),null!=a.feedbackbody?e("div",[e("hr"),e("p",[t._v("Reason")]),e("h4",[t._v(t._s(a.feedbackbody))])]):t._e()])])}),0)]),e("div",{staticClass:"inner-main-wrapper"},[e("div",{staticClass:"d-flx-alc-jsb page-extras"},[e("div",{staticClass:"drop-down page-drop"},[e("button",{staticClass:"btn-text ",attrs:{type:"button"}},[t._v("\n        Showing "),e("span",[t._v(" "+t._s(t.showing)+" ")]),t._v(" of "),e("span",[t._v(" "+t._s(void 0!=this.headers.Count?this.headers.Count:0)+" ")])])]),e("div",{staticClass:"d-flx-alc"},[e("div",[t._v(t._s(t.date[0])+" - "+t._s(t.date[1]))]),e("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.previousData}},[e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#arrow-right"}})])]),e("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.nextData}},[e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#arrow-left"}})])])])]),e("overlay-scrollbars",{staticClass:"table-wrapper"},[e("figcaption",{staticClass:"sr"},[t._v("\n        Complaints Table\n      ")]),e("table",{staticClass:"table-content"},[e("thead",{},[e("tr",[e("th",{staticClass:"large-space column-name"},[t._v("Customer")]),e("th",{staticClass:"large-space column-name"},[t._v("Category")]),e("th",{staticClass:"large-space column-name"},[t._v("Issue")]),e("th",{staticClass:"medium-space"},[t._v("Date of Complaint")]),e("th",{staticClass:"large-space"},[t._v("Status")]),e("th",{staticClass:"small-space  column-name"},[t._v("Action")])])]),e("tbody",{staticClass:"tablebody"},[t.loading?e("tr",[e("td",{attrs:{colspan:"8"}},[t._v("Loading...please wait")])]):t._e(),!t.loading&&t.filteredList.length<1?e("tr",[e("td",{attrs:{colspan:"8"}},[t._v("No complaints at the moment")])]):t._e(),t._l(t.filteredList,function(a,s){return e("tr",{key:s},[e("td",{staticClass:"column-name"},[t._v(t._s(a.customername?a.customername:"N/A"))]),e("td",{staticClass:"column-name"},[t._v(t._s(a.category?a.category:"N/A"))]),e("td",{staticClass:"column-name"},[t._v(t._s(a.feedback?a.feedback:"N/A"))]),e("td",[t._v(t._s(a.created_at.substring(0,16)))]),"PENDING"==a.status?e("td",[e("span",{staticClass:"status pending"},[t._v(t._s(a.status))])]):t._e(),"RESOLVED"==a.status?e("td",[e("span",{staticClass:"status resolved"},[t._v(t._s(a.status))])]):t._e(),"PENDING"==a.status?e("td",[e("ul",{staticStyle:{"list-style":"none",padding:"0"}},[e("li",{staticStyle:{float:"left"}},[e("button",{staticClass:"btn btn--tertiary",staticStyle:{"margin-right":"10px"},on:{click:function(e){return t.viewComplaint(a.id)}}},[t._v("View")])]),e("li",{staticStyle:{float:"left"}},[e("button",{staticClass:"btn btn--primary",on:{click:function(e){return t.getID(a.id)}}},[t._v("Resolve")])])])]):t._e(),"RESOLVED"==a.status?e("td",{staticClass:"column-name"},[e("button",{staticClass:"btn btn--tertiary",on:{click:function(e){return t.viewComplaint(a.id)}}},[t._v("View")])]):t._e()])})],2)])])],1)])};s._withStripped=!0;var i={render:s,staticRenderFns:[]};a.a=i},zTfd:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"d-flx-alc-jsb page-extras"},[e("div",{staticClass:"drop-down page-drop"},[e("button",{staticClass:"btn-text ",attrs:{type:"button"}},[t._v("\n          Showing "),e("span",[t._v(" "+t._s(t.showing)+" ")]),t._v(" of "),e("span",[t._v(" "+t._s(void 0!=this.headers.Count?this.headers.Count:0)+" ")])])]),e("div",{staticClass:"d-flx-alc"},[t.date&&"object"==typeof t.date?e("div",{staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.date[0])+" - "+t._s(t.date[1]))]):t._e(),e("div",{directives:[{name:"show",rawName:"v-show",value:"string"==typeof t.date,expression:"typeof date == 'string'"}],staticStyle:{"font-weight":"bold"}},[t._v(t._s(t.date)+" ")]),e("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.previous}},[e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#arrow-right"}})])]),e("button",{staticClass:"btn btn-icon smallsvg",on:{click:t.next}},[e("svg",[e("use",{attrs:{href:"/uploads/icons.svg#arrow-left"}})])])])])};s._withStripped=!0;var i={render:s,staticRenderFns:[]};a.a=i}});