<template>
  <div class="tags-container">
    <div class="tags-wrapper">
       <el-tabs
                v-model="activeIndex"
                type="card"
                @tab-click="tabClick"
                v-if="options.length"
                @tab-remove="tabRemove">
                <el-tab-pane               
                :key="item.name"
                v-for="(item) in options"
                v-if="item.name!='工作台'"
                :p_id="item.num"
                :label="item.name"                
                :name="item.route"
                closable>
                </el-tab-pane>
                <el-tab-pane       
                    v-else
                    :key="item.name"
                    :label="item.name"
                    :name="item.route"
                    :closable="false"
                >
                </el-tab-pane>
            </el-tabs>
            <!-- <router-link><router-link> -->
    </div>
   
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'tags',
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      tags:[{
          path:"1",
          title:"zlz"
      }]
    }
  },
  methods:{    
    // tab切换时，动态的切换路由
    tabClick (tab) {     
      let path = this.activeIndex;
      this.menu_index = tab.$attrs.p_id 
                        ? tab.$attrs.p_id
                        :this.$store.state.menuIndex;

      this.$router.push({path: path});  

      if(this.activeIndex==='/'){     
        const a = this.$refs.sidebar,
              b = this.menu_index;
        // setTimeout(function(){
        //   a.closeMenu(b); 
        // },300)  
      } 

      this.$store.commit('save_index', tab.$attrs.p_id);
    },
    tabRemove (targetName) {
      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {          
          this.$store.commit('set_active_index', this.options[this.options.length-1].route);
          this.$router.push({path: this.activeIndex});
        } else {
          this.$router.push({path: '/'});
        }
      }
    }
  },
  components: {
  },
  computed: {
    options () {
      return this.$store.state.options;
    },
    activeIndex: {
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch: {
    '$route'(to) {
      let flag = false;
      for (let option of this.$store.state.options ) {
        if (option.name === to.name) {
          flag = true;
          this.$store.commit('set_active_index', 'index' + to.path.split('index')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: 'index' + to.path.split('index')[1], name: to.name,num: to.query.num});
        this.$store.commit('set_active_index', 'index' + to.path.split('index')[1]);
      }
    }
  }

};
</script>

<style lang="less">
.tags-container {
  height: 100%;
  width: 100%;
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 99;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.tags-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  a {
    text-decoration: none;
  }
}
.tag {
  width: 110px;
  height: 40px;
  line-height: 40px;
  list-style-type: none;
  position: relative;
  cursor: pointer;
  border-right: 1px solid #ddd;
  background: #f4f6f8;
  color: #23508e;

  span {
    font-size: 14px;
    margin-left: 20px;
  }
  i {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
.active {
  background: #000;
}
</style>
