<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="page-extras">
      <div class="drop-down filter-drop">
        <select
          @change="getDashboardData"
          v-model="category"
          class="filter-btn box-deco-smallr"
        >
          <option selected value="">All category</option>
          <option value="delivery">Delivery</option>
          <option value="food">Food</option>
        </select>
      </div>
      <div id="branch" class="drop-down filter-drop">
        <select
          v-model="formData.branchID"
          @change="getDashboardData"
          class="filter-btn box-deco-smallr"
        >
          <option value="">All Branches</option>
          <option
            v-for="branch in branches"
            :key="branch.id"
            :value="branch.id"
          >
            {{ branch.branchname }}
          </option>
        </select>
      </div>

      <div class="drop-down filter-drop">
        <select
          @change="getDashboardData"
          v-model="month"
          class="filter-btn box-deco-smallr"
        >
          <option selected value="">Current month</option>
          <option v-for="i in range(1, 12, 1).reverse()" :key="i" :value="i">
            {{ $moment.months(i - 1) }}
          </option>
        </select>
      </div>
      <div class="drop-down filter-drop">
        <select
          @change="getDashboardData"
          v-model="year"
          class="filter-btn box-deco-smallr"
        >
          <option selected value="">Current year</option>
          <option
            v-for="i in range(2021, new Date().getFullYear(), 1).reverse()"
            :key="i"
            :value="i"
          >
            {{ i }}
          </option>
        </select>
      </div>
      <!--      <div class="drop-down filter-drop">-->
      <!--        <select class="filter-btn box-deco-smallr">-->
      <!--          <option value="">Current week</option>-->
      <!--          <option selected value="">{{ this.currentWeekStart }} - {{ this.currentWeekEnd }}</option>-->
      <!--        </select>-->
      <!--      </div>-->
    </div>

    <div id="parent-component">
      <div id="order-details" uk-modal container="parent-container">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="closeOrderDetails"
          >
            X
          </button>
          <div class="modal-header">
            <h2>
              Order Details
              <span
                :class="'status ' + orderDetailsData.orderstatus.toLowerCase()"
                >{{ orderDetailsData.orderstatus.replace("_", " ") }}</span
              >
            </h2>
            <p class="d-flx">
              <span class="review">{{ orderDetailsData.orderid }}</span>
            </p>
          </div>

          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="d-flx-jsb">
              <div class="text-img order-modal">
                <img
                  v-if="
                    orderDetailsData.profilelink === '' ||
                    orderDetailsData.profilelink === null ||
                    orderDetailsData.profilelink === 'http://68.65.121.57:8080/'
                  "
                  class="text-img__img"
                  src="/default_image.png"
                  alt=""
                />
                <img
                  v-else-if="
                    orderDetailsData.profilelink.includes('http://') &&
                    orderDetailsData.profilelink.includes('https://')
                  "
                  :src="
                    orderDetailsData.profilelink.replace(
                      'http://68.65.121.57:8080/',
                      ''
                    )
                  "
                  class="text-img__img"
                  alt=""
                />
                <img
                  v-else
                  :src="orderDetailsData.profilelink"
                  class="text-img__img"
                  alt=""
                />
                <div class="text-img__content">
                  <h4 class="uppercase co-grey fw-medium font-14">
                    Customer info
                  </h4>
                  <p class="fw-medium font-16 co-rich-black">
                    {{
                      orderDetailsData.customername
                        ? orderDetailsData.customername
                        : "N/A"
                    }}
                  </p>
                  <p class="font-16 co-rich-black">
                    {{ orderDetailsData.customerphone }}
                  </p>
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
                <tr
                  v-for="order in orderDetailsData.items"
                  v-bind:key="order.id"
                >
                  <td>
                    <div class="text-img alt">
                      <img class="text-img__img" :src="order.photo" alt="" />
                      <div class="text-img__content">
                        <h3 class="fw-medium">
                          {{ order.productname }}
                        </h3>
                        <p>₦ {{ formatPrice(order.unitprice) }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="quantity">{{
                      formNumber(order.quantity)
                    }}</span>
                  </td>
                  <td>₦ {{ formatPrice(order.totalprice) }}</td>
                </tr>
                <tr class="no-border-bottom">
                  <td colspan="2" class="co-lgray tx-r font-16">Sub total</td>
                  <td class="fw-medium co-lgray">
                    ₦
                    {{ formatPrice(calculateSubTotal(orderDetailsData.items)) }}
                  </td>
                </tr>
                <tr class="no-border-bottom">
                  <td colspan="2" class="co-lgray tx-r font-16">
                    Delivery Fee
                  </td>
                  <td class="fw-medium co-lgray">
                    ₦ {{ formatPrice(orderDetailsData.deliverycharge) }}
                  </td>
                </tr>
                <tr class="no-border-bottom">
                  <td colspan="2" class="font-20 fw-bold tx-r">Total</td>
                  <td class="font-20 fw-bold">
                    ₦ {{ formatPrice(calculateTotal(orderDetailsData.items)) }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex-width-1-2-nr mt-1">
              <div>
                <h3 class="mb-2 big-text">Assigned Rider</h3>
                <div
                  class="text-img order-modal"
                  v-if="orderDetailsData.rider.id !== null"
                >
                  <div class="img-wrap">
                    <img
                      v-if="
                        orderDetailsData.rider.photo === '' ||
                        orderDetailsData.rider.photo === null
                      "
                      class="text-img__img round"
                      src="/default_image.png"
                      alt=""
                    />
                    <img
                      v-else
                      class="text-img__img round"
                      :src="orderDetailsData.rider.photo"
                      alt=""
                    />
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
                    <p>{{ orderDetailsData.rider.regnumber }}</p>
                  </div>
                </div>
                <div class="text-img order-modal" v-else>
                  <div class="img-wrap">
                    <img
                      class="text-img__img round"
                      src="/default_image.png"
                      alt=""
                    />
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
              <div></div>
            </div>
          </overlay-scrollbars>
        </div>
      </div>
    </div>
    <div class="inner-main-wrapper" v-if="loading">
      <ul>
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra"></div>
            <div class="gifts-card__title">
              Loading dashboard data...please wait
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="inner-main-wrapper" v-if="!loading && dashboard != null">
      <ul class="card-list none flex-width-1-3wgr">
        <li
          class="card-item box-deco-bg purple-box"
          style="border-top: 3px solid #5000b9"
        >
          <nuxt-link class="active" to="/orders/">
            <div class="card-item__header">
              <h3>Today’s Orders</h3>
              <!-- <svg style="fill: red">
                <use href="/uploads/list_alt_FILL1_wght400_GRAD0_opsz48.png"></use>
              </svg>              -->
              <img src="/uploads/order-icon.png" width="50px" alt="" />
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">{{ dashboard.todayorder }}</p>
              <p class="card-item__body--status">
                <span v-if="this.calcOrders > 0" class="co-success">
                  ↑ {{ this.calcOrders }}
                </span>
                <span v-if="this.calcOrders < 0" class="co-error">
                  ↓ {{ this.calcOrders }}
                </span>
                <span v-if="this.calcOrders === 0" class="co-error">
                  {{ this.calcOrders }}
                </span>
                <span v-if="this.calcOrders > 0"> More than yesterday </span>
                <span v-if="this.calcOrders < 0"> Less than yesterday </span>
                <span v-if="this.calcOrders === 0"> No Changes </span>
              </p>
            </div>
          </nuxt-link>
        </li>
        <li
          class="card-item box-deco-bg green-box"
          style="border-top: 3px solid forestgreen"
        >
          <nuxt-link class="active" to="/reports/delivery-revenue/">
            <div class="card-item__header">
              <h3>Today’s Revenue</h3>
              <!-- <svg style="color:#fff !important">
                <use href="/uploads/icons.svg#money-bag"></use>
              </svg> -->
              <img src="/uploads/revenue-icon.png" width="50px" alt="" />
            </div>
            <div class="card-item__body">
              <p
                v-if="dashboard.todayrevenue === null"
                class="card-item__body--count"
              >
                ₦0.00
              </p>
              <p class="card-item__body--count" v-else>
                ₦{{ formatPrice(dashboard.todayrevenue) }}
              </p>
              <p class="card-item__body--status">
                <span v-if="this.calcTodayNetRevenue < 0" class="co-error">
                  ↓
                  {{
                    this.formatNotificationData(
                      this.calcTodayNetRevenue
                    ).toFixed(2)
                  }}%
                </span>
                <span v-if="this.calcTodayNetRevenue > 0" class="co-success">
                  ↑
                  {{
                    this.formatNotificationData(
                      this.calcTodayNetRevenue
                    ).toFixed(2)
                  }}%
                </span>
                <span v-if="this.calcTodayNetRevenue === 0" class="co-success">
                  {{
                    this.formatNotificationData(
                      this.calcTodayNetRevenue
                    ).toFixed(2)
                  }}%
                </span>
                <span v-if="this.calcTodayNetRevenue < 0">
                  Less than yesterday
                </span>
                <span v-if="this.calcTodayNetRevenue > 0">
                  More than yesterday
                </span>
                <span v-if="this.calcTodayNetRevenue === 0"> No Changes </span>
              </p>
            </div>
          </nuxt-link>
        </li>
        <li
          class="card-item box-deco-bg grey-box"
          style="border-top: 3px solid #677277"
        >
          <nuxt-link class="active" to="/reports/delivery-revenue/">
            <div class="card-item__header">
              <h3>Revenue Month to Date</h3>
              <!-- <svg>
                <use href="/uploads/icons.svg#wallet"></use>
              </svg> -->
              <img src="/uploads/month-to-date-icon.png" width="50px" alt="" />
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">
                ₦{{ formatPrice(dashboard.currentweekrevenue) }}
              </p>
              <p class="card-item__body--status">
                <span
                  v-if="dashboard.currentweekorder > dashboard.lastweekorder"
                  class="co-success"
                >
                  ↑ Order up
                </span>
                <span
                  v-else-if="
                    (dashboard.lastweekorder != undefined ||
                      dashboard.lastweekorder != null) &&
                    dashboard.currentweekorder < dashboard.lastweekorder
                  "
                  class="co-error"
                >
                  ↓ Order down
                </span>
                <span v-else> No Changes </span>
              </p>
            </div>
          </nuxt-link>
        </li>
      </ul>
      <ul class="card-list none flex-width-1-3wgr">
        <li
          class="card-item box-deco-bg orange-box"
          style="border-top: 3px solid #ff8620"
        >
          <nuxt-link class="active" to="/customers/">
            <div class="card-item__header">
              <h3>Total Customers</h3>
              <!-- <svg style="color:#000">
                <use href="/uploads/icons.svg#staff"></use>
              </svg> -->
              <img
                src="/uploads/total-customers-icon.png"
                width="50px"
                alt=""
              />
            </div>
            <div class="card-item__body">
              <!-- <p class="card-item__body--count">{{ dashboard.todayorder }}</p> -->
              <p class="card-item__body--count">
                {{ formNumber(dashboard.totaluser) }}
              </p>
              <p class="card-item__body--status">
                <span
                  v-if="
                    dashboard.currentweektotalcustomer >
                    dashboard.lastweektotalcustomer
                  "
                  class="co-success"
                >
                  ↑ User up
                </span>
                <span
                  v-if="
                    dashboard.currentweektotalcustomer <
                    dashboard.lastweektotalcustomer
                  "
                  class="co-error"
                >
                  ↓ User down
                </span>
                <span
                  v-if="
                    dashboard.currentweektotalcustomer ===
                    dashboard.lastweektotalcustomer
                  "
                  class="co-success"
                >
                  No changes
                </span>
              </p>
            </div>
          </nuxt-link>
        </li>

        <li
          class="card-item box-deco-bg pink-box"
          style="border-top: 3px solid #d9229c"
        >
          <nuxt-link class="active" to="/riders/">
            <div class="card-item__header">
              <nuxt-link class="active" to="/riders/">
                <h3>Total Riders</h3>
              </nuxt-link>
              <!-- <svg>
                <use href="/uploads/icons.svg#rider"></use>
              </svg> -->
              <img src="/uploads/rider-icon.png" width="50px" alt="" />
            </div>
            <div class="card-item__body">
              <p class="card-item__body--count">
                {{ dashboard.totalrider }}
              </p>
            </div>
          </nuxt-link>
        </li>
        <li
          class="card-item box-deco-bg green-box"
          style="border-top: 3px solid forestgreen"
        >
          <div class="card-item__header">
            <h3>
              Total App Download
              <!--                <span>{{ this.currentWeekStart }} - {{ this.currentWeekEnd }}</span>-->
            </h3>
            <!-- <svg>
                <use href="/uploads/icons.svg#toq-file"></use>
              </svg> -->
            <img src="/uploads/app-download-icon.png" width="50px" alt="" />
          </div>
          <div class="card-item__body">
            <p class="card-item__body--count" style="margin-bottom: 25px">0</p>
            <!-- <p class="card-item__body--status">
                <span v-if="dashboard.currentweekorder > dashboard.lastweekorder" class="co-success">
                  ↑ Order up
                </span>
                <span v-else-if="(dashboard.lastweekorder != undefined || dashboard.lastweekorder != null) && dashboard.currentweekorder < dashboard.lastweekorder" class="co-error">
                  ↓ Order down
                </span>
                <span v-else class="co-success">
                  No Changes
                </span>
              </p> -->
          </div>
        </li>
      </ul>
      <section class="section-wrapper flex-width-1-2wgr" style="z-index: 1000">
        <div class="box-deco chart-container">
          <div class="d-flx-jsb">
            <nuxt-link class="active" to="/orders/">
              <h3 class="section-title">Ongoing Orders</h3>
            </nuxt-link>
          </div>
          <div class="over-flw-wrapper mt-3">
            <div class="inner-wrapper">
              <chartjs-doughnut
                :datasets="datasets"
                :labels="label"
                :option="options"
                :hoverOffset="hoverOffset"
              ></chartjs-doughnut>
            </div>
          </div>
        </div>
        <div class="box-deco chart-container">
          <div class="d-flx-jsb">
            <nuxt-link class="active" to="/riders/">
              <h3 class="section-title">Riders</h3>
            </nuxt-link>
            <div class=""></div>
          </div>
          <div class="over-flw-wrapper mt-3">
            <div class="inner-wrapper">
              <chartjs-bar
                :datasets="barDataset"
                :labels="barlabel"
              ></chartjs-bar>
            </div>
            <div style="margin-top: 16px; margin-left: 12px">
              <p><strong>Online: </strong> The rider is logged in.</p>
              <p><strong>Offline: </strong> The rider is logged out.</p>
              <p>
                <strong>Suspended: </strong> The rider has been suspended by the
                admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="flex-width-1-2wgr" style="margin-top: 15px">
        <div class="box-deco-bg card-wtable">
          <div class="table-wrapper">
            <div class="d-flx-alc-jsb card-wtable__title">
              <h3>Pending Orders</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order Code</th>
                  <th>Customer</th>
                  <th>Rider</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="OngoingOrders.length < 1">
                  <td colspan="3">No orders currently</td>
                </tr>
                <tr
                  v-if="OngoingOrders.length > 1"
                  v-for="order in OngoingOrders"
                  :key="order.id"
                >
                  <td style="color: forestgreen; font-weight: 600">
                    {{ order.ordercode }}
                  </td>
                  <td style="color: #353190">
                    {{ order.customername ? order.customername : "N/A" }}
                  </td>
                  <td v-if="order.riderID !== null">
                    {{ order.riderfirstname }} {{ order.riderlastname }}
                  </td>
                  <td else>N/A</td>
                  <td>
                    <span
                      :class="'status ' + order.orderstatus.toLowerCase()"
                      >{{
                        order.orderstatus.replace("_", " ").toUpperCase()
                      }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="box-deco-bg card-wtable">
          <div class="table-wrapper">
            <div class="d-flx-alc-jsb card-wtable__title">
              <h3>Active Riders</h3>
            </div>
            <table>
              <thead>
                <tr>
                  <th class="column-name">Name</th>

                  <th class="column-name">Branch</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="dashboard.riderreveue.length < 1">
                  <td colspan="3">No riders at the moment</td>
                </tr>
                <tr
                  v-if="
                    dashboard.riderreveue.length > 0 &&
                    rider.riderstatus != null &&
                    rider.riderstatus != ''
                  "
                  v-for="rider in dashboard.riderreveue"
                  :key="rider.riderID"
                >
                  <td class="column-name">
                    {{ rider.riderfirstname }} {{ rider.riderlastname }}
                  </td>
                  <td class="column-name">{{ rider.branchname }}</td>
                  <td v-if="rider.riderstatus == 'online'">
                    <span class="status completed">{{
                      rider.riderstatus.toUpperCase()
                    }}</span>
                  </td>
                  <td v-if="rider.riderstatus == 'offline'">
                    <span class="status cancel">{{
                      rider.riderstatus.toUpperCase()
                    }}</span>
                  </td>
                  <!-- <td class="column-name">{{ (rider.commissionrate__sum === null) ? formatPrice(0) : formatPrice(rider.commissionrate__sum) }}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <a @click="scrollTop" v-show="visible" class="bottom-right">
        <img src="/back_to_top.png" width="50px" height="50px" />
      </a>

      <section class="section-wrapper flex-width-1-1wgr" style="z-index: 1000">
        <div class="box-deco chart-container">
          <div class="d-flx-jsb">
            <h3 class="section-title">Monthly Sales Revenue</h3>
          </div>
          <div class="over-flw-wrapper mt-3">
            <div class="inner-wrapper">
              <chartjs-line
                :datasets="revenuedatasets"
                :labels="revenuelabel"
              ></chartjs-line>
            </div>
          </div>
        </div>
      </section>
      <section class="section-wrapper flex-width-1-1wgr" style="z-index: 1000">
        <div class="box-deco chart-container">
          <div class="d-flx-jsb">
            <h3 class="section-title">App Usage</h3>
          </div>
          <div class="over-flw-wrapper mt-3">
            <div class="inner-wrapper">
              <!-- <chartjs-line :datasets="linedatasets" :labels="linelabels"></chartjs-line> -->
              <chartjs-line
                :datasets="linedatasets"
                :labels="linelabels"
              ></chartjs-line>
            </div>
          </div>
        </div>
      </section>
    </div>
  </overlay-scrollbars>
</template>

<script>
export default {
  layout: "main",
  data: () => ({
    year: "",
    month: "",
    category: "",
    visible: false,
    loading: true,
    dashboard: {},
    calcWeekRevenue: "",
    calcOrders: "",
    calcTodayNetRevenue: "",
    currentWeekStart: "",
    currentWeekEnd: "",
    show: false,
    showdetails: "Show Details",
    formData: {
      merchID: "",
      branchID: "",
    },
    values: "",
    names: ["Current week revenue", "Last week revenue"],
    barNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    barValues: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    label: ["Pending", "Assigned", "In-Transit", "Completed"],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgb(80, 0, 185)",
          "rgb(255, 134, 32)",
          "rgb(217, 34, 156)",
          "rgb(29, 185, 84)",
        ],
      },
    ],
    hoverOffset: 4,
    options: {
      title: {
        aspectRatio: 1,
        display: false,
        position: "bottom",
        text: "Ongoing Orders Chart",
      },
    },
    barlabel: ["Online", "Offline", "Suspended"],
    barDataset: [
      {
        label: "Rider's Status",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
        ],
        borderWidth: 1,
        options: {
          scales: {
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
        },
      },
    ],
    linelabels: ["Jan", "Feb", "March", "April", "May", "June", "July"],
    linedatasets: [
      {
        label: "App Download",
        data: [0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
    revenuelabel: [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
    ],
    revenuedatasets: [
      {
        label: "Monthly Revenue",
        data: [],
        fill: false,
        borderColor: "rgb(255, 134, 32",
        tension: 0.1,
      },
    ],
    branches: [],
    max: "",
    orderDetailsData: {
      items: [],
      tax: 0,
      orderid: "",
      orderstatus: "",
      customername: "",
      customerphone: "",
      deliveryaddress: "",
      profilelink: "",
      deliverycharge: 0,
      rider: {
        id: "",
        phone: "",
        name: "",
        regnumber: "",
        photo: "",
      },
      staff: {
        photo: "",
        name: "",
        phone: "",
      },
    },
  }),
  computed: {
    riderreveue() {
      return this.dashboard.riderreveue;
    },
    OngoingOrders() {
      return this.dashboard.OngoingOrders;
    },
  },
  methods: {
    openModal() {
      this.show = true;
      this.showdetails = "Hide Details";
    },
    closeModal() {
      this.show = false;
      this.showdetails = "Show Details";
    },
    scrollTop: function () {
      this.intervalId = setInterval(() => {
        if (window.pageYOffset === 0) {
          clearInterval(this.intervalId);
        }
        window.scroll(0, window.pageYOffset - 50);
      }, 20);
    },
    scrollListener: function (e) {
      this.visible = window.scrollY > 3;
    },
    getDashboardData() {
      this.loading = true;

      let data = this.new_data;

      data.year = this.year;
      data.month = this.month;
      data.category = this.category;

      this.$store
        .dispatch("dashboard/getDashBoardData", data)
        .then((res) => {
          this.dashboard = res;
          this.calcTime();
          this.calculateCurrentWeekRevenue();
          this.calculateToOrders();
          this.calculateTodayNetRevenue();
          this.getOngoingOrderStat();
          this.getRiderStatus();
          this.getLineChart();
          // this.setPieChartValues()
          // this.setBarChartValues()
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          // console.log('error')
          // this.$router.push('/')
        });
    },
    calculateCurrentWeekRevenue() {
      let currentWeekRevenue = this.dashboard.currentweekrevenue;
      let lastWeekRevenue = this.dashboard.lastweekrevenue;
      let percentageIncrease = 0;
      let increase = 0;
      if (lastWeekRevenue > 0) {
        increase = +currentWeekRevenue - +lastWeekRevenue;
        percentageIncrease = (+increase / +lastWeekRevenue) * 100;
      }
      this.calcWeekRevenue = percentageIncrease;
    },
    calculateToOrders() {
      let todayOrder = this.dashboard.todayorder;
      let yesterdayOrder = this.dashboard.yesterdayorder;

      this.calcOrders = +todayOrder - +yesterdayOrder;
    },
    calculateTodayNetRevenue() {
      let todayRevenue =
        this.dashboard.todayrevenue === null ? 0 : this.dashboard.todayrevenue;
      let yesterdayRevenue =
        this.dashboard.yesterdayrevenue === null
          ? 0
          : this.dashboard.yesterdayrevenue;
      let percentageIncrease = 0;
      let increase = 0;
      if (yesterdayRevenue > 0) {
        increase = +todayRevenue - +yesterdayRevenue;
        percentageIncrease = (+increase / +yesterdayRevenue) * 100;
      }
      this.calcTodayNetRevenue = percentageIncrease;
    },
    getOngoingOrderStat() {
      let pending = this.dashboard.ongoingorderstat.ongoingorderpending;
      let assigned = this.dashboard.ongoingorderstat.ongoingorderassigned;
      let in_transit = this.dashboard.ongoingorderstat.ongoingorderintransit;
      let completed = this.dashboard.ongoingorderstat.ongoingordercompleted;
      this.datasets[0].data = [pending, assigned, in_transit, completed];
    },
    calculateCurrentWeekRevenue() {
      let currentWeekRevenue = this.dashboard.currentweekrevenue;
      let lastWeekRevenue = this.dashboard.lastweekrevenue;
      let percentageIncrease = 0;
      let increase = 0;
      if (lastWeekRevenue > 0) {
        increase = +currentWeekRevenue - +lastWeekRevenue;
        percentageIncrease = (+increase / +lastWeekRevenue) * 100;
      }
      this.calcWeekRevenue = percentageIncrease;
    },
    calculateToOrders() {
      let todayOrder = this.dashboard.todayorder;
      let yesterdayOrder = this.dashboard.yesterdayorder;

      this.calcOrders = +todayOrder - +yesterdayOrder;
    },
    calculateTodayNetRevenue() {
      let todayRevenue =
        this.dashboard.todayrevenue === null ? 0 : this.dashboard.todayrevenue;
      let yesterdayRevenue =
        this.dashboard.yesterdayrevenue === null
          ? 0
          : this.dashboard.yesterdayrevenue;
      let percentageIncrease = 0;
      let increase = 0;
      if (yesterdayRevenue > 0) {
        increase = +todayRevenue - +yesterdayRevenue;
        percentageIncrease = (+increase / +yesterdayRevenue) * 100;
      }
      this.calcTodayNetRevenue = percentageIncrease;
    },
    getOngoingOrderStat() {
      let pending = this.dashboard.ongoingorderstat.ongoingorderpending;
      let assigned = this.dashboard.ongoingorderstat.ongoingorderassigned;
      let in_transit = this.dashboard.ongoingorderstat.ongoingorderintransit;
      let completed = this.dashboard.ongoingorderstat.ongoingordercompleted;
      this.datasets[0].data = [pending, assigned, in_transit, completed];
    },
    getRiderStatus() {
      let active = this.dashboard.riderstatusdata.activerider.number_of_entry;
      let inactive =
        this.dashboard.riderstatusdata.inactiverider.number_of_entry;
      let suspended = this.dashboard.riderstatusdata.suspended.number_of_entry;
      this.barDataset[0].data = [active, inactive, suspended];
      // console.log(this.barDataset[0].data)
    },
    getLineChart() {
      this.revenuedatasets[0].data = this.dashboard.monthlysaleschart.values;
      this.revenuelabel = this.dashboard.monthlysaleschart.names;
    },
    calcTime() {
      let from_date = this.$moment().startOf("week");
      let end_date = this.$moment().endOf("week");
      this.currentWeekStart = this.$moment(from_date.toString()).format(
        "DD/MM"
      );
      this.currentWeekEnd = this.$moment(end_date.toString()).format("DD/MM");
    },
    setPieChartValues() {
      let currentWeekRevenue = this.removeFloat(
        this.dashboard.currentweekrevenue
      );
      let lastWeekRevenue = this.removeFloat(this.dashboard.lastweekrevenue);
      this.values = [currentWeekRevenue, lastWeekRevenue];
    },
    setBarChartValues() {
      let names = this.dashboard.chart.names;
      let values = this.dashboard.chart.values;
      if (names.length === 0) {
        this.barValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return;
      }

      this.max = values.reduce((acc, curr) => {
        curr = Number(curr);
        acc = Number(acc);
        if (curr > acc) {
          acc = curr;
        }

        return acc;
      }, 0);

      for (let i = 0; i < this.barNames.length; i++) {
        if (names[i] === "January") {
          this.barValues[0] = values[i];
        } else if (names[i] === "February") {
          this.barValues[1] = values[i];
        } else if (names[i] === "March") {
          this.barValues[2] = values[i];
        } else if (names[i] === "April") {
          this.barValues[3] = values[i];
        } else if (names[i] === "May") {
          this.barValues[4] = values[i];
        } else if (names[i] === "June") {
          this.barValues[5] = values[i];
        } else if (names[i] === "July") {
          this.barValues[6] = values[i];
        } else if (names[i] === "August") {
          this.barValues[7] = values[i];
        } else if (names[i] === "September") {
          this.barValues[8] = values[i];
        } else if (names[i] === "October") {
          this.barValues[9] = values[i];
        } else if (names[i] === "November") {
          this.barValues[10] = values[i];
        } else if (names[i] === "December") {
          this.barValues[11] = values[i];
        }
      }
    },
    listBranches() {
      this.$store
        .dispatch("branches/listBranches", this.formData.merchID)
        .then((res) => {
          this.branches = res.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    displayDetails(order) {
      this.clearOrderDetails();
      this.orderDetailsData = {
        items: order.orderitems,
        orderid: order.ordercode,
        tax: 0,
        orderstatus: order.orderstatus.replace("_", " "),
        customername: order.firstname + " " + order.lastname,
        customerphone: order.username,
        deliveryaddress: order.address,
        profilelink: order.profilelink,
        deliverycharge: order.deliverycharge,
        rider: {
          id: order.riderID,
          name: order.riderfirstname + " " + order.riderlastname,
          phone: order.riderphonenumber,
          regnumber: order.registrationnumber,
          photo: order.riderphoto,
        },
        staff: {
          name: order.staffname,
          photo: order.staffpic,
          // phone: ''
        },
      };
      UIkit.modal("#order-details").toggle();
    },
    clearOrderDetails() {
      this.orderDetailsData = {
        items: [],
        tax: 0,
        orderid: "",
        orderstatus: "",
        customername: "",
        customerphone: "",
        deliveryaddress: "",
        profilelink: "",
        deliverycharge: 0,
        rider: {
          id: "",
          phone: "",
          name: "",
          regnumber: "",
          photo: "",
        },
        staff: {
          photo: "",
          name: "",
          phone: "",
        },
      };
    },
    calculateSubTotal(items) {
      let sum = 0;
      items.forEach(function (value, index, array) {
        sum += value.totalprice;
      });
      return sum;
    },
    closeOrderDetails() {
      this.clearOrderDetails();
      UIkit.modal("#order-details").toggle("hide");
    },
    calculateTotal(items) {
      let total = 0;
      let sum = 0;
      items.forEach(function (value, index, array) {
        sum += value.totalprice;
      });
      let tax = 0;
      if (this.orderDetailsData.tax > 0) {
        tax = (this.orderDetailsData.tax / 100) * sum;
      }

      total = +sum + +tax + +this.orderDetailsData.deliverycharge;
      return total;
    },
  },
  mounted() {
    this.formData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.getDashboardData();
    this.listBranches();
    window.addEventListener("scroll", this.scrollListener);
  },
  beforeDestroy: function () {
    window.removeEventListener("scroll", this.scrollListener);
  },
};
</script>
<style scoped>
@media only screen and (min-width: 1030px) {
  .flex-width-1-2wgr > * {
    width: 48%;
  }
}

.material-symbols-outlined {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48;
}
/* li.box-deco-bg:hover{
  background:forestgreen;
} */

li.box-deco-bg.purple-box:hover {
  background: #5000b9;
  transition: 1s ease;
}

li.box-deco-bg.green-box:hover {
  background: forestgreen;
  transition: 1s ease;
}

li.box-deco-bg.grey-box:hover {
  background: #677277;
  transition: 1s ease;
}

li.box-deco-bg.orange-box:hover {
  background: #ff8620;
  transition: 1s ease;
}

li.box-deco-bg.pink-box:hover {
  transition: 1s ease;
  background: #d9229c;
}
li.box-deco-bg:hover p,
li.box-deco-bg:hover h3,
li.box-deco-bg:hover p span {
  transition: 1s ease;
  color: #fff !important;
}
.bottom-right {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100000;
  cursor: pointer;
}

.card-item__header {
  margin-bottom: 0 !important;
}
/* .card-item__header svg{
  width: 60px;
    height: 60px;
    
    position: relative;
    top: -35px;
} */
.card-item__header h3 span {
  display: block;
  font-family: "Source Sans Pro", sans-serif;
  color: #666d92;
  font-weight: 400;
  font-size: 1.7rem !important;
}
.card-item__header h3 {
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 1.7rem !important;
  color: #04014e;
}

.ordercode {
  font-size: 1.25rem !important;
}
button {
  background: lightgreen;
}
</style>
