<template>
  <div class="list">
    <div class="pickers">
      <span v-for="item in tab" size="small" v-on:click="onValuesChange(item)" color="#ddd" class="is-size-small is-primary mint-badge tabs" :class="(author==item)?'active':''" >{{item}}</span>      
    </div>
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" class="poem_list">
        <li v-for="item in list" :key="item.id" @click="godetail(item)">
        <section>
          <span class="title">{{item.title | sub20}}</span>
          <span class="author">{{item.author}}</span>
        </section>                  
        </li>
      </ul>
  </div>
</template>

<script>
import router from '../router/index'
export default {
  name: 'list',
  data () {
    return {
      list: '',
      page:1,
      loadmore:true,
      tab: ['李白', '李清照', '王維', '孟浩然', '杜甫'],
      author: '李清照'
    }
  },
  mounted(){
    this.reload()
  },
  filters: {
    sub20: function (value) {
      if (!value) return '';
      if (value.length<20) return value;
      value = value.toString()
      return value.substring(0,20).concat('...')
    }
  },
  methods:{
    loadMore() {
      var that = this;
      if (!that.loadmore) {
        return;
      }
      that.loading = true;
      that.page++;
      this.$http.get(`http://summer.limaogo.com/poems/poets/`,{
        params:{
        'page': that.page,
        'author': that.author
        }
      })
      .then(function (response) {
         if (response.status == 200) {
          that.loading = false
          if (response.data.length == 0) {
            that.loadmore = false
          }
          that.list = that.list.concat(response.data)
      }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    reload(){
      let that = this
      that.list = []
      that.page=1
      that.loadmore=true
      this.$http.get(`http://summer.limaogo.com/poems/poets/`,{
        params:{
        'page': that.page,
        'author': that.author
        }
      }).then(response => {
          if (response.status == 200) {
            that.list = response.data
          }
      }, response => {
          // error callback
      })
    },
    godetail(item){
      sessionStorage.setItem('detail',JSON.stringify(item));
      router.push({name:'detail',params:{id:item.id}})
    },
    onValuesChange(values) {
      this.author = values
      this.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .poem_list{
    list-style: none;
  }
  .poem_list li{
    background: rgba(255,255,255,0.5);
    padding: 16px 8px;
    border-bottom: 1px dotted #ccc;
    font-size: 1.2rem
  }
  .poem_list li .author{
    color: #999;
    float: right;
  }
  .pickers{background: rgba(255,255,255,0.5); padding: 16px 8px;border-bottom: 1px dotted #ccc;}
  .pickers .tabs{color: #666;margin-left: 10px;font-size: 1.1rem;padding:2px 8px;background: #eee}
  .pickers .tabs.active{color: #fff;background: #d9220e !important}
  .pickers .tabs:nth-child(1){margin-left: 0px;}
</style>
