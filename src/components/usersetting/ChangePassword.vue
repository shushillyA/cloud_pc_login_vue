<template>
  <!-- 改密码 -->
  <div class="container container1">
    <h1>感谢使用心灵伙伴心理云平台</h1>
    <p class="account">当前账户：<span id='account'><!-- 14775869654 --></span></p>
    <p class="kindly_reminder">请设置您的<span>登录密码</span>并牢记!</p>
    <input type="password" placeholder="8~32位字母数字或符号组合，无空格" id="set_password" v-model='pwd'>
    <input type="password" placeholder="请再输入一遍" id="input_again_pwd" v-model='pwdAgain'>
    <p class="msg">{{msg}}</p>
    <a href="javascript:;" class="button" id="confirm_btn1" @click='setSamePassword'>确定</a>
  </div>
</template>
<style lang='less' scoped>
</style>
<script>
  export default {
    data() {
      return {
        msg: '',
        pwd: '',
        pwdAgain: ''
      }
    },
    created() {
      var self = this
      window.$(document).keyup(function(event){
        if(event.keyCode == "13"){
          self.setSamePassword();
        }
      });
    },
    methods: {
      setSamePassword() {
        this.msg = ''
        if (this.pwd == '') {
          this.msg = '密码不能设置为空';
          return false;
        };
        //密码格式校验
        if(this.pwd.length < 8  || this.pwd.length > 32){
          this.msg = '新密码为8~32位字母数字或符号组合，无空格';
          return false;
        }
        var passwordCheck= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\!@#$%^&*()_+-=,.]{8,32}$/;
        if(!passwordCheck.test(this.pwd)){
          this.msg = '新密码为8~32位字母数字或符号组合，无空格';
          return false;
        }
        // 再输入一次
        if (this.pwdAgain == '') {
          this.msg = '请再输入一次';
          return false;
        };
        if (this.pwd != this.pwdAgain) {
          this.msg = '两次密码输入不一致';
          return false;
        };

        // 表单提交
        $.post(
            baseUrl + "passport.invalid.update",
            {
                "token":token,
                "password":set_password
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // ->密码设置成功弹层
                    containterSkip(2);
                    $.cookie('cont_status','pwd_set_success');
                    // ->进入入口
                    $('#enter_btn').click(function(event) {
                        getUsers();
                    });
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    }
                };
            },
        'json');
      }
    }
  }
</script>