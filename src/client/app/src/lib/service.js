const HOSTNAME = "http://localhost:5000/api";

//National
export async function getDataForNationalPieChartPresencePercentageAsync() {
    const response = await fetch(HOSTNAME+"/national-pie-chart-presence-percentage");    
    const series = await response.json();
    // console.log(series);
    return series;
}

export async function getDataForNationalColumnChartBuildingSiteOpenOrNot() {
    const response = await fetch(HOSTNAME+"/national-column-chart-building-site-open-or-not");    
    const series = await response.json();
    // console.log(series);
    return series;
}

export async function getDataForNationalColumnChartBuildingSiteClosedAndTested() {
    const response = await fetch(HOSTNAME+"/national-column-chart-building-site-closed-and-tested");    
    const series = await response.json();
    // console.log(series);
    return series;
}

export async function getDataForNationalColumnChartFutureBuildingSite() {
    const response = await fetch(HOSTNAME+"/national-column-chart-future-building-site");    
    const series = await response.json();
    // console.log(series);
    return series;
}

export async function getDataForNationalDataGrid() {
    const response = await fetch(HOSTNAME+"/national-data-grid");    
    const series = await response.json();
    // console.log(series);
    return series;
}

//Regional
export function getRegionSelectorOption() {   

    const series = [
        { value: 1, label: 'Abruzzo' },
        { value: 2, label: 'Basilicata' },
        { value: 3, label: 'Calabria' },
        { value: 4, label: 'Campania' },
        { value: 5, label: 'Emilia Romagna' },
        { value: 6, label: 'Friuli Venezia Giulia' },
        { value: 7, label: 'Lazio' },
        { value: 8, label: 'Liguria' },
        { value: 9, label: 'Lombardia' },
        { value: 10, label: 'Marche' },
        { value: 11, label: 'Molise' },
        { value: 12, label: 'Piemonte' },
        { value: 13, label: 'Puglia' },
        { value: 14, label: 'Sardegna' },
        { value: 15, label: 'Sicilia' },
        { value: 16, label: 'Toscana' },
        { value: 17, label: 'Trentino Alto Adige-Trento' },
        { value: 18, label: 'Umbria' },
        { value: 19, label: 'Valle d\'Aosta' },
        { value: 20, label: 'Veneto' }
      ];
    
    return series;
}

export function getYearSelectorOption() {   

    const series = [
        { value: 1, label: '2020' },
        { value: 2, label: '2021' },
        { value: 3, label: '2022' }
      ];
    
    return series;
}

export function getTypeSelectorOption() {   

    const series = [
        { value: 1, label: 'Fibra' },
        { value: 2, label: 'FWA' }
      ];
    
    return series;
}

export async function getDataForRegionalDataGrid(region) {
    const body = {
        "regione": region,
    }

    const response = await fetch(HOSTNAME+"/regional-data-grid",
        {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );

    const series = await response.json();

    return series;
}

export async function getDataForRegionalAnnualBuildingSite(region, typeOfTech) {
    const body = {
        "regione": region,
        "tipo": typeOfTech
    }

    const response = await fetch(HOSTNAME+"/regional-annual-building-site",
        {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );  

    const series = await response.json();

    return series;
}

export async function getDataForRegionalAnnualTypeBuildingSite(region, year, typeOfTech) {
    const body = {
        "regione": region,
        "anno": parseInt(year),
        "tipo": typeOfTech
    }

    const response = await fetch(HOSTNAME+"/regional-annual-type-building-site", {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    }
    ); 

    const series = await response.json();
    
    return series;
}

//Map
export async function getDataOneForMap() {

    const response = await fetch(HOSTNAME+"/regional-map-data-one");

    const series = await response.json();

    return series;
}

export async function getDataTwoForMap() {

    const response = await fetch(HOSTNAME+"/regional-map-data-two");

    const series = await response.json();

    return series;
}