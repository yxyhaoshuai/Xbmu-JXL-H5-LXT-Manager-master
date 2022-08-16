import React, {Component} from "react";
import "./index.less"
import {Button, Card, message, Popconfirm, Space, Table} from "antd";
import {delCategoryData, getCategoryData} from "../../../../api/categoryApi";
import CategoryAdd from "../../../../components/categoryAdd";
import CategoryEdit from "../../../../components/categoryEdit";


class Category extends Component {
    state = {
        isLoading: true,
        currentEditCategoryData: {},
        categoryData: [],
        showAddOrEditPaneFlag: 0 // 0 全部隐藏, 1 Add, 2 Edit
    }
    _columnConfig = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: "150px"
        }, {
            title: '分类名称',
            dataIndex: 'title',
            key: 'title',
            align: "center"
        }, {
            title: '操作',
            dataIndex: 'id',
            key: 'operation',
            align: "center",
            width: "200px",
            render: (id, data) => {
                return <Space size="middle">
                    <Button onClick={()=>{
                        this.setState({
                            currentEditCategoryData: data
                        })
                        this._showEditPane()
                        // this.editForm.resetFields();

                    }}>编辑</Button>
                    <Popconfirm
                        title="你真的要删除这个分类吗?"
                        onConfirm={() => {
                            // 删除动作
                            delCategoryData(id).then(result => {
                                if (result.code === 0) {
                                    // 删除成功之后做的事情
                                    message.success("分类数据删除成功!")
                                    this._loadCategoryData();
                                } else {
                                    // 删除失败做的事情
                                    message.error("分类数据删除失败!")
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
        },

    ]
    _loadCategoryData = () => {
        this.setState({
            isLoading: true
        })
        getCategoryData().then(result => {
            this.setState({
                isLoading: false,
                categoryData: result.data
            })
        })
    }

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

    componentDidMount() {
        this._loadCategoryData();
    }

    render() {
        const {categoryData, showAddOrEditPaneFlag, currentEditCategoryData, isLoading} = this.state;
        return (
            <>
                <Card title="分类管理" extra={<Button type={"primary"} onClick={this._showAddPane}>新增</Button>}>
                    <Table dataSource={categoryData} columns={this._columnConfig} bordered loading={isLoading} pagination={{
                        defaultPageSize: 5
                    }} rowKey={"id"}/>
                </Card>
                <CategoryAdd visible={showAddOrEditPaneFlag === 1} _hideAllPane={this._hideAllPane} _onFinish={()=>{
                    this._loadCategoryData()
                }}/>
                <CategoryEdit  visible={showAddOrEditPaneFlag === 2}  currentEditCategoryData={currentEditCategoryData} _hideAllPane={this._hideAllPane} _onFinish={()=>{
                    this._loadCategoryData()
                }}/>
            </>

        )
    }
}

export default Category;