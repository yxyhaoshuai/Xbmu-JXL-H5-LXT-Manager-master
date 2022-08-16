import React, {Component} from "react";
import {Card} from "antd";
import ReactECharts from 'echarts-for-react';
import {getCommentData, getWeekUserData} from "../../../../../api/statisticsApi";
class StatisticsComment extends Component {

    state = {
        data: []
    }

    componentDidMount() {
        getCommentData().then(result=>{
            this.setState({
                data: result.data
            })
        })
    }

    _getOption = (data) => {
        return  {
            legend: {
                top: 'bottom'
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [50, 100],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
                    data: data.map(item=>({value: item.score_count, name: item.score+"分"}))
                }
            ]
        }
    }
    render() {
        const {data} = this.state;
        return (
            <Card title={"分数分布统计"}>
                <ReactECharts option={this._getOption(data)} />
            </Card>
        )
    }
}
export default StatisticsComment;