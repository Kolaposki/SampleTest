<template>
<div id="app">
    <div id="map" ref="map" class="map"> 
        <template v-if="Boolean(this.map)">
            <slot
                :map="map"
            />
        </template>
    </div>
</div>
</template>
<script>

export default {
	props: ['center', 'zoom'],
	data: () => ({
		map: null,
	}),
	mounted () {
		this.map = new window.google.maps.Map(this.$refs.map, {
			center: this.center,
			zoom: this.zoom
			

		});
	}
}
</script>