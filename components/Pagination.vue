<template>
  <div class="d-flx-alc-jsb page-extras">
      <div class="drop-down page-drop">
        <button class="btn-text " type="button" >
          Showing <span> {{showing}} </span> of <span> {{ this.headers.Count != undefined ? this.headers.Count : 0 }} </span>
        </button>
      </div>
	  
      <div class="d-flx-alc">
		
		<div v-if="date && typeof date == 'object'" style="font-weight:bold">{{date[0]}} - {{date[1]}}</div>
		<div v-show="typeof date == 'string'" style="font-weight:bold">{{date}} </div>
        <button @click="previous" class="btn btn-icon smallsvg">
          <svg>
            <use href="/uploads/icons.svg#arrow-right"></use>
          </svg>
        </button>
        <button @click="next" class="btn btn-icon smallsvg">
          <svg>
            <use href="/uploads/icons.svg#arrow-left"></use>
          </svg>
        </button>
      </div>
    </div>
</template>
<script>
export default {
	layout: 'main',
	props: ['headers', 'value', 'date'],
	methods: {
		previous () {
			if(this.headers.Prev === "") {
				return
			}
			let page = +this.value - +1
			if(page < 0) {
				page = 1
				// this.formData.page = 1
				return
			}
			this.$emit('input', page)
			// this.formData.page = page
			this.$emit('go');
		},

		next () {
			if(this.headers.Next === "") {
				return
			}
			let page = +this.value + +1


			// this.formData.page = page
			this.$emit('input', page)
			this.$emit('go');
		}
	},
}
</script>