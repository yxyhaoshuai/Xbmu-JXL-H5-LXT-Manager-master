import React, {Component} from "react";
import {Button, Layout, Modal} from "antd";
import "./index.less"
import {withRouter} from "react-router-dom";
import {getUser, logout} from "../../api/adminApi";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {getCurrentFormatTime} from "../../tools/dateTool";

const {Header} = Layout;

class RightTop extends Component {
    state = {
        nickName: getUser().nick_name,
        // currentTime: getCurrentFormatTime()
        currentTime: ""
    }
    _handlerLogout = () => {
        Modal.confirm({
            title: '您确定退出登录吗 ?',
            icon: <ExclamationCircleOutlined/>,
            content: '您可以保留登录,下次不用登录',
            okText: "退出登录",
            cancelText: "取消",
            onOk: () => {
                // console.log('OK');
                logout()
                this.props.history.replace("/login")
            }
        });
    }
    componentDidMount() {
        getCurrentFormatTime()
        // this.timer = setInterval(()=>{
        //     this.setState({
        //         currentTime: getCurrentFormatTime()
        //     })
        // }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <Header className="right-top" style={{padding: 0}}>
                <div className="pane">
                    <div className="top">
                        <span className="nick_name">欢迎您!: {this.state.nickName}</span>
                        <Button type="primary" danger onClick={this._handlerLogout}>
                            退出
                        </Button>
                    </div>
                    <div className="bottom">
                        {this.state.currentTime}
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightTop);