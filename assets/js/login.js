$(function(){
    // 表单注册于登录的显示隐藏切换
    // 登录链接
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    });
    // 注册链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    });

// 表单验证
    var form = layui.form
    form.verify({
        // 密码的验证规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 再次输入密码的验证规则
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(pwd !== value){
                return '两次密码不一致'
            }
        }
    });

// 注册ajax存储
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        var data = {
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        };
        $.post('/api/reguser',data,function(res){
            console.log(res);
            if(res.status !==0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_login').click();
        })
        
        
    });

    // 登录
    var layer = layui.layer;
    
    $('#form_login').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})