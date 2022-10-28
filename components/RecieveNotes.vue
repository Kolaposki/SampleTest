
<template>

  
		
      <!-- <overlay-scrollbars class="table-wrapper"> -->
        <v-app>
			<v-responsive>
          <v-data-table
              :headers="headers"
			  no-data-text="No items in the list"
              :items="poitems"
			  :loading="loading"
			  :footer-props="{
				itemsPerPage: '200',
			}"
          >
		  <template v-slot:top>
      <v-toolbar
	  class="text-right"
        flat
      >
		<v-toolbar-title>Order Items</v-toolbar-title>
			<v-divider
			class="mx-4"
			inset
			vertical
			></v-divider>
			<v-spacer></v-spacer>
		  <!-- <template v-slot:activator="{ on, attrs }"> -->
            <!-- <v-btn
              color="primary"
			  green
              class="mb-2 float-right"
              @click="addChild"
            >
              New Item
            </v-btn> -->
          <!-- </template> -->
      </v-toolbar>

		  </template>
		  <template v-slot:header.name="{ header }">
			{{ header.text.toUpperCase() }}
			</template>
		  <!-- <template v-slot:item.calories="{ item }">
        <v-chip
          :color="getColor(item.calories)"
          dark
        >
		
          {{ item.calories }}
        </v-chip> -->
      <!-- </template> -->
            <template v-slot:item.productID="props" class="input-field">
              <!-- <v-edit-dialog
                  :return-value.sync="props.item.productID"
                  @save="save(props.item, 'name')"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              > -->
                {{ getProductName(props.item) }}
				<!-- vendorproductcode -->
                <!-- <template v-slot:input>
					 <v-select
						:items="products"
						filled
						label="Select"
						v-model="props.item.productID"
						item-text="productname"
						item-value="id"
						autofocus
          ></v-select>
                </template>
              </v-edit-dialog> -->
            </template>
			<!-- <template v-slot:item.vendorproductcode="props">
			</template> -->
            <template v-slot:item.quantity="props">
              <v-edit-dialog
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              >
                <div>{{ formNumber(props.item.quantity) }}</div>
                <template v-slot:input>
                  <v-text-field
					  v-model="props.item.quantity"
					  @keyup="save(props.item, 'quantity')"
					  type="number"
                      label="Edit Qty"
                      single-line
					  :max="props.item.quantityordered"
                      autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
			<!-- <template v-slot:item.packquantity="props">
              <v-edit-dialog
                  :return-value.sync="props.item.packquantity"
                  @save="save(props.item, 'packquantity')"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              >
                <div>{{ isNaN(props.item.packquantity) ? 'Enter Pack Quantity' : formNumber(props.item.packquantity) }}</div>
                <template v-slot:input>
                  <v-text-field
					  v-model="props.item.packquantity"
                      label="Edit Pack Qty"
                      single-line
                      autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
			<template v-slot:item.packsize="props">
              <v-edit-dialog
                  :return-value.sync="props.item.packsize"
                  @save="save(props.item, 'packsize')"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              >
                <div>{{ isNaN(props.item.packsize) ? 'Enter Pack Size': formNumber(props.item.packsize) }}</div>
                <template v-slot:input>
                  <v-text-field
					  v-model="props.item.packsize"
                      label="Edit Pack Size"
                      single-line
                      autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
			<template v-slot:item.packcost="props">
              <v-edit-dialog
                  :return-value.sync="props.item.packcost"
                  @save="save(props.item, 'packcost')"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              >
                <div>{{ isNaN(props.item.packcost) ? 'Enter Cost Per Pack' : formNumber(props.item.packcost) }}</div>
                <template v-slot:input>
                  <v-text-field
					  v-model="props.item.packcost"
                      label="Edit Pack Cost"
                      single-line
                      autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template> -->
			<template v-slot:item.receivedate="props">
              <v-edit-dialog
                  @cancel="cancel"
                  @open="open"
                  @close="close"
              >
                <div>{{ props.item.receivedate != '' ? $moment(props.item.receivedate).format('YYYY-MM-DD') : '' }}</div>
                <template v-slot:input>
                  <v-text-field
				  
					  v-model="props.item.receivedate"
					  type="date"
                      label="Edit Receive Note"
                      single-line
                      autofocus
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </template>
			<template v-slot:item.totalprice="props">
				<div>{{ formatPrice(props.item.totalprice) }}</div>
			</template>
			<template v-slot:item.quantityordered="props">
				<div>{{ formNumber(props.item.quantityordered) }}</div>
			</template>
			<template v-slot:item.outstanding="props">
				<div>{{ formNumber(props.item.outstanding) }}</div>
			</template>
			<template v-slot:footer>
			 <!-- <v-footer > -->
				 <!-- <v-spacer></v-spacer> -->
				 
				<v-col
				class="text-right smaller"
				cols="12"
				>
				Total Received Value : {{totalitems}}
				</v-col>
				<v-col
				class="text-right smaller"
				cols="12"
				>
				Total Price : {{totalprice}}
				</v-col>
			<!-- </v-footer> -->
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon
					small
					@click="deleteItem(item)"
				>
					mdi-delete
				</v-icon>
			</template>
          </v-data-table>

			</v-responsive>
          <!-- <v-snackbar
              v-model="snack"
              :timeout="3000"
              :color="snackColor"
          >
            {{ snackText }}

            <template v-slot:action="{ attrs }">
              <v-btn
                  v-bind="attrs"
                  text
                  @click="snack = false"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar> -->
        </v-app>
      <!-- </overlay-scrollbars> --> 
