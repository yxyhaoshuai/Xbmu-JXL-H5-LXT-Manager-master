import React, {Component} from "react";
import "./index.less"
import {Button, Card, Carousel, Descriptions, Divider, message, Popconfirm} from "antd";
import {DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";
import {BaseURL} from "../../../../tools/ajax";
import {delFocusCourseWithID, getFocusCourseList} from "../../../../api/focusCourseApi";
import FocusCourseAdd from "../../../../components/focusCourseAdd";
import FocusCourseEdit from "../../../../components/focusCourseEdit";

class FocusCourse extends Component {
    state = {
        showFlag: 0,
        to: 0,
        focusCourseList: []
    }
    _handlerChange = (from, to) => {
        // console.log(from, to)
        this._leftDOM.goTo(to)
        this._rightDOM.goTo(to)
        this.setState({
            to
        })
    }
    _handlerPre = () => {
        this._leftDOM.prev()
        this._rightDOM.prev()
    }
    _handlerNext = () => {
        this._leftDOM.next()
        this._rightDOM.next()
    }

    _loadData = () => {
        getFocusCourseList().then(result => {
            this.setState({
                focusCourseList: result.data
            })
        })
    }

    componentDidMount() {
        this._loadData()
    }

    _handlerDelete = () => {
        // id
        let item = this.state.focusCourseList[this.state.to];
        console.log(item)
        delFocusCourseWithID(item.id).then(result => {
            if (result.code === 0) {
                message.success("删除焦点课程成功!")
                this._loadData()
            } else {
                message.error("删除焦点课程失败!")
            }
        })
    }
    _hideAllPane = () => {
        this.setState({
            showFlag: 0
        })
    }

    render() {
        const {focusCourseList, to, showFlag} = this.state;
        let extra = <>
            <Button type={"primary"}  onClick={()=>{
                this.setState({
                    showFlag: 2
                })
            }
            }>编辑</Button>
            <Divider type="vertical"/>
            <Button onClick={()=>{
                this.setState({
                    showFlag: 1
                })
            }
            }>新增</Button>
            <Divider type="vertical"/>
            <Popconfirm
                title="是否确认要删除这个焦点课程广告"
                onConfirm={this._handlerDelete}
                okText="确认"
                cancelText="在考虑一下"
            >
                <Button danger>删除</Button>
            </Popconfirm>
        </>

        return (
            <>
                <Card className={"focus-course"} title={"焦点课程管理"} extra={extra}>
                    <div className="top">
                        <div className="pre" onClick={this._handlerPre}>
                            <DoubleLeftOutlined/>
                        </div>
                        <div className="left">
                            <Carousel ref={dom => this._leftDOM = dom} beforeChange={this._handlerChange}>
                                {focusCourseList.map(item => (
                                    <div className={"item"} key={item.id}>
                                        <img className={"image"} src={BaseURL + item.ad_url} alt=""/>
                                        <h3 className={"title"}>{item.title}</h3>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="right">
                            <Carousel ref={dom => this._rightDOM = dom} beforeChange={this._handlerChange}>
                                {focusCourseList.map(item => (
                                    <div className={"item"} key={item.id}>
                                        <img className={"image"} src={BaseURL + item.fm_url} alt=""/>
                                        <h3 className={"title"}>{item.course_title}</h3>
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                        <div className="next" onClick={this._handlerNext}>
                            <DoubleRightOutlined/>
                        </div>


                    </div>
                    <Divider orientation="left">焦点图详情描述</Divider>
                    <div className="bottom">
                        {!focusCourseList[to] ? <div/> : <Descriptions column={4}>
                            <Descriptions.Item label="焦点图ID">{focusCourseList[to].id}</Descriptions.Item>
                            <Descriptions.Item label="焦点图标题">{focusCourseList[to].title}</Descriptions.Item>
                            <Descriptions.Item label="课程ID">{focusCourseList[to].course_id}</Descriptions.Item>
                            <Descriptions.Item label="课程标题">{focusCourseList[to].course_title}</Descriptions.Item>
                        </Descriptions>}
                    </div>
                </Card>
                <FocusCourseAdd visible={showFlag === 1} _hideAllPane={this._hideAllPane} onFinish={()=>{
                    this._hideAllPane()
                    this._loadData()
                }}/>
                <FocusCourseEdit editFocusCourse={focusCourseList[to]} visible={showFlag === 2} _hideAllPane={this._hideAllPane} onFinish={()=>{
                    this._hideAllPane()
                    this._loadData()
                }}/>
            </>
        )
    }
}

export default FocusCourse;