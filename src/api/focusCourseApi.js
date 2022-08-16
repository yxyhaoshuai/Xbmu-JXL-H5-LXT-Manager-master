import {ajax} from "../tools/ajax";


export const getFocusCourseList = () => ajax("/api/manager/ad_course/list");
export const delFocusCourseWithID = (id) => ajax("/api/manager/ad_course/delete", {id})
export const deleFocusCourseImage = (file_path) => ajax("/api/manager/ad_course/delete_file", {file_path})
export const getFocusLinkCourse = () => ajax("/api/manager/ad_course/link_course")
export const addFocusCourse = (title, ad_url, course_id) => ajax("/api/manager/ad_course/add", {title, ad_url, course_id}, "post")

export const updateFocusCourse = (id, title, ad_url, course_id) => ajax("/api/manager/ad_course/update", {id, title, ad_url, course_id}, "post")