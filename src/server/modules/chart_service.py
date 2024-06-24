import pandas as _pd
import geopandas as gpd
from modules.data import get_stato_lavori as _get_stato_lavori
from modules.data import get_italy_geo as _get_italy_geo

_str_prog = "in programmazione|in progettazione"  # In progettazione
_str_esec = "in esecuzione"  # In esecuzione
_str_term = "terminato|lavori chiusi|in collaudo"  # Terminato


# Presenza nazionale FWA,Fibra, Entrambe o nessuna (Pie chart)
def getDataForNationalPieChartPresencePercentage():
    df = _get_stato_lavori()

    c1_1 = df[(df["Fibra"] == 1) & (df["FWA"] == 1)].shape[0]
    c0_1 = (
        df[(df["Fibra"] == 1) | (df["FWA"] == 1)].shape[0] - c1_1
    )  # df[(df['Fibra'] == 1) & (df['FWA'] == 0)].shape[0] + df[(df['Fibra'] == 0) & (df['FWA'] == 1)].shape[0]
    c0_0 = df[(df["Fibra"] == 0) & (df["FWA"] == 0)].shape[0]
    print(f"1-1: {c1_1}, 0-1: {c0_1}, 0-0: {c0_0}")
    totale = _pd.Series(
        [c1_1, c0_1, c0_0], index=["Entrambe", "Fibra o FWA", "Nessuna"]
    )
    print(totale)

    return totale


# Cantieri aperti e non aperti FWA, Fibra (Column chart)
def getDataForNationalColumnChartBuildingSiteOpenOrNot():
    df = _get_stato_lavori()

    fibra_cablata = df[df["Fibra"] == 1][
        "Regione"
    ].value_counts()  # df.loc[df['Fibra'] == 1, ['Regione', 'Fibra']].groupby(by='Regione').sum()
    fwa = df[df["FWA"] == 1]["Regione"].value_counts()

    conteggio_combinato = _pd.DataFrame({"Fibra": fibra_cablata, "FWA": fwa})

    return conteggio_combinato


# Cantieri chiusi e collaudati o in collaudo FWA, Fibra (Column chart)
def getDataForNationalColumnChartBuildingSiteClosedAndTested():
    df = _get_stato_lavori()

    fibra_cablata = df[df["Stato Fibra"].str.contains(_str_term, na=False)][
        "Regione"
    ].value_counts()
    fwa = df[df["Stato FWA"].str.contains(_str_term, na=False)][
        "Regione"
    ].value_counts()

    conteggio_combinato_lavori = _pd.DataFrame({"Fibra": fibra_cablata, "FWA": fwa})

    return conteggio_combinato_lavori


# Cantieri in programmazione FWA, Fibra (Column chart)
def getDataForNationalColumnChartFutureBuildingSite():
    df = _get_stato_lavori()

    fibra_cablata = df[df["Stato Fibra"].str.contains(_str_prog, na=False)][
        "Regione"
    ].value_counts()
    fwa = df[df["Stato FWA"].str.contains(_str_prog, na=False)][
        "Regione"
    ].value_counts()

    conteggio_combinato_lavori = _pd.DataFrame({"Fibra": fibra_cablata, "FWA": fwa})

    return conteggio_combinato_lavori


# Tabella dati nazionali generali
def getDataForNationalDataGrid():
    df = _get_stato_lavori()

    df["Piano fibra (anno)"] = df["Piano fibra (anno)"].fillna(0)
    df["Piano FWA (anno)"] = df["Piano FWA (anno)"].fillna(0)

    df["Piano fibra (anno)"] = df["Piano fibra (anno)"].astype("int64")
    df["Piano FWA (anno)"] = df["Piano FWA (anno)"].astype("int64")

    df_sorted = df.sort_values(
        by=["Regione", "Provincia", "Citta"], ascending=[True, True, True]
    )

    return df_sorted


# Tabella dati regionali generali
def getDataForRegionalDataGrid(region="Lombardia"):
    df = _get_stato_lavori()

    df["Piano fibra (anno)"] = df["Piano fibra (anno)"].fillna(0)
    df["Piano FWA (anno)"] = df["Piano FWA (anno)"].fillna(0)

    df["Piano fibra (anno)"] = df["Piano fibra (anno)"].astype("int64")
    df["Piano FWA (anno)"] = df["Piano FWA (anno)"].astype("int64")

    df_region = df[df["Regione"] == region]

    df_sorted = df_region.sort_values(
        by=["Regione", "Provincia", "Citta"], ascending=[True, True, True]
    )

    return df_sorted


