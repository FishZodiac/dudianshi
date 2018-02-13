<template>
	<div class="note" v-show="isShow">
		<mt-field placeholder="写点什么" type="textarea" rows="4" v-model="notes"></mt-field>
		<mt-button type="primary" size="large" plain @click="confirm">关闭</mt-button>
	</div>
</template>
<script>
	export default {
		name:'note',
		props:{
			isShow:{
				type:Boolean,
				default:false
			},
			noteid:{
				type:Number
			}
		},
		data(){
			return {
				'notes':''
			}
		},
		mounted(){
			let noteData = localStorage.getItem('noteData');
			if (!noteData) {
				this.noteData = []
				return
			}
			this.noteData = JSON.parse(noteData);
			for (let k in this.noteData) {
				if (this.noteData[k].id == this.noteid) {
					this.notes = this.noteData[k].notes;
				}
			}
		},
		methods:{
			confirm(){
				if(this.notes){
					let _temp = {'id':this.noteid,'notes':this.notes}
					let _have = false;
					for (let k in this.noteData) {
						if (this.noteData[k].id == this.noteid) {
							this.noteData[k].notes = _temp.notes;
							_have = true
							break;
						}
					}

					if (!_have) {
						this.noteData.push(_temp)
					}
									
				}else{
					for (let k in this.noteData) {
						if (this.noteData[k].id == this.noteid) {
							this.noteData.splice(k,1)
						}
					}
				}

				let noteData = JSON.stringify(this.noteData)
				localStorage.setItem('noteData',noteData);
				
				this.$emit("close", false) 
			}
		}
	}
</script>
<style scoped>
	.note{background: #fff;opacity: 0.8;padding:10px;}
</style>