<template>
  <div class="wrapper">
    <!-- 改密码 -->
    <div class="container container1">
      <h1>感谢使用心灵伙伴心理云平台</h1>
      <p class="account">当前账户：<span id='account'><!-- 14775869654 --></span></p>
      <p class="kindly_reminder">请设置您的<span>登录密码</span>并牢记!</p>
      <input type="password" placeholder="8~32位字母数字或符号组合，无空格" id="set_password">
    <input type="password" placeholder="请再输入一遍" id="input_again_pwd">
            <p class="msg"></p>
    <a href="javascript:;" class="button" id="confirm_btn1">确定</a>
    </div>
			
    <!-- 密码设置成功 -->
    <div class="container container2">
      <h1>恭喜！密码设置成功！</h1>
      <p>该手机已绑定多个系统账号，请根据提示选择登录入口！</p>
      <a href="javascript:;" class="button" id="enter_btn">我知道了，进入云平台</a>
    </div>

    <!-- 云平台入口 -->
    <div class="container container3">
      <h1>请选择您要访问的云平台入口</h1>
      <ul id="roles">
        
      </ul>
    </div>

    <!-- 强制修改用户名 -->
    <div class="container container4">
        <h1>感谢使用心灵伙伴心理云平台</h1>
        <p class="reset">安全系统已升级，请重新设置您的用户名</p>
        <input type="text" placeholder="5~25位字母数字或下划线，不支持纯数字" id="username">
        <p class="msg"></p>
        <a href="javascript:;" class="button" id="confirm_btn2">确定</a>
    </div>

    <!-- 找回密码 -->
    <div class="container container7">
        <h1>找回密码</h1>
        <input type="text" placeholder="请输入绑定的手机号码或邮箱" id="user_bind">
        <p class="msg"></p>
        <a href="javascript:;" class="button next_step" id="next_step1">下一步</a>
        <a href="javascript:;" class="goback">返回上一页</a>
    </div>

    <!-- 填写验证码 -->
    <div class="container container8">
        <h1>填写验证码</h1>
        <p>已发送到手机： <span id="bind_phone"><!-- 1397586955 --></span></p>
        <input type="text" placeholder="输入验证码" id="code" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="6">
        <span class="wait">再次发送（<i>60</i>）</span>
        <span class="send_again">再次发送</span>
        <p class="msg"></p>
        <a href="javascript:;" class="button" id="next_step2">下一步</a>
        <a href="javascript:;" class="goback">返回上一步</a>
    </div>

    <!-- 设置新密码 -->
    <div class="container container9">
        <h1>设置新密码</h1>
        <p>您的用户名： <span id="name"><!-- Erguotou1116 --></span></p>
        <input type="text" placeholder="请输入您的真实姓名" id="realname">
        <input type="password" placeholder="请设置新密码" id="reset_pwd">
        <input type="password" placeholder="请再次输入密码" id="input_again">
        <p class="msg"></p>
        <a href="javascript:;" class="button" id="next_step3">下一步</a>
        <!-- 弹出层 -->
        <div class="popup">
            <div class="pop_content">
                <h2>重置密码成功！</h2>
            </div>
        </div>
    </div>

    <!-- 邮件找密码 -->
    <div class="container container13">
        <h1>找回密码</h1>
        <p class="sended">已发送邮件至：<span id="address"><!-- 123@qq.com --></span></p>
        <p class="second">请尽快登录您的邮箱根据提示修改密码。</p>
    </div>

  </div>
</template>
<style lang='less' scoped>
  @import '../assets/css/usersetting.less';
</style>
<script>
</script>
