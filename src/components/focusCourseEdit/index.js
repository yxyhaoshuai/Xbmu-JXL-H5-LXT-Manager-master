import React, {Component} from "react";
import {Form, Input, message, Modal, Select, Switch} from "antd";
import UploadFile from "../uploadFile";
import {BaseURL} from "../../tools/ajax";
import {addFocusCourse, deleFocusCourseImage, getFocusLinkCourse, updateFocusCourse} from "../../api/focusCourseApi";

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
class FocusCourseEdit extends Component {
    state = {
        focusLinkCourse: []
    }
    _handlerSubmit = () => {
        // console.log(this.uploadPane.G_getFilePath());
        this.focusCourseEditForm.validateFields().then(({id, title, ad_url, course_id}) => {
            updateFocusCourse(id, title, ad_url, course_id).then(result=>{
                if (result.code === 0) {
                    message.success("更新焦点图成功!")
                    if (typeof this.props.onFinish === "function") {
                        this.props.onFinish()
                    }
                }else {
                    message.error("更新焦点图失败!")
                }
            })
        }).catch(error=>{
            message.warn("请检查数据格式!")
        })
    }

    componentDidMount() {
        getFocusLinkCourse().then(result=>{
            this.setState({
                focusLinkCourse: result.data
            })
        })
    }

    render() {
        const {visible, _hideAllPane, editFocusCourse} = this.props;
        const {focusLinkCourse} = this.state;
        return (
            <Modal destroyOnClose={true} title="编辑焦点课程" okText={"提交"} cancelText={"取消"} visible={visible} onOk={this._handlerSubmit} onCancel={_hideAllPane}>
                <Form
                    initialValues={editFocusCourse}
                    ref={dom=>this.focusCourseEditForm=dom}
                    name="focusCourse-edit-form"
                    {...formItemLayout}
                >
                    <Form.Item name="id" label="焦点图ID" rules={[
                        {
                            required: true,
                            message: '必须输入!',
                        },
                    ]}>
                        <Input placeholder={"请输入焦点图ID"} disabled/>
                    </Form.Item>
                    <Form.Item name="title" label="焦点图标题" rules={[
                        {
                            required: true,
                            message: '必须输入!',
                        },
                    ]}>
                        <Input placeholder={"请输入焦点图标题"}/>
                    </Form.Item>


                    <Form.Item name="course_id" label="关联的课程" rules={[
                        {
                            required: true,
                            message: '必须输入!',
                        },
                    ]}>
                        <Select>
                            {focusLinkCourse.map(item=>(<Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="焦点图封面" >
                        <Form.Item name="ad_url" noStyle>

                            <UploadFile fileType={"image"} name={'ad_img'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/ad_course/upload_ad_img"} checkFile={(file)=>{
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
                                deleFocusCourseImage(filePath).then(result=>{
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
export default FocusCourseEdit;