<template>
  <overlay-scrollbars class="main-content-wrap">
    <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16"></p>
      <div class="search-filter d-flx-alc-jfe">
        <label class="search-w-icon">
          <input v-model="search" type="text" @keyup="filterRole" placeholder="Search" />
          <svg>
            <use href="/uploads/icons.svg#search"></use>
          </svg>
        </label>
        <div class="drop-down filter-drop">
          <select
            v-model="roleFilter"
            class="filter-btn box-deco-smallr"
            @change="allRoles"
          >
            <option value="">All Roles</option>
            <option v-for="(role, ix) in staff_role" :key="ix">
				{{role.rolename}}
			</option>
          </select>
        </div>
        <button class="btn btn--primary" type="button" @click="showModal" v-if="(user.rolepermission ? user.rolepermission[0].staff.addstaff:'') || isMerchant">
          Add new user
        </button>
      </div>
    </div>
    <div id="parent-component">
      <div
        id="add-staff"
        uk-modal
        container="#parent-component"
        data-uk-modal="{bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="closeModal"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Add User </h2>
            <p>
              Add user name, description and necessary information from here
            </p>
          </div>
          <form @submit.prevent="createStaff">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Avatar</span>
                  <div class="form-input__input">
                    <input
                      @change="handleImage"
                      type="file"
                      ref="file"
                      accept="image/*"
                    />
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">First name</span>
                  <div class="form-input__input">
                    <input
                      v-model="formData.firstname"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.firstname" class="form-input__error-msg"
                    >First name is mandatory</span
                  >
                </label>

                <label class="form-input">
                  <span class="form-input__label">Last name</span>
                  <div class="form-input__input">
                    <input
                      v-model="formData.lastname"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.lastname" class="form-input__error-msg"
                    >Last name is mandatory</span
                  >
                </label>
              </div>

              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Phone number <span style="color: red; font-size: 12px">(must be 10-digits e.g: 8077777777)</span></span>
                  <div class="flex-width-uneven input-phone-flag">
                    <div class="d-flx-alc flag-drop">
                      <img src="/uploads/flag.svg" alt="" />
                      <p>+234</p>
                    </div>
                    <div class="form-input__input">
                      <input
                        v-model="formData.phonenumber"
                        placeholder=""
                        type="tel"
                        pattern="^\d{10}$"
                        required
                      />
                    </div>
                  </div>
                  <span v-if="errorData.phone" class="form-input__error-msg"
                    >Phone number is mandatory</span
                  >
                </label>
              </div>

              <div class="flex-width-1-1 less-gp">
                <!-- <div  class="form-input">
                  <label class="form-input__label">User role</label>
                  <div class="form-input__input">
                    <select v-model="formData.role" class="filter-btn box-deco-smallr">
                      <option value="">-Select User Role-</option>
                      <option>
                        Logistics
                      </option>
                    </select>
                  </div>
                  <span v-if="errorData.role" class="form-input__error-msg">User role is mandatory</span>
                </div> -->

                <div class="form-input">
                  <label class="form-input__label">Select Branch(es)</label>
                  <div class="form-input__input">
                    <select2-multiple-control
                      v-model="formData.branchID"
                      :placeholder="'Select as least one branch'"
                      :options="options"
                      :settings="settings"
                    />
                  </div>
                  <span v-if="errorData.branch" class="form-input__error-msg"
                    >Branch is mandatory</span
                  >
                </div>
              </div>

              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Email address</span>
                  <div class="form-input__input">
                    <input
                      type="email"
                      v-model="formData.emailaddress"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.email" class="form-input__error-msg"
                    >Enter a valid email address</span
                  >
                </label>
              </div>

              <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Password</span>
                  <div class="form-input__input">
                    <input
                      type="password"
                      v-model="confirmPass.password"
                      placeholder=""
                    />
                  </div>
                  <span
                    v-if="confirmPass.passwordError"
                    class="form-input__error-msg"
                    >Enter a password</span
                  >
                </label>
                <label class="form-input">
                  <span class="form-input__label">Confirm password</span>
                  <div class="form-input__input">
                    <input
                      v-model="confirmPass.confirmPassword"
                      type="password"
                    />
                  </div>
                  <span
                    v-if="confirmPass.confirmPasswordError"
                    class="form-input__error-msg"
                    >{{ confirmPass.message }}</span
                  >
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button
                id="submitBtn"
                type="submit"
                class="btn btn--primary ml-1"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        id="edit-staff"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#edit-staff',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical modal">
          <button
            class="uk-modal-close-default"
            @click="resetEditData"
            type="button"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Edit User</h2>
            <p>
              Edit/update user name, description and necessary information from
              here
            </p>
          </div>
          <form @submit.prevent="updateStaff">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <img
                  v-if="
                    editData.profilelink === '' ||
                    editData.profilelink === null ||
                    editData.profilelink === 'http://68.65.121.57:8080/'
                  "
                  src=""
                />
                <img
                  v-else-if="
                    editData.profilelink.includes('http://') &&
                    editData.profilelink.includes('https://')
                  "
                  :src="
                    editData.profilelink.replace(
                      'http://68.65.121.57:8080/',
                      ''
                    )
                  "
                  alt=""
                />
                <img
                  style="
                    margin-right: auto;
                    margin-left: auto;
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                  "
                  v-else
                  :src="editData.profilelink"
                  alt=""
                />
              </div>
              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Avatar</span>
                  <div class="form-input__input">
                    <input
                      @change="handleUpdateImage"
                      type="file"
                      ref="file"
                      accept="image/*"
                    />
                  </div>
                </label>
              </div>
              <div class="flex-width-1-2 less-gp">
                <label class="form-input">
                  <span class="form-input__label">First name</span>
                  <div class="form-input__input">
                    <input
                      v-model="editData.firstname"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.firstname" class="form-input__error-msg"
                    >First name is mandatory</span
                  >
                </label>

                <label class="form-input">
                  <span class="form-input__label">Last name</span>
                  <div class="form-input__input">
                    <input
                      v-model="editData.lastname"
                      type="text"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.lastname" class="form-input__error-msg"
                    >Last name is mandatory</span
                  >
                </label>
              </div>

              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Phone number</span>
                  <div class="flex-width-uneven input-phone-flag">
                    <div class="d-flx-alc flag-drop">
                      <img src="/uploads/flag.svg" alt="" />
                      <p>+234</p>
                    </div>
                    <div class="form-input__input">
                      <input
                        v-model="editData.phonenumber"
                        type="tel"
                        pattern="^\d{10}$"
                        required
                      />
                    </div>
                  </div>
                  <span v-if="errorData.phone" class="form-input__error-msg"
                    >Phone number is mandatory</span
                  >
                </label>
              </div>

              <div class="flex-width-1-1 less-gp">
                <div
                  class="form-input"
                >
                  <label class="form-input__label">Select Branch(es)</label>
                  <div class="form-input__input">
                    <select2-multiple-control
                      v-model="editData.branchID"
                      :placeholder="'Select as least one branch'"
                      :options="options"
                      :settings="settings"
                    />
                  </div>
                  <span v-if="errorData.branch" class="form-input__error-msg"
                    >Branch is mandatory</span
                  >
                </div>
              </div>

              <div
                class="flex-width-1-1 less-gp"
              >
                <label class="form-input">
                  <span class="form-input__label">Email address</span>
                  <div class="form-input__input">
                    <input
                      type="email"
                      v-model="editData.emailaddress"
                      placeholder=""
                    />
                  </div>
                  <span v-if="errorData.email" class="form-input__error-msg"
                    >Enter a valid email address</span
                  >
                </label>
              </div>

              <div class="flex-width-1-2 less-gp" v-if="changePasswordStatus">
                <label class="form-input">
                  <span class="form-input__label">Password</span>
                  <label class="search-w-icon">
                    <input
                      id="password"
                      v-model="confirmPass.password"
                      type="password"
                    />
                    <svg
                      id="edit-pass"
                      @click="
                        togglePassword('password', 'edit-pass', 'edit-pass-off')
                      "
                    >
                      <use href="/uploads/icons.svg#see"></use>
                    </svg>
                    <svg
                      style="display: none"
                      id="edit-pass-off"
                      @click="
                        togglePassword('password', 'edit-pass-off', 'edit-pass')
                      "
                    >
                      <use href="/uploads/icons.svg#see-off"></use>
                    </svg>
                  </label>
                  <!--                  <div class="form-input__input">-->
                  <!--                    <input v-model="confirmPass.password" type="password" >-->
                  <!--                  </div>-->
                  <span
                    v-if="confirmPass.passwordError"
                    class="form-input__error-msg"
                    >Password is mandatory</span
                  >
                </label>

                <label class="form-input">
                  <span class="form-input__label">Confirm password</span>
                  <label class="search-w-icon">
                    <input
                      id="confirm_password"
                      v-model="confirmPass.confirmPassword"
                      type="password"
                    />
                    <svg
                      id="edit-see"
                      @click="
                        togglePassword(
                          'confirm_password',
                          'edit-see',
                          'edit-see-off'
                        )
                      "
                    >
                      <use href="/uploads/icons.svg#see"></use>
                    </svg>
                    <svg
                      style="display: none"
                      id="edit-see-off"
                      @click="
                        togglePassword(
                          'confirm_password',
                          'edit-see-off',
                          'edit-see'
                        )
                      "
                    >
                      <use href="/uploads/icons.svg#see-off"></use>
                    </svg>
                  </label>
                  <span
                    v-if="
                      confirmPass.confirmPasswordError ||
                      confirmPass.password != confirmPass.confirmPassword
                    "
                    class="form-input__error-msg"
                    >{{
                      confirmPass.message != ""
                        ? "Password confirmation Does not Match"
                        : confirmPass.message
                    }}</span
                  >
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button
                type="submit"
                id="updateBtn"
                class="btn btn--primary ml-1"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        id="delete-text"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#delete-text',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="cancelDelete"
          >
            X
          </button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#co-delete"></use>
            </svg>
            <div class="ml-1">
              <h2>Delete User ?</h2>
              <p>
                Please confirm you really want to delete this staff, this action
                cannot be undone.
              </p>
            </div>
          </div>
          <div class="modal-body">
            <div class="d-flx-alc-jc mt-3">
              <button @click="cancelDelete" class="btn btn-no-fill">
                Cancel
              </button>
              <button
                id="deleteBtn"
                @click="doDeleteUser"
                class="btn btn-error ml-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        id="token"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#token',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="cancelToken"
          >
            X
          </button>
          <div class="modal-header d-flx">
            <svg>
              <use href="/uploads/icons.svg#auth-checked"></use>
            </svg>
            <div class="ml-1">
              <h2 style="color: green">Token Generated Successfully</h2>
              <!-- <p>Please confirm you really want to delete this staff, this action cannot be undone.</p> -->
            </div>
          </div>
          <div class="modal-body">
            <div style="font-size: medium; color: black">
              <span>New Token : </span>
              <span>{{ token }}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        id="change-password"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#change-password',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="closePasswordModal"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Change User Password</h2>
            <!-- <p></p> -->
          </div>
          <form @submit.prevent="updatePassword">
            <overlay-scrollbars class="modal-body" uk-overflow-auto>
              <div class="flex-width-1-1 less-gp">
                <label class="form-input">
                  <span class="form-input__label">Password</span>
                  <label class="search-w-icon">
                    <input
                      id="password"
                      v-model="confirmPass.password"
                      type="password"
                    />
                    <svg
                      id="pass"
                      @click="togglePassword('password', 'pass', 'pass-off')"
                    >
                      <use href="/uploads/icons.svg#see"></use>
                    </svg>
                    <svg
                      style="display: none"
                      id="pass-off"
                      @click="togglePassword('password', 'pass-off', 'pass')"
                    >
                      <use href="/uploads/icons.svg#see-off"></use>
                    </svg>
                  </label>
                  <!--                  <div class="form-input__input">-->
                  <!--                    <input v-model="confirmPass.password" type="password" >-->
                  <!--                  </div>-->
                  <span
                    v-if="confirmPass.passwordError"
                    class="form-input__error-msg"
                    >Password is mandatory</span
                  >
                </label>

                <label class="form-input">
                  <span class="form-input__label">Confirm password</span>
                  <label class="search-w-icon">
                    <input
                      id="confirm_password"
                      v-model="confirmPass.confirmPassword"
                      type="password"
                    />
                    <svg
                      id="see"
                      @click="
                        togglePassword('confirm_password', 'see', 'see-off')
                      "
                    >
                      <use href="/uploads/icons.svg#see"></use>
                    </svg>
                    <svg
                      style="display: none"
                      id="see-off"
                      @click="
                        togglePassword('confirm_password', 'see-off', 'see')
                      "
                    >
                      <use href="/uploads/icons.svg#see-off"></use>
                    </svg>
                  </label>
                  <span
                    v-if="
                      confirmPass.confirmPasswordError ||
                      confirmPass.password != confirmPass.confirmPassword
                    "
                    class="form-input__error-msg"
                    >{{
                      confirmPass.message != ""
                        ? "Password confirmation Does not Match"
                        : confirmPass.message
                    }}</span
                  >
                </label>
              </div>
            </overlay-scrollbars>
            <div class="d-flx-alc-jfe mt-3">
              <button
                type="submit"
                id="updatePasswordBtn"
                class="btn btn--primary ml-1"
              >
                Update password
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        id="set-permissions"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#set-permissions',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
            @click="closePermissions"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Set Permissions</h2>
            <!-- <p></p> -->
          </div>
          <permission ref="permissions" @saved="closePermissions" />
        </div>
      </div>
      <div
        id="set-role"
        uk-modal
        container="#parent-component"
        data-uk-modal="{target:'#set-role',bgclose:false}"
      >
        <div class="uk-modal-dialog uk-margin-auto-vertical small-modal">
          <button
            class="uk-modal-close-default"
            type="button"
			@click="cancelRole"
            uk-close
          ></button>
          <div class="modal-header">
            <h2>Set Role</h2>
            <div class="form-input">
              <!-- <label class="form-input__label">User role</label> -->
              <div class="form-input__input">
                <select
                  class="filter-btn box-deco-smallr"
				  @change="handleChange"
                >
                  <option value="">-Select User Role-</option>
                  <option v-for="(role, ix) in staff_role" :key="ix" :value="role.id">
                    {{ role.rolename }}
					
                  </option>
                </select>
              </div>
            </div>
            <div class="d-flx-alc-jfe mt-3">
              <button
                type="submit"
                id="assignRole"
                class="btn btn--primary ml-1"
				@click="updateRole"
              >
                Assign Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="inner-main-wrapper">
      <ul v-if="loading">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra"></div>
            <div class="gifts-card__title">Loading...please wait</div>
          </div>
        </li>
      </ul>
      <ul v-if="!loading && filteredList.length < 1">
        <li>
          <div class="gifts-card">
            <div class="gifts-card__extra"></div>
            <div class="gifts-card__title">No record at the moment</div>
          </div>
        </li>
      </ul>
      <ul v-if="!loading && filteredList.length > 0" class="grid mostly-3">
        <li v-for="(row, ix) in filteredList" v-bind:key="ix">
          <div class="card staff-card box-deco-bg" style="border-top: 3px solid forestgreen">
            <div class="drop-down org-drop drop-set">
              <button
                class="btn btn-icon drop-set"
                type="button"
                @click.stop="toggleDropdown($event)"
              >
                <svg class="drop-set">
                  <use xlink:href="/uploads/icons.svg#more"></use>
                </svg>
              </button>
              <div class="drop-wrapper" data-drop-down>
                <ul class="drop-lists">
                  <li
                    class="drop-list-item" @click="changePassword(row)" v-if="(user.rolepermission ? user.rolepermission[0].staff.changepassword:'') || isMerchant"
                  >
                    <button
                      class="btn btn-text"
                      type="button"
                      
                    >
                      Change Password
                    </button>
                  </li>
                  <li class="drop-list-item"  @click="editStaff(row)" v-if="(user.rolepermission ? user.rolepermission[0].staff.editstaff:'') || isMerchant">
                    <button
                      class="btn btn-text"
                      type="button"
                     
                    >
                      Edit User
                    </button>
                  </li>
                  <li class="drop-list-item" @click="setRole(row)">
                    <button
                      class="btn btn-text"
                      type="button"
                      
                    >
                      Assign Role
                    </button>
                  </li>
                  <li class="drop-list-item" @click="deleteUser(row)" v-if="(user.rolepermission ? user.rolepermission[0].staff.deletestaff:'') || isMerchant" >
                    <button
                      class="btn btn-text"
                      type="button"
                      
                    >
                      Delete User
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div class="card__body">
              <a href="javascript:;">
                <img
                  v-if="
                    row.profilelink.includes('None') &&
                    row.profilelink.includes('https://') 
                  "
                  src="/default_image.png"
                  alt=""
                />
                <img
                  v-else-if="
                    row.profilelink == '' ||
                    row.profilelink == null ||
                    row.profilelink == 'http://68.65.121.57:8080/'
                  "
                  src="/default_image.png"
                  alt=""
                />
                
                <img v-else :src="row.profilelink" alt="" />
              </a>
              <div class="card__body--content">
                <h3>{{ row.firstname }} {{ row.lastname }}</h3>
                <p>
                  <span class="attendant" v-if="row.rolename">
                    {{row.rolename}}
                  </span>
                  <span class="admin" v-else>
                    No assigned role
                  </span>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </overlay-scrollbars>
