import React, {Component} from "react";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "./index.less"
import {Button, Form, Input, message} from "antd";
import {checkLogin, isLogin, saveUser} from "../../api/adminApi";
import {Redirect} from "react-router-dom"

class LoginPane extends Component {
    onFinish = ({account, password}) => {
        // 1. 账号和密码 -> 能够调用一个方法: (account, password) => true
        checkLogin(account, password).then(result=>{
            console.log(result)
            if (result.data.id) {
                // 做一个用户信息的本地存储
                saveUser(result.data)
                // 执行登录成功逻辑
                this.props.history.replace("/")
            } else {
                // 执行登录失败逻辑
                message.warn("账号或者密码错误, 请重新输入!")
            }
        })

    };
    onFailed = () => {
        message.error("你输入的字段有问题, 请检查后再次输入!")
    }
    render() {
        if (isLogin()) {
            return <Redirect to={"/"}/>
        }
        return (
            <div className={"login-pane"}>
                <div className="pane">
                    <div className="title">撩学堂-后台管理系统</div>
                    <Form
                        name="like_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFailed}
                    >
                        <Form.Item
                            name="account"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入您的账号!',
                                },
                                {
                                    whitespace: true,
                                    message: '全空格不被允许!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                {
                                    min: 5,
                                    message: '密码长度应该大于5',
                                },
                                {
                                    whitespace: true,
                                    message: '全空格不被允许!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button login-btn">
                                立即登录
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        )
    }
}
export default LoginPane;