# Cantieri regionali per anno (Pie Chart)
def getDataForRegionalAnnualBuildingSite(region="Lombardia", typeOfTech="fibra"):
    df = _get_stato_lavori()

    df_region = df[df["Regione"] == region]

    if typeOfTech == "fibra":
        totale = df_region[df_region["Fibra"] == 1]["Piano fibra (anno)"].value_counts()
    elif typeOfTech == "fwa":
        totale = df_region[df_region["FWA"] == 1]["Piano FWA (anno)"].value_counts()
    else:
        totale = {}

    return totale


# Cantieri regionali per anno e tipo (Column chart)
def getDataForRegionalAnnualTypeBuildingSite(
    region="Lombardia", year="2022", typeOfTech="fibra"
):
    df = _get_stato_lavori()

    df_region = df[df["Regione"] == region]

    if typeOfTech == "fibra":
        if year is not None:
            terminati = df_region[
                (df_region["Stato Fibra"].str.contains(_str_term, na=False))
                & (df_region["Piano fibra (anno)"] == year)
            ]["Provincia"].value_counts()
            in_esecuzione = df_region[
                (df_region["Stato Fibra"].str.contains(_str_esec, na=False))
                & (df_region["Piano fibra (anno)"] == year)
            ]["Provincia"].value_counts()
            in_progettazione = df_region[
                (df_region["Stato Fibra"].str.contains(_str_prog, na=False))
                & (df_region["Piano fibra (anno)"] == year)
            ]["Provincia"].value_counts()
        else:
            terminati = (
                df_region[
                    (df_region["Stato Fibra"].str.contains(_str_term, na=False))
                    & (df_region["Fibra"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
            in_esecuzione = (
                df_region[
                    (df_region["Stato Fibra"].str.contains(_str_esec, na=False))
                    & (df_region["Fibra"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
            in_progettazione = (
                df_region[
                    (df_region["Stato Fibra"].str.contains(_str_prog, na=False))
                    & (df_region["Fibra"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
    elif typeOfTech == "fwa":
        if year is not None:
            terminati = df_region[
                (df_region["Stato FWA"].str.contains(_str_term, na=False))
                & (df_region["Piano FWA (anno)"] == year)
            ]["Provincia"].value_counts()
            in_esecuzione = df_region[
                (df_region["Stato FWA"].str.contains(_str_esec, na=False))
                & (df_region["Piano FWA (anno)"] == year)
            ]["Provincia"].value_counts()
            in_progettazione = df_region[
                (df_region["Stato FWA"].str.contains(_str_prog, na=False))
                & (df_region["Piano FWA (anno)"] == year)
            ]["Provincia"].value_counts()
        else:
            terminati = (
                df_region[
                    (df_region["Stato FWA"].str.contains(_str_term, na=False))
                    & (df_region["FWA"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
            in_esecuzione = (
                df_region[
                    (df_region["Stato FWA"].str.contains(_str_esec, na=False))
                    & (df_region["FWA"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
            in_progettazione = (
                df_region[
                    (df_region["Stato FWA"].str.contains(_str_prog, na=False))
                    & (df_region["FWA"] != 0)
                ]["Provincia"]
                .value_counts()
                .sort_index()
            )
    else:
        terminati = {}
        in_progettazione = {}
        in_esecuzione = {}

    conteggio_combinato_lavori_region = _pd.DataFrame(
        {
            "In progettazione": in_progettazione,
            "In esecuzione": in_esecuzione,
            "Terminati": terminati,
        }
    )

    return conteggio_combinato_lavori_region


def getDataOneForMap():
    df = _get_stato_lavori()
    df_geo = _get_italy_geo()

    df_geo_na = df_geo.copy()

    df_geo_na_filter = df_geo["comune"].isin(
        df[(df["Fibra"] == 0) & (df["FWA"] == 0)]["Citta"].unique()
    )
    df_geo_na = df_geo_na[df_geo_na_filter]

    crs_italy = "EPSG:4326"
    geometry = gpd.points_from_xy(df_geo_na["lng"], df_geo_na["lat"])
    gdf_citta = gpd.GeoDataFrame(df_geo_na, geometry=geometry, crs=crs_italy)

    return gdf_citta


def getDataTwoForMap():
    df = _get_stato_lavori()
    df_geo = _get_italy_geo()

    df_geo_na = df_geo.copy()

    df_geo_na_filter = df_geo["comune"].isin(
        df[(df["Fibra"] == 1) & (df["FWA"] == 1)]["Citta"].unique()
    )
    df_geo_na = df_geo_na[df_geo_na_filter]

    crs_italy = "EPSG:4326"
    geometry = gpd.points_from_xy(df_geo_na["lng"], df_geo_na["lat"])
    gdf_citta = gpd.GeoDataFrame(df_geo_na, geometry=geometry, crs=crs_italy)

    return gdf_citta
