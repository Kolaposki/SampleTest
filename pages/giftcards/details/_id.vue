<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <nuxt-link to="/giftcards/" class="text-link">
        <svg>
          <use href="/uploads/icons.svg#back"></use>
        </svg>
        <span class="ml-1 fw-bold co-grey">Back</span>
      </nuxt-link>

      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
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
        <table class="table-content ">
          <thead class="">
            <tr>
              <!-- <th>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </th> -->
              <th class="">Giftcard name</th>
              <th class="">Purchased by</th>
              <th class="">Quantity</th>
              <th class="">Unit price</th>
              <th class="">Total Price</th>
              <th class="">Creation date</th>
              <th class="">Expires</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr>
              <td colspan="8">No record at the moment</td>
            </tr>
<!--            <tr>-->
<!--              <td>-->
<!--                <label class="input-check">-->
<!--                  <input class="uk-checkbox" type="checkbox">-->
<!--                </label>-->
<!--              </td>-->
<!--              <td>Valentine</td>-->
<!--              <td>-->
<!--                <nuxt-link to="/customers/details/128391231" class="avatar-wtext">-->
<!--                  <img src="/uploads/food.png" alt="">-->
<!--                  <span>joseph kayode</span>-->
<!--                </nuxt-link>-->
<!--              </td>-->
<!--              <td>2</td>-->
<!--              <td >₦30,000</td>-->
<!--              <td>₦60,000</td>-->
<!--              <td>2/7/18</td>-->
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
