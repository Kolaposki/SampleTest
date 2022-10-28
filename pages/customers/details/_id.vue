<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <div @click="from == 'transaction' ? $router.push('/customers')  : $router.back()" class="text-link over">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </div>
    </div>
    <div class="inner-main-wrapper">
      <div class="flex-width-4 j-c-sb" v-if="loading">
        Loading...please wait
      </div>
      <div class="flex-width-4 j-c-sb" v-if="!loading">
      
        <div class="width-1-4">
          <div class="box-deco-bg">
            <div class="d-flx-r-md">
              <div class="user">
                <div>
                  <img v-if="customerData.profilelink === '' || customerData.profilelink === null || customerData.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
                  <img v-else-if="customerData.profilelink.includes('http://') && customerData.profilelink.includes('https://')" :src="customerData.profilelink.replace('http://68.65.121.57:8080/', '')" alt="">
                  <img v-else :src="customerData.profilelink" alt="">
                </div>
                
                <h3 class="user__name">{{ customerData.firstname }} {{ customerData.lastname }}</h3>
                <div class="user__rating">
                  <div :class="'user__rating--level level'+customerData.userrate">
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                    <svg>
                      <use href="/uploads/icons.svg#star"></use>
                    </svg>
                  </div>
                  <span class="user__rating--score">{{ customerData.userrate }}</span>
                  <span class="user__rating--reviews">(0 reviews)</span>
                </div>
              </div>
              <div class="user-details">
                <p>
                  <span style="font-weight: 600">Phone</span>
                  <span class="co-rich-black">{{ customerData.phonenumber }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Email</span>
                  <span class="co-rich-black">{{ customerData.emailaddress }}</span>
                </p>
                <p>
                  <span style="font-weight: 600">Address</span>
                  <span class="co-rich-black">16a, George Omonubi Street</span>
                </p>
                <!-- <p>
                  <span style="font-weight: 600">Last order</span>
                  <span class="co-rich-black">{{ customerData.lastorderdate ?  $moment(customerData.lastorderdate).format('Do, MMM YYYY') : 'N/A'}}</span>
                </p> -->
              </div>
            </div>
            <div class="d-flx-alc-jc my-1">
<!--              <button class="btn btn&#45;&#45;primary" type="button" uk-toggle="target: #message">-->
<!--              <button class="btn btn&#45;&#45;primary" type="button">-->
<!--                Send message-->
<!--              </button>-->
              <div id="message" uk-modal>
                <div class="uk-modal-dialog uk-margin-auto-vertical modal">
                  <button class="uk-modal-close-default" type="button" uk-close></button>
                  <div class="modal-header">
                    <h2>Notification message</h2>
                    <p>Send your customers a message to be received via the mobile app.</p>
                  </div>
                  <div class="modal-body" uk-overflow-auto>
                    <div class="form-input">
                      <span class="form-input__label">Select customers</span>
                      <div class="d-flx-alc drop-selected">
                        <div class="selected">
                          <span>Ayodeji Mike</span>
                          <svg>
                            <use xlink:href="/uploads/icons.svg#cancel"></use>
                          </svg>
                        </div>
                        <div class="selected">
                          <span>Ayodeji Mike</span>
                          <svg>
                            <use xlink:href="/uploads/icons.svg#cancel"></use>
                          </svg>
                        </div>
                        <div class="selected">
                          <span>Olamide Bankole</span>
                          <svg>
                            <use xlink:href="/uploads/icons.svg#cancel"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div  class="form-input">
                      <label class="form-input__label">Body</label>
                      <div class="form-input__input">
                        <div class="msg-style d-flx-alc">
                          <button class="co-black">Heading</button>
                          <button class="co-black">Open Sans</button>
                          <button class="btn btn-icon smallsvg active">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#bold"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#italics"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#underline"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#leftAlign"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#centerAlign"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#rightAlign"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#justified"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#bulletList"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#decreaseIndent"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#increaseIndent"></use>
                            </svg>
                          </button>
                          <button class="btn btn-icon smallsvg">
                            <svg class="form-input__main-svg">
                              <use xlink:href="/uploads/icons.svg#image"></use>
                            </svg>
                          </button>
                        </div>
                        <textarea rows="5" placeholder="Enter"></textarea>
                      </div>
                    </div>
                  </div>
                  <div class="d-flx-alc-jfe mt-3">
                    <button class="btn btn-no-fill">
                      Cancel
                    </button>
                    <button class="btn btn--primary ml-1" uk-toggle="target: #add-branch2">
                      Save message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="width-3-4">
          <ul class="card-list none ml-mt-1 flex-width-1-3wgr">
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen;">
              <div class="card-item__header">
                
                <div>
                  <h3>
                    Total Order
                  </h3>
                  <!-- <p>
                    Total no of times customer has ordered
                  </p> -->
                </div>
                <!-- <svg>
                  <use href="/uploads/icons.svg#wallet"></use>
                </svg> -->
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">{{customerData.customeorderhistory ? customerData.customeorderhistory.length : 0}}</p>

              </div>
            </li>
            <li class="card-item ml-mt-1 box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <div>
                  <h3>
                    Wallet Balance
                  </h3>
                  <!-- <p>Total number of discount campaigns</p> -->
                </div>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
                <!-- <svg>
                  <use href="/uploads/icons.svg#campaign"></use>
                </svg> -->
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">₦{{formatPrice(customerData.walletbalance)}}</p>
<!--                <button class="co-primary fw-medium font-14" uk-toggle="target: #campaigns">View details</button>-->
                <!-- <button class="co-primary fw-medium font-14">View details</button> -->
              </div>
            </li>
            <li class="card-item box-deco-bg" style="border-top:3px solid forestgreen">
              <div class="card-item__header">
                <h3>
                  Loyalty Points
                </h3>
                <img src="/uploads/revenue-icon.png" width="40px" alt="">
                <!-- <svg>
                  <use href="/uploads/icons.svg#loyalty"></use>
                </svg> -->
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">{{customerData.loyaltybalance}}</p>
<!--                <button class="co-primary fw-medium font-14" uk-toggle="target: #loyalty">View details</button>-->
                <!-- <button class="co-primary fw-medium font-14">View details</button> -->
              </div>
            </li>
            
          </ul>
          <div>
            <div class="d-flx-alc-jsb table-title">
              <h3 class="section-title">History</h3>
              <!-- <a class="co-rich-black" @click="viewOrderDetailsHistory(customer)">View all</a> -->
            </div>
            <pagination :headers="headers" v-model="formData.page" @go="getCustomerData" />
            <overlay-scrollbars class="table-wrapper no-deco">
              <figcaption class="sr">
                A table showing information of categories
              </figcaption>
              <table class="table-content">
                <thead class="">
                  <tr>
                    <!-- <th></th> -->
                    <th class="">Order ID</th>
                    <th>Category</th>
                    <th class="">Amount (N)</th>
                    <th class="">Payment Method</th>
                    <th class="column-name">Rider</th>
                    <th class="">Order Status</th>
                    <th class="">Payment Status</th>
                    <th>Order Time</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="tablebody">
                  <tr v-if="customerData.customeorderhistory.length < 1">
                    <td colspan="8">No available order history</td>
                  </tr>
                  <tr v-if="customerData.customeorderhistory.length > 0" v-for="order in customerData.customeorderhistory" :key="order.id" @click="orderDetails(order)">
                    <!-- <td>
                      <div class="d-flx-alc-jc">
                        <label class="input-check">
                          <input class="uk-checkbox" type="checkbox">
                        </label>
                      </div>
                    </td> -->
                    
                    <td style="color: #28A745;">{{ order.ordercode }}</td>
                    <td>{{ order.ordercategory }}</td>
                    <td>{{ formatPrice(order.ordertotal) }}</td>
                    <td>{{order.paymentmethod}}</td>
                    <td class="column-name">
                      <!-- <img v-if="order.riderphoto === '' || order.riderphoto === null" src="/default_image.png" alt="">
                      <img v-else :src="order.riderphoto" alt=""> -->
                      <span v-if="order.riderID != null">{{order.riderfirstname }} {{ order.riderlastname}}</span>
                      <span v-if="order.riderID == null"></span>
                    </td>
                    
                    <td class="tx-c"><span :class="'status ' + order.orderstatus.toLowerCase()">{{ order.orderstatus.replace('_', ' ') }}</span></td>
                    <td class="tx-c"><span :class="'status ' + order.paymentstatus.toLowerCase()">{{ order.paymentstatus.replace('_', ' ') }}</span></td>
                    <td>{{$moment(order.created_at).format('Do, MMM YYYY')}}</td>
                    <!-- <td>
                      <svg @click="orderDetails(order)" title="View order details">
                        <use xlink:href="/uploads/icons.svg#hover"></use>
                      </svg>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </overlay-scrollbars>

            <!-- <div id="order-details" uk-modal>
              <div class="uk-modal-dialog uk-margin-auto-vertical modal">
                <button class="uk-modal-close-default" type="button" @click="closeOrderDetails">X</button>
                <div class="modal-header">
                  <h2>
                    Order Details
                    <span :class="'status ' + orderDetailsData.orderstatus.toLowerCase()">{{ orderDetailsData.orderstatus.replace('_', ' ') }}</span>
                  </h2>
                  <p class="d-flx"> <span class="review">{{ orderDetailsData.orderid }}</span></p>
                </div>

                <overlay-scrollbars class="modal-body" uk-overflow-auto>
                  <div class="d-flx-jsb">
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
                            <p>₦ {{ formatPrice(order.unitprice) }}</p>
                          </div>
                        </div>
                      </td>
                      <td><span class="quantity">{{ formNumber(order.quantity) }}</span></td>
                      <td > ₦ {{ formatPrice(order.totalprice) }}</td>
                    </tr>
                    <tr class="no-border-bottom">
                      <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
                      <td class="fw-medium co-lgray">₦ {{ formatPrice(calculateSubTotal(orderDetailsData.items)) }}</td>
                    </tr>
                    <tr class="no-border-bottom">
                      <td colspan="2" class="co-lgray tx-r font-16">Delivery Fee</td>
                      <td class="fw-medium co-lgray">₦ {{ formatPrice(orderDetailsData.deliverycharge) }}</td>
                    </tr>
                    <tr class="no-border-bottom">
                      <td colspan="2" class="font-20 fw-bold tx-r">Total</td>
                      <td class="font-20 fw-bold">₦ {{ formatPrice(calculateTotal(orderDetailsData.items)) }}</td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="flex-width-1-2-nr mt-1">
                    <div>
                      <h3 class="mb-2 big-text">Assigned Rider</h3>
                      <div class="text-img order-modal" v-if="orderDetailsData.rider.id !== null">
                        <div class="img-wrap">
                          <img v-if="orderDetailsData.rider.photo === '' || orderDetailsData.rider.photo === null" class="text-img__img round" src="/default_image.png" alt="">
                          <img v-else class="text-img__img round" :src="orderDetailsData.rider.photo" alt="">
                          <p class="rating">
                            <span>0</span>
                            <svg>
                              <use href="/uploads/icons.svg#star"></use>
                            </svg>
                          </p>
                        </div>
                        <div class="text-img__content">
                          <h4 class="name">
                            {{ orderDetailsData.rider.name }}
                          </h4>
                          <p>{{ orderDetailsData.rider.phone }}</p>
                          <p>{{orderDetailsData.rider.regnumber }}</p>
                        </div>
                      </div>
                      <div class="text-img order-modal" v-else>
                        <div class="img-wrap">
                          <img class="text-img__img round" src="/default_image.png" alt="">
                          <p class="rating">
                            <span>0</span>
                            <svg>
                              <use href="/uploads/icons.svg#star"></use>
                            </svg>
                          </p>
                        </div>
                        <div class="text-img__content">
                          <h4 class="name">No rider assigned</h4>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 class="mb-2 big-text">Responding Staff</h3>
                      <div class="text-img order-modal" v-if="orderDetailsData.staff.name !== ''">
                        <img v-if="orderDetailsData.staff.photo === ''" class="text-img__img round" src="/default_image.png" alt="">
                        <img v-else class="text-img__img round" :src="orderDetailsData.staff.photo" alt="">
                        <div class="text-img__content">
                          <h4 class="name">
                            Staff Info
                          </h4>
                          <p>{{ orderDetailsData.staff.phone }}</p>
                          <p>{{ orderDetailsData.staff.name }}</p>
                        </div>
                      </div>
                      <div class="text-img order-modal" v-else>
                        <img class="text-img__img round" src="/default_image.png" alt="">
                        <div class="text-img__content">
                          <h4 class="name">
                            No staff info
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </overlay-scrollbars>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>


    <div id="loyalty" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>
            Loyalty Points
          </h2>
          <p class="d-flx"> Customers earn points when they order from your store. This is a way of rewarding your repeat customers. The more they buy, the more points they earn. You can set rewards for each point level <a href="here"></a></p>
        </div>
        <div class="modal-body" uk-overflow-auto>
          <ul class="card-list none flex-width-1-2">
            <li class="card-item box-deco-bg">
              <div class="card-item__header">
                <h3>
                  Point Balance
                </h3>
                <svg>
                  <use href="/uploads/icons.svg#loyalty"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">2000</p>
              </div>
            </li>
            <li class="card-item box-deco-bg">
              <div class="card-item__header">
                <h3>
                  Redeemed Rewards
                </h3>
                <svg>
                  <use href="/uploads/icons.svg#reward"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">10</p>
              </div>
            </li>
          </ul>
          <div>
            <h3 class="section-title my-3">Loyalty Programs</h3>
            <ul class="d-flx overf-scroll">
              <li class="btn-toggle active">All programs</li>
              <li class="btn-toggle">All programs</li>
              <li class="btn-toggle">All programs</li>
              <li class="btn-toggle">All programs</li>
              <li class="btn-toggle">All programs</li>
              <li class="btn-toggle">All programs</li>
              <li class="btn-toggle">All programs</li>
            </ul>
            <ul class="loyalty-list">
              <li class="d-flx-alc-jsb py-2">
                <div>
                  <h4 class="font-18 co-black ff-body">
                    Get free coke on next order
                  </h4>
                  <p class="width-80-pc">
                    Reach a total of 500 points in the next 20 days to get
                    Free coke at checkout.
                  </p>
                  <div class="progress-meter mt-3">
                    <span class="bar">
                      <span class="progress" style="width: 25%"></span>
                    </span>
                    <p>305/500 points accumulated</p>
                  </div>
                </div>
                <p class="status ready">
                  In Progress
                </p>
              </li>
              <li class="d-flx-alc-jsb py-2">
                <div>
                  <h4 class="font-18 co-black ff-body">
                    Get free coke on next order
                  </h4>
                  <p class="width-80-pc">
                    Reach a total of 500 points in the next 20 days to get
                    Free coke at checkout.
                  </p>
                  <div class="progress-meter mt-3">
                    <span class="bar">
                        <span class="progress" style="width: 25%"></span>
                    </span>
                    <p>305/500 points accumulated</p>
                  </div>
                </div>
                <p class="status ready">
                  In Progress
                </p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <div id="campaigns" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>
            Active Campaigns
          </h2>
          <p class="d-flx"> Monitor private campaigns</p>
        </div>
        <div class="modal-body" uk-overflow-auto>
          <ul class="card-list none flex-width-1-2 less-gp">
            <li class="card-item box-deco-bg">
              <div class="card-item__header">
                <h3>
                  Personalised Discounts
                </h3>
                <svg>
                  <use href="/uploads/icons.svg#loyalty"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">2000</p>
              </div>
            </li>
            <li class="card-item box-deco-bg">
              <div class="card-item__header">
                <h3>
                  Unredeemed Giftcards
                </h3>
                <svg>
                  <use href="/uploads/icons.svg#reward"></use>
                </svg>
              </div>
              <div class="card-item__body">
                <p class="card-item__body--count">10</p>
              </div>
            </li>
          </ul>
          <div>
            <h3 class="section-title my-3">Personalised discount Campaigns</h3>
            <ul class="d-flx overf-scroll">
              <li class="btn-toggle active">Active</li>
              <li class="btn-toggle">Redeemed</li>
            </ul>
            <ul class="sales-list flex-width-1-2 less-gp">
              <li class="sales-card">
                <div class="sales-card__title">
                  <h4>
                    Ramadan sales
                  </h4>
                  <p>
                    RAMADAN2020
                  </p>
                  <button class="btn btn-icon smallsvg">
                    <svg>
                      <use href="/uploads/icons.svg#delete"></use>
                    </svg>
                  </button>
                </div>
                <div class="sales-card__foot">
                  <p class="status ready">In Progress</p>
                  <p class="expire">
                    <span >Expires</span>
                    <span>31 Jul 2020</span>
                  </p>
                </div>
              </li>
              <li class="sales-card">
                <div class="sales-card__title">
                  <h4>
                    Ramadan sales
                  </h4>
                  <p>
                    RAMADAN2020
                  </p>
                  <button class="btn btn-icon smallsvg">
                    <svg>
                      <use href="/uploads/icons.svg#delete"></use>
                    </svg>
                  </button>
                </div>
                <div class="sales-card__foot">
                  <p class="status ready">N/A</p>
                  <p class="expire">
                    <span >N/A</span>
                    <span>N/A</span>
                  </p>
                </div>
              </li>
              <li class="sales-card">
                <div class="sales-card__title">
                  <h4>
                    N/A
                  </h4>
                  <p>
                    N/A
                  </p>
                  <button class="btn btn-icon smallsvg">
                    <svg>
                      <use href="/uploads/icons.svg#delete"></use>
                    </svg>
                  </button>
                </div>
                <div class="sales-card__foot">
                  <p class="status ready">In Progress</p>
                  <p class="expire">
                    <span >Expires</span>
                    <span>N/A</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="section-title my-3">Unredeemed Giftcard</h3>
            <ul class="gifts-list flex-width-1-2 less-gp">
              <li class="gifts-card">
                <div class="gifts-card__title">
                  <svg >
                    <use xlink:href="/uploads/icons.svg#overlap"></use>
                  </svg>
                </div>
                <div class="gifts-card__foot">
                  <div class="gcard-title">
                    <h4>VALENTINE</h4>
                    <p>₦0 available</p>
                  </div>
                  <p class="expire">
                    <span >Expires</span>
                    <span>N/A</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../../components/Pagination.vue';
export default {
  components: { Pagination },
	layout: 'main',
	computed: {
	  customer() {
	    return JSON.parse(localStorage.getItem('customer'))
    },
    from () {
      return this.prevRoute != undefined && this.prevRoute != null ? this.prevRoute.fullPath.split('/')[this.prevRoute.fullPath.split('/').length - 1] : ''
    }
  },
  beforeRouteEnter(to, from, next) {
  next(vm => {
    vm.prevRoute = from
  })
},
	data: () => ({
    loading: true,
    prevRoute: "",
    customerData: {},
    headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
    },
    formData: {
      branchID: '',
      page: 1,
      id: ''
    },
		orderDetailsData: {
			items: [],
			tax: 0,
			orderid: '',
			orderstatus: '',
			customername: '',
			customerphone: '',
			deliveryaddress: '',
			deliverycharge: 0,
			profilelink: '',
			rider: {
				id: '',
				phone: '',
				name: '',
				regnumber: ''
			},
			staff: {
				photo: '',
				name: '',
				phone: ''
			}
		}
	}),
	methods: {
	  getCustomerData() {
      this.customerData = this.customer
      // console.log( this.$route.params.id)
      this.formData.id = this.$route.params.id
      this.$store.dispatch('usersreport/getCustomerTransactions', this.formData)
				.then(res => {
					if(res.data.status) {  
    
						if (res.data.data.data != undefined && res.data.data.data.length > 0) {
							this.setHeaders(res.data.data.data, res.data.data)
              this.customerData.customeorderhistory = res.data.data.data
						}else{
              this.customerData.customeorderhistory=[]
            }
						this.loading = false
						return
					}

					this.loading = false
					this.$toast.error('An error occurred! Please try again')
				}).catch(err =>{
					this.loading = false
					this.$toast.error('An error occurred ' + err)
				})
			
		},
		closeOrderDetails() {
			this.clearOrderDetails()
			$('#order-details').removeClass('uk-open').hide();
		},
		orderDetails(order) {
			this.clearOrderDetails()
			this.orderDetailsData = {
				items: order.orderitems,
				orderid: order.ordercode,
				tax: 0,
				orderstatus: order.orderstatus.replace('_', ' '),
				customername: order.firstname + ' ' + order.lastname,
				customerphone: order.username,
				deliveryaddress: order.address,
				deliverycharge: order.deliverycharge,
				profilelink: order.profilelink,
				rider : {
					id: order.riderID,
					name: order.riderfirstname + ' ' + order.riderlastname,
					phone: order.riderphonenumber,
					regnumber: order.registrationnumber
				},
				staff: {
	        name: order.staffname,
					photo: order.staffpic,
					// phone: ''
				}
			}
			$('#order-details').addClass('uk-open').show();
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
				deliverycharge: 0,
				profilelink: '',
				rider: {
					id: '',
					phone: '',
					name: '',
					regnumber: ''
				},
				staff: {
					photo: '',
					name: '',
					phone: ''
				}
			}
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
		viewOrderDetailsHistory(row) {
			try {
				localStorage.removeItem('orderHistory')
				this.$store.dispatch('usersreport/setOrderHistory', row)

				this.$router.push('/reports/users/customer/transaction')
			}catch(e){
				console.log(e)
			}
		},
	},
	mounted() {
	  this.getCustomerData()
	}
}
</script>
<style scoped>
li.box-deco-bg:hover{
  background:forestgreen;
}
li.box-deco-bg:hover p, li.box-deco-bg:hover h3, li.box-deco-bg:hover p  span{
  color:#fff !important;
}

.user img{
  width: 100px;
  margin: 0 auto;
}

.user__rating{
  margin-top: 0
}

.user-details span{
  font-size: 14px
}
table.table-content{
  width:1000px
}
</style>