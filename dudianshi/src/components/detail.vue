<template>
	<div class="detail">
		<div class="title">
			<span>{{data.title}}</span>
			<span class="author">　/　{{data.author}}</span>
		</div>
		<div class="content">			
			<span class="paraList" v-for="item in data.paragraphs" v-bind:style="(data.paragraphs.length>10)?longstyle:shortstyle">
				{{item}}
			</span>
		</div>
		<div class="autoImg">
			<img :src="dataSrc" alt="">
		</div>

		<div class="operate">
			<div>
				<span @click="write">写点什么</span>|<span @click="randomChange">换一首</span>
			</div>
		</div>

		<div class="datetime">
			<span>{{dateTime}}</span>
		</div>
		<my-note class="note" :is-show="shownote" :noteid="itemid" @close="closeNote" v-show="shownote"/>
	</div>
</template>
<script>
	import img1 from '../assets/card-0.png'
	import img2 from '../assets/card-1.png'
	import img3 from '../assets/card-2.png'
	import router from '../router/index'
	import note from './note'
	export default {
		name: 'detail',
		data(){
			return {
				data:{},
				dateTime:'',
				shownote:false,
				itemid:0,
				shortstyle:{
					fontSize:'1rem',
					marginLeft:'5px'
				},
				longstyle:{
					fontSize:'0.8rem',
					marginLeft:'3px'
				},
				dataSrc:''
			}
		},
		components:{
			'my-note':note
		},
		created(){
			this.itemid = this.$route.params.id
		},
		mounted(){		
			if (!sessionStorage.getItem('detail')) {
				this.reloadOne({'id':this.itemid})
			}else{
				let _data = JSON.parse(sessionStorage.getItem('detail'));
				if (_data.id != this.itemid) {
					this.reloadOne({'id':this.itemid})
				}else{
					this.rerender(_data)
				}
				
			}					
		},
		methods:{
			getTime(){
				Date.prototype.format = function(fmt) { 
				     var o = { 
				        "M+" : this.getMonth()+1,                 //月份 
				        "d+" : this.getDate(),                    //日 
				        "h+" : this.getHours(),                   //小时 
				        "m+" : this.getMinutes(),                 //分 
				        "s+" : this.getSeconds(),                 //秒 
				        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
				        "S"  : this.getMilliseconds()             //毫秒 
				    }; 
				    if(/(y+)/.test(fmt)) {
				            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
				    }
				     for(var k in o) {
				        if(new RegExp("("+ k +")").test(fmt)){
				             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				         }
				     }
				    return fmt; 
				}

				return new Date().format("yyyy-MM-dd hh:mm:ss");
			},
			write(){
				this.shownote = true
			},
			closeNote(data){
				this.shownote = data
			},
			randomChange(){
				let randomId = parseInt(Math.random()*3373)+1
      			router.push({name:'detail',params:{id:randomId}})
      			this.itemid = randomId;
      			this.reloadOne({id:randomId})     			
			},
			reloadOne(data){
				let that = this
				that.$http.get(`http://summer.limaogo.com/poems/poets/one`,{
			      params:{
			      	'id':data.id
			      }
			    }).then(response => {
			        if (response.status == 200) {
			          that.rerender(response.data)
			        }
			    }, response => {
			        // error callback
			    })
			},
			rerender(_data){
				_data.paragraphs = JSON.parse(_data.paragraphs)
				_data.paragraphs.reverse()	
				this.data = _data;
				if(_data.id%3 == 0){this.dataSrc = img1}else if(_data.id%3 == 1){this.dataSrc = img2}else if(_data.id%3 == 2){this.dataSrc = img3}
				this.dateTime = this.getTime()
			}

		}
	}
</script>
<style scoped>
	.detail{
	  width: 100%;
	  height: 100%;
	  background: #fafafa url('../assets/bg.png');	 
	  position:relative;
	}
	.detail .title{
		position: absolute;
		right: 30px;
		top: 30px;
		width: 20px;
		padding-top: 30px;		
		background: url('../assets/icon.png') no-repeat center top;
		background-size: 20px 20px;
		font-size: 1.2rem;
		color: #333;
		text-align:center;
		z-index:999;
		writing-mode:tb-rl;
	}
	.detail .title .author{
		color: #999;		
	}
	.detail .content{
		position: absolute;
		top: 60px;
		left: 20px;
		width: 80%;
		z-index:999;
	}
	.detail .content .paraList{
		line-height: 30px;
		width: 20px;
		display: inline-block;
		float: left;
		writing-mode:tb-rl
	}
	.detail .autoImg{
		position: absolute;
		bottom: 20px;
		right: 20px;
		z-index:0;
	}
	.detail .autoImg img{
		width: 120px
	}
	.detail .operate{
		position: absolute;
		bottom: 30px;
		left: 10px;
		color: #666;
		z-index: 9999		
	}
	.detail .operate span{
		color: #d9220e;
		font-size: 1.2rem;
		margin:0 10px;
	}
	.detail .operate span:nth-child(1){margin-left: 0px;}
	.detail .datetime{
		position: absolute;
		bottom: 10px;
		left: 10px;
		color: #999;
	}
	.detail .note{		
		z-index: 99999;
		position: absolute;
		bottom: 0px;
		left:0px;
		right: 0px;
	}
</style>