import {ajax} from "../tools/ajax";

export const getCourseList = (page_num=1, page_size=3) => ajax("/api/manager/course/list", {page_num, page_size})
export const getCourseInfo= (id) => ajax("/api/manager/course/intro", {id})
export const getCourseDetail= (id) => ajax("/api/manager/course/detail", {id})
export const getCourseOwnTeacher = () => ajax("/api/manager/course/own_teachers")
export const getCourseOwnCategory = () => ajax("/api/manager/course/own_categories")
export const getCourseComments = (course_id) => ajax("/api/manager/course/comments", {course_id})
export const getCourseOutline = (course_id) => ajax("/api/manager/course/outlines", {course_id})

export const updateCourse = (id, title, fm_url, is_hot, intro, teacher_id, category_id) => ajax("/api/manager/course/update", {id, title, fm_url, is_hot, intro, teacher_id, category_id}, "post")
export const updateCourseHot = (id, is_hot) => ajax("/api/manager/course/update_is_hot", {id, is_hot}, "post")
export const updateCourseTeacher = (id, teacher_id) => ajax("/api/manager/course/update_teacher", {id, teacher_id}, "post")
export const updateCourseCategory = (id, category_id) => ajax("/api/manager/course/update_category", {id, category_id}, "post")


export const addCourseOutline = (course_id, num, title, video_url) => ajax("/api/manager/course/add_outline", {course_id, num, title, video_url}, "post")
export const deleteCourseOutline = (outline_id) => ajax("/api/manager/course/del_outline", {outline_id})
export const deleteCourseImg = (file_path) => ajax("/api/manager/course/delete_file", {file_path})
export const deleteCourseVideo = deleteCourseImg


export const deleteCourse = (id) => ajax("/api/manager/course/delete", {id})
export const addCourse = (title, fm_url, is_hot, intro, teacher_id, category_id) => ajax("/api/manager/course/add", {title, fm_url, is_hot, intro, teacher_id, category_id}, "post")


