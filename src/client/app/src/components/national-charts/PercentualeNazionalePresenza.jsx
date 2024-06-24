import { useEffect, useState } from 'react';
import { getDataForNationalPieChartPresencePercentageAsync } from "../../lib/service";
import PieChart from '../PieChart';
import { Card } from "antd";

const PercentualePresenzaFibraFWA = () => {

    const [dataPie, setDataPie] = useState(null);
    const [title, setTitle] = useState(null);

    const getDataForNationalPieChart = async () => {
        const data = await getDataForNationalPieChartPresencePercentageAsync();
        const title = 'Percentuale nazionale di presenza Fibra,FWA, Entrambe o Nessuna';

        setDataPie(data);
        setTitle(title)
    }

    useEffect(() => {
        getDataForNationalPieChart();
    }, [])

    return (
        <Card>
            <PieChart title={title} data={dataPie} />
        </Card>
    )
}

export default PercentualePresenzaFibraFWA;