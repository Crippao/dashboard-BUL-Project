import { useEffect, useState } from 'react';
import { Card } from "antd";
import { getDataForNationalColumnChartBuildingSiteOpenOrNot } from '../../../lib/service';
import ColumnChart from '../../ColumnChart';


const CantieriApertieNon = () => {

    const [region, setRegion] = useState(null);
    const [dataFibra, setDataFibra] = useState(null);
    const [dataFWA, setDataFWA] = useState(null);
    const [title, setTitle] = useState(null);

    const getData = async () => {
        const dataColChart1 = await getDataForNationalColumnChartBuildingSiteOpenOrNot();

        const regionsFibra = Object.keys(dataColChart1.Fibra);
        const regionsFWA = Object.keys(dataColChart1.FWA);

        const uniqueRegions = new Set([...regionsFibra, ...regionsFWA]);

        const uniqueRegionsArray = Array.from(uniqueRegions);

        const title = 'Cantieri aperti e non aperti, per Fibra e FWA';

        setRegion(uniqueRegionsArray);
        setDataFibra(dataColChart1.Fibra);
        setDataFWA(dataColChart1.FWA);
        setTitle(title)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Card>
            <ColumnChart title={title} dataSeriesOne={dataFWA} dataSeriesTwo={dataFibra} xAxisCategories={region} />
        </Card>
    )
}

export default CantieriApertieNon;