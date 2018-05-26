<template>
  <div class="title welcome">
       <div class="welcome_tip">王尚尚同学，欢迎回来</div class="welcome_tip">
       <div class="content_wrap">
         <label for="">当前温度</label><div class="item">{{controlData.temp.temp_now}}°C</div>
         
         <label for="">课堂亮度</label>
         <div class="block" style="width: 40%; margin: 0 auto;">
            <el-slider v-model="controlData.light.light_control" @change="changeLight()"></el-slider>
          </div>
       </div>
        <div class="content_wrap">
         <label for="">窗帘</label><div class="item"><span>1号：{{controlData.curtain.one}}</span><span>2号：{{controlData.curtain.two}}</span><span>3号：{{controlData.curtain.three}}</span></div>
         <label for="">空气质量</label>
         <div class="item">CO2: {{controlData.atmosphere.co2}} SO2: {{controlData.atmosphere.so2}} C0: {{controlData.atmosphere.co}} 
         NO2: {{controlData.atmosphere.no2}} pm2.5: {{controlData.atmosphere.pm2}} AQI: {{controlData.atmosphere.aqi}} </div>
       </div>
      <center><router-link to="/User/student/1/classing">→</router-link></center>
  </div>
</template>
<script>
export default {
  data(){
    return{
    controlData: {
      temp: {
        temp_now: 0,
        temp_control:0
      },
      light: {
        light_now: 20,
        light_control: 0
      },
      curtain: {
        one: '关',
        two: '关',
        three: '关'
      },
      atmosphere:{
        co2: 0,
        so2: 0,
        co: 0,
        no2: 0,
        pm2: 0,
        pm10: 0,
        aqi: 0
      }
    },
  }
   },
   mounted: function () {
     this.getData();
    // alert(this.$store.state.userName)
      
   },
   methods:{
     getData: function () {
       var url = "http://localhost:5200/control"
       this.$http({
         method: "get",
         url: url,
       }).then(res=>{
         console.log(res.data);
         this.controlData=res.data;
       })
     },
     changeLight: function () {
       var url = "http://localhost:5200/control/light";
       this.$http({
         method: 'post',
         url: url,
         params: {
           light_control: this.controlData.light.light_control
         }
       })
       .then(res=>{
          this.$message({
            //调节成功
            showClose: true,
            message: "调节成功,当前空调温度为："+this.controlData.light.light_control,
            type: "success"
          });
       })

       
     }
   }
};
</script>
<style lang="less" scoped>
.title {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../.././assets/bg_index.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 70%;
  color: white;
  &.welcome {
    background-image: url("../.././assets/welcome_bg.jpg");
    .welcome_tip{
      position: relative;
      top: 10%;
      font-size: 30px;
    }
    .content_wrap {
      position: relative;
      width: 25%;
      margin-top: 8%;
      display: inline-block;
      overflow: hidden;
      padding: 5px;
      label {
        box-shadow: 0px 0px 4px -1px white;
        border-radius: 5px;
        padding: 5px;
      }
      .item {
        margin: 13px 0;
        font-size: 13px;
        span{
          text-indent: 2em;
          margin-right: 10px;
        }
      }
    }
  }
}
</style> 
   