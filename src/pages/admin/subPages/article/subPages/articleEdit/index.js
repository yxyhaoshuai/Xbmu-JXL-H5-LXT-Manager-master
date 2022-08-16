import React, {Component} from "react";
import {Breadcrumb, Button, Card, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import {getArticleDetail, updateArticle} from "../../../../../../api/articleApi";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
class ArticleEdit extends Component {
    state = {
        editData: {}
    }
    _handlerSave = () => {
        this.articleEditForm.validateFields().then(({id, title, intro, content})=>{
            updateArticle(id, title, intro, content).then(result=>{
                if (result.code === 0) {
                    message.success("文章更新成功!")
                    this.props.history.push("/article")
                }else {
                    message.error("新增更新失败!")
                }
            })
        }).catch(error=>{
            message.warn("请检查数据规范")
        })
    }
    _loadData = (id) => {
        getArticleDetail(id).then(result=>{
            this.setState({
                editData: result.data
            })
        })
    }
    componentDidMount() {
        let id = this.props.match.params["id"];
        this._loadData(id)
    }

    render() {
        const {editData} = this.state
        let formPane = <Form
            ref={dom=>this.articleEditForm=dom}
            initialValues={editData}
            {...layout}
            name="basic"
        >
            <Form.Item
                label="文章ID"
                name="id"
                rules={[{ required: true, message: '必须填写文章标题!' }]}
            >
                <Input disabled/>
            </Form.Item>
            <Form.Item
                label="文章标题"
                name="title"
                rules={[{ required: true, message: '必须填写文章标题!' }]}
            >
                <Input placeholder={"请填写文章标题"}/>
            </Form.Item>
            <Form.Item
                label="文章简介"
                name="intro"
                rules={[{ required: true, message: '必须填写文章简介!' }]}
            >
                <Input.TextArea placeholder={"请填写文章简介"}/>
            </Form.Item>
            <Form.Item
                label="文章内容"
                name="content"
                rules={[{ required: true, message: '必须填写文章内容!' }]}
            >
                <RichTextEditor/>
            </Form.Item>

        </Form>
        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/article"}>文章列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>编辑文章</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type="primary" onClick={this._handlerSave}>更新</Button>}>
                {!editData.id ? <div/>: formPane}
            </Card>
        )
    }
}

export default ArticleEdit;