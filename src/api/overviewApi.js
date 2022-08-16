import {ajax} from "../tools/ajax";

export const getUserData = () => ajax("/api/manager/over_view/ov_user")
export const getTeacherData = () => ajax("/api/manager/over_view/ov_teacher")
export const getCourseData = () => ajax("/api/manager/over_view/ov_course")
export const getArticleData = () => ajax("/api/manager/over_view/ov_article")

export const getCommentDataWithScore = (score) => ajax("/api/manager/over_view/ov_comment", {score})