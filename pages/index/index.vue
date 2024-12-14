<template>
	<view class="head">
		<uni-stat-breadcrumb  class="breadcrumb"/>
	</view>
	<view class="mainbox">
		<view class="cast">
			<span><i class="bi bi-megaphone-fill"></i> 最新公告：{{castinfo[0].info}}</span>
			<navigator class="editcast" url="/pages/castInfo/castsetting">
				<i class="bi bi-pencil-square"></i> 修改
			</navigator>
			
		</view>
		<view class="link">
			<navigator class="linkitem" v-for="item in link" :url="item.link">
				<i class="linkicon" :class="[bi,item.icon]"></i>
				<view class="linktext">{{item.text}}</view>
			</navigator>
		</view>
		<view id="usercharts" class="usercharts"></view>
		<view id="goodscharts" class="goodscharts"></view>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	const user = uniCloud.importObject('userInfo',{customUI:true})
	const goods = uniCloud.importObject('goods',{customUI:true})
	const castInfo = uniCloud.importObject('castInfo',{customUI: true})
	export default {
		data() {
			return {
				usercharts:null,
				goodscharts:null,
				castinfo:'加载中',
				link:[
					{text:'商品管理',icon:'bi-cart-fill',link:'/pages/goods/goods'},
					{text:'用户管理',icon:'bi-person-fill-gear',link:'/pages/system/user/list'},
					{text:'公告设置',icon:'bi-megaphone-fill',link:'/pages/castInfo/castsetting'},
					{text:'轮播图设置',icon:'bi-image-fill',link:'/pages/castInfo/bannersetting'},
					{text:'版本管理',icon:'bi-arrow-up-square-fill',link:'/uni_modules/uni-upgrade-center/pages/version/list'},
					{text:'安全审计',icon:'bi-clipboard-check-fill',link:'/pages/system/safety/list'}
				]
			}
		},
		onReady() {
		
		},
		methods: {	
			async mountcharte(){
				this.usercharts = echarts.init(document.getElementById('usercharts'))
				this.goodscharts = echarts.init(document.getElementById('goodscharts'))
				
				this.castinfo = await castInfo.getcastinfo()
				
				await this.getusercharts()
				await this.getgoodscharts()
			},
			//渲染商品增量趋势表
			async getgoodscharts(){
				//获取商品
				let allgoods = await goods.getAllGoods()
				//console.log(allgoods)
				//设置option
				let goodsoption = {
					title: {text: '商品增量趋势'},
				  xAxis: {
				    type: 'category',
				    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']
				  },
				  yAxis: {
				    type: 'value'
				  },
				  series: [
				    {
				      data: [0,0,0,0,0,0,0,0,0,0,0,0],
				      type: 'line',
				      smooth: true
				    }
				  ]
				}
				//处理商品数据
				allgoods.forEach(element=>{
					let date = new Date(element.date)
					goodsoption.series[0].data[date.getMonth()]++
					//绘制图表
					this.goodscharts.setOption(goodsoption)
				})
			},
			//渲染商品交易情况表
			async getusercharts(){
				// 获取用户
				let alluser = await user.getalluser()
				//设置option
				let useroption = {
					title: {text: '商品交易情况'},
					  legend: {},
					  tooltip: {},
					  dataset: {
						source: [['用户名', '上架', '购入', '售出']]
					  },
					  xAxis: { type: 'category' },
					  yAxis: {},
					  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
				}
				// 获取用户买卖量信息
				alluser.forEach(async element=>{
					let userinfo = await user.getuser({id:element.username})
					if(userinfo.mysell+userinfo.mybuy+userinfo.myselled != 0)
						useroption.dataset.source.push([userinfo.nickname,userinfo.mysell,userinfo.mybuy,userinfo.myselled])
					//绘制图表
					this.usercharts.setOption(useroption)
				})	
			}
		},
		mounted() {
			this.mountcharte()
		}
	}
</script>

<style scoped>
	.head{
		border-bottom: 1px solid #eeeeee;
	}
	.breadcrumb{
		margin-left: 15px;
		float: left;
	}
	.mainbox{
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}
	.usercharts{
		box-shadow:0 0 4px 4px #eeeeee;
		border-radius: 4px;
		margin-top: 15px;
		width: calc(50% - 22px);
		height: 400px;
		padding: 10px;
		box-sizing: border-box;
	}
	.goodscharts{
		box-shadow:0 0 4px 4px #eeeeee;
		border-radius: 4px;
		margin-top: 15px;
		width: calc(50% - 22px);
		height: 400px;
		padding: 10px;
		box-sizing: border-box;
	}
	.cast{
		box-shadow:0 0 4px 4px #eeeeee;
		border-radius: 4px;
		width: calc(100% - 30px);
		height: 40px;
		padding-left: 15px;
		padding-right: 15px;
		box-sizing: border-box;
		line-height: 40px;
	}
	.link{
		border-radius: 4px;
		width: calc(100% - 30px);
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 15px;
		grid-gap: 15px;
	}
	.linkitem{
		cursor: default;
		width: 15%;
		height: 100px;
		box-shadow:0 0 4px 4px #eeeeee;
		text-align: center;
		padding: 15px;
		box-sizing: border-box;
		color: #4d4d4d;
		transition-duration: 100ms;
	}
	.linkitem:last-child{
		margin-right: auto;
	}
	.linkitem:nth-last-child(1){
		margin-right: 0;
	}
	.linkitem:hover{
		color: #2979FF;
		transition-duration: 100ms;
		box-shadow:0 0 4px 4px #eeeeee;
		scale: 1.02;
	}
	.linkicon{
		font-size: 30px;
	}
	.linktext{
		
	}
	.editcast{
		float: right;
		cursor: default;
	}
	@media (max-width:600px) {
		.linkitem{
			width: 30%;
		}
		.goodscharts,.usercharts{
			width: calc(100% - 22px);
			height: 300px;
		}
	}
</style>
