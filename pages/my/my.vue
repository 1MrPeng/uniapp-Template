<template>
	<view>
		我的版本号:{{version}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: this.$store.state.version
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
