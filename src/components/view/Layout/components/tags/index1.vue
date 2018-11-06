<template>
  <div class="tags-container">
    <div class="tags-wrapper">
      <router-link ref="tag" :to="tag.route" :key="tag.route" v-for="tag in options" 
      @contextmenu.prevent.native="openMenu(tag,$event)" 
      :class="isActive(tag)?'active':''">
        <div class="tag">
          <span>{{tag.name}}</span>
          <i class="el-icon-close" @click.prevent="closeSelectedTag(tag)"></i>
        </div>
      </router-link>
    </div>
    <!-- <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭标签页</li>
      <li @click="closeOthersTags">关闭其他标签页</li>
      <li @click="closeRightTags">关闭右侧标签页</li>
    </ul> -->
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
  computed: {
    visitedViews() {
      if (this.$store.state.tagsView.visitedViews) {
        return this.$store.state.tagsView.visitedViews
      }
    },
    options(){
        return this.$store.state.options
    }
  },
  created(){
    this.addTagsView(this.$route)
  },
  watch: {
    $route() {
      this.addTagsView(this.$route)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    closeMenu() {
      this.visible = false
    },
    addTagsView(route) {
      //console.log(route.path)
      if (!route.path) return
      //console.log(route.path)
    //   this.$store.dispatch('addVisitedViews', route)
    },
    closeSelectedTag(tag) {
      //console.log(tag)
      this.$store.dispatch('delVisitedViews', tag).then(views => {
        if (this.isActive(tag)) {
          //只有在关闭当前打开的标签页才会有影响
          let lastView = views.slice(-1)[0] //选取路由数组中的最后一位
          //console.log(lastView)
          if (lastView) {
            this.$router.push(lastView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },

    closeOthersTags() {
      this.$store.dispatch('closeOtherTags', this.selectedTag).then(view => {
        if (this.selectedTag.path !== this.$route.path) {
          this.$router.push(this.selectedTag.path)
        }
      })
    },
    // 关闭右侧标签
    closeRightTags() {
      let curRouteIndex, selectedIndex
    //   this.$store.getters.visitedViews.forEach((v, i) => {
    //     if (v.path === this.$route.path) {
    //       curRouteIndex = i
    //     }
    //     if (v.path === this.selectedTag.path) {
    //       selectedIndex = i
    //     }
    //   })

      // 如果右键target在当前路由左侧，则切换路由
      if (selectedIndex < curRouteIndex) {
        this.$router.push(this.selectedTag.path)
      }
      console.log(this.selectedTag)
      this.$store.dispatch('closeRightTags', this.selectedTag).then(views => {})
    }
  }
}
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
