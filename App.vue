<script>
	import "bootstrap-icons/font/bootstrap-icons.css"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@keyframes slidein{
		from{
			opacity: 0;
			transform: translateX(40px);
		}
		to{
			opacity: 1;
			transform: translateX(0);
		}
	}
	/*每个页面公共css */
</style>
