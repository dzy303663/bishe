<template>
  <div class="content_wrap">
      <el-card class="radius" :body-style="{ padding: '0px' }" v-for="item in arList" :key="item.name" @click.native="goto(item.name)">
       <div class="head_image" v-bind:style="{ 'background-image': 'url('+item.img+')' }"></div>
      <img src="../../assets/bg_index.jpg" class="image">
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default{
    data() {
        return{
          arList:[
            {
              name: 'fenzi',
              img: require('../../assets/fenzi.png')
            },
            {
              name: 'dev',
              img: require('../../assets/logan.png')
            },
            {
              name: 'logan',
              img: require('../../assets/logan.png')
            },
            {
              name: 'devs',
              img: require("../../assets/star.png")
            },
            {
              name: 'shengdancunzhuang',
              img: require("../../assets/cunzi.png")
            },
            {
              name: 'cube',
              img: require("../../assets/cube.png")
            }

          ]
      }
    },
    methods:{
      goto:function (name){
        window.open("http://localhost:8080//static/AR.js-master/three.js/examples/"+name+'.html')
      }
    }
  }
</script>

<style lang="less" scoped>

  .image {
    width: 100%;
    height: 500px;
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
   // background-image: url("../../assets/logan.png");
   // background-size: contain;
    background-repeat: no-repeat;
    border-radius: 50%;
    background-position: center;
  }
</style>
<style lang="less" scoped>
.el-card{
  width: 268px;
  height: 250px;
  float: left;
  margin: 50px;
  position: relative;
  
  &.radius{
border-radius: 50%;
  }
  cursor: pointer;
  &:hover{
    transform:scale3d(1.2,1.2,1.2);
    transition: all 2s ease;
  }
}
</style>
