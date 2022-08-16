import {ajax} from "../tools/ajax";
import store from "store"

const USERKEY = "USERKEY"

export const saveUser = (userObj) => {
    store.set(USERKEY, userObj)
}

export const getUser = () => {
    return store.get(USERKEY) || {}
}

export const isLogin = () => {
    let user = getUser()
    return user.id !== undefined;
}

export const logout = () => {
    store.remove(USERKEY)
}

export const checkLogin = (account, password) => ajax("/api/manager/admin/login", {account, password}, "post")