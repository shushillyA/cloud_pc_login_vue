<template>
  <div>
    <!-- 1.输入账号 -->
    <div class="container container7" v-if='type==1'>
      <h1>找回密码</h1>
      <input type="text" placeholder="请输入绑定的手机号码或邮箱" id="user_bind" v-model='bind'>
      <p class="msg">{{msg}}</p>
      <a href="javascript:;" class="button next_step" id="next_step1" @click='checkUserBind'>下一步</a>
      <a href="javascript:;" class="goback" @click='goBack'>返回上一页</a>
    </div>

    <!-- 2.1填写验证码 -->
    <div class="container container8" v-else-if='type==2'>
      <h1>填写验证码</h1>
      <p>已发送到手机： <span id="bind_phone">{{bind}}</span></p>
      <input type="text" placeholder="输入验证码" id="code" v-model='code' onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="6">
      <span class="wait" v-if='timerShow'>再次发送（<i>{{time}}</i>）</span>
      <span class="send_again" v-else @click='smsSendForFind'>再次发送</span>
      <p class="msg">{{msg}}</p>
      <a href="javascript:;" class="button" id="next_step2" @click="verifyCode">下一步</a>
      <a href="javascript:;" class="goback">返回上一步</a>
    </div>

    <!-- 2.2邮件找密码 -->
    <div class="container container13" v-else-if='type==3'>
      <h1>找回密码</h1>
      <p class="sended">已发送邮件至：<span id="address">{{bind}}</span></p>
      <p class="second">请尽快登录您的邮箱根据提示修改密码。</p>
    </div>

    <!--3.设置新密码-->
    <div class="container container9" v-else-if='type==4'>
      <h1>设置新密码</h1>
      <p>您的用户名： <span id="name">{{bind}}</span></p>
      <input type="text" placeholder="请输入您的真实姓名" id="realname" v-model='realName'>
      <input type="password" placeholder="请设置新密码" id="reset_pwd" v-model='pwd'>
      <input type="password" placeholder="请再次输入密码" id="input_again" v-model='pwdAgain'>
      <p class="msg">{{msg}}</p>
      <a href="javascript:;" class="button" id="next_step3" @click='resetPassword'>下一步</a>
      <!-- 弹出层 -->
      <div class="popup" v-if='popShow'>
        <div class="pop_content">
          <h2>重置密码成功！</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' scoped>
  @import '../../assets/css/usersetting.less';
  #container7 {
    display: block !important;
  }
