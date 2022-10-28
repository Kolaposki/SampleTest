<template>
<div>
    <div id="order-details" uk-modal data-uk-modal="{target:'#order-details',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
           
          <div class="modal-header d-flx-alc-jsb">
            <h2 style="font-size: 20px">Order Details</h2>
            <button class="uk-modal-close-default" type="button" uk-close @click="closeOrderDetails" style="right: 20px; padding: 16px 8px"></button>
          </div>
          <hr>
          <div class="d-flx-alc-jsb" style="margin-top: 12px">
            <p style="font-size: 16px">
              Order Status
              <span v-if="orderList.orderstatus !== 'cancel'" :class="'status ' + orderDetailsData.orderstatus.toLowerCase()">{{ orderList.orderstatus ? orderList.orderstatus.replace('_', ' ').toUpperCase() : orderList.orderstatus }}</span>
              <span v-if="orderList.orderstatus == 'cancel'" :class="'status ' + orderDetailsData.orderstatus.toLowerCase()">CANCELLED</span>
            </p>
            <button type="submit" @click="cancelOrder()" class="btn btn--danger" v-if="orderDetailsData.orderstatus !=='cancel' && orderDetailsData.orderstatus !=='completed' && ((user.rolepermission ? user.rolepermission[0].orders.cancelorder:'') || isMerchant)" >
              Cancel Order
            </button>
          </div>
           <div class="" style="margin-top: 12px" v-show="orderList.orderstatus =='cancel'">
            <hr>
              <p style="font-size: 16px">
                Reason for Order Cancellation             
              </p>
              <h2>{{orderList.reason}}</h2>            
          </div>
          <div class="" style="margin-top: 12px" v-show="orderList.orderstatus =='Rejected'">
            <hr>
              <p style="font-size: 16px">
                Reason for Order Rejection             
              </p>
              <h2>{{orderList.reason}}</h2>            
          </div>
          <hr>
          <overlay-scrollbars class="modal-body" uk-overflow-auto style="padding-top: 0">
          <div class="d-flx-alc-jsb">
            <p>Order ID</p>
            <h2 class="d-flx my-1"> <span class="review">{{ orderList.ordercode}}</span></h2>            
          </div>

          <!-- <overlay-scrollbars class="modal-body" uk-overflow-auto> -->
            <!-- <div class="d-flx-jsb">
              <div class="text-img order-modal">
                <img v-if="orderDetailsData.profilelink === '' || orderDetailsData.profilelink === null || orderDetailsData.profilelink === 'http://68.65.121.57:8080/'" class="text-img__img" src="/default_image.png" alt="">
                <img v-else-if="orderDetailsData.profilelink.includes('http://') && orderDetailsData.profilelink.includes('https://')" :src="orderDetailsData.profilelink.replace('http://68.65.121.57:8080/', '')" class="text-img__img" alt="">
                <img v-else :src="orderDetailsData.profilelink" class="text-img__img" alt="">
                <div class="text-img__content">
                  <h4 class="uppercase co-grey fw-medium font-14">
                    Customer info
                  </h4>
                  <p class="fw-medium font-16 co-rich-black">{{ orderDetailsData.customername }}</p>
                  <p class="font-16 co-rich-black">{{ orderDetailsData.customerphone }}</p>
                </div>
              </div>
              <div>
                <h4 class="uppercase co-grey fw-medium font-14">
                  Delivery address
                </h4>
                <p class="width-80-pc co-rich-black">
                  {{ orderDetailsData.deliveryaddress }}
                </p>
              </div>
            </div> -->
            <!-- <div class="d-flx-alc-jsb">
              <p class="co-lgray">Customer</p>
              <h2 style="margin-top: 10px">{{orderDetailsData.customername}}</h2>
            </div> -->
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Payment Status</p>
              <h2 style="margin-top: 10px; color: #47a147">{{orderList.paymentstatus}}</h2>
            </div>           
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Payment Method</p>
              <h2 style="margin-top: 10px">{{orderList.paymentmethod}}</h2>
            </div>  
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Delivery Method</p>
              <h2 style="margin-top: 10px">{{orderList.ordermethod}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Order Category</p>
              <h2 style="margin-top: 10px">{{orderList.ordercategory}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Item Name</p>
              <h2 style="margin-top: 10px">{{orderList.itemname}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Item Quantity</p>
              <h2 style="margin-top: 10px">{{orderList.itemquantity}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb" v-show="orderList.orderstatus == 'scheduled'">
              <p class="co-lgray">Schedule time</p>
              <h2 style="margin-top: 10px">{{ $moment(orderList.scheduletime).format('MMM Do YYYY | hh:mma')}}</h2>
            </div>
            <hr>
            <h1>Pick-Up Information</h1>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Name</p>
              <h2>{{orderList.sendername}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Phone Number</p>
              <h2>{{orderList.senderphone}}</h2>
            </div>
            <hr>
            <div>
              <p class="co-lgray">Pick-Up Address</p>
              <h2>{{orderList.pickupaddress}}</h2>
            </div>
            <hr>
            <div class="d-flx-alc-jsb">
              <p class="co-lgray">Pick-up Code</p>
              <h2 class="delivery-pin" title="click to copy pick-up code" @click.prevent="copyLink(orderList.pickuppin)" >{{(orderList.pickuppin) ? orderList.pickuppin : 'N/A'}}</h2>
            </div>
            <div v-for="(order, index) in orderList.delivery_location" v-bind:key="index">
              <hr>
              <h1 v-if="orderList.delivery_location.length == 1">Delivery Information</h1>
              <h1 v-if="orderList.delivery_location.length > 1">Delivery Information ({{index + 1}})</h1>
              <div class="d-flx-alc-jsb">
                <p class="co-lgray">Name</p>
                <h2>{{order.receivername}}</h2>
              </div>
              <hr>
              <div class="d-flx-alc-jsb">
                <p class="co-lgray">Phone Number</p>
                <h2>{{order.receiverphonenumber}}</h2>
              </div>              
              <hr>
              <div>
                <p class="co-lgray">Delivery Address</p>
                <h2>{{order.address}}</h2>
              </div>
              <div>
                <p class="co-lgray">Delivery Instruction</p>
                <h2>{{order.deliveryinstruction ? order.deliveryinstruction: 'N/A'}}</h2>
              </div>
            </div> 
            <div v-if="orderList.riderID !== null">
              <hr>
              <h1>Rider Details</h1>
              <div class="d-flx-alc-jsb">
                <p class="co-lgray">Rider Name</p>
                <h2>{{orderList.riderfirstname}} {{orderList.riderlastname}}</h2>
              </div>
              <hr>
              <div class="d-flx-alc-jsb">
                <p class="co-lgray">Rider Phone Number</p>
                <h2>{{orderList.riderphonenumber}}</h2>
              </div>
            </div>
            <table class="table-content order-list">
              <tbody class="tablebody">
                
                <tr v-for="order in orderDetailsData.items" v-bind:key="order.id">
                  <td>
                      <div class="text-img alt">
                          <img class="text-img__img" :src="order.photo" alt="">
                          <div class="text-img__content">
                              <h3 class="fw-medium">
                                  {{  order.productname }}
                              </h3>
                              <div v-if="order.discountprice">
                                <s class="old-price">₦ {{formatPrice(order.unitprice)}}</s>
                                <p class="discount-price-normal">₦ {{formatPrice(order.discountprice)}}</p>
                              </div>
                              <div v-else>
                                <p class="price">₦ {{formatPrice(order.unitprice)}}</p>
                              </div>
                          </div>
                      </div>
                  </td>
                  <td>{{ order.quantity }}</td>
                  <td > ₦ {{ formatPrice(order.totalprice) }}</td>
                </tr>
                <!-- <tr class="no-border-bottom">
                    <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
                    <td class="fw-medium co-lgray">₦ {{ formatPrice(Number(orderDetailsData.discountpayment) + Number(orderDetailsData.ordertotal)) }}</td>
                </tr>
                <tr v-for="payment in orderDetailsData.paymentdetails" :key="payment.id" class="no-border-bottom">
                    <td colspan="2" class="co-lgray tx-r font-16">{{ payment.paymentmethod ? payment.paymentmethod.charAt(0).toUpperCase() + payment.paymentmethod.slice(1): ''}}</td>
                    <td class="fw-medium co-lgray">₦ {{ formatPrice(Number(payment.paymentamount)) }}</td>
                </tr> -->
                <!-- <tr class="no-border-bottom">
                    <td colspan="2" class="co-lgray tx-r font-16">Discount</td>
                    <td class="fw-medium co-lgray">₦ {{ formatPrice(Number(orderDetailsData.discountpayment) ) }}</td>
                </tr> -->
                <tr class="no-border-bottom">
                    <td colspan="2" class="co-lgray tx-r font-16">Delivery Fee</td>
                    <td class="fw-medium co-lgray">₦ {{ formatPrice(orderList.deliverycharge) }}</td>
                </tr>
                <!-- <tr class="no-border-bottom">
                    <td colspan="2" class="co-lgray tx-r font-16">Tax total</td>
                    <td class="fw-medium co-lgray">₦ {{  formatPrice(orderDetailsData.vat ? Number(orderDetailsData.vat) : 0.00) }}</td>
                </tr> -->
                <tr class="no-border-bottom">
                    <td colspan="2" class="font-18 fw-bold tx-r">Total</td>
                    <td class="font-18 fw-bold">₦ {{ formatPrice(orderList.deliverycharge) }}</td>
                </tr>
              </tbody>
            </table>
            </overlay-scrollbars>
            
        <div id="cancel-order" uk-modal data-uk-modal="{target:'#cancel-order',bgclose:false}" container="#parent-component">
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeOrderDetails" uk-close></button>
          <div class="modal-header">
            <h2>
              Cancel order
            </h2>            
          </div>
          <form action="">
            <label  class="form-input">
              <p class="form-input__label">Why do you want to cancel this order? <span style="color: red;">*</span></p>              
            </label>
            <div class="form-input__input">
              <textarea rows="5" v-model="formData.reason"></textarea>
            </div>
          </form>
          <div class="d-flx-alc-jfe mt-2">
            <button type="submit" id="submitBtn" class="btn btn--primary" @click="orderCancel(order)">
              Cancel
            </button>
          </div>          
        </div>
      </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
    layout: 'main',
    data: () => ({
      orderList: {},
      orderDetailsData: {
        items: [],
        tax: 0,
        id: '',
        orderid: '',
        orderstatus: '',
        customername: '',
        customerphone: '',
        deliveryaddress: '',
        profilelink: '',
        discountpayment: 0,
        ordertotal: 0,
        deliverycharge: 0,
        rider: {
          id: '',
          phone: '',
          name: '',
          regnumber: '',
          photo: ''
        },
        staff: {
          photo: '',
          name: '',
          phone: ''
        }
      },
      formData: {
        orderID: '',
        orderstatus: "cancel",
        reason: ''
      }
    }),    
    methods : {
      copyLink(link) {
		  let vm = this
			this.$copyText(link).then(function (e) {
			  vm.$toast.success('Pick-up code copied to clipboard')
			}, function(e){
			  vm.$toast.error('An error occurred.Cannot copy.')
			})
		},
      clearOrderDetails() {
        this.orderDetailsData = {
          items: [],
          orderid: '',
          orderstatus: '',
          tax: 0,
          customername: '',
          customerphone: '',
          deliveryaddress: '',
          discountpayment: 0,
          ordertotal: 0,
          profilelink: '',
          deliverycharge: 0,
          rider: {
            id: '',
            phone: '',
            name: '',
            regnumber: ''
          },
          staff: {
            name: '',
            photo: '',
            phone: ''
          }
        }                        
      },
      orderDetails(order) {
        this.clearOrderDetails()
        this.orderList = order
        this.orderDetailsData = {
          items: order.orderitems,
          orderid: order.ordercode,
          id: order.id,
          vat: order.vat,
          paymentdetails: order.paymentdetails,
          tax: 0,
          orderstatus: order.orderstatus,
          customername: order.sendername,
          customerphone: order.sendernumber,
          deliveryaddress: order.address,
          discountpayment: order.discountpayment,
          ordertotal: order.ordertotal,
          profilelink: order.profilelink,
          deliverycharge: order.deliverycharge,
          rider : {
            id: order.riderID,
            name: order.riderfirstname + ' ' + order.riderlastname,
            phone: order.riderphonenumber,
            regnumber: order.registrationnumber,
            photo: order.riderphoto
          },
          staff: {
            name: order.staffname,
            photo: order.staffpic,
          },
        }
        this.formData.orderID = order.id
        $('#order-details').addClass('uk-open').show();
		},
    setOrder(order) {
			this.orderDetails(order)
    },
    calculateSubTotal(items) {
			let sum = 0
			items.forEach(function(value, index, array){
				sum += value.totalprice
			})
			return sum
		},
		calculateTotal(items) {
			let total = 0
			let sum = 0
			items.forEach(function(value, index, array){
				sum += value.totalprice
			})
			let tax = 0;
			if(this.orderDetailsData.tax > 0) {
				tax = (this.orderDetailsData.tax / 100) * sum
			}

			total = +sum + +tax + +this.orderDetailsData.deliverycharge;
			return total
		},
		closeOrderDetails() {
			this.clearOrderDetails()
			$('#order-details').removeClass('uk-open').hide();
		},
    cancelOrder(){
      
      $('#cancel-order').addClass('uk-open').show();
    },
    orderCancel (event) {
			$('#submitBtn').attr('disabled', true).html('canceling....please wait')
	    this.$store.dispatch('orders/cancelOrder', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('Cancel Order')
					if(res.data.status) {
             $('#cancel-order').removeClass('uk-open').hide();
						this.$toast.success(res.data.message)
            location.reload()
						return
					}
					this.$toast.error(res.data.message)
				}).catch(err =>{
					this.$toast.error(res.data.message)
					$('#submitBtn').attr('disabled', false).html('Cancel Order')
				})
		},
  }
}
</script>

<style scoped>

h2.delivery-pin{
  color: forestgreen; background-color: rgb(207, 248, 207); padding: 10px 16px; 
  font-size: 20px; 
  cursor:pointer;
  border-radius: 6px;
}
div h2{
  font-size: 16px;
  font-weight: 600;
}
h1{
  margin-top: 20px;
  font-weight: 600;
}

hr{
  margin-top: 8px;
  margin-bottom: 6px;
}
.status{
  padding: 4px 12px;
}
.btn{
  padding: 8px 16px;
}
.btn--primary{
  min-width: 75px
}

.btn--danger{
   background-color: #dc3545;
   color: #fff;
}

.review{
  border-radius: 8px
}
</style>