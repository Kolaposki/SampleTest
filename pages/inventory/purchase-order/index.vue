<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
      </div>
    </div>

    <div id="parent-component">

      <div id="view-purchase-order" uk-modal data-uk-modal="{target:'#view-purchase-order',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" @click="closeViewPo" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Purchase Order : {{orderDetails.purchaseordercode}}</h2>
            <!--            <p>View purchase order information</p>-->
          </div>
          <overlay-scrollbars class="modal-body" >

            <table class="purchase_ordertable">
              <tr>
                <th style="text-align: right">To - Vendor Name :</th>
                <td>{{ orderDetails.vendorname }}</td>


                <!--                <th>Date:</th>-->
                <!--                <td>{{ orderDetails.branchname }}</td>-->
              </tr>
              <tr>
                <th style="text-align: right">Address :</th>
                <td>{{ orderDetails.vendoraddress }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Code :</th>
                <td>{{ orderDetails.purchaseordercode }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Email :</th>
                <td>{{ orderDetails.vendoremail }}</td>
              </tr>
              <!--              <tr>-->
              <!--                <th>Order Date :</th>-->
              <!--                <td>{{ orderDetails.order }}</td>-->
              <!--                <th>TERMS</th>-->
              <!--                <td>{{ orderDetails.paymentterms }}</td>-->
              <!--              </tr>-->
              <tr>
                <th style="text-align: right">Order Date :</th>
                <td>{{ $moment(orderDetails.orderdate).format('Do MMM, YYYY') }}</td>
                <th style="text-align: right">Due Date :</th>
                <td>{{ $moment(orderDetails.duedate).format('Do MMM, YYYY') }}</td>
              </tr>
            </table>

            <div class="box-deco-bg card-wtable">
              <div class="d-flx-alc-jsb card-wtable__title">
                <h3>Purchase Order Items</h3>
              </div>
              <figure class="table-wrapper no-deco">
                <table>
                  <thead>
                  <tr>
                    <th>Code</th>
                    <th class="larger-space">Name</th>
                    <th style="text-align: right">Qty</th>
                    <th style="text-align: right">Unit price</th>

                    <th style="text-align: right">Discount</th>
                    <th style="text-align: right">Total price</th>
                  </tr>
                  </thead>
                  <tbody class="tablebody">
                  <tr v-for="order in orderDetails.purchaseorderitems" :key="order.id">
                    <td>{{ order.vendorproductcode == 'null' ? '' : order.vendorproductcode }}</td>
                    <td>{{ order.productname }}</td>
                    <td style="text-align: right">{{ order.quantity }}</td>
                    <td style="text-align: right">₦{{ formatPrice(order.unitprice) }}</td>

                    <td style="text-align: right">₦{{ formatPrice(order.discountprice) }}</td>
                    <td style="text-align: right">₦{{ formatPrice(order.totalprice) }}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td style="text-align: right; font-size: 1.7rem; color: #a3abb7; font-weight: 600">Total :</td>
                    <td style="text-align: right"> ₦{{formatPrice(getTotalAmount(orderDetails.purchaseorderitems))}}</td>
                  </tr>
                  </tbody>
                </table>
              </figure>

            </div>
          </overlay-scrollbars>
          <div class="search-filter d-flx-alc-jfe">
            <button @click="sendToVendor" class="btn btn--primary" type="button">
              Send to Vendor
            </button>
          </div>
        </div>
      </div>

      <div id="view-receive-notes" uk-modal data-uk-modal="{target:'#view-receive-notes',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" @click="closeViewPo" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Goods Receive Notes for Purchase Order : {{orderDetails.purchaseordercode}}</h2>
            <!--            <p>View purchase order information</p>-->
          </div>
          <overlay-scrollbars class="modal-body">

            <table class="purchase_ordertable">
              <tr>
                <th style="text-align: right">To - Vendor Name :</th>
                <td>{{ orderDetails.vendorname }}</td>


                <!--                <th>Date:</th>-->
                <!--                <td>{{ orderDetails.branchname }}</td>-->
              </tr>
              <tr>
                <th style="text-align: right">Address :</th>
                <td>{{ orderDetails.vendoraddress }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Code :</th>
                <td>{{ orderDetails.purchaseordercode }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Email :</th>
                <td>{{ orderDetails.vendoremail }}</td>
              </tr>
              <!--              <tr>-->
              <!--                <th>Order Date :</th>-->
              <!--                <td>{{ orderDetails.order }}</td>-->
              <!--                <th>TERMS</th>-->
              <!--                <td>{{ orderDetails.paymentterms }}</td>-->
              <!--              </tr>-->
              <tr>
                <th style="text-align: right">Order Date :</th>
                <td>{{ $moment(orderDetails.orderdate).format('Do MMM, YYYY') }}</td>
                <th style="text-align: right" >Due Date :</th>
                <td>{{ $moment(orderDetails.duedate).format('Do MMM, YYYY') }}</td>
              </tr>
            </table>

            <div class="box-deco-bg card-wtable">
              <div class="d-flx-alc-jsb card-wtable__title">
                <h3>Goods Receive Notes</h3>
              </div>
              <figure class="table-wrapper no-deco">
                <table>
                  <thead>
                  <tr>
                    <th>S/N</th>
                    <!-- <th class="larger-space">description</th> -->
                    <th style="text-align: right">Total Qty</th>
                    <th style="text-align: right">Total Amount</th>
                    <th style="text-align: right">Receive Date</th>
                    <th></th>

                    <!--                    <th style="text-align: right">discount</th>-->
                    <!--                    <th style="text-align: right">total price</th>-->
                  </tr>
                  </thead>
                  <tbody class="tablebody">
                  <tr v-for="(receive_note, index) in orderDetails.receiveorderitems" :key="index">
                    <td>{{ index+1}}</td>
                    <!-- <td>{{ receive_note.description }}</td> -->
                    <td style="text-align: right">{{formNumber(getTotalQty(receive_note.receivenoteitems))}}</td>
                    <td style="text-align: right"> ₦{{formatPrice(getTotalAmount(receive_note.receivenoteitems))}}</td>
                    <td style="text-align: right">{{ $moment(receive_note.orderdate).format('Do MMM, YYYY')}}</td>
                    <td >
                      <button class="btn btn-icon" @click="viewReceiveNote(receive_note)" title="View Goods Receive Note" type="button">
                        <svg>
                          <use href="/uploads/icons.svg#view"></use>
                        </svg>
                      </button>
                    </td>
                    <!--                    <td style="text-align: right">₦{{ formNumber(order.discountprice) }}</td>-->
                    <!--                    <td style="text-align: right">₦{{ formNumber(order.totalprice) }}</td>-->
                  </tr>
                  <!--                  <tr>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td style="text-align: right; font-size: 1.7rem; color: #a3abb7; font-weight: 600">Total :</td>-->
                  <!--                    <td style="text-align: right"> ₦{{formNumber(getTotal(orderDetails.purchaseorderitems))}}</td>-->
                  <!--                  </tr>-->
                  </tbody>
                </table>
              </figure>

            </div>
          </overlay-scrollbars>
        </div>
      </div>

      <div id="view-return-notes" uk-modal data-uk-modal="{target:'#view-return-notes',bgclose:false}" container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" @click="closeViewPo" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Goods Return Notes for Purchase Order : {{orderDetails.purchaseordercode}}</h2>
            <!--            <p>View purchase order information</p>-->
          </div>
          <overlay-scrollbars class="modal-body" uk-overflow-auto>

            <table class="purchase_ordertable">
              <tr>
                <th style="text-align: right">To - Vendor Name :</th>
                <td>{{ orderDetails.vendorname }}</td>


                <!--                <th>Date:</th>-->
                <!--                <td>{{ orderDetails.branchname }}</td>-->
              </tr>
              <tr>
                <th style="text-align: right">Address :</th>
                <td>{{ orderDetails.vendoraddress }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Code :</th>
                <td>{{ orderDetails.purchaseordercode }}</td>
              </tr>
              <tr>
                <th style="text-align: right">Email :</th>
                <td>{{ orderDetails.vendoremail }}</td>
              </tr>
              <!--              <tr>-->
              <!--                <th>Order Date :</th>-->
              <!--                <td>{{ orderDetails.order }}</td>-->
              <!--                <th>TERMS</th>-->
              <!--                <td>{{ orderDetails.paymentterms }}</td>-->
              <!--              </tr>-->
              <tr>
                <th style="text-align: right">Order Date :</th>
                <td>{{ $moment(orderDetails.orderdate).format('Do MMM, YYYY') }}</td>
                <th style="text-align: right">Due Date :</th>
                <td>{{ $moment(orderDetails.duedate).format('Do MMM, YYYY') }}</td>
              </tr>
            </table>

            <div class="box-deco-bg card-wtable">
              <div class="d-flx-alc-jsb card-wtable__title">
                <h3>Goods Return Notes</h3>
              </div>
              <figure class="table-wrapper no-deco">
                <table>
                  <thead>
                  <tr>
                    <th>S/N</th>
                    <!-- <th class="larger-space">description</th> -->
                    <th style="text-align: right">Total Qty</th>
                    <th style="text-align: right">Total Amount</th>
                    <th style="text-align: right">Return Date</th>
                    <th></th>

                    <!--                    <th style="text-align: right">discount</th>-->
                    <!--                    <th style="text-align: right">total price</th>-->
                  </tr>
                  </thead>
                  <tbody class="tablebody">
                  <tr v-for="(return_note, index) in orderDetails.goodsreturnorderitems" :key="index">
                    <td>{{ index+1}}</td>
                    <!-- <td>{{ return_note.description }}</td> -->
                    <td style="text-align: right">{{formNumber(getTotalQty(return_note.goodsreturnnoteitems))}}</td>
                    <td style="text-align: right"> ₦{{formatPrice(getTotalAmount(return_note.goodsreturnnoteitems))}}</td>
                    <td style="text-align: right">{{ $moment(return_note.orderdate).format('Do MMM, YYYY')}}</td>
                    <td >
                      <button class="btn btn-icon" @click="viewGoodsReturn(return_note)" title="View Goods Return Note" type="button">
                        <svg>
                          <use href="/uploads/icons.svg#view"></use>
                        </svg>
                      </button>
                    </td>
                    <!--                    <td style="text-align: right">₦{{ formNumber(order.discountprice) }}</td>-->
                    <!--                    <td style="text-align: right">₦{{ formNumber(order.totalprice) }}</td>-->
                  </tr>
                  <!--                  <tr>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td></td>-->
                  <!--                    <td style="text-align: right; font-size: 1.7rem; color: #a3abb7; font-weight: 600">Total :</td>-->
                  <!--                    <td style="text-align: right"> ₦{{formNumber(getTotal(orderDetails.purchaseorderitems))}}</td>-->
                  <!--                  </tr>-->
                  </tbody>
                </table>
              </figure>

            </div>
          </overlay-scrollbars>
        </div>
      </div>

    </div>

    <div  style="display: none;  padding:25px;" id="purchase-order-download"> 
    <!-- <div  style="  padding:25px;" id="purchase-order-download">  -->
    <!-- <div class="header-wrapper__site-brand" style="padding-left: 0 !important">
      <nuxt-link class="logo-holder" v-if="this.user.businesslogo === '' || this.user.businesslogo === null" to="/dashboard">
        <img src="/uploads/ntisa_green_black.png" alt="NTISA logo">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Merchant</span>
      </nuxt-link>
       <nuxt-link class="logo-holder" v-if="this.user.businesslogo !== '' || this.user.businesslogo !== null" to="/dashboard">
        <img :src="this.user.businesslogo" alt="NTISA logo">
       </nuxt-link>
      <div class="d-flx-alc hide-mediumup">
        <button class="toggle-mobile-nav" aria-label="Toggle Navigation" data-nav-toggler id="menu-btn">
          <span class="slats"></span>
        </button>
      </div>
    </div> -->
    <div  class="modal-header">
            <h2 style="font-size: 1.4rem">Purchase Order : {{orderDetails.purchaseordercode}}</h2>
            <!--            <p>View purchase order information</p>-->
    </div>
    <div  >

      <table class="purchase_ordertable" style="width: 570px !important;">
        <tr>
          <th style="text-align: right">To - Vendor Name :</th>
          <td>{{ orderDetails.vendorname }}</td>


          <!--                <th>Date:</th>-->
          <!--                <td>{{ orderDetails.branchname }}</td>-->
        </tr>
        <tr>
          <th style="text-align: right">Address :</th>
          <td>{{ orderDetails.vendoraddress }}</td>
        </tr>
        <tr>
          <th style="text-align: right">Code :</th>
          <td>{{ orderDetails.purchaseordercode }}</td>
        </tr>
        <tr>
          <th style="text-align: right">Email :</th>
          <td>{{ orderDetails.vendoremail }}</td>
        </tr>
        <!--              <tr>-->
        <!--                <th>Order Date :</th>-->
        <!--                <td>{{ orderDetails.order }}</td>-->
        <!--                <th>TERMS</th>-->
        <!--                <td>{{ orderDetails.paymentterms }}</td>-->
        <!--              </tr>-->
        <tr>
          <th style="text-align: right">Order Date :</th>
          <td>{{ $moment(orderDetails.orderdate).format('Do MMM, YYYY') }}</td>
          <th style="text-align: right">Due Date :</th>
          <td>{{ $moment(orderDetails.duedate).format('Do MMM, YYYY') }}</td>
        </tr>
      </table>

      <div class="box-deco-bg card-wtable">
        <div class="d-flx-alc-jsb card-wtable__title">
          <h3 style="font-size: 1.4rem">Purchase Order Items</h3>
        </div>
        <figure class="table-wrapper no-deco">
          <table style="width: 560px !important;" >
            <thead>
            <tr>
              <th>Code</th>
              <th >Name</th>
              <th style="text-align: right">Qty</th>
              <th style="text-align: right">Unit price</th>

              <th style="text-align: right">Discount</th>
              <th style="text-align: right">Total price</th>
            </tr>
            </thead>
            <tbody class="tablebody">
            <tr v-for="order in orderDetails.purchaseorderitems" :key="order.id">
              <td>{{ order.vendorproductcode == 'null' ? '' : order.vendorproductcode }}</td>
              <td>{{ order.productname }}</td>
              <td style="text-align: right">{{ order.quantity }}</td>
              <td style="text-align: right"><span><b style="position: relative;">N</b><b style="border-top: 6px double black;position: relative;right: 5px;top: 11px;">&nbsp;&nbsp;</b></span>{{ formatPrice(order.unitprice) }}</td>

              <td style="text-align: right"><span><b style="position: relative;">N</b><b style="border-top: 6px double black;position: relative;right: 5px;top: 11px;">&nbsp;&nbsp;</b></span>{{ formatPrice(order.discountprice) }}</td>
              <td style="text-align: right"><span><b style="position: relative;">N</b><b style="border-top: 6px double black;position: relative;right: 5px;top: 11px;">&nbsp;&nbsp;</b></span>{{ formatPrice(order.totalprice) }}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="text-align: right; font-size: 1.2rem !important; color: #a3abb7; font-weight: 600">Total :</td>
              <td style="text-align: right"> <span><span style="position: relative;">N</span><span style="border-top: 6px double black;position: relative;right: 5px;top: 11px;">&nbsp;&nbsp;</span></span>{{formatPrice(getTotalAmount(orderDetails.purchaseorderitems))}}</td>
            </tr>
            </tbody>
          </table>
        </figure>

      </div>
    </div>
    </div>

    <div class="inner-main-wrapper">
      <ul class="card-list none flex-width-1-3 less-gp">
        <li class="card-item box-deco-bg">
          <nuxt-link to="/inventory">
            <div class="card-item__header">
              <h3>
                Inventory
              </h3>
              <svg>
                <use href="/uploads/icons.svg#toq-file"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">₦{{formatPrice(getTotalPrice)}}</p>
            </div>
          </nuxt-link>
        </li>
        <li class="card-item box-deco-bg">
          <nuxt-link to="/inventory/vendor">
            <div class="card-item__header">
              <h3>
                Vendors
              </h3>
              <svg>
                <use href="/uploads/icons.svg#toq-file"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">{{ lVendors.length }}</p>
            </div>
          </nuxt-link>
        </li>
        <li class="card-item box-deco-bg" style="background-color: forestgreen">
          <nuxt-link class="active" to="/inventory/purchase-order">
            <div class="card-item__header">
              <h3>
                Purchase Orders
              </h3>
              <svg>
                <use href="/uploads/icons.svg#money-bag"></use>
              </svg>
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">{{ purchaseOrders.length }}</p>
            </div>
          </nuxt-link>
        </li>
      </ul>

      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">PURCHASE ORDERS</h3>
        <div class="search-filter d-flx-alc-jfe">
          <button @click="goodsReturn" class="btn btn--primary" type="button">
            + Add Goods Return Notes
          </button>
          <button @click="receiveNote" class="btn btn--primary" type="button">
            + Add Goods Recieve Notes
          </button>
          <button @click="addPurchaseOrder" class="btn btn--primary" type="button">
            + Add new PO
          </button>
        </div>
      </div>

      <overlay-scrollbars class="table-wrapper no-deco">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <th class="">Vendor Name</th>
            <th class="">PO Code</th>
            <th class="">Due date</th>
            <th class="">Branch</th>
            <th class="">Action</th>
          </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading"><td colspan="6">Loading...please wait</td></tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="6">No created purchase order</td>
            </tr>
            <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" :key="ix">
              <td style="color: #353190;">
                {{ row.vendorname }}
              </td>
              <td>{{ row.purchaseordercode }}</td>
              <td>{{ $moment(row.duedate).format('Do MMM, YYYY')}}</td>
              <td>{{ row.branchname }}</td>
              <div class="drop-down org-drop drop-set">
                <button class="btn btn-icon drop-set"  type="button" @click.stop="toggleDropdown($event)">
                  <svg class="drop-set">
                    <use xlink:href="/uploads/icons.svg#more"></use>
                  </svg>
                </button>
                <div class="drop-wrapper" data-drop-down>
                  <ul class="drop-lists">
                    <li class="drop-list-item">
                      <button class="btn btn-text"  @click="viewPurchaseOrder(row)" title="View PO" type="button">
                        View Purchase Order
                      </button>
                    </li>
                    <li class="drop-list-item">
                      <button class="btn btn-text" @click="viewReceiveNotes(row)" title="Receive note" type="button">
                        Goods Receive Notes
                      </button>
                    </li>
                    <li class="drop-list-item">
                      <button @click="viewReturnNotes(row)" title="Goods Return note" type="button" class="btn btn-text" >
                        Goods Return Notes
                      </button>
                    </li>
                    <li class="drop-list-item">
                      <button class="btn btn-text" @click="editPurchaseOrder(row)" title="Edit" type="button">
                        Edit Purchase Order
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
<!--              <td class="d-flx-alc">-->
<!--                <button class="btn btn-icon" @click="viewPurchaseOrder(row)" title="View PO" type="button">-->
<!--                  <svg>-->
<!--                    <use href="/uploads/icons.svg#view"></use>-->
<!--                  </svg>-->
<!--                </button>-->
<!--                <button class="btn btn-icon" @click="receiveNote(row)" title="Receive note" type="button">-->
<!--                  <svg>-->
<!--                    <use href="/uploads/icons.svg#view"></use>-->
<!--                  </svg>-->
<!--                </button>-->
<!--                <button class="btn btn-icon" @click="goodsReturn(row)" title="Goods Return note" type="button">-->
<!--                  <svg>-->
<!--                    <use href="/uploads/icons.svg#view"></use>-->
<!--                  </svg>-->
<!--                </button>-->
<!--                <button class="btn btn-icon" @click="editPurchaseOrder(row)" title="Edit" type="button">-->
<!--                  <svg>-->
<!--                    <use href="/uploads/icons.svg#edit"></use>-->
<!--                  </svg>-->
<!--                </button>-->
<!--              </td>-->
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>


    </div>
  </overlay-scrollbars>
</template>
<script>

import {jsPDF} from 'jspdf';
// import SansSerif from '@/assets/fonts/SourceSansPro-Regular-normal.js'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import html2canvas from "html2canvas"

export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.purchaseOrders.filter(po => {
				if (po.vendorname.toLowerCase().includes(this.search.toLowerCase())) {
					return po.vendorname.toLowerCase().includes(this.search.toLowerCase());
				} else if(po.purchaseordercode.toLowerCase().includes(this.search.toLowerCase())) {
          return po.purchaseordercode.toLowerCase().includes(this.search.toLowerCase());
        }
				else {
					return po.branchname.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		},
		getTotalPrice () {
			let inv = this.inventory;
			let total = inv.map(el => el.costprice).reduce((acc, curr) => {
				acc += Number(curr)
				return acc
			}, 0);
			console.log(total)
			return total;
		},
	},
	data: () => ({
		search: '',
		loading: true,
    totalprice: '',
		inventory: [],
		formData: {
			merchID: ''
		},
		lVendors: [],
		lProducts: [],
		lPurchaseOrders: [],
		lProductFeatures: [],
		purchaseOrders: [],
    orderDetails: {},
    purchaseOrder : {}
	}),
	methods: {
    getDataUri(url, callback) {
        var image = new Image();

        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
            canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

            canvas.getContext('2d').drawImage(this, 0, 0);

            // Get raw image data
            callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

            // ... or get as Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    },
		listInventory() {
		  this.$store.dispatch('inventory/getInventory', this.formData.merchID)
				.then(res =>{
					console.log(res.data)
					if(res.data.status) {
						this.inventory = res.data.data
						this.totalprice = res.data.totalinventoryvalue
						this.loading = false
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					this.$toast.error(e)
					this.loading = false
				})
		},
		sendToVendor () {
			// const { jsPDF } = require("jspdf");
      let doc = new jsPDF('p', 'pt', 'a4', false);

      let data = {
              merchID: this.user.id,
              id: this.orderDetails.id
            }

      let vm = this;

      const SansSerif = require(`~/assets/fonts/Roboto.js`)
      
      this.getDataUri(this.user.businesslogo, function(dataUri) {
          // Do whatever you'd like with the Data URI!
          console.log(dataUri)
      });

      doc.advancedAPI(doc => {
        
        let html = document.getElementById('purchase-order-download');
        html.style.display = 'block'

        
            // doc.addFileToVFS('Roboto-Light.ttf', SansSerif.Roboto)
            // doc.addFont('Roboto-Light.ttf', 'Roboto', 'normal')
            // doc.setFont('Helvetica')
        // html2canvas(html).then(  function (canvas) {
          
                // var data_url = canvas.toDataURL();
                
        doc.html(html, {
          callback: function (doc) {
            
            // data.attach = [
            //     {
            //         path: data_url,
            //         filename: 'Purchase Order PDF.pdf'
            //     }
            // ]
            // console.log(data_url)
            // var docDefinition = {
            //         content: [{
            //             image: data_url,
            //             width: 595,
            //         }]
            //     };
            var blob = doc.output('blob');

            var formData = new FormData();
            formData.append('attach', blob);
            formData.append('merchID', vm.user.id);
            formData.append('id', vm.orderDetails.vendorID);
            html.style.display = 'none'
            vm.$store.dispatch('purchaseorders/emailVendor', formData)
            .then(res =>{
              if(res.data.status) {
                vm.$toast.success('Email Sent Successfully')
              } else {
                vm.$toast.error('An error occured')
              }
            });
            doc.save('output.pdf');
            // pdfMake.createPdf(docDefinition).download("output.pdf");
            
        }
      });
      });

      
			// doc.save('output.pdf');
		},
	  getTotalAmount (data) {
	    if(data != undefined) {
				return data.map(el => el.totalprice).reduce((total, curr) => {
					total += curr
					return total
				}, 0)
			}
		},
		getTotalQty (data) {
			if(data != undefined) {
				return data.map(el => el.quantity).reduce((total, curr) => {
					total += curr
					return total
				}, 0)
			}
		},
		receiveNote() {
			localStorage.removeItem('receiveNote')
			localStorage.removeItem('po_data')
			// this.$store.dispatch('purchaseorders/setReceiveNote', po)
			this.$router.push('/inventory/purchase-order/receive-note')
		},
		goodsReturn() {
			localStorage.removeItem('returnNote')
			localStorage.removeItem('po_data')
			// this.$store.dispatch('purchaseorders/setGoodsReturn', po)
			this.$router.push('/inventory/purchase-order/order-return')
		},
		viewReceiveNote(po) {
			
			localStorage.removeItem('receiveNote')
			localStorage.removeItem('po_data')
			console.log(po)
			this.$store.dispatch('purchaseorders/setPurchaseOrder', this.orderDetails)
			this.$store.dispatch('purchaseorders/setReceiveNote', po)
			UIkit.modal('#view-receive-notes').toggle()
			this.$router.push('/inventory/purchase-order/receive-note')
		},
		viewGoodsReturn(po) {
			
			localStorage.removeItem('returnNote')
			localStorage.removeItem('po_data')
			console.log(po)
			this.$store.dispatch('purchaseorders/setPurchaseOrder', this.orderDetails)
			this.$store.dispatch('purchaseorders/setGoodsReturn', po)
			UIkit.modal('#view-return-notes').toggle()
			this.$router.push('/inventory/purchase-order/order-return')
		},
	  editPurchaseOrder(po) {
			localStorage.removeItem('po_data')
			this.$store.dispatch('purchaseorders/setPurchaseOrder', po)
			this.$router.push('/inventory/purchase-order/edit')
		},
		viewPurchaseOrder(po) {
			$('#poName').html(po.vendorname)
			this.orderDetails = po
			console.log(po)
			UIkit.modal('#view-purchase-order').toggle()
		},

		viewReceiveNotes(po) {
			this.orderDetails = po
			UIkit.modal('#view-receive-notes').toggle()
		},
		viewReturnNotes(po) {
			this.orderDetails = po
			UIkit.modal('#view-return-notes').toggle()
		},
		closeViewPo() {
	    this.orderDetails = {}
		},
		listVendors() {
			this.$store.dispatch('vendor/listVendors', this.formData.merchID)
				.then(res =>{
					this.lVendors = res.data.data
				}).catch(e =>{
					this.$toast.error(e)
				})
		},
		listProducts() {
			this.$store.dispatch('products/listProducts', this.formData.merchID)
				.then(res =>{
					this.lProducts = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		listPurchaseOrders() {
		  this.$store.dispatch('purchaseorders/listPurchaseOrder', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.purchaseOrders = res.data.data
						this.loading = false
						return
					}
          
					this.$toast.error('An error occurred while retrieving records')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred while retrieving records')
				})
		},
		addPurchaseOrder() {
		  this.$router.push('/inventory/purchase-order/add')
		}
	},
	mounted() {
		 this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
	  this.listInventory()
		this.listVendors()
		this.listPurchaseOrders()
	}
}
</script>
<style scoped>
.table-wrapper.no-deco {
  padding-right: unset !important;  
}
.modal-body{
        max-height: 484px;
        /* max-width: 800px; */
        overflow-x: scroll !important;
  }
    /* .second_table_pdf table, .second_table_pdf th, .second_table_pdf td {
  border: 1px solid black;
  word-wrap: break-word;
  word-break: break-all;
}
  */

</style>