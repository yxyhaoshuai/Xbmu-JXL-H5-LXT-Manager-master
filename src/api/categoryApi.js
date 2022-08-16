import {ajax} from "../tools/ajax";

export const getCategoryData = () => ajax("/api/manager/category/list")
export const delCategoryData = (id) => ajax("/api/manager/category/delete", {id})
export const addCategoryData = (title) => ajax("/api/manager/category/add", {title}, "post")
export const updateCategoryData = (id, title) => ajax("/api/manager/category/update", {id, title}, "post")