<template>
    <div>
        <div class="flex-width-1-2 less-gp" v-for="(input,k) in productFeatures" :key="k">
        <label  class="form-input">
            <span class="form-input__label">Select Special Feature</span>
            <div class="form-input__input">
            <!-- <Select2 v-model="input.featuretype" :options="options" @select="changeType($event, k)" /> -->
             <select v-model="input.featureID" class="filter-btn box-deco-smallr">
                      <option v-if="k == 0" value="">None</option>
                      <option v-for="feature in features" :key="feature.id" :value="feature.id">
                        {{ feature.featurename }}
                      </option>
                    </select>
            </div>
            
        </label>

        <label  class="form-input">
            <span class="form-input__label">Selling Price <span style="color: red;">*</span></span>
            <div class="form-input__input">
            <input v-model="input.price" type="number" required>
            </div>
        </label>
        <label class="form-input" v-show="k == productFeatures.length-1">
            <button @click="addChild(k)" class="btn btn-icon" type="button">
            Add More
            </button>
        </label>
        <label class="form-input" v-show="k || ( !k && productFeatures.length > 1)">
            <button @click="removeChild(k)" class="btn btn-icon" type="button">
            Remove Above Feature
            </button>
        </label>
        </div>
    </div>
</template>
<script>
export default {
	layout: 'main',
	props: ['featuresList'],
	data: () => ({
		loading: true,
		formData: {
			merchID : 0
		},
		features: [],
		productFeatures: [{
			price: '',
			featureID: ''
		}],
	}),
	// computed : {
	// 	productFeatures  () {
	// 		return 
	// 	}
	// },
	methods: {
		listFeatures() {
			this.$store.dispatch('products/listFeatures', this.formData.merchID)
				.then(res =>{
					this.loading = false
					this.features = res.data.data
				}).catch(err =>{
					this.loading = false
				})
		},
		
		addChild () {
			this.productFeatures.push({
				price: '',
				featureID: ''
			})
		},
        
		removeChild (index) {
			this.productFeatures.splice(index, 1)
		}
	},
	mounted() {
	   this.formData.merchID = this.user.role ? this.user.merchID : this.user.id
		this.listFeatures()

		this.productFeatures = this.featuresList
	}
}
</script>
