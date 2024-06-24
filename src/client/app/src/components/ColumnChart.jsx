import { useMemo } from 'react';
import BaseChart from "../components/BaseChart";

const ColumnChart = ({ title, dataSeriesOne, dataSeriesTwo, dataSeriesThree, xAxisCategories }) => {
    const series = useMemo(() => {
        if (dataSeriesOne == null || dataSeriesTwo == null) {
            return [];
        }

        let s = [];

        if (dataSeriesThree == null) {
            s = [
                {
                    name: 'Fibra',
                    data: Object.keys(dataSeriesOne).map(e => ({
                        name: e,
                        y: dataSeriesOne[e]
                    }))
                },
                {
                    name: 'FWA',
                    data: Object.keys(dataSeriesTwo).map(e => ({
                        name: e,
                        y: dataSeriesTwo[e]
                    }))
                }
            ]
        } else {
            s = [{
                name: 'In Esecuzione',
                data: Object.keys(dataSeriesOne).map(e => ({
                    name: e,
                    y: dataSeriesOne[e]
                }))
            },
            {
                name: 'In Progettazione',
                data: Object.keys(dataSeriesTwo).map(e => ({
                    name: e,
                    y: dataSeriesTwo[e]
                }))
            },
            {
                name: 'Terminati',
                data: Object.keys(dataSeriesThree).map(e => ({
                    name: e,
                    y: dataSeriesThree[e]
                }))
            }
            ]
        }

        return s;
    }, [dataSeriesOne, dataSeriesTwo])


    return (
        <BaseChart title={title} type={"column"} series={series}
            plotOptions={{
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            }}
            xAxis={{
                categories: xAxisCategories,
                crosshair: true,
                accessibility: {
                    description: 'Regioni'
                }
            }}
            yAxis={{
                min: 0,
                title: {
                    text: 'Cantieri'
                }
            }}
        />
    )
}

export default ColumnChart;