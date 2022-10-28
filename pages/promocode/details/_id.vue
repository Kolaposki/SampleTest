<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16">
        <nuxt-link to="/loyalty-rewards" class="text-link">
          <svg>
            <use href="/uploads/icons.svg#back"></use>
          </svg>
          <span class="ml-1 fw-bold co-grey">Back</span>
        </nuxt-link>
      </p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down page-drop">
          <button class="btn-text " type="button">
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
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content two-thead">
          <thead class="">
            <tr>
              <th>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </th>
              <th class="">Redeemed by</th>
              <th class="">Date redeemed</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr>
              <td colspan="3">No records at the moment</td>
            </tr>
<!--            <tr>-->
<!--              <td>-->
<!--                <label class="input-check">-->
<!--                  <input class="uk-checkbox" type="checkbox">-->
<!--                </label>-->
<!--              </td>-->
<!--              <td>-->
<!--                <div class="avatar-wtext">-->
<!--                  <img src="/uploads/food.png" alt="">-->
<!--                  <span>joseph kayode</span>-->
<!--                </div>-->
<!--              </td>-->
<!--              <td>2/7/18</td>-->
<!--            </tr>-->
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>

<script>
export default {
	layout: 'main'
}
</script>
