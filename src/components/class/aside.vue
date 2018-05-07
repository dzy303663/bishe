<template>
    <div class="aside">
        <div class="list" :class="message? 'small_list':''">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="goto"
            background-color="transparent"
            text-color="grey"
            active-text-color="#fff"
            style="width: 100%;height:100%;">
            <el-menu-item index="0" ><i class="icon icon_logo" :class="message? 'icon_logo_small':''"></i></el-menu-item>
            <el-menu-item index="1" ><i class="icon icon_class"></i>课堂</el-menu-item>
            <el-menu-item index="2" ><i class="icon icon_ar"></i>研课堂</el-menu-item>
            <el-menu-item index="3" ><i class="icon icon_control"></i>中央控制</el-menu-item>
            <el-menu-item index="4" ><i class="icon icon_work"></i>作业问题</el-menu-item>  
            <el-menu-item index="5" ><i class="icon icon_data"></i> 资源</el-menu-item>
          </el-menu>
        </div>
        <div  alt="" class="user" :class="message? 'small_user':''" @click="gotoPersonal"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left",
      activeIndex: "1"
    };
  },
  props:["message"],
  methods:{
    gotoPersonal(){//个人中心跳转
      this.$router.push("/User/:role/:id/Personal");
    },
    goto(key,keyPath){//标签跳转
      console.log(key);
      console.log(keyPath);
      if(key==0){
        this.$router.push("/User/student/1/index");
      }else if(key==1){
        this.$router.push("/User/student/1/classing");
      }else if(key==2){
        this.$router.push("/User/student/1/ARclass");
      }else if(key==3){
        this.$router.push("/User/student/1/control");
      }else if(key==4){
        this.$router.push("/User/student/1/questions");
      }else{
        this.$router.push("/User/student/1/datadownload");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.aside {
  position: relative;
  bottom: 0px;
  width: 150px;
  height: 100%;
   user-select: none;
}
.list{
  height: 100%;
  width: 150px;
  transition: all 0.5 ease;
  overflow: hidden;
  .el-menu--horizontal>.el-menu-item{
    width: 100%;
    margin-bottom: 25px;
    font-size: 15px;
    text-align: left;
    margin-left: 0px !important;
    padding-left: 15px;
    &:hover{
        background-color: transparent !important;
        color: white !important;   
    }
    &:first-child{
      text-align: center;
      margin: 10px 0 30px;
      border-bottom-color: transparent !important;
    }
  }
  .icon{ 
    width: 50px;
    height: 60px;
    height: inherit;
    display: inline-block;
    background-repeat: no-repeat;
    background-size: contain;
    background-position:center;
    margin: 0 15px 0 0;
    transition: all 0.5s ease;
    &.icon_logo{
      width: 80px;
      height: 80px;
      background-image: url("../.././assets/logo.png");
    }
    &.icon_logo_small{
      width: 50px;
      height: 60px;
    }
    &.icon_class{
      background-image: url("../.././assets/classing.png");
    }
    &.icon_ar{
      background-image: url("../.././assets/glasses.png");
    }
    &.icon_control{
      background-image: url("../.././assets/control.png");
    }
    &.icon_work{
      margin-top: 15px;
      background-image: url("../.././assets/work.png");
    }
    &.icon_data{
      background-image: url("../.././assets/data.png");
    }
  }
}
.user {
  position: absolute;
  background-image: url("../.././assets/user.jpg");
  background-size: contain;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  bottom: 0px;
  margin: 0 10px;
  transition: all 0.5s ease;
  cursor: pointer;
}
 .small_user{
    width: 80px;
    height: 80px;
    margin: 0px;
    cursor: pointer;
  }
  .small_list{
     width: 80px;
  }
</style>
