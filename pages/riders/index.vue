<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
		  <div id="branch" class="drop-down filter-drop">
			<select v-model="riderData.branchID" @change="getAllRiders" class="filter-btn box-deco-smallr">
			<option value="">All Branches</option>
			<option v-for="branch in branches" :key="branch.id" :value="branch.id">
				{{ branch.branchname }}
			</option>
			</select>
      	 </div>
		<div id="branch" class="drop-down filter-drop">
			<select v-model="filterText"  @change="orderStatus" class="filter-btn box-deco-smallr">
			<option value="">All Status</option>
			<option value="online">Online</option>
			<option value="offline">Offline</option>
			</select>
      	 </div>
        <label class="search-w-icon">
          <input v-model="search" type="text" @keyup="getRiders" placeholder="Search">
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <!-- <button @click="openCommisionModal" v-if="(user.rolepermission ? user.rolepermission[0].riders.managecommission:'') || isMerchant" class="btn btn--primary" type="button">
          Manage Commission
        </button> -->
        <button @click="openAddModal" v-if="(user.rolepermission ? user.rolepermission[0].riders.addriders:'') || isMerchant" class="btn btn--primary" type="button">
          Add new rider
        </button>
      </div>
    </div>
	    <pagination :headers="headers" v-model="get.page" @go="getAllRiders" />
    <div id="parent-component">
      <div id="add-driver" uk-modal container="#parent-component">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Add Rider</h2>
            <p>Add rider name, description and necessary information from here</p>
          </div>
          <form @submit.prevent="createDriver">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">First name</span>
                  <div class="form-input__input">
                    <input v-model="formData.riderfirstname" type="text" placeholder="">
                  </div>
                  <span v-if="errorData.riderfirstname" class="form-input__error-msg">First name is mandatory</span>
                </label>

                <label  class="form-input">
                  <span class="form-input__label">Last name</span>
                  <div class="form-input__input">
                    <input v-model="formData.riderlastname" type="text" placeholder="">
                  </div>
                  <span v-if="errorData.riderlastname" class="form-input__error-msg">Last name is mandatory</span>
                </label>

              </div>
              <div class="flex-width-1-1 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Rider's Address</span>
                  <div class="form-input__input">
                    <input v-model="formData.residentialaddress" type="text"  placeholder="">
                  </div>
				  <span v-if="errorData.residentialaddress" class="form-input__error-msg">Residential Address is mandatory</span>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Phone number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                  <div class="form-input__input">
                    <input v-model="formData.riderphonenumber" type="tel" pattern="^[0]\d{10}$" placeholder="">
                  </div>
                  <span v-if="errorData.riderphonenumber" class="form-input__error-msg">Phone number is mandatory</span>
                </label>

              </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Email Address</span>
                  <div class="form-input__input">
                    <input v-model="formData.rideremailaddress" type="email"  placeholder="">
                  </div>
                  <span v-if="errorData.rideremailaddress" class="form-input__error-msg">Email Address is mandatory</span>
                </label>
			  </div>
			  <div class="flex-width-1-1 less-gp">
				
                 <label  class="form-input">
				   		<span class="form-input__label">Contract Type</span>
				  		<div class="form-input__input">
							<select v-model="formData.contracttype">
								<option value="">Select contract type</option>
								<option>Hire Purchase</option>
								<option>Third Party</option>
							</select>
						 </div>
						  <span v-if="errorData.contracttype" class="form-input__error-msg">Contract type is mandatory</span>
		  			</label>

              </div>
             
              <div class="flex-width-1-1 less-gp">
				   <label  class="form-input">
				   		<span class="form-input__label">Branch</span>
				  		<div class="form-input__input">
							<select v-model="formData.branchID">
								<option value="">Select Branch</option>
								<option v-for="branch in branches" :key="branch.id" :value="branch.id">
								{{ branch.branchname }}
								</option>
							</select>
						 </div>
						  <span v-if="errorData.branchID" class="form-input__error-msg">Branch is mandatory</span>
		  			</label>
		 
              </div>
			  <div class="flex-width-1-1 less-gp">
				   <label  class="form-input">
                  <span class="form-input__label">Guarantor (1) First Name</span>
                  <div class="form-input__input">
                    <input v-model="formData.refreefirstname" type="text"  placeholder="">
                  </div>
                  <span v-if="errorData.refreefirstname" class="form-input__error-msg">Guarantor First Name is mandatory</span>
                </label>
			  </div>
              <div class="flex-width-1-1 less-gp">
				  
              
				 
                <label  class="form-input">
                  <span class="form-input__label">Guarantor (1) Last Name</span>
                  <div class="form-input__input">
                    <input v-model="formData.refreelastname" type="text"  placeholder="">
                  </div>
                  <span v-if="errorData.refreelastname" class="form-input__error-msg">Guarantor last name is mandatory</span>
                </label>
              </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Guarantor (1)Address</span>
                  <div class="form-input__input">
					  <input v-model="formData.refreeaddress" type="text"  placeholder="">
                  </div>
				   <span v-if="errorData.refreeaddress" class="form-input__error-msg">Guarantor Address is mandatory</span>
                </label>
			  </div>
			  <div class="flex-width-1-1 less-gp">
				
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (1) Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                  <div class="form-input__input">
					  <input v-model="formData.refreephonenumber" type="tel" pattern="^[0]\d{10}$" placeholder="">
                  </div>
				   <span v-if="errorData.refreephonenumber" class="form-input__error-msg">Guarantor Phone Number is mandatory</span>
                </label>
			  </div>
			  <div class="flex-width-1-1 less-gp">
				   <label  class="form-input">
                  <span class="form-input__label">Guarantor (2) First Name</span>
                  <div class="form-input__input">
                    <input v-model="formData.refree_2firstname" type="text"  placeholder="">
                  </div>
                </label>
			  </div>
			  <div class="flex-width-1-1 less-gp">
				  
              
				 
                <label  class="form-input">
                  <span class="form-input__label">Guarantor (2) Last Name</span>
                  <div class="form-input__input">
                    <input v-model="formData.refree_2lastname" type="text"  placeholder="">
                  </div>
                </label>
              </div>
			  <div class="flex-width-1-1 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (2)Address</span>
                  <div class="form-input__input">
					  <input v-model="formData.refree_2address" type="text"  placeholder="">
                  </div>
                </label>
				
			  </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Guarantor (2) Phone Number <span style="color: red; font-size: 12px">(must be 11-digits e.g: 08080000000)</span></span>
                  <div class="form-input__input">
					  <input v-model="formData.refree_2phonenumber" type="tel" pattern="^[0]\d{10}$" placeholder="">
                  </div>
                </label>
			  </div>
			
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Photo ID (Head shot)</span>
                  <div class="form-input__input">
                    <input @change="handleImage" type="file" accept=".png, .jpg, .jpeg" ref="file">
                  </div>
                </label>

				
			  </div>
			   <div class="flex-width-1-1 less-gp">
				 <label  class="form-input">
					<span class="form-input__label">NIN<span style="color: red; font-size: 12px">(must be 11-digits e.g: 12345678901)</span></span>
					<div class="form-input__input">
						 <input v-model="formData.nin" type="text" placeholder="" pattern="^\d{11}$">
					</div>
					<span v-if="errorData.nin" class="form-input__error-msg">NIN is mandatory</span>
					</label>

				
			  </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Registration Number</span>
                  <div class="form-input__input">
                    <input v-model="formData.registrationnumber" type="text" placeholder="">
                  </div>
				  <span v-if="errorData.registrationnumber" class="form-input__error-msg">Registration Number is mandatory</span>
                </label>

				<!-- <label  class="form-input">
					<span class="form-input__label"> Rider Token</span>
					<div class="form-input__input">
						<input v-model="formData.ridertoken" type="text" placeholder="">
					</div>
				
					</label> -->
			  </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
				   		<span class="form-input__label">Bank Name</span>
				  		<div class="form-input__input">
							<select v-model="formData.bankname">
								<option value="" selected>Select Bank</option>
								<option>Access Bank</option>
								<option>Access ( Diamond) Bank</option>
								<option>Citibank</option>
								<option>Ecobank</option>
								<option>Fidelity Bank</option>
								<option>First City Monument Bank (FCMB)</option>
								<option>First bank</option>
								<option>FSDH Merchant Bank</option>
								<option>Guarantee Trust Bank (GTB)</option>
								<option>Globus bank</option>
								<option>Heritage Bank</option>
								<option>Keystone Bank</option>
								<option>Kuda bank</option>
								<option>Lotus bank</option>
								<option>Polaris Bank</option>
								<option>Providus bank</option>
								<option>Rand Merchant Bank</option>
								<option>Stanbic IBTC Bank</option>
								<option>Standard Chartered Bank</option>
								<option>Sterling Bank</option>
								<option>Suntrust Bank</option>
								<option>Union Bank</option>
								<option>United Bank for Africa (UBA)</option>
								<option>Unity Bank</option>
								<option>Wema Bank</option>
								<option>Zenith Bank</option>
						</select>
						 </div>
						  <!-- <span v-if="errorData.bankname" class="form-input__error-msg">Bank Name is mandatory</span> -->
		  			</label>

				<div class="flex-width-1-1 less-gp">
					<label  class="form-input">
					<span class="form-input__label"> Account Number <span style="color: red; font-size: 12px">(must be 10-digits e.g: 2222222222)</span></span>
					<div class="form-input__input">
						<input v-model="formData.bankaccount" type="text" placeholder="" pattern="^\d{10}$">
					</div>
					<!-- <span v-if="errorData.bankaccount" class="form-input__error-msg">Bank account name is mandatory</span> -->
					</label>
				</div>
			  </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="closeModal" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="createBtn" class="btn btn--primary ml-1">
                + Create rider
              </button>
            </div>
          </form>
        </div>
      </div>
      <div id="rider-commission" uk-modal container="#parent-component" data-uk-modal="{stack:true}">
        <div class="uk-modal-dialog uk-margin-auto-vertical modal large-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <!-- <div class="modal-header">
            <h2>Add Rider</h2>
            <p>Add rider name, description and necessary information from here</p>
          </div> -->
          <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <rider-commision />
          </overlay-scrollbars>
        </div>
      </div>
	  
	  <div id="disable" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Suspend Rider ?</h2>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3"> 
              <button class="btn btn-no-fill" @click="closeDisableModal()">
                Cancel
              </button>
              <button class="btn btn-error ml-2" id="disableBtn" @click="disableRider">
                Suspend
              </button>
            </div>
          </div>
        </div>
      </div>
	  <div id="enable" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Activate Rider ?</h2>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button class="btn btn-no-fill" @click="closeRestoreModal()">
                Cancel
              </button>
              <button class="btn btn-error ml-2" id="restoreBtn" @click="restoreRider">
                Activate
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="delete" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete Rider ?</h2>
              <p>Please confirm you really want to delete this rider, this action cannot be undone.</p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button class="btn btn-no-fill" @click="closeDeleteModal()">
                Cancel
              </button>
              <button class="btn btn-error ml-2" id="deleteBtn" @click="deleteDriver">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
	  

      <div id="assign-commission" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Assign Commision to Rider {{updateData.riderlastname}} {{updateData.riderfirstname}}</h2>
            <p>Edit/update rider name, description and necessary information from here</p>
          </div>
          <form @submit.prevent="assignCommissions">
             <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">Commission Rule</span>
                  <div class="form-input__input">
                    <select v-model="updateData.commsssionID" class="filter-btn box-deco-smallr" aria-placeholder="Select a Commission Rule">
                      <!-- <option value="">Select Commission Rule</option> -->
                      <option value="">Remove Commission</option>
                      <option v-for="commission in commissions" v-bind:key="commission.id" :value="commission.id">{{commission.commissionrule}}</option>
                    </select>
                  </div>
                  <span v-if="errorUpdateData.commsssionID" class="form-input__error-msg">Commission is mandatory</span>
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="cancelAssignCommission" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="assignBtn" class="btn btn--primary ml-1">
                Assign Commission
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="edit-driver" uk-modal container="#parent-component" >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="modal-header">
            <h2>Edit Rider</h2>
            <p>Edit/update rider name, description and necessary information from here</p>
          </div>
          <form @submit.prevent="updateDriver">
             <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-2 less-gp">
                <label  class="form-input">
                  <span class="form-input__label">First name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.riderfirstname" type="text" placeholder="">
                  </div>
                  <span v-if="errorUpdateData.riderfirstname" class="form-input__error-msg">First name is mandatory</span>
                </label>

                <label  class="form-input">
                  <span class="form-input__label">Last name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.riderlastname" type="text" placeholder="">
                  </div>
                  <span v-if="errorUpdateData.riderlastname" class="form-input__error-msg">Last name is mandatory</span>
                </label>

              </div>
              <div class="flex-width-1-1 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Rider's Address</span>
                  <div class="form-input__input">
                    <input v-model="updateData.residentialaddress" type="text"  placeholder="">
                  </div>
                </label>
                <label  class="form-input">
                  <span class="form-input__label">Phone number</span>
                  <div class="form-input__input">
                    <input v-model="updateData.riderphonenumber" type="tel" pattern="^[0]\d{10}$" required placeholder="">
                  </div>
                  <span v-if="errorUpdateData.riderphonenumber" class="form-input__error-msg">Phone number is mandatory</span>
                </label>

              </div>
			  <div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Email Address</span>
                  <div class="form-input__input">
                    <input v-model="updateData.rideremailaddress" type="email"  placeholder="">
                  </div>
                  <span v-if="errorUpdateData.rideremailaddress" class="form-input__error-msg">Email Address is mandatory</span>
                </label>
                 <label  class="form-input">
				   		<span class="form-input__label">Contract Type</span>
				  		<div class="form-input__input">
							<select v-model="updateData.contracttype">
								<option value="">Select contract type</option>
								<option>Hire Purchase</option>
								<option>Third Party</option>
							</select>
						 </div>
						  <span v-if="errorUpdateData.contracttype" class="form-input__error-msg">Contract type is mandatory</span>
		  			</label>


              </div>
             
              <div class="flex-width-1-1 less-gp">
				   <label  class="form-input">
				   		<span class="form-input__label">Branch</span>
				  		<div class="form-input__input">
							<select v-model="updateData.branchID">
								<option v-for="branch in branches" :key="branch.id" :value="branch.id">
								{{ branch.branchname }}
								</option>
							</select>
						 </div>
						 <span v-if="errorUpdateData.branchID" class="form-input__error-msg">Branch is mandatory</span>
		  			</label>
		 
              </div>
              <div class="flex-width-1-2 less-gp">
				  
               <label  class="form-input">
                  <span class="form-input__label">Guarantor (1) First Name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.refreefirstname" type="text"  placeholder="">
                  </div>
                  <span v-if="errorUpdateData.refreefirstname" class="form-input__error-msg">Guarantor First Name is mandatory</span>
                </label>
				 
                <label  class="form-input">
                  <span class="form-input__label">Guarantor (1) Last Name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.refreelastname" type="text"  placeholder="">
                  </div>
                  <span v-if="errorUpdateData.refreelastname" class="form-input__error-msg">Guarantor last name is mandatory</span>
                </label>
              </div>
			  <div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (1)Address</span>
                  <div class="form-input__input">
					  <input v-model="updateData.refreeaddress" type="text"  placeholder="">
                  </div>
				  <span v-if="errorUpdateData.refreeaddress" class="form-input__error-msg">Guarantor Address is mandatory</span>
                </label>
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (1) Phone Number</span>
                  <div class="form-input__input">
					  <input v-model="updateData.refreephonenumber" type="tel" pattern="^[0]\d{10}$" placeholder="">
                  </div>
				  <span v-if="errorUpdateData.refreephonenumber" class="form-input__error-msg">Guarantor Phone Number is mandatory</span>
                </label>
			  </div>
			  <div class="flex-width-1-2 less-gp">
				  
               <label  class="form-input">
                  <span class="form-input__label">Guarantor (2) First Name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.refree_2firstname" type="text"  placeholder="">
                  </div>
                </label>
				 
                <label  class="form-input">
                  <span class="form-input__label">Guarantor (2) Last Name</span>
                  <div class="form-input__input">
                    <input v-model="updateData.refree_2lastname" type="text"  placeholder="">
                  </div>
                </label>
              </div>
			  <div class="flex-width-1-2 less-gp">
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (2)Address</span>
                  <div class="form-input__input">
					  <input v-model="updateData.refree_2address" type="text"  placeholder="">
                  </div>
                </label>
				<label  class="form-input">
                  <span class="form-input__label">Guarantor (2) Phone Number</span>
                  <div class="form-input__input">
					  <input v-model="updateData.refree_2phonenumber" type="tel"  placeholder="">
                  </div>
                </label>
			  </div>
			  <div class="flex-width-1-2 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Photo ID (Head shot)</span>
                  <div class="form-input__input">
                    <input @change="handleUpdateImage" type="file" accept=".png, .jpg, .jpeg" ref="file">
                  </div>
                </label>

				<label  class="form-input">
					<span class="form-input__label">NIN</span>
					<div class="form-input__input">
						 <input v-model="updateData.nin" type="text" placeholder="" pattern="^\d{11}$">
					</div>
					<span v-if="errorUpdateData.nin" class="form-input__error-msg">NIN is mandatory</span>
					</label>
			  </div>
			  <div class="flex-width-1-1 less-gp">
				  <label  class="form-input">
                  <span class="form-input__label">Registration Number</span>
                  <div class="form-input__input">
                    <input v-model="updateData.registrationnumber" type="text" placeholder="">
                  </div>
				  <span v-if="errorUpdateData.registrationnumber" class="form-input__error-msg">Registration Number is mandatory</span>
                </label>

				<!-- <label  class="form-input">
					<span class="form-input__label"> Rider Token</span>
					<div class="form-input__input">
						<input v-model="updateData.ridertoken" type="text" placeholder="">
					</div>
					</label> -->
			  </div>
              <div class="flex-width-1-2 less-gp">
				 <label  class="form-input">
				   		<span class="form-input__label">Bank Name</span>
				  		<div class="form-input__input">
							<select v-model="updateData.bankname">
								<option value="" selected>Select Bank</option>
								<option>Access Bank</option>
								<option>Access ( Diamond) Bank</option>
								<option>Citibank</option>
								<option>Ecobank</option>
								<option>Fidelity Bank</option>
								<option>First City Monument Bank (FCMB)</option>
								<option>First bank</option>
								<option>FSDH Merchant Bank</option>
								<option>Guarantee Trust Bank (GTB)</option>
								<option>Globus bank</option>
								<option>Heritage Bank</option>
								<option>Keystone Bank</option>
								<option>Kuda bank</option>
								<option>Lotus bank</option>
								<option>Polaris Bank</option>
								<option>Providus bank</option>
								<option>Rand Merchant Bank</option>
								<option>Stanbic IBTC Bank</option>
								<option>Standard Chartered Bank</option>
								<option>Sterling Bank</option>
								<option>Suntrust Bank</option>
								<option>Union Bank</option>
								<option>United Bank for Africa (UBA)</option>
								<option>Unity Bank</option>
								<option>Wema Bank</option>
								<option>Zenith Bank</option>
						</select>
						 </div>
						  <span v-if="errorUpdateData.bankname" class="form-input__error-msg">Bank Name is mandatory</span>
		  			</label>


				<label  class="form-input">
					<span class="form-input__label"> Account Number</span>
					<div class="form-input__input">
						<input v-model="updateData.bankaccount" type="text" placeholder="" pattern="^\d{10}$">
					</div>
					<span v-if="errorUpdateData.bankaccount" class="form-input__error-msg">Bank Account is mandatory</span>
					</label>
			  </div>
             
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button type="button" @click="cancelUpdate" class="btn btn-no-fill">
                Cancel
              </button>
              <button type="submit" id="updateBtn" class="btn btn--primary ml-1">
                Update rider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <overlay-scrollbars class="table-wrapper">
        <figcaption class="sr">
          A table showing information of categories
        </figcaption>
        <table class="table-content large-content">
          <thead class="">
            <tr>             
				<th  class="column-name">Rider Name</th>
				<th  class="column-name">Token</th>
				<th class="column-name">Phone Number</th>
				<th  class="column-name">Contract type</th>
				<th class="column-name">Bike Reg. No</th>
				<th class="column-name">Branch</th>
				<th class="">Actions</th>			
            </tr>
          </thead>
          <tbody class="tablebody">
            <tr v-if="loading">
              <td colspan="12">Loading...please wait</td>
            </tr>
            <tr v-if="!loading && filteredList.length < 1">
              <td colspan="12">No records at the moment</td>
            </tr>
            <tr 
			v-if="!loading && filteredList.length > 0" 
			v-for="(row, ix) in filteredList" 
			v-bind:key="ix"
			:class="(row.active === false) ? 'disabled-tr' : ''"
            :uk-tooltip="(row.active === false) ? 'title: This Rider has been suspended; pos: bottom': null"
			>
              
              <td  class="column-name">
                <a href="javascript:;"  @click="displayDetails(row)" class="avatar-wtext">
                  <!-- <img v-if="row.orderdetails.riderphoto === '' || row.orderdetails.riderphoto === null" src="/default_image.png" alt="">
                  <img v-else :src="row.orderdetails[0].riderphoto" alt=""> -->
				  <i v-if="row.riderstatus == 'online' " class="online" title="Online"></i>
				  <i v-if="row.riderstatus == 'offline' " class="offline" title="Offline"></i>
				  <i v-if="row.riderstatus == null " class="unavailable" title="Unavailable"></i>
                  <span  class="column-name">{{ row.riderfirstname }}, {{row.riderlastname}}</span>
				  
                </a>
              </td>
			  <td class="column-name" @click="displayDetails(row)">{{row.ridertoken ? row.ridertoken : "N/A"}}</td>
			  <td class="column-name" @click="displayDetails(row)">{{row.riderphonenumber ? row.riderphonenumber : "N/A"}} </td>
              <td class="column-name" @click="displayDetails(row)">{{row.contracttype ? row.contracttype : "N/A"}}</td>
              <td class="column-name" @click="displayDetails(row)">{{row.registrationnumber ? row.registrationnumber : "N/A"}}</td>
              <td class="column-name" @click="displayDetails(row)">{{row.branchname ? row.branchname : "N/A"}}</td>
              <div class="td">
                <div class="drop-down org-drop drop-set">
                  <button class="btn btn-icon drop-set" style="margin-top: auto; margin-bottom: auto" title="View Actions" type="button" @click.stop="toggleDropdown($event)">
                    <svg class="drop-set">
                      <use xlink:href="/uploads/icons.svg#more"></use>
                    </svg>
                  </button>
                  <div class="drop-wrapper" data-drop-down>
                    <ul class="drop-lists">
                      <li class="drop-list-item" v-if="(user.rolepermission ? user.rolepermission[0].riders.editrider:'') || isMerchant">
                        <button type="button" class="btn btn-text" @click="editRecord(row)">
                          Edit Rider
                        </button>
                      </li>
                      <li class="drop-list-item" v-if="(user.rolepermission ? user.rolepermission[0].riders.resettoken:'') || isMerchant">
                        <button type="button" id="changeToken" class="btn btn-text" @click="changeToken(row)">
                          Reset Token
                        </button>
                      </li>
					  <li class="drop-list-item" v-if="((user.rolepermission ? user.rolepermission[0].riders.disablerider:'') || isMerchant) && row.active">
                        <button type="button" class="btn btn-text" uk-toggle="target: #disable" @click="setupDisableRider(row.id)">
                          Suspend Rider
                        </button>
                      </li>
					   <li class="drop-list-item" v-if="((user.rolepermission ? user.rolepermission[0].riders.disablerider:'') || isMerchant) && row.active == false">
                        <button type="button" class="btn btn-text" uk-toggle="target: #enable" @click="setupDisableRider(row.id)">
                          Activate Rider
                        </button>
                      </li>
                      <li class="drop-list-item" v-if="(user.rolepermission ? user.rolepermission[0].riders.deleterider:'') || isMerchant">
                        <button class="btn btn-text" type="button" uk-toggle="target: #delete" @click="setupDeleteDriver(row.id)">
                          Delete Rider
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </overlay-scrollbars>
    </div>
  </overlay-scrollbars>
