<template>
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
</template>
<style lang='less' scoped>
</style>
<script>
</script>