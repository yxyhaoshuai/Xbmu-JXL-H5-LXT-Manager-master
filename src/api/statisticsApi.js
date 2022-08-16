
import {ajax} from "../tools/ajax";

export const getCategoryCourseData = () => ajax("/api/manager/statistics/category_course_count");
export const getWeekUserData = () => ajax("/api/manager/statistics/user_week_count");
export const getCommentData = () => ajax("/api/manager/statistics/comment_score_count");