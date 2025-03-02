<template>
	<view class="comm-box">
		<uni-popup type="center" ref="popup">
			<view class="popup">
				<view class="title">权重调整</view>
				<view class="current-weight">当前权重:{{weightnote.sortWeight.toFixed(2)}}</view>
				<view class="current-weight">额外权重:{{weightnote.like*4}}</view>
				<view class="current-weight">额外权重:<input type="number"  v-model="like"/></view>
				<view class="button-box">
					<button @click="closePop" type="primary" size="mini" class="cancel">取消</button>
					<button @click="changeWeight" type="warn" size="mini" class="change">调整</button>
				</view>
			</view>
		</uni-popup>
		<view class="table-contair">
			<uni-table class="table" stripe border=true>
				<uni-tr>
					<uni-th>文章标题</uni-th>
					<uni-th>文章浏览量</uni-th>
					<uni-th>文章评论</uni-th>
					<uni-th>文章权重</uni-th>
					<uni-th>发布时间</uni-th>
					<uni-th>发布者</uni-th>
					<uni-th>操作</uni-th>
				</uni-tr>
				<uni-tr v-for="note in notes">
					<uni-td>{{note.title}}</uni-td>
					<uni-td>{{note.view}}</uni-td>
					<uni-td>{{note.comment.length}}</uni-td>
					<uni-td>{{note.sortWeight.toFixed(2)}}(+{{note.like*4}})</uni-td>
					<uni-td>{{getDate(note.date)}}</uni-td>
					<uni-td>{{note.studentid}}</uni-td>
					<uni-td>
						<button @click="changeSrc(note)" class="uni-button" type="primary" size="mini">预览</button>
						<button @click="weight(note)" class="uni-button" type="primary" size="mini">权重</button>
						<button @click="delNote(note)" class="uni-button" type="warn" size="mini">删除</button>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<view class="viewer">
			<view @click.stop="" class="viewer-inner">
				<iframe class="iframe"  :src="noteSrc"></iframe>
			</view>
		</view>
	</view>
</template>

<script>
import { nextTick } from 'vue'

	const community = uniCloud.importObject('community',{customUI: true})
	export default {
		data() {
			return {
				notes:[],
				noteSrc:"https://edu.zhoujump.club/#/pages/apps/shequ/home",
				rootSrc:'https://edu.zhoujump.club/#/pages/apps/shequ/detail?id=',
				weightnote:{},
				like:0
			}
		},
		methods: {
			async changeWeight(){
				let that = this
				uni.showModal({
					title:'确认修改',
					content:'确实要修改“'+that.weightnote.title+'”的权重吗',
					success: async ()=>{
						await community.changeWeight(that.weightnote._id,that.like-0)
						that.closePop()
						that.getNote()
					}
				})
			},
			async getNote(){
				let res = await community.getNoteAdmin()
				this.notes = res.data
				console.log(res)
			},
			closePop(){
				this.$refs.popup.close()
			},
			weight(note){
				this.weightnote = note
				this.like = note.like*4
				this.$refs.popup.open()
			},
			getDate(date){
				let mydate = new Date(date)
				return mydate.getDate() + '/' + mydate.getMonth() + '/' + mydate.getFullYear() + ' ' + mydate.getHours() + ':' + mydate.getMinutes() + ':' + mydate.getSeconds()
			},
			changeSrc(note){
				this.noteSrc=""
				setTimeout(()=>{
					this.noteSrc=this.rootSrc + note._id
				},500)
				
			},
			async delNote(note){
				let that = this
				uni.showModal({
					title:'确认删除',
					content:'确实要删除“'+note.title+'”吗',
					success: async ()=>{
						await community.delNote(note._id)
						that.getNotes()
					}
				})
			},
		},
		onLoad() {
			this.getNote()
		}
	}
</script>

<style scoped>
	.popup{
		padding: 10px;
		border-radius: 10px;
		background-color: white;
	}
	.popup .title{
		width: 300px;
		text-align: center;
		margin-bottom: 20px;
		font-size: 20px;
	}
	.popup .current-weight{
		display: flex;
		width: 100%;
	}
	.current-weight input{
		border: 1px solid lightgray;
		border-radius: 4px;
		padding: 0 8px;
	}
	.button-box{
		margin-top: 60px;
		display: flex;
		grid-gap: 10px;
	}
	.button-box button{
		flex: 1;
	}
	.comm-box{
		height: 100%;
		padding: 10px;
		display: flex;
	}
	.viewer .viewer-inner{
		margin-left: 10px;
		width: 340px;
		background-color: gray;
		aspect-ratio: 1/2.2;
		border: 8px solid black;
		border-radius: 32px;
		box-sizing: border-box;
		background-color: black;
	}
	.viewer-inner .iframe{
		width: 100%;
		height: 100%;
		border: none;
		border-radius: 28px;
		background-color: white;
	}
	.table-contair{
		flex: 1;
		height: 100%;
	}
	.table{
		height: 100%;
	}
	.uni-button:not(:last-child){
		margin-right: 4px;
	}
</style>
