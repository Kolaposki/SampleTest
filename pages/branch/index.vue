<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <!-- d-flx-alc-jsb -->
        <label class="search-w-icon">
          <input type="text" v-model="search" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <button v-if="(user.rolepermission ? user.rolepermission[0].branch.addbranches:'') || isMerchant" class="btn btn--primary" type="button" @click="addBranch">
          Add new branch
        </button>
        
      </div>
    </div>

    <div id="parent-component">
      <div id="add-branch" uk-modal container="#parent-component" data-uk-modal="{target:'#add-branch',bgclose:false}">
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" @click="cancelAdd" type="button" uk-close></button>
            <div class="modal-header">
              <h2>Create Branch</h2>
              <p>Add your branch description and necessary information from here</p>
            </div>
            <form @submit.prevent="createBranch">
              <overlay-scrollbars class="modal-body" >
                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Branch name</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.branchname" placeholder="">
                    </div>
                    <span v-if="errorData.branchname" class="form-input__error-msg">Please enter a branch name</span>
                  </label>

                  <label  class="form-input">
                    <span class="form-input__label">Street address</span>
                    <div class="form-input__input">
                      <input id="map" type="text" @change="getAddAddress" v-model="formData.branchaddress" placeholder="">
                    </div>
                    <span v-if="errorData.branchaddress" class="form-input__error-msg">Please enter an address</span>
                  </label>
                </div>

                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">State</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.branchstate" placeholder="">
                    </div>
                    <span v-if="errorData.branchstate" class="form-input__error-msg">Please enter a state</span>
                  </label>

                  <label  class="form-input">
                    <span class="form-input__label">City</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.branchcity" placeholder="">
                    </div>
                    <span v-if="errorData.branchcity" class="form-input__error-msg">Please enter a city</span>
                  </label>
                </div>

                <div class="flex-width-1-1 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Telephone line <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                    <div class="form-input__input">
                      <input type="tel" pattern="^[0]\d{10}$" required v-model="formData.branchofficeline" placeholder="">
                    </div>
                    <span v-if="errorData.branchofficeline" class="form-input__error-msg">Please enter an office line</span>
                  </label>

                </div>

                <div class="form-input">
                  <span class="form-input__label">Open days</span>
                  <div class="radio-input-wrapper small-child">
                    <label class="form-input-checked-box">
                      <input type="checkbox" value="Monday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Mon</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="Tuesday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Tue</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="Wednesday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Wed</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="Thursday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Thu</span>
                    </label>
                    <label  class="form-input-checked-box">

                      <input type="checkbox" value="Friday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Fri</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="Saturday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Sat</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="Sunday" v-model="formData.openingdays" name="open-days">
                      <span class="form-input__label">Sun</span>
                    </label>
                  </div>
                  <span v-if="errorData.openingdays" class="form-input__error-msg">Please select opening days</span>
                </div>

                <div class="form-input flex-width-1-1 less-gp">
                  <span class="form-input__label">Delivery Type</span>
                  <div class="radio-input-wrapper small-child">
                    <label class="form-input-checked-box">
                      <input type="checkbox" value="true" v-model="formData.isdelivery">
                      <span class="form-input__label">Delivery</span>
                    </label>
                    <label  class="form-input-checked-box">
                      <input type="checkbox" value="true" v-model="formData.ispickup">
                      <span class="form-input__label">Pickup</span>
                    </label>
                  </div>
                </div>

                <div class="flex-width-1-2 ">
                  <label  class="form-input half">
                    <span class="form-input__label ">Time for receiving order</span>
                    <div class="form-input__input father_time">
<!--                      <input type="text" v-model="formData.openingtime" placeholder="">-->
                      <label class="form-input-checked-box time">
                        <select v-model="startReceive.hour">
                          <option value=''>--</option>
                          <option v-for="hour in hours" :key="hour.id" :value="hour.id">{{ hour.text }}</option>
                        </select>
                      </label>
                      :
                      <label class="form-input-checked-box time">
                        <select v-model="startReceive.min">
                          <option value=''>--</option>
                          <option v-for="min in minutes" :key="min.id" :value="min.id">{{ min.text }}</option>
                        </select>
                      </label>
                      :
                      <label class="form-input-checked-box time">
                        <select v-model="startReceive.day">
                          <option value=''>--</option>
                          <option value="am">AM</option>
                          <option value="pm">PM</option>
                        </select>
                      </label>
                    </div>
                    <span v-if="errorData.openingtime" class="form-input__error-msg">Please enter an opening time</span>
                  </label>

                  <label  class="form-input half">
                    <span class="form-input__label">Time to stop receiving orders</span>
                    <div class="form-input__input father_time">
