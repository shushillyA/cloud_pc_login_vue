import Vue from 'vue'
import Router from 'vue-router'
// 登录组件
// 主
import Login from '@/components/Login'
import AccountLogin from '@/components/login/AccountLogin'
import QrcodeLogin from '@/components/login/QrcodeLogin'
// 用户设置组件
// 主
import UserSetting from '@/components/UserSetting'
import FindPassword from '@/components/usersetting/FindPassword'
import ChangePassword from '@/components/usersetting/ChangePassword'

// 绑定组件
import MobileBind from '@/components//bind/MobileBind'
import EmailBind from '@/components/bind/EmailBind'

Vue.use(Router)

// 由于外部有个链接跳转所以要把邮箱和手机绑定做进路由
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login/account-login' // 重定向账号登录路由
      // redirect: '/login' // 重定向账号登录路由
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      children: [
        {
          path: 'account-login',
          name: 'account-login',
          component: AccountLogin
        },
        {
          path: 'qrcode-login',
          name: 'qrcode-login',
          component: QrcodeLogin
        }
      ]
    },
    {
      path: '/user-setting',
      name: 'user-setting',
      component: UserSetting
      // children: [
      //   {
      //     path: 'mobile-bind',
      //     name: 'mobile-bind',
      //     component: MobileBind
      //   },
      //   {
      //     path: 'email-bind',
      //     name: 'email-bind',
      //     component: EmailBind
      //   },
      //   {
      //     path: 'find-password',
      //     name: 'find-password',
      //     component: FindPassword
      //   },
      //   {
      //     path: 'change-password',
      //     name: 'change-password',
      //     component: ChangePassword
      //   }
      // ]
    }
  ]
})
