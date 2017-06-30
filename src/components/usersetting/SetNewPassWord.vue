<template>
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
</template>
<style lang='less' scoped>
  @import '../../assets/css/usersetting.less'
</style>
<script>
</script>