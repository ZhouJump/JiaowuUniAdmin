<template>
	<view class="main">
		<view class="cast">
			<view class="casttitle">修改公告内容</view>
			<input v-model="info" class="input"/>
			<view class="switch">启用公告<switch :disabled="isloading" :checked="info!='hidden'" @change="changeopen" color="#b7b8e6"></switch></view>
			<view :style="{background:isloading?'#FAF7FB':''}" @click="change" class="button">修改</view>
		</view>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo')
	export default {
		data() {
			return {
				info:this.$parent.$parent.cast,
				isloading:false,
			}
		},
		methods: {
			async change(){
				if(this.isloading == true)
					return
				this.isloading = true
				await castInfo.setcastinfo(this.info)
				this.isloading = false
				this.$parent.$parent.getcast()
			},
			async changeopen(e)
			{
				console.log(e.detail.value)
				if(this.isloading == true)
					return
				if(e.detail.value==true)
				{
					this.isloading = true
					await castInfo.setcastinfo('已启用')
					this.isloading = false
					this.$parent.$parent.getcast()
				}
				else{
					this.isloading = true
					await castInfo.setcastinfo('hidden')
					this.isloading = false
					this.$parent.$parent.getcast()
				}
			},
		},
		mounted(){
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
	.switch{
		width: calc(100% - 32px);
		height: 60px;
		margin: 16px;
		font-size: 18px;
		padding-left: 12px;
		box-sizing: border-box;
	}
	.switch switch{
		float: right;
	}
	.cast{
		width: 600px;
		height: 300px;
		margin: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
	}
	.input{
		width: calc(100% - 32px);
		height: 60px;
		margin: 16px;
		border-radius: 8px;
		background-color: #FAF7FB;
		padding-left: 16px;
		box-sizing: border-box;
		transition-duration: 200ms;
	}
	.input:hover,.button:hover{
		box-shadow: 0 0 4px 2px #b7b8e6;
		transition-duration: 200ms;
	}
	.casttitle{
		font-size: 18px;
		margin: 16px;
		margin-left: 26px;
	}
	.button{
		width: calc(100% - 32px);
		height: 60px;
		box-sizing: border-box;
		border-radius: 8px;
		background-color: #D0D1E6;
		margin: 16px;
		color: white;
		text-align: center;
		line-height: 60px;
		font-size: 20px;
		transition-duration: 200ms;
	}
</style>
