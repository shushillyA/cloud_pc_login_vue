<template>
  <!-- 账号登录 -->
  <div class="container container1" :class='activeClass'>
    <!-- 错误提示小弹层 -->
    <i v-if='show'>{{message}}</i>
    <i class='message'>{{message}}</i>
    <input
      type="text"
      id="username"
      placeholder="请输入用户名"
      value="" 
      v-model='username'
    />
    <!--<input
      type="text"
      id="username"
      placeholder="请输入用户名"
      value=""
      onfocus='keyboardNo1();'
                  onBlur="VirtualKeyboard.toggle('username','softkey');"
    />-->
    <div id="softkey"></div>
    <!--<input
      type="password"
      id="password"
      placeholder="请输入密码"
      value=""
      onfocus='keyboardNo2();'
                  onBlur="VirtualKeyboard.toggle('password','softkey2');"
    />-->
    <input
      type="password"
      id="password"
      placeholder="请输入密码"
      value=""
      v-model='password'
    />
    <div id="softkey2"></div>
    <div id="captcha_code">
      <!--<input
        type="text"
        id="captcha"
        placeholder="请输入验证码"
        onfocus='keyboardNo3();'
                    onBlur="VirtualKeyboard.toggle('captcha','softkey3');"
      />-->
      <input
        type="text"
        id="captcha"
        placeholder="请输入验证码"
        v-model='captcha'
      />
      <div id="softkey3"></div>
      <div class="code">
        <img src="" id="captcha_img"/>
      </div>
    </div>
    <a href="javascript:;" class="button login_btn" id="login_btn1" @keyup.enter='enter' @click='loginFormCommit'>登录</a>
    <div class="other">
      <a class="other_login" href="javascript:;" @click='qrCode'>二维码登录</a>
      <a class="forget" href="javascript:;">忘记密码？</a>
    </div>
    <!-- 学籍号入口 -->
    <a href="javascript:;" class="student_code"></a>
  </div>
</template>
<script>
// import functions from '../../../static/js/jquery.cookie.js'
// import jquery from 'jquery'
// import jquery from 'jquery'
export default {
  name: 'accountlogin',
  data () {
    return {
      username: '',
      password: '',
      captcha: '',
      message: '',
      show: false,
      channel: null,
      activeClass: '',
      wrongNum: 0
    }
  },
  created () {
    // 参数channel不为空显示
    this.channel = GetQueryString('channel');
    if (this.channel != null && this.channel.toString().length>0) {
        this.activeClass = 'active'
    };
  },
  mounted () {
  },
  updated () {
  },
  methods: {
    enter(ev) {
      console.log('enter')
      if(ev.keyCode == 13) {
        console.log('按了enter')
        this.loginFormCommit()
      }
    },
    // 表单提交处理
    loginFormCommit () {
      // 表单验证
      if (this.username === '') {
        this.show = true
        this.message = '请输入用户名'
        return false
      }
      if (this.password === '') {
        this.show = true
        this.message = '请输入密码'
        return false
      }
      // 登录判断处理
      this.$http.post(window.baseUrl + "passport.login",{
        "token":window.token,
        "account":this.username,
        "password":this.password,
        "captcha":this.captcha
      },{emulateJSON:true}).then((receiveObj)=>{
        console.log(receiveObj)
        let data = receiveObj.data
        if(data.success == true) {
          console.log('登录成功')
          this.getUsers()
        } else if (data.success == false) {
          ++this.wrongNum
          this.show = true
          let obj = data.error.fields;
          if (obj) {
            if (obj.password && obj.username) {
                window.$.cookie('change',2);
                window.$.cookie('curAccount',username);
            } else{
                window.$.cookie('change',1);
            };
            for(var key in obj){
                console.log(obj[key]);
                this.message = obj[key];
                if (key == 'token') {
                    this.show = false;
                    window.getToken();
                    setTimeout(this.loginFormCommit, 100);
                };
                if (key == 'username') {
                    this.show = false;
                    // window.location.href='set.html';
                    window.$.cookie('cont_status','username');
                };
                if (key == 'password') {
                    this.show = false;
                    window.$.cookie('curAccount',username);
                    // window.location.href='set.html';
                    window.$.cookie('cont_status','password');
                };
                if (key == 'middleware.check-login.is-login') {
                    this.show = false;
                    window.resetToken();
                    setTimeout(this.loginFormCommit, 100);
                };
                break;
            }
          } else {
            message = 'data.error.message';
          }
          if (this.wrongNum > 2 || data.error.fields.captcha) {
            this.getCaptcha()
          }
        }
      })
    },
    getCaptcha (){
      this.$http.post(baseUrl + 'captcha.get',{
        token: window.token,
        size: '160x40'
      },{emulateJSON:true}).then((receiveObj => {
        let data = receiveObj.data
        if (data.success == true) {
          this.show = true;
          $('#captcha_img').attr('src', data.image);
        } else if (data.error.fields.token) {
          window.getToken();
        };
      }))
    },
    getUsers (){
      this.$http.post(window.baseUrl + 'passport.users.get',{
        token: window.token
      },{emulateJSON:true}).then((obj)=>{
        console.log(obj)
        let data = obj.data
        if (data.success == true) {
          console.log('获取用户成功')
          localStorage.setItem('roles',JSON.stringify(data.roles));
          window.$.cookie('index',data.index);
          if (this.captcha) {
            this.captcha = ''
          }
          if (data.roles.length > 1) {
            this.$router.push({name: MobileBind});  //有问题
            $.cookie('cont_status','roles');
          } else {
            this.userLogin(0);
          }
        }
      })
    },
    userLogin (index) {
      this.$http.post(window.baseUrl + 'passport.user.login',{
        token: window.token,
        index: index
      },{emulateJSON:true}).then((obj)=>{
        console.log(obj)
        let data = obj.data
        if(data.success == true) {
          console.log('用户登录成功')
          var href = data.access + '?exchange_token=' + data.exchange_token + '&href=' + window.location.href;
          if (this.channel) {
              href += '&channel=' + this.channel
          }
          console.log(href, '地址')
          window.location.href = href
        }
      })
    },
    qrCode () {
      this.$router.push({name:'qrcode-login'})
    }
  }
}
</script>
<style lang='less' scoped>
  @import '../../assets/css/common.less';
</style>
