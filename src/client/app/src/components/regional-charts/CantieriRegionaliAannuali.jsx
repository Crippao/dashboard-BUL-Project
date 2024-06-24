import { useEffect, useState } from 'react';
import { Card } from "antd";
import ColumnChart from '../ColumnChart';
import { getDataForRegionalAnnualTypeBuildingSite } from '../../lib/service';


const CantieriRegionaliAnnuali = ({ region, year, typeOfTech }) => {
    const [regionXAxis, setRegionXAxis] = useState(null);
    const [dataProgettazione, setDataProgettazione] = useState(null);
    const [dataEsecuzione, setDataEsecuzione] = useState(null);
    const [dataTerminati, setDataTerminati] = useState(null);
    const [title, setTitle] = useState(null);

    const getData = async () => {
        const data = await getDataForRegionalAnnualTypeBuildingSite(region, year, typeOfTech);

        const inProgettazione = Object.keys(data["In progettazione"]);
        const inEsecuzione = Object.keys(data["In esecuzione"]);
        const terminati = Object.keys(data["Terminati"]);

        const provincie = new Set([...inProgettazione, ...inEsecuzione, ...terminati]);

        const uniqueProvincieArray = Array.from(provincie);

        const title = `Cantieri in ${region} per ${typeOfTech} nel ${year}`;

        setRegionXAxis(uniqueProvincieArray);
        setDataProgettazione(data["In progettazione"]);
        setDataEsecuzione(data["In esecuzione"]);
        setDataTerminati(data["Terminati"]);
        setTitle(title)
    }

    useEffect(() => {
        getData();
    }, [region, year, typeOfTech])

    return (
        <Card>
            <ColumnChart title={title} dataSeriesOne={dataEsecuzione} dataSeriesTwo={dataProgettazione} dataSeriesThree={dataTerminati} xAxisCategories={regionXAxis} />
        </Card>
    )
}

export default CantieriRegionaliAnnuali;