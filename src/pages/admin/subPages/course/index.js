import React from "react";
import "./index.less"
import {Route, Switch} from "react-router-dom";
import CourseList from "./subPages/courseList";
import AddCoursePane from "./subPages/addCoursePane";
import EditCoursePane from "./subPages/editCoursePane";

class Course extends React.Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path={"/course"} exact component={CourseList}/>
                    <Route path={"/course/add"} exact component={AddCoursePane}/>
                    <Route path={"/course/edit/:id"} exact component={EditCoursePane}/>
                </Switch>
            </div>
        );
    }
}

export default Course;
