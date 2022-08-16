import React, {Component} from "react";
import {Button, Card, Drawer, message, Popconfirm, Space, Table} from "antd";
import {delCategoryData} from "../../../../../../api/categoryApi";
import {delArticleWithID, getArticleDetail, getArticleList} from "../../../../../../api/articleApi";
import {getFormatTimeFromDate} from "../../../../../../tools/dateTool";
import {Link} from "react-router-dom";

class ArticleList extends Component {
    state = {
        currentArticleDetail: {},
        articleData: [],
        isLoading: false,
        visible: false
    }
    _showDetailPane = () => {
        this.setState({
            visible: true
        })
    }
    _hideDetailPane = () => {
        this.setState({
            visible: false
        })
    }
    _columnConfig = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: "100px"
        }, {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
            align: "center"
        }, {
            title: '文章时间',
            dataIndex: 'create_time',
            key: 'create_time',
            align: "center",
            render: (text) => {
                return getFormatTimeFromDate(text)
            }
        }, {
            title: '文章简介',
            dataIndex: 'intro',
            key: 'intro',
            align: "center"
        },{
            title: '操作',
            dataIndex: 'id',
            key: 'operation',
            align: "center",
            width: "280px",
            render: (id, data) => {
                return <Space size="middle">
                    <Button onClick={()=>{
                        // 详情数据获取
                        if (data.content === undefined) {
                            getArticleDetail(id).then(result=>{
                                data.content = result.data.content;
                                this.setState({
                                    currentArticleDetail: data
                                })
                            })
                        } else {
                            console.log("加载的是详情缓存")
                            this.setState({
                                currentArticleDetail: data
                            })
                        }

                        this._showDetailPane()
                    }}>详情</Button>
                    <Button><Link to={"/article/edit/"+id}>编辑</Link></Button>
                    <Popconfirm
                        title="你真的要删除这个文章吗?"
                        onConfirm={() => {
                            delArticleWithID(id).then(result=>{
                                if (result.code === 0) {
                                    message.success("文章删除成功!")
                                    let temp = this.state.articleData.filter(item=>item.id!==id);
                                    this.setState({
                                        articleData: temp
                                    })
                                } else {
                                    message.error("文章删除失败!")
                                }
                            })
                            // 删除动作
                            // delCategoryData(id).then(result => {
                            //     if (result.code === 0) {
                            //         // 删除成功之后做的事情
                            //         message.success("分类数据删除成功!")
                            //         this._loadCategoryData();
                            //     } else {
                            //         // 删除失败做的事情
                            //         message.error("分类数据删除成功!")
                            //     }
                            // })
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
    _loadData = () => {
        this.setState({
            isLoading: true
        })
        getArticleList().then(result=>{
            this.setState({
                isLoading: false,
                articleData: result.data
            })
        })
    }
    componentDidMount() {
        this._loadData()
    }

    render() {
        const {articleData, isLoading, visible, currentArticleDetail} = this.state;
        return (
            <>
                <Card title="文章列表" extra={<Button type={"primary"} onClick={() => {
                    this.props.history.push("/article/add")
                }}>新增</Button>}>
                    <Table dataSource={articleData} columns={this._columnConfig} bordered loading={isLoading} pagination={{
                        defaultPageSize: 4
                    }} rowKey={"id"}/>
                </Card>
                <Drawer
                    title={currentArticleDetail.title}
                    placement={"left"}
                    closable={true}
                    maskClosable={false}
                    onClose={this._hideDetailPane}
                    visible={visible}
                    key={"left"}
                    width={"400px"}
                >
                    <div dangerouslySetInnerHTML={{__html: currentArticleDetail.content}}/>
                </Drawer>
            </>

        )
    }
}
export default ArticleList;