import React from "react";
import "../index.less"
import {Breadcrumb, Button, Card, Form, Input, message, Select, Switch} from "antd";
import {Link} from "react-router-dom";
import {
    deleteCourseImg,
    getCourseDetail,
    getCourseOwnCategory,
    getCourseOwnTeacher,
    updateCourse
} from "../../../../../api/courseApi";
import UploadFile from "../../../../../components/uploadFile";
import {BaseURL} from "../../../../../tools/ajax";
import RichTextEditor from "../../../../../components/richTextEditor";


const {Item} = Form

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};

class EditCoursePane extends React.Component {

    componentDidMount() {
        getCourseOwnTeacher().then(result=>{
            this.setState({
                courseTeacherList: result.data
            })
        })

        getCourseOwnCategory().then(result=>{
            this.setState({
                courseCategoryList: result.data
            })
        })
        // 加载当前id对应的课程详情
        const {id} = this.props.match.params
        getCourseDetail(id).then(result=>{
            this.setState({
                editCourse: result.data
            })
        })
    }

    state = {
        courseTeacherList: [],
        courseCategoryList: [],
        editCourse: {}
    }

    _handlerOk = (form) => {
        form.validateFields().then(values=>{
            const {id, title, fm_url, is_hot, intro, teacher_id, category_id} = values
            // console.log(values)
            updateCourse(id, title, fm_url, is_hot, intro, teacher_id, category_id).then(result=>{
                if (result.code === 0) {
                    message.success("更新成功")
                    form.resetFields()
                    this.props.history.replace("/course")
                } else {
                    message.error("更新失败")
                }
            })
        }).catch(err=>{
            message.info("请检查表单字段")
        })

    }

    render() {
        const {courseTeacherList, courseCategoryList, editCourse} = this.state
        if (!editCourse.id) return <div/>
        return (
            <Card title={<Breadcrumb>
                <Breadcrumb.Item><Link to={"/course"}>课程列表</Link></Breadcrumb.Item>
                <Breadcrumb.Item>编辑课程</Breadcrumb.Item>
            </Breadcrumb>} extra={<Button type={"primary"} onClick={()=>{
                this._handlerOk(this.form)
            }}>更新</Button>}>
                <Form
                    ref={dom => this.form = dom}
                    name="edit_course_form"
                    {...formItemLayout}
                    initialValues={{
                        ...editCourse
                    }}
                >
                    <Item label={"ID"} name={"id"} rules={[{required: true, message: '字段不能为空'}]}>
                        <Input value={editCourse.id} disabled={true}/>
                    </Item>
                    <Item label={"课程标题"} name={"title"} rules={[{required: true, message: '字段不能为空'}]}>
                        <Input placeholder="请输入课程标题"/>
                    </Item>
                    <Item label={"是否热门"} name={"is_hot"}
                          valuePropName={"checked"}
                          rules={[{required: true, message: '字段不能为空'}]}
                          getValueFromEvent={evt => evt ? 1 : 0}>
                        <Switch checkedChildren={"是"} unCheckedChildren={"否"}/>
                    </Item>
                    <Item label={"所属讲师"} name={"teacher_id"}
                          rules={[{required: true, message: '字段不能为空'}]}
                    >
                        <Select>
                            {courseTeacherList.map(item=>{
                                return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            })}
                        </Select>
                    </Item>
                    <Item label={"所属分类"} name={"category_id"}
                          rules={[{required: true, message: '字段不能为空'}]}
                    >
                        <Select>
                            {courseCategoryList.map(item=>{
                                return <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                            })}
                        </Select>
                    </Item>
                    <Item label={"课程封面"} name={"fm_url"}>
                        <UploadFile fileType={"image"} name={'fm'} previewBaseURL={BaseURL} action={BaseURL + "/api/manager/course/upload_fm"} checkFile={(file)=>{
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
                            deleteCourseImg(filePath).then(result=>{
                                if (result.code === 0) {
                                    message.success("删除文件成功!")
                                } else {
                                    message.error("删除图片失败!")
                                }
                            })
                        }}/>

                    </Item>
                    <Item label={"简介"} name={"intro"} rules={[{required: true, message: '字段不能为空'}]}>
                        <RichTextEditor/>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default EditCoursePane;
