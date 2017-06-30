/*
* @Author: soulmate
* @Date:   2017-04-24 14:04:56
* @Last Modified by:   xuyan
* @Last Modified time: 2017-06-23 13:38:00
*/
$(function() {
    // function toIndex() {
    //     var displayProp = $('.wrapper>div')
    //     console.log(displayProp)
    //     console.log(displayProp.length)
    //     var cal = 0
    //     for (var i = 0; i<displayProp.length; i++) {
    //         // var prop = displayProp[i].getAttribute('style')
    //         console.log(displayProp[i].getAttribute('style'))
    //         // console.log(prop)
    //         // if (prop != 'none') {
    //             // break;
    //         // }
    //         ++cal;
    //         console.log(cal)
    //     }
    //     if (cal == 8) {
    //         // window.location.href = 'index.html'
    //     } 
    // }
    // toIndex()
    // 内容切换
    function containterSkip(num){
        $('.container' + num).show().siblings('.container').hide();
    }
    

    // 返回上一页
    $('.goback').click(function(event) {
        window.history.go(-1);
    });

    // 渲染云平台入口数据
    function getRolesData(){
        var renderData = JSON.parse(localStorage.getItem("roles"));
        console.log(renderData);

        var li_label = '';
        var ul = $('.container3 ul');
        if (renderData.length > 0) {
            for (var i = 0; i < renderData.length; i++) {
                li_label += '<li index="'+ renderData[i].index +'"><a href="javascript:;">'+ renderData[i].org + ' -- ' + renderData[i].role_detail + '入口' +'</a></li>';
            };
            ul.append(li_label);
        };
        // 高亮
        var index = $.cookie('index');
        console.log('index = ' + index);
        if (index != -1 ) {
            // 不为-1 代表当前有登录角色 高亮显示对应index的角色入口
            ul.find('li').eq(index).children('a').css('color', '#64DAF8');
        };
    }

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
                    console.log('enter');
                    localStorage.setItem('roles',JSON.stringify(data.roles));//localStorage只能存储字符串
                    $.cookie('index',data.index);
                    // 入口
                    // 6.26这边有bug他没有区分是不是单独账号
                    console.log(data.roles);
                    if (data.roles.length <= 1) {
                        // 单账号直接进首页
                        userLogin(0);
                    } else {
                        containterSkip(3);
                        $.cookie('cont_status','roles');
                        getRolesData();
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
                console.log('进入11111111111')
                if (data.success == true) {
                    var href = data.access + '?exchange_token=' + data.exchange_token + '&href=' + window.location.href;
                    console.log(href, '地址')
                    window.location.href = href;
                }else if (data.error.fields.token) {
                    layer.msg('登录超时或已退出，请重新登录');
                    // 返回登录页
                    setTimeout(function(){
                        window.location.href = 'index.html';
                    }, 2000);
                };
            }
        });
    }

    $('#roles').delegate('li', 'click', function(event) {
        var index = $(this).attr('index');
        console.log('index = ' + index);
        userLogin(index);
    });

    /************************ 强制修改用户名 ************************/
    function changeUsername(){
        // 表单验证
        var username = $('#username').val();
        var p_msg = $('.container4 .msg');
        p_msg.text('');
        if (username == '') {
            p_msg.text('请重新设置您的用户名');
            return false;
        };
        $.post(
            baseUrl + "passport.invalid.update",
            {
                "token":token,
                "username":username
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    layer.msg('用户名修改成功');
                    if ($.cookie('change') == 2) {
                        $.cookie('curAccount',username);
                        setTimeout(function(){
                            // 统一密码
                            containterSkip(1);
                            curAccount();
                            $.cookie('cont_status','password');
                        }, 1000);
                    } else {
                        setTimeout(getUsers, 1000);
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
            },
        'json');
    }

    $('#confirm_btn2').click(function(event) {
        changeUsername();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            changeUsername();
        }
    });

    /************************ 统一密码 ************************/
    // 当前账户
    function curAccount(){
        var account = $.cookie('curAccount');
        $('#account').text(account);
    }
    // 设置统一密码
    function setSamePassword(){
        // 表单验证
        var set_password = $('#set_password').val();
        var input_again_pwd = $('#input_again_pwd').val();
        var p_msg = $('.container1 .msg');
        p_msg.text('');

        if (set_password == '') {
            p_msg.text('密码不能设置为空');
            return false;
        };
        //密码格式校验
        if(set_password.length < 8  || set_password.length > 32){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        var passwordCheck= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\!@#$%^&*()_+-=,.]{8,32}$/;
        if(!passwordCheck.test(set_password)){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        // 再输入一次
        if (input_again_pwd == '') {
            p_msg.text('请再输入一次');
            return false;
        };
        if (set_password != input_again_pwd) {
            p_msg.text('两次密码输入不一致');
            return false;
        };

        // 表单提交
        $.post(
            baseUrl + "passport.invalid.update",
            {
                "token":token,
                "password":set_password
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // ->密码设置成功弹层
                    containterSkip(2);
                    $.cookie('cont_status','pwd_set_success');
                    // ->进入入口
                    $('#enter_btn').click(function(event) {
                        getUsers();
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

    $('#confirm_btn1').click(function(event) {
        setSamePassword();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            setSamePassword();
        }
    });

    /************************ 忘记密码 ************************/
    var send_again = $('.container8 .send_again');
    // 判断邮件/手机号
    function checkUserBind(){
        var user_bind = $('#user_bind').val();
        var p_msg = $('.container7 .msg');
        p_msg.text('');

        if (user_bind == '') {
            p_msg.text('请输入绑定的手机号码或邮箱');
            return false;
        };
        $.cookie('user_bind',user_bind.trim());
        user_bind = $.cookie('user_bind');

        // 校验
        var mobileCheck = /^1[3|4|5|7|8][0-9]\d{8}$/;
        var emailCheck = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (mobileCheck.test(user_bind)) {
            $.ajax({
                type:'post',
                url:baseUrl + 'passport.sms.send',
                data:{
                    token: token,
                    mobile: user_bind,
                    type: 'RESET_PASSWORD'
                },
                dataType:'json',
                success: function(data){
                    console.log(data);
                    if (data.success == true) {
                        // 填写验证码
                        containterSkip(8);
                        $('#bind_phone').text(user_bind);
                        // 倒计时
                        var time = 60;
                        var timer;
                        timer = setInterval(function(){
                            time = time - 1;
                            $('.container8 .wait i').text(time);
                            if (time <= 0) {
                                clearInterval(timer);
                                $('.container8 .wait').hide();
                                send_again.show();
                            };
                        }, 1000);
                    } else if (data.success == false) {
                        var obj = data.error.fields;
                        if (obj) {
                            for(var key in obj){
                                console.log(obj[key]);
                                p_msg.text(obj[key]);
                                if (key == 'token') {
                                    p_msg.text('');
                                    getToken();
                                    setTimeout(checkUserBind, 100);
                                };
                                break;
                            }
                        } else {
                            p_msg.text(data.error.message);
                        }
                    };
                }
            });
        } else if (emailCheck.test(user_bind)) {
            // 邮箱
            $.ajax({
                type:'post',
                url:baseUrl + 'passport.email.send',
                data:{
                    token: token,
                    email: user_bind,
                    type: 'RESET_PASSWORD'
                },
                dataType:'json',
                success: function(data){
                    console.log(data);
                    if (data.success == true) {
                        // ->已发送
                        containterSkip(13);
                        $('#address').text(user_bind);
                    } else if (data.success == false) {
                        var obj = data.error.fields;
                        if (obj) {
                            for(var key in obj){
                                console.log(obj[key]);
                                p_msg.text(obj[key]);
                                if (key == 'token') {
                                    p_msg.text('');
                                    getToken();
                                    setTimeout(checkUserBind, 100);
                                };
                                break;
                            }
                        } else {
                            p_msg.text(data.error.message);
                        }
                    };
                }
            });
        } else {
            p_msg.text('输入的不是正确的邮箱或手机号码');
        };
    }

    // 下一步
    $('#next_step1').click(function(event) {
        checkUserBind();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            checkUserBind();
        }
    });

    // 获取验证码--找回密码（参数：手机号）
    function smsSendForFind(mobile){
        var p_msg = $('.container8 .msg');
        p_msg.text('');
        $.ajax({
            type:'post',
            url:baseUrl + 'passport.sms.send',
            data:{
                token: token,
                mobile: mobile,
                type: 'RESET_PASSWORD'
            },
            dataType:'json',
            success:function(data){
                console.log(data);
                if (data.success == true) {
                    $('.container8 .wait').show();
                    send_again.hide();
                    // 倒计时
                    var time = 60;
                    var timer;
                    $('.container8 .wait i').text(time);
                    timer = setInterval(function(){
                        time = time - 1;
                        $('.container8 .wait i').text(time);
                        if (time <= 0) {
                            clearInterval(timer);
                            $('.container8 .wait').hide();
                            send_again.show();
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
    // 再次发送
    send_again.click(function(event) {
        var mobile = $('#bind_phone').text();
        smsSendForFind(mobile);
    });

    // 验证码检查
    function verifyCode(){
        var p_msg = $('.container8 .msg');
        p_msg.text('');
        var user_bind = $.cookie('user_bind');
        var code = $('#code').val();
        if (code == '') {
            p_msg.text('请输入验证码');
            return false;
        };
        $.ajax({
            type: 'post',
            url: baseUrl + 'passport.verify.code',
            data:{
                token: token,
                contact: user_bind,
                code: code,
                type: 'RESET_PASSWORD'
            },
            success: function(data){
                console.log(data);
                if (data.success == true) {
                    // 设置新密码
                    containterSkip(9);
                    $('#name').text(user_bind);
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

    // 下一步
    $('#next_step2').click(function(event) {
        verifyCode();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            verifyCode();
        }
    });

    // 设置新密码
    function resetPassword(){
        var realname = $('#realname').val().trim();
        var reset_pwd = $('#reset_pwd').val();
        var input_again = $('#input_again').val();
        var p_msg = $('.container9 .msg');
        p_msg.text('');

        if (realname == '') {
            p_msg.text('请输入您的真实姓名');
            return false;
        };
        if (reset_pwd == '') {
            p_msg.text('请设置新密码');
            return false;
        };
        //密码格式校验
        if(reset_pwd.length < 8  || reset_pwd.length > 32){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        var passwordCheck= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\!@#$%^&*()_+-=,.]{8,32}$/;
        if(!passwordCheck.test(reset_pwd)){
            p_msg.text('新密码为8~32位字母数字或符号组合，无空格');
            return false;
        }
        // 再输入一次
        if (input_again == '') {
            p_msg.text('请再次输入密码');
            return false;
        };
        if (reset_pwd != input_again) {
            p_msg.text('两次密码输入不一致');
            return false;
        };
        // 表单提交
        $.post(
            baseUrl + "passport.password.reset",
            {
                "token": token,
                "realname": realname,
                "password": reset_pwd
            },
            function(data){
                console.log(data);
                if (data.success == true) {
                    // 成功弹框
                    $('.container9 .popup').show();
                    setTimeout(function(){
                        // 入口选择
                        getUsers();
                    }, 3000);
                } else if (data.success == false) {
                    var obj = data.error.fields;
                    if (obj) {
                        for(var key in obj){
                            console.log(obj[key]);
                            p_msg.text(obj[key]);
                            if (key == 'token') {
                                getToken();
                            };
                            if (key == 'timeout' && cont_status == 'find_pwd') { //过期重新请求
                                setTimeout(function(){
                                    window.location.reload();
                                }, 2000);
                            };
                            break;
                        }
                    } else {
                        p_msg.text(data.error.message);
                    };
                };
            },
        'json');
    }

    // 下一步
    $('#next_step3').click(function(event) {
        resetPassword();
    });
    $(document).keyup(function(event){
        if(event.keyCode == "13"){
            resetPassword();
        }
    });

    // cont_status记录页面当前页
    var cont_status = $.cookie('cont_status');
    window.onload = function (){
        console.log('cont_status = ' + cont_status);
        if (cont_status == 'find_pwd') {//找回密码
            containterSkip(7);
        } else if (cont_status == 'roles') {//入口
            containterSkip(3);
            getRolesData();
        } else if (cont_status == 'username') {//改用户名
            containterSkip(4);
        } else if (cont_status == 'password') {//统一密码
            containterSkip(1);
            curAccount();
        } else if (cont_status == 'pwd_set_success') {//改密码成功
            containterSkip(2);
        } else if (cont_status == 'reset_pwd') {
            containterSkip(9);
            $('#name').text($.cookie('email_add'));
        } else if (cont_status == undefined) {
            window.location.href = 'index.html'
        }
    }



});