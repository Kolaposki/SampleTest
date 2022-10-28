<template>
  <section class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/reports" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>
      <div class="search-filter d-flx-alc-jfe">
        <div class="drop-down filter-drop">
          <button class="filter-btn box-deco-smallr" type="button" >
            <span class="mr-1">all branches</span>
            <svg class="">
              <use xlink:href="/uploads/icons.svg#drop"></use>
            </svg>
          </button>
          <div class="drop-wrapper" data-drop-down>
            <ul class="drop-lists">
              <li class="drop-list-item">
                All branches
              </li>
              <li class="drop-list-item">
                eleko branch
              </li>
              <li class="drop-list-item">
                lekki branch
              </li>
            </ul>
          </div>
        </div>
        <div class="drop-down filter-drop">
          <button class="filter-btn box-deco-smallr" type="button" >
            <span class="mr-1">all branches</span>
            <svg class="">
              <use xlink:href="/uploads/icons.svg#drop"></use>
            </svg>
          </button>
          <div class="drop-wrapper" data-drop-down>
            <ul class="drop-lists">
              <li class="drop-list-item">
                All branches
              </li>
              <li class="drop-list-item">
                eleko branch
              </li>
              <li class="drop-list-item">
                lekki branch
              </li>
            </ul>
          </div>
        </div>
        <a href="/uploads/down.png" download class="btn btn--primary">Export</a>
        <div class="drop-down page-drop">
          <button class="btn-text " type="button" >
            Showing <span> 1-20 </span> of <span> 48 </span>
          </button>
          <div class="drop-wrapper" data-drop-down>
            <ul class="drop-lists">
              <li class="drop-list-item">
                Newest
              </li>
              <li class="drop-list-item">
                Oldest
              </li>
            </ul>
          </div>
        </div>
        <div class="d-flx-alc">
          <button class="btn btn-icon smallsvg">
            <svg>
              <use href="/uploads/icons.svg#arrow-right"></use>
            </svg>
          </button>
          <button class="btn btn-icon smallsvg">
            <svg>
              <use href="/uploads/icons.svg#arrow-left"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <figure class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <!-- <th></th> -->
            <th class="large-space">Customer Name</th>
            <th class="">Contact</th>
            <th class="">Order ID</th>
            <th class="">Amount (₦)</th>
            <th class="">Branch</th>
            <th class="large-space">Rider</th>
            <th class="">Status</th>
            <th class="">Order Time</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr uk-toggle="target: #order-details">
            <!-- <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td> -->
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>joseph kayode</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ikeja,lagos</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>joseph kayode</span>
            </td>
            <td class="tx-c"><span class="status dispatched">dispatched</span></td>
            <td>Today - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>Thelma dike</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>abeokuta, ogun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>Thelma dike</span>
            </td>
            <td class="tx-c"><span class="status pending">pending</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>chidinma nwogbo</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ibadan, oyo</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>chidinma nwogbo</span>
            </td>
            <td class="tx-c"><span class="status ready">ready</span></td>
            <td>02/05/2019 - 10:30pm</td></tr><tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>Thelma dike</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>abeokuta, ogun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>Thelma dike</span>
            </td>
            <td class="tx-c"><span class="status delivered">delivered</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>moyin ariyo</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ilesha, osun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>moyin ariyo</span>
            </td>
            <td class="tx-c"><span class="status delivered">delivered</span></td>
            <td>02/05/2019 - 10:30pm</td></tr><tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>joseph kayode</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ikeja,lagos</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>joseph kayode</span>
            </td>
            <td class="tx-c"><span class="status pending">pending</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>Thelma dike</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>abeokuta, ogun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>Thelma dike</span>
            </td>
            <td class="tx-c"><span class="status ">Delivered</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>chidinma nwogbo</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ibadan, oyo</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>chidinma nwogbo</span>
            </td>
            <td class="tx-c"><span class="status delivered">delivered</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>Thelma dike</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>abeokuta, ogun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>Thelma dike</span>
            </td>
            <td class="tx-c"><span class="status pending">pending</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          <tr uk-toggle="target: #order-details">
            <td>
              <label class="input-check">
                <input class="uk-checkbox" type="checkbox">
              </label>
            </td>
            <td>
              <div class="avatar-wtext">
                <img src="/uploads/food.png" alt="">
                <span>moyin ariyo</span>
              </div>
            </td>
            <td>09045454698</td>
            <td style="color: #28A745;">NT9938</td>
            <td>103250</td>
            <td>ilesha, osun</td>
            <td class="avatar-wtext">
              <img src="/uploads/food.png" alt="">
              <span>moyin ariyo</span>
            </td>
            <td class="tx-c"><span class="status delivered">delivered</span></td>
            <td>02/05/2019 - 10:30pm</td>
          </tr>
          </tbody>
        </table>
      </figure>

      <div id="order-details" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>
              Order Details
              <span class="status ready">Ready</span>
            </h2>
            <p class="d-flx"> <span class="review">NT2838</span></p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <div class="d-flx-jsb">
              <div class="text-img order-modal">
                <img class="text-img__img" src="/uploads/user.png" alt="">
                <div class="text-img__content">
                  <h4 class="uppercase co-grey fw-medium font-14">
                    Customer info
                  </h4>
                  <p class="fw-medium font-16 co-rich-black">Grace Cole</p>
                  <p class="font-16 co-rich-black">08178293784</p>
                </div>
              </div>
              <div>
                <h4 class="uppercase co-grey fw-medium font-14">
                  Delivery address
                </h4>
                <p class="width-80-pc co-rich-black">
                  Muritala Mohammed Airport Terminal 2, Airport Road, Ikeja, Lagos.
                </p>
              </div>
            </div>
            <table class="table-content order-list">
              <tbody class="tablebody">
              <tr>
                <td>
                  <div class="text-img alt">
                    <img class="text-img__img" src="/uploads/food.png" alt="">
                    <div class="text-img__content">
                      <h3 class="fw-medium">
                        Chocolate Chip Cookies
                      </h3>
                      <p>₦ 500.00</p>
                    </div>
                  </div>
                </td>
                <td><span class="quantity">6</span></td>
                <td > ₦ 3000.00</td>
              </tr>
              <tr>
                <td>
                  <div class="text-img alt">
                    <img class="text-img__img" src="/uploads/food.png" alt="">
                    <div class="text-img__content">
                      <h3 class="fw-medium">
                        Chocolate Chip Cookies
                      </h3>
                      <p>₦ 500.00</p>
                    </div>
                  </div>
                </td>
                <td><span class="quantity">6</span></td>
                <td > ₦ 3000.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
                <td class="fw-medium co-lgray">₦ 8500.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="co-lgray tx-r font-16">Tax</td>
                <td class="fw-medium co-lgray">₦ 8500.00</td>
              </tr>
              <tr class="no-border-bottom">
                <td colspan="2" class="font-20 fw-bold tx-r">Total</td>
                <td class="font-20 fw-bold">₦ 8500.00</td>
              </tr>
              </tbody>
            </table>
            <div class="flex-width-1-2-nr mt-1">
              <div>
                <h3 class="mb-2 big-text">Assigned Rider</h3>
                <div class="text-img order-modal">
                  <div class="img-wrap">
                    <img class="text-img__img round" src="/uploads/user.png" alt="">
                    <p class="rating">
                      <span>4.7</span>
                      <svg>
                        <use href="/uploads/icons.svg#star"></use>
                      </svg>
                    </p>
                  </div>
                  <div class="text-img__content">
                    <h4 class="name">
                      Kola Kamsiyonna
                    </h4>
                    <p>08178293784</p>
                    <p>AX 398 ENU</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 class="mb-2 big-text">Responding Staff</h3>
                <div class="text-img order-modal">
                  <img class="text-img__img round" src="/uploads/user.png" alt="">
                  <div class="text-img__content">
                    <h4 class="name">
                      Customer info
                    </h4>
                    <p>08178293784</p>
                    <p>Grace Cole</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
	layout: 'main'
}
</script>
