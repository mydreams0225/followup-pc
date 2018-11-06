<template>
    <section>
       <div class="work">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="我的待办" name="first">
                       
                </el-tab-pane>
                <el-tab-pane label="我的已办" name="second"></el-tab-pane>
                <el-tab-pane label="我的项目" name="third"></el-tab-pane>
                
            </el-tabs>
            <!-- {{$route.path}} -->
       </div>
    </section>
</template>
<script>
export default {
  name: "work",
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less">
   .work{
     padding-left: 20px;
     margin-top:20px;
     .el-tabs__header {
        border-bottom:none !important; 
         .el-tabs__nav{
         border-bottom:1px solid #e4e7ed !important;
         .el-tabs__item.is-active {
              background-color: rgb(235,238,245);
              border-bottom:1px solid rgb(235,238,245); 
          }
        }
      }
     
   }
 

</style>
