<template>
  <div>
    <!-- 二维码登录 -->
    <div class="container container2">
      <div class="twobarcode" id="qrcode">
      </div>
      <img class="expired" src="/static/imgs/expired.png"/>
      <p class="refresh">刷新</p>
      <div class="scan">
        <p>打开 <span>心灵伙伴云APP</span></p>
        <p>扫一扫登录</p>
      </div>
      <a class="comeback" href="javascript:;">返回密码登录</a>
    </div>

    <!-- 扫描成功 -->
    <div class="container container4">
      <p>扫描成功！</p>
      <img src="/static/imgs/success.png"/>
      <span>请在手机上点击确认登录！</span>
      <a class="comeback" href="index.html">返回密码登录</a>
    </div>
  </div>
</template>
<script>
</script>
<style lang='less' scoped>
  @import '../../assets/css/common.less';
</style>

