<template>
<div style="height:100%;overflow:hidden">
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
  </div>
  <div class="chatRoom" @mouseover="showInput = true" @mouseleave="showInput = false">
    <transition
      name="fade"
     
    >
    <el-input
      placeholder="in this ..."
      v-model="msg"
      clearable
      style="position: fixed;margin:0 0 0 0;width:16%"
      @keyup.native.enter="msgList.unshift({ name: 'shangshang'+new Date().getTime(),
          message: msg,
          src: '../../assets/user.jpg'});msg = ''"
      v-show="showInput"
      @mouseover="showInput = true"
      >
    </el-input>
    </transition>
    <transition
      name="fade"
      enter-active-class="fadeInRight"
      leave-active-class="fadeOutLeft"
    >
      <div >
        <div v-for="item in msgList" :key="item.$index" class="firstLine text item"   >
          <span class="user-img"></span>
          <div style="min-height:80px;display:block;float: left;">
            <span class="userName">{{item.name}}</span>
            <div class="userMsg">
              {{item.message}}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "application/x-mpegURL",
            src: "http://localhost:5200/data/HLS-demo-master/m3u8/index.m3u8" //你的m3u8地址（必填）
          }
        ],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      msg: "",
      msgList: [
        {
          name: "shangshang",
          message: "你好",
          src: "../../assets/user.jpg"
        },
        {
          name: "wangwang",
          message: "你好a",
          src: "../../assets/user.jpg"
        },
        {
          name: "yangyang",
          message: "你好b",
          src: "../../assets/user.jpg"
        }
      ],
      showInput: false
    };
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      this.$message({
        message: "播放",
        type: "success"
      });
    },
    onPlayerPause(player) {
      this.$message({
        message: "暂停",
        type: "success"
      });
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
<style lang="less" scoped>
.chatRoom {
  position: absolute;
  float: right;
  width: 16%;
  height: 80%;
  overflow: auto;
  display: inline-block;
  border: 1px solid #ebeef5;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-left: 15px;
  //transform:translate(0,0);
  &::-webkit-scrollbar {
    display: none;
  }

  .firstLine:nth-child(1) {
    padding-top: 45px !important;
  }
}

.user-img {
  background-image: url("../../assets/user.jpg");
  display: block;
  height: 35px;
  width: 35px;
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  border-radius: 50%;
  float: left;
  clear: both;
}
.userName {
  font-size: 10px;
  display: block;
  height: 20px;
  max-width: 150px;
}
.userMsg {
  display: block;
  min-height: 20px;
  max-height: 500px;
  width: 200px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  margin: 3px 0 0 3px;
  padding: 5px;
  font-size: 13px;
  text-align: center;
}
</style> 


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.container {
  background-color: #efefef;
  width: 80%;
  display: inline-block;
}
.text {
  &.item {
    display: block;
    font-size: 15px;
    margin-bottom: 8px;

    //line-height: 80px;
    margin-left: 5px;
    clear: both;
    float: left;
  }
}
</style>