import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DotChartOutlined } from '@ant-design/icons';
import { Skeleton, } from 'antd';
import { delay } from '../lib/utils';

const BaseChart = ({ type, title, series, plotOptions, xAxis, yAxis, constructorType = "chart" }) => {

    const [opt, setOpt] = useState(null);

    const getOptions = async () => {
        await delay(500);

        let opt = {};

        if (xAxis == null && yAxis == null) {
            opt = {
                chart: {
                    type: type
                },
                title: {
                    text: title
                },
                plotOptions: plotOptions,
                series: series
            };
        } else {
            opt = {
                chart: {
                    type: type
                },
                title: {
                    text: title
                },
                xAxis: xAxis,
                yAxis: yAxis,
                plotOptions: plotOptions,
                series: series
            };
        }

        setOpt(opt);
    };

    useEffect(() => {
        getOptions();
    }, [type, title, series, plotOptions, xAxis, yAxis, constructorType]);

    if (opt == null) {
        return (<div className='flex justify-center items-center'>
            <Skeleton.Node className='h-[400px] !flex justify-center items-center' active={true}>
                <DotChartOutlined
                    style={{
                        fontSize: 40,
                        color: '#bfbfbf',
                    }}
                />
            </Skeleton.Node>
        </div>)
    }

    return (
        <HighchartsReact highcharts={Highcharts} options={opt} constructorType={constructorType} />
    )
}

export default BaseChart;