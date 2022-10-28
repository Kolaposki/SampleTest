<template>
  <!-- <div class="main-content-wrap"> -->
  <!-- <div class="d-flx-alc-jsb page-extras">
      <p class="fw-medium font-16">
        <nuxt-link to="/products" class="text-link">
          <svg>
            <use href="/uploads/icons.svg#back"></use>
          </svg>
          <span class="ml-1 fw-bold co-grey">Back</span>
        </nuxt-link>
      </p>
      <div class="search-filter d-flx-alc-jfe">
      </div>
    </div> -->

    <!-- new comment -->

  <div class="inner-main-wrapper" style="padding: 0">
    <!-- <div class="d-flx-alc-jsb table-title">
        <h3 class="section-title">Add Product</h3>
      </div> -->
    <!-- <overlay-scrollbars class="table-wrapper"> -->
    <form class="" @submit.prevent="createProduct">
      <div class="flex-width-1-2 less-gp">
        <label class="form-input">
          <span class="form-input__label"
            >Select Type <span style="color: red;">*</span></span
          >
          <div class="form-input__input">
            <Select2 v-model="formData.producttype" :options="productTypes" />
          </div>
          <span v-if="errorData.producttype" class="form-input__error-msg"
            >Please select a product type</span
          >
        </label>

        <label class="form-input">
          <span class="form-input__label"
            >Select Category <span style="color: red;">*</span></span
          >
          <div class="form-input__input">
            <Select2 v-model="formData.categoryID" :options="categories" />
          </div>
          <span v-if="errorData.categoryID" class="form-input__error-msg"
            >Please select a category</span
          >
        </label>
      </div>

      <div class="flex-width-1-2 less-gp">
        <label class="form-input">
          <span class="form-input__label">SKU (Product code)</span>
          <div class="form-input__input">
            <input type="text" v-model="formData.productcode" placeholder="" />
          </div>
          <span v-if="errorData.productcode" class="form-input__error-msg"
            >Please enter a product code</span
          >
        </label>
        
        <label class="form-input">
          <span class="form-input__label"
            >Name <span style="color: red;">*</span></span
          >
          <div class="form-input__input">
            <input type="text" v-model="formData.productname" placeholder="" />
          </div>
          <span v-if="errorData.productname" class="form-input__error-msg"
            >Please enter a product name</span
          >
        </label>
      </div>

      <div
        :class="
          formData.producttype == 'stocked_product'
            ? 'flex-width-1-3 less-gp'
            : 'flex-width-1-2 less-gp'
        "
      >
        <label
          v-if="formData.producttype == 'stocked_product'"
          class="form-input"
        >
          <span class="form-input__label">Stock/ Quantity</span>
          <div class="form-input__input">
            <input
              type="number"
              required
              v-model="formData.stockqty"
              placeholder=""
            />
          </div>
          <span v-if="errorData.stockqty" class="form-input__error-msg"
            >Please enter a stock</span
          >
        </label>

        <label
          v-if="formData.producttype == 'stocked_product'"
          class="form-input"
        >
          <span class="form-input__label"
            >Re-order Level<span style="color: red;">*</span></span
          >
          <div class="form-input__input">
            <input
              type="number"
              required
              v-model="formData.restocklevel"
              placeholder=""
            />
          </div>
          <span v-if="errorData.restocklevel" class="form-input__error-msg"
            >Please enter a re order stock</span
          >
        </label>
        <!--
        <label class="form-input">
          <span class="form-input__label">Discount (%)</span>
          <div class="form-input__input">
            <input
              type="number"
              v-model="formData.discount"
              onkeypress="return (document.getElementById('discount_price').value.indexOf('.') > 0 ? (document.getElementById('discount_price').value.substr(document.getElementById('discount_price').value.indexOf('.'), 3).length > 2 ? false : true) : false"
              id="discount_price"
              placeholder=""
            />
          </div>
          
			   <span v-if="errorData.discount" class="form-input__error-msg">Please enter a valid number between 1 and 100</span>
        </label>
        -->
      </div>
      <!-- <div class="flex-width-1-2 less-gp"> -->
      <add-product-feature
        ref="features"
        :featuresList="formData.productfeatures"
      />
      <!-- </div> -->

      <div class="flex-width-1-2 less-gp">
        <label v-if="!isSupervisor" class="form-input">
          <span class="form-input__label"
            >Branch <span style="color: red;">*</span></span
          >
          <div class="form-input__input">
            <Select2 v-model="formData.branchID" :options="branches" />
          </div>
          <span v-if="errorData.branchID" class="form-input__error-msg"
            >Please select a branch</span
          >
        </label>

        <label  class="form-input">
        <span class="form-input__label"> Tax Inclusive </span>
        <div class="form-input__input">
            <Select2 v-model="formData.taxinclusive" :options="taxinclusive" />
        </div>
        </label>

        <label class="form-input">
          <span class="form-input__label">Expiry Date</span>
          <div class="form-input__input">
            <input
              type="date"
              v-model="formData.expirationdate"
              placeholder=""
            />
          </div>
          <span v-if="errorData.expirationdate" class="form-input__error-msg"
            >Please select an expiration date</span
          >
        </label>
      </div>

     

      <label class="form-input">
        <span class="form-input__label"
          >Description <span style="color: red;">*</span></span
        >
        <div class="form-input__input">
          <textarea rows="5" v-model="formData.productdescription"></textarea>
        </div>
        <span v-if="errorData.productdescription" class="form-input__error-msg"
          >Please enter a product description</span
        >
      </label>

      <div class="flex-width-1-1 less-gp">
        <label class="form-input">
          <span class="form-input__label"
            >Photo 1
            <span style="font-size: smaller;">(400px * 400px)</span></span
          >
          <image-crop :pic="'photo1'" ref="photo1" @image="photo1 = $event" />

          <span v-if="errorData.photo1" class="form-input__error-msg"
            >Photo 1 size must be 400px * 400px</span
          >
        </label>
      </div>
      <div class="flex-width-1-1 less-gp">
        <label class="form-input">
          <span class="form-input__label"
            >Photo 2
            <span style="font-size: smaller;">(400px * 400px)</span></span
          >

          <image-crop :pic="'photo2'" ref="photo2" @image="photo2 = $event" />
          <span v-if="errorData.photo2" class="form-input__error-msg"
            >Photo 2 size must be 400px * 400px</span
          >
        </label>
      </div>
      <div class="flex-width-1-1 less-gp">
        <label class="form-input">
          <span class="form-input__label"
            >Photo 3
            <span style="font-size: smaller;">(400px * 400px)</span></span
          >

          <image-crop :pic="'photo3'" ref="photo3" @image="photo3 = $event" />
          <span v-if="errorData.photo3" class="form-input__error-msg"
            >Photo 3 size must be 400px * 400px</span
          >
        </label>
      </div>
      <div class="flex-width-1-1 less-gp">
        <label class="form-input">
          <span class="form-input__label"
            >Photo 4
            <span style="font-size: smaller;">(400px * 400px)</span></span
          >

          <image-crop :pic="'photo4'" ref="photo4" @image="photo4 = $event" />
          <span v-if="errorData.photo4" class="form-input__error-msg"
            >Photo 4 size must be 400px * 400px</span
          >
        </label>
      </div>

      <div class="d-flx-alc-jfe mt-3">
        <button @click="cancelAdd" type="button" class="btn btn-no-fill">
          Cancel
        </button>
        <button
          type="submit"
          id="createProductBtn"
          class="btn btn--primary ml-1"
        >
          + Create product
        </button>
      </div>
    </form>
    <!-- </overlay-scrollbars> -->
  </div>
  <!-- </div> -->
