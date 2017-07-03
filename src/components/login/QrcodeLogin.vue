<template>
  <div>
    <!-- 二维码登录 -->
    <div class="container container2" v-if='switchTab'>
      <!--二维码图片-->
      <div class="twobarcode" id="qrcode">
      </div>
      <img class="expired" src="/static/imgs/expired.png"/>
      <p class="refresh" @click='refresh'>刷新</p>
      <div class="scan">
        <p>打开 <span>心灵伙伴云APP</span></p>
        <p>扫一扫登录</p>
      </div>
      <a class="comeback" href="javascript:;" @click='backToAccountLogin'>返回密码登录</a>
    </div>

    <!-- 扫描成功 -->
    <div class="container container4" v-else>
      <p>扫描成功！</p>
      <img src="/static/imgs/success.png"/>
      <span>请在手机上点击确认登录！</span>
      <a class="comeback" href="index.html">返回密码登录</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'qrcode-login',
    data() {
      return {
        switchTab: true
      }
    },
    created() {
      this.getQrcode()
    },
    methods: {
      backToAccountLogin() {
        console.log('返回账号登录')
        // this.$router.push({name:'account-login'})
        this.$router.replace({name:'account-login'})
      },
      getQrcode() {
        this.$http.post(window.baseUrl + 'passport.qrcode.get',{
          token: window.token,
        },{emulateJSON:true}).then((receiveObj)=>{
          var data = receiveObj.data
          console.log(data);
          if (data.success == true) {
            var qrcode_url = data.qrcode_url;
            // 二维码
            $('#qrcode').empty();
            window.$('#qrcode').qrcode({
              render: "canvas",
              width: 126,
              height: 126,
              text: qrcode_url
            });
            // 查询二维码状态
            this.qrcodeStatus();
          } else if (data.success == false) {
            var obj = data.error.fields;
            for(var key in obj){
              if (key == 'token') {
                window.getToken();
                setTimeout(this.getQrcode, 100);
              };
              if (key == 'middleware.check-login.is-login') {
                window.resetToken();
                setTimeout(this.getQrcode, 100);
              };
              break;
            }
          };
        });
      },
      qrcodeStatus() {
        window.$('.expired,.refresh').removeClass('active');
        this.$http.post(window.baseUrl + 'passport.qrcode.status',{
          token: window.token,
        },{emulateJSON:true}).then((receiveObj)=>{
          var data = receiveObj.data
          console.log(data);
          if (data.success == true) {
            if (data.status == 'WAITING') {
              // 等待扫码
              setTimeout(()=>{
                this.qrcodeStatus();
              }, 5000);
            } else if (data.status == 'SCANED') {
              // 等待确认
              this.switchTab = false
              setTimeout(()=>{
                this.qrcodeStatus();
              }, 5000);
            } else if (data.status == 'SUCCESS') {
              // 手机确认成功,跳转至手机端当前角色
              window.$.cookie('username', data.username, { expires: 30 });
              window.$.cookie('push_key', data.push_key, { expires: 30 });
              window.location.href = data.access + '?exchange_token=' + data.exchange_token;
            } else if (data.status == 'FAILED') {
              // 拒绝 返回二维码登录
              this.switchTab = true
              this.getQrcode();
            } else if (data.status == 'EXPIRED') {
              this.refresh()
            };
          };
        });
      },
      refresh() {
        window.$('.expired,.refresh').addClass('active');
        // window.location.reload();
        router.go(0)
      }
    }
  }
</script>
<style lang='less' scoped>
  @import '../../assets/css/common.less';
  .container2 {
    display:block
  }
  .container4 {
    display:block
  }
</style>

