<template>
  <div class="wrapper">
    <component v-bind:is='currentView'></component>
  </div>
</template>
<style lang='less' scoped>
  @import '../assets/css/usersetting.less';
</style>
<script>
  import FindPassword from './usersetting/FindPassword'
  import Entrance from './usersetting/Entrance'
  import ChangePassword from './usersetting/ChangePassword'
  import ChangeUsername from './usersetting/ChangeUsername'
  export default {
    data () {
      return {
        currentView: null   // 动态组件
      }
    },
    created() {
      var cont_status = window.$.cookie('cont_status');
      console.log('cont_status = ' + cont_status);
        if (cont_status == 'find_pwd') {//找回密码
            this.currentView = FindPassword
        } else if (cont_status == 'roles') {//入口
            this.currentView = Entrance
            getRolesData();
        } else if (cont_status == 'username') {//改用户名
            this.currentView = ChangeUsername
        } else if (cont_status == 'password') {//统一密码
            this.currentView = ChangePassword
            curAccount();
        } else if (cont_status == 'pwd_set_success') {//改密码成功
            containterSkip(2);
        } else if (cont_status == 'reset_pwd') {
            containterSkip(9);
            $('#name').text($.cookie('email_add'));
        } else if (cont_status == undefined) {
            // window.location.href = 'index.html'
            this.$route.replace({name:'account-login'})
        }
    }
  }
</script>
