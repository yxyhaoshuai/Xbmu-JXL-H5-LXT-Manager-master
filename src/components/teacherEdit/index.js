import React, {Component} from "react";
import {Form, Input, message, Modal, Switch} from "antd";
import UploadFile from "../uploadFile";
import {BaseURL} from "../../tools/ajax";
import {updateTeacher, delTeacherHeader} from "../../api/teacherApi";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
class TeacherEdit extends Component {
    _handlerSubmit = () => {
        // console.log(this.uploadPane.G_getFilePath());
        this.teacherAddForm.validateFields().then(({id, name, is_star, intro, header, position})=>{

            updateTeacher(id, name, is_star, intro, header, position).then(result=>{
                if (result.code === 0) {
                    message.success("更新讲师成功!")
                    if (typeof this.props._hideAllPane === "function") {
                        this.props._hideAllPane()
                    }
                    if (typeof this.props._onFinish === "function") {
                        this.props._onFinish()
                    }
                } else {
                    message.error("更新讲师失败!")
                }
            })
        }).catch(error=>{
            message.warn("请检查数据格式!")
        })
    }

    render() {
        const {visible, _hideAllPane, editTeacherModel} = this.props;
        return (
            <Modal destroyOnClose={true} title="编辑讲师" okText={"提交"} cancelText={"取消"} visible={visible} onOk={this._handlerSubmit} onCancel={_hideAllPane}>
                <Form
                    ref={dom=>this.teacherAddForm=dom}
                    name="teacher-add-form"
                    initialValues={editTeacherModel}
                    {...formItemLayout}
                >
                    <Form.Item name="id" label={"ID"}>
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item name="name" label="姓名" rules={[
                        {
                            required: true,
                            message: '必须输入姓名!',
                        },
                    ]}>
                        <Input placeholder={"请输入讲师姓名"}/>
                    </Form.Item>
                    <Form.Item name="position" label="职位" rules={[
                        {
                            required: true,
                            message: '必须输入职位!',
                        },
                    ]}>
                        <Input placeholder={"请输入讲师职位"}/>
                    </Form.Item>


                    <Form.Item name="is_star" label="是否星级" valuePropName="checked" initialValue={0}
                                getValueFromEvent={(evt)=>{
                                    return +evt;
                                }}
                               rules={[
                        {
                            required: true,
                            message: '必须输入是否星级!',
                        },
                    ]}>
                        <Switch checkedChildren={"是"} unCheckedChildren={"否"}/>
                    </Form.Item>

                    <Form.Item name="intro" label="简介" rules={[
                        {
                            required: true,
                            message: '必须输入简介!',
                        },
                    ]}>
                        <Input.TextArea placeholder={"请输入讲师简介"}/>
                    </Form.Item>
                    <Form.Item label="头像" >
                        <Form.Item name="header" noStyle>

                            <UploadFile ref={dom=>this.uploadPane=dom} fileType={"image"} name={'header'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/teacher/upload_header"} checkFile={(file)=>{
                                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                if (!isJpgOrPng) {
                                    message.error('你只能上传 JPG/PNG 文件格式!');
                                }
                                const isLt5M = file.size / 1024 / 1024 < 5;
                                if (!isLt5M) {
                                    message.error('图片大小应该小于 5M!');
                                }
                                return isJpgOrPng && isLt5M;
                            }} delFile={(filePath)=>{
                                delTeacherHeader(filePath).then(result=>{
                                    if (result.code === 0) {
                                        message.success("删除文件成功!")
                                    } else {
                                        message.error("删除图片失败!")
                                    }
                                })
                            }}/>
                        </Form.Item>
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}
export default TeacherEdit;