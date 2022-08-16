import React, {Component} from "react";
import {Card} from "antd";
import ReactECharts from 'echarts-for-react';
import {getCategoryCourseData} from "../../../../../api/statisticsApi";
class StatisticsCourse extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        getCategoryCourseData().then(result=>{
            this.setState({
                data: result.data
            })
        })
    }

    _getOption = (data) => {
        return {
            xAxis: {
                type: 'category',
                data: data.map(item=>item.category_name)
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: data.map(item=>item.course_count),
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }]
        }
    }
    render() {
        const {data} = this.state;
        return (
            <Card title={"学科课程统计"}>
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}
export default StatisticsCourse;