<!--                      <input type="text" v-model="formData.closingtime" placeholder="">-->
                      <label class="form-input-checked-box time">
                        <select v-model="stopReceive.hour">
                          <option value=''>--</option>
                          <option v-for="hour in hours" :key="hour.id" :value="hour.id">{{ hour.text }}</option>
                        </select>
                      </label>
                      :
                      <label class="form-input-checked-box time">
                        <select v-model="stopReceive.min">
                          <option value=''>--</option>
                          <option v-for="min in minutes" :key="min.id" :value="min.id">{{ min.text }}</option>
                        </select>
                      </label>
                      :
                      <label class="form-input-checked-box time">
                        <select v-model="stopReceive.day">
                          <option value=''>--</option>
                          <option value="am">AM</option>
                          <option value="pm">PM</option>
                        </select>
                      </label>
                    </div>
                    <span v-if="errorData.closingtime" class="form-input__error-msg">Please enter a closing time</span>
                  </label>
                </div>
              </overlay-scrollbars>
              <div class="d-flx-alc-jfe mt-3">
                <button @click="cancelAdd" type="button" class="btn btn-no-fill">
                  Cancel
                </button>
                <button type="submit" id="submitBtn" class="btn btn--primary ml-1">
                  Create branch
                </button>
              </div>
            </form>
          </div>
        </div>
      <!-- Branch Reviews -->
      <div id="reviewsLoading" uk-modal container="#parent-component" data-uk-modal="{target:'#reviewsLoading',bgclose:false}">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <div class="modal-header small-svg">
            <div class="d-flx-alc-jsb">
              <h1>Loading...please wait</h1>
            </div>
          </div>
        </div>
      </div>
      <div id="reviews" uk-modal container="#parent-component" data-uk-modal="{target:'#reviews',bgclose:false}">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close @click="closeReview"></button>
          <div class="modal-header small-svg">
            <div class="d-flx-alc-jsb">
              <div class="d-flx-alc">
                <h2>Reviews</h2>
                <div class="review ml-1h">
                  <p>
                    <svg>
                      <use xlink:href="/uploads/icons.svg#star"></use>
                    </svg>
                    <span>{{formatNumber(reviewRate) }}</span>    
                                    
                  </p>
                  <p>
                    <span>({{reviewData.length}})</span>
                  </p>
                </div>
              </div>
              <!-- <div class="drop-down filter-drop">
                <select @change="changeReview($event)" class="filter-btn box-deco-smallr">
                  <option value="">Select Branch</option>
                  <option v-for="branch in branches" :key="branch.id" :value="branch.id">{{ branch.branchname }}</option>
                </select>
              </div> -->
            </div>
          </div>
          <ul class="modal-body my-0" uk-overflow-auto>
            <li v-if="reviewLoading">
              <div class="review-item__title">
                <h3>Loading....please wait</h3>
              </div>
            </li>
            <li v-if="!reviewLoading && reviewData.length < 1">
              <div class="review-item__title">
                <h3>No reviews for the selected branch</h3>
              </div>
            </li>
            <li class="review-item" v-if="!reviewLoading && reviewData.length > 0" v-for="review in reviewData" :key="review.id">
              <div class="review-item__title">
                <img v-if="review.profilelink === '' || review.profilelink === null || review.profilelink === 'http://68.65.121.57:8080/'" src="/default_image.png" alt="">
                <img v-else-if="review.profilelink.includes('http://') && review.profilelink.includes('https://')" :src="review.profilelink.replace('http://68.65.121.57:8080/', '')" alt="">
                <img v-else :src="review.profilelink" alt="">
                <h3 v-if="review.customerID === null">
                  N/A
                </h3>
                <h3 v-else>
                  {{review.firstname}} {{review.lastname}}
                </h3>
                <p>
                  <span>{{ review.rate }}</span>
                  <svg>
                    <use xlink:href="/uploads/icons.svg#star"></use>
                  </svg>
                </p>
              </div>
              <p class="review-item__review">{{ review.comment }}</p>
              <p class="review-item__time">
                Published {{ $moment(review.created_at).fromNow() }}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!-- Delete modal -->
      
      <div id="delete-text" uk-modal container="#parent-component" data-uk-modal="{target:'#delete-text',bgclose:false}" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" @click="cancelDelete" type="button">X</button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Remove Branch ?</h2>
              <p>Please confirm you really want to delete this store, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button @click="doDelete" id="deleteBranch" class="btn btn-error ml-2">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    
      <!--- Edit branch -->
    <div id="edit-branch" uk-modal container="#parent-component" data-uk-modal="{target:'#edit-branch',bgclose:false}" >
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default"  @click="cancelEdit" type="button">X</button>
        <div class="modal-header">
          <h2>Update Branch</h2>
          <p>Add your branch description and necessary information from here</p>
        </div>
        <form @submit.prevent="updateBranch">
          <overlay-scrollbars class="modal-body" >
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Branch Name</span>
                <div class="form-input__input">
                  <input type="text" v-model="editData.branchname" placeholder="">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Street Address</span>
                <div class="form-input__input">
                  <input type="text" @change="getEditAddress" v-model="editData.branchaddress" placeholder="">
                </div>
              </label>
            </div>

            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">State</span>
                <div class="form-input__input">
                  <input type="text" v-model="editData.branchstate" placeholder="">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">City</span>
                <div class="form-input__input">
                  <input type="text" v-model="editData.branchcity" placeholder="">
                </div>
              </label>
            </div>

            <div class="flex-width-1-1 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Telephone Line <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                <div class="form-input__input">
                  <input type="tel" pattern="^[0]\d{10}$" required  v-model="editData.branchofficeline" placeholder="">
                </div>
              </label>
            </div>

            <div class="form-input">
              <span class="form-input__label">Open days</span>
              <div class="radio-input-wrapper small-child">
                <label class="form-input-checked-box">
                  <input type="checkbox" value="Monday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Mon</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Tuesday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Tue</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Wednesday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Wed</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Thursday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Thu</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Friday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Fri</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Saturday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Sat</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="Sunday" v-model="editData.openingdays" name="open-days">
                  <span class="form-input__label">Sun</span>
                </label>
              </div>
            </div>

            <div class="form-input flex-width-1-1 less-gp">
              <span class="form-input__label">Delivery Type</span>
              <div class="radio-input-wrapper small-child">
                <label class="form-input-checked-box">
                  <input type="checkbox" value="true" v-model="editData.isdelivery">
                  <span class="form-input__label">Delivery</span>
                </label>
                <label  class="form-input-checked-box">
                  <input type="checkbox" value="true" v-model="editData.ispickup">
                  <span class="form-input__label">Pickup</span>
                </label>
              </div>
            </div>

            <div class="flex-width-1-2 less-gp">
              <label  class="form-input half">
                <span class="form-input__label">Time to start receiving orders</span>
                <div class="form-input__input father_time">
<!--                  <input type="text" v-model="editData.openingtime" placeholder="">-->
                  <label class="form-input-checked-box time">
                    <select v-model="editStartReceive.hour">
                      <option value=''>--</option>
                      <option v-for="hour in hours" :key="hour.id" :value="hour.id">{{ hour.text }}</option>
                    </select>
                  </label>
                  :
                  <label class="form-input-checked-box time">
                    <select v-model="editStartReceive.min">
                      <option value=''>--</option>
                      <option v-for="min in minutes" :key="min.id" :value="min.id">{{ min.text }}</option>
                    </select>
                  </label>
                  :
                  <label class="form-input-checked-box time">
                    <select v-model="editStartReceive.day">
                      <option value=''>--</option>
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </select>
                  </label>
                </div>
              </label>

              <label  class="form-input half">
                <span class="form-input__label">Time to stop receiving orders</span>
                <div class="form-input__input father_time">
