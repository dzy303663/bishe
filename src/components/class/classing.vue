<template>
  <div>
     <el-card :body-style="{ padding: '0px' }" v-for="n in 6" :key="n" @click.native="goToClass()">
       <div class="head_image"></div>
      <img src="../../assets/bg_index.jpg" class="image">
      <div style="padding: 14px;">
        <span>英文课</span>
        <div class="bottom clearfix">
          <time class="time">上课时间：{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        currentDate: "2018 5.2"
      };
    },
    methods:{
      goToClass: function () {
        this.$router.push('studentClass');
      }
    }
  }
</script>

<style lang="less" scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    min-height: 180px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .head_image{
    position: absolute;
    width: 90px;
    height: 90px;
    left: 90px;
    top: 30px;
    background-image: url("../../assets/user.jpg");
    background-size: contain;
    border-radius: 50%;
  }
</style>
<style lang="less">
.el-card{
  width: 268px;
  height: 250px;
  float: left;
  margin: 50px;
  position: relative;
  cursor: pointer;
  &:hover{
    transform:scale3d(1.2,1.2,1.2);
    transition: all 2s ease;
  }
}
</style>
