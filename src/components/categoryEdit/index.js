import React, {Component} from "react";
import {updateCategoryData} from "../../api/categoryApi";
import {Form, Input, message, Modal} from "antd";
import PropTypes from "prop-types";

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};

class CategoryEdit extends Component {
    static defaultProps = {
        visible: false,
        _hideAllPane: () => {},
        _onFinish: () => {},
        currentEditCategoryData: {}
    }
    static propTypes = {
        visible: PropTypes.bool,
        _hideAllPane: PropTypes.func,
        _onFinish: PropTypes.func,
        currentEditCategoryData: PropTypes.object
    }
    render() {
        const {visible, _hideAllPane, _onFinish, currentEditCategoryData} = this.props;
        return (
            <Modal title="编辑分类" visible={visible}
                   cancelText={"取消"}
                   okText={"提交"}
                   destroyOnClose={true}
                   onOk={() => {
                       // this._hideAllPane()
                       this.editForm.validateFields().then(({id, title})=>{
                           updateCategoryData(id, title).then(res=>{
                               if (res.code === 0) {
                                   _hideAllPane()
                                   message.success("更新分类成功!")
                                   _onFinish()
                               } else {
                                   message.error("更新分类失败!")
                               }
                           })
                       }).catch(()=>{
                           message.warn("请确认输入的内容规则!")
                       })
                   }}
                   onCancel={() => {
                       _hideAllPane()
                   }}>
                <Form {...layout} ref={dom=>this.editForm=dom} name="edit_category" initialValues={currentEditCategoryData}>
                    <Form.Item
                        label="ID"
                        name="id"
                        rules={[{ required: true, message: '请输入分类名称!' }]}
                    >
                        <Input disabled/>
                    </Form.Item>
                    <Form.Item
                        label="分类名称"
                        name="title"
                        rules={[{ required: true, message: '请输入分类名称!' }]}
                    >
                        <Input placeholder={"请输入分类名称"}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
export default CategoryEdit;