<template>
	<view>
		<view class="head">
			<uni-stat-breadcrumb  class="breadcrumb"/>
			<input @input="searchgoods" placeholder="输入关键字来检索" class="search"/>
		</view>
		<view class="table-contair">
			<uni-table :loading="loading" class="table" stripe border=true>
				<uni-tr>
					<uni-th @filter-change="fitler" filter-type="search" align="center">商品标题</uni-th>
					<uni-th @sort-change="pricesort" sortable=true align="center">商品价格</uni-th>
					<uni-th align="left">卖家ID</uni-th>
					<uni-th align="left">买家ID</uni-th>
					<uni-th @filter-change="statefitler" filter-type='select' :filter-data="filterdata" align="center">订单状态</uni-th>
					<uni-th @sort-change="timesort" sortable=true align="center">发布时间</uni-th>
					<uni-th align="center">操作</uni-th>
				</uni-tr>
				<uni-tr v-show="item.show!=false&&(filter.includes(item.state)||filter.length==0)" v-for="item in goods">
					<uni-td align="center">{{item.title}}</uni-td>
					<uni-td align="center">{{item.price}}</uni-td>
					<uni-td align="left">{{item.seller}} <uni-icons @click="searchuser(item.seller)" type="search"></uni-icons></uni-td>
					<uni-td align="left">{{item.buyer}} <uni-icons @click="searchuser(item.buyer)" type="search"></uni-icons></uni-td>
					<uni-td align="center">{{item.state=='waitget'?'等待收货':item.state=='waitsent'?'等待发货':item.state=='selling'?'售卖中':item.state=='hide'?'已下架':item.state=='selled'?'已售出':'未知'}}</uni-td>
					<uni-td align="center">{{new Date(item.date).getFullYear()}}/{{new Date(item.date).getMonth()+1}}/{{new Date(item.date).getDate()}}</uni-td>
					<uni-td align="center">
						<button :disabled="!(item.state=='selling'||item.state=='selled')" @click="delGoods(item)" class="uni-button" type="warn" size="mini">删除</button>
						<button v-show="item.state!='hide'" :disabled="!(item.state=='selling'||item.state=='selled')" @click="hideGoods(item)" class="uni-button" type="primary" size="mini">下架</button>
						<button v-show="item.state=='hide'" @click="unhideGoods(item)" class="uni-button" type="primary" size="mini">上架</button>
						<button @click="showDetail(item)" class="uni-button" type="default" size="mini">详细信息</button>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<uni-popup type="center" ref="popup">
			<view class="popup">
				<image class="popup-img" mode="aspectFill" :src="good.imgUrl"></image>
				<br/>
				<view class="popup-title">{{good.title}}</view>
				<view class="popup-text">价格：￥{{good.price}}</view>
				<view class="popup-text">买家留言：{{good.address}}</view>
				<view class="popup-text">卖家ID：{{good.seller}}</view>
				<view class="popup-text">买家ID：{{good.buyer}}</view>
				<view class="popup-text">商品状态：{{good.state=='waitget'?'等待收货':good.state=='waitsent'?'等待发货':good.state=='selling'?'售卖中':'其他'}}</view>
				<view class="popup-text">发布时间：{{new Date(good.date).getFullYear()}}年{{new Date(good.date).getMonth()+1}}月{{new Date(good.date).getDate()}}日</view>
				<view class="popup-text">商品编号：{{good._id}}</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const goods = uniCloud.importObject('goods',{customUI: true})
	export default {
		data() {
			return {
				goods:[],
				good:{},
				filterdata:[
					{text: "售卖中",value: "selling"},
					{text: "等待发货",value: "waitsent"},
					{text: "等待收货",value: "waitget"},
					{text: "已售出",value: "selled"},
					{text: "已下架",value: "hide"},
					],
				filter:[],
				loading:false
			}
		},
		methods: {
			searchuser(id){
				uni.setClipboardData({
					data:id,
					success() {
						uni.showToast({
							title: '已复制到剪贴板'
						});
						uni.navigateTo({
							url:'/pages/system/user/list'
						})
					}
				})
			},
			timesort(e){
				let way = e.order=='ascending'?1:-1
				this.goods.sort((a,b)=>{
					if (a.date<b.date) {
					    return -1*way;
					  }
					if (a.date>b.date) {
					    return 1*way;
					  }
					return 0;
					})
			},
			pricesort(e){
				let way = e.order=='ascending'?1:-1
				this.goods.sort((a,b)=>{
					if (a.price-0<b.price-0) {
					    return -1*way;
					  }
					if (a.price-0>b.price-0) {
					    return 1*way;
					  }
					return 0;
				})
			},
			fitler(e){
				this.goods.forEach((element,index)=>{
					if(element.title.includes(e.filter)||e.filter=='')
						element.show = true
					else
						element.show = false
				})
			},
			statefitler(e){
				this.filter = e.filter
			},
			searchgoods(res){
				this.goods.forEach((element,index)=>{
					if(element.title.includes(res.detail.value)||res.detail.value=='')
						element.show = true
					else
						element.show = false
				})
			},
			async getgoods(){
				this.loading = true
				let res = await goods.getAllGoods()
				console.log(res)
				this.goods = res
				this.loading = false
			},
			showDetail(item){
				this.good = item
				this.$refs.popup.open()
			},
			async delGoods(item){
				
				uni.showModal({
					title: '确认删除',
					content: '真的要删除“'+item.title+'”吗？',
					cancelText: '手滑了',
					confirmText: '删除',
					success:async res =>  {
						if(res.confirm){
							this.loading = true
							await goods.delgoods(item)
							this.getgoods()
							this.loading = false
						}
					},
				});
			},
			async hideGoods(item){
				uni.showModal({
					title: '确认下架',
					content: '真的要下架“'+item.title+'”吗？',
					cancelText: '手滑了',
					confirmText: '下架',
					success:async res => {
						if(res.confirm){
							this.loading = true
							await goods.hidegoods(item)
							this.getgoods()
							this.loading = false
						}
					},
				});
			},
			async unhideGoods(item){
				uni.showModal({
					title: '确认上架',
					content: '真的要上架“'+item.title+'”吗？',
					cancelText: '手滑了',
					confirmText: '上架',
					success:async res => {
						if(res.confirm){
							this.loading = true
							await goods.unhidegoods(item)
							this.getgoods()
							this.loading = false
						}
					},
				});
			}
		},
		mounted() {
			this.getgoods()
		}
	}
</script>

<style>
	.table-contair{
		border:  15px solid transparent;
	}
	.table uni-tr uni-td{
		height: 120px;
	}
	.breadcrumb{
		margin-left: 15px;
		float: left;
	}
	.head{
		border-bottom: 1px solid #eeeeee;
	}
	.uni-button{
		margin: 10px;
	}
	.popup{
		width: 400px;
		height: 600px;
		margin-top:clac(50% - 300px);
		background-color: white;
		border-radius: 30px;
		position: relative;
		padding: 15px;
		box-sizing: border-box;
	}
	.popup-title{
		margin-top: 10px;
		font-size: 26px;
	}
	.popup-img{
		width: 370px;
		height: 260px;
		border-radius: 20px;
	}
	.popup-text{
		margin-top: 10px;
		color: gray;
	}
	.search{
		width: 300px;
		float: right;
		border: 1px lightgray solid;
		height: 26px;
		border-radius: 4px;
		margin: 15px;
		font-size: 12px;
		padding-left: 15px;
	}
</style>
