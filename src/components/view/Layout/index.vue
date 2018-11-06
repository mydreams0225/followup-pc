<template>
    <div class="layout">
        <!-- 左边导航栏 -->
        <section class="side-wrapper" :style="{width: isCollapse ? '50px' : '200px'}">
            <div class="sidebar" :style="{width: isCollapse ? '50px' : '200px'}">
                <div class="sidebar-menu">
                <sidebar :isCollapse="isCollapse" @switchCollapse="switchCollapse"></sidebar>
                </div>
            </div>
       </section>
       
       <section class="main-wrapper">
       <div class="navbar-wrapper">
        <navbar :isCollapse="isCollapse" @switchCollapse="switchCollapse"></navbar>
      </div>
      <div class="tags-wrapper">
        <!-- <tags></tags> -->
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
            <!-- <router-view></router-view> -->
            <!-- <router-link><router-link> -->
    </div>
   
  </div>
      </div>
      <div class="content-wrapper">
        <!-- 内容区 -->
        <!-- {{$store.state.menus}} -->
          <router-view></router-view>
      </div>
      <div class="footer-wrapper">
         
      </div>
    </section>
    </div>
</template>
<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import tags from './components/tags'
export default {
  name: "layout",
  data() {
    return {
        isCollapse:true
    };
  },
  components:{
      Sidebar,
      Navbar,
      tags
  },
  methods:{
      switchCollapse(isCollapse) {
        this.isCollapse = isCollapse
    },
    // tab切换时，动态的切换路由
    tabClick (tab) {     
        console.log()
      let path = this.activeIndex;
      this.menu_index = tab.$attrs.p_id 
                        ? tab.$attrs.p_id
                        :this.$store.state.menuIndex;

      this.$router.push({path: path});  

      if(this.activeIndex==='/f'){     
        const a = this.$refs.sidebar,
              b = this.menu_index;
        // setTimeout(function(){
        //   a.closeMenu(b); 
        // },3000)  
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
          this.$router.push({path: '/f'});

        }
      }
    }
  },
  created() {},
  mounted() {
    this.resizeHandler = () => {
      if (document.body.clientWidth < 800) {
        if (!this.isCollapse) {
          this.isCollapse = true
        }
      } else {
        if (this.isCollapse) {
          this.isCollapse = false
        }
      }
    }
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
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
          this.$store.commit('set_active_index', '/f' + to.path.split('/f')[1]);
          break
        }
      }
      if (!flag) {
        this.$store.commit('add_tabs', {route: '/f' + to.path.split('/f')[1], name: to.name,num: to.query.num});
        this.$store.commit('set_active_index', '/f' + to.path.split('/f')[1]);
      }
    }
  }



};
</script>
<style lang="less">
html,body{
    
    width:100%;
}
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  background: #ffffff;
  .side-wrapper {
    height: 100%;
    
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    -o-transition: all 0.28s ease-in-out;
    transition: all 0.28s ease-in-out;
    // &.isCollapse {
    //   width:50px;
    //   flex: 0 0 50px;
    //   overflow: hidden;
    // }
    .sidebar {
        color:#fff !important;
      transition: all 0.28s ease-in-out;
      .logo {
        height: 120px;
        position: relative;
        // top:15px;
        line-height: 64px;
        padding-left: 5px;
        // -webkit-transition: all 0.3s;
        // transition: all 0.3s;
        background: rgb(48,49,51);
        overflow: hidden;
        font-size: 20px;
        img,
        h1 {
          display: inline-block;
          vertical-align: middle;
        }
        h2{
            display:block;
            height: 64px;
            line-height: 64px;
        }
        img {
          height: 32px;
          width: 32px;
        }
        h1 {
          color: #ffffff;
          margin-left: 14px;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
            sans-serif;
          white-space: nowrap;
        }
      }
    }
  }
  .main-wrapper {
    position: relative;
    flex: auto;
    overflow: hidden;
    .navbar-wrapper {
      height: 64px;
      line-height: 64px;
      width: 100%;
      background: #fff;
      .iconfont {
        display: inline-block;
        font-size: 20px;
        line-height: 64px;
        cursor: pointer;
        transition: all 0.3s, padding 0s;
        padding: 0px 24px;
        transition: all 0.3s;
      }
    }
    .tags-wrapper {
      height: 40px;
      width: 100%;
      background: #ebeef5;
    }
    .content-wrapper {
      height: calc(100% - 134px);
      width: 100%;
      // background: #f8f8f8;
    }
    .footer-wrapper{
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 30px;
      width: 100%; 
      text-align: center;
      color:#CFCFCF;
      background: #f8f8f8;
    }
  }
}
</style>



