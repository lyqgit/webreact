/**
 * Created by lyq on 2017/12/21.
 */

import React,{ Component } from 'react';
import { Button,Form,Input,Icon,message } from 'antd';
const url = '';
const localUrl = '';
const curUrl = localUrl;
class Login extends Component{

    componentWillMount(){
        if(localStorage.getItem('user') === 'qida'){
            this.props.history.push('/Home/PortfList');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const form = this.props.form;
        let that = this;
        form.validateFields((err,values)=>{
            if(err){
                message.info('用户名或密码不能为空');
            }else{
                let username = form.getFieldValue('username');
                let password = form.getFieldValue('password');
                fetch(curUrl+'/admin/login/verify',{
                    method:'POST',
                    // mode:'no-cors',
                    headers:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    body:'user='+username+'&pwd='+password
                }).then(function (response) {
                    return response.json();
                }).then(function(json){
                    if(json.errorcode === 0){
                        localStorage.setItem('user','qida');
                        that.props.history.push({pathname:'/Home/PortfList',state:'主页/作品列表'})
                    }else{
                        message.info('用户名或密码不正确');
                    }
                }).catch(function(ex){
                    console.log(ex);
                });
                // if(username === 'admin' && password === 'admin'){
                //     sessionStorage.setItem('user','qida');
                //     this.props.history.push({pathname:'/Home/PortfList',state:'主页/作品列表'});
                // }else{
                //     message.info('用户名或密码不正确');
                // }
            }
        });


    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} style={{maxWidth:"300px",margin:"50px auto"}}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '需要输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '需要输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <div>
                        <Button style={{width:"100%"}} htmlType="submit" type="primary">登录</Button>
                    </div>

                </Form.Item>
            </Form>
        );
    }
}


export default Form.create()(Login);


