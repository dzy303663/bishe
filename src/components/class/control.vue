<template>
<div>
  <el-carousel :autoplay="false" type="card" height="500px">
    <el-carousel-item v-for="item in controlList" :key="item.index">
      <div class="header">{{item.title}}</div>
      <div class="contain_temp" v-if="item.index<=2">
         <el-switch
            v-model="item.state"
            active-color="#81e4cb"
            inactive-color="grey">
          </el-switch>
          <transition
            name="fade"
            enter-active-class="fadeIn"
            leave-active-class="fadeOut"
          >
          <div class="close" v-if="!item.state">
            <i class="iconfont" :class="item.index==1?'icon-dengpao':'icon-wendu'"></i>
          </div>
        </transition>
        <transition
            name="fade"
          >
         <div class="open" v-if="item.state">
           <span>{{item.title}}</span>  
           <el-progress type="circle" :percentage="item.value" :stroke-width="10" :width="200" >°</el-progress>
          <div class="block" >
            <el-slider v-model="item.value"  show-input  @change="changeLight()"></el-slider>
          </div>
        </div>
        </transition>
      </div>
      <div class="contain_curtain" v-if="item.index==3">
        <el-switch
            v-model="item.state"
            active-color="#81e4cb"
            inactive-color="grey">
          </el-switch>
          <transition
            name="fade"
          >
          <div class="close" v-if="!item.state">
             <i class="iconfont" :class="item.index==3?'icon-chuanglian-':'icon-kongqizhiliang'"></i>
          </div>
          </transition>
            <div class="open">
            <ul class="curtainList" >
              <li ref="curtainList1"><span class="item">一号：</span> <span class="item item_choice active" @click="chioceItem($event)">关</span> <span class="item item_choice" @click="chioceItem($event)">半</span> <span class="item item_choice" @click="chioceItem($event)">全</span> </li>
              <li ref="curtainList2"><span class="item">二号：</span> <span class="item item_choice active" @click="chioceItem($event)">关</span> <span class="item item_choice" @click="chioceItem($event)">半</span> <span class="item item_choice" @click="chioceItem($event)">全</span> </li>
              <li ref="curtainList3"><span class="item">三号：</span> <span class="item item_choice active" @click="chioceItem($event)">关</span> <span class="item item_choice" @click="chioceItem($event)">半</span> <span class="item item_choice" @click="chioceItem($event)">全</span> </li>
            </ul>
          </div>
      </div>
      <div class="contain_atmosphere" v-if="item.index==4">
        <el-switch
          v-model="item.state"
          active-color="#81e4cb"
          inactive-color="grey">
        </el-switch>
        <transition
          name="fade"
        >
          <div class="close" v-if="!item.state">
              <i class="iconfont" :class="item.index==3?'icon-chuanglian-':'icon-kongqizhiliang'"></i>
          </div>
        </transition>
        <div class="open">
          <div class="row">
            <span>So2: <span>{{atmosphere.So}}</span> μg/m³</span><span>Co: <span>{{atmosphere.Co}} </span> μg/m³</span><span>No2: <span>{{atmosphere.No2}}</span> μg/m³</span>
          </div>
          <div class="row">
            <span>pm2.5: <span>{{atmosphere.pm2}}</span> μg/m³</span><span>pm10: <span>{{atmosphere.pm10}}</span> μg/m³</span><span>AQI: <span>{{atmosphere.AQI}}</span> μg/m³</span>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>
