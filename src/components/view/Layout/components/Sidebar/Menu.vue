
<template>
    <div class="Menu">
         <section>
               <el-menu 
               ref='menu'
               default-active="$route.path" 
               class="el-menu-vertical-demo" 
                @open="handleOpen "  
                @close="handleClose" 
                @select="handleSelect"
                :collapse="this.isCollapse"
                unique-opened
                background-color="rgb(48,49,51)"
                text-color="#fff"
                active-text-color="rgb(48,49,51)"
                >
               <el-submenu v-if="menu.children &&  menu.show" v-for="menu in  $store.state.menus" 
                    :key="menu.path" 
                    :index="menu.path">        
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>{{menu.name}}</span>
                    </template>
                    <el-menu-item-group>   
                      <el-menu-item  v-if="c.show" v-for="c in menu.children"                    
                          :key="c.path" 
                          :index="c.path">           
                            <router-link :to="{path:c.path,query:{num: menu.oid}}">   
                              <i class="el-icon-document"></i>             
                          {{c.name}}
                        </router-link> 
                      </el-menu-item>                           
                    </el-menu-item-group>
                </el-submenu>  
                <el-menu-item-group>   
                      <el-menu-item v-if="!menu.children && menu.show" v-for="menu in  $store.state.menus"                     
                          :key="menu.path" 
                          :index="menu.path">           
                            <router-link :to="{path:menu.path,query:{num: menu.oid}}">    
                              <i class="el-icon-document"></i>            
                          {{menu.name}}
                        </router-link> 
                      </el-menu-item>                           
                    </el-menu-item-group>    
            </el-menu>
         </section>
    </div>
</template>

<script>
//import { asyncRouterMap } from '@/router'

export default {
  name: "Menu",
  props: {
    isCollapse: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return{
         menus: [
           { 
                      route: '/',
                      oid:'601',
                      name:'首页' 
             },
              { 
                      route: 'HelloWorld',
                      oid:'201',
                      name:'XX账户查询' 
                  },{ 
              name: 'XX管理',
              oid:'1',
              item:[{ 
                      route: '/page1',
                      oid:'101',
                      name:'XX信息查询' 
                  },
                  { 
                      route: '/page2',
                      oid:'102',
                      name:'XX状态查询' 
                  }]
            },{ 
              name: 'XX管理2',
              oid:'2',
              item:[{ 
                      route: '/page3',
                      oid:'201',
                      name:'XX账户查询' 
                  }]
              }
          ]
    }
  },

     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
     handleSelect(key,path){
       console.log(path[0]);
        this.$store.commit('save_index', key);
      },
  
    },
    mounted () {
      // 刷新时以当前路由做为tab加入tabs    
      if (this.$route.path !== '/f' && this.$route.path.indexOf('/f') == -1) {
        this.$store.commit('add_tabs', {route: '/f', name: '工作台'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name });
        this.$store.commit('set_active_index', this.$route.path);
        this.$store.commit('save_index', this.$route.query.num);
      } else {
        this.$store.commit('add_tabs', {route: '/f', name: '工作台'});
        this.$store.commit('set_active_index', '/f');
        this.$router.push('/f');
      }
    }
  
};
</script>
<style>
  .el-menu-item.is-active{
    background: rgb(0,152,153) !important;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
</style>
