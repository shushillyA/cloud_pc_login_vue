<template>
  <!-- 账号登录 -->
  <div class="container container1">
    <!-- 错误提示小弹层 -->
    <i></i>
    <input
      type="text"
      id="username"
      placeholder="请输入用户名"
      value=""
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
      />
      <div id="softkey3"></div>
      <div class="code">
        <img src="" id="captcha_img"/>
      </div>
    </div>
    <a href="javascript:;" class="button login_btn" id="login_btn1">登录</a>
    <div class="other">
      <a class="other_login" href="javascript:;">二维码登录</a>
      <a class="forget" href="javascript:;">忘记密码？</a>
    </div>
    <!-- 学籍号入口 -->
    <a href="javascript:;" class="student_code"></a>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
  @import '../../assets/css/common.less';
</style>
