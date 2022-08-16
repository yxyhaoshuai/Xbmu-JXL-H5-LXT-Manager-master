import {ajax} from "../tools/ajax";

export const getTeacherList = () => ajax("/api/manager/teacher/list");
export const changeTeacherStar = (id, is_star) => ajax("/api/manager/teacher/update_is_star", {id, is_star}, "post")
export const delTeacherWithID = (id) => ajax("/api/manager/teacher/delete", {id})
export const delTeacherHeader = (file_path) => ajax("/api/manager/teacher/delete_file", {file_path})
export const addTeacher = (name, is_star, intro, header, position) => ajax("/api/manager/teacher/add", {name, is_star, intro, header, position}, "post")
export const updateTeacher = (id, name, is_star, intro, header, position) => ajax("/api/manager/teacher/update", {id, name, is_star, intro, header, position}, "post")