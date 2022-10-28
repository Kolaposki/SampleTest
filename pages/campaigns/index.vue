<template>
  <overlay-scrollbars class="main-content-wrap">
	  <div class="d-flx-alc-jsb page-extras py-0">
		  
			   <button v-for='(tab, index) in tabs' :key="index" 
     			 :class="selectedTab == tab ? 'active':''" @click="setTab(tab)" class="tab" > {{tab}}</button>
		  
		 
      <div class="search-filter d-flx-alc-jfe">       
       	<button class="btn btn--primary click mr-2" @click="displayNotifyModal" v-if="(user.rolepermission ? user.rolepermission[0].notifications.sendnotifications:'') || isMerchant">
			<svg>
				<use xlink:href="/uploads/icons.svg#bell-btn"></use>
			</svg>
			<span class="ml-1">Send Notifications</span>
		</button>
      </div>
	  
	  
    </div>
    <div id="parent-component">
	  <div id="send-push-notification" uk-modal data-uk-modal="{target:'#send-push-notification',bgclose:false}" container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" @click="closeNotifyModal">X</button>
          <div class="modal-header">
            <h2> Notification message</h2>
            <p>Create notifications to be sent to customers.</p>
          </div>
          <form @submit.prevent="submitNotification">
            <overlay-scrollbars class="modal-body" >
              <div  class="form-input">
                <label class="form-input__label">Notification Medium</label>
                <div class="form-input__input">
                  <select  v-model="notificationData.type" >
                    <option value="">Select a notification type</option>
                    <option value="push">Push Notifications</option>
                    <!-- <option value="sms">SMS</option>
                    <option value="email">Email</option> -->

                  </select>
                </div>
                <span v-if="errorNotifyData.type" class="form-input__error-msg">Please enter a medium</span>
              </div>
              <label  class="form-input">
                <span class="form-input__label">Notification Subject</span>
                <div class="form-input__input">
                  <input type="text"  v-model="notificationData.title" placeholder="Buy 2 and get one free!">
                </div>
                <span v-if="errorNotifyData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
              <div  class="form-input">
                <label class="form-input__label">Notification body</label>
                <div class="form-input__input">
                  <textarea rows="5" v-model="notificationData.body" placeholder="Enter"></textarea>
                </div>
                <span v-if="errorNotifyData.body" class="form-input__error-msg">Please enter a message body</span>
              </div>
              <div class="form-input">
                <span class="form-input__label">Select customers</span>
                <div class="form-input__input">
                  <select2-multiple-control v-model="notificationData.id" :placeholder="'Select as least one customer'" :options="notifyoptions" :settings="settings"/>
                </div>
                <span v-if="errorNotifyData.id" class="form-input__error-msg">Please select a customer</span>
              </div>              
              
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="closeNotifyModal" class="btn btn-no-fill uk-modal-close">
                Cancel
              </button>
              <button id="submitBtn" class="btn btn--primary ml-1" type="submit">
                Send Notification
              </button>
            </div>
          </form>
        </div>
      </div>
      <div container="#parent-component" id="add-loyalty-rule"  uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeAddModal" uk-close></button>
            <div class="modal-header">
              <h2>Create Loyalty Points</h2>
              <p>Create milestones your customers should reach and give them a reward for reaching the milestone. </p>
            </div>
            <form @submit.prevent="saveLoyaltyRule">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-1 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty Rule name</span>
				<!-- <span class="font-14 co-lgray">Enter a name for the loyalty</span> -->
                <div class="form-input__input">
                  <input v-model="formData.loyaltyrule" type="text">
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              
            </div>
			<div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                <span class="form-input__label">Amount to be spent (₦)</span>
                <div class="form-input__input">
                  <input v-model="formData.amountspent" type="text" @keyup="formatInput">
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>

				<label  class="form-input">
                <span class="form-input__label">Reward</span>
                <div class="form-input__input">
                  <input v-model="formData.rewardpoint" type="text" >
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>
              
              <!-- <label  class="form-input">
                <span class="form-input__label">Status</span>
                <div class="form-input__input">
                  <Select2 v-model="formData.status" :options="options" />
                </div>
              </label> -->
            </div>
            <div class="flex-width-1-1 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Minimum Loyalty point (₦)</span>
				        <!-- <span class="font-14 co-lgray">Before redemption is possible</span> -->
                <div class="form-input__input">
                  <input v-model="formData.mininumamount" type="text" @keyup="formatMinLoyalty">
                </div>
                <span v-if="errorData.mininumamount" class="form-input__error-msg">Please select a minimum point</span>
              </label>
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="formData.startdate" type="date">
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="formData.endate" type="date">
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>

            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeAddModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                Create loyalty points
              </button>
            </div>
          <!-- </div> -->
        </form>
          </div>
        </div>
		<div container="#parent-component" id="add-promocode"  uk-modal>
          <div class="uk-modal-dialog uk-margin-auto-vertical modal">
            <button class="uk-modal-close-default" type="button" @click="closeAddPromoModal" uk-close></button>
            <div class="modal-header">
              <h2>Create Promocode</h2>
              <p>Promo Codes to be used on the POS</p>
            </div>
            <form @submit.prevent="savePromoCode">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Promocode Title</span>
                <div class="form-input__input">
                  <input v-model="promoData.title" type="text" required>
                </div>
                <span v-if="promoErrorData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
               <label  class="form-input">
                <span class="form-input__label">Code</span>
                <div class="form-input__input">
                  <input v-model="promoData.code" type="text" required disabled>
                </div>
              </label>
              
            </div>
            <div class="flex-width-1-2 less-gp">
             
              <label  class="form-input">
                <span class="form-input__label">Reward Amount</span>
                <div class="form-input__input">
                  <input v-model="promoData.amount"  type="text" required @keyup="formatPromoInput">
                </div>
                <span v-if="promoErrorData.amount" class="form-input__error-msg">Please enter an amount</span>
              </label>
            </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeAddPromoModal" id="cancelBtn" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="submitBtn" type="submit" class="btn btn--primary ml-1">
                + Create Promocode
              </button>
            </div>
          <!-- </div> -->
        </form>
          </div>
        </div>
		<div container="#parent-component" id="edit-promocode" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEditPromoModal" uk-close></button>
        <div class="modal-header">
          <h2>Update Promocode</h2>
          <p>Update Promocode details.</p>
        </div>
        <form @submit.prevent="updatePromocode">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Promocode Title</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.title" type="text" required>
                </div>
                <span v-if="errorData.title" class="form-input__error-msg">Please enter a title</span>
              </label>
               <label  class="form-input">
                <span class="form-input__label">Code</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.code" type="text" required disabled>
                </div>
              </label>
              
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Amount</span>
                <div class="form-input__input">
                  <input v-model="editPromoData.amount" min="0" onkeypress="return event.charCode >= 48" type="text" required>
                </div>
              </label>
            </div>
            <!-- <div class="flex-width-1-2 less-gp"> -->
              <label  class="form-input">
                <span class="form-input__label">Status</span>
				        <!-- <span class="font-14 co-lgray">Activate or Deactivate Promocode</span> -->
                <div class="form-input__input">
                  <select v-model="editPromoData.active">
                    <option  value="0">Deactivate</option>
                    <option  value="1">Activate</option>
                    <!-- <option v-for="(option, index) in options.filter(o => o.id != promocode.active)" :key="index" :value="option.id">{{option.text}}</option> -->
                  </select>
                </div>
              </label>
            <!-- </div> -->
          </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEditPromoModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1">
                + Update Promocode
              </button>
            </div>
          <!-- </div> -->
        </form>
      </div>
        </div>
		 <div
        id="delete-loyalty"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#delete-loyalty',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
          >
            X
          </button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete Loyalty ?</h2>
              <p>
                Please confirm you really want to delete this loyalty rule?
              </p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button class="btn btn-no-fill" @click="cancelDelete()">
                Cancel
              </button>
              <button
                id="deleteBtn"
                class="btn btn-error ml-2"
				@click="deleteLoyaltyRule()"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
		<div container="#parent-component" id="edit-loyalty-rule" uk-modal>
      <div class="uk-modal-dialog uk-margin-auto-vertical modal">
        <button class="uk-modal-close-default" type="button" @click="closeEditModal" uk-close></button>
        <div class="modal-header">
          <h2>Update Loyalty</h2>
          <p>Update Loyalty Points details.</p>
        </div>
        <form @submit.prevent="updateLoyaltyRule">
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
            <div class="flex-width-1-1 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Loyalty rule name</span>
				<!-- <span class="font-14 co-lgray">Update Loyalty Name</span> -->
                <div class="form-input__input">
                  <input v-model="editData.loyaltyrule" type="text">
                </div>
                <span v-if="errorData.loyaltyrule" class="form-input__error-msg">Please enter a rule</span>
              </label>

              
            </div>
            <div class="flex-width-1-2 less-gp">
				 <label  class="form-input">
                <span class="form-input__label">Amount to be spent (₦)</span>
                <div class="form-input__input">
                  <input v-model="editData.amountspent" type="text">
                </div>
                <span v-if="errorData.amountspent" class="form-input__error-msg">Please enter an amount</span>
              </label>

				<label  class="form-input">
                <span class="form-input__label">Reward</span>
                <div class="form-input__input">
                  <input v-model="editData.rewardpoint" type="text">
                </div>
                <span v-if="errorData.rewardpoint" class="form-input__error-msg">Please enter a reward point</span>
              </label>

			 
            </div>
            <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Minimum Loyalty Point (₦)</span>
				        <!-- <span class="font-14 co-lgray">Before redemption is possible</span> -->
                <div class="form-input__input">
                  <input v-model="editData.mininumamount" type="text">
                </div>
                <span v-if="errorData.mininumamount" class="form-input__error-msg">Please select a minimum point</span>
              </label>
              <label  class="form-input">
                <span class="form-input__label">Status</span>
				        <!-- <span class="font-14 co-lgray">Activate or Deactivate loyalty</span> -->
                <div class="form-input__input">
                  <select v-model="editData.status">
                    <option  v-if="status == 'True'" value="True">Reactivate</option>
                    <option v-for="(option, index) in options" v-if="status !== option.id" :key="index" :value="option.id">{{option.text}}</option>
                  </select>
                </div>
              </label>
            </div>
			      <div class="flex-width-1-2 less-gp">
              <label  class="form-input">
                <span class="form-input__label">Start Date</span>
                <div class="form-input__input">
                  <input v-model="editData.startdate" type="date">
                </div>
                <span v-if="errorData.startdate" class="form-input__error-msg">Please select a start date</span>
              </label>

              <label  class="form-input">
                <span class="form-input__label">End Date</span>
                <div class="form-input__input">
                  <input v-model="editData.endate" type="date">
                </div>
                <span v-if="errorData.endate" class="form-input__error-msg">Please select an end date</span>
              </label>
            </div>
            <!-- mininumamount -->
            
          </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-5">
              <button type="button" @click="closeEditModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button id="updateBtn" type="submit" class="btn btn--primary ml-1" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.updateloyaltyrule:'') || isMerchant">
                Update loyalty rule
              </button>
            </div>
          <!-- </div> -->
        </form>
      </div>
    </div>
    </div>

    <div class="inner-main-wrapper" v-if="showLoyaltyRule">
		<div class="page-extras">
			<div class="search-filter d-flx-alc-jfe">
				
				<button class="btn btn--primary" type="button" @click="displayCreateModal" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.createloyalty:'') || isMerchant">
				 Create loyalty points
				</button>
			</div>
    	</div> 
		<!-- <button class="btn btn--primary" type="button" @click="displayCreateModal" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.createloyalty:'') || isMerchant">
        	Create loyalty points
        </button> -->
		 <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <th class="column-name">Loyalty Rule Name</th>
            <th class="column-name">Amount To Be Spent (₦)</th>
            <th class="column-name" style="width: 10%">Reward</th>
            <th class="column-name">Minimum Loyalty Point (₦)</th>
            <th class="column-name">Start Date</th>
            <th class="column-name">End Date</th>
			<th v-if="(user.rolepermission ? user.rolepermission[0].campaigns.updateloyaltyrule:'') || user.rolepermission ? user.rolepermission[0].campaigns.deleteloyaltyrule:''|| isMerchant">Action</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && filteredList.length < 1 ">
            <td colspan="8">No loyalty point rule have been created</td>
          </tr>
          <tr v-if="!loading && filteredList.length > 0" v-for="(row, ix) in filteredList" v-bind:key="ix">
            <td class="column-name">{{row.loyaltyrule}}</td>
            <td class="column-name">{{formatPrice(row.amountspent)}}</td>
            <td class="column-name">{{row.rewardpoint}}</td>
            <td class="column-name">{{formatPrice(row.mininumamount)}}</td>
            <td class="column-name">{{ $moment(row.startdate).format('Do MMM YYYY') }}</td>
			<td class="column-name">{{$moment(row.endate).format('Do MMM YYYY')}}</td>
            <td class="d-flx-alc" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.updateloyaltyrule:'') || user.rolepermission ? user.rolepermission[0].campaigns.deleteloyaltyrule:''|| isMerchant">
              <button class="btn btn--primary" type="button" @click="editLoyalty(row)" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.updateloyaltyrule:'') || isMerchant">
                Edit 
              </button>
              <button class="btn btn--danger" title="Delete" type="button" uk-toggle="target: #delete-loyalty"  @click="setupDeleteLoyalty(row.id)" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.deleteloyaltyrule:'') || isMerchant">
                Delete 
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
      
    </div>
	<div class="inner-main-wrapper" v-if="showPromoCode">
		<div class="page-extras">
			<div class="search-filter d-flx-alc-jfe">
				
				<button class="btn btn--primary" type="button" @click="displayCreatePromoModal" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.createpromocode:'') || isMerchant">
				 	Create Promocode
				</button>
			</div>
    	</div> 
		<!-- <button class="btn btn--primary" type="button" @click="displayCreateModal" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.createloyalty:'') || isMerchant">
        	Create loyalty points
        </button> -->
		 <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content">
          <thead class="">
          <tr>
            <th class="column-name">Title</th>
            <th class="column-name">Code</th>
            <th>Reward Amount (₦)</th>
			<th v-if="(user.rolepermission ? user.rolepermission[0].campaigns.editpromocode:'') || user.rolepermission ? user.rolepermission[0].campaigns.sharepromocode:''|| isMerchant">Action</th>
          </tr>
          </thead>
          <tbody class="tablebody">
          <tr v-if="loading">
            <td colspan="8">Loading...please wait</td>
          </tr>
          <tr v-if="!loading && promoList.length < 1 ">
            <td colspan="8">No promocode have been created</td>
          </tr>
          <tr v-if="!loading && promoList.length > 0" v-for="(row, ix) in promoList" v-bind:key="ix">
            <td class="column-name">{{row.title}}</td>
            <td class="column-name" @click.prevent="copyLink(row.code)" style="cursor:pointer">{{row.code}}</td>
            <td>{{formatPrice(row.amount)}}</td>
            <!-- <td></td> -->
            <td class="d-flx-alc" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.editpromocode:'') || user.rolepermission ? user.rolepermission[0].campaigns.sharepromocode:''|| isMerchant">
				<button class="btn btn--danger mr-2" type="button" @click.prevent="editPromocode(row)" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.editpromocode:'') || isMerchant">
					Edit 
				</button>
				<button class="btn btn-no-fill" type="button" @click.prevent="copyLink(row.code)" v-if="(user.rolepermission ? user.rolepermission[0].campaigns.sharepromocode:'') || isMerchant">
					Share 
				</button>
				
              <!-- <button class="btn btn--danger" title="Delete" type="button">
                Delete 
              </button> -->
            </td>
          </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
      
    </div>
  </overlay-scrollbars>
