import { Card } from "antd";
import { useEffect, useState } from 'react';
import PieChart from "../PieChart";
import { getDataForRegionalAnnualBuildingSite } from "../../lib/service";

const PianiRegionali = ({ region, typeOfTech }) => {

    const [dataPie, setDataPie] = useState(null);
    const [title, setTitle] = useState(null);

    const getDataForNationalPieChart = async () => {
        const data = await getDataForRegionalAnnualBuildingSite(region, typeOfTech);
        const title = `Piani annuali per la regione ${region} per ${typeOfTech}`;

        setDataPie(data);
        setTitle(title)
    }

    useEffect(() => {
        getDataForNationalPieChart();
    }, [region, typeOfTech])

    return (
        <Card>
            <PieChart title={title} data={dataPie} />
        </Card>
    )
}

export default PianiRegionali;