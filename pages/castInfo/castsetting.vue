<template>
	<view class="cast">
		<view class="casttitle">修改公告内容</view>
		<input v-model="info.info" class="input"/>
		<view class="switch">启用公告<switch @click="changeshow" :disabled="isloading" :checked="isshow" color="#2979FF"></switch></view>
		<view class="switch">点击跳转类型
			<view @click="changetype" :class="{switch3cru:urltype==0}" class="switch3">
				<view :style="{left:urltype*76+1.5+'px'}" class="switch3cr"></view>
				<view :style="{color:urltype==0?'black':'white'}" @click="urltype = 0" class="switch3c">关闭</view>
				<view :style="{color:urltype==1||urltype==0?'black':'white'}" @click="urltype = 1" class="switch3c">应用路由</view>
				<view :style="{color:urltype==2||urltype==0?'black':'white'}" @click="urltype = 2" class="switch3c">网络地址</view>		
			</view>
		</view>
		<input v-if="urltype>0" v-model="info.url" class="input"/>
		<button :disabled="isloading" type="primary" @click="change" class="button">修改</button>
	</view>
	<uni-popup ref="popup" type="message">
		<uni-popup-message type="success" message="修改完成" duration=2000></uni-popup-message>
	</uni-popup>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo',{customUI: true})
	export default {
		data() {
			return {
				info:{
					info:'加载中',
					isShow:true,
					urlType:'no',
				},
				isloading:false,
				urltype:0,
				isshow:false,
				type:['no','app','web']
			}
		},
		methods: {
			changeshow(){
					this.isshow=!this.isshow	
			},
			changetype(){
				if(this.urltype==1)
					this.info.url='/pages/apps/'
				else if(this.urltype==2)
					this.info.url='http://'
			},
			async change(){
				this.info.urlType=this.type[this.urltype]
				this.info.isShow = this.isshow
				console.log(this.info.urlType)
				if(this.isloading == true)
					return
				this.isloading = true
				await castInfo.setcastinfo(this.info)
				this.$refs.popup.open()
				this.isloading = false
			},
			async getcast(){
				this.isloading = true
				let res = await castInfo.getcastinfo()
				this.info = res[0]
				this.isshow = this.info.isShow
				this.urltype=this.type.indexOf(this.info.urlType)
				this.isloading = false
			}
		},
		mounted(){
			this.getcast()
		},
	}
</script>

<style scoped>
	.switch3{
		cursor: default;
		padding: 0 1px 0 0;
		top:14px;
		position: relative;
		display: inline-block;
		height: 32px;
		background-color: #2979FF;
		float: right;
		border-radius: 30px;
		margin-right: 5px;
		transition-duration: 200ms;
	}
	.switch3c{
		display: inline-block;
		height: 30px;
		width: 68px;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		position: relative;
		top: -14px;
		margin: 0 4px 0 4px;
		transition-duration: 200ms;
	}
	.switch3cr{
		height: 30px;
		width: 74px;
		text-align: center;
		line-height: 30px;
		font-size: 14px;
		position: absolute;
		border-radius: 15px;
		background-color: white;
		top:1px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
		transition-duration: 200ms;
	}
	.switch3cru{
		background-color: white;
		box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
	}
	.switch{
		width: calc(100% - 32px);
		height: 60px;
		line-height: 60px;
		margin: 16px;
		font-size: 18px;
		padding-left: 12px;
		box-sizing: border-box;
	}
	.switch switch{
		float: right;
	}
	.cast{
		padding: 15px;
	}
	.input{
		width: calc(100% - 32px);
		height: 60px;
		margin: 16px;
		border-radius: 8px;
		background-color: #f3f7ff;
		padding-left: 16px;
		box-sizing: border-box;
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