</template>

<script>
import Permission from "../../components/Permission.vue";
export default {
  components: { Permission },
  layout: "main",
  computed: {
    // staffroles() {
    //   return JSON.parse(localStorage.getItem("allrole"));
    // },
    // roles() {
    //   if (this.isSupervisor) {
    //     return [
    //       { id: "store_attendant", text: "Store Attendant" },
    //       { id: "kitchen", text: "Kitchen Staff" },
    //     ];
    //   } else {
    //     return this.account_types;
    //   }
    // },
    
  },
  data: () => ({
    filteredList:[],
    roleFilter:"",
    search: "",
    token: "",
    loading: true,
    settings: {
      width: "100%",
    },
    options: [
      // {id: '', text: 'Select Branches'},
      { id: "all", text: "All Branches" },
    ],
    errorData: {
      email: false,
      firstname: false,
      lastname: false,
      phone: false,
      password: false,
      branch: false,
      role: false,
      invalidEmail: false,
      dob: false,
      gender: false,
    },
    changePasswordData: {
      id: 0,
    },
    changePasswordStatus: false,
    formData: {
      merchID: "",
      emailaddress: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      userpassword: '',
      branchID: ["all"],
      role: "",
      title: "",
      dob: "",
      gender: "",
      userlogo: "",
    },
    roleData:{
      merchID:'',
      userID: '',
      id:''
    },
    updateRoleData: {
      userID: "",
      roleID: "",
    },
    confirmPass: {
      passwordError: false,
      message: "",
      password: "",
      confirmPassword: "",
      confirmPasswordError: false,
    },
    editDataCheck: {
      role: "",
    },
    editData: {
      id: "",
      merchID: "",
      emailaddress: "",
      firstname: "",
      lastname: "",
      phonenumber: "",
      dob: "",
      branchID: [],
      gender: "",
      role: "",
      profilelink: "",
      title: "",
      username: "",
      branchname: "",
    },
    users: [],
    branches: [],
    deleteData: {
      id: "",
    },
    sortData: {
      merchID: "",
      role: "",
    },
    staff_role: [],
  }),
  methods: {
    allRoles(){
			this.filteredList  =  this.users.filter(user => {
				if(this.roleFilter == ''){
					return this.users
				}
				if(user.rolename != null && user.rolename.toLowerCase().includes(this.roleFilter.toLowerCase())){
					return user.rolename.toLowerCase().includes(this.roleFilter.toLowerCase())
				}				
			})
		},
    filterRole(){
      this.filteredList = this.users.filter((user) => {
          if (
            user.firstname != null &&
            user.firstname.toLowerCase().includes(this.search.toLowerCase())
          ) {
            return user.firstname
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }  
          if (
            user.lastname != null &&
            user.lastname.toLowerCase().includes(this.search.toLowerCase())
          ) {
            return user.lastname
              .toLowerCase()
              .includes(this.search.toLowerCase());
          } if (
            user.emailaddress != null &&
            user.emailaddress.toLowerCase().includes(this.search.toLowerCase())
          ) {
            return user.emailaddress
              .toLowerCase()
              .includes(this.search.toLowerCase());
          }
        });
      },
    
    getRoles(){
    	this.$store.dispatch('role/getPermissions', this.roleData)
    	.then(res => {
    		this.loading = false;
    		this.staff_role = res.data.data
    		// console.log('res', this.roles)
    	}).catch(err => {
    		this.loading = false;
    		console.log(err)
    	})
    },
	handleChange({ target: { value } }) {
      
	 
        //   this.roleData.rolepermission = i.rolepermission;
		  this.updateRoleData.roleID = value
      
    },
    updateRole() {
      $("#assignRole")
        .attr("disabled", true)
        .html("Assigning role....please wait");
      this.$store
        .dispatch("users/updateRole", this.updateRoleData)
        .then((res) => {
          $("#assignRole").attr("disabled", false).html("Assign Role");
          if (res.data.status) {
            this.$toast.success("Role assigned successfully");
			this.cancelRole()
            this.getAllUser();
            return;
          }
          this.$toast.error(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setChangePasswordStatus() {
      if (
        !["administrator", "business_owner"].includes(this.editDataCheck.role)
      ) {
        if (
          this.editData.role == "administrator" ||
          this.editData.role == "business_owner"
        ) {
          this.changePasswordStatus = true;
        }
      }
    },
    changeToken(user) {
      $("#changeToken")
        .attr("disabled", true)
        .html("Reseting token....please wait");
      // $('#changeToken').attr('disabled', true);
      let token = {
        id: user.id,
        usertoken: user.usertoken,
      };
      this.$store
        .dispatch("users/changeToken", token)
        .then((res) => {
          if (res.data.status) {
            $("#changeToken").attr("disabled", false).html("Reset token");
            //   this.$toast.success(res.data.message)
            this.token = res.data.data.usertoken;
            UIkit.modal("#token").toggle();
            this.getAllUser();
            return;
          }

          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          $("#changeToken").attr("disabled", false).html("Reset token");
          console.log(e);
        });
    },
    deleteUser(user) {
      this.deleteData.id = user.id;
      UIkit.modal("#delete-text").toggle();
      // $('#delete-text').addClass('uk-open').show();
    },
    cancelDelete() {
      this.deleteData = {
        id: "",
      };
      UIkit.modal("#delete-text").toggle();
      // $('#delete-text').removeClass('uk-open').hide();
    },
	cancelAssign(){

	},

    cancelToken() {
      this.token = "";
      UIkit.modal("#token").toggle();
    },
    doDeleteUser() {
      $("#deleteBtn").attr("disabled", true).html("Deleting..please wait");
      this.$store
        .dispatch("users/deleteUser", this.deleteData)
        .then((res) => {
          $("#deleteBtn").attr("disabled", false).html("Delete");
          if (res.data.status) {
            this.$toast.success(res.data.message);
            this.getAllUser();
            this.cancelDelete();
            return;
          }

          this.$toast.error(
            "An error occurred and the operation was terminated"
          );
        })
        .catch((err) => {
          this.$toast.error(
            "An error occurred and the operation was terminated"
          );
          $("#deleteBtn").attr("disabled", false).html("Delete");
          console.log(err);
        });
    },
    async createStaff() {
      this.resetErrorData();
      if (this.validateUserData()) {
        return;
      }

      let data = Object.assign({}, this.formData);
      if (this.formData.branchID) {
        let form = this.formData.branchID;
        if (form.includes("all")) {
          form = [];
          this.branches.forEach((branch) => {
            form.push(branch.id);
          });
          // console.log(form);
        }

        let result = form.map(function (x) {
          return parseInt(x, 10);
        });

        data.branchID = result;
        data.role = 'Logistics'
      }
      data.phonenumber = "0" + data.phonenumber;
      let lastname = this.formData.lastname;
      $("#submitBtn")
        .attr("disabled", true)
        .html("Adding User....please wait");
      this.$store
        .dispatch("users/createUser", data)
        .then(async (res) => {
          $("#submitBtn").attr("disabled", false).html("Add User");
          if (res.data.status) {
            this.closeModal();
            await this.getAllUser();

            this.$toast.success("User added successfully");
            // this.token = this.users.find(
            //   (user) => user.lastname.trim() == lastname.trim()
            // ).usertoken;
            // UIkit.modal("#token").toggle();
            // }

            // $('#add-staff').removeClass('uk-open').hide();
            // UIkit.modal('#add-staff').toggle('hide')
            return;
          }

          this.$toast.error(res.data.message);
        })
        .catch((e) => {
          $("#submitBtn").attr("disabled", false).html("Add User");
          console.log(e);
        });
    },
    viewStaffDetails(user) {
      localStorage.removeItem("user_data");
      this.$store.dispatch("users/setStaff", user);
      this.$router.push("/staff/details/" + user.id);
    },
    updateStaff() {
      this.resetErrorData();
      if (this.validateUpdateData()) {
        return;
      }


      // console.log(this.editData)
      let data = Object.assign({}, this.editData);
      if (this.editData.branchID) {
        let form = this.editData.branchID;
        if (form.includes("all")) {
          form = [];
          this.branches.forEach((branch) => {
            form.push(branch.id);
          });
          // console.log(form);
        }

        let result = form.map(function (x) {
          return parseInt(x, 10);
        });

        data.branchID = result;
      }

      data.phonenumber = "0" + data.phonenumber;

      if (data.profilelink != null && data.profilelink.includes("http")) {
        delete data.profilelink;
      }

      if (this.editData.role == "business_owner") {
        data.branchID = this.branches[0].id;
      }

      // data.emailaddress = '';

      $("#updateBtn")
        .attr("readonly", true)
        .html("Updating user....please wait");
      this.$store
        .dispatch("users/updateUser", data)
        .then((res) => {
          $("#updateBtn").attr("readonly", false).html("+ Update User");
          if (res.data.status !== "False") {
            this.getAllUser();
            this.$toast.success('User details updated sucessfully!');
            this.resetEditData();
            return;
          }
          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          $("#updateBtn").attr("readonly", false).html("+ Update User");
          console.log(e);
        });
    },
    updatePassword() {
      this.resetErrorData();
      if (this.validateUpdatePassword()) {
        return;
      }
      let data = Object.assign({}, this.changePasswordData);

      // data.phonenumber = '0' + data.phonenumber;
      data.password = this.confirmPass.password;

      // if(data.profilelink != null && data.profilelink.includes('http')){
      // 	delete data.profilelink
      // }

      $("#updatePasswordBtn")
        .attr("readonly", true)
        .html("Updating password....please wait");
      this.$store
        .dispatch("users/changePassword", data)
        .then((res) => {
          $("#updatePasswordBtn")
            .attr("readonly", false)
            .html("+ Update Password");
          if (res.data.status !== "False") {
            this.$toast.success(res.data.message);
            this.resetPasswordData();
            return;
          }
          this.$toast.error("An error occurred");
        })
        .catch((e) => {
          $("#updatePasswordBtn")
            .attr("readonly", false)
            .html("+ Update Password");
          console.log(e);
        });
    },
    handleImage(e) {
      let files = e.target.files;
      var allowed_types = ["image/png", "image/jpg", "image/jpeg"];
      // console.log(files[0].type);
      if (!files.length) return;
      if (!allowed_types.includes(files[0].type)) {
        this.$toast.error("Only Images of Type jpg, jpeg and png allowed");
        return;
      }
      this.createBase64Image(files[0]);
    },
    createBase64Image(fileObject) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.formData.userlogo = e.target.result.split(",")[1];
      };
      reader.readAsDataURL(fileObject);
    },
    handleUpdateImage(e) {
      let files = e.target.files;
      var allowed_types = ["image/png", "image/jpg", "image/jpeg"];
      if (!files.length) return;

      if (!allowed_types.includes(files[0].type)) {
        this.$toast.error("Only Images of Type jpg, jpeg and png allowed");
        return;
      }
      this.createBase64ImageEdit(files[0]);
    },
    createBase64ImageEdit(fileObject) {
      let reader = new FileReader();
      reader.onload = (e) => {
        this.editData.profilelink = e.target.result.split(",")[1];
      };
      reader.readAsDataURL(fileObject);
    },
    editStaff(user) {
      this.editDataCheck.role = '';
      let editData = {
        id: user.id,
        merchID: user.merchID,
        emailaddress: user.emailaddress,
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber.substring(1),
        branchID: user.branchID,
        role: '',
        title:'',
        profilelink: user.profilelink,
        gender: user.gender,
        usertoken: user.usertoken,
        username: user.username,
      };
      Object.assign(this.editData, editData);
      this.editData.branchID = user.branchID;
      // console.log(user.branchID);
      // $('#edit-staff').show();
      // $('#edit-staff').addClass('uk-open').show()
      UIkit.modal("#edit-staff").toggle();
    },

    changePassword(user) {
      this.changePasswordData = {
        id: user.id,
        // merchID: user.merchID,
        // emailaddress: user.emailaddress,
        // firstname: user.firstname,
        // lastname: user.lastname,
        // phonenumber: user.phonenumber.substring(1),
        // dob: user.dob,
        // branchID: user.branchID,
        // role: user.role,
        // profilelink: user.profilelink,
        // gender: user.gender,
        // title: '',
        // // userpassword: '',
        // username: user.username
      };
      // $('#edit-staff').show();
      // $('#edit-staff').addClass('uk-open').show()
      UIkit.modal("#change-password").toggle();
    },
    validateUserData() {
      if (this.formData.firstname === "") {
        this.errorData.firstname = true;
        return true;
      }
      if (this.formData.lastname === "") {
        this.errorData.lastname = true;
        return true;
      }
      // if(this.formData.dob === '') {
      //   this.errorData.dob = true
      // 	return true
      // }
      // if(this.formData.gender === ''){
      //   this.errorData.gender = true
      // 	return true
      // }
      if (this.formData.phonenumber === "") {
        this.errorData.phone = true;
        return true;
      }

    //   if (this.formData.role === "") {
    //     this.errorData.role = true;
    //     return true;
    //   }

      if (
        (this.formData.branchID == 0 ||
          this.formData.branchID.length <= 0 ||
          this.formData.branchID[0] == "") 
      ) {
        this.errorData.branch = true;
        return true;
      }

      if (
        this.formData.emailaddress === ""
      ) {
        this.errorData.email = true;
        return true;
      }
      if (
        this.confirmPass.password === "" 
      ) {
        this.confirmPass.passwordError = true;
        // this.confirmPass.message = "Please enter a password"
        return true;
      } else {
        this.formData.userpassword = this.confirmPass.password;
      }
      if (
        this.confirmPass.confirmPassword === "" 
      ) {
        this.confirmPass.confirmPasswordError = true;
        // this.confirmPass.message = "Please enter a password confirmation"
        return true;
      }
      if (
        this.confirmPass.password !== this.confirmPass.confirmPassword 
      ) {
        this.confirmPass.confirmPasswordError = true;
        // this.confirmPass.message = "Password confirmation does not match"
        return true;
      }
      // 	if(this.formData.userpassword === ''){
      // 		this.errorData.password = true
      // 		return true
      // 	}

      return false;
    },

    validateUpdatePassword() {
      if (this.confirmPass.password !== "") {
        if (this.confirmPass.confirmPassword === "") {
          this.confirmPass.confirmPasswordError = true;
          this.confirmPass.message = "Please enter a password confirmation";
          return true;
        }
        if (this.confirmPass.password !== this.confirmPass.confirmPassword) {
          this.confirmPass.confirmPasswordError = true;
          this.confirmPass.message = "Password confirmation does not match";
          return true;
        }
      }

      return false;
    },
    validateUpdateData() {
      if (this.editData.firstname === "") {
        this.errorData.firstname = true;
        return true;
      }
      if (this.editData.lastname === "") {
        this.errorData.lastname = true;
        return true;
      }
      if (this.editData.phonenumber === "") {
        this.errorData.phone = true;
        return true;
      }

      // if (this.editData.role === "") {
      //   this.errorData.role = true;
      //   return true;
      // }
      if (this.editData.branchID === "") {
        this.errorData.branch = true;
        return true;
      }

      if (
        this.editData.emailaddress === "" ) {
        this.errorData.email = true;
        return true;
      }
      if (this.changePasswordStatus == true) {
        if (this.confirmPass.password !== "") {
          if (this.confirmPass.confirmPassword === "") {
            this.confirmPass.confirmPasswordError = true;
            this.confirmPass.message = "Please enter a password confirmation";
            return true;
          }
          if (this.confirmPass.password !== this.confirmPass.confirmPassword) {
            this.confirmPass.confirmPasswordError = true;
            this.confirmPass.message = "Password confirmation does not match";
            return true;
          }
        }
      }
      // if(this.editData.dob === ''){
      // 	this.errorData.dob = true
      // 	return true
      // }

      return false;
    },
    async getAllUser() {
      this.loading = true;
      // if(this.isSupervisor) {
      // 	this.sortData.role = 'store_attendant'
      // }
      await this.$store
        .dispatch("users/getAllUsers", this.sortData)
        .then((res) => {
          this.loading = false;
          this.users = res.data.data
          this.filteredList = res.data.data
        })
        .catch((e) => {
          this.loading = false;
          // console.log(e);
        });
    },
    showModal() {
      // $('#add-staff').show();
      // $('#add-staff').addClass('uk-open').show()
      this.resetFormData();
      UIkit.modal("#add-staff").toggle();
    },
    closeModal() {
      this.resetFormData();
    },
    closePermissions() {
      this.$refs.permissions.reset();
      UIkit.modal("#set-permissions").toggle();
    },
    showPermissions(id) {
      this.$refs.permissions.reset();
      this.$refs.permissions.listPermissions(id);
      UIkit.modal("#set-permissions").toggle();
    },
    setRole(user) {
      this.updateRoleData.userID = user.id;
      UIkit.modal("#set-role").toggle();
    },
	cancelRole(){
		 this.updateRoleData.userID = '';
		 UIkit.modal("#set-role").toggle();
	},
    closePasswordModal() {
      this.resetPasswordData();
    },
    resetFormData() {
      this.resetErrorData();
      this.formData = {
        merchID: this.user.id,
        emailaddress: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        userpassword: '',
        branchID: 0,
        userlogo: "",
        profilelink: "",
        role: "",
      };
      this.confirmPass = {
        password: "",
      };
      // $('#add-staff').removeClass('uk-open').hide();
      UIkit.modal("#add-staff").toggle();
    },
    resetEditData() {
      this.resetErrorData();
      this.changePasswordStatus = false;
      this.editData = {
        merchID: this.user.id,
        emailaddress: "",
        firstname: "",
        lastname: "",
        phonenumber: "",
        userpassword: '',
        branchID: 0,
        role: "",
        title:"",
        profilelink: "",
      };
      this.editData.dob = "2001-01-01";
      this.confirmPass = {
        password: "",
      };
      // $('#edit-staff').hide();
      // $('#edit-staff').removeClass('uk-open').hide()
      UIkit.modal("#edit-staff").toggle();
    },
    resetPasswordData() {
      this.resetErrorData();
      this.changePasswordData = {
        id: "",
        // merchID: this.user.id,
        // emailaddress: '',
        // firstname: '',
        // lastname: '',
        // phonenumber: '',
        // // userpassword: '',
        // branchID: '',
        // role: '',
        // profilelink: ''
      };
      // this.editData.dob = "2001-01-01"
      this.confirmPass = {
        password: "",
      };
      // $('#edit-staff').hide();
      // $('#edit-staff').removeClass('uk-open').hide()
      UIkit.modal("#change-password").toggle();
    },
    resetErrorData() {
      this.errorData = {
        email: false,
        firstname: false,
        lastname: false,
        phone: false,
        password: false,
        branch: false,
        role: false,
        invalidEmail: false,
      };
      this.confirmPass.passwordError = false;
    },
    getAllBranches() {
      this.$store
        .dispatch("branches/listBranches", this.formData.merchID)
        .then((res) => {
          let vm = this;
          res.data.data.forEach(function (e) {
            let data = {
              id: e.id,
              text: e.branchname,
            };
            vm.branches.push(data);
            vm.options.push(data);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.formData.merchID =  this.user.role ? this.user.merchID : this.user.id
    this.roleData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.roleData.userID =''
    this.roleData.id =''
    this.sortData.merchID = this.user.role ? this.user.merchID : this.user.id;
    this.getRoles()
    this.formData.dob = "2001-01-01";
    this.editData.dob = "2001-01-01";
    this.getAllUser();
    this.getAllBranches();
    this.filterRole()
    // this.getRoles()
  },
  beforeRouteEnter(to, from, next) {
		let user = JSON.parse(localStorage.getItem("user"))
			if(user.role == undefined  || (user.rolepermission ? user.rolepermission[0].staff.viewstaff: '')){
				next()
			}
			else{
				alert('You have not been permitted to view this page')
				next({ path: '/dashboard' })
			}
	}
}
</script>
