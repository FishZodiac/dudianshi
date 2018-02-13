<template>
	<div class="titlePage">
		<div class="title" @click="goNext">
			<div class="inner">
				<span>
					读点诗
				</span>
			</div>
		</div>
		<div class="right">
			<p></p>
			<p></p>
			<p></p>
			<p></p>
			<p></p>
		</div>
		<div class="operate">
			<div>
				<span @click="goNext">全部诗集</span>|<span @click="randomOne">信手取一</span>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '../router/index'
	export default {
		name: 'tPage',
		methods:{
			goNext(){
				router.push({name:'index'})
			},
			randomOne(){
				let randomId = parseInt(Math.random()*3373)+1
      			router.push({name:'detail',params:{id:randomId}})
			}
		}
	}
</script>
<style scoped>
	.titlePage{
		width: 100%;
		height: 100%;
		background: #2a2e3d;
		position: relative;
	}
	.titlePage .title{
		background: #eceee4;
		width: 60px;
		height: 50%;
		position: absolute;
		top: 25%;
		left: 50px;
	}
	.titlePage .title .inner{
		position: absolute;
		border: 1px double #2a2e3d;
		padding: 0 5px;
		width: 30px;
		left: 10px;
		top: 10%;
		height: 80%;
		text-align: center;
    	padding-top: 10%;
	}
	.titlePage .title .inner span{
		font-size: 1.4rem;
		color: #2a2e3d;

	}
	.titlePage .right{
		position: absolute;
		right: 0px;
		width: 30px;
		height: 100%;
		border-left: 1px solid #b5b3a1;
	}
	.titlePage .right p{
		border-bottom: 1px solid #b5b3a1;
		height: 100px
	}
	.titlePage .operate{
		position: absolute;
		bottom: 30px;
		left: 30px;
		color: #666;
		z-index: 9999		
	}
	.titlePage .operate span{
		color: #b5b3a1;
		font-size: 1.3rem;
		margin:0 10px;
	}
	.titlePage .operate span:nth-child(1){margin-left: 0px;}
</style>