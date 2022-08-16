import {ajax} from "../tools/ajax";


export const delConfigImg = (file_path) => ajax("/api/manager/config/delete_file", {file_path})
export const getConfigData = () => ajax("/api/manager/config/detail")
export const updateConfigData = (id, app, wb_qrcode, tel, mini_program, wechat_qrcode) => ajax("/api/manager/config/update", {id, app, wb_qrcode, tel, mini_program, wechat_qrcode}, "post")