</template>
<script>
import Pagination from '../../components/Pagination.vue';
import RiderCommision from '../../components/RiderCommision.vue';
export default {
	components: {RiderCommision, Pagination},
	layout: 'main',	
	computed: {
		
		
	},
	data: () => ({
		search: '',
		loading: true,
		riders: [],
		filterContent:[],
		branches: [],
		driver_id: '',
		filterText:'',
		errorData: {
			registrationnumber: false,
			riderfirstname:false,
			riderlastname:false,
			riderphonenumber:false,
			refreelastname:false,
			refreefirstname:false,
			refreephonenumber:false,
			refreeaddress:false,
			contracttype:false,
			nin:false,
			rideremailaddress:false,
			branchID:false,
			bankname:false,
			bankaccount:false,
			residentialaddress:false
		},
		disableData:{
			id: ''
		},
		formData: {
			registrationnumber: "",
			riderfirstname:"",
			riderlastname:"",
			riderothername:"",
			riderphonenumber:"",
			refreelastname:"",
			refreefirstname:"",
			refreephonenumber:"",
			refreeaddress:"",
			refree_2lastname:"",
			refree_2firstname:"",
			refree_2phonenumber:"",
			contracttype:"",
			nin:"",
			rideremailaddress:"",
			merchID:"",
			branchID:"",
			ridertoken:"",
			riderphoto:"",
			bankname:"",
			bankaccount:"",
			residentialaddress:""
		},
		// commissions: [],
		updateData: {
			id:"",
		  	registrationnumber: "",
			riderfirstname:"",
			riderlastname:"",
			riderothername:"",
			riderphonenumber:"",
			refreelastname:"",
			refreefirstname:"",
			refreephonenumber:"",
			refreeaddress:"",
			refree_2lastname:"",
			refree_2firstname:"",
			refree_2phonenumber:"",
			contracttype:"",
			nin:"",
			rideremailaddress:"",
			merchID:"",
			branchID:"",
			ridertoken:"",
			riderphoto:"",
			bankname:"",
			bankaccount:"",
			residentialaddress:""
		},
		errorUpdateData: {
			registrationnumber: false,
			riderfirstname:false,
			riderlastname:false,
			riderphonenumber:false,
			refreelastname:false,
			refreefirstname:false,
			refreephonenumber:false,
			refreeaddress:false,
			contracttype:false,
			nin:false,
			rideremailaddress:false,
			branchID:false,
			// bankname:false,
			// bankaccount:false,
			residentialaddress:false
		},
		passwordData:{
		  password: '',
			passwordconfirmation: '',
			errorpassword: false,
			message: ''
		},
		riderData: {
			merchID: '',
			startdate: '',
			enddate: '',
			branchID:'',
      		riderID:'',
			export:''
		},
		get: {
			id :0,
			page: 1
		},
		headers: {
			Next: '',
			Prev: '',
			count: 0,
			total: 0,
			pagenum: 1
		},
		filteredList:[],
	}),
	methods: {
		orderStatus(){
			this.filteredList  =  this.riders.filter(rider => {
				if(this.filterText == ''){
					return this.riders
				}
				if(rider.riderstatus != null && rider.riderstatus.toLowerCase().includes(this.filterText.toLowerCase())){
					return rider.riderstatus.toLowerCase().includes(this.filterText.toLowerCase())
				}
								
			})
		},
		getRiders () {
			// if(this.search == '') {
			// 	return this.riders;
			// } else {
				this.filteredList  = this.riders.filter(rider => {
					if (rider.riderfirstname !=null && rider.riderfirstname.toLowerCase().includes(this.search.toLowerCase())) {
						return rider.riderfirstname.toLowerCase().includes(this.search.toLowerCase());
					}
					if (rider.riderlastname != null && rider.riderlastname.toLowerCase().includes(this.search.toLowerCase())) {
						return rider.riderlastname.toLowerCase().includes(this.search.toLowerCase());
					}
					if(rider.registrationnumber != null && rider.registrationnumber.toLowerCase().includes(this.search.toLowerCase())) {
						return rider.registrationnumber.toLowerCase().includes(this.search.toLowerCase())
					}
					
					if(rider.contracttype != null && rider.contracttype.toLowerCase().includes(this.search.toLowerCase())) {
						return rider.contracttype.toLowerCase().includes(this.search.toLowerCase())
					}
					
					if(rider.riderstatus != null && rider.riderstatus.toLowerCase().includes(this.search.toLowerCase())) {
						return rider.riderstatus.toLowerCase().includes(this.search.toLowerCase())
					}
					if(rider.id != null && rider.id == this.search) {
						return rider.id == this.search
					}				
					
				});
			// }
		},
		setupDeleteDriver(id) {
			this.driver_id  = id;
			
		},
		setupDisableRider(id){
			this.disableData.id = id
		},
		getCommisionById(id) {
			let commission = this.commissions.find(commission => commission.id == id);
			if(commission != null){
				return commission.commissionrule;
			} 
			return 'Not Assigned';
		},
		openAssignCommission(rider) {
			this.updateData = {
	      id: rider.id,
				registrationnumber: rider.registrationnumber,
				merchID: rider.merchID,
				branchID: rider.branchID,
				vehicletype: rider.vehicletype,
				// rideremailaddress: rider.rideremailaddress,
				riderfirstname: rider.riderfirstname,
				commsssionID: rider.commsssionID,
				riderlastname: rider.riderlastname,
				ridertoken: rider.ridertoken,
				riderphonenumber: rider.riderphonenumber,
				riderphoto: rider.riderphoto,
				bankname:rider.bankname,
				bankaccount: rider.bankaccount
			}
			UIkit.modal('#assign-commission').toggle()
		},
		openCommisionModal(){
			UIkit.modal('#rider-commission').toggle()
		},
		deleteDriver() {
			$('#deleteBtn').attr('disabled', true).html('Deleting ... ')
			this.$store.dispatch('riders/deleteRider', this.driver_id)
      	.then(res => {
					
					if(res.data.status) {
						$('#deleteBtn').attr('disabled', false).html('Delete')
						this.$toast.success(res.data.message)
						this.getAllRiders()
						this.closeDeleteModal()
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
					console.log(e)
				})
		},
		disableRider() {
			$('#disableBtn').attr('disabled', true).html('Suspending...')
			this.$store.dispatch('riders/disableRider', this.disableData)
				.then(res => {
							
							if(res.data.status) {
								$('#disableBtn').attr('disabled', false).html('Suspend')
								this.$toast.success("Rider is suspended!")
								this.getAllRiders()
								this.closeDisableModal()
								return
				}
          
				this.$toast.error(res.data.message)
				}).catch(e =>{
					console.log(e)
				})
		},
		restoreRider() {
			$('#restoreBtn').attr('disabled', true).html('Activating ...')
			this.$store.dispatch('riders/restoreRider', this.disableData)
				.then(res => {
							
							if(res.data.status) {
								$('#restoreBtn').attr('disabled', false).html('Activate')
								this.$toast.success("Rider is activated!")
								this.getAllRiders()
								this.closeRestoreModal()
								return
				}
          
				this.$toast.error(res.data.message)
				}).catch(e =>{
					console.log(e)
				})
		},
		getCommissions() {
	    this.$store.dispatch('riders/listCommissions', this.formData.merchID)
				.then(res =>{
					// this.loading = false
					this.commissions = res.data.data != undefined ? res.data.data : [];
					// console.log(this.commissions)
				}).catch(err =>{
					// this.loading = false
					console.log(err)
				})
		},
	  createDriver() {
			if(this.validateRiderData()) {
				return;
			}
			this.formData.merchID = this.user.role ? this.user.merchID : this.user.id

			$('#createBtn').attr('disabled', true).html('Creating rider....please wait')
			this.$store.dispatch('riders/createRider', this.formData)
				.then(res => {
					$('#createBtn').attr('disabled', false).html('+ Create rider')
					if(res.data.status) {
						this.$toast.success(res.data.message)
						this.getAllRiders()
						this.closeModal()
						return
					}
          
					this.$toast.error(res.data.message)
				}).catch(e =>{
					$('#createBtn').attr('disabled', false).html('+ Create rider')
					console.log(e)
				})
	  },
		displayDetails(rider) {
			localStorage.removeItem('driver')
			localStorage.setItem('driver', JSON.stringify(rider))
			this.$store.dispatch('riders/setRider', rider)
			this.$router.push('/riders/details/' + rider.id)
		},
    
		assignCommissions() {
			// if(this.validateRiderEdit()) {
			// 	return;
			// }
			this.clearRiderEditError()
			// if(this.passwordData.password !== '') {
			// 	this.updateData.riderpassword = this.passwordData.password
			// }
      
			// 	if(this.updateData.commsssionID === '') {
	    //   this.errorUpdateData.commsssionID = true
			// 		return true
			// 	}
			$('#assignBtn').attr('disabled', true).html('Assigning Commission....please wait')
			this.$store.dispatch('riders/updateRider', this.updateData)
				.then(res =>{
					$('#assignBtn').attr('disabled', false).html('+ Assign commission')
					if(res.data.status) {
					  this.$toast.success(res.data.message)
						this.getAllRiders()
						this.cancelAssignCommission()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					$('#assignBtn').attr('disabled', false).html('+ Assign commission')
					console.log(e)
				})
		},
    
		changeToken (user) {
			$('#changeToken').html('Resetting token....please wait')
			$('#changeToken').attr('disabled', true);
			let token = {
				id: user.id,
				ridertoken : user.ridertoken
			}
			this.$store.dispatch('riders/changeToken', token)
				.then(res =>{
					
					if(res.data.status) {
						$('#changeToken').attr('disabled', false).html('Reset token')
					  this.$toast.success(res.data.message)
						this.getAllRiders()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					$('#changeToken').attr('disabled', false).html('Reset token')
					console.log(e)
				})
		},

		updateDriver() {
			if(this.validateRiderEdit()) {
				return;
			}
			// if(this.passwordData.password !== '') {
			// 	this.updateData.riderpassword = this.passwordData.password
			// }
			$('#updateBtn').html('Updating rider....please wait')
			$('#updateBtn').attr('disabled', true);
			this.$store.dispatch('riders/updateRider', this.updateData)
				.then(res =>{
					$('#updateBtn').attr('disabled', false).html('+ Update rider')
					if(res.data.status) {
					  this.$toast.success(res.data.message)
						this.getAllRiders()
						this.cancelUpdate()
						return
					}
          
					this.$toast.error('An error occurred')
				}).catch(e =>{
					$('#updateBtn').attr('disabled', false).html('+ Update rider')
					console.log(e)
				})
		},
		editRecord(rider) {
			this.updateData = {
	            id: rider.id,
				registrationnumber: rider.registrationnumber,
				merchID: rider.merchID,
				branchID: rider.branchID,
				rideremailaddress: rider.rideremailaddress,
				riderfirstname: rider.riderfirstname,
				riderlastname: rider.riderlastname,
				riderothername:rider.riderothername,
				riderphonenumber: rider.riderphonenumber,
				refreelastname: rider.refreelastname,
				refreefirstname:rider.refreefirstname,
				refreephonenumber:rider.refreephonenumber,
				refreeaddress: rider.refreeaddress,
				refree_2lastname:rider.refree_2lastname,
				refree_2firstname:rider.refree_2firstname,
				refree_2phonenumber:rider.refree_2phonenumber,
				refree_2address:rider.refree_2address,
				contracttype:rider.contracttype,
				nin:rider.nin,
				merchID: this.user.role ? this.user.merchID : this.user.id,
				branchID:rider.branchID,
				ridertoken:rider.ridertoken,
				riderphoto: rider.riderphoto,
				bankname:rider.bankname,
				bankaccount: rider.bankaccount
			}
			UIkit.modal('#edit-driver').toggle()
		},
		cancelUpdate() {
			this.updateData = {
				registrationnumber: '',
				merchID: '',
				branchID: '',
				vehicletype: '',
				rideremailaddress: '',
				riderfirstname: '',
				riderlastname: '',
				commsssionID: '',
				riderphonenumber: '',
				riderphoto: '',
				bankname:'',
				bankaccount: ''
			}
			UIkit.modal('#edit-driver').toggle('hide')
		},
		cancelAssignCommission() {
			this.updateData = {
				registrationnumber: '',
				merchID: '',
				branchID: '',
				vehicletype: '',
				rideremailaddress: '',
				riderfirstname: '',
				riderlastname: '',
				commsssionID: '',
				riderphonenumber: '',
				riderphoto: '',
				bankname:'',
				bankaccount: ''
			}
			UIkit.modal('#assign-commission').toggle('hide')
		},
		validateRiderEdit() {
			this.clearRiderEditError()
			if(this.updateData.riderfirstname === '') {
				this.errorUpdateData.riderfirstname = true
				return true
			}
			if(this.updateData.riderlastname === '') {
				this.errorUpdateData.riderlastname = true
				return true
			}
			if(this.updateData.rideremailaddress === '') {
				this.errorUpdateData.rideremailaddress = true
				return true
			}
			if(this.updateData.riderphonenumber === ''){
			  this.errorUpdateData.riderphonenumber = true
				return true;
			}

			if(this.updateData.branchID === '') {
			  this.errorUpdateData.branchID = true;
			  return true;
			}

			if(this.updateData.registrationnumber === ''){
			  this.errorUpdateData.registrationnumber = true
				return true
			}
			if(this.updateData.contracttype === ''){
			  this.errorUpdateData.contracttype = true
				return true
			}
			if(this.updateData.refreefirstname === ''){
			  this.errorUpdateData.refreefirstname = true
				return true
			}
			if(this.updateData.refreelastname === ''){
			  this.errorUpdateData.refreelastname = true
				return true
			}
			if(this.updateData.refreeaddress === ''){
			  this.errorUpdateData.refreeaddress = true
				return true
			}
			if(this.updateData.refreephonenumber === ''){
			  this.errorUpdateData.refreephonenumber = true
				return true
			}
			if(this.updateData.nin === ''){
			  this.errorUpdateData.nin = true
				return true
			}
			if(this.updateData.bankname === ''){
			  this.errorUpdateData.bankname = true
				return true
			}
			if(this.updateData.bankaccount === ''){
			  this.errorUpdateData.bankaccount = true
				return true
			}
			if(this.updateData.residentialaddress === ''){
			  this.errorUpdateData.residentialaddress = true
				return true
			}
			
			
			return false
		},
		clearRiderEditError() {
	    this.errorUpdateData = {
				registrationnumber: false,
				riderfirstname:false,
				riderlastname:false,
				riderphonenumber:false,
				refreelastname:false,
				refreefirstname:false,
				refreephonenumber:false,
				refreeaddress:false,
				contracttype:false,
				nin:false,
				rideremailaddress:false,
				branchID:false,
				bankname:false,
				bankaccount:false
			}
		},
		validateRiderData() {
	    this.clearError()
			if(this.formData.riderfirstname === '') {
				this.errorData.riderfirstname = true;
				return true;
				
			}

			if(this.formData.riderlastname === '') {
			  this.errorData.riderlastname = true
				return true;
			}

			if(this.formData.rideremailaddress === ''){
			  this.errorData.rideremailaddress = true
				return true;
			}

			if(this.formData.riderphonenumber === ''){
			  this.errorData.riderphonenumber = true
				return true;
			}

			if(this.formData.branchID === '') {
			  this.errorData.branchID = true;
			  return true;
			}

			if(this.formData.registrationnumber === ''){
			  this.errorData.registrationnumber = true
				return true
			}
			if(this.formData.contracttype === ''){
			  this.errorData.contracttype = true
				return true
			}
			if(this.formData.refreefirstname === ''){
			  this.errorData.refreefirstname = true
				return true
			}
			if(this.formData.refreelastname === ''){
			  this.errorData.refreelastname = true
				return true
			}
			if(this.formData.refreeaddress === ''){
			  this.errorData.refreeaddress = true
				return true
			}
			if(this.formData.refreephonenumber === ''){
			  this.errorData.refreephonenumber = true
				return true
			}
			if(this.formData.nin === ''){
			  this.errorData.nin = true
				return true
			}
			// if(this.formData.bankname === ''){
			//   this.errorData.bankname = true
			// 	return true
			// }
			// if(this.formData.bankaccount === ''){
			//   this.errorData.bankaccount = true
			// 	return true
			// }
			if(this.formData.residentialaddress === ''){
			  this.errorData.residentialaddress = true
				return true
			}
			

			

			return false
		},
		clearError() {
			this.errorData = {
				registrationnumber: false,
				riderfirstname:false,
				riderlastname:false,
				riderphonenumber:false,
				refreelastname:false,
				refreefirstname:false,
				refreephonenumber:false,
				refreeaddress:false,
				contracttype:false,
				nin:false,
				rideremailaddress:false,
				branchID:false,
				bankname:false,
				bankaccount:false
			}
		},
		handleImage(e) {
			let files = e.target.files
			var allowed_types = [ 'image/png',
					'image/jpg', 'image/jpeg']
			if(!files.length)
				return
			if (!allowed_types.includes(files[0].type)) {
				this.$toast.error('Only Images of Type jpg, jpeg and png allowed')
				return
			}
			this.createBase64Image(files[0])
		},
		createBase64Image(fileObject) {
			let reader = new FileReader()
			reader.onload = (e) => {
				this.formData.riderphoto = e.target.result.split(',')[1]
			};
			reader.readAsDataURL(fileObject)
		},
		handleUpdateImage(e) {
			let files = e.target.files
			var allowed_types = [ 'image/png',
					'image/jpg', 'image/jpeg']
			if(!files.length)
				return
			if (!allowed_types.includes(files[0].type)) {
				this.$toast.error('Only Images of Type jpg, jpeg and png allowed')
				return
			}
			this.createBase64UpdateImage(files[0])
		},
		createBase64UpdateImage(fileObject) {
			let reader = new FileReader()
			reader.onload = (e) => {
				this.updateData.riderphoto = e.target.result.split(',')[1]
			};
			reader.readAsDataURL(fileObject)
		},
	  getAllRiders() {
		this.loading = true
		// if(this.isSupervisor) {
		// 	this.get.branchID = this.user.branchID
		// }
	    this.$store.dispatch('riders/getRiders', this.riderData)
				.then(res =>{
					this.riders = res.data.data
					this.filteredList = res.data.data
					// .filter((rider) => this.isSupervisor ? rider.branchID == this.user.branchID : true)
					if (res.data.data != undefined && res.data.data.length > 0) {
						this.setHeaders(this.riders, res.data.headers)
					}
				  	this.loading = false
				}).catch(e =>{
				  this.loading = false
					console.log(e)
				})
		},
		openAddModal() {
			this.formData = {
				registrationnumber: "",
				riderfirstname:"",
				riderlastname:"",
				riderothername:"",
				riderphonenumber:"",
				refreelastname:"",
				refreefirstname:"",
				refreephonenumber:"",
				refree_1address:"",
				refree_2lastname:"",
				refree_2firstname:"",
				refree_2phonenumber:"",
				refree_2address:"",
				contracttype:"",
				nin:"",
				rideremailaddress:"",
				merchID: this.user.role ? this.user.merchID : this.user.id,
				branchID:"",
				ridertoken:"",
				riderphoto:""
			}
			UIkit.modal('#add-driver').toggle()
		},
		closeDisableModal(){
			this.disableData = {
				id:''
			}
			UIkit.modal('#disable').toggle('hide')
		},
		closeRestoreModal(){
			this.disableData = {
				id:''
			}
			UIkit.modal('#enable').toggle('hide')
		},
		closeDeleteModal(){
			this.driver_id = ''
			UIkit.modal('#delete').toggle('hide')
		},
		closeModal(){
			this.formData = {
				registrationnumber: "",
				riderfirstname:"",
				riderlastname:"",
				riderothername:"",
				riderphonenumber:"",
				refreelastname:"",
				refreefirstname:"",
				refreephonenumber:"",
				refree_1address:"",
				refree_2lastname:"",
				refree_2firstname:"",
				refree_2phonenumber:"",
				refree_2address:"",
				contracttype:"",
				nin:"",
				rideremailaddress:"",
				ridertoken:"",
			}
			UIkit.modal('#add-driver').toggle('hide')
		},
		getAllBranches() {
			this.$store.dispatch('branches/listBranches', this.formData.merchID)
				.then(res =>{
					this.branches = res.data.data
					this.$store.dispatch('branches/setBranches', this.branches)
				}).catch(e =>{
					console.log(e)
				})
		}
	},
	mounted() {
	  this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
	  this.riderData.merchID =  this.formData.merchID
	  this.get.id = this.formData.merchID
		this.getAllRiders()
		this.getRiders
		// this.getCommissions()
		this.getAllBranches()
	},
	beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].riders.viewriders: '')){
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

table{
    width:100% !important;
}
td:hover {
	cursor: pointer;
}
/* .avatar-wtext span{
	margin-left: -5px;
} */
.avatar-wtext i.online{
	width: 10px;
    height: 10px;
    background-color: forestgreen;
    border-radius: 50%;
    margin-right: 4px;
}
.avatar-wtext i.offline{
	width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    margin-right: 4px;
}
.avatar-wtext i.unavailable{
	width: 10px;
    height:10px;
    background-color: gold;
    border-radius: 50%;
    margin-right: 4px;
}
table .disabled-tr {
    background: white;
}
table .disabled-tr td {
    opacity: 0.5;
}
/* table .disabled-tr td:last-of-type {
    opacity: 1;
} */
table .disabled-tr td:last-of-type .btn {
    opacity: 0.5;
}
table .disabled-tr td:first-of-type {
    position: relative;
}
table .disabled-tr td:first-of-type .disable-svg {
    position: absolute;
    width: 20px;
    height: 20px;
    right: -10px;
    opacity: 1;
}
</style>
