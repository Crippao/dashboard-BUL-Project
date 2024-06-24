/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from 'react';
import Highcharts from 'highcharts';
import loadMapModule from "highcharts/modules/map";
import loadMarkerModule from "highcharts/modules/marker-clusters";
import loadAccesibilityModule from "highcharts/modules/accessibility";
import HighchartsReact from 'highcharts-react-official';
import { ConstructorTypes } from "../lib/enums/";
import { Maps } from "../lib/maps-topology";
import { Card } from 'antd';
import { getDataOneForMap, getDataTwoForMap } from '../lib/service';
import { DotChartOutlined } from '@ant-design/icons';
import { Skeleton, } from 'antd';


// eslint-disable-next-line no-undef
loadMapModule(Highcharts);
loadMarkerModule(Highcharts);
loadAccesibilityModule(Highcharts);

const ItalyMap = () => {

    const [dataSeriesOne, setDataSeriesOne] = useState(null);
    const [dataSeriesTwo, setDataSeriesTwo] = useState(null);

    const getData = async () => {
        const resOne = await getDataOneForMap()
        const resTwo = await getDataTwoForMap()

        const seriesOne = []
        resOne.features.map((objOne) => {

            let pointOne = {
                name: objOne.properties.comune,
                lat: parseFloat(objOne.properties.lat),
                lon: parseFloat(objOne.properties.lng),
            }

            seriesOne.push(pointOne)
        })

        const seriesTwo = []
        resTwo.features.map((objTwo) => {

            let pointTwo = {
                name: objTwo.properties.comune,
                lat: parseFloat(objTwo.properties.lat),
                lon: parseFloat(objTwo.properties.lng),
            }

            seriesTwo.push(pointTwo)
        })

        console.log(seriesTwo)
        setDataSeriesOne(seriesOne)
        setDataSeriesTwo(seriesTwo)
    }

    useEffect(() => {
        getData();
    }, [])

    var opt = useMemo(() => {
        if (dataSeriesOne == null || dataSeriesTwo == null) {
            return null;
        }

        return {
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        chart: {
                            height: (9 / 16 * 300) + '%'
                        },
                    }
                }]
            },
            chart: {
                map: Maps.itRegion,
                animation: true,
                height: (9 / 16 * 90) + '%'
            },
            title: {
                text: 'Copertura nazionale per Fibra e FWA'
            },
            mapNavigation: {
                enabled: true
            },
            tooltip: {
                formatter: function () {
                    if (this.point.clusteredData) {
                        return 'Clustered points: ' +
                            this.point.clusterPointsAmount;
                    }
                    return '<b>' + this.key + '</b><br>Lat: ' +
                        this.point.lat.toFixed(2) + ', Lon: ' +
                        this.point.lon.toFixed(2);
                }
            },
            plotOptions: {
                mappoint: {
                    cluster: {
                        enabled: true,
                        allowOverlap: false,
                        // animation: {
                        //     duration: 450
                        // },
                        layoutAlgorithm: {
                            type: 'optimalizedKmeans',
                            gridSize: 70
                        },
                        zones: [{
                            from: 1,
                            to: 4,
                            marker: {
                                radius: 13
                            }
                        }, {
                            from: 5,
                            to: 9,
                            marker: {
                                radius: 15
                            }
                        }, {
                            from: 10,
                            to: 15,
                            marker: {
                                radius: 17
                            }
                        }, {
                            from: 16,
                            to: 20,
                            marker: {
                                radius: 19
                            }
                        }, {
                            from: 21,
                            to: 100,
                            marker: {
                                radius: 21
                            }
                        }]
                    }
                }
            },
            series: [
                {
                    name: 'Italy',
                    borderColor: '#A0A0A0',
                    nullColor: 'rgba(200, 200, 200, 0.3)',
                    showInLegend: false,
                },
                {
                    type: 'mappoint',
                    enableMouseTracking: true,
                    colorKey: 'clusterPointsAmount',
                    color: "#3e8381",
                    name: 'Città senza Fibra e FWA',
                    data: dataSeriesOne
                },
                {
                    type: 'mappoint',
                    enableMouseTracking: false,
                    colorKey: 'clusterPointsAmount',
                    color: "#7c98ec",
                    name: 'Città con Fibra e/o FWA',
                    boostThreshold: 8000,
                    data: dataSeriesTwo
                }
            ]
        };
    }, [dataSeriesOne, dataSeriesTwo])

    if (dataSeriesOne == null || dataSeriesTwo == null || opt == null) {
        return (
            <div className='flex justify-center items-center'>
                <Skeleton.Node className='h-[400px] !flex justify-center items-center' active={true}>
                    <DotChartOutlined
                        style={{
                            fontSize: 40,
                            color: '#bfbfbf',
                        }}
                    />
                </Skeleton.Node>
            </div>
        )
    }
    return (
        <Card>
            <div className='block min-h-[90vh]'>
                <HighchartsReact highcharts={Highcharts} options={opt} constructorType={ConstructorTypes.MapChart} />
            </div>
        </Card>


    )
}

export default ItalyMap;