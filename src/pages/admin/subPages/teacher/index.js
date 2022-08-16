import React, {Component} from "react";
import "./index.less"
import {Button, Card, Table, Avatar, Switch, notification, Space, Popconfirm, message} from "antd";
import {changeTeacherStar, delTeacherWithID, getTeacherList} from "../../../../api/teacherApi";
import {BaseURL} from "../../../../tools/ajax";
import TeacherAdd from "../../../../components/teacherAdd";
import TeacherEdit from "../../../../components/teacherEdit";

class Teacher extends Component {
    state = {
        showAddOrEditPaneFlag: 0, // 0 隐藏全部, 1, 新增, 2: 编辑
        teacherList: [],
        editTeacherModel: {}
    }

    _columnConfig = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: "80px"
        },{
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            align: "center",
            width: "150px"
        },{
            title: '是否星级',
            dataIndex: 'is_star',
            key: 'is_star',
            align: "center",
            width: "100px",
            render: (text, model) => {
                return <Switch checkedChildren="是" unCheckedChildren="否" checked={text} onChange={(checked)=>{
                    changeTeacherStar(model.id, +checked).then(result=>{
                        if (result.code === 0) {
                            // 给用户一个提示
                            notification["success"]({
                                message: '明星讲师设置',
                                description: `设置 ${model.name} 讲师, 为 ${checked ? "星级": "非星级"}`,
                            });
                            this.state.teacherList.find(item=>item.id===model.id).is_star = checked;

                            this.forceUpdate();
                        } else {

                        }
                    })
                }} />
            }
        },{
            title: '职位',
            dataIndex: 'position',
            key: 'position',
            align: "center",
            width: "100px"
        },{
            title: '头像',
            dataIndex: 'header',
            key: 'header',
            align: "center",
            width: "100px",
            render: (text) => {
                return <Avatar size={64} src={BaseURL + text} />
            }
        },{
            title: '简介',
            dataIndex: 'intro',
            key: 'intro',
            align: "center"
        },{
            title: "操作",
            dataIndex: "id",
            key: "operation",
            align: "center",
            width: "200px",
            render: (id, data) => {
                return <Space size="middle">
                    <Button onClick={()=>{
                        this._showEditPane();
                        this.setState({
                            editTeacherModel: data
                        })
                    }}>编辑</Button>
                    <Popconfirm
                        title="你真的要删除这个讲师吗?"
                        onConfirm={() => {
                            // 删除动作
                            delTeacherWithID(id).then(result=>{
                                if (result.code === 0) {
                                    // 删除成功
                                    message.success("删除讲师成功!")
                                    this.setState(preState => {
                                        return {
                                            teacherList: preState.teacherList.filter(item=>item.id !== id)
                                        }
                                    })
                                } else {
                                    message.error("删除讲师失败!")
                                }
                            })
                        }}
                        okText="强行删除"
                        cancelText="考虑下"
                    >
                        <Button danger>删除</Button>
                    </Popconfirm>
                </Space>
            }
        }
    ]
    _showAddPane = () => {
        this.setState({
            showAddOrEditPaneFlag: 1
        })
    }
    _showEditPane = () => {
        this.setState({
            showAddOrEditPaneFlag: 2
        })
    }
    _hideAllPane = () => {
        this.setState({
            showAddOrEditPaneFlag: 0
        })
    }
    _loadTeacherData = () => {
        getTeacherList().then(result=>{
            this.setState({
                teacherList: result.data
            })
        })
    }
    componentDidMount() {
        this._loadTeacherData()
    }
    render() {
        const {teacherList, showAddOrEditPaneFlag, editTeacherModel} = this.state;
        return (
            <>
                <Card title="讲师列表" extra={<Button type={"primary"} onClick={this._showAddPane}>新增</Button>}>
                    <Table bordered={true} dataSource={teacherList} columns={this._columnConfig} rowKey={"id"}  pagination={{
                        defaultPageSize: 3
                    }} />
                </Card>
                <TeacherAdd visible={showAddOrEditPaneFlag === 1} _hideAllPane={this._hideAllPane} _onFinish={this._loadTeacherData}/>
                <TeacherEdit visible={showAddOrEditPaneFlag === 2} _hideAllPane={this._hideAllPane} _onFinish={this._loadTeacherData} editTeacherModel={editTeacherModel}/>
            </>
        )
    }
}
export default Teacher;