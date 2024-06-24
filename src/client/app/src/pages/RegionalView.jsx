import { useEffect, useState } from 'react';
import Selector from "../components/Selector";
import { getRegionSelectorOption, getTypeSelectorOption, getYearSelectorOption } from "../lib/service";
import PianiRegionali from "../components/regional-charts/PianiRegionaliAnnuali";
import CantieriRegionaliAnnuali from "../components/regional-charts/CantieriRegionaliAannuali";
import RegionalDataTable from "../components/regional-charts/RegionalGrid";

const RegionalView = () => {

    const region = getRegionSelectorOption();
    const year = getYearSelectorOption();
    const type = getTypeSelectorOption();

    const [regionSelection, setRegionSelection] = useState("Lombardia");
    const [yearSelection, setYearSelection] = useState("2022");
    const [typeSelection, setTypeSelection] = useState("fibra");

    const getData = () => {

        console.log("aggiornamento", regionSelection, yearSelection, typeSelection);
    }

    useEffect(() => {
        getData();
    }, [regionSelection, yearSelection, typeSelection])

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-2 mb-3">
                <div>
                    <Selector option={region} defaultValue="Lombardia" handleChange={(val, lab) => setRegionSelection(lab.label)} />
                </div>
                <div>
                    <Selector option={year} defaultValue="2022" handleChange={(val, lab) => setYearSelection(lab.label)} />
                </div>
                <div>
                    <Selector option={type} defaultValue="fibra" handleChange={(val, lab) => setTypeSelection(lab.label)} />
                </div>
            </div>
            <div className="grid grid-cols-1 mb-3">
                <RegionalDataTable region={regionSelection} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-5 gap-y-3">
                <div >
                    <PianiRegionali region={regionSelection} typeOfTech={typeSelection} />
                </div>
                <div >
                    <CantieriRegionaliAnnuali region={regionSelection} year={yearSelection} typeOfTech={typeSelection} />
                </div>
            </div>
        </div>

    );
};

export default RegionalView;