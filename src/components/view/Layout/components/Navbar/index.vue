<template>
  <div class="navbar clearfix">
    <!-- <i class="iconfont fl" :class="isCollapse ? 'icon-tiaoshi' : 'icon-tiaoshi'" @click="handleClick"></i> -->

    <!-- <el-breadcrumb separator="/" class="breadcrumb fl">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in matchedRouter" :key="item.path" v-if='item.meta.title'>
        <span v-if='index !== matchedRouter.length - 1'>{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb> -->
    <div class="fl"> 
        <ul @click="tabHeaderList($event)">
          <li class="font12" 
          :data-index ="index"
          v-for="(headerList,index) in $router.options.routes[1].children"
          v-if="headerList.name !='工作台'"
          :key="index"
          :class="[defaultClickHeaderNav == index ? 'defaultClickHeaderNavStyle':'']">
            {{headerList.name}}
          </li>
        </ul>
    </div>
    <div class="fr">
      <el-dropdown class="avatar" size="medium" @command="handleCommand">
        <span class="el-dropdown-link" style="padding: 0 20px;">
          <img src="~@/assets/logo.png" alt="avatar" style="border-radius: 50%;width: 24px;height: 24px;display: inline-block;vertical-align:middle">
          <span style="display: inline-block;vertical-align:middle">{{userInfo.userEnName}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navbar",
  // topMenu:this.$router.options.routes[1].children,
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    // ...mapGetters(['userInfo'])
  },
  watch: {
    $route: "getBreadcrum"
  },
  data() {
    return {
      matchedRouter: [],
      userInfo: {
        userEnName: "zlz"
      },
      headerNavList: [
        {
          navName: "科研随访"
        },
        {
          navName: "基础资料"
        },
        {
          navName: "系统设置"
        }
      ],
      defaultClickHeaderNav: 1
    };
  },
  created() {
    this.getBreadcrum();
    // sessionStorage.setItem("clickName",this.defaultClickHeaderNav);
     this.defaultClickHeaderNav = sessionStorage.getItem("clickName")
    this.$store.commit("SET_MENUS",
        // this.$router.options.routes[1].children[this.defaultClickHeaderNav].children)
        this.$router.options.routes[1].children[sessionStorage.getItem("clickName")].children)
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$store.dispatch("Logout").then(data => {
            // 登出后刷新
            window.location.reload();
          });
          break;

        default:
          break;
      }
    },
    getBreadcrum() {
      let matched = this.$route.matched.filter(
        item => item.name && item.name !== "home"
      );
      this.matchedRouter = matched;
    },
    handleClick() {
      this.$emit("switchCollapse", !this.isCollapse);
    },
    // 点击顶部菜单切换左菜单
    tabHeaderList(e){
      let dom = e.target.nodeName.toLowerCase();
      let dataIndex;
      if(dom!="ul"){
        if(dom !="li"){
          dataIndex = e.target.parentNode.getAttribute("data-index");
        }else{
          dataIndex = e.target.getAttribute("data-index");
        }
        this.defaultClickHeaderNav = dataIndex;
        sessionStorage.setItem("clickName",this.defaultClickHeaderNav);
        this.$store.commit("SET_MENUS",
        this.$router.options.routes[1].children[this.defaultClickHeaderNav].children)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  .fl {
    width: calc(100% - 180px);
    height: 64px;
    overflow: hidden;
    ul{
      list-style: none;
    }
    & > ul > .defaultClickHeaderNavStyle {
      list-style: none;
      // background-color: rgba(0, 0, 0, 0.1);
      border-bottom: 3px solid rgb(0,152,153);
    }
    & > ul > li {
      width: auto;
      box-sizing: border-box;
      padding: 0 15px;
      height: 64px;
      line-height: 64px;
      float: left;
      cursor: pointer;
      & > i {
        vertical-align: middle;
      }
      &:hover {
        // background-color: rgba(0, 0, 0, 0.1);
         border-bottom: 3px solid rgb(0,152,153);
      }
    }
  }
  & > ul > .indexLeftNavListLi {
    width: 100%;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
    border-left: 3px solid #222d32;
    float: left;
  }
  .iconfont {
    display: inline-block;
    font-size: 20px;
    line-height: 64px;
    width: 100px;
    cursor: pointer;
    //transition: all 0.3s, padding 0s;
    padding: 0px 24px;
    //transition: all .3s;

    &:hover {
      // background-color: rgba(0,0,0,.05);
      background-color: #e6f7ff;
    }
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .breadcrumb {
    padding: 0 5px;
    line-height: 64px;
  }
  .avatar {
    // padding: 0 20px;
    transition: all 0.3s, padding 0s;
    cursor: pointer;
    * {
      outline: none;
    }
    &:hover {
      background-color: #e6f7ff;
    }
  }
}
</style>
