/*
* @Author: soulmate
* @Date:   2017-04-24 14:04:34
* @Last Modified by:   xuyan
* @Last Modified time: 2017-06-23 13:36:12
*/
// 软键盘
// function keyboardNo1(){
//     VirtualKeyboard.toggle('username', 'softkey');
// }
// function keyboardNo2(){
//     VirtualKeyboard.toggle('password', 'softkey2');
// }
// function keyboardNo3(){
//     VirtualKeyboard.toggle('captcha', 'softkey3');
// }
// 参数channel不为空显示
var channel = GetQueryString('channel');
if (channel != null && channel.toString().length>0) {
    $('.container1').addClass('active');
};

//
$(function() {
    
    // 内容切换
    function pageSkip(num){
        $('.container' + num).show().siblings('.container').hide();
    }
    

    // ->二维码登录
    $(".other_login").click(function(event) {
        pageSkip(2);
        $.cookie('page_status','qrcode');
        getQrcode();
    });

    // ->返回账号登录
    $('.comeback').click(function(event) {
        pageSkip(1);
        $.cookie('page_status','');
    });

    // 忘记密码
    $('.forget').click(function(event) {
        $.cookie('cont_status','find_pwd');
        window.location.href = 'set.html';
    });

    // ->学籍号登录
    $('.student_code').click(function(event) {
        pageSkip(5);
        $.cookie('page_status','studentcode');
    });

    /************************ 账号登录 ************************/
    // 显示图像验证码
    function getCaptcha(){
        $.ajax({
            type:'post',
            url: baseUrl + 'captcha.get',
            data: {
                token: token,
                size: '160x40'
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.success == true) {
                    $('#captcha_code').show();
                    $('#captcha_img').attr('src', data.image);
                } else if (data.error.fields.token) {
                    getToken();
                };
            }
        });
    }

    // 切换验证码
    $('#captcha_img').click(function(event) {
        getCaptcha();
    });

    // 表单提交处理
    var wrongNum = 0;
    function loginFormCommit(){
        // 表单验证
        var username = $('#username').val();
        var password = $('#password').val();
        var captcha = $('#captcha').val();
        var i_msg = $('.container1 i');
        i_msg.hide();
        if (username == '') {
            i_msg.show();
            i_msg.text('请输入用户名');
            return false;
        };
        if (password == '') {
            i_msg.show();
            i_msg.text('请输入密码');
            return false;
        };
        // 登录判断处理
        $.post(
            baseUrl + "passport.login",
            {
                "token":token,
                "account":username,
                "password":password,
                "captcha":captcha
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // $('#captcha').val() = ''; // 清空验证码
                    // console.log('验证码清空');
                    getUsers();
                }else if (data.success == false) {
                    ++wrongNum;
                    i_msg.show();
                    var obj = data.error.fields;
                    if (obj) {
                        if (obj.password && obj.username) {
                            $.cookie('change',2);
                            $.cookie('curAccount',username);
                        } else{
                            $.cookie('change',1);
                        };
                        for(var key in obj){
                            console.log(obj[key]);
                            i_msg.text(obj[key]);
                            if (key == 'token') {
                                i_msg.hide();
                                getToken();
                                setTimeout(loginFormCommit, 100);
                            };
                            if (key == 'username') {
                                i_msg.hide();
                                window.location.href='set.html';
                                $.cookie('cont_status','username');
                            };
                            if (key == 'password') {
                                i_msg.hide();
                                $.cookie('curAccount',username);
                                window.location.href='set.html';
                                $.cookie('cont_status','password');
                            };
                            if (key == 'middleware.check-login.is-login') {
                                i_msg.hide();
                                resetToken();
                                setTimeout(loginFormCommit, 100);
                            };
                            break;
                        }
                    } else {
                        i_msg.text(data.error.message);
                    }
                    // 调验证码
                    // console.log('11111111111111')
                    // console.log(data.error.fields)
                    // console.log(wrongNum)
                    if (wrongNum > 2 || data.error.fields.captcha) {
                        getCaptcha();
                    };
                };
            },
        'json');
    }

    // 登录按钮或键盘enter提交
    $('#login_btn1').click(function(event) {
        loginFormCommit();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            loginFormCommit();
        }
    });

    // 角色列表
    function getUsers(){
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.users.get',
            data:{
                token: token
            },
            dataType:'json',
            success: function(data){
                console.log(data);
                if (data.success == true) {
                    localStorage.setItem('roles',JSON.stringify(data.roles));//localStorage只能存储字符串
                    $.cookie('index',data.index);
                    // 入口
                    if ($('#captcha').val()) {
                        console.log($('#captcha').val())
                        $('#captcha').val(''); // 清空验证码
                        console.log($('#captcha').val())
                    }
                    if (data.roles.length > 1) {
                        window.location.href = 'set.html';
                        $.cookie('cont_status','roles');
                    } else {
                        // 单账号直接进首页
                        userLogin(0);
                    }
                };
            }
        });
    }

    // 角色登录
    function userLogin(index){
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.user.login',
            data:{
                token: token,
                index: index
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                console.log('数据11111111111111')
                if (data.success == true) {
                    var href = data.access + '?exchange_token=' + data.exchange_token + '&href=' + window.location.href;
                    if (channel) {
                        href += '&channel=' + channel
                    }
                    console.log(href, '地址')
                    window.location.href = href
                }
            }
        });
    }

    /************************ 二维码登录 ************************/
    // 获取二维码内容
    var qrcode_url;
    function getQrcode(){
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.qrcode.get',
            data:{
                token: token
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.success == true) {
                    qrcode_url = data.qrcode_url;
                    // 二维码
                    $('#qrcode').empty();
                    $('#qrcode').qrcode({
                        render: "canvas",
                        width: 126,
                        height: 126,
                        text: qrcode_url
                    });
                    // 查询二维码状态
                    qrcodeStatus();
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    for(var key in obj){
                        if (key == 'token') {
                            getToken();
                            setTimeout(getQrcode, 100);
                        };
                        if (key == 'middleware.check-login.is-login') {
                            resetToken();
                            setTimeout(getQrcode, 100);
                        };
                        break;
                    }
                };
            }
        });
    }

    // 查询手机端是否对二维码登录做出反馈
    function qrcodeStatus(){
        $('.expired,.refresh').removeClass('active');
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.qrcode.status',
            data:{
                token:token
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.success == true) {
                    if (data.status == 'WAITING') {
                        // 等待扫码
                        setTimeout(function(){
                            qrcodeStatus();
                        }, 5000);
                    } else if (data.status == 'SCANED') {
                        // 等待确认
                        pageSkip(4);
                        setTimeout(function(){
                            qrcodeStatus();
                        }, 5000);
                    } else if (data.status == 'SUCCESS') {
                        // 手机确认成功,跳转至手机端当前角色
                        $.cookie('username', data.username, { expires: 30 });
                        $.cookie('push_key', data.push_key, { expires: 30 });
                        window.location.href = data.access + '?exchange_token=' + data.exchange_token;
                    } else if (data.status == 'FAILED') {
                        // 拒绝 返回二维码登录
                        pageSkip(2);
                        getQrcode();
                    } else if (data.status == 'EXPIRED') {
                        $('.expired,.refresh').addClass('active');
                        $('.refresh').click(function(event) {
                            window.location.reload();
                        });
                    };
                };
            }
        });
    }

    /************************ 上次登录账号确认 ************************/
    // 发送登录信息到手机端
    function mobileSend(){
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.mobile.send',
            data:{
                token:token,
                push_key:push_key
            },
            dataType:'json',
            success:function (data){
                console.log(data);
                if (data.success == true) {
                    mobileStatus();
                } else if (data.error.fields.token) {
                    getToken();
                };
            }
        });
    }

    // 查询手机端是否对手机确认登录做出反馈
    var sendTime = 0;
    function mobileStatus(){
        if (sendTime == 25) {
            return;
        };
        $.ajax({
            type:'post',
            url: baseUrl + 'passport.mobile.status',
            data:{
                token:token
            },
            dataType:'json',
            success: function(data){
                console.log(data);
                if (data.success == true) {
                    if (data.status == 'WAITING') {
                        setTimeout(function(){
                            mobileStatus();
                        }, 5000);
                        sendTime ++;
                        console.log('sendTime = '+sendTime);
                        // 2分钟没有响应(sendTime=25) ->二维码
                        if (sendTime >= 25) {
                            pageSkip(2);
                            getQrcode();
                        };
                    } else if (data.status == 'SUCCESS') {
                        // 手机确认成功
                        $.cookie('username', data.username, { expires: 30 });
                        $.cookie('push_key', data.push_key, { expires: 30 });
                        getUsers();
                    } else if (data.status == 'FAILED') {
                        // 跳转至二维码
                        pageSkip(2);
                        getQrcode();
                    };
                };
            }
        });
    }

    $('#confirm_btn').click(function(event) {
        mobileSend();
    });

    // page_status记录页面当前页
    var page_status = $.cookie('page_status');
    window.onload = function (){
        console.log('page_status = ' + page_status);
        if (page_status == undefined || page_status == '') {
            pageSkip(1);
        }else if (page_status == 'qrcode') {
            pageSkip(2);
            getQrcode();
        }else if (page_status == 'studentcode') {
            pageSkip(5);
        };
    }
    






});