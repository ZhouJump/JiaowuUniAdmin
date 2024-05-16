<template>
	<view class="main">
		<view class="cast">
			<view class="bannerlist">
				<view @click="changebanner(item)" v-for="item in bannerlist" class="item">
					<image class="image" mode="aspectFill" :src="item.imgUrl"></image>
				</view>
			</view>
			<view @click="isadding=!isadding;ischanging=false;urltype=0" :style="{rotate:isadding?'45deg':'0deg'}" class="addbutton"><i class="bi bi-plus-lg"></i></view>
		</view>
	</view>
	<view v-if="isadding" style="margin-left: 12px;" class="main">
		<view class="banneradd">
			<view class="imagebox">
				<image :src="info.imgUrl" mode="aspectFill" class="image"></image>
				<view @click="chooseimg" class="upload">
					<i class="bi bi-cloud-arrow-up"></i> 上传图片
				</view>
			</view>
			<view class="switch">点击跳转类型
				<view @click="changetype" :class="{switch3cru:urltype==0}" class="switch3">
					<view :style="{left:urltype*76+1.5+'px'}" class="switch3cr"></view>
					<view :style="{color:urltype==0?'black':'white'}" @click="urltype = 0" class="switch3c">关闭</view>
					<view :style="{color:urltype==1||urltype==0?'black':'white'}" @click="urltype = 1" class="switch3c">应用路由</view>
					<view :style="{color:urltype==2||urltype==0?'black':'white'}" @click="urltype = 2" class="switch3c">网络地址</view>		
				</view>
			</view>
			<input v-if="urltype>0" v-model="info.url" class="input"/>
			<view :style="{background:isloading?'#FAF7FB':''}" @click="change" class="button">新增</view>
		</view>
	</view>
	<view v-if="ischanging" style="margin-left: 12px;" class="main">
		<view class="banneradd">
			<view class="imagebox">
				<image :src="changeinfo.imgUrl" mode="aspectFill" class="image"></image>
				<view @click="changeimg" class="upload">
					<i class="bi bi-cloud-arrow-up"></i> 上传图片
				</view>
			</view>
			<view class="switch">点击跳转类型
				<view @click="changetype" :class="{switch3cru:urltype==0}" class="switch3">
					<view :style="{left:urltype*76+1.5+'px'}" class="switch3cr"></view>
					<view :style="{color:urltype==0?'black':'white'}" @click="urltype = 0" class="switch3c">关闭</view>
					<view :style="{color:urltype==1||urltype==0?'black':'white'}" @click="urltype = 1" class="switch3c">应用路由</view>
					<view :style="{color:urltype==2||urltype==0?'black':'white'}" @click="urltype = 2" class="switch3c">网络地址</view>		
				</view>
			</view>
			<input v-if="urltype>0" v-model="changeinfo.url" class="input"/>
			<view :style="{background:isloading?'#FAF7FB':'pink'}" @click="delcast(changeinfo)" class="button">删除</view>
			<view :style="{background:isloading?'#FAF7FB':'#b7b8e6'}" @click="changeban(changeinfo)" class="button">修改</view>
		</view>
	</view>
</template>

<script>
	const castInfo = uniCloud.importObject('castInfo')
	export default {
		data() {
			return {
				isadding:false,
				ischanging:false,
				isloading:false,
				urltype:0,
				type:['no','app','web'],
				info:{url:'',infoType:'banner',imgUrl:'',urlType:'no'},
				changeinfo:'',
				bannerlist:[]
			}
		},
		methods: {
			async changeban(changeinfo){
				this.changeinfo.urlType=this.type[this.urltype]
				console.log(changeinfo)
				await castInfo.updatebanner(changeinfo)
				
				
				this.getcast()
				this.ischanging=false
			},
			async delcast(changeinfo){
				await castInfo.delcast(changeinfo)
				this.getcast()
				this.ischanging=false
			},
			changebanner(item){
				this.ischanging=true
				this.isadding=false
				this.changeinfo = item
				this.urltype=this.type.indexOf(this.changeinfo.urlType)
			},
			chooseimg(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						this.info.imgUrl = res.tempFilePaths[0]
					}
				})
			},
			changeimg(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						this.changeinfo.imgUrl = res.tempFilePaths[0]
					}
				})
			},
			changetype(){
				if(this.urltype==1){
					this.info.url='/pages/apps/'
					this.changeinfo.url='/pages/apps/'
					}
				else if(this.urltype==2){
					this.info.url='http://'
					this.changeinfo.url='http://'
					}
			},
			async getcast(){
				 let banner = await castInfo.getbanner()
				 this.bannerlist = banner
			},
			async change(){
				this.info.urlType=this.type[this.urltype]
				this.info.isShow = this.isshow
				if(this.isloading == true)
					return
					
				this.isloading = true	
				let cloudPath=Date.now() + '.jpg'
				await uniCloud.uploadFile({
					cloudPath: cloudPath,
					filePath:this.info.imgUrl,
					success: async (res) => {
						this.info.imgUrl = res.fileID
						await castInfo.addcastinfo(this.info)
						this.isloading = false
						this.isadding=false
						this.info={url:'',infoType:'banner',imgUrl:'',urlType:'no'}
						this.getcast()
					}
				})
				
			},
		},
		mounted() {
			this.getcast()
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
	.item{
		position: relative;
		width: 100%;
		height: 260px;
		margin-bottom: 8px;
		background-color: #FAF7FB;
		border-radius: 8px;
		overflow: hidden;
	}
	.image{
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.upload{
		width: 100%;
		height: 60px;
		background-color: #D0D1E6;
		position: absolute;
		bottom: -64px;
		transition-duration: 200ms;
		color: white;
		text-align: center;
		line-height: 60px;
		font-size: 20px;
	}
	.imagebox:hover .upload,.imagebox:hover .upload:hover{
		bottom: 0;
	}
	.imagebox{
		position: relative;
		overflow: hidden;
		width: calc(100% - 32px);
		height: 260px;
		box-sizing: border-box;
		border-radius: 8px;
		background-color: #FAF7FB;
		margin: 16px;
	}
	.banneradd{
		position: relative;
		width: 600px;
		height: 600px;
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
	}
	.addbutton{
		transition-duration: 200ms;
		position: absolute;
		background-color: #b7b8e6;
		width: 80px;
		height: 80px;
		right: 60px;
		bottom: 100px;
		border-radius: 40px;
		text-align: center;
		line-height: 80px;
		font-size: 40px;
		color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}
	.bannerlist{
		width: 554px;
		height: calc(100% - 32px);
		position: absolute;
		left: 16px;
		top:16px;
		border-radius: 8px;
		overflow: hidden;
		overflow-y: auto;
	}
	.cast{
		position: relative;
		width: 600px;
		height: calc(100% - 32px);
		margin-left: 2%;
		margin-top: 16px;
		border-radius: 16px;
		background-color: white;
	}
	.switch3{
		padding: 0 1px 0 0;
		top:14px;
		position: relative;
		display: inline-block;
		height: 32px;
		background-color: #b7b8e6;
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
		top:1.5px;
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
