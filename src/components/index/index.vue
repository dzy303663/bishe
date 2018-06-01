<template>
  <div class="index">
    <transition
      name="slide"
      enter-active-class="slideInDown"
      leave-active-class="slideOutUp"
      @after-leave="showWelcome"
    >
     <div class="title" v-if="title_state">
         <div class="content_wrap">
             <img src="../.././assets/glasses.png" alt="">
             <div class="name">INTELIGENT CLASS</div>
             <div class="tips">AR · SMART · CLASSROOM</div>
         </div>
         <router-link to="/User/student/1">→</router-link>
     </div>
     
    </transition>
    <!-- 登录成功页面 -->
     <!-- <transition
      name="slide"
      enter-active-class="slideInRight"
      leave-active-class="slideOutLeft"
    >
     <div class="title welcome" v-if="welcome_state" >
         <div class="content_wrap">
             
         </div>
     </div>
    </transition> -->
    <transition
      name="slide"
      enter-active-class="slideInRight"
      leave-active-class="slideOutLeft"
    >
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </transition>
     <div class="item_wrap" ondragstart="return false;">
         <div class="item classing pulse" @click="goToItem('classing')"></div>
         <div class="item detail pulse" @click="goToItem('detail')"></div>
         <div class="item control pulse" @click="goToItem('control')"></div>
     </div>
     <el-dialog
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="handleClose"
        style="
        opacity: 0.8;
        "
        >
        <el-tabs v-model="role" @tab-click="handleClick">
          <el-tab-pane label="学生" name="student" >学生</el-tab-pane>
          <el-tab-pane label="教师" name="teacher">教师</el-tab-pane>
        </el-tabs> 
        <div class="demo-input-suffix" style="margin: 10px 0 30px 0;border-radius: 10px;color: white !important">
          用户名：
          <el-input
            placeholder="请输入用户名"
            v-model="user"
            style="width: 250px;"
            >
             <i slot="suffix" class="el-input__icon"><img src="../.././assets/pw.png" alt=""></i>
          </el-input>
         
        </div>
        <div class="demo-input-suffix " style="color: white !important">
          密&nbsp&nbsp 码：
          <el-input
            placeholder="请输入密码"
            v-model="pw"
            style="width: 250px;"
            type="password"
            >
            <i slot="suffix" class="el-input__icon"><img src="../.././assets/user.png" alt=""></i>
          </el-input>
          
        </div>
        
        <span slot="footer" class="dialog-footer" style="margin: 0 auto;">
          <el-button @click="dialogVisible = false;pw='';"  round style="background:transparent;border-color:transparent;margin-right:20px;">取 消</el-button>
          <el-button type="primary" @click="submit"  round style="background:transparent;border-color:transparent;">登 录</el-button>
        </span>
      </el-dialog>
  </div>
  
</template> 
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      title_state: true,
      dialogVisible: false,
      role: "student",
      user: "",
      pw: ""
    };
  },
  created:function(){
    console.log(localStorage.getItem('account'));
    this.user=localStorage.getItem('account');
    this.pw=localStorage.getItem('pw');
  },
  watch: {
    $route() {
      console.log(this.$route.path);
      if (this.$route.path == "/") {
        this.title_state = true;
      } else {
        this.title_state = false;
      }
    }
  },
  methods: {
    //弹框关闭事件
    handleClose(done) {
      done();
      this.pw = "";
    },
    //tab切换
    handleClick(tab, event) {
      console.log(tab.label);
      console.log(this.role);
    },
    //登录按钮事件
    submit() {
      //验证表单是否填写完整
      if (this.user == "" || this.pw == "") {
        this.$message({
          message: "请完整填写用户名和密码",
          type: "warning"
        });
        return;
      }

      //存储用户登录信息
      localStorage.setItem('account',this.user);
      localStorage.setItem('pw',this.pw);

      //登录url
      var url = "http://localhost:5200/login";


this.loginState();
 this.title_state = false;
            this.$router.push("/LoginIndex");
            this.dialogVisible = false;

      //登录验证
      this.$http({
        method: "post",
        url: url,
        params: {
          account: this.user,
          pwd: this.pw,
          role: this.role
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.state == "success") {
            
            //密码正确
            this.$message({
              message: "登录成功",
              type: "success"
            });
            //改变vuex登录状态
            this.loginState();
            //记录登陆人信息
            this.$store.state.userName = this.user;
            this.$store.state.name = res.data.name;
            //title隐藏
            this.title_state = false;

            this.$router.push("/LoginIndex");
            this.dialogVisible = false;
          } else {
            this.$message({
              //密码错误
              showClose: true,
              message: "密码错误，请重新输入",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message({
            showClose: true,
            message: "密码错误，请重新输入",
            type: "error"
          });
        });
    },
    //显示登录成功界面
    showWelcome() {
      this.welcome_state = true;
      this.$router.push("/LoginIndex");
    },
    //goToItem
    goToItem(item) {
      if(!this.$store.state.login_state){
        this.dialogVisible = true;
        console.log("item:", item);
      }else{
        this.$router.push("/User/student/1/classing");
      }
    },
    ...mapActions(["loginState"])
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  user-select: none;
  text-align: center;
}
.title {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("../.././assets/bg_index.jpg");
  background-size: cover;
  width: 100%;
  height: 70%;
  text-align: center;
  color: white;
  &.welcome {
    background-image: url("../.././assets/welcome_bg.jpg");
  }
  .content_wrap {
    position: relative;
    width: 50%;
    height: 70%;
    margin: 0 auto;
    margin-top: 7%;
    .name {
      margin: 0 auto;
      width: 65%;
      font-size: 50px;
      border: 4px solid white;
      padding: 10px;
    }
    .tips {
      font-size: 20px;
      margin-top: 15px;
      text-decoration: underline;
    }
  }
}
.item_wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30%;
  text-align: center;
  overflow: hidden;
  .item {
    position: relative;
    height: 175px;
    width: 175px;
    border-radius: 50%;
    border: 10px solid #a2dcdf;
    display: inline-block;
    margin: 10px 40px;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
    cursor: pointer;
    &.classing {
      background-image: url("../.././assets/classing.png");
    }
    &.detail {
      background-image: url("../.././assets/detail.png");
    }
    &.control {
      background-image: url("../.././assets/control.png");
    }
  }
}
</style> 
   