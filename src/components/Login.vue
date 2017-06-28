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

				<!-- 上次登录账号 -->
				<div class="container container3">
				<p>上次登录账号：<br><span id="last_account"><!-- 13761011111 --></span></p>
				<a href="javascript:;" class="button confirm_btn" id="confirm_btn">确认</a>
				<a class="comeback" id="back" href="index.html">返回密码登录</a>
			</div>

			<!-- 扫描成功 -->
			<div class="container container4">
				<p>扫描成功！</p>
				<img src="/static/imgs/success.png"/>
				<span>请在手机上点击确认登录！</span>
				<a class="comeback" href="index.html">返回密码登录</a>
			</div>

			<!-- 学籍号登录 -->
			<div class="container container5">
				<!-- 错误提示小弹层 -->
				<i>用户名或密码不正确</i>
				<input type="text" placeholder="请输入学籍号">
				<input type="text" placeholder="请输真实姓名">
				<input type="text" placeholder="请设置用户名">
				<p>5-25位字母、中文、数字、下划线组合</p>
				<input type="password" placeholder="请设置登录密码">
				<p>8~16位字母、数字、无空格</p>
				<a href="javascript:;" class="button sure_btn">确定</a>
				<a class="comeback" href="index.html">返回账号登录</a>
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>
	#app {
		height: 100%;
	}
  @import '../assets/css/base.css';
  @import '../assets/css/common.less';
</style>
<script>
  export default {
    name: 'app'
    // components:[]
  }
</script> 

