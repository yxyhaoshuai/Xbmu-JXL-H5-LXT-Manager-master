import React, {Component} from "react";
import BraftEditor from 'braft-editor'
import "./index.less"
class RichTextEditor extends Component {
    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this.props.value)
    }
    _handleEditorChange = (editorState) => {
        this.setState({ editorState })
        if (typeof this.props.onChange === "function") {
            this.props.onChange(editorState.toHTML())
        }
    }
    _controls = [
        'undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'emoji',  'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator', 'separator',
        'clear'
    ]
    render() {
        const { editorState } = this.state
        const {placeholder=""} = this.props
        return (
            <BraftEditor
                placeholder={placeholder}
                className={"rich-text"}
                controls={this._controls}
                value={editorState}
                onChange={this._handleEditorChange}
            />
        )
    }
} 
export default RichTextEditor;