</template>
<script>
import AddProductFeature from "./AddProductFeature.vue";
import ImageCrop from "./imageCrop.vue";
export default {
  components: { ImageCrop, AddProductFeature },
  layout: "main",
  computed: {
    product() {
      return this.$store.getters["products/getProduct"];
    },
  },
  data: () => ({
    formData: {
      merchID: "",
      productcode: "",
      productname: "",
      productdescription: "",
      stockqty: 0,
      sellingprice: "",
      expirationdate: "",
      producttype: "",
      branchID: "",
      discount: "",
      restocklevel: 0,
      productfeatures: [
        {
          price: "",
          featureID: "",
        },
      ],
      categoryID: "",
    },
    nonstockedForm: false,
    stockedForm: false,
    serviceForm: false,
    productTypes: [
      { id: "nonstocked_product", text: "Non-stocked product" },
      { id: "stocked_product", text: "Stocked product" },
      { id: "service", text: "Service" },
    ],
    taxinclusive: [
      { id: true, text: "Yes" },
      { id: false, text: "No" }
    ],
    branches: [],
    categories: [],
    productDescription: "",
    errorData: {
      productcode: false,
      productname: false,
      productdescription: false,
      stockqty: false,
      sellingprice: false,
      expirationdate: false,
      producttype: false,
      discount: false,
      branchID: false,
      restocklevel: false,
      categoryID: false,
      photo1: false,
      photo2: false,
      photo3: false,
      photo4: false,
    },
    photo1: "",
    photo2: "",
    photo3: "",
    photo4: "",
    imageData: {
      img1width: 0,
      img1height: 0,
      img2width: 0,
      img2height: 0,
      img3width: 0,
      img3height: 0,
      img4width: 0,
      img4height: 0,
    },
  }),
  methods: {
    getFeatures() {
      this.$refs.features.listFeatures();
    },
    async createProduct() {
      if (this.$refs.features.productFeatures[0].featureID == "") {

        this.formData.sellingprice = this.$refs.features.productFeatures[0].price;
      } else {
        this.formData.sellingprice = 0;
      }
      if (this.validateFormData()) {
        return;
      }

      let expiration_date =
        this.formData.expirationdate == null ||
        this.formData.expirationdate == ""
          ? ""
          : this.formData.expirationdate;
      this.formData.expirationdate = expiration_date;
      let data = new FormData();

      if (this.formData.restocklevel == "") {
        this.formData.restocklevel = 0;
      }
      data.append("merchID", this.formData.merchID);
      data.append("taxinclusive", this.formData.taxinclusive);
      data.append("productcode", this.formData.productcode);
      data.append("productname", this.formData.productname);
      data.append("productdescription", this.formData.productdescription);
      data.append("stockqty", this.formData.stockqty);
      data.append("discount", this.formData.discount);
      data.append("sellingprice", this.formData.sellingprice);
      data.append("expiration_date", expiration_date);
      data.append("producttype", this.formData.producttype);
      data.append("branchID", this.formData.branchID);
      data.append("categoryID", this.formData.categoryID);
      data.append("restocklevel", this.formData.restocklevel);
      if (this.$refs.features.productFeatures.length > 1) {
        if (this.$refs.features.productFeatures[0].featureID == "") {
          this.$refs.features.productFeatures.splice(0, 1);
        }
        data.append(
          "productfeatures",
          JSON.stringify(this.$refs.features.productFeatures)
        );
      } else {
        data.append("productfeatures", JSON.stringify([]));
      }

      await this.$refs.photo1.getImage();
      await this.$refs.photo3.getImage();
      await this.$refs.photo4.getImage();
      await this.$refs.photo2.getImage();
      if (this.photo1.length > 0 || this.photo1 != "") {
        data.append(
          "photo",
          this.photo1,
          "file1." + this.photo1.type.split("/")[1]
        );
        this.formData.photo = this.photo1;
      }
      if (this.photo2.length > 0 || this.photo2 != "") {
        data.append(
          "photo2",
          this.photo2,
          "file2." + this.photo2.type.split("/")[1]
        );
        this.formData.photo2 = this.photo2;
      }
      if (this.photo3.length > 0 || this.photo3 != "") {
        data.append(
          "photo3",
          this.photo3,
          "file3." + this.photo3.type.split("/")[1]
        );
        this.formData.photo3 = this.photo3;
      }
      if (this.photo4.length > 0 || this.photo4 != "") {
        data.append(
          "photo4",
          this.photo4,
          "file4." + this.photo4.type.split("/")[1]
        );
        this.formData.photo4 = this.photo4;
      }

      $("#createProductBtn")
        .attr("disabled", true)
        .html("Creating..please wait");
      this.$store
        .dispatch("products/saveProduct", data)
        // this.$store.dispatch('products/saveProduct', this.formData)
        .then((res) => {
          $("#createProductBtn")
            .attr("disabled", false)
            .html("+ Create product");
          if (res.data.status) {
            this.$toast.success(res.data.message);
            this.clearForm();
            this.$emit("refresh");
            // location.reload();
            UIkit.modal("#add-product").toggle();
            // this.$parent.listProducts();
            // this.$router.push('/products')
            return;
          }

          this.$toast.error(res.data.message);
        })
        .catch((err) => {
          this.$toast.error("An error occurred.");
          $("#createProductBtn")
            .attr("disabled", false)
            .html("+ Create product");
        });
    },
    clearValidation() {
      this.errorData = {
        productcode: false,
        productname: false,
        discount: false,
        productdescription: false,
        stockqty: false,
        sellingprice: false,
        expirationdate: false,
        producttype: false,
        restocklevel: false,
        branchID: false,
        categoryID: false,
        photo1: false,
        photo2: false,
        photo3: false,
        photo4: false,
      };
    },
    validateFormData() {
      this.clearValidation();
      if (this.formData.producttype === "") {
        this.errorData.producttype = true;
        return true;
      }

      // if(this.formData.discount === '' ||  0 > Number(this.formData.discount) || Number(this.formData.discount) > 100 ){
			// 	this.errorData.discount = true
			// 	return true
			// }

      if (this.formData.categoryID === "") {
        this.errorData.categoryID = true;
        return true;
      }

      if (this.formData.productname === "") {
        this.errorData.productname = true;
        return true;
      }

      if (this.formData.sellingprice === "") {
        this.errorData.sellingprice = true;
        return true;
      }
      if (
        this.formData.producttype == "stocked_product" &&
        (this.formData.restocklevel == 0 || this.formData.restocklevel == "")
      ) {
        this.errorData.restocklevel = true;
        return true;
      }

      if (this.formData.branchID === "") {
        this.errorData.branchID = true;
        return true;
      }

      if (this.formData.productdescription === "") {
        this.errorData.productdescription = true;
        return true;
      }

      return false;
    },
    cancelAdd() {
      this.clearForm();
      UIkit.modal("#add-product").toggle();
      // this.$router.push('/products')
    },
    clearForm() {
      this.formData = {
        productcode: "",
        productname: "",
        productdescription: "",
        stockqty: "",
        sellingprice: "",
        expirationdate: "",
        discount: "",
        producttype: "",
        restocklevel: 0,
        productfeatures: [
          {
            featureID: "",
            price: "",
          },
        ],
        // branchID: '',
        categoryID: "",
      };
      this.formData.merchID = this.user.id;
    },
    listBranches() {
      this.$store
        .dispatch("branches/listBranches", this.formData.merchID)
        .then((res) => {
          let branchArray = [];
          res.data.data.forEach(function(r) {
            let data = {
              id: r.id,
              text: r.branchname,
            };
            branchArray.push(data);
          });
          this.branches = branchArray;
        });
    },
    listProductCategory() {
      this.$store
        .dispatch("category/getCategories", this.formData.merchID)
        .then((res) => {
          let catArray = [];
          res.data.data.forEach(function(r) {
            let data = {
              id: r.id,
              text: r.categoryname,
            };
            catArray.push(data);
          });
          this.categories = catArray;
        });
    },
  },
  mounted() {
     this.formData.merchID = this.user.role ? this.user.merchID : this.user.id

    this.listBranches();
    this.listProductCategory();
  },
  created() {
  },
};
</script>
