<template>
  <section class="main-content-wrap">
    <div class="inner-main-wrapper">
      <ul class="card-list none flex-width-1-4wgr">
        <li class="card-item box-deco-bg">
          <div class="card-item__header">
            <h3>
              Today’s Order
            </h3>
            <svg>
              <use href="/uploads/icons.svg#toq-file"></use>
            </svg>
          </div>
          <div class="card-item__body">
            <p class="card-item__body--count">2000</p>
            <p class="card-item__body--status">
              <span class="co-success">
                ↑ 20
              </span>
              <span>
                More than yesterday
              </span>
            </p>
          </div>
        </li>
        <li class="card-item box-deco-bg">
          <div class="card-item__header">
            <h3>
              Today’s Revenue
            </h3>
            <svg>
              <use href="/uploads/icons.svg#money-bag"></use>
            </svg>
          </div>
          <div class="card-item__body">
            <p class="card-item__body--count">₦180,545</p>
            <p class="card-item__body--status">
              <span class="co-error">
                ↓ 10%
              </span>
              <span>
                More than yesterday
              </span>
            </p>
          </div>
        </li>
        <li class="card-item box-deco-bg">
          <div class="card-item__header">
            <h3>
              Current Week Orders
              <span>04/19 - 04/25</span>
            </h3>
            <svg>
              <use href="/uploads/icons.svg#toq-file"></use>
            </svg>
          </div>
          <div class="card-item__body">
            <p class="card-item__body--count">200</p>
            <p class="card-item__body--status">
              <span class="co-success">
                ↑ Order up
              </span>
              <span>
                (Last week)
              </span>
            </p>
          </div>
        </li>
        <li class="card-item box-deco-bg">
          <div class="card-item__header">
            <h3>
              Current Week Revenue
              <span>04/19 - 04/25</span>
            </h3>
            <svg>
              <use href="/uploads/icons.svg#money-bag"></use>
            </svg>
          </div>
          <div class="card-item__body">
            <p class="card-item__body--count">₦180,545</p>
            <p class="card-item__body--status">
              <span class="co-error">
                ↓ 10%
              </span>
              <span>
                Less than Last week
              </span>
            </p>
          </div>
        </li>
      </ul>
      <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">History</h3>
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
      </div>
      <figure class="table-wrapper no-deco">
      <figcaption class="sr">
        A table showing information of categories
      </figcaption>
      <table class="table-content">
        <thead class="">
        <tr><th class="">
          Week Range
        </th><th class="">
          Orders
        </th><th class="">
          Sale
        </th><th class="">
          Tax
        </th><th class="large-space">
          Gross Revenue
        </th><th class="">
          Ntisa Fee
        </th><th class="">
          Revenue
        </th><th class="">
          Status
        </th></tr>
        </thead>
        <tbody class="tablebody"><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr><tr uk-toggle="target: #order-details">
          <td style="color: #353190;">
            04/19 - 04/25
          </td>
          <td>30</td>
          <td >₦180,545</td>
          <td>₦1,545</td>
          <td>₦09045454698</td>
          <td>
            ₦1,545
          </td>
          <td >₦179,000</td>
          <td><span class="status paid">paid</span></td>

        </tr></tbody>
      </table>
    </figure>
      <div id="order-details" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>
              Weekly Summary
              <span class="ml-1h">04/19 - 04/25</span>
            </h2>
            <p class="mt-1h"> View your sales and weekly summary broken down by day</p>
            <p class="d-flx mt-1h"> <span class="status pending">Pending</span></p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <ul class="text-list flex-width-1-3">
              <li>
                <h3>Orders</h3>
                <p>30</p>
              </li>
              <li>
                <h3>Orders</h3>
                <p>30</p>
              </li>
              <li>
                <h3>Orders</h3>
                <p>30</p>
              </li>
              <li>
                <h3>Ntisa Fee</h3>
                <p>30</p>
              </li>
              <li>
                <h3>Gross Revenue</h3>
                <p>30</p>
              </li>
              <li>
                <h3>Net Revenue</h3>
                <p>30</p>
              </li>
            </ul>
            <div class="d-flx">
              <button class="btn btn--primary">Download csv statement</button>
              <button class="btn btn-no-fill ml-1h">Send statement via mail</button>
            </div>
            <div>
              <h3  class="my-3 section-title">Breakdown</h3><ul uk-accordion class="accordion-list">
              <li>
                <a class="uk-accordion-title accordion-title" href="#">04/19</a>
                <div class="uk-accordion-content accordion-content">
                  <ul class="text-list flex-width-1-3">
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Ntisa Fee</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Gross Revenue</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Net Revenue</h3>
                      <p>30</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a class="uk-accordion-title accordion-title" href="#">04/19</a>
                <div class="uk-accordion-content accordion-content">
                  <ul class="text-list flex-width-1-3">
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Ntisa Fee</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Gross Revenue</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Net Revenue</h3>
                      <p>30</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a class="uk-accordion-title accordion-title" href="#">04/19</a>
                <div class="uk-accordion-content accordion-content">
                  <ul class="text-list flex-width-1-3">
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Orders</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Ntisa Fee</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Gross Revenue</h3>
                      <p>30</p>
                    </li>
                    <li>
                      <h3>Net Revenue</h3>
                      <p>30</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul></div>
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
