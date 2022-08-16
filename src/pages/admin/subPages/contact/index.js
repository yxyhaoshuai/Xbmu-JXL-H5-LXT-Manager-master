import React, {Component} from "react";
import "./index.less"
import {Button, Card, Form, Input, message} from "antd";
import UploadFile from "../../../../components/uploadFile";
import {BaseURL} from "../../../../tools/ajax";
import {delConfigImg, getConfigData, updateConfigData} from "../../../../api/configApi";

const formItemLayout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 6,
    },
};
class Contact extends Component {

    state = {
        configData: {}
    }

    _checkFile = (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('你只能上传 JPG/PNG 文件格式!');
            }
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                message.error('图片大小应该小于 5M!');
            }
            return isJpgOrPng && isLt5M;
    }
    _delFile = (filePath)=>{
        delConfigImg(filePath).then(result=>{
            if (result.code === 0) {
                message.success("删除文件成功!")
            } else {
                message.error("删除图片失败!")
            }
        })
    }

    _loadData = () => {
        getConfigData().then(result=>{
            this.setState({
                configData: result.data
            })
        })
    }
    componentDidMount() {
        this._loadData()
    }
    _handlerUpdate = () => {
        this.configForm.validateFields().then(({id, app, wb_qrcode, tel, mini_program, wechat_qrcode})=>{
            updateConfigData(id, app, wb_qrcode, tel, mini_program, wechat_qrcode).then(result=>{
                if (result.code === 0) {
                    message.success("更新成功")
                } else {
                    message.error("更新失败!")
                }
            })
        }).catch(error=>{
            message.warn("请检查数据格式!")
        })
    }
    render() {
        const {configData} = this.state;
        return (
            <Card title="网站的联系配置" extra={<Button type={"primary"} onClick={this._handlerUpdate}>更新</Button>}>
                {!configData.id ? <div/> :
                    <Form
                    ref={dom=>this.configForm=dom}
                    name="config-form"
                    initialValues={configData}
                    {...formItemLayout}
                >
                    <Form.Item name="id" label="ID">
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="tel" label="手机号码" rules={[
                        {
                            required: true,
                            message: '必须输入手机号!',
                        },
                    ]}>
                        <Input placeholder={"请输入手机号码"}/>
                    </Form.Item>

                    <Form.Item label="微信" >
                        <Form.Item name="wechat_qrcode" noStyle>
                            <UploadFile fileType={"image"} name={'img'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/config/upload_img"} checkFile={this._checkFile} delFile={this._delFile}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="小程序" >
                        <Form.Item name="mini_program" noStyle>
                            <UploadFile fileType={"image"} name={'img'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/config/upload_img"} checkFile={this._checkFile} delFile={this._delFile}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="微博" >
                        <Form.Item name="wb_qrcode" noStyle>
                            <UploadFile fileType={"image"} name={'img'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/config/upload_img"} checkFile={this._checkFile} delFile={this._delFile}/>
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="App" >
                        <Form.Item name="app" noStyle>
                            <UploadFile fileType={"image"} name={'img'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/config/upload_img"} checkFile={this._checkFile} delFile={this._delFile}/>
                        </Form.Item>
                    </Form.Item>

                </Form>}
            </Card>
        )
    }
}

export default Contact;