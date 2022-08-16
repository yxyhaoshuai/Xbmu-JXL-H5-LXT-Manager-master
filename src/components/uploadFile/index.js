import React, {Component} from "react";
import {Button, message, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import "./index.less"

const fileTypeConfig = {
    "image": "image/*",
    "video": "video/*"
}
class UploadFile extends Component {
    state = {
        filePath: this.props.value || ""
    }
    G_getFilePath() {
        return this.state.filePath
    }
    _uploadProps = {
        accept: fileTypeConfig[this.props.fileType],
        name: this.props.name,
        action: this.props.action,
        beforeUpload: (file) => {
            if (typeof this.props.checkFile === "function") {
                return this.props.checkFile(file)
            }
            return true
        },
        onChange: (info) => {
            // console.log("上传中...", info)
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} 文件上传成功!`);
                let filePath = info.file.response.data.file_path;
                if (typeof this.props.onChange === "function") {
                    this.props.onChange(filePath)
                }
                this.setState({
                    filePath
                })
            } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败!`);
            }
        },
    };
    _handlerDeleteFile = () => {
        if (typeof this.props.delFile === "function") {
            this.props.delFile(this.state.filePath)
            this.setState({
                filePath: ""
            })
            if (typeof this.props.onChange === "function") {
                this.props.onChange("")
            }
        }
    }
    render() {
        const {filePath} = this.state;
        const {previewBaseURL=""} = this.props;
        let imagePane = <div className={"image-pane"}>
            <img className={"image"} src={previewBaseURL + filePath} alt=""/>
            <Button className={"del_btn"} type={"primary"} danger onClick={this._handlerDeleteFile}>删除</Button>
        </div>

        let videoPane = <div className={"video-pane"}>
            <video className={"video"} src={previewBaseURL + filePath} controls={true}/>
            <Button className={"del_btn"} type={"primary"} danger onClick={this._handlerDeleteFile}>删除</Button>
        </div>

        let previewPane = this.props.fileType === "image" ? imagePane : videoPane;

        let uploadPane = <Upload.Dragger {...this._uploadProps}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或者拖拽上传</p>
            <p className="ant-upload-hint">
                仅支持单文件上传
            </p>
        </Upload.Dragger>

        return (
            <div>
                {filePath.length > 0 ? previewPane : uploadPane}
            </div>
        )
    }
}
export default UploadFile;