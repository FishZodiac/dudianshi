<template>
	<div class='index'>
		<div class="title">
			<p><span>目录</span></p>
		</div>		
		<my-list />
	</div>
</template>
<script>
	import list from './list.vue'
	export default {
		name: 'index',
		components:{
			'my-list':list
		}
	}
</script>
<style scoped>
	.index{
	  width: 100%;
	  background: #fafafa url('../assets/bg.png');	 
	}
	.index .title{
		padding: 12px 8px;
		border-bottom: 2px solid #d9220e;
	}
	.index .title p{
		font-size: 1.4rem;
		padding-left: 35px;		
		background: url('../assets/icon.png') no-repeat left center;
		background-size: 24px 24px;
	}	
</style>