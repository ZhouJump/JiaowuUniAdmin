<template>
	<view class="loginbox">
		<view class="title">掌上莆院后台</view>
		<view class="login">
			<view style="height: 60px;"></view>
			<view class="input">
				<i class="bi bi-person-fill ico"></i>
				<input placeholder="输入用户名" v-model="username" />
			</view>
			<view class="input">
				<i class="bi bi-shield-lock-fill ico"></i>
				<input type="password" placeholder="输入密码" v-model="password"/>
			</view>
			<vue-turnstile class="turnstile" site-key="0x4AAAAAAAXSWk28g8iK_dec" v-model="token" />
			<view @click="login" :style="{backgroundColor:token==''?'#FAF7FB':''}" class="button">{{token==''?'等待验证':'登录'}}</view>
		</view>
		
	</view>
</template>

<script>
	const admin = uniCloud.importObject('adminLogin')
	import VueTurnstile from 'vue-turnstile'
	export default {
		data() {
			return {
				token:'',
				username:'',
				password:''
			}
		},
		methods: {
			async login(){
				if(this.token == '')
					{
						uni.showToast({
							title:'请先等待人机验证',
						})
						return
					}
				if(this.username == '')
					{
						uni.showToast({
							title:'请输入用户名',
						})
						return
					}
				if(this.password == '')
					{
						uni.showToast({
							title:'请输入密码',
						})
						return
					}
				let token = await admin.adminLogin({username:this.username,password:this.password,token:this.token})
				if(token!='nouser'&&token!='worngpassword'&&token!='error')
					{
						uni.setStorageSync('token',token)
						uni.navigateTo({
							url:'/pages/index/index'
						})
					}
				else{
					uni.showToast({
						title:'登录失败',
					})
					return
				}
			}
		},
		components: { VueTurnstile }
	}
</script>

<style scoped>
	page{
		height: 100%!important;
		background-color: #EEECF3;
		margin: 0;
		overflow: hidden;
	}
	.button{
		height: 60px;
		margin: 20px;
		width: calc(100% - 40px);
		background-color: #b7b8e6;
		box-sizing: border-box;
		border-radius: 16px;
		color: white;
		text-align: center;
		line-height: 60px;
		font-size: 24px;
	}
	.ico{
		position: absolute;
		line-height: 60px;
		width: 60px;
		text-align: center;
		color: #737489;
		font-size: 30px;
	}
	.turnstile{
		height: 60px;
		margin-left: 150px;
	}
	.input{
		height: 60px;
		margin: 20px;
		width: calc(100% - 40px);
		background-color: #EEECF3;
		box-sizing: border-box;
		border-radius: 16px;
	}
	.input input{
		width: 100%;
		height: 100%;
		padding-left: 60px;
		box-sizing: border-box;
	}
	.loginbox{
		position: relative;
		margin: auto;
		width: 600px;
	}
	.login{
		width: 100%;
		height: 400px;
		background-color: white;
		border-radius: 32px;
	}
	.title{
		color: #737489;
		width: 100%;
		font-size: 40px;
		text-align: center;
		line-height: 160px;
	}
</style>