<script>
export default {
  data() {
    return {
      chioce: false,
      controlList: [
        {
          index: 1,
          title: "Lighteness",
          state: true,
          value: 50
        },
        {
          index: 2,
          title: "temperature",
          state: true,
          value: 50
        },
        {
          index: 3,
          title: "curtain",
          state: true,
          value: 50
        },
        {
          index: 4,
          title: "atmosphere",
          state: true,
          value: 50
        }
      ],
      atmosphere: {
        So: 51,
        Co: 50,
        No2: 50,
        pm2: 50,
        pm10: 50,
        AQI: 50
      },
      curtainList: {
        one: "关",
        two: "半",
        three: "全"
      }
    };
  },
  computed(){
  
  }
  ,
  methods: {
    changeLight: function() {
      var url = "http://localhost:5200/control/light";
      this.$http({
        method: "post",
        url: url,
        params: {
          light_control: this.controlList[0].value,
          light_state: this.controlList[0].state
        }
      }).then(res => {
        this.$message({
          //调节成功
          showClose: true,
          message: "调节成功,当前亮度为：" + this.controlList[0].value,
          type: "success"
        });
      });
    },
    changeLight: function() {
      var url = "http://localhost:5200/control/temp";
      this.$http({
        method: "post",
        url: url,
        params: {
          light_control: this.controlList[1].value,
          light_state: this.controlList[1].state
        }
      }).then(res => {
        this.$message({
          //调节成功
          showClose: true,
          message: "调节成功,当前空调温度为：" + this.controlList[1].value,
          type: "success"
        });
      });
    },
    chioceItem: function(event) {
      //var ref_parent=this.$refs.curtainList1[0].children[0].innerHTML;
      // var ref_chioce=this.$refs.curtainList1[0].children[1].innerHTML;
      var eve_parent = event.target.parentNode.children[0].innerHTML;
      var eve_chioce = event.target.innerHTML;
      if (eve_parent == "一号：") {
        for (var i = 1; i <= 3; i++) {
          var classList = this.$refs.curtainList1[0].children[i].classList;
          if (classList.length > 2) {
            console.log("去掉active class");
            classList.remove("active");
          }
          if (eve_chioce == this.$refs.curtainList1[0].children[i].innerHTML) {
            console.log("选择正确");
            event.target.classList.add("active");
          }
        }
      }
      if (eve_parent == "二号：") {
        for (var i = 1; i <= 3; i++) {
          var classList = this.$refs.curtainList2[0].children[i].classList;
          if (classList.length > 2) {
            console.log("去掉active class");
            classList.remove("active");
          }
          if (eve_chioce == this.$refs.curtainList2[0].children[i].innerHTML) {
            console.log("选择正确");
            event.target.classList.add("active");
          }
        }
      }
      if (eve_parent == "三号：") {
        for (var i = 1; i <= 3; i++) {
          var classList = this.$refs.curtainList3[0].children[i].classList;
          if (classList.length > 2) {
            console.log("去掉active class");
            classList.remove("active");
          }
          if (eve_chioce == this.$refs.curtainList3[0].children[i].innerHTML) {
            console.log("选择正确");
            event.target.classList.add("active");
          }
        }
      }
      this.$message({
        message: "操作成功",
        type: "success"
      });
      /*  console.log(this.$refs.curtainList1[0].children[0].innerHTML);//ref 父
      console.log(this.$refs.curtainList1[0].children[1].innerHTML);//ref 关，半，全
      console.log(event.target.parentNode.children[0].innerHTML);//event 父
      console.log(event.target.innerHTML);//event 关，半，全

      console.log(this.$refs.curtainList1[0].children);
      console.log(event.target); */
    }
  }
};
</script>
<style>
.el-carousel__item:nth-child(2n) {
  background-color: #9de8d5;
  background-image: url("../.././assets/bg_index.jpg");
  background-size: cover;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #c2efe3;
}
.el-carousel__indicators--outside {
  display: none;
}
</style>
<style lang="less" scoped>
.header {
  font-size: 21px;
  padding: 10px 0 15px 10px;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.contain_temp {
  padding: 10px 0 15px 10px;
  overflow: hidden;
  .close {
    width: 100%;
    height: 444px;
    // background-image: url("../.././assets/light.png");
    background-position: center;
    background-size: 150px 150px;
    background-repeat: no-repeat;
    margin: 0 auto;
    text-align: center;
    .icon-wendu,
    .icon-dengpao {
      padding-top: 50px;
      font-size: 200px;
      color: grey;
    }
  }
  .open {
    text-align: center;
    width: 100%;
    & > span {
      color: white;
      font-size: 18px;
      display: block;
      margin-bottom: 40px;
    }
    .block {
      margin: 50px 50px;
    }
  }
}
.contain_curtain {
  margin: 10px;
  overflow: auto;
  .close {
    width: 100%;
    height: 444px;
    // background-image: url("../.././assets/light.png");
    background-position: center;
    background-size: 150px 150px;
    background-repeat: no-repeat;
    margin: 0 auto;
    text-align: center;
    .icon-chuanglian-,
    .icon-kongqizhiliang {
      text-align: center;
      font-size: 200px;
      color: grey;
    }
  }
  .open {
    text-align: center;
    width: 100%;
    .curtainList {
      list-style: none;
      margin: 10%;
      padding: 0;
      margin-top: 50px;
      li {
        display: block;
        margin-top: 20px;
        text-align: left;
        font-size: 15px;
        color: black;
        overflow: hidden;
        text-align: center;
        &:hover {
          background-color: #b6b6f173;
          transition: all 0.5s ease;
        }
        .item {
          display: inline-block;
          margin-right: 20px;
          font-size: 15px;
          color: black;
          height: 25px;
          line-height: 25px;
          overflow: hidden;
        }
        .item_choice {
          width: 25px;
          border: 1px solid transparent;
          border-radius: 50%;
          text-align: center;
          &.active {
            border-color: #987878;
            opacity: 1;
            transition: all 1s ease;
          }
        }
      }
    }
    & > span {
      color: white;
      font-size: 18px;
      display: block;
      margin-bottom: 40px;
    }
    .block {
      margin: 50px 50px;
    }
  }
}
.contain_atmosphere {
  margin: 10px;
  overflow: auto;
  .close {
    width: 100%;
    height: 444px;
    // background-image: url("../.././assets/light.png");
    background-position: center;
    background-size: 150px 150px;
    background-repeat: no-repeat;
    margin: 0 auto;
    text-align: center;
    .icon-chuanglian-,
    .icon-kongqizhiliang {
      text-align: center;
      font-size: 200px;
      color: grey;
    }
  }
  .open {
    text-align: center;
    width: 100%;
    .row {
      margin: 10% 7%;
      & > span {
        display: inline-block;
        margin: 5px 20px;
        border-bottom: 1px solid black;
        & > span {
          color: white;
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-carousel__item {
  &:nth-child(3) {
    .el-progress__text {
      &:after {
        content: "%";
      }
    }
  }
  &:nth-child(4) {
    .el-progress__text {
      &:after {
        content: "°";
      }
    }
  }
}
</style>
