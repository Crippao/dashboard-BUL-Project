import os

# Ottiengo il percorso assoluto della directory principale del progetto
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../"))
data_root = os.path.abspath(os.environ["DATA_FOLDER"])

# Costruisco il percorso assoluto ai file csv
stato_lavori_path = os.path.join(data_root, "stato_lavori.csv")
italy_geo_path = os.path.join(data_root, "italy_geo.csv")
pcn_route_path = os.path.join(data_root, "pcn_route.csv")


# Imposto una funzione che mi ritorni le path dei file csv in un dizionario
def load_config():
    # print(stato_lavori_path)
    return {
        "italy_geo": italy_geo_path,
        "pcn_route": pcn_route_path,
        "stato_lavori": stato_lavori_path,
    }


cfg = load_config()
