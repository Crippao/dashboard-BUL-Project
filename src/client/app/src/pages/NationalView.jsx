import CantieriApertieNon from "../components/national-charts/cantieri-aperti-e-non/CantieriApertiENon";
import PercentualePresenzaFibraFWA from "../components/national-charts/PercentualeNazionalePresenza";
import CantieriCollaudatieNon from "../components/national-charts/cantieri chiusi-collaudati-e-non/CantieriChiusiCollENon";
import CantieriInProgrammazione from "../components/national-charts/cantieri-in-programmazione/CantieriInProgrammazione";
import DataTable from '../components/national-charts/NationalGrid';


const NationalView = () => {

    return (
        <div>
            <div className="grid grid-cols-1 mb-3">
                <DataTable />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-3">
                <div>
                    <PercentualePresenzaFibraFWA />
                </div>
                <div >
                    <CantieriApertieNon />
                </div>
                <div >
                    <CantieriCollaudatieNon />
                </div>
                <div >
                    <CantieriInProgrammazione />
                </div>
            </div>
        </div>

    );
};

export default NationalView;
