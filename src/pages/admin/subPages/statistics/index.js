import React, {Component} from "react";
import "./index.less"
import {Switch, Route} from "react-router-dom"
import StatisticsCourse from "./subPages/statisticsCourse";
import StatisticsUser from "./subPages/statisticsUser";
import StatisticsComment from "./subPages/statisticsComment";
class Statistics extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={"/chart/bar"} component={StatisticsCourse}/>
                    <Route path={"/chart/line"} component={StatisticsUser}/>
                    <Route path={"/chart/pie"} component={StatisticsComment}/>
                </Switch>
            </div>
        )
    }
}
export default Statistics;