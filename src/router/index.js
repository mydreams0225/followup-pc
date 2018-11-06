import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/com/login'
import Layout from '@/components/view/Layout'

Vue.use(Router)

const baseRoutes= [ {
  path:"/",
  component:Layout
},{
  path: '/layout',
  component: Layout,
  children: [
    {
      path: '/f',
      name: '工作台',
      show:false,
      meta: {
        title: '欢迎首页'
      },
    component: () => import('@/components/view/MyWork')
  },
    {
      path: '/MyWorks',
      name: '科研随访',
      show:true,
      meta: {
        title: '欢迎首页'
      },
      children:[{
        name:"我的项目",
        show:true,
        path:'/fMyWorkProject',
        component: () => import('@/components/view/Form')
      }]
     
  },{
    path: '/MyWorkForm',
    name: '基础资料',
    show:true,
    meta: {
      title: '欢迎首页'
    },
  component: () => import('@/components/view/Form')
}
 
]}]
export default new Router({
  routes:baseRoutes
})
