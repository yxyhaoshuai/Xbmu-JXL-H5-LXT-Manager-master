import axios from "axios";
import {message} from "antd"

export const BaseURL = "http://localhost:700"

axios.defaults.baseURL = BaseURL

// 1. 分层解耦
// 2. 业务植入
// 3. 统一API
export function ajax(url, data={}, method="get") {
    return new Promise((resolve, reject)=>{
        if (method.toLowerCase() === "get") {
            axios.get(url, {
                params: data
            }).then(resp=>{
                resolve(resp.data)
            }).catch(error=>{
                message.warn("网络出现问题: " + error.message)
                // reject(error)
            })
        } else if (method.toLowerCase() === "post") {
            axios.post(url, data).then(resp=>{
                resolve(resp.data)
            }).catch(error=>{
                message.warn("网络出现问题: " + error.message)
                // reject(error)
            })
        }
    })

}