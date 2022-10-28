<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down filter-drop">
          <select class="filter-btn box-deco-smallr">
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Ended</option>
          </select>
        </div>
        <button class="btn btn--primary" type="button" @click="openModal">
          + Create campaign
        </button>

        <div id="add-camp" uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
            <div class="modal-header">
              <h2>
                Create Campaign
              </h2>
              <p> Add your campaign description and necessary information from here</p>
            </div>
            <form @submit.prevent="createCampaign">
              <div class="modal-body" uk-overflow-auto>
                <label  class="form-input">
                  <span class="form-input__label">Campaign name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.title" placeholder="Campaign name">
                  </div>
                  <span v-if="errorData.title" class="form-input__error-msg">Please enter a campaign title</span>
                </label>
                <div class="form-input">
                  <span class="form-input__label">Discount type</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.discounttype" value="fixedamount" name="light">
                    <span class="design"></span>
                    <span class="text">Fixed Amount</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.discounttype" value="percentage" name="light">
                    <span class="design"></span>
                    <span class="text">Percentage</span>
                  </label>
                  <span v-if="errorData.discounttype" class="form-input__error-msg">Please select a discount type</span>
                </div>
                <div v-if="formData.discounttype == 'percentage' " class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Discount in percentage</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.discountprice" placeholder="0">
                    </div>
                    <span v-if="errorData.discountprice" class="form-input__error-msg">Please enter a discount percentage</span>
                  </label>
                </div>

                <div v-else class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Discount in price (₦)</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.discountprice" placeholder="0">
                    </div>
                    <span v-if="errorData.discountprice" class="form-input__error-msg">Please enter a discount price</span>
                  </label>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Coupon duration</span>
                  <span class="form-input__sublabel">This is the period of time in which eligible charges will be discounted by the coupon redemption.</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="limitedduration" name="coupduration">
                    <span class="design"></span>
                    <span class="text">Limited duration</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="onetimeuser" name="coupduration">
                    <span class="design"></span>
                    <span class="text">One time user</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="couponduration" name="coupduration">
                    <span class="design"></span>
                    <span class="text">Forever</span>
                  </label>
                  <span v-if="errorData.couponduration" class="form-input__error-msg">Please select a coupon duration</span>
                </div>
                <div  class="form-input">
                  <label class="form-input__label">Limited to</label>
                  <div class="flex-width-uneven input-tiny-drop " >
                    <div class="form-input__input mr-1">
                      <input v-model="formData.couponlimiteddays" type="text" placeholder="0">
                    </div>
                      <div class="form-input__input tiny-btn " data-uk-form-select>
                        <span></span>
                        <select class="drop-down">
                          <option value="">Days</option>
                          <option value="">Week</option>
                          <option value="">Month</option>
                        </select>
                      </div>
                  </div>
                  <span v-if="errorData.couponlimiteddays" class="form-input__error-msg">Please enter a value</span>
                </div>
                <div class="form-input">
                  <span class="form-input__label">Number of redemption</span>
                  <span class="form-input__sublabel">Maximum number of times the coupon can be redeemed across all users?</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.redemptiontype" @change="checkNumberOfRedemption($event)" value="limitedredemption" name="coupNoOfRedemption">
                    <span class="design"></span>
                    <span class="text">Limited redemption</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.redemptiontype" @change="checkNumberOfRedemption($event)" value="unlimited" name="coupNoOfRedemption">
                    <span class="design"></span>
                    <span class="text">Unlimited</span>
                  </label>
                  <span v-if="errorData.redemptiontype" class="form-input__error-msg">Please select a redemption</span>
                </div>
                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Max number of redemptions</span>
                    <div class="form-input__input">
                      <input type="text" id="nosofredemption" v-model="formData.nosofredemption" placeholder="0">
                    </div>
                    <span v-if="errorData.nosofredemption" class="form-input__error-msg">Please enter a max number of redemption</span>
                  </label>
                </div>
                <div class="form-input">
                  <span class="form-input__label">Campaign availability</span>
                  <span class="form-input__sublabel">Is this campaign available for all users or specific users?</span>
                  <label class="form-input-check">
                    <input type="radio" @change="checkCampaignAvailability($event)" v-model="formData.campaignavaiability" value="specificcustomers" name="campaignavailability">
                    <span class="design"></span>
                    <span class="text">Specific customers</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" @change="checkCampaignAvailability($event)" v-model="formData.campaignavaiability"  value="allcustomers" name="campaignavailability">
                    <span class="design"></span>
                    <span class="text">All customers</span>
                  </label>
                  <span v-if="errorData.campaignavaiability" class="form-input__error-msg">Please select a campaign availability</span>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Select customers</span>
                  <div class="form-input__input">
                    <select2-multiple-control id="customers" v-model="formData.rewardcampaignscustomers" :options="options" />
                  </div>
                  <div class="d-flx-alc-jsb">
                    <span class="instruction">Customers will be shared emails with their codes </span>

                  </div>
                  <span v-if="errorData.rewardcampaignscustomers" class="form-input__error-msg">Please select a reward campaign customers</span>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Redemption per user</span>
                  <span class="form-input__sublabel">Can a user redeem the same code more than once?</span>
                  <label class="form-input-check">
                    <input type="radio" @change="checkRedemptionPerUser($event)" v-model="formData.redemptionperuser" value="limitededition" name="remdperuser">
                    <span class="design"></span>
                    <span class="text">Limited Edition</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" @change="checkRedemptionPerUser($event)" v-model="formData.redemptionperuser" value="unlimited" name="remdperuser">
                    <span class="design"></span>
                    <span class="text">Unlimited</span>
                  </label>
                  <span v-if="errorData.redemptionperuser" class="form-input__error-msg">Please enter a value</span>
                </div>
                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Maximum number of redemptions</span>
                    <div class="form-input__input">
                      <input type="text" id="maxnumberredemptionperuser" v-model="formData.maxnumberredemptionperuser" placeholder="0">
                    </div>
                    <span v-if="errorData.maxnumberredemptionperuser" class="form-input__error-msg">Please enter a value</span>
                  </label>

                  <label  class="form-input">
                    <span class="form-input__label">End date</span>
                    <div class="form-input__input">
                      <input type="date" v-model="formData.enddate" placeholder="0">
                    </div>
                    <span v-if="errorData.enddate" class="form-input__error-msg">Please select an end date</span>
                  </label>
                </div>
              </div>

              <div class="d-flx-alc-jfe mt-5">
                <button @click="closeModal" type="button" class="btn btn-no-fill">
                  Cancel
                </button>
                <button type="submit" id="submitBtn" class="btn btn--primary ml-1">
                  + Start campaign
                </button>
              </div>
            </form>
          </div>
        </div>

        <div id="message" uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="modal-header">
              <h2>Customise message</h2>
              <p>Customise message to be sent to users that can receive this campaigns</p>
            </div>
            <div class="modal-body" uk-overflow-auto>
              <label  class="form-input">
                <span class="form-input__label">First name</span>
                <div class="form-input__input">
                  <input type="text" placeholder="">
                </div>
              </label>

              <label  class="form-input">
                <span class="form-input__label">Email address</span>
                <div class="form-input__input">
                  <input type="email" placeholder="">
                </div><span class="form-input__error-msg">Error message</span>
              </label>

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

        <div class="drop-down page-drop">
