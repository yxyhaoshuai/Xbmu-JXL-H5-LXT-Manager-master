import React from "react";
import "../index.less"
import {Avatar, Button, Card, Drawer, message, Modal, notification, Select, Switch, Table, Timeline} from "antd";
import {ExclamationCircleOutlined} from "@ant-design/icons"
import Index from "../../../../../components/addOutlinePane";
import {Link} from "react-router-dom";
import {
    deleteCourse, deleteCourseOutline,
    getCourseComments, getCourseInfo, getCourseList,
    getCourseOutline,
    getCourseOwnCategory,
    getCourseOwnTeacher, updateCourseCategory, updateCourseHot, updateCourseTeacher
} from "../../../../../api/courseApi";
import {getFormatTimeFromDate} from "../../../../../tools/dateTool";
import {BaseURL} from "../../../../../tools/ajax";

const {Column} = Table

class CourseList extends React.Component {

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

        this._loadData()
    }

    _loadOutline = (course_id) => {
        getCourseOutline(course_id).then(result=>{
            this.setState({
                courseOutline: result.data
            })
        })
    }

    _loadComments = (course_id) => {
        getCourseComments(course_id).then(result=>{
            this.setState({
                courseComments: result.data
            })
        })
    }

    _loadData = (page_num=1) => {
        getCourseList(page_num, 3).then(result=>{
            this.setState({
                courseList: result.data.course_list,
                total_count: result.data.total_count
            })
        })
    }
    state = {
        courseList: [],
        courseTeacherList: [],
        courseCategoryList: [],
        total_count: 0,
        showIntroPane: false,
        showCommentPane: false,
        showOutlinePane: false,
        currentCourse: {},
        courseComments: [],
        courseOutline: []
    }

    _loadCourseInfo = (id) => {
        let item = this.state.courseList.find(item=>item.id===id);
        if (!item.intro) {
            getCourseInfo(id).then(result=>{
                item.intro = result.data[0].intro;
                this.setState({
                    currentCourse: item
                })
            })
        } else {
            this.setState({
                currentCourse: item
            })
        }
    }
    render() {
        const {courseList, courseComments, courseOutline ,currentCourse, total_count} = this.state
        return (
            <div>
                <Card title={"课程列表"} extra={<Button type={"primary"}><Link to={"/course/add"}>新增课程</Link></Button>}>
                    <Table dataSource={courseList} rowKey={"id"} pagination={{
                        defaultPageSize: 3,
                        total: total_count,
                        onChange: (pageNum)=>{this._loadData(pageNum)}
                    }}>
                        <Column title="ID" dataIndex="id" key="id"  align={"center"} />
                        <Column title="课程名字" dataIndex="title" key="title"  align={"center"}/>
                        <Column title="课程封面" dataIndex="fm_url" key="fm_url" render={(text)=>{
                            return <Avatar size={64} shape={"square"} src={BaseURL + text}/>
                        }}  align={"center"}/>
                        <Column title="是否热门" dataIndex="is_hot" key="is_hot" render={(text, record)=>{
                            return <Switch defaultChecked={text===1} onChange={val=>{
                                updateCourseHot(record.id, val?1:0).then(result=>{
                                    if (result.code === 0) {
                                        notification["success"]({
                                            message:  '热门课程设置',
                                            description: `${val?"设置":"取消"}${record.title}热门课程成功!`,
                                        })
                                    } else {
                                        notification["error"]({
                                            message:  '热门课程设置',
                                            description: `${val?"设置":"取消"}${record.title}热门课程失败!`,
                                        })
                                    }
                                })
                            }
                            }/>
                        }}  align={"center"}/>
                        <Column title="所属老师" dataIndex="teacher_id" key="teacher_id" width={160} render={(text, record)=>{
                            return (
                                <Select style={{width: '100%'}} defaultValue={text} onChange={(val)=>{
                                    updateCourseTeacher(record.id, val).then(result=>{
                                        if (result.code === 0) {
                                            notification["success"]({
                                                message:  '绑定老师设置',
                                                description: `绑定老师成功!`,
                                            })
                                        } else {
                                            notification["error"]({
                                                message:  '绑定老师设置',
                                                description: `绑定老师失败!`,
                                            })
                                        }
                                    })
                                }}>
                                    {this.state.courseTeacherList.map(item=>{
                                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    })}
                                </Select>
                            )

                        }} align={"center"}/>

                        <Column title="所属分类" width={160} align={"center"} dataIndex="category_id" key="category_id" render={(text, record)=>{
                            return <Select style={{width: '100%'}} defaultValue={text} onChange={(val)=>{
                                updateCourseCategory(record.id, val).then(result=>{
                                    if (result.code === 0) {
                                        notification["success"]({
                                            message:  '更换分类设置',
                                            description: `更换分类成功!`,
                                        })
                                    } else {
                                        notification["error"]({
                                            message:  '更换分类设置',
                                            description: `更换分类失败!`,
                                        })
                                    }
                                })
                            }}>
                                {this.state.courseCategoryList.map(item=>{
                                    return <Select.Option key={item.id} value={item.id}>{item.title}</Select.Option>
                                })}
                            </Select>
                        }} />

                        <Column title="操作" key="action" dataIndex={"id"} render={((text, record)=>{
                            return (
                                <div>
                                    <Button onClick={()=>{

                                        this.setState({
                                            showIntroPane: true,
                                        })
                                        this._loadCourseInfo(text)
                                    }}>介绍</Button>
                                    <Button onClick={()=>{
                                        this.setState({
                                            showCommentPane: true,
                                            currentCourse: record
                                        }, ()=>{
                                            this._loadComments(record.id)
                                        })
                                    }}>评论</Button>
                                    <Button onClick={()=>{
                                        this.setState({
                                            showOutlinePane: true,
                                            currentCourse: record
                                        }, ()=>{
                                            this._loadOutline(record.id)
                                        })
                                    }}>大纲</Button>
                                    <Button><Link to={"/course/edit/"+record.id}>编辑</Link></Button>
                                    <Button onClick={()=>{
                                        Modal.confirm({
                                            title: '确认要删除此课程吗?',
                                            icon: <ExclamationCircleOutlined />,
                                            content: '此课程的评论以及大纲会联动删除, 不可恢复',
                                            okText: "确认",
                                            cancelText: "取消",
                                            onOk:() => {
                                                deleteCourse(record.id).then(result=>{
                                                    if (result.code === 0) {
                                                        message.success("删除成功")
                                                        this._loadData()
                                                    }else {
                                                        message.error("删除失败")
                                                    }
                                                })
                                            },

                                        })
                                    }}>删除</Button>
                                </div>
                            )
                        })}  align={"center"}/>

                    </Table>
                </Card>

                {/*    介绍 */}
                <Drawer
                    width={500}
                    title= {currentCourse.title + " > 课程介绍"}
                    placement={"left"}
                    closable={true}
                    onClose={()=>{this.setState({showIntroPane: false})}}
                    visible={this.state.showIntroPane}
                    key={"intro"}
                >
                    <div dangerouslySetInnerHTML={{__html: currentCourse.intro}}/>
                </Drawer>

                <Drawer
                    width={400}
                    title= {currentCourse.title + " > 评论列表"}
                    placement={"left"}
                    closable={true}
                    onClose={()=>{this.setState({showCommentPane: false})}}
                    visible={this.state.showCommentPane}
                    key={"comments"}
                >
                    <Timeline mode={"left"}>
                        {courseComments.map(item=>{
                            return <Timeline.Item key={item.comment_id} label={getFormatTimeFromDate(item.comment_time)}>
                                <Avatar size={"small"} src={BaseURL + item.user_header}/>
                                &nbsp;
                                {item.comment_content}
                            </Timeline.Item>
                        })}

                    </Timeline>
                </Drawer>

                <Drawer
                    width={600}
                    title= {currentCourse.title + " > 课程大纲"}
                    placement={"right"}
                    closable={true}
                    onClose={()=>{this.setState({showOutlinePane: false})}}
                    visible={this.state.showOutlinePane}
                    key={"outline"}
                >
                    <div className="dg" style={{height: "42%", overflowY: "auto"}}>
                        <Timeline mode={"left"}>
                            {courseOutline.map(item=>{
                                return <Timeline.Item key={item.id}>
                                    <Button size={"small"} onClick={()=>{
                                        Modal.confirm({
                                            title: "确认删除该章节及其视频吗?",
                                            okText: "确认",
                                            cancelText: "取消",
                                            onOk: () => {
                                                deleteCourseOutline(item.id).then(result=>{
                                                    if (result.code === 0) {
                                                        message.success("删除成功")
                                                        this._loadOutline(currentCourse.id)
                                                    } else {
                                                        message.error("删除失败")
                                                    }
                                                })
                                            }
                                        })
                                    }}>删除</Button>
                                    &nbsp;
                                    <span>{item.num + "-" + item.title}</span>
                                </Timeline.Item>
                            })}

                        </Timeline>
                    </div>
                    <div className="addDG" style={{height: "58%", paddingTop: "5px", overflowY: "auto", boxSizing: "border-box"}}>
                        <Index course_id={currentCourse.id} finishFunc={()=>{
                            this._loadOutline(currentCourse.id)
                        }}/>
                    </div>
                </Drawer>

            </div>
        );
    }
}

export default CourseList;
