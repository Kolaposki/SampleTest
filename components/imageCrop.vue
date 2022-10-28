<template>

  <div>
      <div  class="flex-width-1-1 less-gp">
        <img v-if="file == 'none' || file == undefined || file == ''" :id="pic"  :style="image ? 'margin: auto; ' : ''" :src="image"  alt="">
        <img v-else :id="pic" style="margin-right:auto; margin-left: auto; width: 200px; height: 200px" :src="file"  alt="">
      </div>
      <div v-if="image || file">
		  <button
            class="btn btn--primary"
            @click="removeImage"
        >Change image</button>
      </div>
      <div v-else>
		          <div class="form-input__input">
        <input
            id="img_url"
            @change="onFileChange"
            type="file"
			accept=".png, .jpg, .jpeg"
        />
        </div>
        
      </div>
  </div>
</template>

<script>

// import Croppie from "/js/croppie";
// import "/css/croppie.css";

export default {
	name: "imageCrop",
	props: ['pic', 'update'],
	data () {
		return {
			vanilla: null,
			image: '',
			link: 'none',
		}
	},
	computed : {
		file : {
			set(val){
				this.link = val
			},
			get(){
				return this.link != 'none' ? this.link : this.update ;
			}
		}
	},
	mounted () {
		// this.link != 'none' ? this.link : this.update 
		// this.image = this.update != undefined ? this.update : '';
	},
	methods : {
		onFileChange (e) {
			var files = e.target.files || e.dataTransfer.files;
			
			var allowed_types = [ 'image/png',
					'image/jpg', 'image/jpeg']
			if(!files.length)
				return
			if (!allowed_types.includes(files[0].type)) {
				this.$toast.error('Only Images of Type jpg, jpeg and png allowed')
				return
			}
			if (!files.length) return;
			this.createImage(files[0]);
		},
		removeImage: function (e) {
			this.image = "";
			this.file = "";
			if (this.vanilla) this.vanilla.destroy();
		},
		createImage (file) {
			var image = new Image();
			var reader = new FileReader();
			
			let el = document.querySelector('#'+this.pic);

			this.vanilla = new Croppie(el, {
				viewport: { width: 400, height: 400 },
				boundary: { width: 500, height: 500 },
				showZoomer: true
			});

			reader.onload = e => {
				this.image = e.target.result
				this.vanilla.bind({
					url: e.target.result,
					// orientation: 4
				});
			};
			reader.readAsDataURL(file);
		},
		async getImage() {
			let vm = this;
			if(this.vanilla != null) {
				await this.vanilla.result( 'blob').then(function (img) {
					vm.image = img;
					// .split(',')[1
					vm.$emit('image', img);
				});
			}
			return this.image;
		}
	}
}
</script>

<style scoped>

</style>