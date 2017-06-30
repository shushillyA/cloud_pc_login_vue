
var token = $.cookie('token');
console.log('token = ' + token);
if (!token || token == '') {
   getToken();
};

// 获取会话标识
function getToken(){
    $.ajax({
        type:'post',
        url: baseUrl + 'token.get',
        data:{
            app_key: '33333333',
            old_token: token
        },
        dataType:'json',
        success:function(data){
           console.log(data);
           if (data.success == true) {
           		var cookietime = new Date();
                var startTime = cookietime.getTime();
                cookietime.setTime(startTime + (30 * 60 * 1000));// cookie存储30分钟
                $.cookie("token", data.token, { expires: cookietime, path: '/' });
                token = $.cookie('token');
           };
        }
    });
}

// 临时
function resetToken(){
    $.ajax({
        type:'post',
        url: baseUrl + 'token.get',
        data:{
            app_key: '33333333'
        },
        dataType:'json',
        success:function(data){
           console.log(data);
           if (data.success == true) {
           		var cookietime = new Date();
                var startTime = cookietime.getTime();
                cookietime.setTime(startTime + (30 * 60 * 1000));
                $.cookie("token", data.token, { expires: cookietime, path: '/' });
                token = $.cookie('token');
           };
        }
    });
}

