<template>
  <div class="sidebar">
    <div class="logo">
      <a href="#/">
        <img src="~@/assets/logo.png" alt="logo">
        <h1>   
          <span >随访系统</span> 
        </h1>
        <div>
        </div>
      </a>
    </div>
    <div>
      <i class="iconfont fl" :class="isCollapse ? 'icon-tiaoshi' : 'icon-tiaoshi'" @click="handleClick"></i>

    </div>
    <sidebar-menu :isCollapse="isCollapse" ></sidebar-menu>
  </div>
</template>

<script>
import Menu from "./Menu";

export default {
  name: "Sidebar",
  components: {
    sidebarMenu: Menu
  },
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit("switchCollapse", !this.isCollapse);
    },
     
  }
};
</script>

<style lang="less">
@import "~@/assets/style/common.less";
 html,body{
   color:#fff;
   
 }
// 去边框
.el-menu {
  height: 600px;
  user-select: none;
  border-right: none;
}
.el-submenu__title i,
.el-submenu__title i {
  color: #fff !important;
}
.el-menu-item.is-active {
  background-color: #1890ff !important;
}
.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: @sidebarWidth;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}
.sidebar {
  height: 100%;
  // 深色
  background-color: rgb(48,49,51) !important;
  color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  .iconfont{
    cursor: pointer;
  }
  .logo {
    height: 64px !important;
    position: relative;
    line-height: 64px;
    padding-left: 5px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    background: rgb(48,49,51);
    overflow: hidden;
    font-size: 15px;
    color: #fff;
       .iconfont {
          display: block;
          font-size: 20px;
          line-height: 64px;
          width: 100px;
          cursor: pointer;
          z-index: 999;
          margin-left: -19px;
     }
    img,
    h1 {
      display: inline-block;
      vertical-align: middle;
      color:#fff;
    }
    img {
      height: 32px;
      width: 32px;
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      white-space: nowrap;
    }
  }
}
</style>