</style>
<script>
  export default {
    data (){
      return {
        bind: '',
        msg: '',
        time: 60,
        timerShow: true,
        type: 1,
        code:'',
        realName: '',
        pwd: '',
        pwdAgain: '',
        popShow: false
        // msg1: '',
        // msg2: ''
      }
    },
    created() {
      var self = this
      $(document).keyup(function(event){
        if(event.keyCode == "13"){
          console.log('enter')
          console.log(self.type)
          switch (self.type) {
            case 1:
              self.checkUserBind();
              break;
            case 2:
              self.verifyCode();
              break; 
            case 3:
              break;
            case 4:
              self.resetPassword();
              break;
          }
        }
      });
    },
    mounted() {

    },
    updated() {
      // this.msg = ''
    },
    methods: {
      goBack() {
        this.$router.replace({name: 'account-login'});
      },
      // nextStep() {
      //   this.checkUserBind()
      // },
      // 判断邮箱/手机号
      checkUserBind() {
        console.log('验证手机号 邮箱号')
        if(this.bind == '') {
          this.msg = '请输入绑定的手机号码或邮箱';
          console.log(this.msg)
          return false
        }
        window.$.cookie('user_bind', this.bind.trim())
        this.bind = window.$.cookie('user_bind')
        // 校验
        var mobileCheck = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var emailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (mobileCheck.test(this.bind)) {
          this.$http.post(window.baseUrl + "passport.sms.send",{
            "token":window.token,
            'mobile': this.bind,
            'type': 'RESET_PASSWORD'
          },{emulateJSON:true}).then((receiveObj)=>{
            var data = receiveObj.data
            console.log(data);
            if (data.success == true) {
              // 填写验证码
              // containterSkip(8);
              this.type = 2
              this.msg = ''
              // 倒计时
              this.time = 60;
              var timer;
              timer = setInterval(function(){
                this.time = this.time - 1;
                if (this.time <= 0) {
                  clearInterval(timer);
                  this.timerShow = false
                };
              }, 1000);
            } else if (data.success == false) {
              var obj = data.error.fields;
              if (obj) {
                for(var key in obj){
                  console.log(obj[key]);
                  this.msg = obj[key];
                  if (key == 'token') {
                    this.msg = '';
                    window.getToken();
                    setTimeout(this.checkUserBind, 100);
                  };
                  break;
                }
              } else {
                this.msg = data.error.message;
              }
            };
          });
        } else if (emailCheck.test(this.bind)) {
          // 邮箱
          this.$http.post(window.baseUrl + "passport.email.send",{
            "token":window.token,
            'email': this.bind,
            'type': 'RESET_PASSWORD'
          },{emulateJSON:true}).then((receiveObj)=>{
            var data = receiveObj.data
            console.log(data);
            if (data.success == true) {
              // ->已发送
              this.type = 3
              this.msg = ''
            } else if (data.success == false) {
              var obj = data.error.fields;
              if (obj) {
                for(var key in obj){
                  console.log(obj[key]);
                  this.msg = obj[key];
                  if (key == 'token') {
                    this.msg = '';
                    window.getToken();
                    setTimeout(this.checkUserBind, 100);
                  };
                  break;
                }
              } else {
                this.msg = data.error.message;
              }
            };
          });
        } else {
          this.msg = '输入的不是正确的邮箱或手机号码';
        };
      },
      // 再次发送
      smsSendForFind() {
        this.msg = ''
        this.$http.post(window.baseUrl + "passport.sms.send",{
          "token":window.token,
          'mobile': this.bind,
          'type': 'RESET_PASSWORD'
        },{emulateJSON:true}).then((receiveObj)=>{
          var data = receiveObj.data
          console.log(data);
          if (data.success == true) {
            this.timerShow = true
            // 倒计时
            this.time = 60;
            var timer;
            timer = setInterval(function(){
              this.time = this.time - 1;
              if (this.time <= 0) {
                clearInterval(timer);
                this.timerShow = false
              };
            }, 1000);
          } else if (data.success == false) {
            var obj = data.error.fields;
            if (obj) {
              for(var key in obj){
                console.log(obj[key]);
                this.msg = obj[key];
                if (key == 'token') {
                  window.getToken();
                };
                break;
              }
            } else {
              this.msg = data.error.message;
            }
          };
        });
      },
      verifyCode() {
        this.msg = '';
        if (this.code == '') {
          this.msg = '请输入验证码'
          return false
        }
        this.$http.post(window.baseUrl + "passport.verify.code",{
          "token":window.token,
          'contact': this.bind,
          'type': 'RESET_PASSWORD',
          'code': this.code
        },{emulateJSON:true}).then((receiveObj)=>{
          var data = receiveObj.data
          console.log(data);
          if (data.success == true) {
            // 设置新密码
            // containterSkip(9);
            this.type = 4
            this.msg = ''
          } else if (data.success == false) {
            var obj = data.error.fields;
            if (obj) {
              for(var key in obj){
                console.log(obj[key]);
                this.msg = obj[key];
                if (key == 'token') {
                  window.getToken();
                };
                break;
              }
            } else {
              this.msg = data.error.message;
            }
          };
        });
      },
      resetPassword() {
        this.msg = ''
        if (this.realName == '') {
          this.msg = '请输入您的真实姓名'
          return false
        }
        if (this.pwd == '') {
          this.msg = '请设置新密码'
          return false
        }
        if (this.pwd.length < 8 || this.pwd.length > 32) {
          this.msg = '新密码为8~32位字母数字或符号组合，无空格'
          return false
        }
        var passwordCheck= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\!@#$%^&*()_+-=,.]{8,32}$/;
        if(!passwordCheck.test(this.pwd)){
          this.msg = '新密码为8~32位字母数字或符号组合，无空格';
          return false;
        }
        // 再输入一次
        if (this.pwdAgain == '') {
          this.msg = '请再次输入密码';
          return false;
        };
        if (this.pwd != this.pwdAgain) {
          this.msg = '两次密码输入不一致';
          return false;
        };
        this.$http.post(window.baseUrl + "passport.password.reset",{
          "token":window.token,
          "realname": this.realName,
          "password": this.pwd
        },{emulateJSON:true}).then((receiveObj)=>{
          var data = receiveObj.data
          console.log(data);
          if (data.success == true) {
            // 成功弹框
            $('.container9 .popup').show();
            this.popShow = true
            setTimeout(function(){
              // 入口选择
              // getUsers();
            }, 3000);
          } else if (data.success == false) {
            var obj = data.error.fields;
            if (obj) {
              for(var key in obj){
                console.log(obj[key]);
                this.msg = obj[key];
                if (key == 'token') {
                  window.getToken();
                };
                if (key == 'timeout' && cont_status == 'find_pwd') { //过期重新请求
                  setTimeout(function(){
                    window.location.reload();
                  }, 2000);
                };
                break;
              }
            } else {
              this.msg = data.error.message;
            };
          };
        })
      }
    }
  }
</script>