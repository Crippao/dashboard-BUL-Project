import { useMemo } from 'react';
import BaseChart from "../components/BaseChart";

const PieChart = ({ title, data }) => {
    const series = useMemo(() => {
        if (data == null) {
            return [];
        }
        const s = [
            {
                name: 'Percentage',
                colorByPoint: true,
                data: Object.keys(data).map(e => ({
                    name: e,
                    y: data[e]
                }))
            }
        ]
        return s;
    }, [data])


    return (
        <BaseChart title={title} type={"pie"} series={series} plotOptions={{
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                }],
            },
        }} />
    )
}

export default PieChart;