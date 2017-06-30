$(function() {

	// 内容切换
    function containterSkip(num){
        $('.container' + num).show().siblings('.container').hide();
    }

    // status记录页面当前步骤
    var mobile_bind_status = $.cookie('mobile_bind_status');
    window.onload = function (){
    	console.log('mobile_bind_status = ' + mobile_bind_status);
    	if (mobile_bind_status == '' || mobile_bind_status == undefined) {
    		containterSkip(5);
    	} else if (mobile_bind_status == 'bind_step2') {//手机绑定第二步
    		containterSkip(6);
    		$('#cur_mobile').text($.cookie('bind_mobile'));
    	};
    }

	var token;
	// 获取token
	var temp = GetQueryString("token");
	if(temp != null && temp.toString().length>1){
	    token = temp;
	}

    /************************ 手机绑定 ************************/
    // 第一步验证手机
    var bind_count;
    var bind_mobile;
    // 获取短信验证码--绑定
    function smsSendForBind(){
        bind_mobile = $('#bind_mobile').val();
        var p_msg = $('.container5 .msg');
        p_msg.text('');

        if (bind_mobile == '') {
            p_msg.text('请输入手机号码');
            return false;
        };
        var mobileCheck = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if(!mobileCheck.test(bind_mobile)){
            p_msg.text('手机号格式不正确');
            return false;
        };

        $.ajax({
            type:'post',
            url:baseUrl + 'passport.sms.send',
            data:{
                token: token,
                mobile: bind_mobile,
                type: 'BIND'
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.success == true) {
                    $('#get_captcha').hide();
                    $('.container5 .wait').show();
                    // 倒计时
                    var time = 60;
                    var timer;
                    $('.container5 .wait i').text(time);
                    timer = setInterval(function(){
                        time = time - 1;
                        $('.container5 .wait i').text(time);
                        if (time <= 0) {
                            clearInterval(timer);
                            $('.container5 .wait').hide();
                            $('#get_captcha').show();
                        };
                    }, 1000);
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    }
                };
            }
        });
    }

    // 获取验证码
    $('#get_captcha').click(function(event) {
        smsSendForBind();
    });

    // 验证手机
    function mobileBind(){
        bind_mobile = $('#bind_mobile').val();
        var captcha = $('#captcha').val();
        var cur_password = $('#cur_password').val();
        var p_msg = $('.container5 .msg');
        p_msg.text('');

        if (bind_mobile == '') {
            p_msg.text('请输入手机号码');
            return false;
        };
        if (captcha == '') {
            p_msg.text('请输入验证码');
            return false;
        };
        if (cur_password == '') {
            p_msg.text('请输入当前登录密码');
            return false;
        };

        $.ajax({
            type:'post',
            url: baseUrl + 'passport.mobile.bind',
            data:{
                token: token,
                mobile: bind_mobile,
                code: captcha,
                password: cur_password
            },
            dataType:'json',
            success: function (data){
                console.log(data);
                if (data.success == true) {
                    bind_count = data.bind_count;
                    console.log('bind_count = ' + bind_count);
                    $.cookie('bind_count',bind_count + 1);
                    if (bind_count > 0) {
                        // 多账号
                        if (data.unified_password == true) {
                            var popup = $('.container5 .popup');
                            popup.show();
                            // 取消
                            $('#cancel_btn').click(function(event) {
                                popup.hide();
                                // 清空验证码
                                $("#captcha").attr("value","");
                            });
                            // 确定
                            $('.sure_btn').click(function(event) {
                                popup.hide();
                                containterSkip(6);
                                $.cookie('mobile_bind_status','bind_step2');
                                $.cookie('bind_mobile',bind_mobile);
                                $('#cur_mobile').text($.cookie('bind_mobile'));
                            });
                        } else {
                            layer.msg('多账号绑定成功');
                        }
                    } else {
                        // 单账号
                        layer.msg('单账号绑定成功');
                    }
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    }
                };
            }
        });
    }

    // 绑定
    $('#bind_btn').click(function(event) {
        mobileBind();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            mobileBind();
        }
    });

    // 第二步设置统一密码
    function setUnifiedPassword(){
        // 表单验证
        var set_pwd = $('#set_pwd').val();
        var set_pwd_again = $('#set_pwd_again').val();
        var p_msg = $('.container6 .msg');
        p_msg.text('');

        if (set_pwd == '') {
            p_msg.text('密码不能设置为空');
            return false;
        };
        //密码格式校验
        if(set_pwd.length < 8  || set_pwd.length > 32){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        var passwordCheck= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\!@#$%^&*()_+-=,.]{8,32}$/;
        if(!passwordCheck.test(set_pwd)){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        // 再输入一次
        if (set_pwd_again == '') {
            p_msg.text('请再输入一次');
            return false;
        };
        if (set_pwd != set_pwd_again) {
            p_msg.text('两次密码输入不一致');
            return false;
        };

        // 表单提交
        $.post(
            baseUrl + "passport.unified-password.set",
            {
                "token":token,
                "password":set_pwd
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // ->设置成功弹层
                    $('.container6 .popup').show();
                    $('#bind_count').text($.cookie('bind_count'));
                    // ->个人资料
                    $('.success_btn').click(function(event) {
                        alert('跳转至个人资料页');
                    });
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    }
                };
            },
        'json');
    }

    // 确定
    $('#confirm_btn3').click(function(event) {
        setUnifiedPassword();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            setUnifiedPassword();
        }
    });


    /**************************** 邮箱绑定 ***************************/
    // 发送绑定邮件
    function sendEmailForBind(){
        // 表单验证
        var p_msg = $('.container10 .msg');
        p_msg.text('');
        var email = $('#email').val().trim();
        var login_password = $('#login_password').val();
        if (email == '') {
            p_msg.text('请输入邮箱地址');
            return false;
        };
        // 邮箱格式校验
        var emailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!emailCheck.test(email)) {
            p_msg.text('不是一个正确的邮箱地址');
            return false;
        };
        if (login_password == '') {
            p_msg.text('请输入当前登录密码');
            return false;
        };
        $.cookie('email',email);

        // 表单提交
        $.post(
            baseUrl + "passport.email-bind.send",
            {
                "token": token,
                "email": email,
                "password": login_password
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // ——>邮件已发送
                    containterSkip(11);
                    $('#address').text($.cookie('email'));
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    }
                };
            },
        'json');
    }

    // 发送验证邮件
    $('#send_email').click(function(event) {
        sendEmailForBind();
    });




});