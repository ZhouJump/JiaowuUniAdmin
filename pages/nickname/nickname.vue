<template style="height: 100%;">
	<view class="nickname">
		<view class="nickname-list">
			<view class="first_name">
				<view>
					 第一组词
				</view>
				<view v-for="(item,index) in first_name" class="name-item">
					<text>{{item}}</text>
					<text class="del" @click="delfirstname(index)">x</text>
				</view>
				<view class="add-item">
					<input placeholder="输入昵称词" @keydown.enter="addfirstname" v-model="add_first_name"/>
				</view>
			</view>
			<view class="last_name">
				<view>
					 第二组词
				</view>
				<view v-for="(item,index) in last_name" class="name-item">
					<text>{{item}}</text>
					<text class="del" @click="dellastname(index)">x</text>
				</view>
				<view class="add-item">
					<input placeholder="输入昵称词" @keydown.enter="addlastname" v-model="add_last_name"/>
				</view>
			</view>
		</view>
		<view class="save">
			<button @click="save" class="save" type="primary" size="mini">保存</button>
		</view>
	</view>
</template>

<script>
	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				first_name:[],
				last_name:[],
				add_first_name:'',
				add_last_name:''
			}
		},
		onLoad() {
			this.getNickNameList()
		},
		methods: {
			async getNickNameList(){
				let res = await community.getNicknameList()
				console.log(res.data)
				this.first_name = res.data[0].first_name
				this.last_name = res.data[0].last_name
			},
			addfirstname(){
				this.first_name.push(this.add_first_name)
				this.add_first_name = ''
			},
			addlastname(){
				this.last_name.push(this.add_last_name)
				this.add_last_name = ''
			},
			delfirstname(index){
				this.first_name.splice(index,1)
			},
			dellastname(index){
				this.last_name.splice(index,1)
			},
			save(){
				community.setNicknameList(this.first_name,this.last_name).then(res=>{
						uni.showToast({
							title: '保存成功'
						});
				}).catch(err=>{
					uni.showToast({
						title: '保存失败'
					});
				})
			}
		}
	}
</script>

<style scoped>
	.del{
		cursor: pointer;
	}
	.nickname{
		height: 100%;
		box-sizing: border-box;
		padding: 16px;
		display: flex;
		display: grid;
		grid-template-rows: 1fr auto;
	}
	.nickname-list{
		display: flex;
		grid-gap: 16px;
	}
	.nickname-list .first_name,
	.nickname-list .last_name{
		display: flex;
		flex-direction: column;
		grid-gap: 6px;
	}
	.nickname-list .first_name .name-item,
	.nickname-list .last_name .name-item{
		padding: 4px 8px;
		width: 200px;
		background-color: #eeeeee;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.add-item{
		padding: 4px 8px;
		width: 200px;
		background-color: #eeeeee;
		border-radius: 6px;
	}
</style>
