<template>
	<div class='wrapper'>
		<div class='sidebar'>
			<div class='second_bg'></div>
			<div class='copyright'>
				© 2014-2017&nbsp;&nbsp;
				<a class="company" href="http://www.xlhbly.com/" target="_blank">上海心灵伙伴览育信息技术有限公司</a>&nbsp;&nbsp;
				<a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备13015608号-2&nbsp;&nbsp; </a>
				<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010702001225" target="_blank">沪公网安备 31010702001225号</a>
			</div>
		</div>
		<div class="content">
			<h1>心灵伙伴心理云平台</h1>
			<router-view></router-view>	
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
  export default {
    name: 'login'
    // components:[]
  }
</script> 

