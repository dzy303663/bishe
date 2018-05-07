<template>
  <div style="width:100%;height:60px">
    <i class="el-icon-menu" @click="hideaside"></i>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <!-- <el-menu-item index="2">消息中心</el-menu-item>
        <el-menu-item index="3">订单管理</el-menu-item> -->
    </el-menu>
    <!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">个人中心</el-menu-item>
    </el-menu> -->
     <i class="el-icon-logout" @click="logout"></i>
    <div class="line"></div>
  </div>
</template>
<script>
    export default{
        data(){
            return {
                activeIndex: '1'
            }
        },
        methods:{
            hideaside() {
                this.$emit("hideaside",'');
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout(){
                console.log("logout")
                this.$store.state.login_state=false;
                this.$router.push('/');
                console.log("login_state",this.$store.state.login_state);
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-icon-menu{
        position: absolute;
        left: 10px;
        top: 20px;
        cursor: pointer;
    }
     .el-icon-logout{
        width: 16px;
        height: 16px;
        background-image: url("../.././assets/log-out.png");
        background-size: contain;
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
    }
    .el-menu-demo{
        position: absolute;
        background: transparent;
        top:0;
        left:50%;
        margin-left:-144px;
    }
</style>