<!--          <button class="btn-text " type="button" >-->
<!--            Showing <span> 1-20 </span> of <span> 48 </span>-->
<!--          </button>-->
<!--          <div class="drop-wrapper">-->
<!--            <ul class="drop-lists">-->
<!--              <li class="drop-list-item">-->
<!--                Newest-->
<!--              </li>-->
<!--              <li class="drop-list-item">-->
<!--                Oldest-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
        </div>
        <div class="d-flx-alc">
<!--          <button class="btn btn-icon smallsvg">-->
<!--            <svg>-->
<!--              <use href="/uploads/icons.svg#arrow-right"></use>-->
<!--            </svg>-->
<!--          </button>-->
<!--          <button class="btn btn-icon smallsvg">-->
<!--            <svg>-->
<!--              <use href="/uploads/icons.svg#arrow-left"></use>-->
<!--            </svg>-->
<!--          </button>-->
        </div>
      </div>
    </div>

    <div id="parent-component">
      <div container="#parent-component"  id="add-camp" uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeModal" uk-close></button>
            <div class="modal-header">
              <h2>
                Create Campaign
              </h2>
              <p> Add your campaign description and necessary information from here</p>
            </div>
            <form @submit.prevent="createCampaign">
              <div class="modal-body" uk-overflow-auto>
                <label  class="form-input">
                  <span class="form-input__label">Campaign name</span>
                  <div class="form-input__input">
                    <input type="text" v-model="formData.title" placeholder="Campaign name">
                  </div>
                  <span v-if="errorData.title" class="form-input__error-msg">Please enter a campaign title</span>
                </label>
                <div class="form-input">
                  <span class="form-input__label">Discount type</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.discounttype" value="fixedamount" name="light">
                    <span class="design"></span>
                    <span class="text">Fixed Amount</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.discounttype" value="percentage" name="light">
                    <span class="design"></span>
                    <span class="text">Percentage</span>
                  </label>
                  <span v-if="errorData.discounttype" class="form-input__error-msg">Please select a discount type</span>
                </div>
                <div v-if="formData.discounttype == 'percentage' " class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Discount in percentage</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.discountprice" placeholder="0">
                    </div>
                    <span v-if="errorData.discountprice" class="form-input__error-msg">Please enter a discount percentage</span>
                  </label>
                </div>

                <div v-else class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Discount in price (₦)</span>
                    <div class="form-input__input">
                      <input type="text" v-model="formData.discountprice" placeholder="0">
                    </div>
                    <span v-if="errorData.discountprice" class="form-input__error-msg">Please enter a discount price</span>
                  </label>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Coupon duration</span>
                  <span class="form-input__sublabel">This is the period of time in which eligible charges will be discounted by the coupon redemption.</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="limitedduration" name="coupduration">
                    <span class="design"></span>
                    <span class="text">Limited duration</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="onetimeuser" name="coupduration">
                    <span class="design"></span>
                    <span class="text">One time user</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.couponduration" value="couponduration" name="coupduration">
                    <span class="design"></span>
                    <span class="text">Forever</span>
                  </label>
                  <span v-if="errorData.couponduration" class="form-input__error-msg">Please select a coupon duration</span>
                </div>
                <div  class="form-input">
                  <label class="form-input__label">Limited to</label>
                  <div class="flex-width-uneven input-tiny-drop " >
                    <div class="form-input__input mr-1">
                      <input v-model="formData.couponlimiteddays" type="text" placeholder="0">
                    </div>
                      <div class="form-input__input tiny-btn " data-uk-form-select>
                        <span></span>
                        <select class="drop-down">
                          <option value="">Days</option>
                          <option value="">Week</option>
                          <option value="">Month</option>
                        </select>
                      </div>
                  </div>
                  <span v-if="errorData.couponlimiteddays" class="form-input__error-msg">Please enter a value</span>
                </div>
                <div class="form-input">
                  <span class="form-input__label">Number of redemption</span>
                  <span class="form-input__sublabel">Maximum number of times the coupon can be redeemed across all users?</span>
                  <label class="form-input-check">
                    <input type="radio" v-model="formData.redemptiontype" @change="checkNumberOfRedemption($event)" value="limitedredemption" name="coupNoOfRedemption">
                    <span class="design"></span>
                    <span class="text">Limited redemption</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" v-model="formData.redemptiontype" @change="checkNumberOfRedemption($event)" value="unlimited" name="coupNoOfRedemption">
                    <span class="design"></span>
                    <span class="text">Unlimited</span>
                  </label>
                  <span v-if="errorData.redemptiontype" class="form-input__error-msg">Please select a redemption</span>
                </div>
                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Max number of redemptions</span>
                    <div class="form-input__input">
                      <input type="text" id="nosofredemption" v-model="formData.nosofredemption" placeholder="0">
                    </div>
                    <span v-if="errorData.nosofredemption" class="form-input__error-msg">Please enter a max number of redemption</span>
                  </label>
                </div>
                <div class="form-input">
                  <span class="form-input__label">Campaign availability</span>
                  <span class="form-input__sublabel">Is this campaign available for all users or specific users?</span>
                  <label class="form-input-check">
                    <input type="radio" @change="checkCampaignAvailability($event)" v-model="formData.campaignavaiability" value="specificcustomers" name="campaignavailability">
                    <span class="design"></span>
                    <span class="text">Specific customers</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" @change="checkCampaignAvailability($event)" v-model="formData.campaignavaiability"  value="allcustomers" name="campaignavailability">
                    <span class="design"></span>
                    <span class="text">All customers</span>
                  </label>
                  <span v-if="errorData.campaignavaiability" class="form-input__error-msg">Please select a campaign availability</span>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Select customers</span>
                  <div class="form-input__input">
                    <select2-multiple-control id="customers" v-model="formData.rewardcampaignscustomers" :options="options" />
                  </div>
                  <div class="d-flx-alc-jsb">
                    <span class="instruction">Customers will be shared emails with their codes </span>

                  </div>
                  <span v-if="errorData.rewardcampaignscustomers" class="form-input__error-msg">Please select a reward campaign customers</span>
                </div>

                <div class="form-input">
                  <span class="form-input__label">Redemption per user</span>
                  <span class="form-input__sublabel">Can a user redeem the same code more than once?</span>
                  <label class="form-input-check">
                    <input type="radio" @change="checkRedemptionPerUser($event)" v-model="formData.redemptionperuser" value="limitededition" name="remdperuser">
                    <span class="design"></span>
                    <span class="text">Limited Edition</span>
                  </label>

                  <label class="form-input-check">
                    <input type="radio" @change="checkRedemptionPerUser($event)" v-model="formData.redemptionperuser" value="unlimited" name="remdperuser">
                    <span class="design"></span>
                    <span class="text">Unlimited</span>
                  </label>
                  <span v-if="errorData.redemptionperuser" class="form-input__error-msg">Please enter a value</span>
                </div>
                <div class="flex-width-1-2 less-gp">
                  <label  class="form-input">
                    <span class="form-input__label">Maximum number of redemptions</span>
                    <div class="form-input__input">
                      <input type="text" id="maxnumberredemptionperuser" v-model="formData.maxnumberredemptionperuser" placeholder="0">
                    </div>
                    <span v-if="errorData.maxnumberredemptionperuser" class="form-input__error-msg">Please enter a value</span>
                  </label>

                  <label  class="form-input">
                    <span class="form-input__label">End date</span>
                    <div class="form-input__input">
                      <input type="date" v-model="formData.enddate" placeholder="0">
                    </div>
                    <span v-if="errorData.enddate" class="form-input__error-msg">Please select an end date</span>
                  </label>
                </div>
              </div>

              <div class="d-flx-alc-jfe mt-5">
                <button @click="closeModal" type="button" class="btn btn-no-fill">
                  Cancel
                </button>
                <button type="submit" id="submitBtn" class="btn btn--primary ml-1">
                  + Start campaign
                </button>
              </div>
            </form>
          </div>
        </div>

      <div container="parent-component" id="message" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Customise message</h2>
            <p>Customise message to be sent to users that can receive this campaigns</p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <label  class="form-input">
              <span class="form-input__label">First name</span>
              <div class="form-input__input">
                <input type="text" placeholder="">
              </div>
            </label>

            <label  class="form-input">
              <span class="form-input__label">Email address</span>
              <div class="form-input__input">
                <input type="email" placeholder="">
              </div><span class="form-input__error-msg">Error message</span>
            </label>

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

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
            <tr>
              <!-- <th>
                <label class="input-check">
                  <input class="uk-checkbox" type="checkbox">
                </label>
              </th> -->
              <th class="">ID</th>
              <th class="">Campaign name</th>
              <th class="">Type</th>
              <th class="">Creation date</th>
              <th class="">Expiration date</th>
              <th class="">Status</th>
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="8">Loading Please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="8">No campaign record at the moment</td>
            </tr>
            <tr v-if="!loading" v-for="(row, ix) in filteredList" v-bind:key="ix">
              <!-- <td>
                <div class="d-flx-alc-jc">
                  <label class="input-check">
                    <input class="uk-checkbox" type="checkbox">
                  </label>
                </div>
              </td> -->
              <td class="co-primary">#NT {{ row.id }}</td>
              <td>
                {{ row.title }}
              </td>
              <td>
                {{ row.discounttype }}
              </td>
              <td>{{ $moment(row.created_at).format('MMM Do, YYYY') }}</td>
              <td>{{ $moment(row.enddate).format('MMM Do, YYYY') }}</td>
              <td>
                <span v-if="checkDate(row.enddate)" class="status no-radius ended">Ended</span>
                <span v-else class="status no-radius active">Active</span>
              </td>
              <td>
