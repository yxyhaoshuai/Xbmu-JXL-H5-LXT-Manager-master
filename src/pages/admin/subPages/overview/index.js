import React, {Component} from "react";
import "./index.less"
import {Avatar, Card, Comment, Statistic, Tabs, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {ArrowUpOutlined} from "@ant-design/icons";
import {
    getArticleData,
    getCommentDataWithScore,
    getCourseData,
    getTeacherData,
    getUserData
} from "../../../../api/overviewApi";
import {BaseURL} from "../../../../tools/ajax";
import {getFormatTimeFromDate} from "../../../../tools/dateTool";

const {TabPane} = Tabs;

class Overview extends Component {
    state = {
        userData: {},
        teacherData: {},
        courseData: {},
        articleData: {},
        commentDataWithScore: {}
    }
    _getCommentDataWithScore = (score) => {
        if (this.state.commentDataWithScore[score]) {
            return;
        }
        // console.log("发送网络请求, 获取分数评论数据")
        getCommentDataWithScore(score).then(result=>{
            this.setState(preState=>{
                preState.commentDataWithScore[score] = result.data
                return {
                    commentDataWithScore: preState.commentDataWithScore
                }
            })
        })
    }
    componentDidMount() {

        this._getCommentDataWithScore(5)

        getUserData().then(result => {
            this.setState({
                userData: result.data
            })
        })
        getTeacherData().then(result=>{
            this.setState({
                teacherData: result.data
            })
        })
        getCourseData().then(result=>{
            this.setState({
                courseData: result.data
            })
        })
        getArticleData().then(result=>{
            this.setState({
                articleData: result.data
            })
        })
    }

    _handlerTabChange = (key) => {
        // console.log(key)
        this._getCommentDataWithScore(key)
    }
    render() {
        const {userData, teacherData, courseData, articleData, commentDataWithScore} = this.state;
        return (
            <div className="overview">
                <div className="top">
                    <Card title="用户概览" style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="今日注册"
                                value={userData.today}
                                valueStyle={{color: '#3f8600'}}
                                prefix={<ArrowUpOutlined/>}
                            />
                            <Statistic
                                title="总人数"
                                value={userData.total}
                                valueStyle={{color: 'grey'}}
                            />
                        </div>
                    </Card>
                    <Card title="讲师概览" extra={<Link to="/teacher">更多</Link>} style={{width: 300}}>
                        <div className="card">
                            <Statistic
                                title="总人数"
                                value={teacherData.total}
                                valueStyle={{color: 'tomato'}}
                            />
                        </div>
                    </Card>
                    <Card title="课程概览" extra={<Link to="/course">更多</Link>} style={{width: 300}}>
                        <div className="card">
                            <Statistic
                                title="总门数"
                                value={courseData.total}
                                valueStyle={{color: 'tomato'}}
                            />
                        </div>
                    </Card>
                    <Card title="文章概览" extra={<Link to="/article">更多</Link>} style={{width: 300}}>
                        <div className={"card"}>
                            <Statistic
                                title="总篇数"
                                value={articleData.total}
                                valueStyle={{color: 'grey'}}
                            />
                        </div>
                    </Card>
                </div>
                <div className="bottom">
                    <Tabs defaultActiveKey="5" onChange={this._handlerTabChange}>
                        {
                            [5, 4, 3, 2, 1].map(item=>{
                                return <TabPane tab={item + "分评论"} key={item}>
                                    {(commentDataWithScore[item] || []).map(commentData=>(
                                        <Comment
                                            key={commentData.comment_id}
                                            actions={[]}
                                            author={<a>{commentData.user_name}</a>}
                                            avatar={
                                                <Avatar
                                                    src={BaseURL + commentData.user_header}
                                                    alt={commentData.user_name}
                                                />
                                            }
                                            content={
                                                <p>
                                                    {commentData.comment_content}
                                                </p>
                                            }
                                            datetime={
                                                <Tooltip title={getFormatTimeFromDate(commentData.comment_time)}>
                                                    <span>{getFormatTimeFromDate(commentData.comment_time)}</span>
                                                </Tooltip>
                                            }
                                        />
                                    ))}

                                </TabPane>
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Overview;