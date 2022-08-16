import React, {Component} from "react";
import {Breadcrumb, Button, Card, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import RichTextEditor from "../../../../../../components/richTextEditor";
import {addArticle} from "../../../../../../api/articleApi";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
class ArticleAdd extends Component {
    _handlerSave = () => {
        this.articleAddForm.validateFields().then(({title, intro, content})=>{
            addArticle(title, intro, content).then(result=>{
                if (result.code === 0) {
                    message.success("新增文章成功!")
                    this.props.history.push("/article")
                }else {
                    message.error("新增文章失败!")
                }
            })
        }).catch(error=>{
            message.warn("请检查数据规范")
        })
    }
    render() {
        return (
            <Card title={
                <Breadcrumb>
                    <Breadcrumb.Item><Link to={"/article"}>文章列表</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>新增文章</Breadcrumb.Item>
                </Breadcrumb>
            } extra={<Button type="primary" onClick={this._handlerSave}>保存</Button>}>
                <Form
                    ref={dom=>this.articleAddForm=dom}
                    {...layout}
                    name="basic"
                >
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

            </Card>
        )
    }
}
export default ArticleAdd;