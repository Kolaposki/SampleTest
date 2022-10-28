
<script>
export default {
	props: {
		map: {
			type: Object,
			required: true
		},
		position: {
			type: Object,
			required: true,
		}

	},

	data: () => ({
		marker: null
	}),


	mounted () {
		this.marker = new google.maps.Marker({
			map: this.map,
			position: this.position
		})
	},

	beforeDestroy() {
		// this.marker.setMap(null)
		// google.maps.events.clearInstanceListeners(this.marker)
	},
    
	render () {
		return null
	}
}
</script>