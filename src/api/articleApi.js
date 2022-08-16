import {ajax} from "../tools/ajax";


export const getArticleList = () => ajax("/api/manager/article/list");
export const getArticleDetail = (id) => ajax("/api/manager/article/detail/"+id);
export const delArticleWithID = (id) => ajax("/api/manager/article/delete", {id});
export const addArticle = (title, intro, content) => ajax("/api/manager/article/add", {title, intro, content}, "post")
export const updateArticle = (id, title, intro, content) => ajax("/api/manager/article/update", {id, title, intro, content}, "post")