</template>
<style lang="scss" scoped>
.v-btn:not(.v-btn--round).v-size--default {
	background-color: green !important;
}
th {
	font-size: 10px !important;
}

</style>

<script>
import Vuetify from 'vuetify';

export default {
	layout: 'main',
	vuetify: new Vuetify(),
	props: ['poitems', 'type'],
	data () {
		return {
			snack: false,
			snackColor: 'green',
			snackText: '',
			// max25chars: v => v.length <= 25 || 'Input too long!',
			pagination: {},
			headers: [
				{
					text: 'Product',
					align: 'end',
					sortable: false,
					value: 'productID',
				},
				{ text: 'Code', value: 'vendorproductcode',
					align: 'end', 
					sortable: false, },
				// { text: 'Pack Size', value: 'packsize', align: 'start',
				// 	sortable: false },
				// { text: 'Pack Quantity', value: 'packquantity', align: 'start',
				// 	sortable: false },
				{ text: 'Qty. Ordered', value: 'quantityordered', align: 'end',
					sortable: false },
				{ text: 'Qty. Received', value: 'quantity', align: 'start',
					sortable: false },
				{ text: 'Outstanding', value: 'outstanding', align: 'end',
					sortable: false },
				// { text: 'Cost Per Pack', value: 'packcost', align: 'start',
				// 	sortable: false },
				{ text: 'Receive Date', value: 'receivedate', align: 'start',
					sortable: false },
				{ text: 'Total Price', value: 'totalprice',
					align: 'end',
					sortable: false },
				{ text: 'Cost / Piece', value: 'unitprice',
					align: 'end',
					sortable: false },
				{ text: 'Actions', value: 'actions', sortable: false },
					
				// { text: 'Protein (g)', value: 'protein' },
				// { text: 'Iron (%)', value: 'iron' },
			],
			
			products: [],
			// poitems: [{"id": 1, "productID": 157, "quantity": 100.0, "vendorproductcode": "5555", "unitprice": 100.0, "discountprice": 0.0, "totalprice": 2000.0, "merchID": 88, "productname": "Pure Bliss Biscuit(Milk Cream Wafers)", "productcode": "6156000121192"}, {"id": 2, "productID": 147, "quantity": 200.0, "vendorproductcode": "55555", "unitprice": 20.0, "discountprice": 0.0, "totalprice": 1000.0, "merchID": 88, "productname": "Cucumber", "productcode": null}],
		}
	},
	computed : {
		loading () {
			return !(this.poitems.length > 0)
		},
		totalitems () {
			let total = this.poitems.map(el => el.totalprice).reduce((acc, curr) => {
				acc += curr
				return acc
			}, 0);
			console.log(total)
			return total;
		},
		totalprice () {
			let total = this.poitems.map(el => el.total).reduce((acc, curr) => {
				acc += curr
				return acc
			}, 0);
			console.log(total)
			return total;
		},
		// items () {
		// 	return this.poitems.reverse();
		// }
	},
	methods: {
		deleteItem (item) {
			this.poitems.splice(this.poitems.indexOf(item), 1)
		},
		calcDiscount (product){
			return ((product.quantityordered * product.unitprice) - Number(this.totalprice)) / product.quantity
		},
		
		calcQty(product) {
			product.quantity = product.packsize * product.packquantity
			if(product.quantity == 1  && product.unitprice != 0) {
				if( product.packcost != 0) {
					product.quantity = (product.packcost * product.packsize) / product.unitprice
				} 
				// else {
				// 	product.quantity = (product.totalprice + this.calcDiscount(product)) / product.unitprice
				// }
			}
		},
		calcPackQty (product) {
			product.packquantity = product.quantity / product.packsize
			// if(product.packquantity == 1 && product.packcost != 0) {
			// 	product.packquantity = (product.totalprice + this.calcDiscount(product)) / product.packcost
			// }
		},
		calcPackCost(product) {
			product.packcost = (product.packsize * product.unitprice) * product.packquantity;
			// if(product.packcost == 0) {
			// 	product.packcost = (product.totalprice + this.calcDiscount(product)) / product.unitprice
			// }
		},
		// calcPackSize(product) {

		// },
		calcUnitPrice(product){
			product.unitprice = (product.totalprice + this.calcDiscount(product)) / product.quantity
		},
		calculateTotal (product, type) {
			console.log(product)
			product.packsize = product.packsize != undefined && product.packsize != '' ? Number(product.packsize) : 1;
			product.packquantity = product.packquantity != undefined && product.packquantity != '' ? Number(product.packquantity) : 1;
			product.packcost = product.packcost != undefined && product.packcost != '' ? Number(product.packcost) : 0;
			product.quantity = product.quantity != undefined && product.quantity != '' ? Number(product.quantity) : 1; 
			product.unitprice = product.unitprice != undefined && product.unitprice != '' ? Number(product.unitprice) : 0;
			product.discountprice = product.discountprice != undefined && product.discountprice != '' ? Number(product.discountprice) : 0;
			
			switch (type){
			case 'packsize' : 
				this.calcPackQty(product);
				this.calcQty(product);
				break;
			case 'packquantity' : 
				this.calcQty(product);
				break;
			case 'quantity' : 
				this.calcPackQty(product);
				// this.calcQty(product);
				break;
			default : break;
			}

			product.outstanding = product.quantityordered - product.quantity
			
			product.totalprice = ((product.quantity * product.unitprice) - this.calcDiscount(product))
			// this.calcUnitPrice(product);
		},
		getProductName (productSlot) {
			console.log(productSlot);
			let product = this.products.find((product) => {
				return productSlot.productID == product.id
			} );
			if(product != undefined) {
				productSlot.vendorproductcode = product.productcode
				productSlot.productcode = product.productcode
				return product.productname
			}
			return 'Select a Product'
			// return this.products.find((product) => id == product.id ).productname
		},
		save (product, type) {
			if(type != 'name'){
				this.calculateTotal(product, type);
			}
			this.snack = true
			this.snackColor = 'success'
			this.snackText = 'Data saved'
		},
		cancel () {
			this.snack = true
			this.snackColor = 'error'
			this.snackText = 'Canceled'
		},
		open () {
			this.snack = true
			this.snackColor = 'info'
			this.snackText = 'Dialog opened'
		},
		close () {
			console.log('Dialog closed')
		},
	 addChild() {
		//  $('td:not(:has(.v-small-dialog__activator))').addClass('input-field');
		
		   
			this.poitems.unshift({
				id: '',
				productID: '',
				packsize: '',
				packquantity: '',
				packcost: '',
				quantity: '',
				quantityordered: '',
				outstanding: '',
				vendorproductcode: '',
				receivedate: '',
				unitprice: 0,
				discountprice: 0,
				totalprice: 0,
				merchID: this.user.id
			})
		},
		removeChild(index) {
			this.poitems.splice(index, 1)
		},
		getProducts() {
			this.$store.dispatch('products/listProducts', this.user.id)
				.then(res =>{
					this.products = res.data.data
				}).catch(e =>{
					console.log(e)
				})
		},
		setDate(date) {
			this.poitems.map(s => {
				if(s.receivedate == '' || s.receivedate == undefined){
					s.receivedate = date
				}
				return s
			})
		}
	},
	mounted() {
		// $('td:not(:has(.v-small-dialog__activator))').addClass('input-field');
		// $('.text-end').addClass('input-field');
		console.log(this.poitems)
		this.getProducts();
	}
}
</script>