<!--                <button uk-toggle="target: #share">-->
<!--                  <svg>-->
<!--                    <use xlink:href="/uploads/icons.svg#share"></use>-->
<!--                  </svg>-->
<!--                </button>-->
                <button @click="showCustomers(row)">
                  <svg>
                    <use xlink:href="/uploads/icons.svg#pause"></use>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>


      <div id="share" uk-modal>
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Share campaign</h2>
            <p>Share this campaign on social networks of your choice</p>
          </div>
          <div class="modal-body" uk-overflow-auto>
            <div class="share-btn-holder">
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#twitter"></use>
                </svg>
              </button>
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#facebook"></use>
                </svg>
              </button>
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#messenger"></use>
                </svg>
              </button>
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#linkedin"></use>
                </svg>
              </button>
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#whatapp"></use>
                </svg>
              </button>
              <button>
                <svg>
                  <use xlink:href="/uploads/icons.svg#skype"></use>
                </svg>
              </button>
            </div>
            <div class="share-link-text">
              <p>Or copy link</p>
              <div class="d-flx">
                <div class="linkholder" >
                  https://ntisa.com/ge=3/Ramadansales
                </div>
                <button class="btn btn-no-fill">Copy</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </overlay-scrollbars>
</template>
<script>

export default {
	layout: 'main',
	computed: {
		filteredList () {
			return this.campaigns.filter(campaign => {
				if (campaign.title.toLowerCase().includes(this.search.toLowerCase())) {
					return campaign.title.toLowerCase().includes(this.search.toLowerCase());
				}
				else if (campaign.discounttype.toLowerCase().includes(this.search.toLowerCase())) {
					return campaign.discounttype.toLowerCase().includes(this.search.toLowerCase());
				}else if (campaign.redemptionperuser.toLowerCase().includes(this.search.toLowerCase())) {
					return campaign.redemptionperuser.toLowerCase().includes(this.search.toLowerCase());
				}else {
					return campaign.redemptiontype.toLowerCase().includes(this.search.toLowerCase());
				}
			});
		}
	},
	data: () => ({
		search: '',
		loading: true,
		formData: {
			title: '',
			active: '1',
			merchID: '',
			discounttype: '',
			discountprice: '',
			couponduration: '',
			couponlimiteddays: '',
			nosofredemption: '',
			redemptiontype: '',
			campaignavaiability: true,
			rewardcampaignscustomers: [],
			redemptionperuser: '',
			maxnumberredemptionperuser: '',
			enddate: ''
		},
		errorData: {
			title: false,
			active: false,
			discounttype: false,
			discountprice: false,
			couponduration: false,
			couponlimiteddays: false,
			nosofredemption: false,
			redemptiontype: false,
			campaignavaiability: false,
			rewardcampaignscustomers: false,
			redemptionperuser: false,
			maxnumberredemptionperuser: false,
			enddate: false
		},
		campaigns: [],
		customers: [],
		options: []
	}),
	methods: {
		showCustomers(customers) {
      
		},
	  createCampaign() {
	    let validate = this.validateCampaigns()
			if(validate) {
				return
			}
      
			let results = this.formData.rewardcampaignscustomers.map(function (x){
				return parseInt(x, 10)
			})
	    $('#submitBtn').attr('disabled', true).html('Starting....please wait')
			this.$store.dispatch('campaign/createCampaign', this.formData)
				.then(res =>{
					$('#submitBtn').attr('disabled', false).html('+ Start campaign')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.listCampaigns()
						this.closeModal()
						return
					}
					this.$toast.error(res.data.message)
				}).catch(e =>{
					$('#submitBtn').attr('disabled', false).html('+ Start campaign')
					console.log(e)
				})
		},
		validateCampaigns() {
	    this.clearErrorData()
			if(this.formData.title === '') {
				this.errorData.title = true
				return true
			}

			if(this.formData.discounttype === '') {
			  this.errorData.discounttype = true
				return true
			}
			
			if(this.formData.discountprice === '') {
			  this.errorData.discountprice = true
				return true
			}

			if(this.formData.couponduration === '') {
			  this.errorData.couponduration = true
				return true
			}

			if(this.formData.couponlimiteddays === '') {
			  this.errorData.couponlimiteddays = true
				return true
			}
			
			if(this.formData.redemptiontype === '') {
			  this.errorData.redemptiontype = true
				return true
			}

			if(this.formData.nosofredemption === ''){
			  this.errorData.nosofredemption = true
				return true
			}

			if(this.formData.campaignavaiability === '') {
			  this.errorData.campaignavaiability = true
				return true
			}
			
			if(this.formData.campaignavaiability !== 'allcustomers') {
				if (this.formData.rewardcampaignscustomers.length < 1) {
					this.errorData.rewardcampaignscustomers = true
					return true
				}
			}

			if(this.formData.redemptionperuser === ''){
			  this.errorData.redemptionperuser = true
				return true
			}

			if(this.formData.redemptionperuser !== 'unlimited') {
				if (this.formData.maxnumberredemptionperuser === '') {
					this.errorData.maxnumberredemptionperuser = true
					return true
				}
			}
			
			if(this.formData.enddate === ''){
			  this.errorData.enddate = true
				return true
			}

			return false
		},
		clearErrorData() {
			this.errorData = {
				title: false,
				active: false,
				discounttype: false,
				discountprice: false,
				couponduration: false,
				couponlimiteddays: false,
				nosofredemption: false,
				redemptiontype: false,
				campaignavaiability: false,
				rewardcampaignscustomers: false,
				redemptionperuser: false,
				maxnumberredemptionperuser: false,
				enddate: false
			}
		},
		listCampaigns() {
			this.$store.dispatch('campaign/listCampaign', this.formData.merchID)
				.then(res =>{
					if(res.data.status) {
						this.loading = false
						this.campaigns = res.data.data
					}
				}).catch(err =>{
					console.log(err)
				})
		},
		openModal() {
			UIkit.modal('#add-camp').toggle()
		},
		closeModal() {
	    this.formData = {
				title: '',
				active: '1',
				merchID: '',
				discounttype: '',
				discountprice: '',
				couponduration: '',
				couponlimiteddays: '',
				nosofredemption: '',
				redemptiontype: '',
				campaignavaiability: '',
				rewardcampaignscustomers: [],
				redemptionperuser: '',
				maxnumberredemptionperuser: '',
				enddate: ''
			}
			this.clearErrorData()
	    UIkit.modal('#add-camp').toggle('hide')
		},
		checkNumberOfRedemption(e) {
		  if(e.target.value === 'unlimited') {
		    this.formData.nosofredemption = 0;
		    document.getElementById('nosofredemption').disabled = true
			}else{
				this.formData.nosofredemption = '';
				document.getElementById('nosofredemption').disabled = false
			}
		},
		checkCampaignAvailability(e) {
		  if(e.target.value === 'allcustomers') {
		    document.getElementById('customers').disabled = true
			}else{
				document.getElementById('customers').disabled = false
			}
		},
		checkRedemptionPerUser(e) {
		  if(e.target.value === 'unlimited') {
		    this.formData.maxnumberredemptionperuser = 0
		    document.getElementById('maxnumberredemptionperuser').disabled = true
			}else{
				this.formData.maxnumberredemptionperuser = ''
				document.getElementById('maxnumberredemptionperuser').disabled = false
			}
		},
		getCustomers() {
		  let data = {
				merchantID: this.formData.merchID
			}
		  this.$store.dispatch('customers/getAllCustomers', data)
				.then(res => {
					this.customers = res.data.data
					let customerOptions = []
					this.customers.forEach(function(c){
						let object = {
						  id: c.id,
							text: c.firstname + ',  ' + c.lastname
						}
						customerOptions.push(object)
					})
					this.options = customerOptions
				}).catch(e =>{
					console.log(e)
				})
		},
		checkDate(date) {
			return this.$moment().isAfter(date);
		}
	},
	mounted() {
	  this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
		this.listCampaigns()
		this.getCustomers()
	}
}
</script>
