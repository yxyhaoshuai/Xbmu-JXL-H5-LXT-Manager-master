import React, {Component} from "react";
import {Form, Input, message, Modal} from "antd";
import {addCategoryData} from "../../api/categoryApi";
import PropTypes from 'prop-types';

class CategoryAdd extends Component {
    static defaultProps = {
        visible: false,
        _hideAllPane: () => {},
        _onFinish: () => {}
    }
    static propTypes = {
        visible: PropTypes.bool,
        _hideAllPane: PropTypes.func,
        _onFinish: PropTypes.func,
    }
    render() {
        const {visible, _hideAllPane, _onFinish} = this.props;
        return (
            <Modal title="新增分类" visible={visible}
                   cancelText={"取消"}
                   okText={"提交"}
                // destroyOnClose={true}
                   onOk={() => {
                       // this._hideAllPane()
                       // 1. 获取表单数据
                       this.addForm.validateFields().then(result=>{
                           // 2. 调用后端接口
                           addCategoryData(result.title).then(res=>{
                               if (res.code === 0) {
                                   // 3. 新增成功-> 给用户提示 -> 刷新表格
                                   // 4. 关闭模态窗口
                                   _hideAllPane()
                                   this.addForm.resetFields()
                                   message.success("新增分类成功!")
                                   _onFinish()
                               } else {
                                   message.error("新增分类失败!")
                               }
                           })
                       }).catch(()=>{
                           message.warn("请确认输入的内容规则!")
                       })

                   }}
                   onCancel={() => {
                       _hideAllPane()
                   }}
            >
                <Form ref={dom=>this.addForm=dom} name="add_category">
                    <Form.Item
                        label=""
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
export default CategoryAdd;