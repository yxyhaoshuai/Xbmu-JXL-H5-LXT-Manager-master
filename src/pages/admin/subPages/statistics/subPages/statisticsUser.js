import React, {Component} from "react";
import {Card} from "antd";
import ReactECharts from 'echarts-for-react';
import {getWeekUserData} from "../../../../../api/statisticsApi";
import {getFormatTimeFromDate} from "../../../../../tools/dateTool";
class StatisticsUser extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        getWeekUserData().then(result=>{
            this.setState({
                data: result.data
            })
        })
    }

    _getOption = (data) => {
        return {
            xAxis: {
                type: 'category',
                data: data.map(item=>getFormatTimeFromDate(item.register_time))
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.map(item=>item.register_count),
                type: 'line'
            }]
        }
    }
    render() {
        const {data} = this.state;
        return (
            <Card title={"用户增长统计"}>
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}
export default StatisticsUser;