</template>

<script>
export default {
	layout: 'main',
	computed: {
		filteredList () {
			if( this.search == ''){
				return this.rules
			} else {
				return this.rules.filter(reward => {
				// if (reward.loyaltyrule.toLowerCase().includes(this.search.toLowerCase())) {
					return reward.loyaltyrule !== null && reward.loyaltyrule.toLowerCase().includes(this.search.toLowerCase());
				// }
				// else if (reward.description.toLowerCase().includes(this.search.toLowerCase())) {
				// 	return reward.description.toLowerCase().includes(this.search.toLowerCase());
				// }
				// else {
				// 	return reward.rewardtask.toLowerCase().includes(this.search.toLowerCase());
				// }
				});
			}
		},
		promoList () {
			if( this.search == ''){
				return this.promocodes
			} else {
				return this.promocodes.filter(promocode => {
					return promocode.code.toLowerCase().includes(this.search.toLowerCase()) || promocode.title.toLowerCase().includes(this.search.toLowerCase());
				});
			}
		}
	},
	data: () => ({
		status: '',
		promoData: {
			merchID: '',
			code: '',
			amount: '',
			title: '',
			active: 1
    },
    promocode : {},
		options: [
			{id: 1, text: 'Activate'},
			{id: 0, text: 'Deactivate'}
    ],
		promoErrorData: {
			title: '',
			
			amount: '',
		},
		editPromoData: {
			merchID: '',
			code: '',
			amount: '',
			title: '',
			active: ''
		},
		promocodes: [],
		showLoyaltyRule: true,
		showPromoCode: false,
		tabs: ['Loyalty Points', 'Promocode'],
		selectedTab: 'Loyalty Points',
		loading: true,
		search: '',
		status: '',
		customers: [],
		customersList: [],
		customerDetails: {},
		notifyoptions: [
			{id: '', text: 'Select Customers'},
			{id: 'all', text: 'All Customers'}
		],
		settings: {
			width: '100%'
    	},
		notificationData: {
			id: [],
			title: "",
			body: "",
			type: ""
    	},
		formData: {
			merchID: '',
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			mininumamount: '',
			endate: '',
			status: 'True'
		},
		options: [
			{id: 'True', text: 'Activate'},
			{id: 'False', text: 'Deactivate'}
		],
		errorData: {
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			startdate: '',
			mininumamount: '',
			endate: '',
		},
		errorNotifyData: {
			id: false,
			title: false,
			body: false,
			type:false
		},
		editData: {
			merchID: '',
			loyaltyrule: '',
			rewardpoint: '',
			amountspent: '',
			mininumamount: '',
			startdate: '',
			endate: '',
			status: 'True',
			id: ''
		},
		rules: [],
		getData : {
			id: 0,
			page: 1
    	},
		deleteRule:{
			id:''
		}
		
	}),
	methods: {
		formatInput (){
        if(this.formData.amountspent != ''){
          let num = this.formData.amountspent.replace(/,/g, ''); //parseFloat(this.cash_amountpaid.replace(/,/g, '')) //remove any currency format;
          

          if(num.substr(num.length - 1) == '.'){
            this.formData.amountspent = num
          }
          else if(isNaN(num)){
            this.formData.amountspent = ''
          }
          else{
            this.formData.amountspent = parseFloat(this.formData.amountspent.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.formData.amountspent == 'NaN'){
          this.formData.amountspent = 0;
        } 
    
	
  		},
		formatMinLoyalty (){
        if(this.formData.mininumamount != ''){
          let num = this.formData.mininumamount.replace(/,/g, ''); //parseFloat(this.cash_amountpaid.replace(/,/g, '')) //remove any currency format;
          

          if(num.substr(num.length - 1) == '.'){
            this.formData.mininumamount = num
          }
          else if(isNaN(num)){
            this.formData.mininumamount = ''
          }
          else{
            this.formData.mininumamount = parseFloat(this.formData.mininumamount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.formData.mininumamount == 'NaN'){
          this.formData.mininumamount = 0;
        } 
    
	
  		},
		formatPromoInput (){
        if(this.promoData.amount != ''){
          let num = this.promoData.amount.replace(/,/g, ''); //parseFloat(this.cash_amountpaid.replace(/,/g, '')) //remove any currency format;
          

          if(num.substr(num.length - 1) == '.'){
            this.promoData.amount = num
          }
          else if(isNaN(num)){
            this.promoData.amount = ''
          }
          else{
            this.promoData.amount = parseFloat(this.promoData.amount.replace(/,/g, '')).toLocaleString()
          }
        }
        
        else if(this.promoData.amount == 'NaN'){
          this.promoData.amount = 0;
        } 
    
	
  		},
		cancelDelete(){
			this.deleteRule.id = ''
			UIkit.modal('#delete-loyalty').toggle('hide')
		},
		setupDeleteLoyalty(id) {
			this.deleteRule.id  = id;
		},
		displayNotifyModal() {
			UIkit.modal('#send-push-notification').toggle()
		},
		closeNotifyModal() {
			this.clearNotifyData()
			UIkit.modal('#send-push-notification').toggle()
		},
		clearNotifyData() {
			this.notificationData = {
				id: [],
				title: "",
				body: "",
				type: "push",
			}
		},
		getCustomersUnpaginated(){
      		this.$store.dispatch('customer/getCustomersAll', this.getData)
				.then(res => {
          if(res.data.status) {
            this.setCustomers(res.data.data)
          }
        });
    	},
		setCustomers(customers) {
			let vm = this
			customers.forEach(function(e) {
				let data = {
					id: e.id,
					text: e.firstname + ' ' + e.lastname
				}
        vm.customersList.push(data)
				vm.notifyoptions.push(data)
			})
		},
		copyLink(link) {
		  let vm = this
			this.$copyText(link).then(function (e) {
			  vm.$toast.success('Code copied to clipboard')
			}, function(e){
			  vm.$toast.error('An error occurred.Cannot copy.')
			})
		},
		savePromoCode() {
		let amount = parseFloat(this.promoData.amount.replace(/,/g, ''))	
		this.promoData.amount  = amount
		let request = {
			url : '/promocode',
			method: 'post',
			params: {
			merchID : this.user.role ? this.user.merchID : this.user.id,
			},
			data: this.promoData
		}
			
			$("#submitBtn").attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('api/makeAPICall', request)
				.then(res =>{
					$("#submitBtn").attr('disabled', false).html('+ Create Promocode')
					if(res.data.status === 'True') {
						this.$toast.success(res.data.message)
						this.closeAddPromoModal()
						this.listPromocodes()
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#submitBtn").attr('disabled', false).html('+ Create Promocode')
					this.$toast.error('An error occurred')
				})
		},
		updatePromocode() {
      $("#updateBtn").attr('disabled', true).html('Updating...please wait')
      this.editPromoData.active = Number(this.editPromoData.active) == 1 ? 1 : 0;
      let vm = this
      // if (Number(this.editPromoData.active) != 1) {
      //   delete this.editPromoData.active
      // }
      let request = {
        url : '/promocode',
        method: 'put',
        params: {
          merchID : this.user.role ? this.user.merchID : this.user.id,
        },
        data: this.editPromoData
      }
			this.$store.dispatch('api/makeAPICall', request)
				.then(res =>{
					$("#updateBtn").attr('disabled', false).html('+ Update Promocode')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeEditPromoModal()
						this.listPromocodes()
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#updateBtn").attr('disabled', false).html('+ Update Promocode')
					this.$toast.error('An error occurred')
				})
		},
		closeAddPromoModal() {
		  this.clearErrorpromoData()
		  this.promoData.title = ''
			this.promoData.amount = ''
			this.promoData.code = ''
			this.promoData.merchID = this.user.id
			this.promoData.status = ''
			UIkit.modal('#add-promocode').toggle('hide')
		},
		closeEditPromoModal() {
		  this.editPromoData = {
				merchID: this.user.id,
				code: '',
				title: '',
				amount: '',
				status: ''
			}
			UIkit.modal('#edit-promocode').toggle('hide')
		},
		clearErrorpromoData() {
		  this.promoErrorData = {
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				endate: '',
				status: 'True'
			}
		},
		validatePromoAddRule() {
		  this.clearpromoErrorData()
      
		  if(this.promoData.title === ''){
		    this.promoErrorData.title = true
				return true
			}
		  
		 
		  if(this.promoData.amount === ''){
		    this.promoErrorData.amount = true
				return true
			}
		  
		  
		  
		  return false
		},
		validateNotifyData() {
			this.clearError()
			if(this.notificationData.id.length < 1) {
				this.errorNotifyData.id = true
				return true
			}

			if(this.notificationData.title === '') {
				this.errorNotifyData.title = true
				return true
			}

			if(this.notificationData.body === '') {
				this.errorNotifyData.body = true
				return true
			}

			if(this.notificationData.type === '') {
				this.errorNotifyData.type = true
				return true
			}

			return false
		},
		clearError() {
			this.errorNotifyData = {
				id: false,
				title: false,
				body: false,
				type: false
			}
		},
		listPromocodes() {
      let request = {
        url : '/promocode',
        method: 'get',
        params: {
          merchID : this.user.role ? this.user.merchID : this.user.id,
        }
      }
			this.$store.dispatch('api/makeAPICall', request)
				.then((res) =>{
          this.loading = false
					this.promocodes = res.data.data
				})
		},
		displayCreatePromoModal() {
      this.promoData.code = this.generateRefNumber(6).toUpperCase()
			UIkit.modal('#add-promocode').toggle()
		},
		checkDate(date) {
			return this.$moment().isAfter(date);
		},
		editPromocode(promocode) {
      this.promocode = promocode
			this.editPromoData = {
				merchID: this.user.id,
				amount: promocode.amount,
				code: promocode.code,
				title: promocode.title,
				startdate: promocode.startdate,
				endate: promocode.endate,
				active: (promocode.active == true) ? 1 : 0,
				id: promocode.id
      }
      // this.editPromoData = Object.assign({}, promocode)
    //   console.log(this.editPromoData)
			// this.status = 
			UIkit.modal('#edit-promocode').toggle()
		},
		setTab(name) {
			this.selectedTab = name
			if(name == 'Loyalty Points'){
				this.showPromoCode = false
				this.showLoyaltyRule = true
			}else{
				this.showPromoCode = true
				this.showLoyaltyRule = false
			}
    	},
		saveLoyaltyRule() {
			if(this.validateAddRule()) {
				return
			}
			let amountspent = parseFloat(this.formData.amountspent.replace(/,/g, ''))
			this.formData.amountspent = amountspent
			let minloyalty = parseFloat(this.formData.mininumamount.replace(/,/g, ''))
			this.formData.mininumamount = minloyalty
			$("#submitBtn").attr('disabled', true).html('Creating...please wait')
			this.$store.dispatch('loyalty-rule/createRule', this.formData)
				.then(res =>{
					$("#submitBtn").attr('disabled', false).html('Create loyalty rule')
					if(res.data.status === 'True') {
						this.$toast.success(res.data.message)
						this.closeAddModal()
						this.listLoyaltyRule()
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#submitBtn").attr('disabled', false).html('Create loyalty rule')
					this.$toast.error('An error occurred')
				})
		},
		deleteLoyaltyRule() {
			$("#deleteBtn").attr('disabled', true).html('Deleting...')
			this.$store.dispatch('loyalty-rule/deleteRule', this.deleteRule)
			
				.then(res =>{
					// console.log(localStorage.getItem('token'))
					$("#submitBtn").attr('disabled', false).html('Delete')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.cancelDelete()
						this.listLoyaltyRule()
						return
					}
			
			    this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#deleteBtn").attr('disabled', false).html('Delete')
					this.$toast.error('An error occurred')
				})
		},
		updateLoyaltyRule() {
			if(this.validateUpdateRule()) {
				return
			}
			$("#updateBtn").attr('disabled', true).html('Updating...please wait')
			this.$store.dispatch('loyalty-rule/updateRule', this.editData)
				.then(res =>{
					$("#updateBtn").attr('disabled', false).html('+ Update loyalty rule')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.closeEditModal()
						this.listLoyaltyRule()
						return
					}

					this.$toast.error(res.data.message)
				}).catch(err =>{
					$("#updateBtn").attr('disabled', false).html('+ Update loyalty rule')
					this.$toast.error('An error occurred')
				})
		},
		closeAddModal() {
		  this.clearErrorData()
		  this.formData.loyaltyrule = ''
			this.formData.rewardpoint = ''
			this.formData.amountspent = ''
			this.formData.startdate = ''
			this.formData.endate = ''
			this.formData.mininumamount = ''
			this.formData.status = 'True'
			UIkit.modal('#add-loyalty-rule').toggle('hide')
		},
		closeEditModal() {
		  this.editData = {
				merchID: '',
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				mininumamount: '',
				endate: '',
				status: 'True'
			}
			UIkit.modal('#edit-loyalty-rule').toggle('hide')
		},
		clearErrorData() {
		  this.errorData = {
				loyaltyrule: '',
				rewardpoint: '',
				amountspent: '',
				startdate: '',
				endate: '',
				mininumamount: '',
				status: 'True'
			}
		},
		validateAddRule() {
		  this.clearErrorData()
      
		  if(this.formData.loyaltyrule === ''){
		    this.errorData.loyaltyrule = true
				return true
			}
      
			if(this.formData.mininumamount === ''){
		    this.errorData.mininumamount = true
				return true
			}
		  
		  if(this.formData.rewardpoint === ''){
		    this.errorData.rewardpoint = true
				return true
			}
		  
		  if(this.formData.amountspent === ''){
		    this.errorData.amountspent = true
				return true
			}
		  
		  if(this.formData.startdate === ''){
		    this.errorData.startdate = true
				return true
			}
		  
		  if(this.formData.endate === ''){
		    this.errorData.endate = true
				return true
			}
		  
		  return false
		},
		validateUpdateRule() {
		  this.clearErrorData()
      
		  if(this.editData.loyaltyrule === ''){
		    this.errorData.loyaltyrule = true
				return true
			}
      
			if(this.editData.mininumamount === ''){
		    this.errorData.mininumamount = true
				return true
			}
		  
		  if(this.editData.rewardpoint === ''){
		    this.errorData.rewardpoint = true
				return true
			}
		  
		  if(this.editData.amountspent === ''){
		    this.errorData.amountspent = true
				return true
			}
		  
		  if(this.editData.startdate === ''){
		    this.errorData.startdate = true
				return true
			}
		  
		  if(this.editData.endate === ''){
		    this.errorData.endate = true
				return true
			}
		  
		  return false
		},
		listLoyaltyRule() {
			this.$store.dispatch('loyalty-rule/listRules', this.formData.merchID)
				.then(res =>{
					this.loading = false
					this.rules = res.data.data
				})
		},
		displayCreateModal() {
			UIkit.modal('#add-loyalty-rule').toggle()
		},
		checkDate(date) {
			return this.$moment().isAfter(date);
		},
		editLoyalty(rule) {
			this.editData = {
				merchID: this.formData.merchID,
				loyaltyrule: rule.loyaltyrule,
				rewardpoint: rule.rewardpoint,
				amountspent: rule.amountspent,
				startdate: rule.startdate,
				mininumamount: rule.mininumamount,
				endate: rule.endate,
				status: (rule.status === true) ? 'True' : 'False',
				id: rule.id
			}
			this.status = (rule.status === true) ? 'True' : 'False'
			UIkit.modal('#edit-loyalty-rule').toggle()
		},
		submitNotification() {
			if(this.validateNotifyData()) {
				return
			}
			// console.log(this.notificationData.id)
			let form = this.notificationData.id;
			if (form.includes('all')){
				form = [];
				this.customersList.forEach( (customer) => {
					form.push(customer.id)
				});
				// console.log(form)
			}

			let result = form.map(function (x) {
				return parseInt(x, 10);
			});
      
			let resultFinal = Object.assign({}, this.notificationData);

			resultFinal.id = result

			$('#submitBtn').attr('disabled', true).html('Sending...Please wait')
			if(resultFinal.type === 'push'){
				resultFinal.url = '/API/pushnotification/';
			}
      
			
			this.$store.dispatch('customer/sendPushNotification', resultFinal)
				.then(res => {
					// console.log(res)
					$('#submitBtn').attr('disabled', false).html('Send Notification')
					if(res.data.status) {
						this.$toast.success('notification sent')
						this.closeNotifyModal()
						return
					}

					this.$toast.error(res.data.message);
				}).catch(err =>{
					$('#submitBtn').attr('disabled', false).html('Send Notification')
					this.$toast.error('An error occurred')
				})
		},
	},
	mounted() {
		this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
		this.promoData.merchID =  this.user.role ? this.user.merchID : this.user.id
		this.getData.id = this.user.role ? this.user.merchID : this.user.id
		this.listLoyaltyRule()
		this.listPromocodes()
		this.getCustomersUnpaginated()
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].campaigns.viewcampaign: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>
<style scoped>
.btn--primary{
    background-color: #089628 !important;
    color: #fff;
    min-width: 10px !important;
}
.btn--edit{
    background-color: blue !important;
    color: #fff;
    min-width: 10px !important;
	margin-left: 5px;
}
.btn--danger{
   background-color: #dc3545 !important;
   color: #fff;
   min-width: 10px !important;
   left: 5px;
   position: relative;
}
.btn {
	 padding: 0.6rem 1.2rem;
}
/* Style the tab */
	.tab {
		overflow: hidden;
		border: .5px solid rgb(238, 238, 238);
		background-color: white;
		margin-left: 0
	}

	/* Style the buttons that are used to open the tab content */
	button.tab {
		background-color: inherit;
		float: left;
		border: 1px solid forestgreen;
		outline: none;
		cursor: pointer;
		padding: 18px 32px;
		font-weight: 600;
		/* transition: 0.3s; */
		margin-left: 0
	}
	/* Change background color of buttons on hover */
	button.tab:hover {
		background-color: rgb(248, 248, 248);
		color: forestgreen;
		font-weight: 600
	}
	.tab button.click{
		min-width: 10px !important;
		height: 50px;
    	margin-top: 10px;
	}


	.tab button.click:hover{
		background: forestgreen;
		color:#fff
	}

	/* Create an active/current tablink class */
	button.tab.active {
		color: white;
		background-color: forestgreen;
	}
</style>