<template>
	<div class='wrapper'>
		<div class='sidebar'>
			<div class='second_bg'></div>
			<div class='copyright' v-if='!guiyang'>
				© 2014-2017&nbsp;&nbsp;
				<a class="company" href="http://www.xlhbly.com/" target="_blank">上海心灵伙伴览育信息技术有限公司</a>&nbsp;&nbsp;
				<a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备13015608号-2&nbsp;&nbsp; </a>
				<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702001225" target="_blank">沪公网安备 31010702001225号</a>
			</div>
			<div class='copyright' v-else>贵阳市教育局&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a class="company" href="http://www.xlhbly.com/" target="_blank">上海心灵伙伴览育信息技术有限公司</a>&nbsp;&nbsp;</div>
		</div>
		<div class="content">
			<h1 v-bind:class='{guiyang: guiyang}'>心灵伙伴心理云平台</h1>
			<router-view></router-view>
			<!--<component v-bind:is='currentView'></component>-->
		</div>
	</div>
</template>

<style lang='less' scoped>
	#app {
		height: 100%;
	}
  @import '../assets/css/common.less';
</style>
<script>
// import AccountLogin from './login/AccountLogin';
// import QrcodeLogin from './login/QrcodeLogin';
export default {
  name: 'login',
  data () {
    return {
			// currentView: AccountLogin   // 动态组件
			guiyang: false
		}
  },
  created () {
		// 更改贵阳样式
		if(/guiyang\./.test(window.location.href)) {
			document.cookie="region=guiyang";
			this.guiyang = true
  	}
	},
  mounted () {},
  updated () {},
  methods: {}
}
</script> 

