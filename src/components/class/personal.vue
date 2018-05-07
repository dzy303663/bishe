<template>
  <div class="content_wrap">
      <div class="card">
          <div class="left">
            <h1 class="tltle">信息修改</h1>
            <p>完善登录信息，修改昵称，修改密码</p>
          </div>
          <div class="right">
              <el-button type="primary" @click="one=true;" v-if="!one">信息修改</el-button>
              <transition
                name="fade"
                enter-active-class="fadeInDown"
                leave-active-class="fadeOutUp"
               >
              <el-form  label-width="80px" :model="personal" v-if="one">
                <el-form-item label="用户昵称">
                    <el-input v-model="personal.name" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item label="手机号码">
                    <el-input v-model="personal.call" placeholder="联系电话"></el-input>
                </el-form-item>
                <el-form-item label="设置密码">
                    <el-input v-model="personal.pw" placeholder="设置新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input v-model="personal.pw1" placeholder="再次输入新密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updatePerson()">确定</el-button>
                    <el-button @click="one=false;">取消</el-button>
                </el-form-item>
                </el-form>
              </transition>
          </div>
      </div>
      <div class="card">
          <div class="left">
            <h1 class="tltle">你的头像</h1>
            <p>选择一张个人正面照片作为头像， 让其他成员更容易认识你。</p>
          </div>
          <div class="right">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-success="uploadImg">
                <div class="user_img" ></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
              </el-upload>
              
          </div>
      </div>
      <div class="card">
          <div class="left">
            <h1 class="tltle">基本资料</h1>
            <p>展示个人的基本资料。</p>
          </div>
          <div class="right">
              <!-- <el-button type="primary" >信息修改</el-button> -->
              <transition
                name="fade"
                enter-active-class="fadeInDown"
                leave-active-class="fadeOutUp"
               >
              <el-form  label-width="80px" >
                <el-form-item label="姓名" class="mar-top">
                    <span>{{personal.name}}</span>
                </el-form-item>
                <el-form-item label="性别">
                    <span>{{personal.sex}}</span>
                </el-form-item>
                <el-form-item label="角色">
                    <span>{{personal.role}}</span>
                </el-form-item>
                <el-form-item label="学校">
                    <span>{{personal.school}}</span>
                </el-form-item>
                <el-form-item label="班级">
                    <span>{{personal.class}}</span>
                </el-form-item>
                <el-form-item label="自我介绍">
                    <span>{{personal.introduce}}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">修改资料</el-button>
                </el-form-item>
                </el-form>
              </transition>
          </div>
      </div>
      <el-dialog  :visible.sync="dialogFormVisible" width="35%">
          <div class="el-dialog__header hide">
              <span class="el-dialog__title">资料修改</span>
              <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                  <i class="el-dialog__close el-icon el-icon-close"></i>
              </button>
          </div>
        <el-form :model="form">
            <el-form-item label="个人介绍">
                    <!-- <el-input v-model="formLabelAlign.name"
                    type="textarea"
                    :rows="5"
                    placeholder="请写一段话让别人了解自己"
                    class="dialog__area"
                     >
                    </el-input> -->
                    <textarea  class="dialog__area"  rows="10" placeholder="请写一段话让别人了解自己"></textarea>
            </el-form-item>
        </el-form>
        <div class="dialog__footer" >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible=false">确定</el-button> 
        </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: false,//第一行，登录信息
      account: localStorage.getItem('account'),
      personal: {
        name: "",
        call: "",
        pw: "",
        pw1: "",
        introduce: "",
        role: "",
        school: ""
      },
      dialogFormVisible: false,
       form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: "",
    };
  },
  mounted:function () {
      this.getData();
  } ,
  methods:{
      uploadImg(){
          console.log("成功上传")
      },
      getData: function () {
          var url = "http://localhost:5200/personal";
          this.$http({
              method: 'get',
              url: url,
              params: {
                  account: this.account
              }
          }).then(res=>{
              console.log(res)
              this.personal.name = res.data.name;
              this.personal.pw = res.data.pw;
              this.personal.introduce = res.data.introduce;
              this.personal.role = res.data.role;
              this.personal.school = res.data.school;
              this.personal.sex = res.data.sex;
              this.personal.class = res.data.class;
              this.personal.call = res.data.phone;

          })
      },
      updatePerson: function () {
          //判断是否完整填写信息
          if(!this.personal.name||!this.personal.call||!this.personal.pw||!this.personal.pw1){
              this.$message({
                  showClose: true,
                  message: "请完整填写信息",
                  type: "warning"
              });
              return;
          }else{
              //判断密码是否一致
              if(this.personal.pw!=this.personal.pw1){
                   this.$message({
                        showClose: true,
                        message: "两次密码填写不一致，请重新填写",
                        type: "warning"
                    });
                    return;
              }
          }
          var url = "http://localhost:5200/personal/update";
          this.$http({
              method: 'post',
              url: url,
              params: {
                  account: this.account,
                  name: this.personal.name,
                  phone: this.personal.call,
                  pw: this.personal.pw
              }
          }).then(res=>{
              this.$message({
                    showClose: true,
                    message: "修改成功",
                    type: "success"
                });
                return;
          })
      }
  }
};
</script>
<style lang="less" scoped>
h1 {
  font-size: 16px;
  margin-bottom: 15px !important;
  color: #333;
  font-weight: 500;
}
p {
  font-size: 14px;
  color: #777;
}
.el-form-item{
     font-weight: 500;
    &.mar-top{
        margin-top: -9px;
    }
    span{
         font-weight: 500;
         margin-left: 30px;
    }
  
}

.content_wrap {
  padding: 20px;
  overflow-x: hidden;
}
.card {
  margin-top: 20px;
  padding: 0 0 20px;
  border-bottom: solid 1px #f4f4f4;
  overflow: hidden;
  .left {
    float: left;
    width: 200px;
    margin: 0 20px 20px 12px;
    h1,
    p {
      margin: 0;
      padding: 0;
      font-family: "microsoft yahei" !important;
    }
  }
  .right {
    min-width: 100px;
    max-width: 400px;
    overflow: hidden;
    margin: 0;
    .user_img {
    background-image: url("../.././assets/user.jpg");
    background-size: contain;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    cursor: pointer;
    }
  }
}
.el-dialog__header{
    color: white;
}
.dialog__footer{
    text-align: right;
}
.dialog__area{
    background-color: transparent !important;
    color: white;
    display: block;
    border-radius: 10px;
    color: white;
    width: 100%;
}

</style>
