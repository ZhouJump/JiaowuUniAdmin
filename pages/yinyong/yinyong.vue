<template>
	<view class="main">
		<view class="app">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.main{
		height: 100%;
		display: flex;
		animation-name: slidein;
		animation-duration: 200ms;
		
	}
	.app{
		width: 600px;
		height: calc(100% - 32px);
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
	}
</style>
