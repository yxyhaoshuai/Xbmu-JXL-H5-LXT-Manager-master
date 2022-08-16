import React from "react";
import {Form, Input, message, InputNumber, Button} from "antd"
import {addCourseOutline, deleteCourseVideo} from "../../api/courseApi";
import UploadFile from "../uploadFile";
import {BaseURL} from "../../tools/ajax";
import {delTeacherHeader} from "../../api/teacherApi";

const {Item} = Form;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

class Index extends React.Component {

    componentDidMount() {

    }

    _handlerOk = (values) => {
        const {num, title, video_url} = values
        // 收集表单内容
        const {course_id} = this.props
        addCourseOutline(course_id, num, title, video_url).then(result=>{
            if (result.code === 0) {
                message.success("新增大纲成功")
                this.form.resetFields()
                let callback = this.props.finishFunc
                if (typeof callback === "function") {
                    callback()
                }
            } else {
                message.error("新增大纲失败")
            }
        })
    }

    render() {
        return (
            <Form
                onFinish={this._handlerOk}
                ref={dom => this.form = dom}
                name="ad_outline_form"
                {...formItemLayout}
            >
                <Item label={"序号"} name={"num"} rules={[{required: true, message: '字段不能为空'}]}>
                    <InputNumber/>
                </Item>
                <Item label={"章节名称"} name={"title"} rules={[{required: true, message: '字段不能为空'}]}>
                    <Input placeholder="请输入章节名称"/>
                </Item>
                <Item label={"视频"} name={"video_url"}
                >
                    <UploadFile fileType={"video"} name={'video'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/course/upload_video"} delFile={(filePath)=>{
                        deleteCourseVideo(filePath).then(result=>{
                            if (result.code === 0) {
                                message.success("删除文件成功!")
                            } else {
                                message.error("删除图片失败!")
                            }
                        })
                    }}/>

                </Item>
                <Item wrapperCol={
                    {
                        offset: 8,
                        span: 16,
                    }}>
                    <Button type="primary" htmlType="submit">
                        新增
                    </Button>
                </Item>
            </Form>
        );
    }
}

export default Index;
