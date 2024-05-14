<template>
	<view class="main">
		<view class="gonggao">
			<view :style="{opacity:cast=='hidden'?'0.4':'1'}" @click="chose=0" class="cast"><i class="bi bi-megaphone-fill"></i> {{cast}}</view>
			<view @click="chose=1" class="banner"></view>
			<view class="compnent">
				<view class="com"></view>
				<view class="com"></view>
				<view class="com">用户组件</view>
			</view>
		</view>
		<cast-vue v-if="chose==0"></cast-vue>
		<banner-vue v-if="chose==1"></banner-vue>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo')
	import castVue from './cast.vue'
	import bannerVue from './banner.vue'
	export default {
		data() {
			return {
				chose:-1,
				cast:'获取中'
			}
		},
		methods: {
			 async getcast(){
				 this.cast = await castInfo.getcastinfo()
			 }
		},
		mounted() {
			this.getcast()
		},
		components:{
			castVue:castVue,
			bannerVue:bannerVue
		},
	}
</script>

<style scoped>
	.main{
		height: 100%;
		display: flex;
		animation-name: slidein;
		animation-duration: 200ms;
		
	}
	.gonggao{
		width: 600px;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.cast{
		width: 96%;
		height: 80px;
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
		line-height: 80px;
		padding-left: 20px;
		font-size: 18px;
		box-sizing: border-box;
	}
	.banner{
		width: 96%;
		height: 260px;
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
	}
	.compnent{
		width: 96%;
		height: 260px;
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		position: relative;
	}
	.com:nth-child(1){
		position: absolute;
		top:50px;
		width: 100%;
		height: 100%;
		border-radius: 16px;
		background-color: #f4f4f4;
		scale: 0.85;
	}
	.com:nth-child(2){
		top:26px;
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 16px;
		background-color: #f8f8f8;
		scale: 0.95;
	}
	.com:nth-child(3){
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 16px;
		background-color: white;
		text-align: center;
		color: #e1e1e1;
		font-size: 60px;
		line-height: 260px;
	}
	
</style>
