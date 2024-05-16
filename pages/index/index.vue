<template>
	<div class="title"><image src="../../static/logo.png"></image><text>莆院助手后台</text></div>
	<div class="bookmart">
		<div @click="mark=index" class="mark" :class="{markchoce:index == mark}" v-for="(item,index) in bookmark"><i :class="['bi',item.icon]"></i> {{item.name}}</div>
		<div @click="logout" class="mark log"><i class="bi bi-box-arrow-left"></i> <text class="logout">退出登录</text><text class="usernanme">{{username}}</text></div>
	</div>
	<div class="planebox">
		<gonggao-vue v-if="mark==1"></gonggao-vue>
		<yinyong-vue v-if="mark==2"></yinyong-vue>
	</div>
</template>

<script>
	const admin = uniCloud.importObject('adminLogin')
	import gonggaoVue from '../gonggao/gonggao.vue'
	import yinyongVue from '../yinyong/yinyong.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				bookmark:[
					{name:'主页',url:'',icon:'bi-speedometer2'},
					{name:'公告信息',url:'',icon:'bi-card-text'},
					{name:'应用管理',url:'',icon:'bi-ui-checks-grid'},
					{name:'用户管理',url:'',icon:'bi-people'},
					{name:'管理员',url:'',icon:'bi-person-gear'},
				],
				mark:0,
				token:uni.getStorageSync('token'),
				username:''
			}
		},
		onLoad() {

		},
		components:{
			gonggaoVue:gonggaoVue,
			yinyongVue:yinyongVue
		},
		methods: {
			async checklogin(){
				let state = await admin.isLogin(this.token)
				if(state == 'nologin')
					{
						uni.navigateTo({
							url:'/pages/login/login'
						})
					}
				else{
					this.username = state
				}
			},
			logout(){
				uni.removeStorageSync('token')
				this.token = ''
				this.$nextTick(()=>{
					this.checklogin()
				})
			}
		},
		mounted() {
			this.checklogin()
		}
	}
</script>

<style scoped>
	page{
		height: 100%!important;
		background-color: #EEECF3;
		margin: 0;
		overflow: hidden;
	}
	.logout{
		position: absolute;
		opacity: 0;
		transition-duration: 200ms;
	}
	.usernanme{
		position: absolute;
		opacity: 1;
		transition-duration: 200ms;
	}
	.log:hover .logout{opacity: 1;}
	.log:hover .usernanme{opacity: 0;}
	.planebox{
		height: calc(100% - 80px);
		width: calc(100% - 320px);
		background-color: #FAF7FB;
		position: absolute;
		left: 300px;;
		bottom: 0;
		display: flex;
		border-top-left-radius: 32px;
		border-top-right-radius: 32px;
		overflow: hidden;
		overflow-x: auto;
	}
	.bookmart{
		height: calc(100% - 80px);
		width: 260px;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.mark{
		position: relative;
		height: 60px;
		line-height: 60px;
		width: 100%;
		padding-left: 20px;
		color: #737489;
		font-size: 20px;
		border-radius: 0 40px 40px 0;
		transition-duration: 200ms;
	}
	.mark i{
		font-size: 28px;
		display: inline-block;
		position: relative;
		margin-right: 10px;
	}
	.markchoce{
		background-color: #D0D1E6;
		transition-duration: 400ms;
	}
	.mark:hover{
		background-color: #E6E4ED;
		transition-duration: 400ms;
	}
	.markchoce:hover{
		background-color: #D0D1E6;
		transition-duration: 400ms;
	}
	.title{
		height: 50px;
		width: 400px;
		margin: 15px;
		line-height: 60px;
		position: relative;
	}
	.title image{
		height: 50px;
		width: 50px;
	}
	.title text{
		line-height: 50px;
		display: inline-block;
		position: absolute;
		padding-left: 20px;
		color: #737489;
		font-size: 24px;
		
	}
	.log{
		position: absolute;
		bottom: 20px;
	}
</style>
