<template>
<el-container>
  <el-aside width="150px" :class="hide_aside? 'hide_aside':''" >
    <m-Aside :message="hide_aside"></m-Aside>
  </el-aside>
  <el-container>
    <!-- <transition
      name="slide"
      enter-active-class="slideInLeft"
      leave-active-class="slideOutLeft"
    > -->
    <!-- </transition> -->
     <el-header>
       <m-header @hideaside="hide_aside=!hide_aside"></m-header>
     </el-header>
    <el-main>
      <transition
      name="fade"
      enter-active-class="fadeInLeft"
      leave-active-class="fadeOutRight"
      >
      
       <router-view></router-view>
   
      </transition>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import mAside from "./aside.vue";
import mHeader from "./header.vue";
export default {
  data() {
    return {
      aside: true,
      hide_aside: false
    };
  },
  components: {
    mAside,
    mHeader
  }
};
</script>
<style scoped>
.el-header {
  /* background-color: #b3c0d1; */
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
  position: relative;
}

.el-aside {
  background-color: #98dfcd;
  color: #333;
  text-align: center;
  line-height: 200px;
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}
.hide_aside {
  width: 80px !important;
}
.el-main {
  margin: 20px;
  background-color: white;
  color: #333;
  overflow-x:hidden ;
  
}
/* 隐藏滚动条 */
.el-main::-webkit-scrollbar {
    display: none;
}
.el-container {
  margin-bottom: 40px;
  background-color: #f2f8f7 ;
  
}
</style>