<!--                  <input type="text" v-model="editData.closingtime" placeholder="">-->
                  <label class="form-input-checked-box time">
                    <select v-model="editStopReceive.hour">
                      <option value=''>--</option>
                      <option v-for="hour in hours" :key="hour.id" :value="hour.id">{{ hour.text }}</option>
                    </select>
                  </label>
                  :
                  <label class="form-input-checked-box time">
                    <select v-model="editStopReceive.min">
                      <option value=''>--</option>
                      <option v-for="min in minutes" :key="min.id" :value="min.id">{{ min.text }}</option>
                    </select>
                  </label>
                  :
                  <label class="form-input-checked-box time">
                    <select v-model="editStopReceive.day">
                      <option value=''>--</option>
                      <option value="am">AM</option>
                      <option value="pm">PM</option>
                    </select>
                  </label>
                </div>
              </label>
            </div>
          </overlay-scrollbars >
          <div class="d-flx-alc-jfe mt-3">
            <button type="submit" id="updateBtn" class="btn btn--primary ml-1">
              Update branch
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- Edit branch end here -->
    <!--- Delivery fee starts here -->
    <div id="delivery-fee" uk-modal container="#parent-component" data-uk-modal="{target:'#delivery-fee',bgclose:false}">
      <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>Delivery Fee</h2>
          <p>View/Update delivery fees</p>
        </div>
        <!-- <div class="modal-body" uk-overflow-auto> -->
          <overlay-scrollbars class="modal-body"  >
          <table class="table-content">
            <thead class="">
              <tr>                
                <th class="larger-space">Delivery Fee Type</th>
                <th v-if="isCourierService" class="">Delivery Type</th>
				<th class="">Start distance</th>
                <th class="">End distance</th>
                <th class="">Amount (₦)</th>
                <th class="">Flat Fee (₦)</th>
                <th class="column-name">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="fees.length < 1">
                <td colspan="8">No delivery fees at the moment</td>
              </tr>
              <tr v-if="fees.length > 0" v-for="fee in fees" :key="fee.id">
                
                <td v-if="fee.isdistancebased">Distance based</td>
                <td v-if="fee.isweightbased">Weight based</td>
                <td v-if="fee.isflatbased">Flat rate based</td>
                <td v-if="isCourierService">{{ fee.deliverymethod  }}</td>
				<td>{{ (fee.startdistance) ? fee.startdistance : 'N/A' }}</td>
                <td>{{ (fee.enddistance) ? fee.enddistance : 'N/A' }}</td>
                <td>{{ formatPrice(fee.amount) }}</td>
                <td>{{ formatPrice(fee.flatfee) }}</td>
                <td class="column-name">
                    <button class="btn btn--primary" type="button" @click="editDeliveryFee(fee)">
                      Edit
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
          </overlay-scrollbars>
        <!-- </div> -->
      </div>
    </div>
    <!-- Delivery fee ends here -->
    <!-- Edit delivery fee -->
    <div id="edit-delivery-fee" data-uk-modal="{target:'#edit-delivery-fee',bgclose:false}" uk-modal container="#parent-component">
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="modal-header">
          <h2>Edit Delivery Fee</h2>
          <p>Enter detail to edit delivery fee information</p>
        </div>
        <!-- <div class="modal-body" uk-overflow-auto> -->
          <overlay-scrollbars class="modal-body" >
          <form @submit.prevent="updateDeliveryFee">
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Delivery Fee type</span>
                <div class="form-input__input">
                  <Select2 v-model="editFeeData.deliverytype" @select="mySelectEvent($event)" :options="options" />
                </div>
              </label>

              <label v-if="isCourierService" class="form-input">
                <span class="form-input__label">Delivery Type</span>
                <div class="form-input__input">
                <Select2 v-model="editFeeData.deliverymethod" :options="courierOptions" />
                </div>
              </label>

              <label v-if="editFeeData.amountDiv"  class="form-input">
                <span class="form-input__label">Amount</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.amount" type="number">
                </div>
              </label>

              <label v-if="editFeeData.flatFeeDiv"  class="form-input">
                <span class="form-input__label">Flat fee</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.flatfee" type="number">
                </div>
              </label>
            </div>
            <div  class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start distance</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.startdistance" type="number">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End distance</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.enddistance" type="number">
                </div>
              </label>
            </div>
            <div  class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Minimum Weight</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.minweight" type="number">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Maximum Weight</span>
                <div class="form-input__input">
                  <input v-model="editFeeData.maxweight" type="number">
                </div>
              </label>
            </div>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateDeliveryBtn" type="submit" class="btn btn--primary ml-1">
                Update
              </button>
            </div>
          </form>
          </overlay-scrollbars>
        <!-- </div> -->
      </div>
    </div>
    <!-- End edit delivery fee -->
    </div>

    <div class="inner-main-wrapper">
      <ul v-if="loading">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              Loading...please wait
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="!loading && filteredList.length < 1">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra">
            </div>
            <div class="gifts-card__title">
              No record at the moment
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="!loading && filteredList.length > 0" class="grid mostly-4-fill">
        <li class="card box-deco-bg" v-for="(row, ix) in filteredList" v-bind:key="ix">
          <div class="drop-down org-drop drop-set">
            <button class="btn btn-icon drop-set" type="button" @click.stop="toggleDropdown($event)">
              <svg class="drop-set">
                <use xlink:href="/uploads/icons.svg#more"></use>
              </svg>
            </button>
            <div class="drop-wrapper" data-drop-down>
              <ul class="drop-lists" style="cursor: pointer">
                <li class="drop-list-item" @click="displayReviews(row)"  v-if="(user.rolepermission ? user.rolepermission[0].branch.viewreviews:'') || isMerchant">
                  View Reviews
                </li>                
                <li class="drop-list-item" @click="editBranch(row)" v-if="(user.rolepermission ? user.rolepermission[0].branch.editbranch:'') || isMerchant">
                  Edit Branch
                </li>
                <li class="drop-list-item" @click="deleteBranch(row)" v-if="(user.rolepermission ? user.rolepermission[0].branch.deletebranch:'') || isMerchant">
                  Delete Branch
                </li>
              </ul>
            </div>
          </div>

          <div class="card__body">
            
            <div class="card__body--content">
              <h3>{{ row.branchname }}</h3>
              <!-- <p>
                {{ row.branchaddress }}
              </p> -->
              <div class="review tiny">
                <p>                  
                  <svg>
                    <use xlink:href="/uploads/icons.svg#star"></use>
                  </svg>
                  <span>{{ (row.branchrating)}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="card__footer">
            <!-- <button class="btn btn--primary" :id="'perfButton'+row.id" uk-toggle="target: #store-performance" @click="getBranchPerformance(row)">View store performance</button> -->
            <button class="btn btn--primary" v-if="(user.rolepermission ? user.rolepermission[0].branch.createdeliveryfee:'') || isMerchant" @click="createDeliveryFee(row)">Create delivery fee</button>
            <button class="btn btn-no-fill" v-if="(user.rolepermission ? user.rolepermission[0].branch.viewdeliveryfee:'') || isMerchant" :id="'viewDeliveryBtn' + row.id" @click="viewDeliveryFees(row)">View delivery fees</button>
          </div>
        </li>
      </ul>      
    </div>    
  </overlay-scrollbars>
</template>
<style scoped>

.review span{
  margin-left: 6px;
}

.btn--primary{
    background-color: #089628;
    color: #fff;
    min-width: 10px !important;
}
.btn--danger{
   background-color: #dc3545;
   color: #fff;
   min-width: 10px !important;

}
.btn {
	 padding: 0.6rem 1.2rem;
}
</style>
<script>
export default {
	layout: 'main',
	computed: {
		isCourierService () { 
			 return this.userData.businessdescription.toLowerCase().includes('delivery')
		},

		userData () {
			return this.$store.getters['authenticate/getUserData'];
		},
		filteredList () {
			return this.branches.filter(branch => {
        
				if (branch.branchname.toLowerCase().includes(this.search.toLowerCase())) {
					return branch.branchname !== null && branch.branchname.toLowerCase().includes(this.search.toLowerCase());
				}
				// else if (branch.branchcity.toLowerCase().includes(this.search.toLowerCase())) {
				// 	return branch.branchcity !== null && branch.branchcity.toLowerCase().includes(this.search.toLowerCase());
				// }
				else {
					return branch.branchstate !== null && branch.branchstate.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		courierOptions: [
			{id: 'pool', text: 'Pool'},
			{id: 'express', text: 'Express'}
		],
		search: '',
		loading: true,
		fLoading: true,
		branches: [],
		delivery: [{
			deliveryarea: '',
			deliveryfee: ''
		}],
		startReceive: {
		  hour: '',
			min: '',
			day: ''
		},
		stopReceive: {
			hour: '',
			min: '',
			day: ''
		},
		editStartReceive: {
			hour: '',
			min: '',
			day: ''
		},
		editStopReceive: {
			hour: '',
			min: '',
			day: ''
		},
		formData: {
		  merchID: '',
			branchname: '',
			branchaddress: '',
			branchstate: '',
			branchcity: '',
			branchofficeline: '',
			branchimage: '',
			openingdays: [],
			openingtime: '',
			closingtime: '',
			deliveryarea: [],
			longitude: '',
			latitude: '',
			isdelivery: '',
			ispickup: ''
		},
		errorData: {
			branchname: false,
			branchaddress: false,
			branchstate: false,
			branchcity: false,
			branchofficeline: false,
			branchimage: false,
			openingdays: false,
			openingtime: false,
			closingtime: false,
			deliveryarea: false
		},
		editData: {
		  id: '',
		  merchID: '',
			branchname: '',
			branchaddress: '',
			branchstate: '',
			branchcity: '',
			branchofficeline: '',
			branchimage: '',
			openingdays: [],
			openingtime: '',
			closingtime: '',
			deliveryarea: [],
			longitude: '',
			latitude: '',
			isdelivery: '',
			ispickup: ''
		},
		performanceData: {
		  merchID: '',
			reporttype: 'performance',
			branchID: ''
		},
		perfData: {
		  orders: [],
			todayOrder: 0,
			todayOrderPercentage: 0,
			todayRevenue: 0,
			todayRevenuePercentage: 0,
			currentWeekOrder: 0,
			currentWeekPercentage: 0,
			currentWeekRevenue: 0,
			currentWeekRevenuePerc: 0
		},
		feeData: {
		  merchID: '',
			branchID: ''
		},
		fees: [],
		options: [
			{id: 'isdistancebased', text: 'Distance based'},
			{id: 'isweightbased', text: 'Weight based'},
			{id: 'isflatbased', text: 'Flat rate based'}
		],
		editFeeData: {
		  id: '',
			startdistance: 0,
			enddistance: 0,
			minweight: 0,
			maxweight: 0,
			amount: 0,
			flatfee: 0,
			deliverymethod: '',
			deliverytype: '',
			isdistancebased: false,
			isweightbased: false,
			isflatbased: false,
			amountDiv: true,
			flatFeeDiv: false
		},
		pLoading: true,
		currentWeeksOrder: '',
		lastWeeksOrder: '',
		currentWeekStart: '',
		currentWeekEnd: '',
		address: '',
		resultData: '',
		reviewData: [],
		reviewLoading: false,
		reviewRate: 0,
		deleteData: {
		  id: ''
		},
		autocomplete: '',
		hours: [
			{id: '01', text: '01'},
			{id: '02', text: '02'},
			{id: '03', text: '03'},
			{id: '04', text: '04'},
			{id: '05', text: '05'},
			{id: '06', text: '06'},
			{id: '07', text: '07'},
			{id: '08', text: '08'},
			{id: '09', text: '09'},
			{id: '10', text: '10'},
			{id: '11', text: '11'},
			{id: '12', text: '12'}
		],
		minutes: [],
		geoCode: {
		  longitude: '', // 6.458985,
			latitude: '' //3.601521
		}
	}),
	methods: {
    formatNumber: (number) => {
			var nf = new Intl.NumberFormat()
			// return this.formNumber(number)
			return nf.format(number);
		},
		validateAddBranch() {
		  this.clearErrorData()
    

			if(this.formData.branchname === ''){
			  this.errorData.branchname = true
				return true
			}

			if(this.formData.branchaddress === ''){
			  this.errorData.branchaddress = true
				return true
			}

			if(this.formData.branchstate === ''){
			  this.errorData.branchstate = true
				return true
			}

			if(this.formData.branchcity === ''){
			  this.errorData.branchcity = true
				return true
			}

			if(this.formData.branchofficeline === ''){
			  this.errorData.branchofficeline = true
				return true
			}

			if(this.formData.openingdays.length < 1) {
			  this.errorData.openingdays = true
				return true
			}

			if(this.startReceive.hour === '' || this.startReceive.min === '' || this.startReceive.day === ''){
			  this.errorData.openingtime = true
				return true
			}
			
			if(this.stopReceive.hour === '' || this.stopReceive.min === '' || this.stopReceive.day === '') {
			  this.errorData.closingtime = true
				return true
			}

			return false
		},
		generateMinutes() {
		  let min = []
			for(let i = 0; i <= 60; i++) {
				let id;
				if(i < 10) {
					id = '0'+i
				}else{
					id = i
				}
				let data = {
					id: id,
					text: id
				}
				min.push(data)
			}
			this.minutes = min
		},
	  createBranch() {

		  if(this.validateAddBranch()) {
		    return
			}
	    //get longitude and latitude
			// let image = ''
			// if(this.$refs.file.files.length > 0) {
			// 	image = this.$refs.file.files[0]
			// }
			
			if(this.geoCode.longitude === '' || this.geoCode.latitude === '') {
			  this.$toast.error('Address coordinates could not be found. Please enter a valid address with city and state')
				return
			}

			this.formData.openingtime = this.startReceive.hour + ':' + this.startReceive.min + this.startReceive.day
			this.formData.closingtime = this.stopReceive.hour + ':' + this.stopReceive.min + this.stopReceive.day
			this.formData.longitude = this.geoCode.longitude
			this.formData.latitude = this.geoCode.latitude

      
			let data = new FormData()
			data.append('merchID', this.formData.merchID)
			data.append('branchname', this.formData.branchname)
			data.append('branchaddress', this.formData.branchaddress)
			data.append('branchstate', this.formData.branchstate)
			data.append('branchcity', this.formData.branchcity)
			data.append('branchofficeline', this.formData.branchofficeline)
			// if(this.$refs.file.files.length > 0) {
			// 	data.append('branchimage', image)
			// }
			data.append('openingdays', JSON.stringify(this.formData.openingdays))
			data.append('openingtime', this.formData.openingtime)
			data.append('closingtime', this.formData.closingtime)
			data.append('deliveryarea', JSON.stringify(this.formData.deliveryarea))
			data.append('longitude', this.formData.longitude)
			data.append('latitude', this.formData.latitude)
			data.append('isdelivery', this.formData.isdelivery)
			data.append('ispickup', this.formData.ispickup)

			$('#submitBtn').attr('disabled', true).html('Creating...please wait')
	    this.$store.dispatch('branches/addBranch', data)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('Create branch');
				  if(res.data.status) {
				    this.$toast.success(res.data.message)
						this.listBranches()
						this.cancelAdd()
						return
					}

				  this.$toast.error(res.data.message)
				}).catch(err =>{
					this.$toast.error('An error occurred')
					$('#submitBtn').attr('disabled', false).html('Create branch');
				})
		},
		deleteBranch(branch) {
			this.deleteData.id = branch.id
			$('#delete-text').addClass('uk-open').show();
		},
		cancelDelete() {
		  this.deleteData = {
		    id: ''
			}
			$('#delete-text').removeClass('uk-open').hide();
		},
		doDelete() {
		  $('#deleteBranch').attr('disabled', true).html('Deleting..please wait')
			this.$store.dispatch('branches/deleteBranch', this.deleteData)
				.then(res =>{
					$('#deleteBranch').attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listBranches()
						this.cancelDelete()
						return
					}

					this.$toast.error('An error occurred and the process was terminated')
				}).catch(err =>{
					$('#deleteBranch').attr('disabled', false).html('Delete')
				})
		},
		clearErrorData() {
		  this.errorData = {
				branchname: false,
				branchaddress: false,
				branchstate: false,
				branchcity: false,
				branchofficeline: false,
				branchimage: false,
				openingdays: false,
				openingtime: false,
				closingtime: false,
				deliveryarea: false
			}
		},
		updateBranch() {
		  // let image = ''
			// if(this.$refs.editFile.files.length > 0) {
			// 	image = this.$refs.editFile.files[0]
			// }
			
			// if(this.geoCode.longitude === '' || this.geoCode.latitude === '') {
			//   this.$toast.error('Address coordinates not set. Please enter a valid address')
			// 	return
			// }

			this.editData.openingtime = this.editStartReceive.hour + ':' + this.editStartReceive.min + this.editStartReceive.day
			this.editData.closingtime = this.editStopReceive.hour + ':' + this.editStopReceive.min + this.editStopReceive.day
			this.editData.longitude = this.geoCode.longitude
			this.editData.latitude = this.geoCode.latitude
      
			let data = new FormData()
			data.append('id', this.editData.id)
			data.append('merchID', this.editData.merchID)
			data.append('branchname', this.editData.branchname)
			data.append('branchaddress', this.editData.branchaddress)
			data.append('branchstate', this.editData.branchstate)
			data.append('branchcity', this.editData.branchcity)
			data.append('branchofficeline', this.editData.branchofficeline)
			// if(this.$refs.editFile.files.length > 0) {
			// 	data.append('branchimage', image)
			// }
			data.append('openingdays', JSON.stringify(this.editData.openingdays))
			data.append('openingtime', this.editData.openingtime)
			data.append('closingtime', this.editData.closingtime)
			data.append('deliveryarea', JSON.stringify(this.editData.deliveryarea))
			data.append('longitude', this.editData.longitude)
			data.append('latitude', this.editData.latitude)
			data.append('isdelivery', this.editData.isdelivery)
			data.append('ispickup', this.editData.ispickup)

			$('#updateBtn').attr('disabled', true).html('Updating..please wait');
	    this.$store.dispatch('branches/updateBranch', data)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('Update branch');
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listBranches()
						this.cancelEdit()
						// $('#edit-branch').removeClass('uk-open').hide();
						UIkit.modal('#edit-branch').toggle('hide')
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(err =>{
					$('#updateBtn').attr('disabled', false).html('Update branch');
				})
		},
	  listBranches() {
	    this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res => {
				  this.loading = false
					this.branches = res.data.data
				}).catch(e =>{
				})
		},
		mySelectEvent({id, text}) {
			if(id === 'isdistancebased') {
				this.editFeeData.isdistancebased = true
				this.editFeeData.isweightbased = false
				this.editFeeData.isflatbased = false
				this.editFeeData.amountDiv = true
				this.editFeeData.flatFeeDiv = false
			}else if(id === 'isweightbased'){
				this.editFeeData.isdistancebased = false
				this.editFeeData.isweightbased = true
				this.editFeeData.isflatbased = false
				this.editFeeData.amountDiv = true
				this.editFeeData.flatFeeDiv = false
			}else {
				this.editFeeData.isdistancebased = false
				this.editFeeData.isweightbased = false
				this.editFeeData.isflatbased = true
				this.editFeeData.amountDiv = false
				this.editFeeData.flatFeeDiv = true
			}
		},
		editDeliveryFee(fee) {
			this.editFeeData = {
				id: fee.id,
				minweight: fee.minweight,
				startdistance: fee.startdistance,
				enddistance: fee.enddistance,
				maxweight: fee.maxweight,
				deliverymethod : '',
				amount: fee.amount,
				flatfee: fee.flatfee,
			}
      
			if(this.isCourierService) {
				this.editFeeData.deliverymethod = fee.deliverymethod
			}

			if(fee.isdistancebased) {
				this.editFeeData.isdistancebased = true
				this.editFeeData.isweightbased = false
				this.editFeeData.isflatbased = false
				this.editFeeData.amountDiv = true
				this.editFeeData.flatFeeDiv = false
				this.editFeeData.deliverytype = 'isdistancebased'
			}else if(fee.isweightbased){
				this.editFeeData.isdistancebased = false
				this.editFeeData.isweightbased = true
				this.editFeeData.isflatbased = false
				this.editFeeData.amountDiv = true
				this.editFeeData.flatFeeDiv = false
				this.editFeeData.deliverytype = 'isweightbased'
			}else if(fee.isflatbased){
				this.editFeeData.isdistancebased = false
				this.editFeeData.isweightbased = false
				this.editFeeData.isflatbased = true
				this.editFeeData.amountDiv = false
				this.editFeeData.flatFeeDiv = true
				this.editFeeData.deliverytype = 'isflatbased'
			}
      
			// $('#edit-delivery-fee').addClass('uk-open').show();
			UIkit.modal('#edit-delivery-fee').toggle()
		},
		closeEditDeliveryFee() {
			this.editFeeData = {
				id: '',
				startdistance: 0,
				enddistance: 0,
				minweight: 0,
				maxweight: 0,
				amount: 0,
				flatfee: 0,
				deliverytype: '',
				deliverymethod: '',
				isdistancebased: false,
				isweightbased: false,
				isflatbased: false,
				amountDiv: true,
				flatFeeDiv: false
			}
			// $('#edit-delivery-fee').removeClass('uk-open').hide();
			UIkit.modal('#edit-delivery-fee').toggle('hide')
		},
		updateDeliveryFee() {
			$('#updateDeliveryBtn').attr('disabled', true).html('Updating...please wait')
			this.$store.dispatch('branches/updateDeliveryFee', this.editFeeData)
				.then(res =>{
					$('#updateDeliveryBtn').attr('disabled', false).html('+ Update')
					if(res.data.status) {
						UIkit.modal('#delivery-fee').toggle('hide')
						// $('#delivery-fee').removeClass('uk-open').hide();
						this.$toast.success(res.data.message)
						this.closeEditDeliveryFee()

						let data = {
						  merchID: this.feeData.merchID,
							id: this.feeData.branchID
						}
						this.viewDeliveryFees(data)
						return
					}
				}).catch(err =>{
					$('#updateDeliveryBtn').attr('disabled', false).html('+ Update')
					this.$toast.error('An error occurred')
				})
		},
		editBranch(branch) {

		  let openingdays = this.formOpeningDaysArray(branch.openingdays)
      if (branch.openingtime !== null){
        	let startTime = branch.openingtime
          let startSplit = startTime.split(':')
          let startMin = startSplit[1].substring(0, 2)
          let startDay = startSplit[1].slice(-2)
          this.editStartReceive = {
            hour: startSplit[0],
            min: startMin,
            day: startDay
          }
          
          let endTime = branch.closingtime
          let endSplit = endTime.split(':')
          let endMin = endSplit[1].substring(0, 2)
          let endDay = endSplit[1].slice(-2)
          this.editStopReceive = {
            hour: endSplit[0],
            min: endMin,
            day: endDay
			}
      }
			
			/* this.getEditAddress(branch.branchaddress) */
      

			this.editData = {
	      id: branch.id,
				merchID: branch.merchID,
				branchname: branch.branchname,
				branchaddress: branch.branchaddress,
				branchstate: branch.branchstate,
				branchcity: branch.branchcity,
				branchofficeline: branch.branchofficeline,
				branchimage: '',
				openingdays: openingdays,
				openingtime: branch.openingtime,
				closingtime: branch.closingtime,
				deliveryarea: [],
				longitude: branch.longitude,
				latitude: branch.latitude,
				isdelivery: branch.isdelivery,
				ispickup: branch.ispickup
			}
			// $('#edit-branch').addClass('uk-open').show();
		  UIkit.modal('#edit-branch').show()
		},
		formOpeningDaysArray(data) {
      if(data !== null){
        let split = []
        let matches = data.match(/\[(.*?)\]/)
        if (matches) {
          let removeSingle = matches[1].replace(/\'/g, "")
          split = removeSingle.split(', ')
        }
        return split
      }
		  
		},
		cancelEdit() {
			this.editData = {
			  id: '',
				branchname: '',
				branchaddress: '',
				branchstate: '',
				branchcity: '',
				branchofficeline: '',
				branchimage: '',
				openingdays: [],
				openingtime: '',
				closingtime: '',
				deliveryarea: [],
				longitude: '',
				latitude: '',
				isdelivery: false,
				ispickup: false
			}
			// $('#edit-branch').removeClass('uk-open').hide();
			UIkit.modal('#edit-branch').hide()
		},
		displayReviews(branch) {
		  this.reviewLoading = true
			let data = {
				merchID: branch.merchID,
				branchID: branch.id
			}
			this.$store.dispatch('branches/getBranchReviews', data)
				.then(res =>{
					if(res.data.status) {
						this.reviewData = res.data.data
						this.reviewRate = res.data.totalrate
						this.reviewLoading = false
						$('#reviews').addClass('uk-open').show()
						return
					}

					this.reviewLoading = false
					this.$toast.error('An error occurred!')
				}).catch(err =>{
				  this.$toast.error('An error occurred and the operation was terminated')
					this.reviewLoading = false
					console.log(err)
				})
		},
		changeReview(e) {
		  if(e.target.value === '') {
		    this.$toast.error('Please select a branch')
				return
			}
			
			let data = {
				merchID: this.formData.merchID,
				branchID: e.target.value
			}
		  this.reviewLoading = true
			this.$store.dispatch('branches/getBranchReviews', data)
				.then(res =>{
					if(res.data.status) {
						this.reviewData = res.data.data
						this.reviewRate = res.data.totalrate
						this.reviewLoading = false
						return
					}

					this.reviewLoading = false
					this.$toast.error('An error occurred!')
				}).catch(err =>{
					this.$toast.error('An error occurred and the operation was terminated')
					this.reviewLoading = false
					console.log(err)
				})
		},
		closeReview() {
		  this.reviewData = []
			$('#reviews').removeClass('uk-open').hide()
		},
		viewDeliveryFees(branch) {
			this.feeData.merchID = branch.merchID
			this.feeData.branchID = branch.id
			$('#viewDeliveryBtn' + branch.id).attr('disabled', true).html('Retrieving...please wait')
			this.$store.dispatch('branches/getDeliveryFee', this.feeData)
				.then(res =>{
					$('#viewDeliveryBtn' + branch.id).attr('disabled', false).html('View delivery fees')
					if(res.data.status) {
						this.fLoading = false
						this.fees = res.data.data
						// $('#delivery-fee').addClass('uk-open').show();
						UIkit.modal('#delivery-fee').toggle()
						return
					}
					this.fLoading = false
					this.$toast.error('An error occurred while retrieving data')
				}).catch(err =>{
					$('#viewDeliveryBtn' + branch.id).attr('disabled', false).html('View delivery fees')
					this.$toast.error('An error occurred while retrieving data')
					console.log(err)
				})
		},
		getBranchPerformance(branch) {
	    this.performanceData.merchID = this.user.id
			this.performanceData.branchID = branch.id
			this.perfData.orders = []
			$('#perfButton' + branch.id).attr('disabled', true).html('Retrieving...')
			this.$store.dispatch('branches/getPerformance', this.performanceData)
				.then(res =>{
				  this.perfData.orders = res.data.data.orders
					this.perfData.todayOrder = res.data.data.todayorder.number_of_entry
					this.perfData.todayOrderPercentage = this.calculateOrderPercentage(res)
          
					this.perfData.todayRevenue = res.data.data.todayrevenue.ordertotal__sum
					this.perfData.todayRevenuePercentage = this.calculateRevenuePercentage(res)

					this.perfData.currentWeekOrder = res.data.data.currentweekorder.number_of_entry
					this.perfData.currentWeekPercentage = this.calculateCurrentWeekPercentage(res)

					this.perfData.currentWeekRevenue = res.data.data.currentweekrevenue.ordertotal__sum
					this.perfData.currentWeekRevenuePerc = this.calculateCurrentWeekRevenuePercentage(res)

					$('#branchName').html(branch.branchname)
          
					this.pLoading = false
					// $('#store-performance').addClass('uk-open').show();
					$('#perfButton' + branch.id).attr('disabled', false).html('View performance')
				}).catch(e =>{
					this.pLoading = false
					$('#perfButton' + branch.id).attr('disabled', false).html('View performance')
					console.log(e)
				})
		},
		calculateOrderPercentage(res) {
			let todayOrder = res.data.data.todayorder.number_of_entry
			let yesterdayOrder = res.data.data.yesterdayorder.number_of_entry

			return +todayOrder - +yesterdayOrder
		},
		calculateRevenuePercentage(res) {
			let todayOrder = res.data.data.todayrevenue.ordertotal__sum
			let yesterdayOrder = res.data.data.yesterdayrevenue.ordertotal__sum
			let percentageIncrease = 0
			if(yesterdayOrder > 0) {
				let increase = +todayOrder - +yesterdayOrder;
				percentageIncrease = (+increase / +yesterdayOrder) * 100
			}
			return percentageIncrease
		},
		calculateCurrentWeekPercentage(res) {
			this.currentWeeksOrder = res.data.data.currentweekorder.number_of_entry
			this.lastWeeksOrder = res.data.data.lastweekorder.number_of_entry

			return +this.currentWeeksOrder - +this.lastWeeksOrder
		},
		calculateCurrentWeekRevenuePercentage(res) {
			let todayOrder = res.data.data.currentweekrevenue.ordertotal__sum
			let yesterdayOrder = res.data.data.lastweekrevenue.ordertotal__sum
			let percentageIncrease = 0
			if(yesterdayOrder > 0) {
				let increase = todayOrder - yesterdayOrder;
				percentageIncrease = (increase / yesterdayOrder) * 100
			}
			return percentageIncrease
		},
		removeChild (index) {
			this.delivery.splice(index, 1)
		},
		calcTime() {
			let from_date = this.$moment().startOf('week');
			let end_date = this.$moment().endOf('week');
			this.currentWeekStart = this.$moment(from_date.toString()).format('DD/MM')
			this.currentWeekEnd = this.$moment(end_date.toString()).format('DD/MM')
		},
		addChild () {
			this.delivery.push({
				deliveryarea: '',
				deliveryfee: ''
			})
		},
		addBranch() {
			// $('#add-branch').addClass('uk-open').show();
		  UIkit.modal('#add-branch').toggle()
		},
		cancelAdd() {
		  this.clearErrorData()
			this.formData = {
		    merchID: '',
				branchname: '',
				branchaddress: '',
				branchstate: '',
				branchcity: '',
				branchofficeline: '',
				branchimage: '',
				openingdays: [],
				openingtime: '',
				closingtime: '',
				deliveryarea: [],
				longitude: '',
				latitude: '',
				isdelivery: false,
				ispickup: false
      }
      this.formData.merchID = this.user.id
			// $('#add-branch').removeClass('uk-open').hide();
		  UIkit.modal('#add-branch').toggle()
		},
		createDeliveryFee(branch) {
	    localStorage.removeItem('branch')
			this.$store.dispatch('branches/setBranch', branch)
			this.$router.push('branch/delivery-fee')
		},
		getAddAddress() {
		  this.getCoordinates()
		},
		getEditAddress(address) {
			// console.log('in edit address')
		  this.getCoordinates()
		},
		getGeoCode(address) {
		  try {
				const proxyurl = "https://cors-anywhere.herokuapp.com/"
				// const config = {mode: "no-cors"};
				const url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+ address + '&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyD9R7EeLdPZusJV_bBsm3EiPj-gwCri8u0'
				fetch(proxyurl + url)
					.then((data) => {
						// console.log(data)
						if(data.data.candidates.length < 1) {
							this.$toast.error('Address cordinates not found. Please enter an address with street name, city and state')
							return
						}
            
						this.$toast.success('Address coordinates found')
						this.geoCode.longitude = data.candidates[0].geometry.location.lng
						this.geoCode.latitude = data.candidates[0].geometry.location.lat
						// console.log(this.geoCode)
					}).catch((error) => {
						console.log(error)
					})
			}catch(e){
		    console.log(e)
			}
		},
		getCoordinates() {
      let address = ''
      if(this.editData.branchaddress != ''){
        address = this.editData.branchaddress
      }
      if(this.formData.branchaddress != ''){
        address = this.formData.branchaddress
      }

			let service = new google.maps.places.PlacesService(document.getElementById("map"));
      let vm= this; 

			// console.log(address);
			if(address != '') {
				const request = {
					query: address,
					fields: ["name", "geometry"],
				};				
        // try{
          service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            //   console.log('Places found:')
              let geoCode = {};
              
              geoCode.longitude = results[0].geometry.location.lng()
              geoCode.latitude = results[0].geometry.location.lat()
              console.log(geoCode)
                
              vm.$toast.success('Address coordinates found')
              vm.geoCode = geoCode;
            //   console.log(vm.geoCode)
              return geoCode
            } else {
              vm.$toast.error('Address cordinates not found. Please enter an address with street name, city and state')
              
            //   console.log('Not found:')
            //   console.log(results)
              return;
            }
          });
        // } catch (error) {
        //   console.log(error)
        // }
			}     
			// console.log(this.geoCode)
		}
	},
	mounted() {
	  this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
		// console.log(this.formData)
		this.listBranches()
		this.generateMinutes()
		// var defaultBounds = new google.maps.LatLngBounds(
		// 	new google.maps.LatLng(-33.8902, 151.1759),
		// 	new google.maps.LatLng(-33.8474, 151.2631));
		// var input = document.getElementById('map');
		// // types: ['establishment']
		// var options = {
		// 	bounds: defaultBounds,
		// };
		// this.autocomplete = new google.maps.places.Autocomplete(
		// 	input
		// );
	},
	beforeCreate(){
		
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].branch.viewbranches: '')){
				// console.log('You can go in', user)
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
	// this.userData.businessdescription.toLowerCase().includes('delivery')
}
</script>
<style>
.form-input-checked-box{
  margin-bottom: 5px;
}

.tiny {
  max-width: 50px !important;
}

h3{
  height: 50px
}

.branch_image {
  width: unset !important;
  height: unset !important;
  max-height: 100% !important;
  max-width: 100% !important;
   /* margin-right: auto !important ; */
  
  display: block !important;
  border-radius: 6px !important;
  object-fit: cover;
}

.card__body{
  justify-content: initial !important;
 
}

.branch_image_holder{
  width: 130px !important;
  height: 130px !important;
  margin-right: 10px;
}

.father_time {
  display: flex;
  justify-content: space-between;
}

.time {
  min-width: 30% !important;
  padding: 0 0.25rem 0 0.25rem !important;
  /* width: inherit !important; */
  text-align: center !important;
}

.time select {
  width: 60% !important;
}
.card {
  border-top: 3px solid forestgreen;
}

</style>
